import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ColorPickerModule } from 'angular2-color-picker';

import { AppComponent } from './app.component';
import { IconArrayChartComponent } from './directives/icon-array-chart/icon-array-chart.component';
import { HeaderComponentComponent } from './header-component/header-component.component';


@NgModule({
  declarations: [
    AppComponent,
    IconArrayChartComponent,
    HeaderComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
