"use client";

import Sidebar from "./components/Sidebar";
import { BsGridFill } from "react-icons/bs";
import { FaFolder } from "react-icons/fa";
import Button from "./components/Button";
import InputForm from "./components/InputForm";
import { useEffect, useState } from "react";
import { uid } from "uid";
import api from "./helpers/api";
import { TreeView } from "@primer/react";

export default function Home() {
  const [activeMenu, setActiveMenu] = useState("Menus");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [expanded, setExpanded] = useState(true);
  const [id, setId] = useState("");
  const [menus, setMenus] = useState<MenuItem[]>([]);

  const [menuName, setMenuName] = useState("");
  const [menuDepth, setMenuDepth] = useState(2);
  const [menuParentData, setMenuParentData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelectMenu = (menu: string) => {
    console.log(selectedMenu);
    setSelectedMenu(menu);
  };

  const generateUid = () => {
    return uid(25);
  };

  const fetchMenus = async () => {
    try {
      const response = await api.get("/menu");
      setMenus(response.data);
    } catch {
      console.log("Error fetching menus");
    }
  };

  interface MenuItem {
    id: string;
    Depth: number;
    Name: string;
    ParentData: string;
    MenuId: string;
  }

  const renderTree = (parent: string) => {
    return menus
      .filter((node: MenuItem) => node.ParentData === parent)
      .map((node: MenuItem) => {
        const hasChildren = menus.some(
          (child: MenuItem) => child.ParentData === node.Name
        );

        return (
          <TreeView.Item
            key={node.id}
            id={node.Name}
            expanded={expanded}
            defaultExpanded={expanded}
            onSelect={() => handleSelectMenu(node.Name)}
          >
            {node.Name}
            {hasChildren && (
              <TreeView.SubTree>{renderTree(node.Name)}</TreeView.SubTree>
            )}
          </TreeView.Item>
        );
      });
  };

  const handleCreateMenu = async () => {
    try {
      setLoading(true);
      if (menuName === "" || menuParentData === "" || menuDepth === 0) {
        console.log("Please fill all fields");
        setLoading(false);
        return;
      }
      const uuid = generateUid();
      console.log(menuName, menuParentData, menuDepth, uuid);
      const response = await api.post("/menu", {
        MenuId: uuid,
        Depth: menuDepth,
        ParentData: menuParentData,
        Name: menuName,
      });
      setMenus([...menus, response.data]);
      setLoading(false);
    } catch {
      console.log("Error creating menu");
      setLoading(false);
    }
  };

  useEffect(() => {
    setId(generateUid());
    fetchMenus();
  }, []);

  return (
    <div className="flex flex-col gap-8 md:flex-row h-full md:h-screen sm:p-8 p-2 overflow-y-scroll">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <main className="grid grid-cols-7 md:grid-cols-12 md:gap-20 gap-10 md:px-10 px-4">
        <div className="col-span-7 md:col-span-6 flex-col">
          <div className="flex items-center gap-3 mb-10">
            <FaFolder size={22} className="text-gray-300" />
            <p className="text-gray-400">/</p>
            <p className="text-gray-600">{activeMenu}</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="bg-blue-600 md:p-3 p-2 rounded-full">
              <BsGridFill size={22} color="white" />
            </p>
            <h1 className="md:text-3xl text-2xl font-bold text-black">
              {activeMenu}
            </h1>
          </div>
          <div className="my-4 flex items-center">
            <select className="border rounded-md bg-gray-100 rounded-xl border-none text-gray-600 px-6 py-2 outline-none">
              <option>System management</option>
            </select>
          </div>
          <div className="flex items-center gap-4 md:mb-6 mb-4">
            <button
              className="bg-gray-900 text-white text-sm md:text-md px-8 py-1.5 rounded-full"
              onClick={() => setExpanded(true)}
            >
              Expand All
            </button>
            <button
              className="text-gray-900 border text-sm md:text-md px-8 py-1.5 rounded-full"
              onClick={() => setExpanded(false)}
            >
              Collapse All
            </button>
          </div>

          <TreeView className="text-gray-800" aria-label="Menu Changed">
            <TreeView.Item id="src" defaultExpanded expanded={expanded}>
              System Management
              {renderTree("System Management")}
            </TreeView.Item>
          </TreeView>
        </div>
        <div className="col-span-7 md:col-span-6 flex flex-col md:h-full md:justify-center">
          <ul className="flex flex-col gap-3">
            <InputForm
              text="Menu ID"
              type="text"
              placeholder="5ghjhf-38fhj3h-38fjkb"
              value={id}
            />
            <InputForm
              text="Depth"
              type="number"
              placeholder="3"
              onChange={(e) => setMenuDepth(Number(e.target.value))}
            />
            <InputForm
              text="ParentData"
              type="text"
              placeholder="Systems"
              onChange={(e) => setMenuName(e.target.value)}
            />
            <InputForm
              text="Name"
              type="text"
              placeholder="System Code"
              onChange={(e) => setMenuParentData(e.target.value)}
            />

            <Button text="Save" onClick={handleCreateMenu} loading={loading} />
          </ul>
        </div>
      </main>
    </div>
  );
}
