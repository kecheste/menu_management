"use client";

import Sidebar from "./components/Sidebar";
import { BsGridFill } from "react-icons/bs";
import { FaFolder } from "react-icons/fa";
import { TreeView } from "@primer/react";
import Button from "./components/Button";
import InputForm from "./components/InputForm";
import { useState } from "react";

export default function Home() {
  const [activeMenu, setActiveMenu] = useState("Menus");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleSelectMenu = (menu: string) => {
    console.log(selectedMenu);
    setSelectedMenu(menu);
  };

  return (
    <div className="flex h-screen p-8">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <main className="grid grid-cols-12 gap-20 px-10">
        <div className="col-span-6 flex-col">
          <div className="flex items-center gap-3 mb-10">
            <FaFolder size={22} className="text-gray-300" />
            <p className="text-gray-400">/</p>
            <p className="text-gray-600">{activeMenu}</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="bg-blue-600 p-3 rounded-full">
              <BsGridFill size={22} color="white" />
            </p>
            <h1 className="text-3xl font-bold text-black">{activeMenu}</h1>
          </div>
          <div className="my-4 flex items-center">
            <select className="border rounded-md bg-gray-100 rounded-xl border-none text-gray-600 px-6 py-2 outline-none">
              <option>System management</option>
            </select>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <button
              className="bg-gray-900 text-white px-8 py-1.5 rounded-full"
              onClick={() => setExpanded(true)}
            >
              Expand All
            </button>
            <button
              className="text-gray-900 border px-8 py-1.5 rounded-full"
              onClick={() => setExpanded(false)}
            >
              Collapse All
            </button>
          </div>

          <TreeView className="text-gray-800" aria-label="Menu Changed">
            <TreeView.Item id="src" defaultExpanded expanded={expanded}>
              System Management
              <TreeView.SubTree>
                <TreeView.Item
                  id="systems"
                  defaultExpanded
                  expanded={expanded}
                  onSelect={() => handleSelectMenu("Systems")}
                >
                  Systems
                  <TreeView.SubTree>
                    <TreeView.Item
                      id="Menu Registration"
                      expanded={expanded}
                      onSelect={() => handleSelectMenu("Systems Code")}
                    >
                      Systems Code
                    </TreeView.Item>
                  </TreeView.SubTree>
                </TreeView.Item>
                <TreeView.Item
                  id="menu"
                  defaultExpanded
                  expanded={expanded}
                  onSelect={() => handleSelectMenu("Menu")}
                >
                  Menu
                  <TreeView.SubTree>
                    <TreeView.Item
                      id="Menu Registration"
                      expanded={expanded}
                      onSelect={() => handleSelectMenu("Menu Registration")}
                    >
                      Menu Registration
                    </TreeView.Item>
                  </TreeView.SubTree>
                </TreeView.Item>
              </TreeView.SubTree>
            </TreeView.Item>
          </TreeView>
        </div>
        {selectedMenu !== "" && (
          <div className="col-span-6 flex flex-col h-full justify-center">
            <ul className="flex flex-col gap-3">
              <InputForm
                text="Menu ID"
                type="text"
                placeholder="5ghjhf-38fhj3h-38fjkb"
              />
              <InputForm text="Depth" type="number" placeholder="3" />
              <InputForm text="ParentData" type="text" placeholder="Systems" />
              <InputForm
                text="Name"
                type="text"
                placeholder="System Code"
                value={selectedMenu}
              />

              <Button text="Save" />
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
