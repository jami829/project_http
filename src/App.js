import React from "react";
import "./App.css";
import axios from "axios";

// Child Componets
import SignInModal from "./SignIn";
import Nav from "./Nav";
import Footer from "./Footer";
import { withRouter, Route } from "react-router-dom";
// import { render } from "node-sass";

//  ToDo Cmponents
import Todo from "./todo/Todo";
import Important from "./todo/Important";
import Complete from "./todo/Complete";

// User Components
import FindAccount from "./user/Find_account";
// import SignOut from "./user/SingOut";
import SignUpModal from "./user/SignUpModal";
import CompletedFindEmail from "./user/CompletedFindEmail";
import CompletedFindPw from "./user/CompletedFindPw";
import MyPage from "./user/MyPage";
import Edit from "./user/Edit";
import Remove from "./user/Remove";
import RemoveUserCompleted from "./user/RemoveUserCompleted";

//! 지우기
import Temp from "./user/temp";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      userId: "",
      email: "",
      password: "",
      name: "",
      mobile: "",
      errorMessage: "",
      todos: [],
    };
  }

  // 세션 저장소에 저장된 id를 불러와 req하자.
  handleResponseSuccess = () => {
    axios
      .post("http://54.180.79.137:8000/getMain", {
        id: window.sessionStorage.getItem("id"),
      })
      .then((res) => {
        console.log("메인2 성공", res.data);
        this.setState({ todos: res.data });
      })
      .catch((error) => {
        console.log("메인2 에러", error.response.data);
      });
    this.setState({
      isLogin: true,
      email: window.sessionStorage.getItem("email"),
      userId: window.sessionStorage.getItem("id"),
      name: window.sessionStorage.getItem("name"),
    });
  };
  //--------------------------로그아웃
  // 서버연동시 아래 코드 주석 해제하기
  handleSignOut = () => {
    /*axios({
      method: "POST",
      url: "http://54.180.79.137:8000/signout",
      headers: {
        "Content-Type": "application/json",
        // accept: "application/json",
        // Cookie: window.sessionStorage.getItem("id"),
        withCreadentials: true,
        credentials: "include"
      }
    }) 
      .then((response) => {
        console.log("사인아웃 리스폰스", response);*/
    this.setState({
      isLogin: false,
      email: "",
      password: "",
      name: "",
      mobile: "",
    });
    if (this.state.isLogin === true) {
      alert("로그아웃에 성공하였습니다.");
    }
    // })
    // .catch((error) => {
    //   console.log(error.response);
    //// else {
    ////  alert(" 못 나 가 ! ");
    //// }

    // });
    this.doSignOut();
  };

  // Edit 컴포넌트의 결과를 끌어올린다.
  adoptModifiedInfo = (data) => {
    if (data.email !== "") this.setState({ email: data.email });
    if (data.password !== "") this.setState({ password: data.password });
    if (data.name !== "") this.setState({ name: data.name });
    if (data.mobile !== "") this.setState({ mobile: data.mobile });
  };
  // ToDo 컴포넌트의 결과를 끌어올린다.
  adoptRecentTodo = (data) => {
    this.setState({ todos: data });
  };

  componentDidMount() {
    const userEmail = window.sessionStorage.getItem("email");
    const userId = window.sessionStorage.getItem("userId");
    if (userEmail) {
      this.handleResponseSuccess();
    } else {
      this.handleSignOut();
    }
    this.adoptRecentTodo;
    console.log("메인2 변경감지", this.state);
  }
  doSignOut = () => {
    window.sessionStorage.clear();
  };

  render() {
    console.log("App state 변경값", this.state);
    console.log("사인 state", this.state);
    console.log("사인인,세션저장소", window.sessionStorage);

    const {
      isLogin,
      userId,
      email,
      name,
      password,
      mobile,
      todos,
    } = this.state;

    return (
      /* ----------------------------------라우트------------------------------------- */
      <withRouter>
        <div className="menu">
          {/* 1. 로그인 성공시 해당 유저의 이름을 메뉴바 상단에 "***님 환영합니다." 라고 표시하기 위해 welcome 컴포넌트까지 건네줄 것
                2. 로그아웃기능을 위해 하위 컴포넌트인 Nav로, 그리고 다시 SignOut 컴포넌트로 내릴 것. */}
          <Nav resetLogin={this.handleSignOut} loginUserInfo={this.state} />
        </div>
        <div className="screen">
          <Route
            path={"/"}
            // path={"/mypage"}
            exact={true}
            render={() =>
              isLogin === true ? ( // 새로고침해도 로그인 상태를 유지시키기 위해 localstorage에 저장된 정보를 사용한다. local storage는 사용자가 지우지 않는 이상 영구적으로 계속 브라우저에 남아있음 (단, session storage는 브라우저가 닫은 겨우 사라지고, 브라우저 내에서 탬을 생성하는 경우에도 별도의 영역으로 할당됨.)
                <Todo
                  userId={userId}
                  todos={todos}
                  adoptRecentTodo={this.adoptRecentTodo}
                />
                // <Temp />
              ) : (
                  <SignInModal
                    handleResponseSuccess={this.handleResponseSuccess.bind(this)}
                  />
                )
            }
          />
          {/* <Route
            path={"/todo"}
            render={() => {
              <Todo userId={userId} todos={todos} />;
            }}
          /> */}
          <Route
            path={"/mypage"}
            render={() =>
              isLogin ? (
                <MyPage
                  id={userId}
                  name={name}
                  email={email}
                  password={password}
                  mobile={mobile}
                  adoptModifiedInfo={this.adoptModifiedInfo}
                  signOut={this.handleSignOut} // mypageg -> remove로 메소드 형식으로 전달될 것임.
                />
              ) : (
                  <MyPage />
                )
            }
          />

          <Route
            path={"/completed"}
            render={() => (isLogin ? <Complete todos={todos} /> : <Complete />)}
          />
          <Route
            path={"/important"}
            render={() =>
              isLogin ? <Important todos={todos} /> : <Important />
            }
          />
          <Route path={"/signup"} component={SignUpModal} />
          <Route path={"/findaccount"} component={FindAccount} />
          <Route path={"/useremail"} component={CompletedFindEmail} />
          <Route path={"/userpw"} component={CompletedFindPw} />
          <Route path={"/edit"} component={Edit} />
          <Route path={"/remove"} component={Remove} />
          <Route
            path={"/remove_user_completed"}
            component={RemoveUserCompleted}
          />
        </div>

        <div className="footer">
          <Footer />
        </div>
      </withRouter>
    );
  }
}

export default withRouter(App);
