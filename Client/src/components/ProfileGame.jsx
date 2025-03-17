import React, {useContext, useEffect, useState} from "react";
import Sidebar from "./Sidebar";
import Gallery from "./Gallery";
import ProfileHeader from "./ProfileHeader";
import ImageViewer from "./ImageViewer";
import Header from './Header';
import {ProfileContext} from "./ProfilesProvider";

const Game = ({profile, nextLevelHandler, level, text, showText}) => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <>
        { profile &&
            <div className="flex h-screen">
            <div className="dark:bg-secondaryBlack inset-0 flex w-[30%] flex-col items-center justify-center bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
                <Sidebar level={level} text={text} showText={showText} isProfile={true} />
            </div>

            <div className="scrollbar w-[35%] overflow-y-auto">
                <div className="sticky top-0 bg-transparent z-10">
                <Header textFake={"Deny"} textReal={"Accept"} name={profile.name} nextLevelHandler={(raspunsUser) => { setSelectedImage(null); nextLevelHandler(raspunsUser); }} />
                </div>

                <ProfileHeader src={profile.profilePicture} link={profile.link} 
                    posts={profile.posts.length} followers={profile.followers} following={profile.following} 
                    displayName={profile.displayName} bio={profile.bio} onClick={setSelectedImage}/>
                
                <Gallery images={profile.posts} onImageClick={setSelectedImage} />
            </div>

            <div className="w-[35%] dark:bg-black h-screen" >
                <ImageViewer image={selectedImage} onClose={() => setSelectedImage(null)} />
            </div>
        </div>
        }
        </>
    );
};

export default Game;
