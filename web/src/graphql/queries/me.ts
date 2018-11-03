import {gql} from "apollo-boost";
import {UserFragment} from "../fragments/UserFragment";

export const meQuery = gql`
    query MeQuery {
        me {
            ...UserInfo
        }
    }
    
    ${UserFragment}
`;
