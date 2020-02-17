
  export class dataSet {
    name: string;
    level: string = "root";
    children: _topic[];
  }
  
  export class _topic {
    name: string;
    level: string = "parent";
    value: number;
    order : number;
    showLabels: boolean = true;
    tooltipTitle: string;
    color?: string = "DarkSlateGray";
    children?: doc[];
  }
  
  export class doc{
    name: string;
    level : string = "child";
    url? : string;  //해당 문서의 url 바로 보내주기
    color? : string = "DarkGray";
    value: number;
    contents? : string;
    keyWords? : string; // 해당 문서에서 높은 단어 빈도 수 띄우기
  }