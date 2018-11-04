import * as React from 'react';
import {gql} from 'apollo-boost';
import {Mutation} from "react-apollo";

import {UserFragment} from "../../graphql/fragments/UserFragment";
import {CancelSubscriptionMutation} from "../../schemaTypes";

const cancelSubscriptionMutation = gql`
    mutation CancelSubscriptionMutation {
        cancelSubscription {
            ...UserInfo
        }
    }
    
    ${UserFragment}
`;

class CancelSubscription extends React.PureComponent {
    render() {
        return (
            <Mutation<CancelSubscriptionMutation> mutation={cancelSubscriptionMutation}>
                {(mutate) => (
                    <button onClick={() => mutate()}>
                        Cancel Subscription
                    </button>
                )}
            </Mutation>
        );
    }
}

export default CancelSubscription;