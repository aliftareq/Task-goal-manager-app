import React from 'react';
import { Outlet } from 'react-router-dom';
import { Nav } from '../Pages/shared/Navbar/Navbar';

const Main = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;