import React from 'react';
import { signupRequest, signinRequest } from '../../action/action-auth';
import { connect } from 'react-redux';
import AuthForm from '../auth/auth-form/auth-form';

class Landing extends React.Component {
  render() { 
    console.log('__LANDING_PROPS__', this.props);
    let {params} = this.props.match;
    let onComplete = params.auth === 'signin'
      ? this.props.signin
      : this.props.signup;
    return (
      <div>
        <h1>Hello World</h1>
        <AuthForm
          history= {this.props.history}
          auth={params.auth}
          redirect = {this.redirect}
          onComplete={onComplete} />
      </div>
    );
  }
}

let mapStateToProps  = () => ({});
let mapDispatchToProps = dispatch => ({
  signup: user => dispatch(signupRequest(user)),
  signin: user => dispatch(signinRequest(user)),
});
 
export default connect (mapStateToProps, mapDispatchToProps)(Landing);