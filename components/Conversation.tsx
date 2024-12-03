import React from "react";
import ConversationItem from "./ConversationItem";
import { getLatestElement, getTimeSince, getUser } from "@/utils/formatString";
const Conversation = ({ chats, users, router, currentUser, pathName }: any) => {
  return (
    <div className="p-1">
      {chats.map((chat: any, index: number) => {
        const recieverUID = chat.users.find(
          (user: any) => user !== currentUser.uid
        );
        console.log(recieverUID);
        const reciever =
          getUser(recieverUID, users) && getUser(recieverUID, users);

        if (!reciever) return null;

        return (
          <ConversationItem
            // uid={chat.uid}
            role={reciever.role}
            isVerified={reciever.isVerified}
            isAdmin={reciever.role === "admin"}
            message={
              chat.chat.length > 0 ? getLatestElement(chat.chat).message : ""
            }
            time={
              chat.chat.length > 0
                ? getTimeSince(getLatestElement(chat.chat).timestamp)
                : ""
            }
            name={reciever.fullName}
            pressFunction={() => {
              // setSelectedChat(chat);
              router.push(`/dashboard/chats/${chat.uid}`);
            }}
            active={pathName === chat.uid}
            profileURL={reciever.profileUrl}
          />
        );
      })}
    </div>
  );
};

export default Conversation;
