import { Injectable } from '@angular/core';
import { IpService } from 'src/app/ip.service';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommunityServiceService {
  protected URL = this.ipService.get_FE_DB_ServerIp();
  private URL_LOAD_FIRST_DOC_LIST = this.URL + "/community/loadFirstDocList"; //mongoDB
  private URL_LOAD_NEXT_DOC_LIST = this.URL + "/community/loadNextDocList"; //mongoDB
  private URL_LOAD_PRIOR_DOC_LIST = this.URL + "/community/loadPriorDocList"; //mongoDB
  private URL_WRITE_NEW_DOC = this.URL + "/community/writeNewDoc"; //mongoDB
  private docList: {}[] = [];
  private idx: number = 0;
  private isDocListExist: boolean = true;
  private DOC_NUM_PER_EACH_PAGE = 10;
  // private chosen_idx : number = 0;
  private aDoc = {};
  constructor(protected ipService: IpService, private http: HttpClient,
  ) { }


  choseDoc(i : number){
    // this.chosen_idx = i;
    // this.
    this.aDoc["user"] = this.docList[i]["user"];
    this.aDoc["content"] = this.docList[i]["content"];

  }
  getChosenDoc(){
    return this.aDoc;
  }

  clearDocList() {
    this.docList = [];
  }

  getEachPageDocNum() {
    return this.DOC_NUM_PER_EACH_PAGE;
  }

  setNewStartIdx(new_idx) {
    this.idx = new_idx;
  }

  getNewStartIDx() {
    return this.idx;
  }


  /**
   * @description 가장 최근 게시판 글들 로드하는 함수
   */
  async loadFirstDocList() {
    let res = await this.http.get<any>(this.URL_LOAD_FIRST_DOC_LIST).toPromise();
    this.clearDocList();
    if (res.succ) {
      // console.log(res);
      var payload = res.payload;
      // console.log("payload : ", payload)
      for (var i = 0; i < this.DOC_NUM_PER_EACH_PAGE; i++) {
        var doc = {};

        doc["user"] = payload[i].user;
        doc["content"] = payload[i].content;
        this.docList.push(doc);
        this.isDocListExist = true;
        // console.log("service start idx : ", this.idx);
        this.setNewStartIdx(0);
        // console.log("new service start idx : ", this.idx);

      }
      // console.log("docList : ", this.docList);
    }
    if (this.docList.length == 0) {
      this.isDocListExist = false;
    }
    return this.docList;
  }

  async loadNextDocList(start_idx: number) {
    // console.log("start idx : ", start_idx)
    let body = { cur_start_idx: start_idx };
    // console.log("comnunity service load next doc list : before send" )

    let res = await this.http.post<any>(this.URL_LOAD_NEXT_DOC_LIST, body).toPromise();
    // console.log("comnunity service load next doc list")
    this.clearDocList();
    if (res.succ) {
      // console.log(res);
      var payload = res.payload;
      for (var i = 0; i < this.DOC_NUM_PER_EACH_PAGE; i++) {
        var doc = {};

        doc["user"] = payload.data[i].user;
        doc["content"] = payload.data[i].content;
        this.docList.push(doc);
        this.isDocListExist = true;
      }
      this.setNewStartIdx(payload.next_start_idx);
      // console.log("docList : ", this.docList);
    }
    if (this.docList.length == 0) {
      this.isDocListExist = false;
    }
    return this.docList;
  }

  async loadPriorDocList(start_idx: number) {
    // console.log("start idx : ", start_idx)
    let body = { cur_start_idx: start_idx };
    // console.log("comnunity service load next doc list : before send" )

    let res = await this.http.post<any>(this.URL_LOAD_PRIOR_DOC_LIST, body).toPromise();
    // console.log("comnunity service load next doc list")
    this.clearDocList();
    if (res.succ) {
      // console.log(res);
      var payload = res.payload;
      for (var i = 0; i < this.DOC_NUM_PER_EACH_PAGE; i++) {
        var doc = {};

        doc["user"] = payload.data[i].user;
        doc["content"] = payload.data[i].content;
        this.docList.push(doc);
        this.isDocListExist = true;
      }
      this.setNewStartIdx(payload.next_start_idx);
      // console.log("docList : ", this.docList);
    }
    if (this.docList.length == 0) {
      this.isDocListExist = false;
    }
    return this.docList;
  }

  async writeNewDoc(body: {}) {

    let res = await this.http.post<any>(this.URL_WRITE_NEW_DOC, body).toPromise();
    // console.log("community-service writeNewDoc : ", res);
    // alert("ok")
  }

  /**
   * @description 저장되어 있는 문서가 있는지 확인.
   */
  getIsDocListExist() {
    return this.isDocListExist;
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

  /**
   * @description 새 게시글을 저장한다.
   */
  saveNewDoc() {

  }


}
