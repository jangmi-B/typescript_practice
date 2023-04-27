class LocalStorageController {
    static saveItem(key, value) {
        const serializedValue = JSON.stringify(value);
        this.storage.setItem(key, serializedValue);
    }
    static getItem(key) {
        const serializedValue = this.storage.getItem(key);
        if (!serializedValue) {
            return [];
        }
        else {
            return JSON.parse(serializedValue);
        }
    }
    static removeItem(key) {
        this.storage.removeItem(key);
    }
}
LocalStorageController.storage = localStorage;
export { LocalStorageController };
