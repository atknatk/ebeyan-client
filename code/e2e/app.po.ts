import { browser, element, by } from 'protractor';

export class NewCliTestPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('dinazor-root h1')).getText();
  }
}
