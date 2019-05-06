import React from 'react';
import { FormGroup, FormControl, Button } from "reactstrap";
import { Container, Row, Col, Alert } from "reactstrap";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "semantic-ui-css/semantic.min.css";
import 'react-datepicker/dist/react-datepicker.css';

import appSyncConfig from "./aws-exports";
import { ApolloProvider } from "react-apollo";
import AWSAppSyncClient, { defaultDataIdFromObject } from "aws-appsync";
import Amplify, { Auth } from "aws-amplify";
import { Rehydrated } from "aws-appsync-react";

import './App.css';
import Header from "./Components/lib/Header";
import HomePage from "./Components/HomePage";
import AllEvents from './Components/AllEvents';
import NewEvent from './Components/NewEvent';
import ViewEvent from './Components/ViewEvent';
import Login from './Components/Login';

const Home = () => (
  <div className="ui container">
    <HomePage />
  </div>
);

const App = () => (
  <Router>
    <div>
      <Header />
      <Route exact={true} path="/" component={Home} />
      <Route path="/event/:id" component={ViewEvent} />
      <Route path="/newEvent" component={NewEvent} />
      <Route path="/allEvents" component={AllEvents} />
      <Route path="/login" component={Login} />
    </div>
  </Router>
);
Amplify.configure({
  Auth: {
    identityPoolId: "",
    region: "",
    userPoolId: '',
    userPoolWebClientId: '',
  },
});

const client = new AWSAppSyncClient({
  url: appSyncConfig.aws_appsync_graphqlEndpoint,
  region: appSyncConfig.aws_appsync_region,
  auth: {
    type: appSyncConfig.aws_appsync_authenticationType,
    apiKey: appSyncConfig.aws_appsync_apiKey,
    credentials: () => Auth.currentCredentials(),
  },
  cacheOptions: {
    dataIdFromObject: (obj) => {
      let id = defaultDataIdFromObject(obj);

      if (!id) {
        const { __typename: typename } = obj;
        switch (typename) {
          case 'Comment':
            return `${typename}:${obj.commentId}`;
          default:
            return id;
        }
      }

      return id;
    }
  }
});

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
);

export default WithProvider;
