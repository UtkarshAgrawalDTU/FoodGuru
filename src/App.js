import logo from './logo.svg';
import './App.css';
import MyMap from './components/MyMap'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import Signout from './components/Signout'
import UpdateProfile from './components/UpdateProfile'
import Home from './components/Home'
import Search from './components/Search'
import NewRestaurant from './components/NewRestaurant'
import Restaurant from './components/Restaurant'

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

          <Route path="/profile/update" exact>
            <UpdateProfile />
          </Route>

          <Route path="/signout" exact>
            <Signout />
          </Route>

          <Route path="/map" exact>
            <MyMap />
          </Route>

          <Route path="/search" exact>
            <Search />
          </Route>

          <Route path="/" exact>
            <Home />
          </Route>

          <Route path = "/newRestaurant">
            <NewRestaurant />
          </Route>

          <Route path = "/restaurant/:id" component = {Restaurant} />

        </Switch>
    </Router>
    
  );
}


export default App;
