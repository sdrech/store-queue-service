import IStore from './store.interface';
export default class Store implements IStore {
    private maxStoreSize;
    private storageMap;
    constructor(maxItems: number);
    private updateQueueIfNeeded;
    protected validateKey(key: string): void | never;
    protected validateKeyAndValue(key: string, value: string): void | never;
    get(key: string): string | null | never;
    put(key: string, item: string): void | never;
    private logData;
    getStorage(): Map<string, string>;
}
