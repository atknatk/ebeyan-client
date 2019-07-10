/// <reference path="./globals.d.ts" />


import * as path from 'path';
import * as fs from 'fs-extra';
import { getReleaseChannel, getDistRoot, getExecutableName } from './dist-info';

import {
    getBundleID,
    getCompanyName,
    getProductName,
    getVersion,
} from './package-info';


const projectRoot = path.join(__dirname, '..');
const outRoot = path.join(projectRoot, 'out');
// const isPublishableBuild = getReleaseChannel() !== 'development'

// console.log(`Building for ${getReleaseChannel()}…`)

console.log('Removing old distribution…')
fs.removeSync(outRoot);

console.log('Copying dependencies…')
copyDependencies();





function copyDependencies() {
    // eslint-disable-next-line import/no-dynamic-require
    const originalPackage: Package = require(path.join(
        projectRoot,
        'app',
        'package.json'
    ))


    // The product name changes depending on whether it's a prod build or dev
    // build, so that we can have them running side by side.
    const updatedPackage = Object.assign({}, originalPackage, {
        productName: getProductName(),
        dependencies: newDependencies,
        devDependencies: newDevDependencies,
    })

    if (isPublishableBuild) {
        delete updatedPackage.devDependencies
    }

    fs.writeFileSync(
        path.join(outRoot, 'package.json'),
        JSON.stringify(updatedPackage)
    )

    fs.removeSync(path.resolve(outRoot, 'node_modules'))

    if (
        Object.keys(newDependencies).length ||
        Object.keys(newDevDependencies).length
    ) {
        console.log('  Installing dependencies via yarn…')
        cp.execSync('yarn install', { cwd: outRoot, env: process.env })
    }

    if (!isPublishableBuild) {
        console.log(
            '  Installing 7zip (dependency for electron-devtools-installer)'
        )

        const sevenZipSource = path.resolve(projectRoot, 'app/node_modules/7zip')
        const sevenZipDestination = path.resolve(outRoot, 'node_modules/7zip')

        fs.mkdirpSync(sevenZipDestination)
        fs.copySync(sevenZipSource, sevenZipDestination)
    }

    console.log('  Copying git environment…')
    const gitDir = path.resolve(outRoot, 'git')
    fs.removeSync(gitDir)
    fs.mkdirpSync(gitDir)
    fs.copySync(path.resolve(projectRoot, 'app/node_modules/dugite/git'), gitDir)

    if (process.platform === 'win32') {
        console.log('  Cleaning unneeded Git components…')
        const files = [
            'Bitbucket.Authentication.dll',
            'GitHub.Authentication.exe',
            'Microsoft.Alm.Authentication.dll',
            'Microsoft.Alm.Git.dll',
            'Microsoft.IdentityModel.Clients.ActiveDirectory.Platform.dll',
            'Microsoft.IdentityModel.Clients.ActiveDirectory.dll',
            'Microsoft.Vsts.Authentication.dll',
            'git-askpass.exe',
            'git-credential-manager.exe',
        ]

        const gitCoreDir = path.join(gitDir, 'mingw64', 'libexec', 'git-core')

        for (const file of files) {
            const filePath = path.join(gitCoreDir, file)
            try {
                fs.unlinkSync(filePath)
            } catch (err) {
                // probably already cleaned up
            }
        }
    }

    if (process.platform === 'darwin') {
        console.log('  Copying app-path binary…')
        const appPathMain = path.resolve(outRoot, 'main')
        fs.removeSync(appPathMain)
        fs.copySync(
            path.resolve(projectRoot, 'app/node_modules/app-path/main'),
            appPathMain
        )
    }
}