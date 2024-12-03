// components/StyledTabs.tsx
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Content, Tab, Tabs } from "../../components/Tab";

// Styled components
const TabsContainer = styled.div`
  left: 50%;
  transform: translateX(-50%);
  position: relative;
  background: white;
  padding: 50px;
  padding-bottom: 80px;
  width: 70%;
  height: 250px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  border-radius: 5px;
  min-width: 240px;
`;

const TabList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const TabItem = styled.li`
  flex: 1;
  width: 25%;
  padding: 0 10px;
  text-align: center;
`;

const TabLabel = styled.label<{ active: boolean }>`
  cursor: pointer;
  color: #929daf;
  padding: 5px auto;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;

  svg {
    fill: #929daf;
    height: 1.2em;
    vertical-align: bottom;
    margin-right: 0.2em;
    transition: all 0.2s ease-in-out;
  }

  &:hover,
  &:focus,
  &:active {
    outline: 0;
    color: #bec5cf;
  }

  &:hover svg,
  &:focus svg,
  &:active svg {
    fill: #bec5cf;
  }

  ${(props) =>
    props.active &&
    css`
      /* Add your active styles here */
      color: #428bff;

      svg {
        fill: #428bff;
      }
    `}
`;

// const TabLabel = styled.label`
//   cursor: pointer;
//   color: #929daf;
//   padding: 5px auto;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   display: block;
//   transition: all 0.2s ease-in-out;
//   white-space: nowrap;

//   svg {
//     fill: #929daf;
//     height: 1.2em;
//     vertical-align: bottom;
//     margin-right: 0.2em;
//     transition: all 0.2s ease-in-out;
//   }

//   &:hover,
//   &:focus,
//   &:active {
//     outline: 0;
//     color: #bec5cf;
//   }

//   &:hover svg,
//   &:focus svg,
//   &:active svg {
//     fill: #bec5cf;
//   }
// `;

const Slider = styled.div`
  position: relative;
  width: 25%;
  transition: all 0.33s cubic-bezier(0.38, 0.8, 0.32, 1.07);
`;

const Indicator = styled.div`
  position: relative;
  width: 50px;
  max-width: 100%;
  margin: 0 auto;
  height: 4px;
  background: #428bff;
  border-radius: 1px;
`;

const ContentSection = styled.section`
  display: none;
  animation-name: content;
  animation-direction: normal;
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
  line-height: 1.4;

  h2 {
    color: #428bff;
    display: none;

    &::after {
      content: "";
      position: relative;
      display: block;
      width: 30px;
      height: 3px;
      background: #428bff;
      margin-top: 5px;
      left: 1px;
    }
  }
`;

// Tab data
const tabData = [
  {
    id: "tab1",
    title: "Features",
    content: (
      <>
        <h2>Features</h2>
        Features go here Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Ea dolorem sequi, quo tempore in eum obcaecati atque quibusdam
        officiis est dolorum minima deleniti ratione molestias numquam. Voluptas
        voluptates quibusdam cum?
      </>
    ),
  },
  {
    id: "tab2",
    title: "Delivery Contents",
    content: (
      <>
        <h2>Delivery Contents</h2>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem quas
        adipisci a accusantium eius ut voluptatibus ad impedit nulla, ipsa qui.
        Quasi temporibus eos commodi aliquid impedit amet, similique nulla.
      </>
    ),
  },
  {
    id: "tab3",
    title: "Shipping",
    content: (
      <>
        <h2>Shipping</h2>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam nemo
        ducimus eius, magnam error quisquam sunt voluptate labore, excepturi
        numquam! Alias libero optio sed harum debitis! Veniam, quia in eum.
      </>
    ),
  },
  {
    id: "tab4",
    title: "Returns",
    content: (
      <>
        <h2>Returns</h2>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa dicta
        vero rerum? Eaque repudiandae architecto libero reprehenderit aliquam
        magnam ratione quidem! Nobis doloribus molestiae enim deserunt
        necessitatibus eaque quidem incidunt.
      </>
    ),
  },
];

const StyledTabs: React.FC = () => {
  const [active, setActive] = useState(0);
  const handleClick = (e: any) => {
    const index = parseFloat(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <Tabs>
        {tabData.map((tab, index) => (
          <Tab onClick={handleClick} active={active === 0}>
            Content1
          </Tab>
        ))}
      </Tabs>
      <>
        <Content active={active === 0}>
          <h1>Content 1</h1>
        </Content>
        <Content active={active === 1}>
          <h1>Content 2</h1>
        </Content>
      </>
      {/* <Tabs>
        <TabList>
          <Tab>Title 1</Tab>
          <Tab>Title 2</Tab>
        </TabList>

        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs> */}
    </div>
  );
};

export default StyledTabs;
