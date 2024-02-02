import playersData from "../data/players.json";
import teamsData from "../data/teams.json";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import PlayerGuessTable from "./PlayerGuessTable";
import ResultModal from "./ResultModal";
import Silhouette from "./Silhouette";
import Tutorial from "./Tutorial";
import React from "react";

function NHLGame() {
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [currentGuess, setCurrentGuess] = useState(null);
  const [playerGuesses, setPlayerGuesses] = useState([]);
  const [showSilhouette, setShowSilhouette] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [victory, setVictory] = useState(false);

  function calculateAge(birthDate) {
    const currentDate = new Date();
    const birthDateObj = new Date(birthDate);
    let age = currentDate.getFullYear() - birthDateObj.getFullYear();
    if (
      currentDate.getMonth() < birthDateObj.getMonth() ||
      (currentDate.getMonth() === birthDateObj.getMonth() &&
        currentDate.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age;
  }

  function getPlayerData(player) {
    const playerTeam = teamsData[player.currentTeam];
    const currentAge = calculateAge(player.birthDate);
    return {
      playerTeam,
      currentAge
    };
  }

  function getRandomPlayer() {
    const randomInteger = Math.floor(Math.random() * playersData.length);
    const randomPlayer = playersData[randomInteger];
    const playerData = getPlayerData(randomPlayer);
    return {
      ...randomPlayer,
      ...playerData
    };
  }

  function getPlayerById(id) {
    const player = playersData.find((item) => item.id === id);
    const playerData = getPlayerData(player);
    return {
      ...player,
      ...playerData
    };
  }

  function restartGame() {
    setCurrentGuess(null);
    setPlayerGuesses([]);
    setVictory(false);
    const playerData = getRandomPlayer();
    setCurrentPlayer(playerData);
  }

  useEffect(() => {
    if (playersData) {
      const playerData = getRandomPlayer();
      setCurrentPlayer(playerData);
    }
  }, [playersData]);

  useEffect(() => {
    if (currentGuess !== null) {
      if (currentGuess.id === currentPlayer.id) {
        setVictory(true);
      }
      setPlayerGuesses((prevState) => [...prevState, currentGuess]);
    }
  }, [currentGuess]);
  return (
    <>
      <Tutorial display={showTutorial} setShowTutorial={setShowTutorial} />
      <ResultModal
        victory={victory}
        display={
          (currentPlayer !== null && currentPlayer?.id === currentGuess?.id) ||
          playerGuesses?.length >= 8
        }
        currentPlayer={currentPlayer}
        playerGuesses={playerGuesses}
        restartGame={restartGame}
      />
      <Silhouette
        display={showSilhouette}
        headShot={currentPlayer?.headshot}
        setShowSilhouette={setShowSilhouette}
      />
      <div className="flex flex-col h-full flex-grow self-start justify-start items-center">
        <div className="flex flex-col items-center gap-3 w-full lg:w-1/2">
          <div className="w-full px-2 text-center">
            <h1 className="font-bold text-2xl">NHL Player Guessing Game</h1>
          </div>
          <div className="w-full px-2">
            <SearchBar
              guessesLength={playerGuesses.length + 1}
              setCurrentGuess={setCurrentGuess}
              setShowTutorial={setShowTutorial}
              playersData={playersData}
              getPlayerById={getPlayerById}
            />
          </div>
          <div className="flex h-10 max-h-full w-full justify-center gap-2">
            <button
              className="h-full cursor-pointer underline underline-offset-4 font-medium"
              onClick={() => setShowSilhouette((currState) => !currState)}
            >
              Show silhouette
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 max-h-full overflow-auto">
          {playerGuesses.length > 0 && (
            <PlayerGuessTable
              playerGuesses={playerGuesses}
              currentPlayer={currentPlayer}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default NHLGame;
