import React from 'react'
import { NavLink } from 'react-router-dom';
import {LayoutDashboard, Users, Package, Settings as Cog } from "lucide-react"; // nice icons



const NavBar = () => {
  return (
      <aside className="w-64 bg-white shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-4">
           <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white"
              : "flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600"
          }
        >
        <LayoutDashboard size={20} /> Overview        
  </NavLink>
        <NavLink
  to="/buyers"
  activeClassName="bg-blue-600 text-white"
  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600"
>
  <Users size={20} /> Buyers
</NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white"
              : "flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600"
          }
        >
          <Package size={20} /> Products
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white"
              : "flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600"
          }
        >
          <Cog size={20} /> Settings
        </NavLink>
      </nav>
    </aside>
  )
}

export default NavBar