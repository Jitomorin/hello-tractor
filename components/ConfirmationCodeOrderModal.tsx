import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  user,
} from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";
import { hasDatePassed } from "@/utils/formatString";
import {
  addDataWithDocName,
  AddMessageToChat,
  checkIfChatExists,
  updateOrderInformation,
} from "@/utils/firebase/firestore";

export default function ConfirmationCodeOrderModal({
  user,
  code,
  order,
  callFunction,
  callSnackbar,
}: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [confirmationCode, setConfirmationCode] = useState(code);
  console.log("initial code", confirmationCode);
  return (
    <>
      <Button
        onPress={async () => {
          await callFunction()
            .then((code: string) => {
              setConfirmationCode(code);
              console.log("inside the modeal code:", code);
            })
            .then((result: any) => {
              onOpen();
            })
            .catch((err: any) => {
              console.log(err);
            });
        }}
        className="bg-primary rounded-lg font-semibold hover:scale-[1.03] transition-all ease-in-out text-white p-2"
        variant="solid"
      >
        Confirm delivery
      </Button>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirmation code
              </ModalHeader>
              <ModalBody>
                <p>Share this confirmation code with the seller.</p>
                <h1 className="text-4xl">{confirmationCode}</h1>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    checkIfChatExists(order.listing.userID, order.userID).then(
                      (result: any) => {
                        if (result.length !== 0) {
                          // chat has already been made so send the message
                          AddMessageToChat(result[0].uid, {
                            message: `Here is my confirmation code: ${confirmationCode}`,
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
                            users: [order.userID, order.listing.userID],
                            uid,
                          }).then(() => {
                            updateOrderInformation(order.uid, {
                              confirmed: true,
                            }).then(() => {
                              // send message
                              AddMessageToChat(uid, {
                                message: `Here is my confirmation code: ${confirmationCode}`,
                                seen: false,
                                sender: user.uid,
                                timestamp: new Date(),
                              }).then((res) => {
                                callSnackbar("Message sent");
                              });
                            });
                          });
                        }
                      }
                    );
                  }}
                >
                  Send code
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
