import React, { useEffect } from "react";
import { styled } from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { FiHeart } from "react-icons/fi";
import { CgInpicture } from "react-icons/cg";

export default function Current_track() {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    const getcurrentplayingtrack = async () => {
      const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      if (response.data !== "") {
        const { item } = response.data;
        const currentlyPlaying = {
          id: item.id,
          track_name: item.name,
          artist_name: item.artists.map((artist) => artist.name),
          image: item.album.images[2].url,
        };
        console.log(item);

        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
      }
    };
    getcurrentplayingtrack();
  }, [token, dispatch]);
  return (
    <Container>
      {currentlyPlaying && (
        <div className=" flex flex-row items-center">
          <div className="img pr-2  ">
            <img className=" " src={currentlyPlaying.image} alt="" />
          </div>
          <div className="info pl-2 pr-3 ">
            <div className="track_name">
              <span className="text-sm font-normal text-white">{currentlyPlaying.track_name}</span>
            </div>
            <div className="artist">
              <span className="text-[11px] font-normal text-[#B3B3B3] ">{currentlyPlaying.artist_name} </span>
              {/* <span className="text-[11px] font-normal text-[#B3B3B3] ">{currentlyPlaying.artist[1]}</span> */}
            </div>
          </div>
          <div className="icon flex flex-row ">
            <span className="text-lg p-2 text-[#B3B3B3]">
              <FiHeart />
            </span>
            <span className="text-lg p-2 text-[#B3B3B3]">
              <CgInpicture />
            </span>
          </div>
        </div>
      )}
    </Container>
  );
}
const Container = styled.div`


  img {
    height: 56px;
    /* width: 56px; */
    border-radius: 6px;
  }
  svg {
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }
`;
