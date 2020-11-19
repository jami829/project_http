// import React from "react";
// import { HashRouter, Route } from "react-router-dom";
// import axios from "axios";

// // components
// import Important from "./Important";
// import Complete from "./Complete";
// import List from "./List";
// import NewTodo from "./NewTodo";
// import EditTodo from "./EditTodo";
// import Button from "../css/Button";

// class Todo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       todos: [],
//     };
//   }

//   onInsert = async (newTodo) => {
//     let sorted = this.state.todos
//       .map((todo) => {
//         return todo.todoId;
//       })
//       .sort((a, b) => b - a);

//     let todo = {
//       id: newTodo.id,
//       todoId: sorted[0] + 1,
//       content: newTodo.content,
//       startDate: newTodo.startDate,
//       complete: false,
//       important: false,
//     };

//     this.setState((todos) => todos.concat(todo));

//     const res = await axios.post("http://localhost:8000/main", {
//       id: todo.id,
//       content: todo.id,
//       startDate: todo.startDate,
//       important: todo.important,
//     });

//     console.log(`등록한 일정: ${res.content}`);
//   };

//   // 4. 삭제 클릭 메소드
//   onRemove = (todoId) => {
//     this.setState((todos) => todos.filter((todo) => todo.todoId !== todoId));
//   };

//   // 5. 중요 클릭 메소드
//   onToggleOfImportant = (todoId) => {
//     this.setState((todos) =>
//       todos.map((todo) =>
//         todo.todoId === todoId ? { ...todo, important: !todo.important } : todo
//       )
//     );
//   };

//   // 6. 완료 클릭 메소드
//   onToggleOfComplete = (todoId) => {
//     this.setState((todos) =>
//       todos.map((todo) =>
//         todo.todoId === todoId ? { ...todo, complete: !todo.complete } : todo
//       )
//     );
//   };

//   // 7. 수정 클릭 메소드
//   onToggleOfEdit = (todoId) => {
//     this.editContent;
//   };

//   // // 8. 글 수정
//   // editContent = (edited) => {
//   //   this.setState((todos) =>
//   //     todos.map((todo) => (todo.edited ? { ...todo, content: edited } : todo))
//   //   );
//   // };

//   // // 9. 글 수정 반영
//   // onAdopt = (edited) => {};

//   componentDidMount = () => {
//     // axios
//     //   .post("http://localhost:8000/getMain", {
//     //     id: this.props.id,
//     //   })
//     //   .then((res) => this.setState({ todos: res.data }));

//     this.setState({ todos: this.props.todos });
//     console.log("일정 목록을 렌더링 합니다.");
//     console.log(this.state.todos);
//   };

//   // 10. 컴포넌트 렌더링
//   render() {
//     return (
//       <>
//         <HashRouter>
//           {/* 일정입력 컴포넌트 */}
//           <NewTodo onInsert={this.onInsert} />
//           <section className="container-list">
//             <div className="todo">
//               <List
//                 todos={this.state.todos}
//                 onRemove={this.onRemove}
//                 onToggleOfImportant={this.onToggleOfImportant}
//                 onToggleOfComplete={this.onToggleOfComplete}
//                 onToggleOfEdit={this.onToggleOfEdit}
//               />
//             </div>
//           </section>
//           {/* <Route render={() => <EditTodo editContent={this.editContent} />} />
//           <Button>정보반영</Button> */}
//         </HashRouter>
//       </>
//     );
//   }
// }
// // 컴포넌트의 props가 바뀌지 않았다면 re-rendering 방지(= shouldComponentUpdate와 동일)
// export default Todo;
