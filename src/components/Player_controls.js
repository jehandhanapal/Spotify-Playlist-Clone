import React from "react";
import { styled } from "styled-components";
import { BiShuffle, BiSkipNext, BiSkipPrevious, BiRepeat } from "react-icons/bi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

export default function Player_controls() {
  const [{ token, playerState, }, dispatch] = useStateProvider();

  const changeTrack = async (type) => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
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
    } else dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
  };

  const changeState = async () => {
    const state = playerState ? "pause" : "play";
    await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: !playerState });
  };

  return (
    <Container>
      <div className="top flex flex-row justify-center items-center gap-2">
        <div className="icon">
          <BiShuffle />
        </div>
        <div className="icon prev">
          <BiSkipPrevious onClick={() => changeTrack("previous")} />
        </div>
        <div className="icon i bg-white text-black">{playerState ? <BsFillPauseFill onClick={changeState} /> : <BsFillPlayFill onClick={changeState} />}</div>
        <div className="icon next">
          <BiSkipNext onClick={() => changeTrack("next")} />
        </div>
        <div className="icon">
          <BiRepeat />
        </div>
       
      </div>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  input {
    width: 30vw;
    height: 4px;
    border-radius: 999px;
  }
  .icon {
    margin: 0 0.5rem;
    font-weight: 700;
  }
  svg {
    font-size: 20px;
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }
  .i {
    border-radius: 50%;
    &:hover {
      filter: brightness(0.6);
    }

    svg {
      color: black;
      font-size: 27px;
      font-weight: 600;
      margin: 4px;
    }
  }
  .next,
  .prev {
    svg {
      font-size: 35px;
    }
  }
`;
