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

  constructor(private http: HttpClient, private auth: EPAuthService, private ipservice: IpService) { }
  private userEmailReqURL: string = this.ipservice.getCommonIp() + ":4000/??";
  private userGoogleReqUrl: string = this.ipservice.getCommonIp() + ""
  private HISTORY_URL: string = this.ipservice.getCommonIp() + ":4000/hst/getTotalHistory";
  private E_USER_URL: string = this.ipservice.getCommonIp() + ":4000/eUser/getEuserList";
  private G_USER_URL: string = this.ipservice.getCommonIp() + ":4000/gUser/getGuserList";

  // private isSudo : booelean;
  private users: any[] = [];
  private hst: any[] = [];

  ngOnInit() {
    this.http.get<any>(this.HISTORY_URL).subscribe((res) => {
      var r = res.histories;
      for (var i = 0; i < r.length; i++) {
        var d = r[i];
        this.hst.push(
          {
            key: d.keyword,
            time: d.year + "년" + d.month + "월" + d.date + "일" + d.hour + "시" + d.min + "분"
          });
      }
    });

    this.http.get<any>(this.E_USER_URL).subscribe((res) => {
      // console.log(r);
      if(!res.succ){
        console.error("http request error in getting all user list in control component")
      }
      var r = res.payload;
      for (var i = 0; i < r.length; i++) {
        var d = r[i];
        // console.log(d);
        this.users.push(
          {
            email: d.email,
            inst:d.inst,
            name:d.name,
            nickname:d.nickname,
            password:d.password
          });
      }

    });
  }



}
