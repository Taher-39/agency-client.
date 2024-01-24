import "./App.css";
import Home from "./components/Home/Home/Home";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard/Dashboard";
import AddService from "./components/Dashboard/AddService/AddService";
import { createContext, useState } from "react";
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
import Teams from "./components/Screen/Teams";
import About from "./components/Screen/About";
import FAQs from "./components/Screen/FAQs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Account from "./components/Dashboard/Account/Account";
import EmailVerificationScreen from "./components/Screen/EmailVerificationScreen";
import ForgotPassword from "./components/Screen/ForgotPassword";
import JoinUsScreen from "./components/Screen/JoinUsScreen";
import ResetPassword from "./components/Screen/ResetPassword";
import UserOrderDetails from "./components/Dashboard/UserOrderList/UserOrderDetails";
import ContactScreen from "./components/Screen/ContactScreen";
export const UserContext = createContext();

function NotFound() {
  return (
    <div className="container mt-5 text-center">
      <h2 className="display-4">404 Not Found</h2>
      <p className="lead">The requested page does not exist.</p>
      <Link to="/" className="btn btn-outline-success btn-lg">
        Go to Home
      </Link>
    </div>
  );
}

function App() {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const user = sessionStorage.getItem("loggedInUser");
    return user ? JSON.parse(user) : {};
  });

  return (
    <>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <Router>
          <Switch>
            <PrivateRoute path="/dashboard">
              <Dashboard></Dashboard>
            </PrivateRoute>
            <PrivateRoute path="/addAmount">
              <AddAmount />
            </PrivateRoute>
            <Route path="/login">
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
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/verify-email/:token">
              <EmailVerificationScreen />
            </Route>
            <Route path="/forgot-password">
              <ForgotPassword />
            </Route>
            <Route path="/reset-password/:token">
              <ResetPassword />
            </Route>
            <Route path="/our-teams">
              <Teams />
            </Route>
            <Route path="/faqs">
              <FAQs />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <PrivateRoute path="/join-us">
              <JoinUsScreen />
            </PrivateRoute>
            <PrivateRoute path="/user-order-details/:orderId">
              <UserOrderDetails />
            </PrivateRoute>
            <PrivateRoute path="/contact-screen">
              <ContactScreen />
            </PrivateRoute>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/404" component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </Router>
      </UserContext.Provider>
      <ToastContainer />
    </>
  );
}

export default App;
