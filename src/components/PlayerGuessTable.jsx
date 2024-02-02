import PropTypes from "prop-types";
import PlayerGuess from "./PlayerGuess";
import React from "react";

const columnHeaders = [
  { label: "TEAM" },
  { label: "CONF" },
  { label: "DIV" },
  { label: "POS" },
  { label: "HAND" },
  { label: "AGE" },
  { label: "NAT" },
  { label: "#" }
];

function PlayerGuessTable({ playerGuesses, currentPlayer }) {
  return (
    <>
      <div className="w-full sticky bg-main z-0 top-0 grid grid-cols-8 lg:grid-cols-10 gap-1 lg:gap-2 my-1 text-sm border-b-2 border-black">
        <div className="hidden lg:block col-span-2"></div>
        {columnHeaders.map((header, index) => (
          <div
            key={index}
            className="flex items-center justify-center rounded-lg font-semibold p-4"
          >
            {header.label}
          </div>
        ))}
      </div>
      {playerGuesses.map((player, index) => (
        <PlayerGuess
          key={index}
          player={player}
          currentPlayer={currentPlayer}
        />
      ))}
    </>
  );
}

PlayerGuessTable.propTypes = {
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
  playerGuesses: PropTypes.array
};

export default PlayerGuessTable;
