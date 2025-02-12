import React from "react";
import { useRive, Layout, Fit } from "@rive-app/react-canvas";

interface RiveWrapperProps {
  src: string;
}

const RiveWrapper = ({ src }: RiveWrapperProps) => {
  const { RiveComponent } = useRive({
    src: src,
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
