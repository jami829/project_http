import React from "react";
import { Route, Link, Switch } from "react-router-dom";

// components
import Welcome from "./user/Welcome";
import SignOut from "./user/SignOut";
import Important from "./todo/Important";
import Complete from "./todo/Complete";

// CSS
import "./Nav.scss";

const NavLinkStyle = {
  textDecoration: `none`,
  color: `white`,
};

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("nav 프롭", this.props)
    return (
      <ul className="nav">
        <div className="nav-welcome">
          <Welcome name={this.props.loginUserInfo.name} /> {/* welcome 컴포넌트로 전달  */}

          <SignOut
            logOut={this.props.resetLogin}
            loginStatus={
              this.props.loginUserInfo.isLogin   /* signOut 컴포넌트로 전달 */
            }
          />
        </div>

        <li className="nav-todo">
          <Link to={{
            pathname: "/",
            todos: this.props.loginUserInfo.todos
          }} style={NavLinkStyle}>
            홈
        </Link>
        </li>
        <li className="nav-mypage">
          <Link to={{
            pathname: "/mypage",
            logOut: this.props.resetLogin
          }}
            style={NavLinkStyle}>
            마이페이지
          </Link>
        </li>
        <li className="nav-completed">
          <Link to={"/completed"} style={NavLinkStyle}>
            완료일정
        </Link>
        </li>
        <li className="nav-important">
          <Link to={"/important"} style={NavLinkStyle}>
            중요일정
        </Link>
        </li>
        <Switch>
          <Route
            path={"/important"}
            render={() => {
              window.sessionStorage.getItem("id")
                ? (
                  <Important todos={this.props.loginUserInfo.todos} />
                ) : (
                  <Important />
                );
            }}
          />
          <Route
            path={"/completed"}
            render={() => {
              window.sessionStorage.getItem("id") ? (
                <Complete todos={this.props.loginUserInfo.todos} />
              ) : (
                  <Complete />
                );
            }}
          />
        </Switch>
      </ul>
    );
  }
}
export default Nav;
