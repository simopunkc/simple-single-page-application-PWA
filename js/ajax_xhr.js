function get_xmlhttp(){
    let xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();
    }else{
        xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
    }
    return xmlhttp;
}
export {get_xmlhttp};