import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { IpService } from 'src/app/ip.service'

import {
  AuthService,
  SocialUser,
  GoogleLoginProvider,
} from "angularx-social-login";import { EPAuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService extends EPAuthService{

  // constructor() { super(); }
}
