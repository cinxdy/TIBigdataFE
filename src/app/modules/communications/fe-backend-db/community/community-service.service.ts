import { Injectable } from '@angular/core';
import { IpService } from 'src/app/ip.service';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommunityServiceService {
  protected URL = this.ipService.get_FE_DB_ServerIp();
  private LOAD_FIRST_DOC_LIST = this.URL + "/community/loadFirstDocList"; //mongoDB
  private LOAD_NEXT_DOC_LIST = this.URL + "/community/loadNextDocList"; //mongoDB
  private LOAD_PRIOR_DOC_LIST = this.URL + "/community/loadPriorDocList"; //mongoDB
  private docList : [] = [];
  constructor(protected ipService: IpService, private http: HttpClient,
  ) { }

  /**
   * @description 가장 최근 게시판 글들 로드하는 함수
   */
  async loadFirstDocList() {
    let res = await this.http.get<any>(this.LOAD_FIRST_DOC_LIST).toPromise();
    if(res.succ){
      this.docList = res.payload.list;
    }
    return this.docList;
  }

  /**
   * 
   * @param i : i번째 문서를 읽는다
   */
  navToReadThisDoc(i: number) {

  }

  /**
   * @function pressNextList
   * @description 다음 리스트의 커뮤니티 게시판을 요청하는 함수. FE 백엔드 서버에 요청.
   */
  pressNextList() {

  }

  /**
   * @description 이전 게시판 글 리스트를 요청하는 함수
   */
  pressPriorList() {

  }


}
