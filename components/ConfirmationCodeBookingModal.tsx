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
} from "@/utils/firebase/firestore";

export default function ConfirmationCodeBookingModal({
  user,
  booking,
  callFunction,
  callSnackbar,
}: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [confirmationCode, setConfirmationCode] = useState("");

  return (
    <>
      <Button
        onPress={async () => {
          if (hasDatePassed(booking.selectedDates.endDate.seconds)) {
            await callFunction()
              .then((code: string) => {
                console.log("coooode", code);
                setConfirmationCode(code);
              })
              .then((result: any) => {
                onOpen();
              })
              .catch((err: any) => {
                console.log(err);
              });
          } else {
            callSnackbar("The date for handover has not yet reached");
          }
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
                <p>
                  Provide the host with this confirmation code in order to
                  confirm handover of the rental.
                </p>
                <h1 className="text-4xl">{confirmationCode}</h1>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    checkIfChatExists(
                      booking.rental.userID,
                      booking.userID
                    ).then((result: any) => {
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
                          users: [booking.userID, booking.rental.userID],
                          uid,
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
                      }
                    });
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
