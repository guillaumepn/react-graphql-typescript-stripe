import * as React from 'react';
import {Link} from 'react-router-dom';
import {Query} from "react-apollo";

import styled from "../theme/index";
import {MeQuery} from "../schemaTypes";
import {meQuery} from "../graphql/queries/me";

import './Header.css'

const CustomLink = styled(Link)`
color: blue;

&:hover {
color: green;
}
`;

class Header extends React.PureComponent {
    render() {
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
                    {({data, loading}) => {
                        if (loading || !data) {
                            return null;
                        }

                        if (!data.me) {
                            return (
                                <div>
                                    <div>
                                        <Link to="/login">Login</Link>
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
                                    <CustomLink to="/account">Account</CustomLink>
                                </div>
                                <div>
                                    Hi, {data.me.email}
                                </div>
                            </div>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default Header;