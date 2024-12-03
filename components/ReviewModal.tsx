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
  AddRating,
  checkIfChatExists,
  getFilteredData,
  updateBookingInformation,
  updateOrderInformation,
} from "@/utils/firebase/firestore";

import StarRating from "./StarRating";

export default function ReviewModal({
  user,
  callSnackbar,
  host,
  listing,
}: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");

  const handleRating = (rate: any) => {
    setRating(rate);
  };
  const hasUserReviewed = (listing: any, userId: any) => {
    if (host.reviews) {
      return host.reviews.some((review: any) => review.userID === userId);
    }
    return false;
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-primary rounded-lg font-semibold hover:scale-[1.03] transition-all ease-in-out text-white p-2"
        variant="solid"
      >
        Leave a review
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
              <ModalHeader className="flex text-2xl flex-col gap-1">
                Review Seller
              </ModalHeader>
              <ModalBody>
                {/* <p className="text-2xl">Review Seller</p> */}
                <input
                  className="p-2 w-full  border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  value={title}
                  onChange={(e: any) => {
                    setTitle(e.target.value);
                  }}
                  placeholder="Title"
                />
                <textarea
                  className="p-2 w-full  border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  value={content}
                  onChange={(e: any) => {
                    setContent(e.target.value);
                  }}
                  placeholder="Content"
                />
                <StarRating rating={rating} handleRating={handleRating} />
              </ModalBody>
              <ModalFooter>
                <Button
                  className="rounded-sm"
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  className="rounded-sm"
                  color="primary"
                  onPress={async () => {
                    if (hasUserReviewed(listing, user.uid)) {
                      callSnackbar("Already left a review");
                    } else {
                      const uid = uuidv4();
                      await AddRating(host.uid, {
                        content,
                        title,
                        timestamp: new Date(),
                        userID: user.uid,
                        rating,
                        uid,
                      }).then(() => {
                        callSnackbar("Review sent");
                      });
                    }
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
