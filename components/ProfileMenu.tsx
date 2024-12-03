// ProfileMenu.js
import React, { useState } from "react";
import styled from "styled-components";

// Styled components for the ProfileMenu
const ProfileMenuContainer = styled.div`
  display: flex;
  margin-top: 30px;
  padding: 10px;
`;

const ProfileButton = styled.button`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 8px;
  cursor: pointer;
`;

const DropdownContent = styled.div<{ show: any }>`
  display: ${(props) => (!props.show ? "block" : "hidden")};
  position: absolute;
  background-color: #fff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const MenuItem = styled.a`
  display: block;
  padding: 12px;
  text-decoration: none;
  color: #333;
  &:hover {
    background-color: #f5f5f5;
  }
`;

// ProfileMenu component
const ProfileMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <ProfileMenuContainer>
      <ProfileButton onClick={toggleMenu}>Profile</ProfileButton>
      <DropdownContent show={isMenuOpen}>
        <MenuItem href="#">My Account</MenuItem>
        <MenuItem href="#">Settings</MenuItem>
        <MenuItem href="#">Logout</MenuItem>
      </DropdownContent>
    </ProfileMenuContainer>
  );
};

export default ProfileMenu;
