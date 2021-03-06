import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import reducer from './reducers';
import AskQuestionBoard from './components/AskQuestionBoard.jsx';
import HomePage from './components/HomePage.jsx';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';
import Signup from './components/Signup.jsx';
import NewUserForm from './components/NewUserForm.jsx';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formToggle: false
    };

    this.userFilledOutForm = this.userFilledOutForm.bind(this);
  }
  userFilledOutForm() {
    this.setState({ formToggle: !this.state.formToggle });
  }
  render() {
    const store = createStore(reducer);
    return (
      <Router>
        <Provider store={store}>  
          <div>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={(props) => <Profile formToggle={this.state.formToggle} {...props} />} />
            <Route exact path="/form" component={() => <NewUserForm userFilledOutForm={this.userFilledOutForm} />} />
          </div>
        </Provider>
      </Router>
    );
  }
}
injectTapEventPlugin();
ReactDOM.render(<App/>, document.getElementById('app'));
