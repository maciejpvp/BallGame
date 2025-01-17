export const levels = [
  {
    times: {
      forTwoStars: 20,
      forThreeStars: 10,
      hackerTime: 2,
    },
    blocks: [
      {
        objects: [
          {
            type: "platform",
            speed: 1,
            position: [0, 0, 1],
            startPosition: -1,
          },
          {
            type: "platform",
            speed: 1,
            position: [0, 0, -0.5],
            startPosition: 1,
            reverse: true,
          },
        ],
      },
      {
        objects: [
          {
            type: "laser",
            position: [0, 0, 2],
            speed: 1,
            startPosition: 0,
          },
          {
            type: "laser",
            position: [0, 0, 2],
            speed: 1,
            startPosition: 3.14,
          },
          {
            type: "floor",
            position: [0, -0.5, 1],
            scale: [4, 1, 2],
          },
        ],
      },
      {
        objects: [
          {
            type: "spinner",
            // position: [],
            speed: 1,
            startPosition: 0,
            position: [0, 0, 1.5],
            width: 2.5,
          },
          {
            type: "floor",
            position: [0, -0.5, 1.5],
            scale: [3, 1, 3],
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
            type: "laser",
            position: [0, 0, 0],
            speed: 2,
            startPosition: 3.1,
          },
          {
            type: "laser",
            position: [0, 0, -1],
            speed: 2,
            startPosition: 2.9,
          },
          {
            type: "laser",
            position: [0, 0, -2],
            speed: 2,
            startPosition: 2.7,
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
            type: "laser",
            position: [0, 0, 0],
            speed: 2,
            startPosition: 2.5,
          },
          {
            type: "laser",
            position: [0, 0, -1],
            speed: 2,
            startPosition: 2.3,
          },
          {
            type: "laser",
            position: [0, 0, -2],
            speed: 2,
            startPosition: 2.1,
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
            type: "laser",
            position: [0, 0, 0],
            speed: 2,
            startPosition: 1.9,
          },
        ],
      },
    ],
  },
];
