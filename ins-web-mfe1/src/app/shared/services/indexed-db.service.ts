import { Injectable } from '@angular/core';


@Injectable()

// Indexed DB Common service use to save data in db
export class IndexedDbService {
  private databaseName = 'Insurance';
  private databaseVersion = 1;
  private database: IDBDatabase | null = null;

  constructor() {
    this.openDatabase();
  }

  // Method use to Open IndexedDB
  public openDatabase(): void {
    const request = indexedDB.open(this.databaseName, this.databaseVersion);

    request.onsuccess = (event) => {
      this.database = (event.target as IDBRequest).result;
      console.log('Database opened successfully');
    };

    request.onerror = (event) => {
      console.error('Error opening database:', (event.target as IDBRequest).error);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBRequest).result;
      if (!db.objectStoreNames.contains('insuranceDetails')) {
        const store = db.createObjectStore('insuranceDetails', { keyPath: 'policyNumber' });
        store.createIndex('policyNumber', 'policyNumber', { unique: true });
      }
    };
  }

  // Method use to save insurance details in IndexedDB
  public saveInsuranceDetails(data: any): void {
    if (!this.database) {
      console.error('Database is not initialized');
      return;
    }

    const transaction = this.database.transaction(['insuranceDetails'], 'readwrite');
    const store = transaction.objectStore('insuranceDetails');

    const request = store.put(data);
    request.onsuccess = () => {
      console.log('Insurance details saved successfully');
    };
    request.onerror = (event) => {
      console.error('Error saving insurance details:', (event.target as IDBRequest).error);
    };
  }

  // Method use to get insurance details by policy number
  public getInsuranceDetails(policyNumber: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.database) {
        reject('Database is not initialized');
        return;
      }

      const transaction = this.database.transaction(['insuranceDetails'], 'readonly');
      const store = transaction.objectStore('insuranceDetails');

      const request = store.get(policyNumber);
      request.onsuccess = (event) => {
        resolve((event.target as IDBRequest).result);
      };
      // request.onerror = (event) => {
      //   reject('Error retrieving insurance details:', (event.target as IDBRequest).error);
      // };
    });
  }

  //Method use to get all insurance details
  public getAllInsuranceDetails(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (!this.database) {
        reject('Database is not initialized');
        return;
      }

      const transaction = this.database.transaction(['insuranceDetails'], 'readonly');
      const store = transaction.objectStore('insuranceDetails');

      const request = store.getAll();  // Get all items in the store
      request.onsuccess = (event) => {
        resolve((event.target as IDBRequest).result);
      };
      // request.onerror = (event) => {
      //   reject('Error retrieving all insurance details:', (event.target as IDBRequest).error);
      // };
    });
  }

  getAllItems() {
    if (!this.database) {
     return ('Database is not initialized');
    } else {
      const transaction = this.database.transaction(['insuranceDetails'], 'readonly');
      const store = transaction.objectStore('insuranceDetails');

      const request = store.openCursor();

      const items: any = [];
      request.onsuccess = function (event: any) {
        const cursor = event.target.result;
        if (cursor) {
          items.push(cursor.value);
          cursor.continue(); // Move to the next record
        } else {
          console.log('All items:', items);
        }
      };

      request.onerror = function (event: any) {
        console.error('Error reading items:', event.target.error);
      };
      return items;
    }
  }


}
