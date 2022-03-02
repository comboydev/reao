import React from "react";
import ReactDOM from "react-dom";

import UserApp from "./app";
import * as serviceWorker from "../serviceWorker";


if(document.getElementById("root")){
  ReactDOM.render(
      <UserApp />,
    document.getElementById("root")
  );
}

serviceWorker.unregister();