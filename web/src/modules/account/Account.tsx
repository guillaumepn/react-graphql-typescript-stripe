import * as React from 'react';
import {Query} from "react-apollo";
import {gql} from 'apollo-boost';
import {MeQuery} from "../../schemaTypes";
import {Redirect} from "react-router-dom";
import SubscribeUser from "./SubscribeUser";

const meQuery = gql`
    query MeQuery {
        me {
            id
            email
            type
        }
    }
`;

class Account extends React.PureComponent {
    render() {
        return (
            <Query<MeQuery> fetchPolicy="network-only" query={meQuery}>
                {({data, loading}) => {
                    if (loading) {
                        return null;
                    }

                    if (!data) {
                        return <div>Data is undefined</div>;
                    }

                    if (!data.me) {
                        return <Redirect to="/login" />
                    }

                    if (data.me.type === 'free-trial') {
                        return <SubscribeUser/>;
                    }

                    return <Redirect to="/paid-user"/>
                }}
            </Query>
        );
    }
}

export default Account;