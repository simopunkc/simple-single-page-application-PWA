import {dbPromise} from './indexeddb_promise.js';
import {fetch_status,fetch_json} from './info_fetch.js';
window.loadMaterialbox=()=>{
    let elemBox=document.querySelectorAll('.materialboxed');
    for(let i=0;i<elemBox.length;i++){
        M.Materialbox.init(elemBox[i]);
    }
}
function tampilInfotim(data){
    let tabele=`<table>`;
    tabele+=`<tbody>`;
    tabele+=`<tr>`;
    let urlgambar=data.crestUrl;
    urlgambar=urlgambar.replace(/^http:\/\//i,'https://');
    tabele+=`<td colspan="2" class="center"><img width="200" height="200" class="materialboxed single-photo responsive-img z-depth-3 wp-post-image" src="${urlgambar}" alt="logo" title="logo" loading="lazy"></td>`;
    tabele+=`</tr>`;
    tabele+=`<tr>`;
    tabele+=`<td>Nama</td>`;
    tabele+=`<td>${data.name}</td>`;
    tabele+=`</tr>`;
    tabele+=`<tr>`;
    tabele+=`<td>Alamat</td>`;
    tabele+=`<td>${data.address}</td>`;
    tabele+=`</tr>`;
    tabele+=`<tr>`;
    tabele+=`<td>Nomor Telephone</td>`;
    tabele+=`<td>${data.phone}</td>`;
    tabele+=`</tr>`;
    tabele+=`</tbody>`;
    tabele+=`</table>`;
    document.getElementById('tampunginfotimsingle').innerHTML=tabele;
    window.loadMaterialbox();
}
function apiInforteamFootball(id_tim,token_liga){
    const data=dbPromise.then(async (db)=>{
        const hasil=await db.get('timinfo', id_tim);
        if(hasil===null||hasil===undefined){
            return Promise.reject(db);
        }
        return Promise.resolve(JSON.parse(hasil.value));
    })
    .catch(async (db)=>{
        let hasil=await fetch(`https://api.football-data.org/v2/teams/${id_tim}`, {
            method: 'GET',
            headers: {
            'X-Auth-Token': token_liga
            }
        })
        .then(fetch_status)
        .then(fetch_json);
        const store=db.transaction(['timinfo'],'readwrite').objectStore('timinfo');
        await store.put({idunik: id_tim, value: JSON.stringify(hasil)});
        await store.done;
        return hasil;
    });
    return data;
}
async function loadInfoteamFootball(id_tim,token){
    const data=await apiInforteamFootball(id_tim,token);
    tampilInfotim(data);
}
export {loadInfoteamFootball};