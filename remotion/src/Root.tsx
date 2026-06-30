import { Composition } from "remotion";
import { DatabaseVideo } from "./DatabaseVideo";

export const RemotionRoot = () => (
  <Composition
    id="main"
    component={DatabaseVideo}
    durationInFrames={180}
    fps={30}
    width={1280}
    height={720}
  />
);
