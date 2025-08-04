import { PostTypes } from "../enums/PostTypes";
import { Profile } from "./Profile";

export class Post{
    
    constructor(private _id: number,private _content: string,private _date: Date,private _postType: PostTypes,private _profile: Profile,private _commentsCount: number,private _likesCount: number){}
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
    public get date(): Date {
        return this._date;
    }
    public set date(value: Date) {
        this._date = value;
    }
    public get postType(): PostTypes {
        return this._postType;
    }
    public set postType(value: PostTypes) {
        this._postType = value;
    }
    public get profile(): Profile {
        return this._profile;
    }
    public set profile(value: Profile) {
        this._profile = value;
    }
    public get commentsCount(): number {
        return this._commentsCount;
    }
    public set commentsCount(value: number) {
        this._commentsCount = value;
    }
    public get likesCount(): number {
        return this._likesCount;
    }
    public set likesCount(value: number) {
        this._likesCount = value;
    }
}