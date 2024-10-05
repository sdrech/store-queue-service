import IStore from './store.interface'

const isLogEnabled = true

export default class Store implements IStore {
    private maxStoreSize = 0
    private storageMap: Map<string, string>
    
    public constructor(maxItems: number) {
        if (Number(maxItems) !== maxItems || maxItems < 1) {
            throw new Error('Store size must be an integer number greater than 1')
        }
        this.maxStoreSize = maxItems
        this.storageMap = new Map<string, string>()
    }

    /**
     * Contains entire business logic for handling records in appropriate order
     */
    private updateQueueIfNeeded(
        action: string, 
        key: string, 
        newValue?: string
    ): Record<string, string | undefined> {
        const value: string | undefined = (action === this.put.name)
            ? newValue 
            : this.storageMap.get(key)

        if (value !== undefined) {
            this.storageMap.delete(key)
        }
        if (action === this.put.name && this.storageMap.size === this.maxStoreSize) {
            // if the current pair wasn't found & deleted above
            // double deleting is impossible here as validation for size won't allow it
            const [oldestKey] = this.storageMap
            this.storageMap.delete(oldestKey[0])
        }
        if (value !== undefined) {
            this.storageMap.set(key, value)
        }

        return { key, value }
    }

    protected validateKey(key: string): void | never {
        // 'never' type means method can throw an error (aka throwable type)
        if (String(key) !== key || !(/^[a-z]+$/.test(key))) {
            throw new Error('Key must be not empty and contain a-z characters in lower case only')
        }
    }

    protected validateKeyAndValue(key: string, value: string): void | never {
        this.validateKey(key)
        if (String(value) !== value) {
            throw new Error('Value must be a string')
        }
    }

    public get(key: string): string | null | never {
        this.validateKey(key)
        let { value } = this.updateQueueIfNeeded(this.get.name, key)
        value ??= null
        this.logData(this.get.name, {key, value})
        return value
    }

    public put(key: string, item: string): void | never {
        this.validateKeyAndValue(key, item)
        this.updateQueueIfNeeded(this.put.name, key, item)
        this.logData(this.put.name, {key, value: item})
    }

    private logData(action: string, keyValuePair?: Record<string, string | null>): void {
        if (!isLogEnabled) {
            return
        }

        console.log({
            action,
            ...keyValuePair,
            storageMap: this.storageMap
        })
    }

    /**
     * Just for test purposes
     */
    public getStorage(): Map<string, string> {
        return this.storageMap
    }

}