import { Profile } from "./Profile";

export class Message {
    public get targetId(): number {
        return this._targetId;
    }
    public set targetId(value: number) {
        this._targetId = value;
    }
    public get conversationId(): number {
        return this._conversationId;
    }
    public set conversationId(value: number) {
        this._conversationId = value;
    }
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get content(): string {
        return this._content;
    }
    public set content(value: string) {
        this._content = value;
    }
    public get time(): Date {
        return this._time;
    }
    public set time(value: Date) {
        this._time = value;
    }
    public get sender(): Profile {
        return this._sender;
    }
    public set sender(value: Profile) {
        this._sender = value;
    }
    public get isMine(): boolean {
        return this._isMine;
    }
    public set isMine(value: boolean) {
        this._isMine = value;
    }

    constructor(
        private _id: number,
        private _content: string,
        private _time: Date,
       
        private _isMine: boolean,
        private _conversationId: number,
        private _targetId?: number,
         private _sender?: Profile
    ) {}
}
