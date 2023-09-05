import React from "react";
import styled from "styled-components";

export default function Login() {
  const handleclick = () => {
    const Clinentid = "1e4c7678fa9d4d8c88d23e40f8042de4";
    const RedirectUrl = "http://localhost:3000/";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-playback-position",
      "user-top-read",
      "user-read-recently-played",
      "user-library-read",
      "playlist-read-collaborative",
      "playlist-read-private"
    ];
    window.location.href = `${apiUrl}?client_id=${Clinentid}&redirect_uri=${RedirectUrl}&scope=${scope.join(" ")}&response_type=token&show_dailog=true`
  };
  return (
    <Container>
      <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" alt="spotify" />
      <button onClick={handleclick}>Connect to Spotify</button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1db954;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  gap: 4rem;

  img {
    height: 20vh;
  }
  button {
    padding: 1rem 2.5rem;
    background-color: black;
    border-radius: 5rem;
    border: none;
    font-size: 1.3rem;
    color: #49f585;
    cursor: pointer;
  }
  button:hover {
    filter: brightness(0.3);
  }
`;
