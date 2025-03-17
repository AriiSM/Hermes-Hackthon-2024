import React, {useContext, useEffect, useState} from "react";
import ProfileGame from "./ProfileGame";
import {ProfileContext} from "./ProfilesProvider";
import Modal from "./Modal";
import LoadingScreen from "../Loading Screen/LoadingScreen";

const LevelLoader = ({}) => {
    const {profiles, fetchProfiles } = useContext(ProfileContext);
    
    const textPerLevel= [`Look for: Suspicious Links, Fake Photos, Exaggerated Claims`,
         `Look for: Incomplete Info, Limited Activity, Suspicious Links, Fake Photos, Exaggerated Claims, Requests for Money `]

    const [currentProfile, setCurrentProfile] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [textForLevel, setTextForLevel] = useState(textPerLevel[0]);
    const [showText, setShowText] = useState(false);

    const nextLevelHandler = (raspunsUser) => {
        setIsCorrect(profiles[currentProfile].real === raspunsUser.toString())
        setIsModalOpen(true)
        setCurrentProfile((prevProfile) => prevProfile + 1);
    };

    const onClose = () => {
        setIsModalOpen(false)
        if(currentProfile === 3) //level 2
        {
            setShowText(false);
            setTextForLevel(textPerLevel[1]);
            setTimeout(() => setIsVisible(true), 1500);
        }
    }

    

    // Add the dark class to the HTML element on component mount
    React.useEffect(() => {
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgiLCJpYXQiOjE3MzE3ODcwODgsImV4cCI6MTczMjAwMzA4OH0.fl3XLNrhjh_MKVLtDX4fjBqXf4Y41Kx_ZDOIuG0I_cM";
        fetchProfiles();
        console.log(profiles);
        document.documentElement.classList.add("dark");
    }, [fetchProfiles]);


    // Log profiles to verify successful fetching
    useEffect(() => {
        if (profiles.length > 0) {
            console.log('Profiles fetched successfully:', profiles);
        } else {
            console.log('No profiles fetched yet.');
        }
    }, [profiles]);


    useEffect(() => {
        setTimeout(() => setIsVisible(true), 1000);
    }, []);

    return (
        <>
        <Modal isOpen={isModalOpen} onClose={onClose} isCorrect={isCorrect}/>
        <ProfileGame profile={profiles[isModalOpen? currentProfile-1 : currentProfile]} nextLevelHandler={nextLevelHandler} 
                level={currentProfile} text={textForLevel} showText={showText}/>
        <LoadingScreen 
            isVisible={isVisible}
            onClose={() => {
                setIsVisible(false);
                setShowText(true);
            }}
            imageType="handler"
            textType={currentProfile<3 ? 3 : 4}
        />
        </>
    );
};

export default LevelLoader;
