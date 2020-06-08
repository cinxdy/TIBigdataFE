export interface User {
    id: String;//유저 id
    name: String;//유저 실명?
    institution : String;//유저 소속 기관
    email : String;//등록 혹은 연락하려는 이메일
    // responsible: String;
    // description: String;
    severity: String;//일반 유저 혹은 관리자?
    // status: String;
}