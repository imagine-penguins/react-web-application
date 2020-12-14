





import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Redirect, Route, useHistory, useRouteMatch } from "react-router-dom";
import "./NavbarUser.css";
import "./TopNavBar/Navbar.css";

import axios from "./axios";
import ToShowTopPath from './ToShowTopPath';

import UserHierarchy from './HierarchyTree/UserHierarchy';
import ListViewUser from './ListViewUser';

import UserProfile from './UserProfile/UserProfile';
import AddNew from './AddNewUser/AddNew';

import DirPath from './DirPath';
import ItemDetails from './ItemDetails';
import FilterBar from './FilterBar';

import TakeAttandance from './TakeAttandance/TakeAttandance';
import LeaveRequest from './LeaveRequest/LeaveRequest';
import AttandanceHistory from './AttandanceHistory/AttandanceHistory';
import Switch from 'react-bootstrap/esm/Switch';
import LeftSideBar from './LeftSideBar';
import Navbar from './TopNavBar/Navbar';


function NavbarUser(props) {



    let { path, url } = useRouteMatch();

    return (
        <>

        </>

    );
}

export default NavbarUser

