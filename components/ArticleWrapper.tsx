import { media } from "@/utils/media";
import styled from "styled-components";

export const ArticleWrapper = styled.article<{ theme: any }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  // background: ${(props) =>
    props.theme === "light" ? "#fbfbfd" : "#050505"};
  ${media("<tablet")} {
    flex-direction: column;
  }
`;
