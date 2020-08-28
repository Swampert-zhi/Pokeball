import React from 'react';
import CheckRoute from "./CheckRoute";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import HomeView from "../views/HomeView";
import Signin from "../views/Signin";
import Register from "../views/Register";
import history from "./History";

class BasicRoute extends React.Component{
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            // console.log(location,action);
        });
    }

    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <CheckRoute exact path="/"  component={HomeView}/>
                    <CheckRoute exact path="/Cart" component={HomeView}/>
                    <CheckRoute exact path="/UserOrder" component={HomeView}/>
                    <CheckRoute exact path="/UserStat" component={HomeView}/>
                    <CheckRoute exact path="/Table" component={HomeView}/>
                    <CheckRoute exact path="/Manage" component={HomeView}/>
                    <CheckRoute exact path="/AdminOrder" component={HomeView}/>
                    <CheckRoute exact path='/Details/:bookId' component={HomeView}/>
                    <CheckRoute exact path='/AdminStat' component={HomeView}/>
                    <Route exact path="/Login" component={Signin}/>
                    <Route exact path="/Register" component={Register}/>
                    <Redirect from="/*" to="/" />
                </Switch>
            </BrowserRouter>
        );
    }
}


export default BasicRoute;
