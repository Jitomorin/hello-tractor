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
  Input,
} from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";
import { hasDatePassed } from "@/utils/formatString";
import {
  addDataWithDocName,
  AddMessageToChat,
  checkIfChatExists,
  getFilteredData,
  updateBookingInformation,
} from "@/utils/firebase/firestore";

export default function ConfirmationCodeFormModal({
  user,
  booking,
  callSnackbar,
}: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [confirmationCode, setConfirmationCode] = useState("");

  return (
    <>
      <Button
        onPress={async () => {
          if (hasDatePassed(booking.selectedDates.startDate.seconds)) {
            onOpen();
          } else {
            callSnackbar("The date for handover has not yet reached");
          }
        }}
        className="bg-primary rounded-lg font-semibold hover:scale-[1.03] transition-all ease-in-out text-white p-2"
        variant="solid"
      >
        Enter confirmation code
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
                  Enter the confirmation code provided by the host
                </p>
                <input
                  className="p-2 w-full  border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  value={confirmationCode}
                  onChange={(e: any) => {
                    setConfirmationCode(e.target.value);
                  }}
                  placeholder="Enter confirmation code"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    getFilteredData("orders", "uid", "==", booking.uid).then(
                      (res: any) => {
                        if (confirmationCode === res[0].confirmationCode) {
                          updateBookingInformation(booking.uid, {
                            confirmed: true,
                          }).then(() => {
                            callSnackbar(
                              "Confirmation code entered successfully"
                            );
                          });
                        } else {
                          callSnackbar("Confirmation not correct");
                        }
                      }
                    );
                  }}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
