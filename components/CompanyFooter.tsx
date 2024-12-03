import NextLink from "next/link";
import styled from "styled-components";
import Button from "components/Button";
import ButtonGroup from "components/ButtonGroup";
import Container from "components/Container";
import SectionTitle from "components/SectionTitle";
import { useNewsletterModalContext } from "contexts/newsletter-modal.context";
import { media } from "utils/media";

export default function CompanyFooter() {
  return (
    <>
      <Wrapper>
        <CompanyContainer>
          <Title>Core Maestro Management</Title>
          <TextContainer>
            <RichText>
              At Core Maestro Management, we are the architects of thriving
              workplaces. Our passion lies in empowering organizations to reach
              their full potential by harnessing the power of their people.
            </RichText>
          </TextContainer>
        </CompanyContainer>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  background: rgb(21, 35, 62);
  margin-top: -1rem;
  padding-bottom: 0rem;

  ${media("<=tablet")} {
    padding-top: 8rem;
  }
`;

const Title = styled(SectionTitle)`
  color: rgb(255, 255, 255);
  font-size: 4rem;
  padding-top: 4rem;
  margin-bottom: 4rem;
  ${media("<tablet")} {
    font-size: 2rem;
  }
`;
// subscribe button

const CompanyContainer = styled(Container)`
  padding: 0 30rem;
  ${media("<=desktop")} {
    padding: 0 20rem;
  }
  ${media("<=tablet")} {
    padding: 0 10rem;
  }
  ${media("<tablet")} {
    padding: 0 5rem;
  }
  ${media("<=phone")} {
    padding: 0 5rem;
  }
`;
const TextContainer = styled.div``;
const RichText = styled.div`
  font-size: 1.5rem;
  opacity: 0.8;
  line-height: 1.6;
  color: rgb(255, 255, 255);
  text-align: center;

  ${media("<=desktop")} {
    font-size: 1.5rem;
  }
`;

const Icon = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid transparent;
  position: absolute;
  transform: rotate(45deg);
  right: 0;
  top: 0;
  z-index: -1;
  transition: all 0.35s;
`;

// end subscribe button

const OutlinedButton = styled(Button)`
  border: 1px solid rgb(255, 175, 1);
  color: rgb(255, 175, 1);
`;

const CustomButtonGroup = styled(ButtonGroup)`
  justify-content: center;
`;
