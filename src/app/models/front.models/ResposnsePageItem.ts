export class ResponseItemPage<T>
{

constructor (private _data: T[],private _last: boolean){}
public get data(): T[] {
    return this._data;
}
public set data(value: T[]) {
    this._data = value;
}
public get last(): boolean {
    return this._last;
}
public set last(value: boolean) {
    this._last = value;
}
}