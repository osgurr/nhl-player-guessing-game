import { useState, useMemo } from "react";
import PropTypes from "prop-types";

function SearchBar({
  setCurrentGuess,
  setShowTutorial,
  guessesLength,
  playersData,
  getPlayerById
}) {
  const placeholder = `Guess ${guessesLength} of 8`;
  const [searchInput, setSearchInput] = useState("");
  const players = useMemo(
    () =>
      playersData.map((player) => {
        player.searchName = player.fullName.toLowerCase();
        return player;
      }),
    [playersData]
  );
  const searchResult = useMemo(() => {
    if (searchInput.length > 2) {
      let data = players?.filter((player) => {
        return player.searchName.match(searchInput.toLowerCase());
      });
      return data;
    }
  }, [searchInput]);

  async function handlePlayerClick(id) {
    const player = getPlayerById(id);
    setCurrentGuess(player);
    setSearchInput("");
  }

  return (
    <div className="relative flex w-full h-12 items-center justify-center">
      <input
        className="h-full w-full text-center text-2xl border-2 border-black rounded-full bg-gray-50 relative"
        type="text"
        placeholder={placeholder}
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
      />
      <button
        className="absolute right-1 h-10 w-10 rounded-full border-2 border-black aspect-square font-semibold hover:bg-gray-100"
        onClick={() => setShowTutorial((currState) => !currState)}
      >
        ?
      </button>
      {searchResult !== undefined && (
        <div className="absolute w-11/12 top-full mt-2 max-h-48 overflow-y-auto overflow-x-hidden border-2 border-black rounded-xl no-scrollbar z-10">
          {searchResult.length > 0 ? (
            <>
              {searchResult?.map((result, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center bg-white w-full h-12 m-auto p-0 hover:bg-gray-50 hover:cursor-pointer"
                  onClick={() => handlePlayerClick(result.id)}
                >
                  {result.fullName}
                </div>
              ))}
            </>
          ) : (
            <div className="flex items-center justify-center bg-white w-full h-12 m-auto p-0 hover:bg-gray-50 hover:cursor-pointer">
              No players found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

SearchBar.propTypes = {
  getPlayerById: PropTypes.func,
  guessesLength: PropTypes.number,
  playersData: PropTypes.array,
  setCurrentGuess: PropTypes.func,
  setShowTutorial: PropTypes.func
};

export default SearchBar;
