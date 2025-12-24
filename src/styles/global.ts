
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.textDark};
    font-family: 'Nunito', 'Segoe UI', 'Comic Sans MS', sans-serif;
    overflow: hidden; /* Prevent scroll on mobile */
    user-select: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  #root {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  * {
    box-sizing: border-box;
  }

  button {
    font-family: inherit;
    border: none;
    outline: none;
    cursor: pointer;
  }
`;
