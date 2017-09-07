import { browser, by, element } from 'protractor';
var fs = require('fs');

export class AppPage {
  static readonly screenShotFolder: string  = ".\\screenShots";
  private folderExists: boolean;

  constructor() {
    this.folderExists = false;
  }

  takeScreenShot(filename) {
    this.prepImgFolder();
    if(this.folderExists) {
      browser.takeScreenshot().then(function (png) {
        var stream = fs.createWriteStream(AppPage.screenShotFolder + "\\" + filename + ".png");
        stream.write(new Buffer(png, 'base64'));
        stream.end();
      });
    }
  }

  prepImgFolder() {   // TODO: perhaps ensure old files are archived or removed
    this.folderExists = fs.existsSync(AppPage.screenShotFolder);
    if(!this.folderExists) {
      fs.mkdir(AppPage.screenShotFolder);
      this.folderExists = fs.existsSync(AppPage.screenShotFolder);
    }
  }

}
