import './App.css';
import Home from './components/Home/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard/Dashboard';
import AddService from './components/Dashboard/AddService/AddService';
import { createContext, useState } from 'react';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import UploadOrder from './components/Dashboard/UploadOrder/UploadOrder';
import TotalOrderList from './components/Dashboard/TotalOrderList/TotalOrderList';
import UserOrderList from './components/Dashboard/UserOrderList/UserOrderList';
import Review from './components/Dashboard/Review/Review';
import AddAdmin from './components/Dashboard/AddAdmin/AddAdmin';

export const UserContext = createContext()
function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <p>{loggedInUser.email} </p>
      <p>{loggedInUser.name} </p>
      <Router>
          <Switch>
            <PrivateRoute path="/dashboard">
              <Dashboard></Dashboard>
            </PrivateRoute>
            <Route path="/signUp">
              <Login></Login>
            </Route>
            <PrivateRoute path="/uploadOrder">
                <UploadOrder></UploadOrder>
            </PrivateRoute>
            <PrivateRoute path="/getUserReview">
              <Review></Review>
            </PrivateRoute>
            <Route path="/totalOrderList">
              <TotalOrderList></TotalOrderList>
            </Route>
            <PrivateRoute path="/userOrders">
              <UserOrderList></UserOrderList>
            </PrivateRoute>
            <PrivateRoute path="/addService">
                <AddService></AddService>
            </PrivateRoute>
            <PrivateRoute path="/addAdmin">
              <AddAdmin></AddAdmin>
            </PrivateRoute>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
