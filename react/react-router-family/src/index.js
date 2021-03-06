import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom';

var fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 1000);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 1000);
  }
}

function AuthExample() {
  return (
    <Router>
      <div>
        <AuthButton/>
        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link> 
          </li>
        </ul>
        <Route path="/public" component={Public}></Route>
        <Route path="/login" component={Login}></Route>
        <PrivateRoute path="/protected" component={Protected}></PrivateRoute>
      </div>
    </Router>
  );
}

class Login extends React.Component {
  state =  {
    redirectToReferrer: false
  }
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({
        redirectToReferrer: true
      })
    })
  }
  render() {
    let {from } = this.props.location.state || {from: {pathname: '/'}};
    console.log(from);
    if(this.state.redirectToReferrer)
      return (
        <Redirect to={from}/>
      )

    return (
      <div>
        <p>You must log in view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

const AuthButton = withRouter(({history}) => {
  return (
    fakeAuth.isAuthenticated?
    (<p>Welcom!<button onClick={() => {
      fakeAuth.signout(() => {
        history.push('/')
      });
    }}>Sign out</button></p>):
    (<p>You are not logged in.</p>)
  )
})

function Public() {
  return (
    <div>Public</div>
  );
}
function Protected() {
  return (
    <div>Protected</div>
  );
}
function PrivateRoute({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => (
        fakeAuth.isAuthenticated?
        <Component/>:
        <Redirect
          to={{
            pathname: '/login',
            state: {from: props.location}
          }}
        />
      )}
    >
    </Route>
  )
}
ReactDOM.render(<AuthExample/>, document.getElementById('root'));