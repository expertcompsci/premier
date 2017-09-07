import { Component } from '@angular/core';
import { Tab } from './my-tab-interface/my-tab-interface';
import { TabComponent } from './my-tab-comp/my-tab-comp.component';
import { TabsComponent } from './my-tabs-comp/my-tabs-comp.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App Testing Example';
  detailMsg:string;
  detail(selectedTab:Tab) {
    this.detailMsg = selectedTab.tabCaption;
  }}
