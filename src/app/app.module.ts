import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VoronoiComponent } from './voronoi/voronoi.component';
import { GraphComponent } from './graph/graph.component';
import { TabComponent } from './my-tab-comp/my-tab-comp.component';
import { TabsComponent } from './my-tabs-comp/my-tabs-comp.component';


@NgModule({
  declarations: [
    AppComponent,
    VoronoiComponent,
    GraphComponent,
    TabComponent,
    TabsComponent,
  ],
  entryComponents: [VoronoiComponent],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
