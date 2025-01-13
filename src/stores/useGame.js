import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const useGame = create(
  subscribeWithSelector((set) => {
    return {
      blocksCount: 10,
      startTime: 0,
      endTime: 0,

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
