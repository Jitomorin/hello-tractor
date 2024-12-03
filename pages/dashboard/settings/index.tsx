"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import styled from "styled-components";
import { useAuthContext } from "@/contexts/AuthContext";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import {
  deleteProfileDirectory,
  uploadProfileImage,
} from "@/utils/firebase/storage";
import Snackbar from "@/components/Snackbar";
import { updateUserProfile } from "@/utils/firebase/firestore";
import { useRouter } from "next/router";

const SaveButton = styled.div`
  background-color: #f8d521;
  padding: 1rem 1rem;
  border-radius: 0.3rem;
  transition: all 0.3s;
  font-size: 1rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  z-index: 1;
  &:hover {
    scale: 1.07;
  }
`;
export const metadata: Metadata = {
  title: "Next.js Settings",
  description: "This is Next.js Settings page",
};

function Settings() {
  const { user, loading }: any = useAuthContext();
  const [profileImage, setProfileImage] = useState<any>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [email, setEmail] = useState(!user?.email ? "" : user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [fullName, setFullName] = useState(user?.fullName);
  const [bio, setBio] = useState(user?.bio);
  const [snackbarMessage, setSnackbarMessage] = useState("Default Message");
  const [t, setT] = useState(true);
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/settings/profile");
  }, [user]);

  const refreshPage = () => {
    setT(!t);
  };
  const resetForm = () => {
    setEmail(user.email);
    setPhoneNumber(user.phoneNumber);
    setFullName(user.fullName);
    setBio(user.bio);
  };
  const resetProfileImageSelection = () => {
    setProfileImage(null);
  };
  const changeProfilePicture = async () => {
    if (profileImage === null) {
      setSnackbarMessage("Please select an image to upload");
      setSnackbarOpen(true);
      return;
    }
    const result = await uploadProfileImage(profileImage, user.uid);
    if (result.status === "success") {
      setSnackbarMessage("Profile picture updated successfully");
      setSnackbarOpen(true);
      router.reload();
    } else {
      setSnackbarMessage(result.message);
      setSnackbarOpen(true);
    }
    refreshPage();
  };
  const changeProfileDetails = async () => {
    if (
      user?.email === email &&
      user?.phoneNumber === phoneNumber &&
      user?.fullName === fullName &&
      user?.bio === bio
    ) {
      setSnackbarMessage("No changes made");
      setSnackbarOpen(true);
      return;
    }
    const result = await updateUserProfile(
      user.uid,
      email,
      fullName,
      phoneNumber,
      bio
    );
    setSnackbarMessage(result.message);
    setSnackbarOpen(true);
    refreshPage();
  };

  return (
    <DefaultLayout>
      <div className="mx-auto">
        <Breadcrumb pageName="Settings" />
      </div>
    </DefaultLayout>
  );
}

export default Settings;
