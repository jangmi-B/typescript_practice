export class LocalStorageController {
    constructor(storage = localStorage) {
        this.storage = storage;
    }
    saveItem(key, value) {
        const serializeObject = JSON.stringify(value);
        this.storage.setItem(key, serializeObject);
    }
    getItem(key) {
        const serializeObject = this.storage.getItem(key);
        if (!serializeObject) {
            return [];
        }
        else {
            return JSON.parse(serializeObject);
        }
    }
    removeItem(key) {
        this.storage.removeItem(key);
    }
}
