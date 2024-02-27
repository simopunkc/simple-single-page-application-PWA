import { openDB } from 'idb';
const dbPromise = openDB('database_ligainggris', 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains("klasemen")) {
            let klasemenDB = db.createObjectStore("klasemen", { keyPath: 'idunik' });
            klasemenDB.createIndex("idunik", "idunik", { unique: true });
        }
        if (!db.objectStoreNames.contains("klasementeam")) {
            let klasementeamDB = db.createObjectStore("klasementeam", { keyPath: 'idunik' });
            klasementeamDB.createIndex("idunik", "idunik", { unique: true });
        }
        if (!db.objectStoreNames.contains("jadwal")) {
            let jadwalDB = db.createObjectStore("jadwal", { keyPath: 'idunik' });
            jadwalDB.createIndex("idunik", "idunik", { unique: true });
        }
        if (!db.objectStoreNames.contains("timinfo")) {
            let timinfoDB = db.createObjectStore("timinfo", { keyPath: 'idunik' });
            timinfoDB.createIndex("idunik", "idunik", { unique: true });
        }
        if (!db.objectStoreNames.contains("timfavorit")) {
            let timfavoritDB = db.createObjectStore("timfavorit", { keyPath: 'idunik' });
            timfavoritDB.createIndex("idunik", "idunik", { unique: true });
        }
    }
});
export { dbPromise };