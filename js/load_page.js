import { get_xmlhttp } from './ajax_xhr.js';
import { loadJadwaltandingFootball } from './jadwal_football.js';
import { loadInfoteamFootball } from './infotim_football.js';
import { loadDaftarTeam } from './daftarteam_football.js';
import { loadDaftarTeamFavorit } from './timfavorit.js';
import { loadKlasemenFootball } from './klasemen_football.js';
let token_liga = '4a7f09b99d3b4576894a8ad1a0da798c';
function loadTim() {
    let daftartim = document.getElementById('tampungtim');
    if (daftartim) {
        let ligane = daftartim.getAttribute("data-liga");
        loadDaftarTeam(ligane, daftartim, token_liga);
    }
}
function loadTimFavorit() {
    let daftartim = document.getElementById('tampungtimfavorit');
    if (daftartim) {
        loadDaftarTeamFavorit(daftartim);
    }
}
function loadBeranda() {
    let dokumen1 = document.getElementById('tampungklasemen');
    if (dokumen1) {
        let ligane = dokumen1.getAttribute("data-liga");
        loadKlasemenFootball(ligane, token_liga);
    }
}
function loadPage2(halaman) {
    let polosan = halaman.match(/[a-zA-Z]+/g);
    let id = halaman.match(/\d+/g);
    let kum_url = '/pages/' + polosan + '.html';
    let xhttp = get_xmlhttp();
    let content = document.querySelector("#body-content");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 1) {
            content.innerHTML = "<div class='center loader'>Loading... sabar kaka</div>";
        } else if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                content.innerHTML = xhttp.responseText;
                if (polosan[0] === 'jadwaltim') {
                    loadJadwaltandingFootball(id, token_liga);
                }
                if (polosan[0] === 'infotim') {
                    loadInfoteamFootball(id, token_liga);
                }
            } else if (xhttp.status === 404) {
                content.innerHTML = "<p>Halaman tidak ada atau mungkin telah dihapus.</p>";
            } else {
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
        }
    };
    xhttp.open("GET", kum_url, true);
    xhttp.send();
}
function loadPage(halaman) {
    if ((halaman.length) < 2) {
        halaman = "klasemen";
    }
    let xhttp = get_xmlhttp();
    let content = document.querySelector("#body-content");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 1) {
            content.innerHTML = "<div class='center loader'>Loading... sabar kaka</div>";
        } else if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                content.innerHTML = xhttp.responseText;
                loadTim();
                loadTimFavorit();
                loadBeranda();
            } else if (xhttp.status === 404) {
                content.innerHTML = "<p>Halaman tidak ada atau mungkin telah dihapus.</p>";
            } else {
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
        }
    };
    xhttp.open("GET", "/pages/" + halaman + ".html", true);
    xhttp.send();
}
export { loadPage, loadPage2 };