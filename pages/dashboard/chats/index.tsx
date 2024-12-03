import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DeliveriesTable from "@/components/BookingsTable";
import React, { useEffect, useMemo, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { getAllData, getFilteredData } from "@/utils/firebase/firestore";
import BookingsTable from "@/components/BookingsTable";
import Conversation from "@/components/Conversation";
import Messages from "@/components/Messages";
import { useRouter } from "next/router";
import { isEmpty } from "@/utils/formatString";

function Chats() {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedChat, setSelectedChat] = useState({});
  const [dataLoading, setDataLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);
  const { user, loading }: any = useAuthContext();
  const router = useRouter();

  // const usersData = useMemo(() => fetchUsersData(), [users]);
  // const chatsData = useMemo(() => fetchChatData(), [chats]);

  useEffect(() => {
    const fetchChatData = async () => {
      setDataLoading(true);
      await getFilteredData("chats", "users", "array-contains", user.uid).then(
        (chatsRes: any) => {
          // sort by date in field called delivery_timestamp
          chatsRes.sort((a: any, b: any) => {
            return b.createdAt - a.createdAt;
          });
          setChats(chatsRes);
          setDataLoading(false);
          console.log("data chats:", chatsRes);
          return chatsRes;
        }
      );
    };
    const fetchUsersData = async () => {
      setUsersLoading(true);
      await getAllData("users").then((usersRes: any) => {
        setUsers(usersRes);
        setUsersLoading(false);
        console.log("data user:", usersRes);
        return usersRes;
      });
    };
    if (loading) return;
    if (!user) router.push("/login");
    else {
      fetchChatData();
      fetchUsersData();
    }
  }, [user]);

  return (
    <DefaultLayout>
      <div className="mx-auto min-h-screen">
        <Breadcrumb pageName="Chats" />
        <div className="w-full h-full min-h-screen ">
          <div className="flex space-x-4">
            <div className="w-96 h-screen dark:bg-gray-800 bg-white shadow-lg rounded-lg p-2 hidden md:block">
              <div className="h-full overflow-y-auto">
                <div className="text-lg font-semibold text-black p-3">
                  Recent
                </div>
                {!dataLoading && !usersLoading ? (
                  <Conversation
                    router={router}
                    chats={chats}
                    users={users}
                    loading={dataLoading}
                    selectedChat={selectedChat}
                    setSelectedChat={setSelectedChat}
                    currentUser={user}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="flex-grow  h-screen p-2 rounded-md">
              {/* {!dataLoading && !usersLoading ? (
                <>
                  {!isEmpty(selectedChat) && (
                    <Messages
                      setSelectedChat={setSelectedChat}
                      selectedChat={selectedChat}
                      users={users}
                      loading={dataLoading}
                      currentUser={user}
                    />
                  )}
                </>
              ) : (
                <></>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Chats;
