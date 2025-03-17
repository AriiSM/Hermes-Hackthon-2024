import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import "./ScreenRight.css";
import gif2 from "../Assets/loginScreen2.gif"
import {UserContext} from "../auth/UserProvider";


function ScreenRight({ onZoom }) {
  const { isAuthenticated, isAuthenticating, login, authenticationError, token } = useContext(UserContext);
  const [attemptingLogin, setAttemptingLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [codeLines, setCodeLines] = useState([]);
  const maxLines = 20;
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate 5 random code lines at once
      const newCodeLines = Array.from({ length: 5 }, () => `0x${Math.floor(Math.random() * 341).toString(16)}`);
      setCodeLines((prevLines) => [...newCodeLines, ...prevLines].slice(0, maxLines));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleStartClick = () => {
    if (onZoom) {
      onZoom();
    }
    setTimeout(() => {
      //TODO! Add login logic here and redirect after credentials are verified

      if (isAuthenticated) {
        console.log('User already authenticated.');
        return;
      }

      setAttemptingLogin(true);

      login(username, password);

      setAttemptingLogin(false);

    }, 1500);
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (token) {
        console.log('Token found, redirecting to /main');
        navigate('/main');
      } else if (isAuthenticated) {
        console.log('User authenticated, redirecting to /main');
        navigate('/main');
      }
    };

    checkAuthStatus();
  }, [token, isAuthenticated]);

  return (
      <div className="app-container1">
      <div className="computer-frame">
        {/*<img src={gif2} alt="loginScreen" className="loginScreen"/>*/}
        <img src={gif2} alt="loginScreen" className="loginScreen"/>
        <div className="overlay">
          <div className="green-box">
            <div className="description">
              <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
              />
              <br/>
              <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="action-button" onClick={handleStartClick}>
              START
            </button>
          </div>
        </div>
      </div>
      </div>

      // <div className="app-container">
      //   <div className="computer-frame">
      //     <div className="computer-frame">
      //       <img src={gif1} alt="loginScreen" className="loginScreen"/>
      //       <div className="green-box">
      //         <div className="description">
      //           <input
      //               type="text"
      //               placeholder="Username"
      //               value={username}
      //               onChange={(e) => setUsername(e.target.value)}
      //           />
      //           <br/>
      //           <input
      //               type="password"
      //               placeholder="Password"
      //               value={password}
      //               onChange={(e) => setPassword(e.target.value)}
      //           />
      //         </div>
      //         <button className="action-button" onClick={handleStartClick}>
      //           START
      //         </button>
      //       </div>
      //     </div>
      //     {/*<div className="screen-content">*/}
      //     {/*  <div className="green-box">*/}
      //     {/*    <div className="description">*/}
      //     {/*      <input*/}
      //     {/*          type="text"*/}
      //     {/*          placeholder="Username"*/}
      //     {/*          value={username}*/}
      //     {/*          onChange={(e) => setUsername(e.target.value)}*/}
      //     {/*      />*/}
      //     {/*      <br/>*/}
      //     {/*      <input*/}
      //     {/*          type="password"*/}
      //     {/*          placeholder="Password"*/}
      //     {/*          value={password}*/}
      //     {/*          onChange={(e) => setPassword(e.target.value)}*/}
      //     {/*      />*/}
      //     {/*    </div>*/}
      //     {/*    <button className="action-button" onClick={handleStartClick}>*/}
      //     {/*      START*/}
      //     {/*    </button>*/}
      //     {/*  </div>*/}
      //     {/*</div>*/}
      //   </div>
      // </div>
  );
}

export default ScreenRight;
