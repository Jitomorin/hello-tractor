import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Button = styled.button`
  font-family: "Inter", monospace;
  letter-spacing: 1px;
  background: none;
  color: white;
  position: relative;
  outline: none;
  border: none;
  height: 50px;
  width: 190px;
  font-size: 20px;
  padding: 1rem;
  z-index: 2;
  transition: 0.01s 0.23s ease-out all;
  overflow: hidden;
  border-radius: 10px;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 55%;
    background: #202020;
    z-index: -1;
    transition: 0.3s ease-in all;
  }

  &:after {
    content: "";
    position: absolute;
    left: -5%;
    top: 5%;
    height: 90%;
    width: 5%;
    background: #f8d521;
    z-index: -1;
    transition: 0.4s 0.02s ease-in all;
  }

  &:hover {
    cursor: pointer;
    color: white;
    font-size: 21px;
    &:before {
      left: 100%;
      width: 25%;
    }
    &:after {
      left: 100%;
      width: 70%;
    }
    .icon-right.after:after {
      left: -80px;
      color: white;
      transition: 0.2s 0.2s ease all;
    }
    .icon-right.after:before {
      left: -104px;
      top: 14px;
      opacity: 0.2;
      color: white;
    }
  }
`;

const CTAButton = ({ name, link }: any) => {
  return (
    <Link href={link}>
      <Button className="explore">{name}</Button>
    </Link>
  );
};

export default CTAButton;
