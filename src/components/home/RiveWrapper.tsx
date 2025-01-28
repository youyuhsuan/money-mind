import React from "react";
import { useRive, Layout, Fit } from "@rive-app/react-canvas";

const RiveWrapper = () => {
  const { RiveComponent } = useRive({
    src: "/animations/isocube.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Fill,
    }),
    onLoadError: (err) => {
      console.error("Rive load error:", err);
    },
    onLoad: () => {
      console.log("Rive file loaded successfully");
    },
  });

  return <RiveComponent />;
};

export default RiveWrapper;
