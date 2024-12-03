import { BadgeCheckIcon } from "lucide-react";
import React from "react";

const ConversationItem = ({
  active,
  role,
  pressFunction,
  time,
  name,
  message,
  profileURL,
  isVerified,
  isAdmin,
}: any) => {
  const _class = active ? "bg-gray-100" : "bg-white";
  return (
    <div>
      <div
        onClick={() => {
          pressFunction();
        }}
        className={`conversation-item p-1  hover:bg-gray-150 m-1 rounded-md ${_class} hover:bg-gray-100 transition-all ease-in-out`}
      >
        <div className={"flex items-center p-2  cursor-pointer  "}>
          <div className="w-16 h-16 mr-1">
            <img
              className="rounded-full w-full h-full"
              src={profileURL === "" ? "/images/profile.png" : profileURL}
              alt="avatar"
            />
          </div>
          <div className="flex-grow p-2">
            {isAdmin && (
              <div className="text-xs font-semibold underline text-red-600">
                Admin
              </div>
            )}
            {role === "client" && (
              <div className="text-xs font-semibold underline text-primary">
                Client
              </div>
            )}
            {role === "seller" && (
              <div className="text-xs font-semibold underline text-yellow-500">
                Seller
              </div>
            )}
            <div className="flex justify-between text-md ">
              <div className=" flex space-x-2 text-xl font-medium text-gray-700 dark:text-gray-200">
                {name}
                {isVerified && (
                  <BadgeCheckIcon className="text-primary size-5" />
                )}
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-300">
                {time ? time : "New"}
              </div>
            </div>
            <div className="text-lg text-gray-500 dark:text-gray-400  w-40 truncate">
              {message}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
