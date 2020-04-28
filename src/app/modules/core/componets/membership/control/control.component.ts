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
  private HISTORY_COUNT_URL: string = this.ipservice.getCommonIp() + ":4000/hst/getHistoryCount";

  private E_USER_URL: string = this.ipservice.getCommonIp() + ":4000/eUser/getEuserList";
  private G_USER_URL: string = this.ipservice.getCommonIp() + ":4000/gUser/getGuserList";

  private pageNum : number;

  // private isSudo : booelean;
  private users: any[] = [];
  private hst: any[] = [];

  private HST_PER_PAGE : number = 50;

  ngOnInit() {

    //get history count
    this.http.get<any>(this.HISTORY_COUNT_URL).subscribe((res) => {
      let count = res.count;
      console.log(count);
      this.pageNum = count / this.HST_PER_PAGE;//total pages.
      let startIdx = 0;
      var num = this.HST_PER_PAGE;
      // while(1){
      //   if(startIdx > count){
      //     //show left over
      //     num = startIdx - count;
      //     break;
      //   }

        //get total history
        this.http.post<any>(this.HISTORY_URL,{idx : startIdx, num : num}).subscribe((res) => {
          
          var r = res.histories;
          console.log(r);
          for (var i = 0; i < r.length; i++) {
            var d = r[i];
            this.hst.push(
              {
                key: d.keyword,
                time: d.year + "년" + d.month + "월" + d.date + "일" + d.hour + "시" + d.min + "분"
              });
          }
          console.log(this.hst);
        });

      //   startIdx += this.HST_PER_PAGE;
      // }
    })


    //get email user info
    this.http.get<any>(this.E_USER_URL).subscribe((res) => {
      // console.log(r);
      if (!res.succ) {
        console.error("http request error in getting all user list in control component")
      }
      var r = res.payload;
      for (var i = 0; i < r.length; i++) {
        var d = r[i];
        // console.log(d);
        this.users.push(
          {
            email: d.email,
            inst: d.inst,
            name: d.name,
            nickname: d.nickname,
            password: d.password
          });
      }

    });




  }
}
