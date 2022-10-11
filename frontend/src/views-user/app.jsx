import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import UserViews from './view';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

function UserApp() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" component={UserViews}/>
          </Switch>
        </Router>
      </Provider>
			<ToastContainer autoClose={4000}/>
    </div>
  );
}

export default UserApp;
