import React from "react";
import styled from "styled-components";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { BsArrowDownCircle } from "react-icons/bs";
import { useStateProvider } from "../utils/StateProvider";

export default function Navbar() {
 const [{userInfo}]= useStateProvider();

  return (
    <Container className=" m-3 sticky">
      <div className="flex flex-row justify-between items-center ">
        <div className="rightnav">
          <button className="icon">
            <IoIosArrowBack />
          </button>
          <button className="icon">
            <IoIosArrowForward />
          </button>
        </div>
        <div className="left nav flex flex-row">
          <button className="btn1">Explore Premium</button>
          <button className="flex items-center btn">
            <span className="text-[16px] mr-2 font-bold ">
              <BsArrowDownCircle />
            </span>
            <span>Install app</span>
          </button>
          <button  key={userInfo.userId} className="rbtn">
            <img src={userInfo.userPic} alt="a"/>
            {/* <img src="https://wallpapers.com/images/featured/dhoni-7-47qhfl54wsjjc81o.jpg" alt="a"/> */}
          </button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 3rem;
  background-color: transparent;
  .icon {
    padding: 4px;
    background-color: #000000b3;
    border-radius: 50%;
    margin: 0 0.5rem;
    font-size: 24px;
  }
  .btn {
    padding: 2px 16px;
    background-color: #0000008a;
    color: white;
    border-radius: 999px;
    margin: 0 10px;
    font-size: 14px;
    font-weight: 700;
  }
  .btn1 {
    padding: 2px 16px;
    background-color: #fff;
    color: black;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 700;
  }
  .rbtn {
    padding: 4px;
    background-color: #0000008a;
    border-radius: 50%;

    img {
      height: 24px;
      width: 24px;
    border-radius: 50%;

    }
  }
`;
