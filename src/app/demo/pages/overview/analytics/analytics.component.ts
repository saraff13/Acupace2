import {Component, OnInit} from '@angular/core';
import {ChartDB} from '../../../../fack-db/chart-data';
import {ApexChartService} from '../../../../theme/shared/components/chart/apex-chart/apex-chart.service';
@Component({
  selector: 'app-crt-apex',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  public chartDB: any;
  Notifications:any;
  Notifications_host:any;
  constructor(public apexEvent: ApexChartService) {
    this.chartDB = ChartDB;
  }
  ngOnInit() {
  }
}
