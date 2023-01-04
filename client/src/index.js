import "./index.css";

window.location.href.includes("admin") ? 
    require('system/admin') :  require('system/user')