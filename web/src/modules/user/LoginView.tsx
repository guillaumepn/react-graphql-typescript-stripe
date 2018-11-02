import * as React from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {Mutation} from "react-apollo";
import {gql} from 'apollo-boost';
import {LoginMutation, LoginMutationVariables} from "../../schemaTypes";
import {RouteComponentProps} from "react-router-dom";
import {meQuery} from "../../graphql/queries/me";

const loginMutation = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            email
            type
        }
    }
`;

interface RegisterFormValues {
    email: string;
    password: string;
}

function emailValidate(value: any) {
    console.log(value)
}

class LoginView extends React.PureComponent<RouteComponentProps<{}>> {

    render() {
        return (
            <Mutation<LoginMutation, LoginMutationVariables>
                mutation={loginMutation}
                update={(cache, { data }) => {
                    if (!data || !data.login) {
                        return;
                    }

                    cache.writeQuery({
                        query: meQuery,
                        data: { me: data.login }
                    });
                }}
            >
                {(mutate, {client}) => (
                    <React.Fragment>
                        <h1>Connexion</h1>
                        <Formik
                            initialValues={{email: '', password: ''}}
                            validate={(values: RegisterFormValues) => {
                                const errors: any = {};
                                if (!values.email) {
                                    errors.email = 'Required';
                                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                    errors.email = 'Invalid email address';
                                }
                                return errors;
                            }}
                            onSubmit={async () => {
                                // (optional) reset cache when logging in
                                await client.resetStore();
                                
                                this.props.history.push('/account');
                            }}
                        >
                            {
                                ({isSubmitting}) => (
                                    <Form>
                                        <div>
                                            <Field type="email" name="email" validate={emailValidate} />
                                            <ErrorMessage name="email" component="div"/>
                                        </div>
                                        <div>
                                            <Field type="password" name="password" />
                                            <ErrorMessage name="password" component="div"/>
                                        </div>
                                        <button type="submit" disabled={isSubmitting}>
                                            Login
                                        </button>
                                    </Form>
                                )
                            }
                        </Formik>
                    </React.Fragment>
                )}</Mutation>
        );
    }
}

export default LoginView;