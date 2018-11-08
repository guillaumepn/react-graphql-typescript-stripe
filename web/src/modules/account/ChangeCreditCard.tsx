import * as React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {Mutation} from "react-apollo";
import {gql} from 'apollo-boost';
import {ChangeCreditCardMutation, ChangeCreditCardMutationVariables} from "../../schemaTypes";
import {UserFragment} from "../../graphql/fragments/UserFragment";

const changeCreditCardMutation = gql`
    mutation ChangeCreditCardMutation($source: String!, $ccLast4: String!) {
        changeCreditCard(source: $source, ccLast4: $ccLast4) {
            ...UserInfo
        }
    }
    
    ${UserFragment}
`;

export default class ChangeCreditCard extends React.PureComponent {
    render() {
        return (
            <Mutation<ChangeCreditCardMutation, ChangeCreditCardMutationVariables> mutation={changeCreditCardMutation}>
                {(mutate) => (
                <StripeCheckout
                    token={async (token) => {
                        await mutate({
                            variables: {source: token.id, ccLast4: token.card.last4}
                        });
                    }}
                    stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE!}
                    label="Change Credit Card"
                    panelLabel="Change Credit Card"
                />
            )}</Mutation>
        )
    }
}