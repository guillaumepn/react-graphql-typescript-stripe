import {gql} from 'apollo-boost';

export const UserFragment = gql`
    fragment UserInfo on User {
        id
        email
        type 
        ccLast4
    }
`;