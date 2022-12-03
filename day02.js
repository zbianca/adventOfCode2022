const {
  datefy
} = require('./utils');

const data = datefy(2, x => x.split(" "));
const example = [['A', 'Y'], ['B', 'X'], ['C', 'Z']];

const points = {
  X: 1,
  Y: 2,
  Z: 3,
  boo: 0,
  tie: 3,
  win: 6,
}

function getScore(games) {
  let score = 0;

  const myPlay = {
    A: {
      X: points.tie + points.X,
      Y: points.win + points.Y,
      Z: points.boo + points.Z,

    },
    B: {
      X: points.boo + points.X,
      Y: points.tie + points.Y,
      Z: points.win + points.Z,
    },
    C: {
      X: points.win + points.X,
      Y: points.boo + points.Y,
      Z: points.tie + points.Z,
    },
  }

  for (const [p1, p2] of games) {
    score += myPlay[p1][p2];
  }

  return score;
}

console.log(getScore(example)); // -> 15
console.log(getScore(data)); // -> 12794

function getScore2(games) {
  let score = 0;

  const myPlay = {
    A: {
      X: points.boo + points.Z,
      Y: points.tie + points.X,
      Z: points.win + points.Y,

    },
    B: {
      X: points.boo + points.X,
      Y: points.tie + points.Y,
      Z: points.win + points.Z,
    },
    C: {
      X: points.boo + points.Y,
      Y: points.tie + points.Z,
      Z: points.win + points.X,
    },
  }

  for (const [p1, p2] of games) {
    score += myPlay[p1][p2];
  }

  return score;
}

console.log(getScore2(example)); // -> 12
console.log(getScore2(data)); // -> 14979