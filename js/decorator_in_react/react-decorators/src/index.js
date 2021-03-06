import React from 'react';
import ReactDOM from 'react-dom';
import './index.styl';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Link, withRouter} from 'react-router-dom';

function AuthExample () {
  return (
    <Router>
      <div>
        <AuthButton></AuthButton>
      </div>
    </Router>
  );
}
@withRouter
class AuthButton extends React.Component {
  render() {
    const { history } = this.props;
    return (
      true ? 
      (<p>
        Welcome!
        <button onClick={() => {
          // 退出？ 送到首页去
          history.push("/");
        }}>Sign Out!</button>
      </p>):
      (<p>You are not logged in.</p>)
    );
  }
}
// const AuthButton = (({history}) => (
//   true ? 
//   (<p>
//     Welcom!
//     <button onClick={() => {
//       // 退出？ 送到首页去
//       history.push("/");
//     }}>Sign Out!</button>
//   </p>):
//   (<p>You are not logged in.</p>)
// ));
ReactDOM.render(<AuthExample/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
