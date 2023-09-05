import React from "react";
import { styled } from "styled-components";
import { BiLibrary, BiSolidDownArrow } from "react-icons/bi";
import { AiOutlineArrowRight, AiOutlinePlus } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import Playlist from "./Playlist";

function Sidebar2() {
  return (
    <Container className="m-2 rounded-lg ">
      <div className="m-2">
        <div>
          <div className="row justify-between p-2 txt">
            <div className="row">
              <span className="text-[24px] p-2">
                <BiLibrary />
              </span>
              <span className="text-lg">Your Library</span>
            </div>
            <div className="row ">
              <span className="text-xl p-2 cp ">
                <AiOutlinePlus />
              </span>
              <span className="text-xl p-2 cp">
                <AiOutlineArrowRight />
              </span>
            </div>
          </div>
          <div className="row p-2 txt">
            <button className="p">Playlists</button>
            <button className="p ml-4">Artists</button>
          </div>
          <div className="row justify-between p-2 txt">
            <span className="text-[15px] p-2 cp">
              <BsSearch />
            </span>
            <button className="flex flex-row items-center cp">
              Recents
              <span className="text-[12px] p-2">
                <BiSolidDownArrow />
              </span>
            </button>
          </div>
        </div>
        <div className="scroll">
          <Playlist />
        </div>
      </div>
    </Container>
  );
}

export default Sidebar2;

const Container = styled.div`
  background-color: #121212;
  height: 78.5%;
  overflow: auto;
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .cp {
    :hover {
      border-radius: 50%;
      background-color: #1a1a1a;
    }
  }
  .txt {
    color: #b3b3b3;
    font-weight: 600;
    :hover {
      cursor: pointer;
      color: white;
    }
  }
  .p {
    padding: 4px 12px;
    background-color: #232323;
    color: white;
    font-size: 14px;
    border-radius: 999px;
    font-weight: 600;
  }
`;
