import React from "react";
import Avatar from "./Avatar";

const ProfileHeader = ({src, displayName, followers, following, posts, bio, link, onClick}) => {
    return (
        <div className="dark:bg-black">
        <div className="p-4 dark:bg-black flex items-center justify-center space-x-2">
            <Avatar imageUrl={src} onClick={() => onClick(src)}
                className="w-24 h-24"/> 
            <div className="flex flex-col items-center p-6 text-white">
                <p className="text-3xl font-bold">{posts}</p>
                <p className="text-2xl">posts</p>
            </div>

            <div className="flex flex-col items-center p-6 text-white">
                <p className="text-3xl font-bold">{followers}</p>
                <p className="text-2xl">followers</p>
            </div>
            <div className="flex flex-col items-center p-6 text-white">
                <p className="text-3xl font-bold">{following}</p>
                <p className="text-2xl">following</p>
            </div>
        </div>
        <p className="px-4 text-2xl text-white font-bold">{displayName}</p>
        <p className="px-4 text-xl text-white">{bio}</p>
        <p className="px-4 text-xl text-blue-500 hover:text-blue-700 underline cursor-pointer transition-colors duration-200">{link}</p>
        <div className="border-t mt-5"></div>
        </div>
    );
};

export default ProfileHeader;
