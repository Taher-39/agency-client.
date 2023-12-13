import "./App.css";
import Home from "./components/Home/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard/Dashboard";
import AddService from "./components/Dashboard/AddService/AddService";
import { createContext, useEffect, useState } from "react";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import UploadOrder from "./components/Dashboard/UploadOrder/UploadOrder";
import TotalOrderList from "./components/Dashboard/TotalOrderList/TotalOrderList";
import UserOrderList from "./components/Dashboard/UserOrderList/UserOrderList";
import Review from "./components/Dashboard/Review/Review";
import AddAdmin from "./components/Dashboard/AddAdmin/AddAdmin";
import ManageServices from "./components/Dashboard/ManageServices/ManageServices";
import RegisterScreen from "./components/Home/RegisterScreen/RegisterScreen";
import AddAmount from "./components/Dashboard/AddAmount/AddAmount";
import PaymentFailScreen from "./components/Screen/PaymentFailScreen";
import PaymentSuccessScreen from "./components/Screen/PaymentSuccessScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const user = sessionStorage.getItem("loggedInUser");
    return user ? JSON.parse(user) : {}; 
  });

  return (
    <>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          <Switch>
            <PrivateRoute path="/dashboard">
              <Dashboard></Dashboard>
            </PrivateRoute>
            <PrivateRoute path="/addAmount">
              <AddAmount />
            </PrivateRoute>
            <Route path="/signUp">
              <Login></Login>
            </Route>
            <Route path="/register">
              <RegisterScreen />
            </Route>
            <PrivateRoute path="/uploadOrder/:id">
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
            <PrivateRoute path="/manage-services">
              <ManageServices />
            </PrivateRoute>
            <Route path="/success-screen">
              <PaymentSuccessScreen />
            </Route>
            <Route path="/fail-screen">
              <PaymentFailScreen />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
      <ToastContainer />
    </>
  );
}

export default App;
