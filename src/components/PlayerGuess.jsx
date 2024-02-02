import PropTypes from "prop-types";
import React from "react";

function PlayerGuess({ player, currentPlayer }) {
  function getVerboseConference(conf) {
    switch (conf) {
      case "W":
        return "West";
      case "E":
        return "East";
    }
  }

  function getVerbosePosition(pos) {
    switch (pos) {
      case "L":
        return "LW";
      case "R":
        return "RW";
      default:
        return pos;
    }
  }

  function getVerboseDivision(div) {
    switch (div) {
      case "A":
        return "ATL";
      case "C":
        return "CEN";
      case "M":
        return "MET";
      case "P":
        return "PAC";
    }
  }

  const teamImg = player.playerTeam.logo;
  const booleanFields = {
    team: player.playerTeam.abbrev === currentPlayer.playerTeam.abbrev,
    conference:
      player.playerTeam.conference === currentPlayer.playerTeam.conference,
    division: player.playerTeam.division === currentPlayer.playerTeam.division,
    position: player.positionCode === currentPlayer.positionCode,
    shoots: player.shootsCatches === currentPlayer.shootsCatches,
    age: player.currentAge === currentPlayer.currentAge,
    ageIsClose: Math.abs(player.currentAge - currentPlayer.currentAge) <= 3,
    nationality: player.birthCountry === currentPlayer.birthCountry,
    number: player.sweaterNumber === currentPlayer.sweaterNumber,
    numberIsClose:
      Math.abs(player.sweaterNumber - currentPlayer.sweaterNumber) <= 3
  };
  return (
    <>
      <div className="w-full grid grid-cols-8 lg:grid-cols-10 gap-1 lg:gap-2 my-1 text-sm">
        <div
          className={`flex items-center col-span-8 lg:col-span-2 justify-center rounded-lg font-semibold p-2 lg:p-4 lg:border-2 lg:border-black`}
        >
          <p className="text-center">
            <strong>{player.fullName}</strong>
          </p>
        </div>
        <div
          className={`flex items-center justify-center rounded-lg font-semibold border-2 border-black ${booleanFields.team && "bg-green-600"}`}
        >
          <div className="flex flex-col">
            <img className="h-8 w-8" src={teamImg}></img>
            <span>
              <strong>{player.playerTeam.abbrev}</strong>
            </span>
          </div>
        </div>
        <div
          className={`flex items-center justify-center rounded-lg font-semibold p-4 border-2 border-black ${booleanFields.conference && "bg-green-600"}`}
        >
          {getVerboseConference(player.playerTeam.conference)}
        </div>
        <div
          className={`flex items-center justify-center rounded-lg font-semibold p-4 border-2 border-black ${booleanFields.division && "bg-green-600"}`}
        >
          {getVerboseDivision(player.playerTeam.division)}
        </div>
        <div
          className={`flex items-center justify-center rounded-lg font-semibold p-4 border-2 border-black ${booleanFields.position && "bg-green-600"}`}
        >
          {getVerbosePosition(player.positionCode)}
        </div>
        <div
          className={`flex items-center justify-center rounded-lg font-semibold p-4 border-2 border-black ${booleanFields.shoots && "bg-green-600"}`}
        >
          {player.shootsCatches}
        </div>
        <div
          className={`flex items-center justify-center rounded-lg font-semibold p-4 border-2 border-black ${booleanFields.age ? "bg-green-600" : booleanFields.ageIsClose ? "bg-yellow-300" : ""}`}
        >
          {player.currentAge}
          {player.currentAge > currentPlayer.currentAge ? (
            <span>&#8595;</span>
          ) : player.currentAge < currentPlayer.currentAge ? (
            <span>&#8593;</span>
          ) : (
            ""
          )}
        </div>
        <div
          className={`flex items-center justify-center rounded-lg font-semibold p-4 border-2 border-black ${booleanFields.nationality && "bg-green-600"}`}
        >
          {player.birthCountry}
        </div>
        <div
          className={`flex items-center justify-center rounded-lg font-semibold p-4 border-2 border-black ${booleanFields.number ? "bg-green-600" : booleanFields.numberIsClose ? "bg-yellow-300" : ""}`}
        >
          {player.sweaterNumber}
          {parseInt(player.sweaterNumber) >
          parseInt(currentPlayer.sweaterNumber) ? (
            <span>&#8595;</span>
          ) : parseInt(player.sweaterNumber) <
            parseInt(currentPlayer.sweaterNumber) ? (
            <span>&#8593;</span>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

PlayerGuess.propTypes = {
  currentPlayer: PropTypes.shape({
    birthCountry: PropTypes.string,
    currentAge: PropTypes.number,
    playerTeam: PropTypes.shape({
      abbrev: PropTypes.string,
      conference: PropTypes.string,
      division: PropTypes.string
    }),
    positionCode: PropTypes.string,
    shootsCatches: PropTypes.string,
    sweaterNumber: PropTypes.number
  }),
  player: PropTypes.shape({
    birthCountry: PropTypes.string,
    currentAge: PropTypes.number,
    fullName: PropTypes.string,
    playerTeam: PropTypes.shape({
      abbrev: PropTypes.string,
      conference: PropTypes.string,
      division: PropTypes.string,
      logo: PropTypes.string
    }),
    positionCode: PropTypes.string,
    shootsCatches: PropTypes.string,
    sweaterNumber: PropTypes.number
  })
};

export default PlayerGuess;
