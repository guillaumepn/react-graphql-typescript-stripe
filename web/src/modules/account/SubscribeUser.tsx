import * as React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {Mutation} from "react-apollo";
import {gql} from 'apollo-boost';
import {CreateSubscriptionMutation, CreateSubscriptionMutationVariables} from "../../schemaTypes";
import {UserFragment} from "../../graphql/fragments/UserFragment";

const createSubscriptionMutation = gql`
    mutation CreateSubscriptionMutation($source: String!, $ccLast4: String!) {
        createSubscription(source: $source, ccLast4: $ccLast4) {
            ...UserInfo
        }
    }
    
    ${UserFragment}
`;

export default class SubscribeUser extends React.PureComponent {
    render() {
        return (
            <Mutation<CreateSubscriptionMutation, CreateSubscriptionMutationVariables> mutation={createSubscriptionMutation}>
                {(mutate) => (
                <StripeCheckout
                    token={async (token) => {
                        const response = await mutate({
                            variables: {source: token.id, ccLast4: token.card.last4}
                        });
                        console.log(response)
                    }}
                    stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE!}
                    amount={500}
                    currency="EUR"
                    label="Pay With Card"
                    panelLabel="Pay"
                />
            )}</Mutation>
        )
    }
}