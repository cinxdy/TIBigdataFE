import { Component, OnInit } from '@angular/core';
import { IpService } from 'src/app/ip.service';
import { EPAuthService } from '../auth.service';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less']
})
export class ControlComponent implements OnInit {

  constructor(private http : HttpClient,private auth : EPAuthService, private ipservice : IpService) { }
  private userEmailReqURL : string = this.ipservice.getCommonIp() + ":4000/??";
  private userGoogleReqUrl : string = this.ipservice.getCommonIp() + ""
  private history : string = this.ipservice.getCommonIp() + ":4000/hst/getTotalHistory";
  // private isSudo : booelean;
  private users : any[] = [];
  private hst : any[] = [];

  ngOnInit() {
    this.http.get<any>(this.history).subscribe((res)=>{
      var r = res.histories;
      for(var i = 0 ; i < r.length; i++){
        var d = r[i];
        this.hst.push(
          {
            key : d.keyword,
            time : d.year + "년"+d.month + "월"+d.date + "일"+d.hour + "시"+d.min + "분"
          });
        }
    })

  }

}
