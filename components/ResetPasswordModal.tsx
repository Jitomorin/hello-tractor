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
  Spinner,
} from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";
import { hasDatePassed } from "@/utils/formatString";
import {
  addDataWithDocName,
  AddMessageToChat,
  AddRating,
  checkIfChatExists,
  getFilteredData,
  updateBookingInformation,
  updateOrderInformation,
} from "@/utils/firebase/firestore";

import StarRating from "./StarRating";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/utils/firebase/config";

export default function ResetPasswordModal({ callSnackbar }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const sendResetEmail = async (email: string): Promise<void> => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      callSnackbar("Password reset email sent");
    } catch (error) {
      callSnackbar("Error resetting your password please contact admin");
      throw error;
    }
    setLoading(false);
  };

  return (
    <>
      <button onClick={onOpen} className="bg-transparent">
        Reset
      </button>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent className="p-6 rounded-none shadow-md">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-3xl">
                Reset Password
              </ModalHeader>
              <ModalBody>
                <p className="text-xl">
                  Enter your email to send a password reset request
                </p>
                <input
                  className="p-2 w-full text-xl border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  value={email}
                  onChange={(e: any) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="John.doe@gmail.com"
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  className="rounded-none text-xl font-semibold"
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>

                {!loading ? (
                  <Button
                    onClick={async () => {
                      await sendResetEmail(email);
                    }}
                    className="text-xl bg-[#1C4D9C] font-semibold text-white hover:scale-[1.02] rounded-none"
                  >
                    Send request
                  </Button>
                ) : (
                  <Button
                    onClick={async () => {
                      await sendResetEmail(email);
                    }}
                    className="text-xl bg-[#1C4D9C] font-semibold text-white hover:scale-[1.02] rounded-none"
                  >
                    <Spinner color="white" />
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
