import { AfterViewInit, Component, OnDestroy, OnInit, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { SentimentService } from '../../../services/Sentiment.service';

@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPieComponent implements AfterViewInit, OnDestroy, OnInit {
  
  options: any = {};
  themeSubscription: any;
  data: any ={
    Positive: 200,
    Negative: 500,
    Neural: 100
  };
  echarts: any;
  colors: any;

  constructor(private theme: NbThemeService, private sentimentService: SentimentService) {
  }

  ngOnInit(){
    this.sentimentService.subject.subscribe(elements => {
      console.log("bbbbbbbbbb")
      console.log(elements)
      this.data = elements
      this.updateOptions()
    })
    
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.colors = config.variables;
      this.echarts = config.variables.echarts;
      this.updateOptions();
    });
  }
  
  updateOptions(){
    this.options = {
      backgroundColor: this.echarts.bg,
      color: [this.colors.dangerLight, this.colors.infoLight, this.colors.successLight],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Positive', 'Negative', 'Neural'],
        textStyle: {
          color: this.echarts.textColor,
        },
      },
      series: [
        {
          name: 'Countries',
          type: 'pie',
          radius: '80%',
          center: ['50%', '50%'],
          data: [
            { value: this.data.Negative, name: 'Negative' },
            { value: this.data.Neural, name: 'Neural' },
            { value: this.data.Positive, name: 'Positive' },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: this.echarts.itemHoverShadowColor,
            },
          },
          label: {
            normal: {
              textStyle: {
                color: this.echarts.textColor,
              },
            },
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: this.echarts.axisLineColor,
              },
            },
          },
        },
      ],
    };
  }
  
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
