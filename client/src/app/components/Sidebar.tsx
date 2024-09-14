"use client";

import { MdMenuOpen } from "react-icons/md";
import { FaFolder } from "react-icons/fa";
import { CiGrid41 } from "react-icons/ci";
import { useEffect, useState } from "react";
import api from "../helpers/api";

const Sidebar = ({
  activeMenu,
  setActiveMenu,
}: {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}) => {
  interface MenuItem {
    id: string;
    Depth: number;
    Name: string;
    ParentData: string;
    MenuId: string;
  }

  const [menus, setMenus] = useState<MenuItem[]>([]);

  const fetchMenus = async () => {
    try {
      const response = await api.get("/menu");
      setMenus(response.data);
    } catch {
      console.log("Error fetching menus");
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const renderIcon = (depth: number) => {
    if (depth === 1) {
      return <CiGrid41 size={22} className="text-gray-100" />;
    } else if (depth === 2) {
      return <FaFolder size={22} color="white" />;
    }
    return null;
  };

  return (
    <aside className="w-64 px-4 pt-4 md:bg-gray-900 text-white h-full min-w-fit rounded-3xl">
      <div className="flex items-center justify-between">
        <div className="p-4 font-bold text-lg hidden md:block">CLOIT</div>
        <MdMenuOpen
          size={25}
          className="cursor-pointer text-gray-400 md:text-white"
        />
      </div>

      <ul className="mt-8 space-y-2 bg-gray-800 rounded-2xl py-4 hidden md:block min-w-fit">
        {menus.map(
          (menu) =>
            menu.Depth <= 2 && (
              <li
                key={menu.id}
                className={`px-4 py-2 cursor-pointer flex items-center justify-start gap-4 ${
                  activeMenu === menu.Name
                    ? "bg-green-500 rounded-lg px-4 mx-1"
                    : ""
                }`}
                onClick={() => setActiveMenu(menu.Name)}
              >
                {renderIcon(menu.Depth)}
                <p className="text-grey-100 w-full ">{menu.Name}</p>
              </li>
            )
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
