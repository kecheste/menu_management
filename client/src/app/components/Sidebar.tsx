"use client";

import { MdMenuOpen } from "react-icons/md";
import { FaFolder } from "react-icons/fa";
import { CiGrid41 } from "react-icons/ci";
import { CiFolderOn } from "react-icons/ci";

const Sidebar = ({
  activeMenu,
  setActiveMenu,
}: {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}) => {
  return (
    <aside className="w-64 px-4 pt-4 md:bg-gray-900 text-white h-full rounded-3xl">
      <div className="flex items-center justify-between">
        <div className="p-4 font-bold text-lg hidden md:block">CLOIT</div>
        <MdMenuOpen
          size={25}
          className="cursor-pointer text-gray-400 md:text-white"
        />
      </div>
      <ul className="mt-8 space-y-2 bg-gray-800 rounded-2xl py-4 hidden md:block">
        <li
          className={`px-4 py-2 cursor-pointer flex items-center gap-4 ${
            activeMenu === "Systems" ? "bg-green-500 rounded-lg px-4 mx-1" : ""
          }`}
          onClick={() => setActiveMenu("Systems")}
        >
          <FaFolder size={22} color="white" />
          <p className="text-grey-100">Systems</p>
        </li>
        <li
          className={`px-4 py-2 cursor-pointer flex items-center gap-4 ${
            activeMenu === "Menus" ? "bg-green-500 rounded-lg px-4 mx-1" : ""
          }`}
          onClick={() => setActiveMenu("Menus")}
        >
          <CiGrid41 size={22} className="text-gray-100" />
          <p className="text-grey-100">Menus</p>
        </li>
        <li
          className={`px-4 py-2 cursor-pointer flex items-center gap-4 ${
            activeMenu === "API List" ? "bg-green-500 rounded-lg px-4 mx-1" : ""
          }`}
          onClick={() => setActiveMenu("API List")}
        >
          <CiGrid41 size={22} className="text-gray-100" />
          <p className="text-grey-100">API List</p>
        </li>
        <li
          className={`px-4 py-2 cursor-pointer flex items-center gap-4 ${
            activeMenu === "SystemCode"
              ? "bg-green-500 rounded-lg px-4 mx-1"
              : ""
          }`}
          onClick={() => setActiveMenu("SystemCode")}
        >
          <CiGrid41 size={22} className="text-gray-100" />
          <p className="text-grey-100">SystemCode</p>
        </li>
      </ul>
      <ul className="mt-6 space-y-2 hidden md:block">
        <li
          className={`px-4 py-2 cursor-pointer flex items-center gap-4 ${
            activeMenu === "Users & Group"
              ? "bg-green-500 rounded-lg px-4 mx-1"
              : ""
          }`}
          onClick={() => setActiveMenu("Users & Group")}
        >
          <CiFolderOn size={22} className="text-gray-300" />
          <p className="text-grey-100">Users & Group</p>
        </li>
        <li
          className={`px-4 py-2 cursor-pointer flex items-center gap-4 ${
            activeMenu === "Competition"
              ? "bg-green-500 rounded-lg px-4 mx-1"
              : ""
          }`}
          onClick={() => setActiveMenu("Competition")}
        >
          <CiFolderOn size={22} className="text-gray-300" />
          <p className="text-grey-100">Competition</p>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
