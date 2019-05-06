import { Link, withRouter } from "react-router-dom";
import React from "react";
import { FormGroup, FormControl, Button } from "react-bootstrap";
import { Auth } from 'aws-amplify';
import { authenticateUser } from './Cognito/Cognito'

export default class Login extends React.Component {
  // componentWillUnmount() {
  //   this.props.authStore.reset();
  // }

  // handleEmailChange = e => this.props.authStore.setEmail(e.target.value);
  // handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);
  handleSubmitForm = () => {
    // e.preventDefault();
    // this.props.authStore.login().then(() => this.props.history.replace("/"));
//     Auth.signIn(
//     'aaronvegaaliaga@gmail.com', // Required, the username
//     'Atemplar1' // Optional, the password
// ).then(user => console.log(user))
// .catch(err => console.log(err));


// e.preventDefault()
// this.setState({ loading: true })
// console.log('Entered:', this.state)
console.log("testing")
authenticateUser('aaronvegaaliaga@gmail.com', 'Atemplar1', (err, result) => {
  if (err) {
    console.log(err)
    // this.setState({ loading: false })
    return
  }
  console.log(result)
  // this.setState({ loading: false })
  // window.location.reload()
})

};


handleSubmitForm1 = () => {
  Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  }).then(user => console.log(user))
  .catch(err => console.log(err));
  };
  render() {
    // const { values, inProgress } = this.props.authStore;

    return (
        <div>
        <p>
          <Link to="register">Need an account?</Link>
        </p>

        <form onSubmit={this.handleSubmitForm}>
          <FormGroup>
            <FormControl
              type="email"
              placeholder="Email"
              // value={values.email}
              // onChange={this.handleEmailChange}
            />
          </FormGroup>

          <FormGroup>
            <FormControl
              type="password"
              placeholder="Password"
              // onChange={this.handlePasswordChange}
            />
          </FormGroup>

          <Button
            bsSize="large"
            bsStyle="primary"
            type="submit"
            // disabled={inProgress}
          >
            Login
          </Button>
        </form>

<form onSubmit={this.handleSubmitForm1}>
        <Button
          bsSize="large"
          bsStyle="primary"
          type="submit"
          // disabled={inProgress}
        >
          Check
        </Button>
        </form>
        </div>
    );
  }
}
