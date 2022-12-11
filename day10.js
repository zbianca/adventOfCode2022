const {
  datefy
} = require('./utils');

const data = datefy(10);

function cyclePower(cmds) {
  let sum = 0;
  let x = 1;
  let cycle = 1;

  const checkCycle = () => {
    if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
      sum += x * cycle;
    }
  }

  for (let cmd of cmds) {
    if (cmd === 'noop') {
      cycle+= 1;
      checkCycle();
    } else {
      cycle+= 1;
      checkCycle();
      cycle+= 1;
      x+= parseInt(cmd.split(' ')[1], 10);
      checkCycle();
    }
  }

  return sum;
}

console.log(cyclePower(data)); // -> 13480

function saveCycles(cmds) {
  let x = 1;
  let cycle = 1;

  const cycles = {
    1: 1,
  }

  for (let cmd of cmds) {
    if (cmd === 'noop') {
      cycle+= 1;
      cycles[cycle] = x;
    } else {
      cycle+= 1;
      cycles[cycle] = x;
      cycle+= 1;
      x+= parseInt(cmd.split(' ')[1], 10);
      cycles[cycle] = x;
    }
  }

  return cycles;

}
function paintCycles(cmds) {
  const cyclesX = saveCycles(cmds);
  const result = Array.from({length: 6}, () => new Array(40).fill(' '));

  for (let y = 0; y < 240; y++) {
    const curX = cyclesX[y + 1];
    const observe = [curX - 1, curX, curX + 1];
    if (observe.includes(y % 40)) {
      result[Math.trunc(y / 40)][y % 40] = '#';
    }
  }

  for (line of result) {
    console.log(line.join(''));
  }
}

paintCycles(data); // -> EGJBGCFK
