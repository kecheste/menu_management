import { TreeView } from "@primer/react";
import React from "react";

function Tree({
  data,
}: {
  data: {
    id: string;
    Depth: string;
    Name: string;
    ParentData: string;
    MenuId: string;
  }[];
}) {
  const renderTree = (parent: string) => {
    return data
      .filter((node) => node.ParentData === parent)
      .map((node) => (
        <TreeView.Item key={node.id} id={node.id}>
          {node.Name}
          <TreeView.SubTree>{renderTree(node.Name)}</TreeView.SubTree>
        </TreeView.Item>
      ));
  };

  return <TreeView>{renderTree("")}</TreeView>;
}

export default Tree;
