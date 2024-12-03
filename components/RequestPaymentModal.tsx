import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
} from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";
import {
  addDataWithDocName,
  AddMessageToChat,
  checkIfChatExists,
} from "@/utils/firebase/firestore";
import { formatNumber } from "@/utils/formatNumber";

export default function RequestPaymentModal({
  callSnackbar,
  admins,
  availableAmount,
  user,
}: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [amount, setAmount] = useState(1000);
  const [selectedAdmin, setSelectedAdmin] = useState(admins[0]);

  const handleChange = (event: any) => {
    const inputValue = event.target.value;

    setAmount(inputValue);
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="rounded-lg bg-primary text-white font-semibold hover:scale-[1.03] transition-all ease-in-out text-xl"
      >
        Request Payment
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Request Payment
              </ModalHeader>
              <ModalBody>
                <h1>
                  Would you like to send a payment request to the admin? (note
                  admin will get back to you in 24 hours)
                </h1>
                <div className="flex flex-col space-y-4">
                  <h1>Choose which admin to request from:</h1>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button className="rounded-lg bg-white flex justify-start">
                        <div
                          className={"flex items-center py-2  cursor-pointer  "}
                        >
                          <div className="w-7 h-7 m-1">
                            <img
                              className="rounded-full"
                              src={
                                selectedAdmin.profileUrl === ""
                                  ? "/images/profile.png"
                                  : selectedAdmin.profileUrl
                              }
                              alt="avatar"
                            />
                          </div>
                          <div className="flex-grow p-2">
                            <div className="flex justify-between text-md ">
                              <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                {selectedAdmin.fullName}
                              </div>
                            </div>

                            {/* <div className="text-sm text-gray-500 dark:text-gray-400  w-40 truncate">
                                {message}
                              </div> */}
                          </div>
                        </div>
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      {admins.map((admin: any, index: number) => (
                        <DropdownItem key={index}>
                          <div
                            className={"flex items-center p-2  cursor-pointer"}
                          >
                            <div className="w-7 h-7 m-1">
                              <img
                                className="rounded-full"
                                src={
                                  admin.profileUrl === ""
                                    ? "/images/profile.png"
                                    : admin.profileUrl
                                }
                                alt="avatar"
                              />
                            </div>
                            <div className="flex-grow p-2">
                              <div className="flex justify-between text-md ">
                                <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                  {admin.fullName}
                                </div>
                              </div>

                              {/* <div className="text-sm text-gray-500 dark:text-gray-400  w-40 truncate">
                                {message}
                              </div> */}
                            </div>
                          </div>
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                  <h1>{`Select the amount you want to withdraw (minimum of 1000):`}</h1>
                  <h1 className="font-semibold">{`Your available balance is: ${formatNumber(
                    availableAmount
                  )}Ksh`}</h1>
                  <input
                    type="number"
                    max={availableAmount}
                    min={1000}
                    className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    value={amount}
                    onChange={handleChange}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    if (amount > 1000 && amount <= availableAmount) {
                      checkIfChatExists(user.uid, selectedAdmin.uid).then(
                        (result: any) => {
                          if (result.length !== 0) {
                            // chat has already been made so send the message
                            AddMessageToChat(result[0].uid, {
                              message: `I am requesting a withdrawal of ${amount}Ksh`,
                              seen: false,
                              sender: user.uid,
                              timestamp: new Date(),
                            }).then((res) => {
                              callSnackbar("Message sent");
                            });
                          } else {
                            // make chat if it doesnt exist
                            const uid = uuidv4();
                            addDataWithDocName("chats", uid, {
                              chat: [],
                              createdAt: new Date(),
                              updatedLast: new Date(),
                              userID: user.uid,
                              users: [selectedAdmin.uid, user.uid],
                              uid,
                            }).then(() => {
                              // send message
                              AddMessageToChat(uid, {
                                message: `I am requesting a withdrawal of ${amount}Ksh`,
                                seen: false,
                                sender: user.uid,
                                timestamp: new Date(),
                              }).then((res) => {
                                callSnackbar("Message sent");
                              });
                            });
                          }
                        }
                      );
                    } else {
                      callSnackbar(
                        "The amount entered does not fall within range"
                      );
                    }
                  }}
                >
                  Send request
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
