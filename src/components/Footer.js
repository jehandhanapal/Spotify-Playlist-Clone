import React, { useEffect } from "react";
import { styled } from "styled-components";
import Current_track from "./Current_track";
import Player_controls from "./Player_controls";
import Controls from "./Controls";


export default function Footer() {
  return (
    <Container className="items-center ">
      <Current_track/>
      <Player_controls/>
      <Controls/>
    </Container>
  )
}

const Container = styled.div`
width: 100%;
height: 100%;
padding-left:1rem;
display: grid;
  grid-template-columns: 30vw 38vw 30vw;

`
