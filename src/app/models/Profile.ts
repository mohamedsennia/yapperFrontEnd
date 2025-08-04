export class Profile{
   
    constructor(private _id: number,private _ownerFirstName: string,private _ownerLastName: string,private _ownerId: number){}
     public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get ownerFirstName(): string {
        return this._ownerFirstName;
    }
    public set ownerFirstName(value: string) {
        this._ownerFirstName = value;
    }
    public get ownerLastName(): string {
        return this._ownerLastName;
    }
    public set ownerLastName(value: string) {
        this._ownerLastName = value;
    }
    public get ownerId(): number {
        return this._ownerId;
    }
    public set ownerId(value: number) {
        this._ownerId = value;
    }
}