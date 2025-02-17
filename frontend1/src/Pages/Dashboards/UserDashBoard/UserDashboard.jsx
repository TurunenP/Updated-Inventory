import React, { useEffect, useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom'; // Import Outlet for nested routing
import Wheader from '../../../Components/Wheader/Wheader';
import Sidebar from '../../../Components/SideBar/SideBar';
import Welcome from '../../../Components/UserComponents/Welcome';
import BorrowedItems from '../../../Components/UserComponents/BorrowedItems';
import ExploreLabs from '../../../Components/UserComponents/ExploreLabs';
// import SearchItems from '../../../Components/UserComponents/SearchItems'; // Example component

const UserDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set the user data
    }
  }, []);


  return (
    <div className="w-screen bg-gradient-to-tr from-10% from-sky-300 to-blue-600 relative overflow-hidden flex flex-col">
      {/* Header */}
      <Wheader/>

      {/* Sidebar */}
      <div className="flex">
        <Sidebar/>

        {/* Main content area with nested routes */}
        <div className="flex flex-col w-full">
          {/* The Outlet renders the child routes dynamically here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
