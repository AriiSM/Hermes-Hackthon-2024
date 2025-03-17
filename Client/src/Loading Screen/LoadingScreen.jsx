import React, { useState, useEffect, useRef } from "react";
import "./LoadingScreenStyles.css";
import logo from "../Assets/ascii_logo.png";
import handler from "../Assets/handler ascii.png";
import buttons from "../Assets/Windows 95 Buttons.png";

const LoadingScreen = ({ isVisible, onClose, imageType, textType }) => {

    const [autoText, setAutoText] = useState([""]);

    useEffect(() => {

        if(textType === 1) {
            setAutoText([
                "[INFO] Establishing connection to remote server.......",
                "[INFO] IP Address located: 192.168.1.101",
                "[WARNING] Firewall detected, attempting bypass...",
                "[INFO] Injecting SQL payload...",
                "[SUCCESS] Exploit successful. Access granted.",
                "[INFO] Downloading data packets...",
                "[INFO] Shutting down program..."
            ])
        }else if(textType === 2) {
            setAutoText([
                "[INFO] Attempting to establish connection to remote server...",
                "[WARNING] Firewall detected. Initiating bypass protocol...",
                "[INFO] Connection timed out. Retrying...",
                "[INFO] Connection re-established. Proceeding with authentication...",
                "[ERROR] Authentication failed. Invalid credentials.",
                "[WARNING] System rejecting access attempt...",
                "[WARNING] Unauthorized access attempt blocked.",
                "[CRITICAL] Access Denied. Immediate action required.",
                "[INFO] SYSTEM FAILURE: Critical error encountered during connection process.",
                "[CRITICAL] File system integrity check failed. Potential data corruption detected.",
                "[CRITICAL] Remote host unresponsive. Request cannot be completed.",
                "[CRITICAL] Connection lost. Data transmission interrupted.",
                "[CRITICAL] Network services unavailable. System failure imminent.",
                "[WARNING] System shutting down. Attempting emergency restart...",
                "[WARNING] Emergency restart failed. System unable to recover.",
                "[CRITICAL] Shutdown initiated by remote host. Access terminated."
            ]);

        }
        else if(textType === 3) {
            setAutoText([
                "[INFO] Remote host trying to connect...",
                "[WARNING] Firewall detected, attempting bypass...",
                "[INFO] IP Address located: 192.168.1.101",
                "[SUCCESS] Exploit successful. Access granted.",
                "[WARNING] Be cautious when encountering online profiles.",
                "[WARNING] Look for these signs of fake or malicious profiles:",
                "[INFO] Incomplete or generic profile information.",
                "[INFO] No or minimal posts, comments, or activity.",
                "[INFO] Profile created recently, with limited interaction history.",
                "[INFO] Unusual or suspicious links, especially ones that ask for personal details.",
                "[INFO] Inconsistent or fake photos (e.g., stock images or reverse-search results).",
                "[INFO] Overly perfect or exaggerated personal details or accomplishments.",
                "[INFO] Requests for money or sensitive information, such as passwords.",
                "[INFO] Profiles that try to steer conversations towards irrelevant topics or scams.",
                "[INFO] Always verify the legitimacy of the profile through trusted sources."
            ])
        }
        else if(textType === 4) {
            setAutoText([
                "[INFO] Remote host trying to connect...",
                "[WARNING] Firewall detected, attempting bypass...",
                "[INFO] IP Address located: 192.168.1.101",
                "[SUCCESS] Good job. Now onto the next level!",
                "[WARNING] It's going to get more difficult now!",
                "[INFO] Do not forget to look at the interactions of the accounts."
            ])
        }
        else if(textType === 5) {
            setAutoText([
                "[INFO] Remote host trying to connect...",
                "[WARNING] Firewall detected, attempting bypass...",
                "[INFO] IP Address located: 192.168.1.101",
                "[SUCCESS] Exploit successful. Access granted.",
                "[WARNING] Be cautious when dealing with suspicious emails or messages!",
                "[WARNING] Look for these common red flags in malicious messages:",
                "[INFO] Unusual sender addresses or spoofed domains.",
                "[INFO] Urgent or threatening language, asking for immediate action.",
                "[INFO] Unexpected attachments or suspicious links (especially file extensions like .exe, .zip, .bat).",
                "[INFO] Requests for sensitive information, such as passwords or personal details.",
                "[INFO] Spelling, grammar errors, or unprofessional formatting.",
                "[INFO] Too-good-to-be-true offers, such as lottery wins or investment opportunities.",
                "[INFO] Always verify through official channels if you\'re unsure about the legitimacy of a message.",
                "[INFO] Ensure your email filters and antivirus software are always up to date."
            ])
        }
        else if(textType === 6) {
            setAutoText([
                "[INFO] Remote host trying to connect...",
                "[WARNING] Firewall detected, attempting bypass...",
                "[INFO] IP Address located: 192.168.1.101",
                "[SUCCESS] Good job. Now onto the next level!",
                "[WARNING] It's going to get more difficult now!",
            ])
        }
        else if(textType === 7) {
            setAutoText([
                "[INFO] Establishing connection to remote server.......",
                "[INFO] IP Address located: 192.168.1.101",
                "[WARNING] Firewall detected, attempting bypass...",
                "[INFO] Injecting SQL payload...",
                "[SUCCESS] Exploit successful. Access granted.",
                "[INFO] Downloading data packets...",
                "[INFO] Shutting down program..."
            ]);

        }
        else if(textType === 10) {
            setAutoText([
                "[WARNING] Remote connection received. Host is attempting access...",
                "[INFO] Connection handshake initiated. Please wait...",
                "[SUCCESS] Host successfully connected to the server.",
                "[INFO] Welcome! You’ve made it this far, which is impressive.",
                "[INFO] Let's see how well you handle this next phase...",
                "[INFO] Preparing a new challenge. Hold tight...",
                "[INFO] Hint: The key lies within the pattern, but you’ll need sharp eyes.",
                "[WARNING] Unauthorized activity detected. Verifying credentials...",
                "[INFO] Credential verification successful. Proceeding with caution...",
                "[INFO] Well done! You navigated that beautifully.",
                "[INFO] Now, let's raise the difficulty. Think creatively.",
                "[INFO] Generating advanced test scenario...",
                "[INFO] Remember: The solution may not be as obvious as it seems.",
                "[SUCCESS] Excellent work! You've completed another milestone.",
                "[INFO] Preparing to disconnect. Stay ready for future challenges...",
                "[INFO] System shutting down. See you next time!"
            ]);
        }
    },  [textType]);

    const delayRef = useRef(2000)
    const [commands, setCommands] = useState([""]);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isExpanding, setIsExpanding] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const initialTimeout = useRef   (false);

    const consoleOutputRef = useRef(null); // Ref for console output

    useEffect(() => {
        if (isVisible) {
            setIsExpanding(true);
        } else {
            setIsExpanding(false);
            setIsClosing(true);
        }

        if (isVisible && currentTextIndex < autoText.length) {
            if (currentCharIndex < autoText[currentTextIndex].length) {
                // Add characters one by one
                const timer = setTimeout(() => {
                    setCommands((prev) => {
                        const lastCommand = prev[prev.length - 1] || "$ ";
                        const newCommand = `${lastCommand}${autoText[currentTextIndex][currentCharIndex]}`;
                        return [...prev.slice(0, -1), newCommand];
                    });
                    setCurrentCharIndex((prev) => prev + 1);
                    delayRef.current = 20;
                }, delayRef.current);

                return () => clearTimeout(timer);
            } else {
                // Move to the next line after finishing a command
                setCommands((prev) => [...prev, "$ "]); // Add a new empty command
                setCurrentTextIndex((prev) => prev + 1);
                setCurrentCharIndex(0);
            }
        }

        if (currentTextIndex === autoText.length && imageType !== "handler") {
            setTimeout(() => {
                setIsExpanding(false);
                setIsClosing(true);
                setTimeout(() => {
                    onClose();
                }, 600);
            }, 1000);
        }

        if (!isVisible) {
            setCommands([""]); // Reset commands on close
            setCurrentTextIndex(0);
            setCurrentCharIndex(0);
        }
    }, [isVisible, currentTextIndex, currentCharIndex, autoText, delayRef, isClosing, onClose]);



    useEffect(() => {
        if (consoleOutputRef.current) {
            consoleOutputRef.current.scrollTop = consoleOutputRef.current.scrollHeight;
        }
    }, [commands]); // Scroll to bottom when commands change

    return isVisible ? (
        <div className={`modal-overlay ${isClosing ? "close" : ""}`} onClick={onClose}>
            <div className={`modal-container ${isExpanding ? "expand" : ""}`}>
                <div className="modal-header">
                    {imageType === "logo" && (
                    "C:\\Windows\\system32\\attack.exe"
                    )}
                    {imageType === "handler" && (
                        "C:\\Windows\\system32\\handler.exe"
                    )}
                    <img src={buttons} alt={"buttons"}/>
                </div>
                <div className="console-output" ref={consoleOutputRef}>
                    <br/>
                    {imageType === "logo" && (
                        <img src={logo} alt={"logo"} className={"image"}/>
                    )}
                    {imageType === "handler" && (
                        <img src={handler} alt={"handler"} className={"image"}/>
                    )}
                    <br/>
                    {initialTimeout && (
                        commands.map((cmd, index) => (
                        <p key={index}>{cmd}</p>
                    ))
                        )}
                </div>
            </div>
        </div>
    ) : null;
};

export default LoadingScreen;
