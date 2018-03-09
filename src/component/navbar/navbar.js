import React from 'react';
import { renderIf } from '../../library/utilities';
import { tokenDelete } from '../../action/action-auth';
import { connect } from 'react-redux';
import Avatar from 'react-avatar';


class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.action);
    
    return (
      <header>
        {this.props.avatar ? 
          <Avatar src={this.props.avatar.url} name="avatar-photo" />
          : undefined
        }
        <nav>
          <ul>
            {renderIf(!this.props.token,
              <React.Fragment>
                <li><a href="/welcome/signup">Sign Up</a></li>
                <li><a href="/welcome/signin">Sign In</a></li>
              </React.Fragment>
            )}
            {renderIf(this.props.token,
              <React.Fragment>
                <li><a href="/dashboard">Dashboard</a></li>
                <li onClick={this.props.tokenDelete}><a href="/welcome/signin">Logout</a></li>
              </React.Fragment>
            )}
          </ul>
        </nav>
      </header>
    );
  }
}

let mapStateToProps = state => ({
  avatar: state.photo[0],
});
let mapDispatchToProps = dispatch => ({
  tokenDelete: () => dispatch(tokenDelete),
});

export default connect (mapStateToProps, mapDispatchToProps)(Navbar);