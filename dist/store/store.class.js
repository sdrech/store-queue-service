"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isLogEnabled = true;
class Store {
    constructor(maxItems) {
        this.maxStoreSize = 0;
        if (Number(maxItems) !== maxItems || maxItems < 1) {
            throw new Error('Store size must be an integer number greater than 1');
        }
        this.maxStoreSize = maxItems;
        this.storageMap = new Map();
    }
    updateQueueIfNeeded(action, key, newValue) {
        const value = (action === this.put.name)
            ? newValue
            : this.storageMap.get(key);
        if (value !== undefined) {
            this.storageMap.delete(key);
        }
        if (action === this.put.name && this.storageMap.size === this.maxStoreSize) {
            const [oldestKey] = this.storageMap;
            this.storageMap.delete(oldestKey[0]);
        }
        if (value !== undefined) {
            this.storageMap.set(key, value);
        }
        return { key, value };
    }
    validateKey(key) {
        if (String(key) !== key || !(/^[a-z]+$/.test(key))) {
            throw new Error('Key must be not empty and contain a-z characters in lower case only');
        }
    }
    validateKeyAndValue(key, value) {
        this.validateKey(key);
        if (String(value) !== value) {
            throw new Error('Value must be a string');
        }
    }
    get(key) {
        this.validateKey(key);
        let { value } = this.updateQueueIfNeeded(this.get.name, key);
        value !== null && value !== void 0 ? value : (value = null);
        this.logData(this.get.name, { key, value });
        return value;
    }
    put(key, item) {
        this.validateKeyAndValue(key, item);
        this.updateQueueIfNeeded(this.put.name, key, item);
        this.logData(this.put.name, { key, value: item });
    }
    logData(action, keyValuePair) {
        if (!isLogEnabled) {
            return;
        }
        console.log(Object.assign(Object.assign({ action }, keyValuePair), { storageMap: this.storageMap }));
    }
    getStorage() {
        return this.storageMap;
    }
}
exports.default = Store;
