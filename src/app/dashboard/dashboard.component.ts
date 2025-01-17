import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/Services/event.service';
import { MemberService } from 'src/Services/member.service';

import { ChartDataset,ChartOptions } from 'chart.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  nbMember : number=0;
  nbEvents : Number=0;
  nbTools : Number=0;
  nbArticles : Number=0;
  nb_students:number=0;
  nb_teachers:number=0;
  tab_pub:number[]=[];

  chartData: ChartDataset[] = [
    {
    // ⤵ Add these
    label: '',
    data: []
    }
    ];
    //Courbe2
    chartData1: ChartDataset[] = [
    {
    // ⤵ Add these
    label: '',
    data: []
    }
    ];
  chartLabels : string[] = [];
  chartLabels1: string[] = ['teacher', 'student'];
  chartOptions: ChartOptions = {};
  constructor(private MS:MemberService,private ES:EventService){
    this.MS.getAllMembers().subscribe((data) => {
      this.nbMember = data.length
      for(let i =0; i<this.nbMember;i++)
        {
        this.chartLabels.push(data[i].nom);// courbe 1 (axe des x)
        //this.tab_pub.push(data[i].tab_pub.length) // tab_pub déclaré tabelau de number
        }

      this.chartData = [
        {
        label: '' ,
        data : this.tab_pub
        }
        ];
        //Courbe2
        this.chartData1 = [
        {
        // ⤵ Add these
        label: '',
        data: [this.nb_teachers,this.nb_students]
        }
        ];

    })
  }

}
