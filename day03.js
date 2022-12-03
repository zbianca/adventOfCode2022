const {
  datefy,
} = require('./utils');

const data = datefy(3);
const example = ['vJrwpWtwJgWrhcsFMMfFFhFp', 'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL', 'PmmdzqPrVvPwwTWBwg', 'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn', 'ttgJtRGJQctTZtZT', 'CrZsJsPPZsGzwwsLwLmpwMDw'];

const getPrio = (char) => char === char.toUpperCase() ? char.charCodeAt(0) - 38 : char.charCodeAt(0) - 96;

function prioSum(packs) {
  let sum = 0;

  for (const pack of packs) {
    const limit = pack.length / 2;
    const pocket = new Set();

    for (const char of pack.substring(0, limit)) {
      pocket.add(char);
    }

    for (const char of pack.substring(limit)) {
      if (pocket.has(char)) {
        sum += getPrio(char);
        break;
      }
    }
  }

  return sum;
}

console.log(prioSum(example)); // -> 157
console.log(prioSum(data)); // -> 7737

function groupPrioSum(packs) {
  let sum = 0;

  for (let i = 0; i < packs.length; i += 3) {
    const pocket = new Set();
    const pocket2 = new Set();

    for (const char of packs[i]) {
      pocket.add(char);
    }

    for (const char of packs[i + 1]) {
      if (pocket.has(char)) {
        pocket2.add(char);
      }
    }

    for (const char of packs[i + 2]) {
      if (pocket2.has(char)) {
        sum += getPrio(char);
        break;
      }
    }
  }

  return sum;
}
console.log(groupPrioSum(example)); // -> 70
console.log(groupPrioSum(data)); // -> 2697