export class LocalStorageController {
  storage: Storage;

  constructor(storage: Storage = localStorage){
    this.storage = storage;
  }

  saveItem(key: string, value: object){
    const serializeObject = JSON.stringify(value);
    this.storage.setItem(key, serializeObject);
  }

  getItem<T>(key: string): T[]{
    const serializeObject = this.storage.getItem(key);
    if(!serializeObject){
      return [];
    } else {
      return JSON.parse(serializeObject) as T[];
    }
  }

  removeItem(key: string){
    this.storage.removeItem(key);
  }
}
