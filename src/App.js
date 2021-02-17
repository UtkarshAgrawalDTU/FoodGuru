import logo from './logo.svg';
import './App.css';
import LandingPage from './components/LandingPage'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import Signout from './components/Signout'


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";



function App() {
  return (
    <Router>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>

          <Route path="/signout" exact>
            <Signout />
          </Route>

          <Route path="/" exact>
            <LandingPage />
          </Route>

        </Switch>
    </Router>
    
  );
}


export default App;
