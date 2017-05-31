import { Component, ViewChild } from '@angular/core';
import { IconArrayChartComponent } from './directives/icon-array-chart/icon-array-chart.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './styles/style.css']
})

export class AppComponent {
  iconsPerRow: number = 25;
  imageWidth: number = 800;
  iconPadding: number = 3.5;
  defaultColors: string[] = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', 
   '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'];
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
}
