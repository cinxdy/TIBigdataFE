import { Component, OnInit } from '@angular/core';
import { EPAuthService } from '../../auth.service';

@Component({
  selector: 'app-social-register',
  templateUrl: './social-register.component.html',
  styleUrls: ['./social-register.component.less']
})
export class SocialRegisterComponent implements OnInit {

  constructor(private auth : EPAuthService) { }

  private agrEmail : boolean = false;
  private agrAcs : boolean = false;
  private agrSrcHtr : boolean = false;

  ngOnInit() {
  }

  gRegister(platform :string):void{
    // this.auth.gLogIn(platform);
    //ask google if this user correct.
    //if yes : register email.
    //if no... ?
    //nononoonono i do not have to ask!
    //if(all checkbox is checked...)
    this.auth.gRegisterUser(this.auth.getNowUser()).subscribe((res)=>{
      // if(res...is yes)
      //then
      console.log(res);
      alert(`{{res.email}}"으로 회원가입 되었습니다. KUBiC 회원이 되신 것을 환영합니다.`);
    });

  }

  

}
