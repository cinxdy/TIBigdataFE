import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable} from 'rxjs';

@Component({
  selector: 'app-parser-container',
  templateUrl: './parser-container.component.html',
  styleUrls: ['./parser-container.component.less']
})


export class ParserContainerComponent implements OnInit {



  url: string = 'http://localhost:9200/_ingest/pipeline/attachment?pretty';
  url2: string = 'http://localhost:9200/text/text/1?pipeline=attachment&pretty'
  url3: string = 'http://localhost:9200/text/text/1?pipeline=attachment&pretty'
  url4: string = 'http://localhost:9200/text/text/1?pretty'

  pdfData:any;

  contentType:string;
  contentLength:string;
  contents:string;
  base64Result:string;
    constructor (private http: HttpClient) { }

    fileUpload;
    fileResult: any;


    onFileChange(event){
      let result = this.fileUpload(event).then(result => {
        this.base64Result = result['base64'];
        console.log(this.base64Result);
      });
    }
    headers = new HttpHeaders()
             .set('content-type', 'application/json')
  
    // 1.create an attachment pipeline and try to extract encoded information
    sendPutRequest() {
       

         const body = {
             description: 'Extract attachment information encoded in Base64 with UTF-8 charset',
             processors: [
              {
                "attachment" : {
                  "field" : "data"
                }
              }
            ],
         }

         return this.http
                    .put(this.url, body, { headers: this.headers })
                    .subscribe(res => console.log(res));
    }  

    // 2. index a test document to see the attachment pipeline in action.

    indexDocument(){
     

         const body = {
             data: this.base64Result
         }

         return this.http
                    .put(this.url2, body, { headers: this.headers })
                    .subscribe(res => console.log(res));
    }
    

    // 3. specify fields of wihch wants to extract data

    specifyFields(){
         const body = {
          description : "Extract attachment information encoded in Base64 with UTF-8 charset",
          processors : [
            {
              attachment : {
                field : "data",
                properties: [ "content", "content_length", "content_type" ]
              }
            }
          ]
         }
         return this.http
                    .put(this.url, body, { headers: this.headers })
                    .subscribe(res => {
                      console.log(res)
                    });
    }

    // 4. get context

    getContext(){
      const body = {
        description : "Extract attachment information encoded in Base64 with UTF-8 charset",
        processors : [
          {
            attachment : {
              field : "data",
              properties: [ "content", "content_length", "content_type" ]
            }
          }
        ]
       }
       return this.http
                  .get(this.url4,{ headers: this.headers })
                  .subscribe(res => {
                    this.pdfData = res['_source']['attachment'];
                    this.contentLength = this.pdfData['content_length'];
                    this.contentType = this.pdfData['content_type'];
                    this.contents = this.pdfData['content'];

                    console.log(this.pdfData['content_length']);
                  });
    }
    ngOnInit(){

    }
}
