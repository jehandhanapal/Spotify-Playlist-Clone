import React, { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { styled } from "styled-components";

export default function Playlist() {
  const [{ token, playlists }, dispatch] = useStateProvider();
  useEffect(() => {
    const getplaylistsdata = async () => {
      const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const { items } = response.data;
      const playlists = items.map(({ name, id, images, type, owner }) => {
        return {
          name,
          id,
          images,
          type,
          owner,
        };
      });
      dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
    };
    getplaylistsdata();
  }, [token, dispatch]);
  const changeCurrentplaylist = (selectedPlaylistId)=>{
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });

  }

  return (
    <Container>
      <ul>
        {playlists.map(({ name, id, images, type, owner }) => {
          return (
            <li key={id} onClick={()=>changeCurrentplaylist(id)}>
              <div  className="flex p-2 items-center hover:bg-[#1A1A1A] hover:cursor-pointer ">
                <div>
                  <img src={images[0].url} alt="" width={"48px"} />
                </div>
                <div className="ml-4">
                  <span>{name}</span>
                  <div className="txt">
                    <span className="text-sm">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                    <span className="text-lg ml-1 mr-1 ">.</span>
                    <span className="text-sm">{owner.display_name}</span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
const Container = styled.div`
  height: 45vh;
  max-height: 100%;
  overflow: auto;
 
  &::-webkit-scrollbar {
    width: 0.7rem;
    
    &-thumb {
      background-color: hsla(0,0%,100%,.3);
    }
  }

  .txt {
    cursor: pointer;
    color: #b3b3b3;
  }
`;
