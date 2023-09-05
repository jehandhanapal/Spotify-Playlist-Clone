import React from "react";
import { GoHome } from "react-icons/go";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";

function Sidebar1() {
  return (
    <Container className="m-2 rounded-lg ">
      <ul>
        <div>
          <li className=" flex flex-row">
            <span className=" mr-4 text-[24px] ">
              <GoHome />
            </span>
            <span className=" mr-4 text-lg">Home</span>
          </li>
        </div>
        <div>
          <li className=" flex flex-row">
            <span className=" mr-4 text-[24px] ">
              <BsSearch />
            </span>
            <span className="text-lg">Search</span>
          </li>
        </div>
      </ul>
    </Container>
  );
}

export default Sidebar1;

const Container = styled.div`
  background-color: #121212;
  padding: 8px 12px;
  box-sizing: border-box;

  div {
    padding: 4px 12px;
    gap: 1rem;
    :hover {
      color: white;
    }
  }
  li {
    align-items: center;
    cursor: pointer;
    color: #b3b3b3;
    font-weight: 600;
    height: 40px;
  }
`;
