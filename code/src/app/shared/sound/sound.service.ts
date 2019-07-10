import { Injectable } from '@angular/core';

import { config } from '@dinazor/core/release/dinazor.config';
import { DnNotificationService } from '@dinazor/core';

@Injectable()
export class SoundService {

  public config = {
    basePath: config.sound_path,
    mainExt: '.mp3',
    alternateExt: '.ogg',
  };
  private static cache = {};

  constructor(private notificationService: DnNotificationService) {
  }

  get(name) {
    if (SoundService.cache[name]) {
      return Promise.resolve(SoundService.cache[name]);
    } else {
      return new Promise((resolve, reject) => {
        const audioElement = document.createElement('audio');
        if (navigator.userAgent.match('Firefox/')) {
          audioElement.setAttribute('src', this.config.basePath + name + this.config.alternateExt);
        } else {
          audioElement.setAttribute('src', this.config.basePath + name + this.config.mainExt);
        }

        audioElement.addEventListener('error', reject);

        audioElement.load();
        SoundService.cache[name] = audioElement;
        resolve(audioElement);
      });
    }
  }

  mute() {
    config.sound_on = false;
    this.notificationService.smallBox({
      title: 'MUTE',
      content: 'All sounds have been muted!',
      color: '#a90329',
      timeout: 4000,
      icon: 'fa fa-volume-off'
    });
  }

  play(name) {
    if (config.sound_on) {
      this.get(name).then((audio) => {
        audio.play();
      });
    }
  }

  soundOn() {
    config.sound_on = true;
    this.notificationService.smallBox({
      title: 'UNMUTE',
      content: 'All sounds have been turned on!',
      color: '#40ac2b',
      sound_file: 'voice_alert',
      timeout: 5000,
      icon: 'fa fa-volume-up'
    });
  }

}
