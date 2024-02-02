import PropTypes from "prop-types";
import React from "react";

function Tutorial({ display, setShowTutorial }) {
  if (display) {
    return (
      <div
        className="grid place-content-center absolute z-20 h-full w-full bg-black bg-opacity-70"
        onClick={() => setShowTutorial(false)}
      >
        <div className="grid gap-2 place-content-around bg-main rounded-lg p-6 text-lg md:p-2 md:h-96 md:aspect-video">
          <ul className="leading-10 list-disc">
            <li>You have 8 tries to guess the correct mystery player!</li>
            <li>
              <span className="bg-green-600 font-bold p-1 rounded-md">
                Green
              </span>{" "}
              means that the field is correct
            </li>
            <li>
              <span className="bg-yellow-300 font-bold p-1 rounded-md">
                Yellow
              </span>{" "}
              means that the field is close (within 3 digits)
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Tutorial.propTypes = {
  display: PropTypes.bool,
  setShowTutorial: PropTypes.func
};

export default Tutorial;
