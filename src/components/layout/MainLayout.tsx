import React from 'react';

import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const MainLayout = () => {
    return ( <div className="h-screen overflow-hidden flex p-20 gap-8  justify-end">
    <div className="w-full max-w-[1440px] h-full border border-1 rounded-xl shadow-lg bg-blue-500">
    <Outlet />
    </div>
<SideBar/>
    </div> );
}
 
export default MainLayout;