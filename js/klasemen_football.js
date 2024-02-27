import { dbPromise } from './indexeddb_promise.js';
import { fetch_status, fetch_json } from './info_fetch.js';
function tampilKlasemen(data) {
    let tabele = `<table>`;
    tabele += `<tbody>`;
    tabele += `<tr>`;
    tabele += `<th>Posisi</th>`;
    tabele += `<th>Nama Team</th>`;
    tabele += `<th>Menang</th>`;
    tabele += `<th>Kalah</th>`;
    tabele += `<th>Total Bermain</th>`;
    tabele += `</tr>`;
    data.forEach((datasepakbola) => {
        tabele += `<tr>`;
        tabele += `<td>${datasepakbola.position}</td>`;
        tabele += `<td>${datasepakbola.team.name}</td>`;
        tabele += `<td>${datasepakbola.won}</td>`;
        tabele += `<td>${datasepakbola.lost}</td>`;
        tabele += `<td>${datasepakbola.playedGames}</td>`;
        tabele += `</tr>`;
    });
    tabele += `</tbody>`;
    tabele += `</table>`;
    document.getElementById('tampungklasemen').innerHTML = tabele;
}
function apiKlasemen(id_liga, token_liga) {
    const data = dbPromise.then(async (db) => {
        const hasil = await db.get('klasemen', id_liga);
        if (hasil === null || hasil === undefined) {
            return Promise.reject(db);
        }
        return Promise.resolve(JSON.parse(hasil.value));
    })
        .catch(async (db) => {
            let hasil = await fetch(`https://api.football-data.org/v4/competitions/${id_liga}/standings?standingType=TOTAL`, {
                method: 'GET',
                headers: {
                    'X-Auth-Token': token_liga
                }
            })
                .then(fetch_status)
                .then(fetch_json);
            const store = db.transaction(['klasemen'], 'readwrite').objectStore('klasemen');
            await store.put({ idunik: id_liga, value: JSON.stringify(hasil.standings[0].table) });
            await store.done;
            return hasil.standings[0].table;
        });
    return data;
}
async function loadKlasemenFootball(id_liga, token) {
    const data = await apiKlasemen(id_liga, token);
    tampilKlasemen(data);
}
export { loadKlasemenFootball };
