import { AppPage } from './app.po';
import {browser, Config, element, by} from 'protractor';

describe('premier App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    browser.get('/');
  });

  it("Hey, let's take some snapshots.", () => {
    element(by.linkText("Voronoi Tesselation")).click();
    page.takeScreenShot('voronoi');
    element(by.linkText("Graph Drawing")).click();
    page.takeScreenShot('graph_drawing');
  });

});
