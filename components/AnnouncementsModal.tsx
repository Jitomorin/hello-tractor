import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function AnnouncementsModal(announcements: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className="flex w-full items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white transition-all ease-in-out hover:scale-[1.03]"
        onPress={onOpen}
      >
        View all
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Announcements
              </ModalHeader>
              <ModalBody>
                {announcements.map((announcement: any) => (
                  <li key={announcement.uid} className="py-5">
                    <div className="relative focus-within:ring-2 focus-within:ring-cyan-500">
                      <h3 className="text-sm font-semibold text-gray-800">
                        <a
                          href={announcement.href}
                          className="hover:underline focus:outline-none"
                        >
                          {/* Extend touch target to entire panel */}
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          />
                          {announcement.title}
                        </a>
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                        {announcement.message}
                      </p>
                    </div>
                  </li>
                ))}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
