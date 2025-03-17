import React, {useContext, useEffect, useState} from "react";
import Sidebar from "./Sidebar";
import FileGallery from "./FileGallery";
import ProfileHeader from "./ProfileHeader";
import FileViewer from "./FileViewer";
import Header from './Header';
import {ProfileContext} from "./ProfilesProvider";

const Game = ({mail, nextLevelHandler, level, text, showText}) => {
    const [selectedFile, setSelectedFile] = useState(null);

    console.log(selectedFile)
    return (
        <>
        { mail &&
            <div className="flex h-screen">
            <div className="dark:bg-secondaryBlack inset-0 flex w-[30%] flex-col items-center justify-center bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
                <Sidebar level={level} text={text} showText={showText} isProfile={false} />
            </div>

            <div className="scrollbar w-[35%] overflow-y-auto">
                <div className="sticky top-0 bg-transparent z-10">
                <Header textFake={"Spam"} textReal={"Inbox"} name={mail.sender} nextLevelHandler={(raspunsUser) => { setSelectedFile(null); nextLevelHandler(raspunsUser); }} />
                </div>

                <div className="dark:bg-black text-white h-full p-4">
                <p className="text-2xl"> {mail.text} </p>
                </div>
                
                <div className="sticky bottom-0 bg-transparent z-10">
                <FileGallery files={mail.attachments} onFileClick={setSelectedFile} />
                </div>
            </div>

            <div className="w-[35%] dark:bg-black h-screen" >
                <FileViewer file={selectedFile} onClose={() => setSelectedFile(null)} />
            </div>
        </div>
        }
        </>
    );
};

export default Game;
