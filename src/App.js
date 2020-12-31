import './App.css';




import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Link, Router, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

// import NavbarUser from "./components/NavbarUser";
import LoginModel from './components/Login/LoginModel';
import Navbar from './components/TopNavBar/Navbar';

import "./components/NavbarUser.css";
import "./components/TopNavBar/Navbar.css";


import ToShowTopPath from './components/ToShowTopPath';
import NavbarUser from './components/NavbarUser';

import UserHierarchy from './components/HierarchyTree/UserHierarchy';
import ListViewUser from './components/ListViewUser';

import UserProfile from './components/UserProfile/UserProfile';
import AddNew from './components/AddNewUser/AddNew';

import DirPath from './components/DirPath';
import ItemDetails from './components/ItemDetails';
import FilterBar from './components/FilterBar';

import TakeAttandance from './components/TakeAttandance/TakeAttandance';
import LeaveRequest from './components/LeaveRequest/LeaveRequest';
import AttandanceHistory from './components/AttandanceHistory/AttandanceHistory';
import LeftSideBar from './components/LeftSideBar';



function App() {


  const [checkLogin, setcheckLogin] = useState(true);
  const [reload, setreload] = useState(false);
  const [toogleListGrid, settoogleListGrid] = useState(false);
  const [hierarchyData, sethierarchyData] = useState([]);


  useState(() => {

    if (localStorage.getItem("storedData")) {

      setcheckLogin(false);
      console.log("window.location.pathname inside useState : ", checkLogin);

    }

  }, []);


  console.log("window.location.pathname outSide useState : ", checkLogin);



  return (


    <Provider store={store}>
      {checkLogin ? <LoginModel showLogin={() => setcheckLogin(true)} hideLogin={() => setcheckLogin(false)} />

        :

        <BrowserRouter>

          <div className="d-flex wrap">

            {/* <!--........................Left NavBar.............................--> */}
            <LeftSideBar />


            {/* <!--........................Right Side.............................--> */}
            <div className="right">

              {/* .......................Top NavBar.......................... */}
              <Navbar login={() => setcheckLogin(true)} />

              {/* .......................Switch Statements.......................... */}

              <div className="toFill">

                <Switch>

                  <Route exact path="/users/users-list">
                    <> <DirPath /> <FilterBar listOrGrid={toogleListGrid} toogleListGrid={() => settoogleListGrid(!toogleListGrid)} takeAttandance={false} /> </>
                  </Route>

                  <Route exact path="/users/hierarchy">
                    <UserHierarchy hierarchyData={hierarchyData} />
                  </Route>

                  <Route exact path="/attandance/take-attandance">
                    <> <ToShowTopPath path={"Attandance / Take Attandance"} /> <FilterBar hideGridView={true} takeAttandance={true} /> </>
                  </Route>

                  <Route exact path="/attandance/leave-request">
                    <> <ToShowTopPath path={"Attandance / Leave Request"} /> <LeaveRequest /> </>
                  </Route>

                  <Route exact path="/attandance/history">
                    <> <ToShowTopPath path={"Attandance / Attandance History"} /> <AttandanceHistory /> </>
                  </Route>

                  <Route exact path="/addnew">
                    <AddNew />
                  </Route>

                  <Route exact path="/profile">
                    <UserProfile />
                  </Route>


                </Switch>


                {/* <!--............Last Div at end............--> */}
                <div className="last-div" />

              </div>

            </div>
          </div>


        </BrowserRouter>
      }

    </Provider>

  );
}

export default App;
