import * as React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {FormattedMessage} from 'react-intl';

import LoginView from "./modules/user/LoginView";
import RegisterView from "./modules/user/RegisterView";
import Account from "./modules/account/Account";
import PaidUser from "./modules/account/PaidUser";
import Header from "./shared/Header";


class Routes extends React.PureComponent {
    render() {

        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={LoginView} />
                    <Route path="/" render={() => (
                        <React.Fragment>
                            <Header />
                            <Route path="/register" component={RegisterView} />
                            <Route path="/account" component={Account} />
                            <Route path="/paid-user" component={PaidUser} />
                            <Route exact={true} path="/" render={() => (
                                <div>
                                    <FormattedMessage
                                        id="home.title"
                                        defaultMessage="Welcome {name}, to the homepage"
                                        values={{name: 'John'}}
                                        description="Welcome message"
                                    />
                                </div>
                            )} />
                        </React.Fragment>
                    )} />
                </Switch>
            </BrowserRouter>
        );
    }
}


export default Routes;