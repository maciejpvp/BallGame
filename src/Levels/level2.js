export const level2 = {
  times: {
    forTwoStars: 60,
    forThreeStars: 30,
    hackerTime: 20,
  },
  blocks: [
    {
      objects: [
        {
          type: "floor",
          position: [1, -0.5, 1],
          scale: [1, 1, 1],
        },
        {
          type: "floor",
          position: [1, -0.1, -1],
          scale: [1, 1, 1],
        },
        {
          type: "laser",
          position: [1, 0.36, -1],
          speed: 3,
          startPosition: 0,
          range: 0.3,
          width: 1,
        },
        {
          type: "floor",
          position: [-0.5, -0.1, -1],
          scale: [1, 2, 1],
        },
      ],
    },
    {
      objects: [
        {
          type: "floor",
          position: [-0.5, 0.3, 1],
          scale: [1, 2, 1],
        },
      ],
    },
    {
      objects: [
        {
          type: "floor",
          position: [0, -0.5, 0],
          scale: [3.5, 1, 3.5],
        },
        {
          type: "spinner",
          width: 3.4,
        },
      ],
    },
    {
      objects: [
        {
          type: "platform",
          speed: 1,
          position: [0, 0, -(4 * 4)],
          startPosition: 0,
          round: true,
        },
        {
          type: "platform",
          speed: 1,
          position: [0, 0, -(4 * 4)],
          startPosition: 5.5,
          round: true,
        },
      ],
    },
  ],
};
