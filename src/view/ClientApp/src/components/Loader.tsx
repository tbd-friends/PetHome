import React from "react";

import LoaderIcon from "../images/loaders/default.svg";

interface LoaderProps {
  defaultLoader?: boolean;
  radius?: number;
}

export const Loader: React.FC<LoaderProps> = ({ defaultLoader, radius }) =>
  defaultLoader ? (
    <div className="loader">
      <img src={LoaderIcon} alt="loading..." />
    </div>
  ) : (
    <div className="laoder-roll" style={{ width: radius, height: radius }} />
  );
