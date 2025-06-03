"use client";

import React, { useEffect, useState } from "react";

const StarryNight: React.FC = () => {
  const [stars, setStars] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const starCount = 200;
      const newStars = [];

      for (let i = 0; i < starCount; i++) {
        const animationDelay = `${Math.random() * 5}s`;
        const animationDuration = `${Math.random() * 3 + 2}s`;

        const style = {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay,
          animationDuration,
        };

        newStars.push(
          <div
            key={i}
            className="absolute bg-white rounded-full w-2 h-2 animate-twinkle"
            style={style}
          />
        );
      }

      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
      {stars}
    </div>
  );
};

export default StarryNight;
