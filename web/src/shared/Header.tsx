import * as React from 'react';
import {Link} from 'react-router-dom';
import {Query} from "react-apollo";
import {FormattedMessage} from 'react-intl';
import Button from '@material-ui/core/Button';

import styled from "../theme/index";
import {MeQuery} from "../schemaTypes";
import {meQuery} from "../graphql/queries/me";

import './Header.css'
// import Logout from "../modules/user/Logout";

const CustomLink = styled(Link)`
color: blue;

&:hover {
color: green;
}
`;

interface HeaderProps {
    auth: any;
}

class Header extends React.PureComponent<HeaderProps> {

    render() {
        const { isAuthenticated } = this.props.auth;

        console.log(isAuthenticated());

        return (
            <div style={{
                height: 50,
                width: '100%',
                backgroundColor: '#fafafa',
                display: 'flex',
                justifyContent: 'space-around',
                padding: 10
            }}>
                <Link to="/">
                    <h1>Boilerplate App</h1>
                </Link>

                <Query<MeQuery> query={meQuery}>
                    {({data, loading, client}) => {
                        if (loading || !data) {
                            return null;
                        }

                        if (!isAuthenticated()) {
                            return (
                                <div>
                                    <div>
                                        {/*<Link to="/login">Login</Link>*/}
                                        <Button onClick={() => this.props.auth.login()}>Login</Button>
                                    </div>
                                    <div>
                                        <Link to="/register">Register</Link>
                                    </div>
                                </div>
                            );
                        }

                        // User is logged in :
                        return (
                            <div>
                                <div>
                                    <CustomLink to="/account">
                                        <FormattedMessage
                                            id="header.account"
                                            defaultMessage="Account"
                                        />
                                    </CustomLink>
                                    <Button onClick={() => this.props.auth.logout()}>Logout</Button>
                                </div>
                                {/*<div>*/}
                                    {/*Hi, {data.me.email}*/}
                                {/*</div>*/}
                            </div>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default Header;