import React, { useState, useCallback } from "react";
import axios from "axios";
import { MdAdd } from "react-icons/md";
import "../css/NewTodo.scss";
class NewTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: "", startDate: "", err: "" };
    console.log("newTODO", this.props.history)
  }
  // 1. 입력받은 내용을 새 일정(content)에 반영
  onChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };
  // 2. 버튼 메소드(엔터키 허용)
  handleClick = () => {
    if (this.state.content === "" || this.state.startDate === "") {
      this.setState({ err: "뭐라도 쓰십쇼" });
    } else {
      axios
        .post("http://54.180.79.137:8000/editMain", {
          id: this.props.userId,
          content: this.state.content,
          startDate: this.state.startDate,
          important: false,
        })
        .then((res) => {
          console.log("입력일정", res);
          // this.props.history.push("/");
        });
      this.props.doInsert(this.state);
      this.setState({ content: "", startDate: "" });
    }
  };
  // 3. 컴포넌트 렌더링
  render() {
    return (
      <>
        <form className="new-todo" onSubmit={(e) => e.preventDefault()}>
          <input
            className="startDate"
            placeholder="YYYY-MM-DD"
            name="startDate" // onChange 이벤트 입력을 위한 {name: value} 지정
            value={this.state.startDate}
            onChange={this.onChange}
            type="date"
          />
          <input
            className="content"
            placeholder="할 일을 입력하시오"
            // onChange 이벤트 입력을 위한 {name: value} 지정
            name="content"
            value={this.state.content}
            onChange={this.onChange}
          />
          <button type="submit" onClick={this.handleClick}>
            <MdAdd />
          </button>
        </form>
        <div>{this.state.err !== "" ? this.state.err : null}</div>
      </>
    );
  }
}
export default NewTodo;