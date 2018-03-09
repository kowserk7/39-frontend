import React from 'react';
import { Redirect } from 'react-router'; 
import { renderIf } from '../../../library/utilities';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      email: '',
      password: '',
      usernameError: null,
      emailError: null,
      passwordError: null,
      error: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }
  handleChange(event) {
    let {name, value} = event.target;
    this.setState({
      [name]: value.trim(),
      usernameError: name === 'username' && !value.trim() ? 'Username required' : null,
      emailError: name === 'email' && !value.trim() ? 'Email required' : null,
      passwordError: name === 'password' && !value.trim() ? 'Password required' : null,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    let {username, email, password} = this.state;
    
    this.props.onComplete({ username, email, password }) 
      .then(() => this.props.history.push('/dashboard'))
      .catch(error => this.setState({error}));
  }

  render() { 
    return ( 
      <div>
        <form
          className="auth-form"
          onSubmit={this.handleSubmit}
          noValidate>

          <input
            type="text"
            name="username"
            placeholder="johnsmith1985"
            pattern=""
            value={this.state.username}
            onChange={this.handleChange}/>
          {renderIf(this.state.usernameError, <span className="tooltip">{this.state.usernameError}</span>)}

          {renderIf(this.props.auth === 'signup',
            <input
              type="email"
              name="email"
              placeholder="john.smith@example.com"
              value={this.state.email}
              onChange={this.handleChange}/>
          )}
          {renderIf(this.state.emailError, <span className="tooltip">{this.state.emailError}</span>)}

          <input
            type="password"
            name="password"
            placeholder="johnsmithrocksthehouse"
            value={this.state.password}
            onChange={this.handleChange}/>
          {renderIf(this.state.passwordError, <span className="tooltip">{this.state.passwordError}</span>)}

          <button type="submit">{this.props.auth}</button>
        </form>
      </div>
    );
  }
}