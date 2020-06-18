export abstract class Auth {
    constructor() { }
  
    abstract verifyToken(tk): Promise<any>;
    abstract isOurUser(user): Promise<any>;
  
    /**
     * 
     * @param user 로그인하는 유저. 구글의 경우 undefined
     * @return 로그인 성공 했을 때 email인지 구글인지 어느 방식인지 반환
     */
    // abstract logIn(user?): Promise<any>;
  
    // logIn():Promise<any>;
    abstract logOut(): void;
    abstract getProfile(user);
    // register():Promise<any>;
    abstract getInstance();
    // abstract register():void
  }