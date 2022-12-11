const { datefy } = require("./utils");

const data = datefy(10, (x) =>
  x === "noop" ? null : parseInt(x.split(" ")[1], 10)
);

function saveCycles(cmds) {
  const cycles = [0, 1];

  for (let i = 0; i < cmds.length; i++) {
    const cmd = cmds[i];
    const last = cycles.at(-1);
    if (cmd === null) cycles.push(last);
    else cycles.push(last, last + cmd);
  }

  return cycles;
}

function cyclePower(cmds) {
  const cyclesX = saveCycles(cmds);
  let sum = 0;

  for (let cycle = 20; cycle <= 220; cycle += 40) {
    sum += cyclesX[cycle] * cycle;
  }

  return sum;
}

console.log(cyclePower(data)); // -> 13480

function paintCycles(cmds) {
  const cyclesX = saveCycles(cmds);
  const result = Array.from({ length: 6 }, () => new Array(40).fill(" "));

  for (let y = 0; y < 240; y++) {
    const curX = cyclesX[y + 1];
    if ([curX - 1, curX, curX + 1].includes(y % 40)) {
      result[Math.trunc(y / 40)][y % 40] = "#";
    }
  }

  for (line of result) {
    console.log(line.join(""));
  }
}

paintCycles(data); // -> EGJBGCFK
