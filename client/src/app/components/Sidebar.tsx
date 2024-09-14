"use client";

import { MdMenuOpen } from "react-icons/md";
import { FaFolder } from "react-icons/fa";
import { CiGrid41 } from "react-icons/ci";
import { useState } from "react";
import { FaRegFolder } from "react-icons/fa";

interface MenuItem {
  id: string;
  Depth: number;
  Name: string;
  ParentData: string;
  MenuId: string;
}

const Sidebar = ({
  activeMenu,
  setActiveMenu,
  menus,
}: {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  menus: MenuItem[];
}) => {
  const [expandedMenu, setExpandedMenu] = useState<string | null>("Systems");

  const renderIcon = (depth: number, name: string) => {
    if (depth === 3) {
      return (
        <CiGrid41
          size={26}
          className={name === activeMenu ? "text-gray-700" : "text-gray-100"}
        />
      );
    } else if (depth === 2) {
      return name === expandedMenu ? (
        <FaFolder size={26} color="white" />
      ) : (
        <FaRegFolder size={27} className="text-gray-600" />
      );
    }
    return null;
  };

  const depth2Menus = menus.filter((menu) => menu.Depth === 2);
  const depth3Menus = menus.filter((menu) => menu.Depth === 3);

  return (
    <aside className="w-64 px-4 pt-4 md:bg-gray-900 text-white h-full min-w-fit rounded-3xl">
      <div className="flex items-center justify-between mb-8">
        <div className="p-4 font-bold text-lg hidden md:block">CLOIT</div>
        <MdMenuOpen
          size={25}
          className="cursor-pointer text-gray-400 md:text-white"
        />
      </div>

      {depth2Menus.map((dep2menu) => (
        <ul
          key={dep2menu.id}
          className={
            "space-y-2 rounded-2xl hidden md:block min-w-fit " +
            (dep2menu.Name === expandedMenu ? "bg-gray-800 py-3 mb-2" : "py-2")
          }
        >
          <li key={dep2menu.id}>
            <div
              className={`px-4 py-2 cursor-pointer flex items-center justify-start gap-4 ${
                expandedMenu === dep2menu.Name ? "rounded-lg px-4 mx-1" : ""
              }`}
              onClick={() => {
                setExpandedMenu(
                  expandedMenu === dep2menu.Name ? null : dep2menu.Name
                );
              }}
            >
              {renderIcon(dep2menu.Depth, dep2menu.Name)}
              <p
                className={
                  dep2menu.Name === expandedMenu
                    ? "text-white font-semibold w-full"
                    : "text-gray-400 w-full"
                }
              >
                {dep2menu.Name}
              </p>
            </div>
            {expandedMenu === dep2menu.Name && (
              <ul className="pl-1">
                {depth3Menus
                  .filter((child) => child.ParentData === dep2menu.Name)
                  .map((child) => (
                    <li
                      key={child.id}
                      className={`px-4 mt-2 py-2 cursor-pointer flex items-center justify-start gap-4 ${
                        activeMenu === child.Name
                          ? "bg-[#9FF443] rounded-lg px-4 mx-1"
                          : ""
                      }`}
                      onClick={() => setActiveMenu(child.Name)}
                    >
                      {renderIcon(child.Depth, child.Name)}
                      <p
                        className={
                          child.Name === activeMenu
                            ? "text-gray-700 font-semibold w-full"
                            : "text-gray-100 w-full"
                        }
                      >
                        {child.Name}
                      </p>
                    </li>
                  ))}
              </ul>
            )}
          </li>
        </ul>
      ))}
    </aside>
  );
};

export default Sidebar;
