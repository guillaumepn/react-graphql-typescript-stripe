import * as React from 'react';
import {Mutation} from "react-apollo";
import {gql} from 'apollo-boost';
import {LogoutMutation} from "../../schemaTypes";
import {Link} from "react-router-dom";
import {FormattedMessage} from 'react-intl';

const logoutMutation = gql`
    mutation LogoutMutation {
        logout
    }
`;

class Logout extends React.PureComponent {

    render() {
        return (
            <Mutation<LogoutMutation>
                mutation={logoutMutation}
            >
                {(mutate, {client}) => (
                    <Link to="/" onClick={async () => {
                        await mutate();
                        client.resetStore();
                    }}>
                        <FormattedMessage
                            id="header.logout"
                            defaultMessage="Logout"
                        />
                    </Link>
                )}
            </Mutation>
        );
    }
}

export default Logout;