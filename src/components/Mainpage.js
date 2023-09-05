import React, { useEffect } from "react";
import Sidebar1 from "./Sidebar1";
import Sidebar2 from "./Sidebar2";
import { styled } from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import Selected_playlist from "./Selected_playlist";

export default function Mainpage() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      // console.log(data);

      const userInfo = {
        userId: data.id,
        userName: data.display_name,
        userPic: data.images[1].url,
      };

      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [dispatch, token]);
  return (
    <Container>
      <div className="body">
        <div className="sidebars">
          <Sidebar1 />
          <Sidebar2 />
        </div>
        <div className="right">
          <div className="nav">
            <Navbar />
          </div>
          <div className="home">
            {/* <Homepage /> */}
            <Selected_playlist />
          </div>
        </div>
      </div>
      <div className="footr">
        <Footer />
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: black;
  color: #fff;
  display: grid;
  grid-template-rows: 87vh 13vh;
  .body {
    display: grid;
    grid-template-columns: 30.7vw 69.3vw;
    max-height: 100%;
    overflow: hidden;
    font-family: sans-serif;
  }
  .right {
    background: linear-gradient(180deg, rgba(34, 34, 34, 1) 15%, rgba(28, 28, 28, 1) 30%, rgba(18, 18, 18, 1) 61%);
    border-radius: 0.5rem;
    margin: 8px 8px 8px 0;
    /* padding: 1rem 0; */
    font-family: sans-serif;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;

      &-thumb {
        background-color: hsla(0, 0%, 100%, 0.3);
      }
    }
  }
  .footr {
    background-color: black;
    font-family: sans-serif;
    color: white;
  }
`;
