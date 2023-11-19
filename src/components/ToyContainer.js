// ToyContainer.js

import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onDonateClick, onLikeClick }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          onDonateClick={onDonateClick}
          onLikeClick={onLikeClick}
        />
      ))}
    </div>
  );
}

export default ToyContainer;
