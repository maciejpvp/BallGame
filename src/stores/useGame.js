import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { levels } from "../Levels";

const useGame = create(
  subscribeWithSelector((set) => {
    return {
      selectedLevelID: 0,
      blocksCount: levels[0].blocks.length,
      startTime: 0,
      endTime: 0,
      playerRef: undefined,

      setPlayer: (ref) => {
        set((state) => {
          if (state.playerRef) return {};
          return { playerRef: ref };
        });
      },

      phase: "ready",
      start: () => {
        set((state) => {
          if (state.phase !== "ready") return {};
          return { phase: "playing", startTime: Date.now() };
        });
      },
      restart: () => {
        set((state) => {
          if (state.phase === "ready") return {};
          return { phase: "ready" };
        });
      },
      end: () => {
        set((state) => {
          if (state.phase === "playing")
            return { phase: "ended", endTime: Date.now() };
          return {};
        });
      },
    };
  })
);

export default useGame;
