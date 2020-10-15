import {requestPermission} from './notifikasi.js';
if('serviceWorker' in navigator){
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register('sw.js').then(registration => {
            console.log("Pendaftaran ServiceWorker berhasil");
            requestPermission();
        }).catch(registrationError => {
            console.log("Pendaftaran ServiceWorker gagal");
        });
    });
}else{
    console.log("Service worker tidak didukung browser ini.");
}
import {loadNav,loadSidebar} from './appshell.js';
import {loadPage,loadPage2} from './load_page.js';
window.loadPageAdv=(halaman)=>{
    loadPage2(halaman);
}
document.addEventListener("DOMContentLoaded",()=>{
    let elemenNav=document.querySelectorAll(".sidenav");
    let halaman=window.location.hash.substr(1);
    let cekhalaman=halaman.match(/[a-zA-Z]+/g);
    let side_konten=document.getElementById("sidebar");
    M.Sidenav.init(elemenNav);
    loadNav();
    M.Sidenav.init(side_konten);
    loadSidebar(side_konten);
    if(cekhalaman!='jadwaltim'&&cekhalaman!='infotim'){
        loadPage(halaman);
    }else{
        loadPage2(halaman);
    }
});
import '../css/materialize.min.css';
import '../css/custom.css';