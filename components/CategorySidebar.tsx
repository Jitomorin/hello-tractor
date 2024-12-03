import { useEffect, useState } from "react";
import NextImage from "next/image";
import styled, { css } from "styled-components";
import NextLink from "next/link";
import { media } from "../utils/media";
// import { Category } from "@/sanity/lib/queries";
import Link from "next/link";

export default function CategorySidebar({ categories }: { categories: any[] }) {
  return (
    <Wrapper>
      <Heading>Categories</Heading>
      <CategoryBar>
        {categories.map((category) => (
          <Link
            key={category.title}
            href={`/posts/category/${category.slug?.current}`}
          >
            <CategoryLink>{category.title}</CategoryLink>
          </Link>
        ))}
      </CategoryBar>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
  padding: 2rem;
  background-color: white;
  ${media("=tablet")} {
    width: 20%;
  }
  ${media("<tablet")} {
    display: none;
  }
`;
const Heading = styled.h3`
  font-size: 1.9rem;
  margin-bottom: 2rem;
  font-weight: bold;
  padding-left: 1rem;
  text-align: left;
  align-self: flex-start;
  ${media("<=tablet")} {
    font-size: 1.5rem;
  }
`;
const CategoryBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  padding: 1rem;
`;
const CategoryLink = styled.div`
  cursor: pointer;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  &:hover {
    scale: 1.03;
    color: rgb(255, 175, 1);
  }
  ${media("<=tablet")} {
    font-size: 1.1rem;
  }
`;
