import React from "react";

// components
import ListImportant from "./ListImportant";

class Important extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: props.todos };
    console.log("중요 Constructor", this.state);
  }

  render() {
    const filtered = this.props.todos.filter((todo) => (
      todo.important === true
    ));
    const renderTrue = filtered.map((item) =>
      <li key={item.todoId} >
        <span>{item.content}</span>
      </li>
    )

    console.log("중요로 넘어온 Props", this.props);
    console.log("필터!!!", filtered);

    return (
      <>
        <section className="container-list">
          <div
            className="title-important"
            style={{ fontSize: `1.5rem`, fontWeight: `border` }}
          >
            &#127775; 중요일정
          </div>
          <div className="todo">
            {/* {this.props.todos.map((todo, i) => (
              <ListImportant key={i} todo={todo} />
            ))} */}
            <ui>
              {renderTrue}
            </ui>

          </div>
        </section>
      </>
    );
  }
}

export default React.memo(Important);
