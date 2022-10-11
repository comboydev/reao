import "./index.css";

let url = window.location.href;
if(url.includes("admin")){
    require('./views-admin');
} else {
    require('./views-user');
}