const {
  datefy,
  identity,
  range,
} = require('./utils');

const data = datefy(5, identity, '\n\n');

const revertStr = str => str.split('').reverse().join('');

function pilesToArrays(piles) {
  const lists = new Array(10).fill("");

  for (const pile of piles) {
    let cur = 1;
    for (let i = 1; i < 34; i+=4) {
      if (pile[i] !== " ") lists[cur] += pile[i];
      cur+= 1;
    }
  }

  for (let idx of range(1, 10)) {
    lists[idx] = revertStr(lists[idx]);
  }

  return lists;
}

function reorder([piles, moves], part2 = false) {
  let result = '';
  const regex = /\d+/g;
  piles = pilesToArrays(piles.split('\n').slice(0,-1));
  moves = moves.split('\n').map(x => x.match(regex).map(x => parseInt(x, 10)))

  for (const move of moves) {
    let [amount, origin, dest] = move;
    if (part2) {
      piles[dest]+= piles[origin].substring(piles[origin].length - amount);
    } else {
      piles[dest]+= revertStr(piles[origin].substring(piles[origin].length - amount));
    }
    piles[origin] = piles[origin].substring(0, piles[origin].length - amount)
  }

  for (const idx of range(1, 10)) {
    result+= piles[idx].at(-1);
  }

  return result;
}

console.log(reorder(data)); // -> 'PSNRGBTFT'
console.log(reorder(data, true)); // -> 'BNTZFPMMW'