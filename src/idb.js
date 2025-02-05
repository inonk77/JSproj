// idb.js
/*class IDBLibrary {
    constructor(dbName, version) {
        this.dbName = dbName;
        this.version = version;
        this.db = null;
    }

    async init(objectStores) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                objectStores.forEach((store) => {
                    if (!db.objectStoreNames.contains(store.name)) {
                        db.createObjectStore(store.name, {keyPath: store.keyPath, autoIncrement: store.autoIncrement});
                    }
                });
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this.db);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }

    async add(storeName, data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(data);

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject(event.target.error);
        });
    }

    async getAll(storeName) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject(event.target.error);
        });
    }

    async getByIndex(storeName, indexName, value) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const index = store.index(indexName);
            const request = index.getAll(value);

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject(event.target.error);
        });
    }

    async delete(storeName, key) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(key);

            request.onsuccess = () => resolve(`Item with key ${key} deleted successfully.`);
            request.onerror = (event) => reject(event.target.error);
        });
    }

    async clearStore(storeName) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.clear();

            request.onsuccess = () => resolve();
            request.onerror = (event) => reject(event.target.error);
        });
    }

// idb.js

    async getByMonthAndYear(storeName, month, year) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => {
                const results = request.result.filter((item) => {
                    const itemDate = new Date(item.date); // Assuming 'date' is stored in ISO format or as a Date object
                    return itemDate.getMonth() === month - 1 && itemDate.getFullYear() === year;
                });
                resolve(results);
            };

            request.onerror = (event) => reject(event.target.error);
        });
    }

}
// יצירת מופע אחד של המחלקה:
const dbLibrary = new IDBLibrary('CostManagerDB', 1);

// ביצוע אתחול על אובייקט זה:
dbLibrary.init([{ name: 'costs', keyPath: 'id', autoIncrement: true }]);

export default dbLibrary;*/
/*class IDBLibrary {
    constructor(dbName, version) {
        this.dbName = dbName;
        this.version = version;
        this.db = null;
    }

    async init(objectStores) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                objectStores.forEach((store) => {
                    if (!db.objectStoreNames.contains(store.name)) {
                        db.createObjectStore(store.name, { keyPath: store.keyPath, autoIncrement: store.autoIncrement });
                    }
                });
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this.db);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }

    async add(storeName, data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(data);

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject(event.target.error);
        });
    }

    async getAll(storeName) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject(event.target.error);
        });
    }

    async getByMonthAndYear(storeName, month, year) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => {
                const results = request.result.filter((item) => {
                    const itemDate = new Date(item.date);
                    return itemDate.getMonth() === month - 1 && itemDate.getFullYear() === year;
                });
                resolve(results);
            };

            request.onerror = (event) => reject(event.target.error);
        });
    }
}

// יצירת מופע אחד של המחלקה
const dbLibrary = new IDBLibrary('CostManagerDB', 1);

// חשיפת idb כמשתנה גלובלי כדי להתאים לדרישות ה-HTML של המרצה
window.idb = {
    openCostsDB: async function(dbName, version) {
        await dbLibrary.init([{ name: 'costs', keyPath: 'id', autoIncrement: true }]);
        return this;
    },

    addCost: async function(data) {
        return dbLibrary.add('costs', {
            ...data,
            sum: parseFloat(data.sum),
            date: new Date()
        });
    },

    getAllCosts: async function() {
        return dbLibrary.getAll('costs');
    }
};

// חשיפת dbLibrary גם כן כדי ששאר הקבצים שלך ימשיכו לעבוד
window.dbLibrary = dbLibrary;*/

class IDBLibrary {
    constructor(dbName, version) {
        this.dbName = dbName;
        this.version = version;
        this.db = null;
    }
    async getByMonthAndYear(storeName, month, year) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => {
                const results = request.result.filter((item) => {
                    const itemDate = new Date(item.date);
                    return itemDate.getMonth() === month - 1 && itemDate.getFullYear() === year;
                });
                resolve(results);
            };

            request.onerror = (event) => reject(event.target.error);
        });
    }
    async init(objectStores) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                objectStores.forEach((store) => {
                    if (!db.objectStoreNames.contains(store.name)) {
                        db.createObjectStore(store.name, { keyPath: store.keyPath, autoIncrement: store.autoIncrement });
                    }
                });
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this.db);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }

    async add(storeName, data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(data);

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject(event.target.error);
        });
    }

    async getAll(storeName) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject(event.target.error);
        });
    }

    async delete(storeName, key) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(key);

            request.onsuccess = () => resolve(`Item with key ${key} deleted successfully.`);
            request.onerror = (event) => reject(event.target.error);
        });
    }
}

// יצירת מופע של המחלקה
const dbLibrary = new IDBLibrary('CostManagerDB', 1);

// חשיפת `idb` כמשתנה גלובלי
window.idb = {
    openCostsDB: async function(dbName, version) {
        await dbLibrary.init([{ name: 'costs', keyPath: 'id', autoIncrement: true }]);
        return this;
    },

    addCost: async function(data) {
        return dbLibrary.add('costs', {
            ...data,
            sum: parseFloat(data.sum),
            date: new Date()
        });
    },

    deleteCost: async function(id) {  // 🛠️ תוספת של פונקציית מחיקה
        return dbLibrary.delete('costs', id);
    },

    getAllCosts: async function() {
        return dbLibrary.getAll('costs');
    }
};

// חשיפת `dbLibrary` כך שיהיה ניתן לייבא אותו
window.dbLibrary = dbLibrary;




