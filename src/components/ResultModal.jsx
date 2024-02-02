import PropTypes from "prop-types";
import React from "react";

function ResultModal({
  currentPlayer,
  victory,
  display,
  playerGuesses,
  restartGame
}) {
  function checkNHLGuess(player) {
    const booleanAttributes = {
      team: player.playerTeam.abbrev === currentPlayer.playerTeam.abbrev,
      conference:
        player.playerTeam.conference === currentPlayer.playerTeam.conference,
      division:
        player.playerTeam.division === currentPlayer.playerTeam.division,
      position: player.positionCode === currentPlayer.positionCode,
      shoots: player.shootsCatches === currentPlayer.shootsCatches,
      age:
        player.currentAge === currentPlayer.currentAge
          ? "🟩"
          : Math.abs(player.currentAge - currentPlayer.currentAge) <= 3
            ? "🟨"
            : "⬜️",
      nationality: player.birthCountry === currentPlayer.birthCountry,
      number:
        player.sweaterNumber === currentPlayer.sweaterNumber
          ? "🟩"
          : Math.abs(player.sweaterNumber - currentPlayer.sweaterNumber) <= 3
            ? "🟨"
            : "⬜️"
    };
    const resultArray = Object.values(booleanAttributes).map((value) =>
      typeof value === "string" ? value : value ? "🟩" : "⬜️"
    );
    return resultArray.join(" ");
  }
  return (
    <div
      className={`${
        display ? "flex" : "hidden"
      } w-full h-full justify-center items-center absolute top-0 left-0 z-20`}
    >
      <div className="flex items-center justify-center w-full h-full text-center bg-black bg-opacity-70">
        <div className="w-full h-full md:h-fit md:w-fit grid grid-cols-2 gap-2 items-center p-4 my-auto bg-main md:rounded-lg">
          {(victory || playerGuesses.length >= 8) && (
            <>
              <div className="flex flex-col justify-center aspect-square shadow-md rounded-lg col-span-2 md:col-span-1">
                <div className="font-bold text-lg">Correct answer</div>
                <div className="grid place-content-center font-bold text-lg p-4">
                  <img
                    className="max-h-64 max-w-64"
                    src={currentPlayer.headshot}
                  ></img>
                  <h2>{currentPlayer.fullName}</h2>
                </div>
              </div>
              <div className="flex flex-col justify-center aspect-square shadow-md rounded-lg col-span-2 md:col-span-1">
                <div className="font-bold text-lg">Your result</div>
                <div className="grid place-content-center font-bold text-lg p-4">
                  <p className="text-md md:text-2xl">
                    {playerGuesses.map((playerObject, index) => {
                      return (
                        <React.Fragment key={index}>
                          {checkNHLGuess(playerObject)}
                          <br />
                        </React.Fragment>
                      );
                    })}
                  </p>
                </div>
              </div>
              {victory && (
                <div className="w-full font-bold text-lg col-span-2">
                  <p>
                    You got it right in: {playerGuesses.length} guess
                    {playerGuesses.length > 1 ? "es" : ""}!
                  </p>
                </div>
              )}
              <div className="flex h-10 max-h-full w-full mt-2 justify-center col-span-2">
                <button
                  className="rounded-full border-2 border-stone-900 h-full w-1/2 cursor-pointer"
                  onClick={restartGame}
                >
                  Restart
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

ResultModal.propTypes = {
  currentPlayer: PropTypes.shape({
    birthCountry: PropTypes.string,
    currentAge: PropTypes.number,
    fullName: PropTypes.string,
    headshot: PropTypes.string,
    playerTeam: PropTypes.shape({
      abbrev: PropTypes.string,
      conference: PropTypes.string,
      division: PropTypes.string
    }),
    positionCode: PropTypes.string,
    shootsCatches: PropTypes.string,
    sweaterNumber: PropTypes.number
  }),
  display: PropTypes.bool,
  playerGuesses: PropTypes.array,
  restartGame: PropTypes.func,
  victory: PropTypes.bool
};

export default ResultModal;
