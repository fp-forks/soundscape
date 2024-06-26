// libs
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// context
import { ThemeContext } from "../contexts/contexts";
import { SongContext } from "../contexts/contexts";
import { InfoContext } from "../contexts/contexts";

// components
import { MusicPlayer } from "./MusicPlayer";
import { LandingPage } from "./LandingPage";

export const AppRouter = (props) => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path={"/play/:songId"}
          render={(routeProps) => {
            return (
              <ThemeContext.Provider
                value={{
                  // provide the song's theme context
                  id: routeProps.match.params.songId,
                  spectrumFunction:
                    props.spectrumFunctions[routeProps.match.params.songId],
                  ...props.appConfig.find((song) => {
                    return song.id === routeProps.match.params.songId;
                  })["themes"],
                }}
              >
                <SongContext.Provider
                  value={{
                    // provide the song context
                    id: routeProps.match.params.songId,
                    ...props.appConfig.find((song) => {
                      return song.id === routeProps.match.params.songId;
                    })["audio"],
                  }}
                >
                  <InfoContext.Provider
                    value={{
                      // provide extra information about the song
                      id: routeProps.match.params.songId,
                      ...props.appConfig.find((song) => {
                        return song.id === routeProps.match.params.songId;
                      })["info"],
                    }}
                  >
                    <MusicPlayer />
                  </InfoContext.Provider>
                </SongContext.Provider>
              </ThemeContext.Provider>
            );
          }}
        />
        <Route
          path="/"
          render={() => (
            <LandingPage spectrumFunction={props.spectrumFunctions.stars} />
          )}
        />
      </Switch>
    </Router>
  );
};
