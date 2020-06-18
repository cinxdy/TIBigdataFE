/**
 * @description 유저 백엔드 서버와 통신하는 서비스 모듈
 * 서버에서 요청받는 response의 형식은 
 * {
 *       succ : String;
    msg : String;
    payload : {};
 * }
 * 
 */

import { Res } from './res.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IpService } from 'src/app/ip.service'
@Injectable({
  providedIn: 'root'
})
export class QueryServiceService {

  constructor(
    private ipService: IpService,
    private http: HttpClient, ) { }

  private URL = this.ipService.get_FE_DB_ServerIp();
  private EMAIL_REG_URL = this.URL + "/eUser/register"; //mongoDB
  private EMAIL_LOGIN_URL = this.URL + "/eUser/login";
  private EMAIL_VERIFY_TOKEN = this.URL + "/eUser/verify";
  private EMAIL_CHECK_OUR_USER_URL = this.URL + "/eUser/eCheckUser";
  /**
   * data analysis queries
   */


  /**
  * user data db queries
  */


  /**
   * @description 서버와 통신할 때 규격을 체크.
   * 자바스크립트가 compile time에 typesafe을 해주지 않음...
   * 백엔드 서버와 통신하는 인터페이스를 바꿀 때 사용
   * 인터페이스 설정이 미약하거나, 규격을 지키지 않으면 유지보수가 힘들어짐.
   */
  checkType(res) {
    try {
      let result = new Res(res.succ, res.msg, res.payload);
      return res.succ;
    }
    catch (e) {
      console.error("user backend communication error : ", e);
    }

  }

  // async registerEmail(user){
  //   return await this.http.post<any>(this.EMAIL_REG_URL, user).toPromise();
  // }

  async verifyTokenQuery(token): Promise<any> {
    // return await this.http.post<any>(this.EMAIL_VERIFY_TOKEN, token).toPromise();
  }

  /**
   * @function logInQuery 이메일 유저의 정보를 가지고 로그인을 시도한다.
   * @param user 이메일과 비밀번호가 담긴 user object.
   * @return object : {succ : boolean, msg : string, payload : {token: token, name : string, email : string}}
   */
  async logInQuery(user) {
    // let res = await this.http.post<any>(this.EMAIL_LOGIN_URL, user).toPromise();
    // return this.checkType(res)
    // return res;
  }


}
