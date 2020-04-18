import { Component, OnInit } from '@angular/core';
import { EPAuthService } from '../../../core/componets/membership/auth.service';

@Component({
  selector: 'app-main-home-container',
  templateUrl: './main-home-container.component.html',
  styleUrls: ['./main-home-container.component.less']
})
export class MainHomeContainerComponent implements OnInit {

  constructor(private auth : EPAuthService) { }

  ngOnInit() {
    // console.log(this.auth.verifySignIn())
  }

}
