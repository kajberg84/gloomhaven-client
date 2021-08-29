// React import
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Ui
import Navbar from "./components/ui/navbar/Navbar";
import Footer from "./components/ui/footer/Footer";
//Pages
import Home from "./components/pages/home/Home";
import Login from "./components/pages/login/Login";
import Registration from "./components/pages/registration/Registration";
import Contact from './components/pages/contact/Contact';
import RouteError from "./components/pages/error/RouteError";
import Gloom from './components/pages/gloom/Gloom'
// Functional
import UserProvider from './components/statemanagement/UserContext';
import ProtectedRoute from "./ProtectedRoute";


/**
 * Main rendering view
 *
 * @return {*} 
 */
const App = () => {
  return (
    <Router>
      <UserProvider>
      <div className="main-container">
        {/* navbar */}
        <div className="navbar-container">
          <Navbar />
        </div>
        {/* main */}

        <main className="main-wrapper">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/registration">
              <Registration />
            </Route>
            <Route exact path="/contact">
              <Contact />
            </Route>
            <Route exact path="/unauthorized">
              <RouteError />
            </Route>
            <ProtectedRoute exact path ="/gloom" component={Gloom}/>
            <Route exact path="*">
              <RouteError />
            </Route>
          </Switch>
        </main>

        {/* footer */}
        <footer className="footer-container">
          <Footer />
        </footer>
      </div>
      </UserProvider>
    </Router>
  );
};

export default App;
