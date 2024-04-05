import './App.css';
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

function App() {

  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "Build/Build.loader.js",
    dataUrl: "Build/Build.data",
    frameworkUrl: "Build/Build.framework.js",
    codeUrl: "Build/Build.wasm",
  });

  // We'll round the loading progression to a whole number to represent the
  // percentage of the Unity Application that has loaded.
  const loadingPercentage = Math.round(loadingProgression * 100);

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
        <Unity unityProvider={unityProvider} style={{ width: 600, height: 400 }} />
        <AwesomeButton type="primary">Button</AwesomeButton>
      </header>
      
    </div>
  );
}

export default App;
