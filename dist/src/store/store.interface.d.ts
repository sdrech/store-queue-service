export default interface IStore {
    get(key: string): string | null;
    put(key: string, item: string): void;
}
