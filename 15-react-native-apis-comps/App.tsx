import React from "react";
import AppAnimation01 from "./AppAnimation01";
import AppAnimation02 from "./AppAnimation02";
import AppEasing from "./AppEasing";
import ProgressBar from "./AppProgressBar";
import AppProgressBar from "./AppProgressBar";
import Stagger from "./Stagger";

export default () =>
(<ProgressBar min={0} max={100} onFinish={() => console.log("Finished")}/>)