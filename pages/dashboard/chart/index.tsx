import DefaultLayout from "@/components/Layouts/DefaultLayout";
import styled from "styled-components";
import Chart from "@/components/Charts/page";

const Wrapper = styled.section<{ theme: any }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

function BasicChartPage() {
  return (
    <DefaultLayout>
      <Wrapper>{/* <Chart /> */}</Wrapper>
    </DefaultLayout>
  );
}

export default BasicChartPage;
