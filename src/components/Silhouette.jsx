import PropTypes from "prop-types";
import React from "react";

function Silhouette({ display, headShot, setShowSilhouette }) {
  if (display) {
    return (
      <div
        className="grid place-content-center absolute z-20 h-full w-full bg-black bg-opacity-70"
        onClick={() => setShowSilhouette(false)}
      >
        <div className="grid gap-2 place-content-center bg-white rounded-lg h-96 aspect-square">
          <img
            className="max-h-64 max-w-64 filter contrast-0"
            src={headShot}
            alt="Mystery Player"
          ></img>
          <p className="text-center font-extrabold text-xl">
            Who is this <br /> MYSTERY PLAYER?
          </p>
        </div>
      </div>
    );
  }
}

Silhouette.propTypes = {
  display: PropTypes.bool,
  headShot: PropTypes.string,
  setShowSilhouette: PropTypes.func
};
export default Silhouette;
