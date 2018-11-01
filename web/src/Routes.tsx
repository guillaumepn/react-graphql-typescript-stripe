import * as React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginView from "./modules/user/LoginView";
import RegisterView from "./modules/user/RegisterView";
import MeView from "./modules/user/MeView";


class Routes extends React.PureComponent {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={LoginView} />
                    <Route path="/register" component={RegisterView} />
                    <Route path="/me" component={MeView} />
                </Switch>
            </BrowserRouter>
        );
    }
}


export default Routes;