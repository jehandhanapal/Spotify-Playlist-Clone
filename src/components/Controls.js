import React from "react";
import { styled } from "styled-components";
import { TbMicrophone2 } from "react-icons/tb";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { HiOutlineQueueList } from "react-icons/hi2";
import { TbDevices2 } from "react-icons/tb";
import { BsVolumeUpFill } from "react-icons/bs";
import { AiOutlineExpandAlt } from "react-icons/ai";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";

export default function Controls() {
  const [{ token }] = useStateProvider();
  const setVolume = async (e) => {
    await axios.put(
      "https://api.spotify.com/v1/me/player/volume",
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <Container>
      <div className="flex flex-row text-[#B3B3B3] items-center">
        <span className="p-2 text-xl">
          <AiOutlinePlaySquare />
        </span>
        <span className="p-2 text-xl">
          <TbMicrophone2 />
        </span>
        <span className="p-2 text-2xl">
          <HiOutlineQueueList />
        </span>
        <span className="p-2 text-xl">
          <TbDevices2 />
        </span>
        <span className="m-2 text-xl">
          <BsVolumeUpFill />
        </span>
        <span className="flex items-center">
          <input
            className=""
            type="range"
            min={0}
            max={100}
            step={25}
            onMouseUp={(e) => {
              setVolume(e);
            }}
          />
        </span>
        <span className="m-2 text-xl">
          <AiOutlineExpandAlt />
        </span>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: end;

  svg {
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }

  input[type="range"] {
    
    accent-color: #fff;
    height: 5px;
    &:hover {
      accent-color: #1db954;
      filter: brightness(1.0);
      &::-webkit-slider-thumb {
        visibility: visible;
        background-color: #fff;
        background: #fff;
      }
    }
  }
  input[type="range"]::-webkit-slider-thumb {
    margin-top: -3px;
    visibility: hidden;
  }
 
`