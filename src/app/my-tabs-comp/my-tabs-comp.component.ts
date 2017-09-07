import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Tab } from  '../my-tab-interface/my-tab-interface';

@Component({
  selector: 'app-my-tabs-comp',
  templateUrl: './my-tabs-comp.component.html',
  styleUrls: ['./my-tabs-comp.component.css']
})
export class TabsComponent implements OnInit {

  tabs:Tab[] = [];
  @Output() selected = new EventEmitter();
  
  addTab(tab:Tab) {
    if (!this.tabs.length) {
      tab.selected = true;
    }
    this.tabs.push(tab);
  }
   
  selectTab(tab:Tab) {
    this.tabs.map((tab) => {
      tab.selected = false;
    })
    tab.selected = true;
    this.selected.emit({selectedTab: tab});    
  }
  constructor() { }

  ngOnInit() {
  }

}
