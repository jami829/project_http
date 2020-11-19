// import React, { useState, useRef, useCallback, useEffect } from "react";
// import { Route } from "react-router-dom";
// import axios from "axios";
// // components
// import List from "./List";
// import NewTodo from "./NewTodo";
// import EditTodo from "./EditTodo";
// import Button from "../css/Button";
// import "../css/Todo.css";
// /*****************************************************************
//                             리액트 훅 명세표
// (1) useState
//  - 일정들을 "todos"로 정의(class 컴포넌트의 this.state에 대응됨)
//  - todos는 [ {todo1}, {todo2}, {todo3}, ... ] 의 모습임
//  - 즉, todos에는 이미 각 todo들의
//    { userId, todoId, content, startDate, important, complete }
//    이 담겨있음
// (2) useCallback
//  - 일정입력 이벤트에 쓰일 "onChange 메소드"를 정의하여 "재사용"할 수 있게 함
//  - 이때 "재사용"이란 의미는 render 여부와 관계없이 컴포넌트에 유지함을 의미
//  - 일반적으로 useCallback로 감싼 메소드는 컴포넌트의 render 대상에서 제외되므로
//    이는 컴포넌트의 성능 향상에 도움됨
// (3) useRef
//  - "todoId"와 같이 화면에 보여줄 필요도 없고 render로 관리할 필요도 없는 경우,
//    즉, 다른 컴포넌트에서 참조(reference) 목적으로만 필요한 경우 사용
// ******************************************************************/

// const Todo = ({ userId, todos }) => {
//   // 0. todo state
//   const [todoList, setTodoList] = useState(todos);
//   const [loading, setLoading] = useState(false);
//   const [isEdit, setEdit] = useState(false);
//   const [err, setErr] = useState("");

//   // 0. 클린업
//   const cleanInput = () => {
//     const msg = <p>무언가 잘못되었소...</p>;
//     setTodoList();
//     setLoading(false);
//     setEdit(false);
//     setErr(msg);
//   };

//   // 1-1. 렌더링 후 정보 로드
//   useEffect(() => {
//     const fetchData = async () => {
//       setErr("");
//       setLoading(true);
//       try {
//         const res = await axios.post("http://54.180.79.137:8000/getMain", {
//           id: userId,
//         });
//         setTodoList(res.data);
//         setLoading(false);
//         return; // clean-up
//       } catch (err) {
//         cleanInput();
//       }
//     };
//     fetchData();
//     console.log(
//       `[작성된 ToDo의 ID] ${todoList.map((todo) => {
//         return todo.todoId;
//       })}`
//     );
//   }, [todoList]);

//   // 3. 새 일정 입력 메소드
//   const onInsert = useCallback(
//     async (newTodo) => {
//       let sorted = todoList
//         .map((todo) => {
//           return todo.todoId;
//         })
//         .sort((a, b) => b - a);

//       let todo = {
//         userId: newTodo.userId,
//         // todoId: sorted[0].current,
//         todoId: sorted[0],
//         content: newTodo.content,
//         startDate: newTodo.startDate,
//         complete: false,
//         important: false,
//         deleteId: false,
//       };
//       // 컴포넌트 내 일정 목록 최신화(re-rendering)
//       if (todo) {
//         setTodoList((todoList) => todoList.concat(todo));
//       } else {
//         cleanInput();
//       }
//       // nexttodoId.current += 1;
//     },
//     [todoList]
//   );

//   // 4. 삭제 클릭 메소드
//   const onRemove = useCallback(
//     (todoId) => {
//       if (todoId) {
//         setTodoList((todoList) =>
//           todoList.filter((todo) => todo.todoId !== todoId)
//         );
//       } else {
//         cleanInput();
//       }
//     },
//     [todoList]
//   );

//   // 5. 중요 클릭 메소드
//   const onToggleOfImportant = useCallback(
//     (todoId) => {
//       // 새로운 일정 객체를 만든 후 state에 구현(원본불변)
//       if (todoId) {
//         setTodoList((todoList) =>
//           todoList.map((todo) =>
//             todo.todoId === todoId
//               ? { ...todo, important: !todo.important }
//               : todo
//           )
//         );
//       } else {
//         cleanInput();
//       }
//       // 서버에 POST
//     },
//     [todoList]
//   );

//   // 6. 완료 클릭 메소드
//   const onToggleOfComplete = useCallback(
//     (todoId) => {
//       // 클릭된 일정의 todoId의 important 값을 반대 boolean 값으로 변경하여 state에 구현
//       if (todoId) {
//         setTodoList(
//           todoList.map((todo) =>
//             todo.todoId === todoId
//               ? { ...todo, complete: !todo.complete }
//               : todo
//           )
//         );
//       } else {
//         cleanInput();
//       }
//       // 서버에 POST
//     },
//     [todoList]
//   );

//   // 7. 수정 클릭 메소드
//   const onToggleOfEdit = useCallback(
//     (todoId) => {
//       if (todoId) {
//         setEdit(true);
//         editContent;
//       } else {
//         cleanInput();
//       }
//     },
//     [isEdit]
//   );

//   // 8. 글 수정
//   const editContent = useCallback(
//     (edited) => {
//       if (isEdit && edited) {
//         setTodoList(
//           todoList.map((todo) =>
//             todo.edited ? { ...todo, content: edited } : todo
//           )
//         );
//       } else {
//         cleanInput();
//       }
//     },
//     [todoList]
//   );

//   // // 9. 최종 적용
//   // const onAdopt = async () => {
//   //   adoptRecentTodo(todoList);
//   //   // 서버에 POST
//   //   // const res = await axios.post("http://54.180.79.137:8000/main2", {
//   //   //   userId: todoList.userId,
//   //   // });
//   // };

//   // 10. 컴포넌트 렌더링
//   return (
//     <>
//       {/* 일정입력 컴포넌트 */}
//       <NewTodo onInsert={onInsert} />
//       <section className="container-list">
//         <div className="todo">
//           <List
//             todoList={todoList}
//             onRemove={onRemove}
//             onToggleOfImportant={onToggleOfImportant}
//             onToggleOfComplete={onToggleOfComplete}
//             onToggleOfEdit={onToggleOfEdit}
//           />
//         </div>
//       </section>
//       <Route
//         render={() => (isEdit ? <EditTodo editContent={editContent} /> : <></>)}
//       />
//       <Button>정보반영</Button>
//     </>
//   );
// };
// // 컴포넌트의 props가 바뀌지 않았다면 re-rendering 방지(= shouldComponentUpdate와 동일)
// export default Todo;
