import AlertBanner from "@/components/AlertBanner";
import styled from "styled-components";
import { useTheme } from "next-themes";

const Wrapper = styled.div`
  min-height: 100vh;
  background: ${(props) => (props.theme === "light" ? "#fbfbfd" : "#010103")};
`;

export default function BlogLayout({
  preview,
  loading,
  children,
}: {
  preview?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}) {
  const { theme }: any = useTheme();
  return (
    <>
      <Wrapper theme={theme}>
        <AlertBanner preview={preview} loading={loading} />
        <main>{children}</main>
      </Wrapper>
    </>
  );
}
