import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./LoginPage/Login";
import MainScreen from './Main screen/MainScreen.js';
import ProfilesLevelLoader from "./components/ProfilesLevelLoader.jsx";
import { ProfilesProvider } from "./components/ProfilesProvider.jsx";
import MailsLevelLoader from "./components/MailsLevelLoader.jsx";
import { MailsProvider } from "./components/MailsProvider.jsx";
import { UserProvider } from "./auth/UserProvider.jsx";

function App() {
    return (
        <UserProvider>
            <ProfilesProvider>
            <MailsProvider>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/main" element={<MainScreen />} />
                    <Route exact path="/profiles" element={
                            <ProfilesLevelLoader />
                    } />
                    <Route exact path="/messages" element={
                            <MailsLevelLoader />
                    } />
                </Routes>
                <audio src="/soundtrack.mp3" autoPlay loop />
            </Router>
            </MailsProvider>
            </ProfilesProvider>
        </UserProvider>
    );
}

export default App;