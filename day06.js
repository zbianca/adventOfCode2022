const {
  datefy
} = require('./utils');

const data = datefy(6)[0];

function findFirstMarker(stream, length = 4) {
  const charMap = new Map();

  for (let i = 0; i < length - 1; i++) {
    const char = stream[i];
    charMap.set(char, (charMap.get(char) ?? 0) + 1);
  }

  for (let i = length - 1; i < stream.length; i++) {
    const cur = stream[i];
    charMap.set(cur, (charMap.get(cur) ?? 0) + 1);
    if (charMap.size === length) return i + 1;
    const toRemove = stream[i - length + 1];
    const newAmount = charMap.get(toRemove) - 1;
    if (newAmount === 0) charMap.delete(toRemove);
    else charMap.set(toRemove, newAmount);
  }
}

console.log(findFirstMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb')); // -> 7
console.log(findFirstMarker('bvwbjplbgvbhsrlpgdmjqwftvncz')); // -> 5
console.log(findFirstMarker(data)); // -> 1920
console.log(findFirstMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14)); // -> 19
console.log(findFirstMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', 14)); // -> 23
console.log(findFirstMarker(data, 14)); // -> 2334