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

      phase: "mainmenu", //ready
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
      nextLevel: () => {
        set((state) => {
          if (levels.length <= state.selectedLevelID + 1) {
            return {
              selectedLevelID: 0,
              blocksCount: levels[0].blocks.length,
              phase: "ready",
            };
          }
          return {
            selectedLevelID: state.selectedLevelID + 1,
            blocksCount: levels[state.selectedLevelID + 1].blocks.length,
            phase: "ready",
          };
        });
      },
      selectLevel: (levelID) => {
        console.log(levelID);
        set(() => {
          return {
            selectedLevelID: levelID,
            blocksCount: levels[levelID].blocks.length,
            phase: "ready",
          };
        });
      },
    };
  })
);

export default useGame;
