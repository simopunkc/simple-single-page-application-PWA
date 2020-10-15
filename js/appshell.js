import {get_xmlhttp} from './ajax_xhr.js';
import {loadPage} from './load_page.js';
function loadNav(){
    let xhttp=get_xmlhttp();
    xhttp.onreadystatechange=()=>{
        let tampungen=document.querySelectorAll(".topnav,.sidenav");
        if(xhttp.readyState===1){
            tampungen.forEach((elm)=>{
                elm.innerHTML="<div class='center loader'>Loading... sabar kaka</div>";
            });
        }else if(xhttp.readyState===4&&xhttp.status===200){
            tampungen.forEach((elm)=>{
                elm.innerHTML=xhttp.responseText;
            });
            document.querySelectorAll(".brand-logo,.sidenav a,.topnav a").forEach((elm)=>{
                elm.addEventListener("click",(event)=>{
                    let sider=document.querySelector(".sidenav");
                    M.Sidenav.getInstance(sider).close();
                    let alamate=event.target.getAttribute("href").substr(1);
                    loadPage(alamate);
                });
            });
        }
    };
    xhttp.open("GET","/appshell/nav.html",true);
    xhttp.send();
}
function loadSidebar(side_konten){
    let xhttp=get_xmlhttp();
    xhttp.onreadystatechange=()=>{
        if(xhttp.readyState===1){
            side_konten.innerHTML="<div class='center loader'>Loading... sabar kaka</div>";
        }else if(xhttp.readyState===4){
            if(xhttp.status==200){
                side_konten.innerHTML=xhttp.responseText;
            }
            document.querySelectorAll(".sidebare a").forEach((elm)=>{
                elm.addEventListener("click",(event)=>{
                    let sider=document.querySelector(".sidebare");
                    M.Sidenav.getInstance(sider).close();
                    let alamate=event.target.getAttribute("href").substr(1);
                    loadPage(alamate);
                });
            });
        }
    };
    xhttp.open("GET","/appshell/sidebar.html",true);
    xhttp.send();
}
export {loadNav,loadSidebar};