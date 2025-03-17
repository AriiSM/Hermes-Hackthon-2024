import React, {useContext, useEffect, useState} from "react";
import MailGame from "./MailGame";
import {MailContext} from "./MailsProvider";
import Modal from "./Modal";
import LoadingScreen from "../Loading Screen/LoadingScreen";

const MailLevelLoader = ({}) => {
    const { mails, fetchMails } = useContext(MailContext);
    
    const textPerLevel= [`Look for:
Poor Grammar, Unrealistic offers or prizes.
`, `Look for:
Suspicious Sender, Unexpected Attachments/Links, Sensitive Info Requests, Poor Grammar, Unrealistic offers or prizes.
`]

    const [currentMail, setCurrentMail] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [textForLevel, setTextForLevel] = useState(textPerLevel[0]);
    const [showText, setShowText] = useState(false);

    const nextLevelHandler = (raspunsUser) => {
        setIsCorrect(mails[currentMail].real === raspunsUser.toString())
        setIsModalOpen(true)
        setCurrentMail((prevMail) => prevMail + 1);
    };

    const onClose = () => {
        setIsModalOpen(false)
        if(currentMail === 3) //level 2
        {
            setShowText(false);
            setTextForLevel(textPerLevel[1]);
            setTimeout(() => setIsVisible(true), 1500);
        }
    }

    // Add the dark class to the HTML element on component mount
    React.useEffect(() => {
        fetchMails();
        console.log(mails);
        document.documentElement.classList.add("dark");
    }, [fetchMails]);


    // Log profiles to verify successful fetching
    useEffect(() => {
        if (mails.length > 0) {
            console.log('Mails fetched successfully:', mails);
        } else {
            console.log('No profiles fetched yet.');
        }
    }, [mails]);


    useEffect(() => {
        setTimeout(() => setIsVisible(true), 1000);
    }, []);

    return (
        <>
        <Modal isOpen={isModalOpen} onClose={onClose} isCorrect={isCorrect}/>
        <MailGame mail={mails[isModalOpen? currentMail-1 : currentMail]} nextLevelHandler={nextLevelHandler} 
                level={currentMail} text={textForLevel} showText={showText}/>
        <LoadingScreen 
            isVisible={isVisible}
            onClose={() => {
                setIsVisible(false);
                setShowText(true);
            }}
            imageType="handler"
            textType={currentMail<3 ? 5 : 6}
        />
        </>
    );
};

export default MailLevelLoader;
