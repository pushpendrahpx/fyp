export class Devie{
    constructor(data:any){
        this.deviceId = data.id;
    }
    deviceId:''
}
export class User{

    constructor(data:any){
        this.info = data;
        this.devices = []
        this.isLoggedIn = true;
        
    }
    info:any;
    devices:Array<any>;
    isLoggedIn:boolean;
}
