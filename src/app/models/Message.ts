export class Message{
    constructor(  private  id:number,
        private  content:string,
        private  time:Date,
        private  senderId:number,
        private  recipientId:number){
          
        }
    getConent(){
        return this.content;
    }
    getSenderId(){
        return this.senderId;
    }
    getRecipientId(){
        return this.recipientId;
    }
    getTime(){
        return this.time;
    }
    setContent(content:string){
        this.content=content
    }
    
}