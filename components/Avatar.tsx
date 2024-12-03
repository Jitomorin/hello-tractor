// Avatar.js
import React from "react";
import styled from "styled-components";

// Styled components for the Avatar
const StyledAvatar = styled.img<{ size: any }>`
  border-radius: 50%;
  width: ${(props: any) => props.size || "50px"};
  height: ${(props: any) => props.size || "50px"};
  margin: 0 auto;
`;

// Avatar component
const Avatar = ({ size, image, alt }: any) => {
  return <StyledAvatar src={image} alt={alt} size={size} />;
};

export default Avatar;
