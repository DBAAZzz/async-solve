export interface Trunk {
    [key: string]: Promise<any>;
}
export interface TrunkResolve {
    [key: string]: Function;
}
export declare class AsyncScheme {
    constructor();
    _pendingPromise(key: string): Promise<unknown>;
    /**
   * 添加要监听的 key 值
   * @param {String | Array} key
   */
    addKey: (key: string | Array<string>, ...args: any[]) => void;
    setKeyValue(key: string, value: any): void;
    execAsyncFn(key: string | Array<string>, cb: Function): void;
}
