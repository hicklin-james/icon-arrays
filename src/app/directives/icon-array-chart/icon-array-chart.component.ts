import { Component, OnInit, Input, Inject, ViewContainerRef } from '@angular/core';
import * as d3 from 'd3';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-icon-array-chart',
  templateUrl: './icon-array-chart.component.html',
  styleUrls: ['./icon-array-chart.component.css']
})

export class IconArrayChartComponent implements OnInit {

  @Input() name: string;
  @Input() itemsPerRow: number;
  @Input() width: number;
  @Input() data: any[];
  @Input() iconPadding: number;
  @Input() randomDistribution: boolean;
  @Input() chartTitle: string;
  height: number;
  canvas: any;
  chart: any;
  legend: any;
  legendItems: any;
  legendElements: any;
  textBorderPadding: number = 3;
  titleHeight: number = 40;

  title: any;
  people: any;
  peopleItems: any;
  chartData: any[] = Array();

  constructor(private viewContainerRef: ViewContainerRef) { }

  wrap(textItem, width, label) {
    var text = d3.select(textItem);
    var words = label.split(/\s+/).reverse();
    var word = undefined;
    var line = [];
    var lineNumber = 0;
    var lineHeight = 1.1;
    var y = text.attr('y');
    var x = text.attr('x');
    var dy = text.attr('dy');
    var tspan = text.text(null).append('tspan').attr('x', x).attr('y', y).attr('dy', dy + 'em');
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join("\ "));
      var node: SVGTSpanElement = <SVGTSpanElement>tspan.node();
      if (node.getComputedTextLength() > width) {
        var w = line.pop();
        var newText = line.join(" ");
        tspan.text(newText);
        line = [ w ];
        tspan = text.append('tspan').attr('x', x).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
      }
    }
    return lineNumber + 1
   }

  drawPerson(headRadius, d3Item, color) {
    let personWrapper = d3.select(d3Item);
    let r = headRadius;
    let headMidBottomX = r;
    let headMidBottomY = r;
    let head = personWrapper
      .select('circle')
      .attr('r', headRadius * 0.7)
      .attr('cy', 1).attr('stroke-width', 1)

    // top line
    let bodyStartX = -r;
    let bodyEndX = r;
    let bodyStartY = headMidBottomY + r / 3;
    // right shoulder curve
    let rightShoulderXCurve1 = bodyEndX + r / 3;
    let rightShoulderYCurve1 = bodyStartY;
    let rightShoulderXCurve2 = bodyEndX + r / 3;
    let rightShoulderYCurve2 = bodyStartY + r / 3;
    let rightShoulderEndX = bodyEndX + r / 3;
    let rightShoulderEndY = bodyStartY + r / 3;
    // right arm outer line
    let rightArmEndY = rightShoulderEndY + r * 2;
    // right hand curve
    let rhcx1 = rightShoulderEndX;
    let rhcy1 = rightArmEndY + r / 3;
    let rhcx2 = rightShoulderEndX - (r / 3);
    let rhcy2 = rightArmEndY + r / 3;
    let rhex = rightShoulderEndX - (r / 3);
    let rhey = rightArmEndY;
    // right arm inner line
    let rightArmInnerEndY = rhey - (r * 2) + r / 2;
    // right armpit curve
    let racx1 = rhex;
    let racy1 = rightArmInnerEndY - (r / 3);
    let racx2 = rhex - (r / 2);
    let racy2 = rightArmInnerEndY - (r / 3);
    let racex = rhex - (r / 2);
    let racey = rightArmInnerEndY;
    // right leg outer line
    let rightLegOuterEndY = racey + r * 4;
    // right foot curve
    let rfcx1 = racex;
    let rfcy1 = rightLegOuterEndY + r / 3;
    let rfcx2 = racex - (r / 3);
    let rfcy2 = rightLegOuterEndY + r / 3;
    let rfcex = racex - (r / 3);
    let rfcey = rightLegOuterEndY;
    // right inner leg
    let rightInnerLegEndY = rfcey - (r * 2.6);
    // crotch curve
    let crx1 = rfcex;
    let cry1 = rightInnerLegEndY - (r / 3);
    let crx2 = -(r * 0.2);
    let cry2 = rightInnerLegEndY - (r / 3);
    let crex = -(r * 0.2);
    let crey = rightInnerLegEndY;
    // left inner leg
    let leftInnerLegEndY = crey + r * 2.6;
    // left foot curve
    let lfcx1 = crex;
    let lfcy1 = leftInnerLegEndY + r / 3;
    let lfcx2 = crex - (r / 3);
    let lfcy2 = leftInnerLegEndY + r / 3;
    let lfcex = crex - (r / 3);
    let lfcey = leftInnerLegEndY;
    // left outer leg
    let leftOuterLegEndY = rightArmInnerEndY;
    // left armpit curve
    let lacx1 = lfcex;
    let lacy1 = leftOuterLegEndY - (r / 3);
    let lacx2 = lfcex - (r / 2);
    let lacy2 = leftOuterLegEndY - (r / 3);
    let lacex = lfcex - (r / 2);
    let lacey = leftOuterLegEndY;
    // left inner arm
    let leftInnerArmEndY = rightArmEndY;
    // left hand curve
    let lhx1 = lacex;
    let lhy1 = leftInnerArmEndY + r / 3;
    let lhx2 = lacex - (r / 3);
    let lhy2 = leftInnerArmEndY + r / 3;
    let lhex = lacex - (r / 3);
    let lhey = leftInnerArmEndY;
    // left arm outer
    let leftOuterArmEndY = rightShoulderEndY;
    // left shoulder curve
    let lsx1 = lhex;
    let lsy1 = leftOuterArmEndY - (r / 3);
    let lsx2 = bodyStartX;
    let lsy2 = bodyStartY;
    let lsex = bodyStartX;
    let lsey = bodyStartY;

    let body = personWrapper.select('path').attr('d', () => {
      var pathString = '';
      pathString += 'M' + bodyStartX + ' ' + bodyStartY;
      pathString += ' L ' + bodyEndX + ' ' + bodyStartY;
      pathString += ' C ' + rightShoulderXCurve1 + ' ' + rightShoulderYCurve1 + ', ' + rightShoulderXCurve2 + ' ' + rightShoulderYCurve2 + ', ' + rightShoulderEndX + ' ' + rightShoulderEndY;
      pathString += ' L ' + rightShoulderEndX + ' ' + rightArmEndY;
      pathString += ' C ' + rhcx1 + ' ' + rhcy1 + ', ' + rhcx2 + ' ' + rhcy2 + ', ' + rhex + ' ' + rhey;
      pathString += ' L ' + rhex + ' ' + rightArmInnerEndY;
      pathString += ' C ' + racx1 + ' ' + racy1 + ', ' + racx2 + ' ' + racy2 + ', ' + racex + ' ' + racey;
      pathString += ' L ' + racex + ' ' + rightLegOuterEndY;
      pathString += ' C ' + rfcx1 + ' ' + rfcy1 + ', ' + rfcx2 + ' ' + rfcy2 + ', ' + rfcex + ' ' + rfcey;
      pathString += ' L ' + rfcex + ' ' + rightInnerLegEndY;
      pathString += ' C ' + crx1 + ' ' + cry1 + ', ' + crx2 + ' ' + cry2 + ', ' + crex + ' ' + crey;
      pathString += ' L ' + crex + ' ' + leftInnerLegEndY;
      pathString += ' C ' + lfcx1 + ' ' + lfcy1 + ', ' + lfcx2 + ' ' + lfcy2 + ', ' + lfcex + ' ' + lfcey;
      pathString += ' L ' + lfcex + ' ' + leftOuterLegEndY;
      pathString += ' C ' + lacx1 + ' ' + lacy1 + ', ' + lacx2 + ' ' + lacy2 + ', ' + lacex + ' ' + lacey;
      pathString += ' L ' + lacex + ' ' + leftInnerArmEndY;
      pathString += ' C ' + lhx1 + ' ' + lhy1 + ', ' + lhx2 + ' ' + lhy2 + ', ' + lhex + ' ' + lhey;
      pathString += ' L ' + lhex + ' ' + leftOuterArmEndY;
      pathString += ' C ' + lsx1 + ' ' + lsy1 + ', ' + lsx2 + ' ' + lsy2 + ', ' + lsex + ' ' + lsey;
      return pathString;
    }).attr('stroke-width', '1')
  }

  // draws initial chart - note that this is only called once
  drawChart() {
    let wrapper = d3.select(this.viewContainerRef.element.nativeElement);
    this.canvas = wrapper.select('#icon-array-preview')
    this.chart = this.canvas.append("g").attr("class", 'chart-body');

    this.title = this.canvas.append("text")
      .attr("class", "chart-title");

    this.legend = this.canvas.append('g')
      .attr('class', 'chart-legend')
      .attr('transform', 'translate(1,0)');

    var unflattenedData = this.data.map((outerData) => {return this.chunkData(outerData)});
    this.chartData = [].concat.apply([], unflattenedData);

    this.peopleItems = this.chart.selectAll("g")
      .data(this.chartData, (d) => {return d.key});

    this.legendItems = this.legend.selectAll("g")
      .data(this.data, (d, i) => {return i});

    this.people = this.peopleItems.enter()
      .append("g");

    // this.legendElements = this.legendItems.enter()
    //   .append("g");

    // this.legendElements.append("circle");
    // this.legendElements.append("text")
    //   .attr('alignment-baseline', 'middle')
    //   .style("font-size", "0.9em");

    this.people.append("circle")
    this.people.append("path")

    this.updateChart();
  }

  modifyDataWithDistribution() {
    //var counters = this.data.map((p) => { return p.frequency});
    //counters.slice(-1);
    //var def = this.data[this.data.length-1];

    var clonedArray = Array.apply(null, {length: 100}).map(Number.call, Number)

    // for (var k = 0; k < 100; k++) {
    //   clonedArray[k].color = def.color;
    // }

    var s = 0;

    for (var i = 0; i < this.data.length; i++) {
      let d = this.data[i];
      for (var j = 0; j < d.frequency; j++) {
        // select a random spot in the 100
        //console.log(clonedArray.length);
        var rand = Math.floor(Math.random() * clonedArray.length);
        var randIndex = clonedArray[rand];

        // set color of this index
        this.chartData[randIndex].color = d.color;

        clonedArray[rand] = clonedArray[clonedArray.length-1];
        clonedArray.pop();
        //clonedArray.splice(-1, 1);
        s++;
      }
    }
  }

  modifyDataNoDistribution() {
    var j = 0;
    var dataCounter = 0;
    for (var i = 0; i < this.chartData.length; i++) {
      let d = this.data[dataCounter];
      if (j < d.frequency) {
        this.chartData[i].color = d.color;
        j++;
      }
      else {
        j = 0;
        dataCounter++;
        i--;
      }

    }
  }

  modifyExistingData() {
    if (this.randomDistribution) {
      this.modifyDataWithDistribution()
    }
    else {
      this.modifyDataNoDistribution();
    }
  }

  chunkData(outerData) {
    var chunkedData: any[] = Array();
    //console.log(outerData);
    for (var i = 0; i < outerData.frequency; i++) {
      let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      });
      chunkedData.push({color: outerData.color, key: uuid})
    }
    return chunkedData;
  }

  updateData() {
     // var unflattenedData = this.data.map((outerData) => {return this.chunkData(outerData)});
     // this.chartData = [].concat.apply([], unflattenedData);
     // this.peopleItems = this.people.data(this.chartData, (d) => {return d.key});
    this.modifyExistingData();

    this.legendItems = this.legend.selectAll("g")
      .data(this.data, (d, i) => {return i});

    this.legendElements = this.legendItems.enter()
      .append("g")

    this.legendElements.append("circle");
    this.legendElements.append("text")
      .attr('alignment-baseline', 'middle')
      .style("font-size", "0.9em");

    this.updateChart();
  }

  updateExistingItems() {
    this.peopleItems.selectAll("path")
      .transition().duration(500)
      .attr("fill", (d) => {
        return d.color
      })
      .attr("stroke", (d) => {
        return d.color
      })

    this.peopleItems.selectAll("circle")
      .transition().duration(500)
      .ease("linear")
      .attr("fill", (d) => {
        return d.color
      })
      .attr("stroke", (d) => {
        return d.color
      })
  }

  updateExistingLegendItems(r) {
    this.legendItems.select("text")
      .attr("x", ((r * 2) + (1.75 * r) + this.textBorderPadding))
      .attr("y", 0)
      .attr("dy", 0)
      .text((d, i) => {
        return d.label;
      });

    var totalLegendHeight = r + (this.chartTitle ? this.titleHeight : 0);
    this.legendItems
      .each((d,i) => {
        var textItem = d3.select(this.legendItems[0][i])
        totalLegendHeight += this.updateLegendItem(textItem, totalLegendHeight, this.width, r, d)
      });

    this.legendItems.select("circle")
      .attr("r", r)
      .attr("stroke-width", 1)
      .attr("fill", (d) => {
        return d.color
      }).attr("stroke", (d) => {
        return d.color
      });
    return totalLegendHeight;
  }

  updateLegendItem(item, currLegendHeight, svgWidth, r, d) {
    var text = item.select("text");
    var lines = this.wrap(text.node(), svgWidth - (1.75*r) - (4 * r) - (1.75 * r) - (2 * this.textBorderPadding) - 1, d.frequency + " " + d.label);
    var bounds = text.node().getBoundingClientRect();
    var itemheight = parseInt(bounds.height);
    var itemWidth = parseInt(bounds.width) + ((r * 2) + (1.75 * r)) + ((1.75 * r) - r);
    var biggerHeight = Math.max(itemheight, (r*2));
    item.attr("transform", (d,ii) => "translate(0," + currLegendHeight + ")");
    var legendItemHeight = (biggerHeight + (r / 2) + (2 * this.textBorderPadding));
    item.select("circle").attr("cy", r)
      .attr("cx", (1.75*r))
      .attr("cy", ((biggerHeight + (2 * this.textBorderPadding)) / 2));

    var lineHeight = itemheight / lines;
    var y = ((biggerHeight / 2) / lines) + this.textBorderPadding;
    text
      .attr("y", 0)
      .attr("transform", "translate(0," + ((biggerHeight / 2) + (lineHeight / 2) - ((lines - 1) * (lineHeight / 2))) + ')')
      .attr("dy", 0);

    this.wrap(text.node(), svgWidth - (1.75*r) - (4 * r) - (1.75 * r) - (2 * this.textBorderPadding) - 1, d.frequency + " " + d.label);
    return legendItemHeight;
  }

  updateChart() {
    let r = ((this.width / this.itemsPerRow) / this.iconPadding);
    let rowHeight = (r * 2) + (6 * r);
    let numRows = Math.ceil(100 / this.itemsPerRow);

    let totalLegendHeight = this.updateExistingLegendItems(r);

    let vertPadding = 10;
    let height = (numRows * rowHeight) + totalLegendHeight + vertPadding;
    this.height = height;

    this.title.text(this.chartTitle)
      .attr("stroke", "black")
      .attr("stroke-width", "1px")
      .attr("transform", (d, i) => {
        return "translate(" + ((this.width / 2) - (this.title.node().getComputedTextLength() / 2)) + "," + (this.titleHeight / 2) + ")";
      });

    this.canvas
      .attr("width", this.width + "px")
      .attr("height", height + "px");

    this.people.attr("transform", (d, i) => {
      let col = i % this.itemsPerRow;
      let row = Math.floor(i / this.itemsPerRow );
      return("translate("+((1.75*r)+(col*((this.iconPadding*r))))+","+(totalLegendHeight + (1.75*r)+((row*(8*r))))+")");
    });

    this.people.each((d, i, all) => {
      //console.log(all);
      //d3.select(this);
      let me = this.people[0][i];
      this.drawPerson(r, me, d.color);
    });

    this.updateExistingItems();

    this.peopleItems.exit().remove();
  }

  ngOnInit() {
    this.drawChart();
  }

  getSvgString() {
    var svgNode = this.canvas.node();
    var serializer = new XMLSerializer();
    var svgString = serializer.serializeToString(svgNode);
    return svgString;
  }

  downloadChartHelper(callback) {
    let svgString = this.getSvgString();
    let imgsrc = 'data:image/svg+xml;base64,'+ btoa( decodeURIComponent( encodeURIComponent( svgString ) ) );
    var canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    canvas.width = this.width;
    canvas.height = this.height;
    var image = new Image();

    image.onload = () => {
      context.clearRect(0, 0, this.width, this.height);
      context.drawImage(image, 0, 0, this.width, this.height);

      canvas.toBlob((blob: any) => {
        var filesize = Math.round(blob.length/1024) + ' KB';
        if (callback) callback(blob, filesize);
      });
    }
    image.src = imgsrc;
  }

  downloadChart() {
    var saveCallback = (datablob, filesize) => {
      FileSaver.saveAs( datablob, 'D3 vis exported to PNG.png' );
    }

    this.downloadChartHelper(saveCallback);
  }
}
