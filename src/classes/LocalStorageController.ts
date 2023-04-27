export class LocalStorageController {
  static storage: Storage = localStorage;

  static saveItem(key: string, value: object): void {
    const serializedValue = JSON.stringify(value);
    this.storage.setItem(key, serializedValue);
  }

  static getItem<T>(key: string): T[] {
    const serializedValue = this.storage.getItem(key);
    if (!serializedValue) {
      return [];
    } else {
      return JSON.parse(serializedValue) as T[];
    }
  }

  static removeItem(key: string): void {
    this.storage.removeItem(key);
  }
}