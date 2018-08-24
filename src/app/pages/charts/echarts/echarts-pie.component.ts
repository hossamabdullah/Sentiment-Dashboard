import { AfterViewInit, Component, OnDestroy, OnInit, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { SentimentService } from '../../../services/Sentiment.service';
import { Topic } from '../../../types/Topic.model';

@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPieComponent implements AfterViewInit, OnDestroy, OnInit {
  @Input()
  positive: Number;

  @Input()
  negative: Number;

  @Input()
  neural: Number;

  options: any = {};
  themeSubscription: any;
  data: any ={
    positive: 200,
    negative: 500,
    neural: 100
  };
  echarts: any;
  colors: any;

  constructor(private theme: NbThemeService, private sentimentService: SentimentService) {
  }

  ngOnInit(){
    console.log("hossssam")
    console.log(this.positive)

    if(!this.positive){
      this.sentimentService.subject.subscribe(elements => {
        console.log("bbbbbbbbbb")
        console.log(elements)
        this.data = elements
        this.updateOptions()
      })
    }
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.colors = config.variables;
      this.echarts = config.variables.echarts;
      if(this.positive){
        this.data.positive = this.positive
        this.data.negative = this.negative
        this.data.neural = this.neural
      }
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
            { value: this.data.negative, name: 'Negative' },
            { value: this.data.neural, name: 'Neural' },
            { value: this.data.positive, name: 'Positive' },
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
