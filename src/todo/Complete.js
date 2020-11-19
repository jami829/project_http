import React from "react";

// components
import ListComplete from "./ListComplete";

const Complete = (props) => {
  const filtered = props.todos.filter((todo) => todo.complete === true);
  console.log("완료로 넘어온 Props", props);
  console.log("완료된것", filtered);

  return (
    <>
      <section className="container-list">
        <div
          className="title-complete"
          style={{ fontSize: `1.5rem`, fontWeight: `border` }}
        >
          &#9989; 완료일정
        </div>
        <div className="todo">
          {filtered.map((todo, i) => (
            <ListComplete key={i} todo={todo} />
          ))}
        </div>
      </section>
    </>
  );
};

export default React.memo(Complete);
