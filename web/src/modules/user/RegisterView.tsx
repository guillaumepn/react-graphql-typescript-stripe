import * as React from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {Mutation} from "react-apollo";
import {gql} from 'apollo-boost';
import {RegisterMutation, RegisterMutationVariables} from "../../schemaTypes";
import {RouteComponentProps} from "react-router-dom";

const registerMutation = gql`
    mutation RegisterMutation($email: String!, $password: String!) {
        register(email: $email, password: $password)
    } 
`;

interface RegisterFormValues {
    email: string;
    password: string;
}

function emailValidate(value: any) {
    console.log(value)
}

class RegisterView extends React.PureComponent<RouteComponentProps<{}>> {

    render() {
        return (
            <Mutation<RegisterMutation, RegisterMutationVariables> mutation={registerMutation}>
                {mutate => (
                <React.Fragment>
                    <h1>Inscription</h1>
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
                        onSubmit={async (values: RegisterFormValues, {setSubmitting}: any) => {
                            const response = await mutate({
                                variables: values
                            });
                            console.log(response);
                            this.props.history.push('/login');
                            // setTimeout(() => {
                            //     alert(JSON.stringify(values, null, 2));
                            //     setSubmitting(false);
                            // }, 400);
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
                                        Submit
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

export default RegisterView;