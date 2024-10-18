"use client";

import { MdMenuOpen } from "react-icons/md";
import { FaFolder, FaRegFolder } from "react-icons/fa";
import { CiGrid41 } from "react-icons/ci";
import { useState } from "react";

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
  sidebarOpen,
  setSidebarOpen,
}: {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  menus: MenuItem[];
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
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
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <MdMenuOpen
          size={25}
          className={
            "cursor-pointer text-gray-500 md:text-white ml-1 " +
            (sidebarOpen ? "hidden" : "")
          }
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>

      <aside
        className={`fixed top-0 px-4 left-0 z-40 h-full bg-gray-900 text-white transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 md:relative md:translate-x-0 ${
          sidebarOpen ? "md:w-64" : "md:w-16"
        } md:block min-w-fit rounded-none md:rounded-3xl`}
      >
        <div className="p-4 flex items-center justify-between mb-8">
          <div className={`${sidebarOpen ? "font-bold text-lg" : "hidden"}`}>
            CLOIT
          </div>
          <MdMenuOpen
            size={25}
            className="cursor-pointer text-gray-400 md:text-white"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>

        {sidebarOpen &&
          depth2Menus.map((dep2menu) => (
            <ul
              key={dep2menu.id}
              className={`space-y-2 rounded-2xl min-w-fit ${
                dep2menu.Name === expandedMenu
                  ? "bg-gray-800 py-3 mb-2"
                  : "py-2"
              }`}
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
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
