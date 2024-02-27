import {dbPromise} from './indexeddb_promise.js';
import {fetch_status,fetch_json} from './info_fetch.js';
function tampilDaftarTeam(data,elemene){
    let opsione=`<table>`;
    opsione+=`<tbody>`;
    data.forEach((datasepakbola)=>{
        opsione+=`<tr>`;
        opsione+=`<td>${datasepakbola.name}</td>`;
        opsione+=`<td><a onclick='window.loadPageAdv("#jadwaltim${datasepakbola.id}")' href='#jadwaltim${datasepakbola.id}' title='Jadwal'>Jadwal</a></td>`;
        opsione+=`<td><a onclick='window.loadPageAdv("#infotim${datasepakbola.id}")' href='#infotim${datasepakbola.id}' title='Info'>Info</a></td>`;
        opsione+=`<td><input class='btn waves-effect waves-light green lighten-2' type='button' onclick='window.tambahFavorit(${datasepakbola.id},"${datasepakbola.name}")' value='+ Tim Favorit'/></td>`;
        opsione+=`</tr>`;
    });
    opsione+=`</tbody>`;
    opsione+=`</table>`;
    elemene.innerHTML=opsione;
}
function apiDaftarTeam(id_liga,token_liga){
    const data=dbPromise.then(async (db)=>{
        const hasil=await db.get('klasementeam', id_liga);
        if(hasil===null||hasil===undefined){
            return Promise.reject(db);
        }
        return Promise.resolve(JSON.parse(hasil.value));
    })
    .catch(async (db)=>{
        let hasil=await fetch(`https://api.football-data.org/v4/competitions/${id_liga}/teams`, {
            method: 'GET',
            headers: {
            'X-Auth-Token': token_liga
            }
        })
        .then(fetch_status)
        .then(fetch_json);
        const store=db.transaction(['klasementeam'],'readwrite').objectStore('klasementeam');
        await store.put({idunik: id_liga, value: JSON.stringify(hasil.teams)});
        await store.done;
        return hasil.teams;
    });
    return data;
}
async function loadDaftarTeam(id_liga,elemene,token){
    const data=await apiDaftarTeam(id_liga,token);
    tampilDaftarTeam(data,elemene);
}
export {loadDaftarTeam};
