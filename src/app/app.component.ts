import { Component, ViewChild, NgZone } from '@angular/core';
import { IconArrayChartComponent } from './directives/icon-array-chart/icon-array-chart.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private _ngZone: NgZone) {}

  iconsPerRow: number = 25;
  imageWidth: number = 800;
  iconPadding: number = 3.5;
  randomDistribution: boolean = false;
  defaultColors: string[] = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', 
   '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'];
  chartTitle: string = "Title for your icon array";
  downloadWasRequested: boolean = false;
  dataPoints: any = [
    {
      frequency: 15,
      label: "out of 100 people exhibit this property",
      color: this.defaultColors[0],
      editable: true
    },
    {
      frequency: 85,
      label: "out of 100 people do not exhibit this property",
      color: "#d3d3d3",
      editable: false
    }
  ]

  currSelectedIndex: number = 0;
  currSelected: any = this.dataPoints[0];

  @ViewChild(IconArrayChartComponent)
  private iconArrayChart: IconArrayChartComponent;

  inputBlurred() {
    this.iconArrayChart.updateChart();
  }

  changeSelected(point) {
    this.currSelected = point;
  }

  setRandomDistribution() {
    this.randomDistribution = !this.randomDistribution;
    // dunno why this is needed :S
    this.iconArrayChart.randomDistribution = this.randomDistribution
    this.iconArrayChart.updateData();
  }

  addDataPoint() {
    var lastDp = this.dataPoints[this.dataPoints.length-1];
    let newDp = {
      frequency: 0,
      label: "out of 100 people exhibit this property",
      color: this.defaultColors[this.dataPoints.length-1],
      editable: true
    }
    this.dataPoints[this.dataPoints.length-1] = newDp;
    this.dataPoints.push(lastDp);
    this.currSelected = newDp;
    this.iconArrayChart.updateData();
  }

  dataChanged() {
    let dataSum = this.dataPoints.reduce((acc, dp, i) => { return acc + parseInt(i === this.dataPoints.length-1 ? 0 : dp.frequency)}, 0);
    let diff = 100 - dataSum;
    this.dataPoints[this.dataPoints.length-1].frequency = diff;
    this.iconArrayChart.updateData();
  }

  removeCurrentDataPoint() {
    let index = this.dataPoints.indexOf(this.currSelected);
    let last = this.dataPoints[this.dataPoints.length-1];
    last.frequency += this.currSelected.frequency;
    this.currSelected = this.dataPoints[index+1];
    // give existing data to last element
    this.dataPoints.splice(index, 1);
    this.iconArrayChart.updateData();
  }

  downloadRequest() {
    this.downloadWasRequested = true;
  }

  downloadFinish() {
    this._ngZone.run(() => this.downloadWasRequested = false);
  }
}
