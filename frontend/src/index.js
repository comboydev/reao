import "./index.css";

window.location.href.includes("admin") ? 
    require('views/admin') :  require('views/user')