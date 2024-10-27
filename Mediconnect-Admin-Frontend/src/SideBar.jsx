import React from 'react';
import { StatsIcon, AuthorizeIcon, ManageIcon, HomeIcon } from './Icons/icon.js';

const SideBar = ({ activeMenuItem, setActiveMenuItem, adminName }) => {
  const menuItems = [
    { name: 'Home', icon: <HomeIcon /> },
    { name: 'Authorize Doctors', icon: <AuthorizeIcon /> },
    { name: 'Generate Reports', icon: <StatsIcon />  },
    { name: 'Manage Account', icon: <ManageIcon /> },
  ];

  // Extract the first letter of the admin name
  const firstLetter = adminName ? adminName.charAt(0).toUpperCase() : '';

  return (
    <div className="h-full-screen w-64 bg-gray-800 text-white" style={{ width: '220px' }}>
      <div className=" items-center pt-4 pl-4">
        <div className="flex items-center justify-center w-20 h-20 bg-gray-600 rounded-full text-3xl font-semibold mr-2">
          {firstLetter}
        </div>
        <span className="text-xl font-semibold">{adminName}</span>
      </div>
      <ul className="mt-6 pt-10">
        {menuItems.map((item, index) => (
          <li
            key={index}
            onClick={() => setActiveMenuItem(item.name)}
            className={`flex items-center py-5 cursor-pointer ${activeMenuItem === item.name ? ' bg-gray-500' : ''}`}
          >
            <div className="mr-4">
              {item.icon}
            </div>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
