import React from "react";
import { Router, Link } from "react-router-dom";
import ListItem from "./ListItem";

const List = (props) => {
  return (
    <>
      <div className="todolist">
        {props.todos.map((todo, i) => (
          <ListItem
            key={i}
            todo={todo}
            onRemove={props.onRemove}
            onToggleOfComplete={props.onToggleOfComplete}
            onToggleOfImportant={props.onToggleOfImportant}
            onToggleOfEdit={props.onToggleOfEdit}
          />
        ))}
      </div>
    </>
  );
};
export default React.memo(List);
