export const level3 = {
  times: {
    forTwoStars: 60,
    forThreeStars: 30,
    hackerTime: 20,
  },
  blocks: [
    {
      objects: [
        {
          type: "platform",
          speed: 1,
          position: [0, 0, 1],
          startPosition: -0.4,
        },
        {
          type: "platform",
          speed: 1,
          position: [0, 0, -0.5],
          startPosition: 0.8,
          reverse: true,
        },
        {
          type: "platform",
          speed: 1,
          position: [0, 0, -2],
          startPosition: 2,
          reverse: true,
        },
      ],
    },
    {
      objects: [
        {
          type: "laser",
          position: [0, 0, 1.5],
          speed: 2,
          startPosition: 1.9,
        },

        {
          type: "platform",
          speed: 1,
          position: [0, 0, 1],
          startPosition: -0.6,
        },
        {
          type: "platform",
          speed: 1,
          position: [0, 0, -0.5],
          startPosition: 1.4,
          reverse: true,
        },
      ],
    },
    {
      objects: [
        {
          type: "floor",
          position: [0, -0.5, 1],
          scale: [4, 1, 4],
        },
        {
          type: "spinner",
          position: [0, 0, 2],
          speed: 2,
          width: 4,
          startPosition: 2.5,
        },
        {
          type: "spinner",
          position: [1, 0, 0],
          speed: 2,
          width: 1.5,
          startPosition: 2.3,
        },
        {
          type: "spinner",
          position: [-1, 0, 0],
          speed: 2,
          width: 1.5,
          startPosition: 2.3,
        },
      ],
    },
    {
      objects: [
        {
          type: "floor",
          position: [1, -0.5, 2],
          scale: [1, 1, 1],
        },
        {
          type: "floor",
          position: [-1, -0.5, 2],
          scale: [1, 1, 1],
        },
        {
          type: "floor",
          position: [0, -0.4, 0.5],
          scale: [1, 1, 1],
        },
        {
          type: "floor",
          position: [1.2, -0.3, -0.7],
          scale: [1, 1, 1],
        },
        {
          type: "floor",
          position: [-1.2, -0.3, -0.7],
          scale: [1, 1, 1],
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
          type: "laser",
          position: [0, 0, 1],
          speed: 3,
          startPosition: 2,
          range: 0.3,
          width: 3.3,
        },
        {
          type: "laser",
          position: [0, 0, 0.3],
          speed: 3,
          startPosition: 0,
          range: 0.3,
          width: 3.3,
        },
        {
          type: "laser",
          position: [0, 0, -0.4],
          speed: 3,
          startPosition: 1,
          range: 0.3,
          width: 3.3,
        },
      ],
    },
  ],
};
