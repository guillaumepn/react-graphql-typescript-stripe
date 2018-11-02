import * as React from 'react';
import {Link} from 'react-router-dom';
import {MeQuery} from "../schemaTypes";
import {meQuery} from "../graphql/queries/me";
import {Query} from "react-apollo";

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
                                    <Link to="/account">Account</Link>
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