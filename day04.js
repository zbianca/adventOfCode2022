const {
  datefy,
} = require('./utils');

const data = datefy(4, x => x.split(',').map(c => c.split('-').toIntArray()));
const example = [
  [[2, 4], [6, 8]],
  [[2, 3], [4, 5]],
  [[5, 7], [7, 9]],
  [[2, 8], [3, 7]],
  [[6, 6], [4, 6]],
  [[2, 6], [4, 8]],
];

function inRange(n, b, e) {
  return n >= b && n <= e;
}

function fullyContained(pairs) {
  let count = 0;

  for (const pair of pairs) {
    const [a, b] = pair[0];
    const [c, d] = pair[1];

    if ((inRange(a, c, d) && inRange(b, c, d)) || (inRange(c, a, b) && inRange(d, a, b))) {
      count+= 1;
    }
  }

  return count;
}

console.log(fullyContained(example)); // -> 2
console.log(fullyContained(data)); // -> 487

function contained(pairs) {
  let count = 0;

  for (const pair of pairs) {
    const [a, b] = pair[0];
    const [c, d] = pair[1];

    if (inRange(a, c, d) || inRange(b, c, d) || inRange(c, a, b) || inRange(d, a, b)) {
      count+= 1;
    }
  }

  return count;
}

console.log(contained(example)); // -> 4
console.log(contained(data)); // -> 849