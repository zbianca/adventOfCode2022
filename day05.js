const {
  datefy,
  identity,
  range,
} = require('./utils');

const data = datefy(5, identity, '\n\n');

function pilesToArrays(piles) {
  const lists = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
  }

  for (const pile of piles) {
    let cur = 1;
    for (let i = 1; i < 34; i+=4) {
      lists[cur].push(pile[i]);
      cur+= 1;
    }
  }

  for (const idx of range(1, 10)) {
    lists[idx] = lists[idx].filter(x => x !== " ").reverse();
  }

  return lists;
}

function reorder([piles, moves]) {
  let result = '';
  const regex = /\d+/g;
  piles = pilesToArrays(piles.split('\n').slice(0,-1));
  moves = moves.split('\n').map(x => x.match(regex).map(x => parseInt(x, 10)))

  for (const move of moves) {
    let [amount, origin, dest] = move;
    while (amount > 0) {
      piles[dest].push(piles[origin].pop())
      amount-= 1;
    }
  }

  for (const idx of range(1, 10)) {
    result+= piles[idx].at(-1);
  }

  return result;
}

console.log(reorder(data)); // -> 'PSNRGBTFT'

function reorder2([piles, moves]) {
  let result = '';
  const regex = /\d+/g;
  piles = pilesToArrays(piles.split('\n').slice(0,-1));
  moves = moves.split('\n').map(x => x.match(regex).map(x => parseInt(x, 10)))

  for (const move of moves) {
    let [amount, origin, dest] = move;
    const newItems = [];
    for (const i of range(0, (amount))) {
      newItems.unshift(piles[origin].pop());
    }
    piles[dest] = [...piles[dest], ...newItems];
  }

  for (const idx of range(1, 10)) {
    result+= piles[idx].at(-1);
  }

  return result;
}

console.log(reorder2(data)); // -> 'BNTZFPMMW'