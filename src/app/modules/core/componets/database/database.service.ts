import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IpService } from 'src/app/ip.service'
import { IdControlService } from '../../../homes/body/search/service/id-control-service/id-control.service';
import { DocumentService } from '../../../homes/body/search/service/document/document.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private URL = this.ipService.getUserServerIp();

  private GET_KEYWORDS_URL = this.URL + "/keyword/getKeyVal";
  private GET_RCMD_URL = this.URL + "/rcmd/getRcmdTbl";


  constructor(private ipService: IpService,
    private idControl: IdControlService,
    private http: HttpClient,
    private docControl : DocumentService
  ) { }

  /**
    * @Param ids : id string array
    * @Param num : how many related documetns per each document? defualt = 5 if undefined.
    * @Param sim : if request cosine similarity of document
  */
  async getRcmdTable(ids: string | string[], num?: number, sim? : boolean) {
    console.log("in db rcmd : ", ids);
    return await this.http.post<any>(this.GET_RCMD_URL, { "id": ids, "num": num, "sim" : sim }).toPromise()
  }

  /**
    * @Param ids : id string array
    * @Param num : how many related documetns per each document? defualt = 5 if undefined.
  */

  async getTfidfValue(ids: string[], num?: number) {
    console.log("getTFIDF val:", ids);

    return await this.http.post<any>(this.GET_KEYWORDS_URL, { "id": ids, "num": num }).toPromise()
  }

  async getRelatedDocs(id: string) {
    let _rcmdIdsRes = await this.getRcmdTable(id)
    // console.log("rcmdRes:", _rcmdIdsRes)
    let rcmdIds = _rcmdIdsRes[0]["rcmd"];
    let _titlesRes = await this.docControl.convertID2Title(rcmdIds as string[])
    // console.log("rcmdRes:", rcmdIds)

    let titles = _titlesRes as []

    let i = 0;
    let relatedDocs = titles.map(t => {
      i++;
      return { "id": rcmdIds[i], "title": t };
    })

    // console.log("relatedDocs:", relatedDocs);
    return relatedDocs;
}

}
