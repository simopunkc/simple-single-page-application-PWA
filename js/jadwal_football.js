import {dbPromise} from './indexeddb_promise.js';
import {fetch_status,fetch_json} from './info_fetch.js';
function tampilJadwal(data){
    let tabele=`<table>`;
    tabele+=`<tbody>`;
    tabele+=`<tr>`;
    tabele+=`<th>Tuan Rumah</th>`;
    tabele+=`<th>Tim Tamu</th>`;
    tabele+=`<th>Tanggal</th>`;
    tabele+=`</tr>`;
    data.forEach((datatanding)=>{
        tabele+=`<tr>`;
        tabele+=`<td>${datatanding.homeTeam.name}</td>`;
        tabele+=`<td>${datatanding.awayTeam.name}</td>`;
        let date=new Date(datatanding.utcDate);
        tabele+=`<td>${date.toString()}</td>`;
        tabele+=`</tr>`;
    });
    tabele+=`</tbody>`;
    tabele+=`</table>`;
    document.getElementById('tampungjadwalsingle').innerHTML=tabele;
}
function apiJadwaltandingFootball(id_tim,token_liga){
    const data=dbPromise.then(async (db)=>{
        const hasil=await db.get('jadwal', id_tim);
        if(hasil===null||hasil===undefined){
            return Promise.reject(db);
        }
        return Promise.resolve(JSON.parse(hasil.value));
    })
    .catch(async (db)=>{
        let hasil=await fetch(`https://api.football-data.org/v2/teams/${id_tim}/matches?status=SCHEDULED`, {
            method: 'GET',
            headers: {
            'X-Auth-Token': token_liga
            }
        })
        .then(fetch_status)
        .then(fetch_json);
        const store=db.transaction(['jadwal'],'readwrite').objectStore('jadwal');
        await store.put({idunik: id_tim, value: JSON.stringify(hasil.matches)});
        await store.done;
        return hasil.matches;
    });
    return data;
}
async function loadJadwaltandingFootball(id_tim,token){
    const data=await apiJadwaltandingFootball(id_tim,token);
    tampilJadwal(data);
}
export {loadJadwaltandingFootball};