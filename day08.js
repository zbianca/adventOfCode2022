const { datefy } = require("./utils");

const data = datefy(8);
const example = ["30373", "25512", "65332", "33549", "35390"];

function visibleAmount(lines) {
  let visible = 0;
  const height = lines.length;
  const width = lines[0].length;

  for (let x = 1; x < width - 1; x++) {
    for (let y = 1; y < height - 1; y++) {
      const cur = lines[y][x];
      let done = false;

      let x2 = x - 1;
      while (!done && x2 >= 0) {
        if (cur <= lines[y][x2]) break;
        if (x2 === 0) {
          visible += 1;
          done = true;
        }
        x2 -= 1;
      }

      let y2 = y - 1;
      while (!done && y2 >= 0) {
        if (cur <= lines[y2][x]) break;
        if (y2 === 0) {
          visible += 1;
          done = true;
        }
        y2 -= 1;
      }

      x2 = x + 1;
      while (!done && x2 < width) {
        if (cur <= lines[y][x2]) break;
        if (x2 === width - 1) {
          visible += 1;
          done = true;
        }
        x2 += 1;
      }

      y2 = y + 1;
      while (!done && y2 < height) {
        if (cur <= lines[y2][x]) break;
        if (y2 === height - 1) {
          visible += 1;
          done = true;
        }
        y2 += 1;
      }
    }
  }

  return visible + 2 * width + 2 * height - 4;
}

console.log(visibleAmount(example)); // -> 21
console.log(visibleAmount(data)); // ->1676

function betterView(lines) {
  let score = 0;
  const height = lines.length;
  const width = lines[0].length;

  for (let x = 1; x < width - 1; x++) {
    for (let y = 1; y < height - 1; y++) {
      const cur = lines[y][x];

      let count = 0;
      let left = 1;
      let right = 1;
      let top = 1;
      let bottom = 1;

      let x2 = x - 1;
      while (x2 >= 0) {
        count += 1;
        if (cur <= lines[y][x2] || x2 === 0) {
          left = count;
          count = 0;
          break;
        }
        x2 -= 1;
      }

      let y2 = y - 1;
      while (y2 >= 0) {
        count += 1;
        if (cur <= lines[y2][x] || y2 === 0) {
          top = count;
          count = 0;
          break;
        }
        y2 -= 1;
      }

      x2 = x + 1;
      while (x2 < width) {
        count += 1;
        if (cur <= lines[y][x2] || x2 === width - 1) {
          right = count;
          count = 0;
          break;
        }
        x2 += 1;
      }

      y2 = y + 1;
      while (y2 < height) {
        count += 1;
        if (cur <= lines[y2][x] || y2 === height - 1) {
          bottom = count;
          count = 0;
          break;
        }
        y2 += 1;
      }

      score = Math.max(score, left * top * right * bottom);
    }
  }

  return score;
}

console.log(betterView(example)); // -> 8
console.log(betterView(data)); // -> 313200
