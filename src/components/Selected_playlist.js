import React, { useEffect } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import { BsFillPlayFill } from "react-icons/bs";
import { TbDots } from "react-icons/tb";
import { LiaAlgolia, LiaClock } from "react-icons/lia";

export default function Selected_playlist() {
  const [{ token, selectedPlaylistId, selectedPlaylist, userInfo }, dispatch] = useStateProvider();
  useEffect(() => {
    const getplaylist = async () => {
      const { data } = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      const selectedPlaylist = {
        id: data.id,
        name: data.name,
        desc: data.description.startsWith("<a") ? "" : data.description,
        img: data.images[0].url,
        owner: data.owner.display_name,
        totaltracks: data.tracks.total,
        type: data.type,
        tracks: data.tracks.items.map((element) => ({
          id: element.track.id,
          track_name: element.track.name,
          date_added: element.added_at,
          artist_name: element.track.artists.map((artist) => artist.name),
          image: element.track.album.images[0].url,
          duration: element.track.duration_ms,
          album: element.track.album.name,
          context_uri: element.track.album.uri,
          track_number: element.track.track_number,
        })),
      };

      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
    };
    getplaylist();
  }, [dispatch, token, selectedPlaylistId, userInfo]);

  const timeformat = (ms) => {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000).toFixed(0);
    return min + ":" + (sec < 10 ? "0" : "") + sec;
  };
  const dateformat = (e) => {
    if (selectedPlaylist.owner == "Spotify") {
      const date = new Date(e);
      const day = date.getUTCDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const formatted_date = monthNames[month] + " " + day + ", " + year;
      return formatted_date;
    } else {
      const xdate = new Date();
      const xday = xdate.getUTCDate();
      const ydate1 = new Date(e);
      const yday1 = ydate1.getUTCDate();
      const formatted_date2 = xday - yday1 + " " + "days" + " " + "ago";
      return formatted_date2;
    }
  };

  const playTrack = async (id, track_name, artist_name, context_uri, track_number, image) => {
    const response = await axios.put(
      "https://api.spotify.com/v1/me/player/play",
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 204) {
      const currentlyPlaying = {
        id,
        track_name,
        artist_name,
        image,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    } else dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
  };
  return (
    <Container>
      {selectedPlaylist && (
        <div>
          <div className="flex m-6">
            <div>
              <img src={selectedPlaylist.img} alt="" width={"232px"} />
            </div>
            <div className="ml-6 ">
              <div className="text-sm font-semibold mt-3 ">{selectedPlaylist.type.charAt(0).toUpperCase() + selectedPlaylist.type.slice(1)}</div>
              <div className="text-[5rem]  mb-5 font-extrabold">{selectedPlaylist.name}</div>
              <div className="text-base  mb-2 text-[#B3B3B3] font-medium">{selectedPlaylist.desc}</div>
              <div className="flex  text-sm ">
                <img className=" rounded-full  mr-1 h-6" src={userInfo.userPic} alt="" />

                <span className="font-bold ">{selectedPlaylist.owner}</span>
                <span>
                  <span className="mr-1 ml-1 font-bold pb-2">.</span>
                  <span className=" font-semibold">{selectedPlaylist.totaltracks} songs </span>
                </span>
              </div>
            </div>
          </div>
          <div className="w-100 p-4 flex items-center">
            <span className="w-[3.5rem] h-[3.5rem] rounded-full bg-[#1db954] flex items-center justify-center text-black text-[2rem]">
              <BsFillPlayFill />
            </span>
            <span className="ml-[2rem]  text-[#b3b3b3] font-bold text-[2rem]">
              <TbDots />
            </span>
          </div>
          <div className="p-4">
            <div
              className="list w-full  
            "
            >
              <div className="header pb-2 pl-4 pr-4   ">
                <div className="row text-[#b3b3b3] text-sm ">
                  <div className="col">
                    <span className="text-[16px]">#</span>
                  </div>
                  <div className="col">
                    <span>Title</span>
                  </div>
                  <div className="col">
                    <span>Album</span>
                  </div>
                  <div className="col">
                    <span>Date added</span>
                  </div>
                  <div className="col">
                    <span className="text-xl hover:">
                      <LiaClock />
                    </span>
                  </div>
                </div>
              </div>
              <div className="tracks mt-4 ">
                {selectedPlaylist.tracks.map(({ id, track_name, artist_name, date_added, duration, context_uri, image, album, track_number }, index) => {
                  return (
                    <div className="track_row font-medium " key={id} onClick={() => playTrack(id, track_name, artist_name, context_uri, track_number, image)}>
                      <div className="index">
                        <span>{index + 1}</span>
                      </div>

                      <div className="info">
                        <div className="img">
                          <img src={image} alt="" width={"40px"} height={"40px"} />
                        </div>
                        <div>
                          <div className="h-6 overflow-hidden text-base text-white">
                            <span className=" ">
                              <a className=" hover:underline" href="#">
                                {track_name}
                              </a>
                            </span>
                          </div>
                          <div className="h-6 overflow-hidden">
                            <span className="">
                              <a className=" hover:underline" href="#">
                                {artist_name[0]} {", "}
                              </a>
                              <a className=" hover:underline" href="#">
                                {artist_name[1]}
                                {", "}
                              </a>
                              <a className=" hover:underline" href="#">
                                {artist_name[2]}
                              </a>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="album h-6 overflow-hidden  ">
                        <span className="  ">
                          <a className=" hover:underline" href="#">
                            {album}
                          </a>
                        </span>
                      </div>
                      <div>
                        <div className="date">
                          <span>{dateformat(date_added)}</span>
                        </div>
                      </div>
                      <div className="dur">
                        <span>{timeformat(duration)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
const Container = styled.div`
  .header {
    border-bottom: 0.5px solid hsla(0, 0%, 100%, 0.1);
    /* top: 5vh; */
    /* position: sticky; */
  }
  .row {
    display: grid;
    grid-template-columns: 0.3fr 3fr 2.5fr 1.5fr 0.5fr;
    grid-gap: 16px;
    font-weight: 500;
  }

  .tracks {
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
    .track_row {
      padding: 0 1rem;
      display: grid;
      grid-template-columns: 0.3fr 3fr 2.5fr 1.5fr 0.5fr;
      grid-gap: 16px;
      height: 56px;
      font-size: 14px;
      line-height: 1.6;
      letter-spacing: 0.5px;
      color: #b3b3b3;
      align-items: center;
      &:hover {
        background-color: hsla(0, 0%, 100%, 0.3);
        border-radius: 7px;
      }
      .info {
        display: flex;
        flex-direction: row;
        .img {
          height: 40px;
          margin-right: 1rem;
        }
      }
    }
  }
`;
