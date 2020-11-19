import React from "react";
import { HashRouter, Route } from "react-router-dom";
import axios from "axios";
// components
import Important from "./Important";
import Complete from "./Complete";
import List from "./List";
import NewTodo from "./NewTodo";
import EditTodo from "./EditTodo";
import Button from "../css/Button";

//-----newTodo
import { MdAdd } from "react-icons/md";
import "../css/NewTodo.scss";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: window.sessionStorage.getItem("id"),
      todos: [],

      content: "",
      startDate: "",
      err: ""

    };
    console.log("투두 스테이트", this.state.todos);
    axios
      .post("http://54.180.79.137:8000/getMain", {
        id: window.sessionStorage.getItem("id"),
      })
      .then((res) => {
        console.log("무엇인가 너는", res)
        if (!this.state.todos) {
          this.setState({
            todos: [
              {
                userId: this.state.userId,
                todoId: 0,
                content: "아직 첫 글이 등록되지 않았습니다.",
                startDate: "2020-11-19",
                name: window.sessionStorage.getItem("name"),
                email: window.sessionStorage.getItem("email"),
                important: true,
                complete: false,
                deleteId: false,
              },
            ],
          });
        } else {
          console.log("박종찬 팀장님", this.state.todos)
          this.setState({ todos: res.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //-------------newTodo-----------------------------

  // 1. 입력받은 내용을 새 일정(content)에 반영
  onChange = (key) => (e) => {
    this.setState({
      [key]: e.target.value
    });
  };
  // 2. 버튼 메소드(엔터키 허용)
  handleClick = () => {
    if (this.state.content === "" || this.state.startDate === "") {
      this.setState({ err: "뭐라도 쓰십쇼" });
    } else {
      axios
        .post("http://54.180.79.137:8000/editMain", {
          id: this.state.userId,
          content: this.state.content,
          startDate: this.state.startDate,
          important: false,
        })
        .then((res) => {
          console.log("입력일정", res);
          // this.props.history.push("/");
        });
      this.doInsert(this.state);
      this.setState({ content: "", startDate: "" });
    }
  };

  //--------------------------------------------------

  doInsert = (newTodo) => {
    // let sorted = this.state.todos
    //   .map((todo) => {
    //     return todo.todoId;
    //   })
    //   .sort((a, b) => b - a);
    this.setState((addedState) => ({
      todos: addedState.todos.concat(newTodo),
    }));
  };
  // 삭제 클릭 메소드
  // onRemove = (pickedTodoId) => {
  //   this.setState((stateOnRemoved) => ({
  //     todos: stateOnRemoved.todos.filter(
  //       (todo) => todo.todoId !== pickedTodoId
  //     ),
  //   }));
  // };
  // 중요 클릭 메소드
  onToggleOfImportant = (pickedTodoId) => {
    const mapped = this.state.todos.map((todo) => todo.todoId === pickedTodoId);
    if (mapped) {
      try {
        axios
          .patch("http://54.180.79.137:8000/editMain", {
            userId: this.state.userId,
            todoId: pickedTodoId,
            important: !this.state.important,
            content: mapped.content,
          })
          .then((res) => {
            this.setState({ todos: res.data });
          });
      } catch (err) {
        console.log(err);
      }
    }
  };
  // this.setState((statePutImportant) => ({
  //   todos: statePutImportant.todos.map((todo) =>
  //     todo.todoId === pickedTodoId
  //       ? { ...todo, important: !todo.important }
  //       : todo
  //   ),
  // }));
  // 완료 클릭 메소드
  onToggleOfComplete = (pickedTodoId) => {
    this.setState((statePutComplete) => ({
      todos: statePutComplete.todos.map((todo) =>
        todo.todoId === pickedTodoId
          ? { ...todo, complete: !todo.complete }
          : todo
      ),
    }));
  };
  // 수정 클릭 메소드
  onToggleOfEdit = (pickedTodoId) => {
    (edited) => {
      this.setState((statePutEdited) => ({
        todos: statePutEdited.todos.map((todo) =>
          todo.todoId === pickedTodoId ? { ...todo, content: edited } : todo
        ),
      }));
    };
  };
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.todos !== nextProps.todos;
  }
  render() {

    // const todoList = this.state.todos.map((item) =>
    //   <li key={item.todoId} >
    //     <span>{item.content}</span>
    //   </li>
    // )
    // console.log("todoList_Item", this.state.todos)
    return (
      <>
        {/* <ui>
          {todoList}
        </ui> */}
        {/* --------------------newTodo----------------------- */}

        <form className="new-todo" onSubmit={(e) => e.preventDefault()}>
          <input
            className="startDate"
            placeholder="YYYY-MM-DD"
            name="startDate" // onChange 이벤트 입력을 위한 {name: value} 지정
            value={this.state.startDate}
            onChange={this.onChange("startDate")}
            type="date"
          />
          <input
            className="content"
            placeholder="할 일을 입력하시오"
            // onChange 이벤트 입력을 위한 {name: value} 지정
            name="content"
            value={this.state.content}
            onChange={this.onChange("content")}
          />
          <button type="submit" onClick={this.handleClick}>
            <MdAdd />
          </button>
        </form>
        <div>{this.state.err !== "" ? this.state.err : null}</div>


        {/* ----------------------------------------------- */}



        {/* <NewTodo
          userId={this.state.userId}
          doInsert={this.doInsert.bind(this)}
        /> */}
        <section className="container-list">
          <div className="todo">
            <List
              todos={this.state.todos}
              // onRemove={this.onRemove.bind(this)}
              onToggleOfImportant={this.onToggleOfImportant.bind(this)}
              onToggleOfComplete={this.onToggleOfComplete.bind(this)}
              onToggleOfEdit={this.onToggleOfEdit.bind(this)}
            />
          </div>
        </section>
        {/* <Route render={() => <EditTodo editContent={this.editContent} />} />
          <Button>정보반영</Button> */}
      </>
    );
  }
}
export default Todo;