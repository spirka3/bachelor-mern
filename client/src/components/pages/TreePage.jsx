import React, {Component, useState} from "react";
import SortableTree from 'react-sortable-tree'
import {treeData as t} from "../../helpers/treeData";

const TreePage = () => {

  const [treeData, setTreeData] = useState(t);

  return (
    <div style={{ height: 500 }}>
      <h1>lol</h1>
      <SortableTree
        treeData={treeData}
        onChange={treeData => setTreeData( treeData )}
      />
    </div>
  );
}

export default TreePage