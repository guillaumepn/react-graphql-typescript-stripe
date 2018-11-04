import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import {IntlProvider, addLocaleData} from 'react-intl';
import * as fr from 'react-intl/locale-data/fr';
import * as en from 'react-intl/locale-data/en';

import registerServiceWorker from './registerServiceWorker';
import Routes from "./Routes";

// Pass your GraphQL endpoint to uri
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include'
});

addLocaleData(en);
addLocaleData(fr);
const locale='en';
const messages = require('./translations/locales');

ReactDOM.render(
    <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
        <ApolloProvider client={client}>
            <Routes />
        </ApolloProvider>
    </IntlProvider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
