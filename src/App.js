





import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, useHistory, Redirect } from "react-router-dom";

// import NavbarUser from "./components/NavbarUser";
import Navbar from './components/TopNavBar/Navbar';

import "./components/NavbarUser.css";
import "./components/TopNavBar/Navbar.css";


import ToShowTopPath from './components/ToShowTopPath';

import UserHierarchy from './components/HierarchyTree/UserHierarchy';

import UserProfile from './components/UserProfile/UserProfile';
import AddNew from './components/AddNewUser/AddNew';

import DirPath from './components/DirPath';
import FilterBar from './components/FilterBar';

import LeaveRequest from './components/LeaveRequest/LeaveRequest';
import AttandanceHistory from './components/AttandanceHistory/AttandanceHistory';
import LeftSideBar from './components/LeftSideBar';
import LoginAlertModel from './components/LoginAlertModel';

import CheckAuth from "./components/CheckAuthentication";
import PrivateRoute from "./components/PrivateRoute";
import Login from './components/Login/Login';



function App() {

  const [toogleListGrid, settoogleListGrid] = useState(false);

  // useEffect(() => {
  //   Update the document title using the browser API
  //   localStorage.getItem('storedData') ? ("") : (window.location.href = '/login');
    
  // }, []);

  console.log("toogleListGrid :", toogleListGrid);


  return (

    <BrowserRouter>

      {/* <LoginAlertModel show={showLoginAlert} hide={() => setshowLoginAlert(false)} success={success} /> */}

      {
        
        (window.location.pathname === "/" || window.location.pathname === "/login" || CheckAuth() === false) ?
          <Route exact patch="/login">
            <>
              <Login />
            </>
          </Route>

          :

          <div className="d-flex wrap">
            {/* <!--........................Left NavBar.............................--> */}
            <LeftSideBar />

            {/* <!--........................Right Side.............................--> */}
            <div className="right">

              {/* .......................Top NavBar.......................... */}
              <Navbar />

              {/* .......................Switch Statements.......................... */}

              <div className="toFill">

                {/* <Switch> */}
                
                <PrivateRoute exact path="/users/users-list" isAuth={CheckAuth()}>
                  <><DirPath /> <FilterBar listOrGrid={toogleListGrid} toogleListGrid={() => settoogleListGrid(!toogleListGrid)} takeAttandance={false} attandanceHistory={false} /> </>
                </PrivateRoute>

                <PrivateRoute exact path="/users/hierarchy" isAuth={CheckAuth()}>
                  <> <ToShowTopPath path={"Users / Hierarachy"} /> <UserHierarchy /> </>
                </PrivateRoute>

                <PrivateRoute exact path="/attandance/take-attandance" isAuth={CheckAuth()}>
                  <> <ToShowTopPath path={"Attandance / Take Attandance"} /> <FilterBar hideGridView={true} takeAttandance={true} attandanceHistory={false} /> </>
                </PrivateRoute>

                <PrivateRoute exact path="/attandance/leave-request" isAuth={CheckAuth()}>
                  <> <ToShowTopPath path={"Attandance / Leave Request"} /> <LeaveRequest /> </>
                </PrivateRoute>

                <PrivateRoute exact path="/attandance/history" isAuth={CheckAuth()}>
                  <> <ToShowTopPath path={"Attandance / Attandance History"} /> <AttandanceHistory /> </>
                </PrivateRoute>

                <PrivateRoute exact path="/addnew" isAuth={CheckAuth()}>
                  <AddNew />
                </PrivateRoute>

                <PrivateRoute exact path="/profile" isAuth={CheckAuth()}>
                  <UserProfile />
                </PrivateRoute>

                {/* <Route render={() => <Redirect to={{pathname: "/"}} />} /> */}
                
                {/* </Switch> */}

                {/* <!--............Last Div at end............--> */}
                <div className="last-div" />

              </div>

            </div>
          </div>

      }

      
    </BrowserRouter>

  );
}

export default App;
