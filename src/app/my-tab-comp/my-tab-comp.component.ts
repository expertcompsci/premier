import { Component, OnInit, Input } from '@angular/core';
import { Tab } from  '../my-tab-interface/my-tab-interface';
import { TabsComponent } from  '../my-tabs-comp/my-tabs-comp.component';

@Component({
  selector: 'app-my-tab-comp',
  templateUrl: './my-tab-comp.component.html',
  styleUrls: ['./my-tab-comp.component.css']
})
export class TabComponent implements OnInit, Tab {

  @Input() tabText;
  selected: boolean;
  @Input() tabCaption;

  constructor(private tabsComponent: TabsComponent) { }

  ngOnInit() {
    this.tabsComponent.addTab(this);
  }

}
