import React, { useEffect, useState } from "react";
import logo from "../src/assets/img/logo.png";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/career");
    }
    AOS.init({
      once: true,
      duration: 600,
      easing: "ease-out",
    });
  }, [navigate]);

  const login = () => {
    axios
      .post("http://localhost:3000/admin/login", {name:username, password })
      .then((res) => {
        if (res.status === 200) {
          navigate("/career");
          localStorage.setItem("token", res?.data?.token);
        }
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <>
      <header id="header" className="d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-between">
          <a href="index.php" className="">
            <img src={logo} width="125px" height="70px" alt="Logo" />
          </a>
          <nav id="navbar" className="navbar">
            <ul></ul>
          </nav>
        </div>
      </header>
      <main id="main" className="p-5" data-aos="fade-up">
        <div className="login-wrap">
          <div className="login-html">
            <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked />
            <label htmlFor="tab-1" className="tab">
              Sign In
            </label>
            <div className="login-form">
              <div className="sign-in-htm">
                <form action="" method="post" id="login">
                  <div className="group">
                    <label htmlFor="username" className="label">
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(event) => {
                        event.preventDefault();
                        setUsername(event.target.value);
                      }}
                      id="username"
                      className="form-control input"
                      placeholder="Username"
                      required={true}
                      name="username"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="password" className="label">
                      Password
                    </label>
                    <input
                      value={password}
                      onChange={(event) => {
                        event.preventDefault();
                        setPassword(event.target.value);
                      }}
                      type="password"
                      className="form-control input"
                      id="password"
                      placeholder="Password"
                      name="password"
                      required={true}
                    />
                  </div>
                  
                  {err && (
                    <p
                      style={{
                        padding: "5px",
                        borderRadius: "8px",
                        backgroundColor: "white",
                        textAlign: "center",
                      }}
                    >
                      {"Email or password is invalid!"}
                    </p>
                  )}
                  <div className="group" style={{
                    paddingTop:50,
                  }}>
                    <button
                      name="login"
                      onClick={(event) => {
                        event.preventDefault();
                        login();
                      }}
                      className="btn btn-primary btn-block button"
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="hr"></div>
                  {/* <div className="foot-lnk">
                    <a href="">Forgot Password?</a>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
