export class Profile {
  constructor(
    private _id: number,
    private _profileName: string,
    private _ownerId: number,
    private _subscribers?: number,
    private _subscriptions?: number,
    private _isFollowed?: boolean,
    private _Me?: boolean,
    private _conversationId?: number
  ) {}

  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }

  public get profileName(): string {
    return this._profileName;
  }
  public set profileName(value: string) {
    this._profileName = value;
  }

  public get ownerId(): number {
    return this._ownerId;
  }
  public set ownerId(value: number) {
    this._ownerId = value;
  }

  public get subscribers(): number {
    return this._subscribers;
  }
  public set subscribers(value: number) {
    this._subscribers = value;
  }

  public get subscriptions(): number {
    return this._subscriptions;
  }
  public set subscriptions(value: number) {
    this._subscriptions = value;
  }

  public get isFollowed(): boolean {
    return this._isFollowed;
  }
  public set isFollowed(value: boolean) {
    this._isFollowed = value;
  }

  public isMe():boolean{
      return this._Me;
  }

  public get conversationId(): number {
    return this._conversationId;
  }
  public set conversationId(value: number) {
    this._conversationId = value;
  }
}
