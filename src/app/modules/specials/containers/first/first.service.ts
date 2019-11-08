import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Config {
    classification : [];
}

@Injectable()
export class ConfigService {
    constructor(private http: HttpClient) { }


    configUrl = 'assets/special_first/file.json';

    getConfig() {
        return this.http.get(this.configUrl);
    }
}