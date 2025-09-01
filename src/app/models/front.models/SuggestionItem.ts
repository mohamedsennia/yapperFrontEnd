export class SuggestionItem{
  
   
 
    constructor(private _id: number,private _title: string,private _subtitle: string){

    }
      public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
       public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }
     public get subtitle(): string {
        return this._subtitle;
    }
    public set subtitle(value: string) {
        this._subtitle = value;
    }
}