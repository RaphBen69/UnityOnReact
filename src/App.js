import './App.css';
import React, { useState, useEffect, useCallback } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

function App() {

  const { unityProvider, sendMessage, addEventListener, removeEventListener, isLoaded, loadingProgression, requestFullscreen  } = useUnityContext({
    loaderUrl: "Build/Build.loader.js",
    dataUrl: "Build/Build.data",
    frameworkUrl: "Build/Build.framework.js",
    codeUrl: "Build/Build.wasm",
  });

  // We'll round the loading progression to a whole number to represent the
  // percentage of the Unity Application that has loaded.
  const loadingPercentage = Math.round(loadingProgression * 100);

  const [coins, SetCoins] = useState(0);

  const handleCoin = useCallback((points) => {
    SetCoins(coins => coins + points);
  }, []);

  function handleClickButton() {
    SetCoins(0);
    sendMessage("ReactController", "OnReactMessage", "Reset");
  }

  useEffect(() => {
    addEventListener("AddCoins", handleCoin);
    return () => {
      removeEventListener("AddCoins", handleCoin);
    };
  }, [addEventListener, removeEventListener, handleCoin]);

  function handleClickEnterFullscreen() {
    requestFullscreen(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        {isLoaded === false && (
          // We'll conditionally render the loading overlay if the Unity
          // Application is not loaded.
          <div className="loading-overlay">
            <p>Loading... ({loadingPercentage}%)</p>
          </div>
        )}
        <span className="counter__output">Coins {coins}</span>
        <Unity unityProvider={unityProvider} style={{ width: '100vw', height: '60vw', maxWidth: 800, maxHeight: 450 }} />
        <AwesomeButton type="primary" onPress={handleClickButton}>Reset</AwesomeButton>
        <AwesomeButton type="primary" onPress={handleClickEnterFullscreen}>Enter Fullscreen</AwesomeButton>
      </header>
      
    </div>
  );
}

export default App;
