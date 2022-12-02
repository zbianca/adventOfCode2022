const {
  datefy
} = require('./utils');

const data = datefy(1, x => x.split("\n").toIntArray().sum(), "\n\n");
const example = [[1000, 2000, 3000],[4000],[5000, 6000],[7000, 8000, 9000], [10000]].map(x => x.sum());

function mostCalories(list) {
  return list.max();
}

console.log(mostCalories(example)); // -> 24000
console.log(mostCalories(data)); // -> 69206

function topMostCalories(list) {
  const top = [...list].sort((a,b) => b - a);
  return top[0] + top[1] + top[2];
}

console.log(topMostCalories(example)); // -> 45000
console.log(topMostCalories(data)); // -> 197400