import { Message } from "./Message";

export class Conversation{
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get messages(): Message[] {
        return this._messages;
    }
    public set messages(value: Message[]) {
        this._messages = value;
    }
    public get conversationName(): string {
        return this._conversationName;
    }
    public set conversationName(value: string) {
        this._conversationName = value;
    }
    constructor(private _id: number,private _messages: Message[],private _conversationName: string){}
}