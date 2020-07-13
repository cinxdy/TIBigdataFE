import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.less']
})
export class CommunityComponent implements OnInit {

  constructor(       
    private router: Router,) { }

  ngOnInit() {
  }

  /**
   * @description 가장 최근 게시판 글들 로드하는 함수
   */
  loadFirstDocList() {

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
   * @description 새 글 쓰는 화면으로 이동
   */
  navToWriteNewDoc() {

  }
  /**
   * 
   * 게시판 글을 불러오는 기능
   *  클릭하면 해당 글 읽기 화면으로 이동하는 함수
   *  navToReadThisDoc
   * 다음, 다음, 다음...
   *  pressNextList()
   * html.getNextList("url of the next page fuction")
   *  다음 페이지 불러오는 함수
   *  이전 페이지 불러오는 함수
   *    *  pressPriorList()
   * 새 글을 작성하는 기능 : 유저가 로그인한 상태여야 글쓰기 버튼 활성화
   *  navToWriteNewDocㅡ
   * 새 글 페이지로 이동
   *  라우터 함수
 
   * 
   * 
   * 
   */

}
