import { dbPromise } from './indexeddb_promise.js';
window.tambahFavorit = (idf, nama) => {
    dbPromise.then(async (db) => {
        const store = db.transaction(['timfavorit'], 'readwrite').objectStore('timfavorit');
        const hasil = await store.get(idf);
        if (hasil === null || hasil === undefined) {
            await store.put({ idunik: idf, value: nama });
            await store.done;
            return Promise.resolve();
        } else {
            return Promise.reject(new Error("error"));
        }
    })
        .then(() => {
            M.toast({ html: 'Berhasil ditambahkan' });
        })
        .catch(() => {
            M.toast({ html: 'Gagal: cek apakah data sudah ada atau struktur database sudah dibuat' });
        });
}
window.hapusFavorit = (idf) => {
    dbPromise.then(async (db) => {
        const store = db.transaction(['timfavorit'], 'readwrite').objectStore('timfavorit');
        await store.delete(idf);
        await store.done;
        let elem = document.getElementById('tim' + idf);
        if (elem) {
            document.getElementById('parentFavorit').removeChild(elem);
        }
    });
}
function tampilDaftarTeamFavorit(data, elemene) {
    let opsione;
    if (data.length > 0) {
        opsione = `<table>`;
        opsione += `<tbody id='parentFavorit'>`;
        data.forEach((datasepakbola) => {
            opsione += `<tr id='tim${datasepakbola.idunik}'>`;
            opsione += `<td>${datasepakbola.value}</td>`;
            opsione += `<td><input type='button' class='btn waves-effect waves-light red lighten-2' onclick='window.hapusFavorit(${datasepakbola.idunik})' value='Hapus'/></td>`;
            opsione += `</tr>`;
        });
        opsione += `</tbody>`;
        opsione += `</table>`;
    } else {
        opsione = `Belum ada data`;
    }
    elemene.innerHTML = opsione;
}
function loadDaftarTeamFavorit(elemene) {
    dbPromise.then(async (db) => {
        const store = db.transaction(['timfavorit'], 'readonly').objectStore('timfavorit');
        const hasil = await store.getAllKeys();
        if (hasil.length > 0) {
            let tampung = new Array();
            for (const e of hasil) {
                const hasil_dt = await store.get(e);
                tampung[tampung.length] = hasil_dt;
            }
            if (tampung.length === hasil.length) {
                tampilDaftarTeamFavorit(tampung, elemene);
            }
        } else {
            return Promise.reject(elemene);
        }
    })
        .catch((elemene) => {
            let kosong = Array();
            tampilDaftarTeamFavorit(kosong, elemene);
        });
}
export { loadDaftarTeamFavorit };