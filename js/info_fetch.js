function fetch_status(response){
    if(response.status!==200){
        return Promise.reject(new Error(response.statusText));
    }else{
        return Promise.resolve(response);
    }
}
function fetch_json(response){
    return response.json();
}
export {fetch_status,fetch_json};