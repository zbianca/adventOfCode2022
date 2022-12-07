const {
  datefy
} = require('./utils');

const data = datefy(7);

class Dir {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
    this.size = 0;
    this.children = [];
  }
}

function makeDirTree(lines) {
  const head = new Dir('/');
  let cur = head;

  for (let i = 2; i < lines.length; i++) {
    const line = lines[i].split(" ");

    if (line[0] === "dir") {
      cur.children.push(new Dir(line[1], cur));
    }

    else if (/\d+/g.test(line[0])) {
      cur.size+= parseInt(line[0], 10);
    }

    else if (line[0] === '$' && line[1] === 'cd') {
      if (line[2] === '..') cur = cur.parent;
      else cur = cur.children.find(x => x.name === line[2]);
    }
  }

  return head;
}

function addChildrenDirSizes(root) {
  if (!root.children || root.children.length === 0) return root.size;
  root.size = root.children.reduce((acc, cur) => acc + addChildrenDirSizes(cur), root.size);
  return root.size;
}

const head = makeDirTree(data);
const headSize = addChildrenDirSizes(head);
console.log(headSize); // -> 48381165 example / 49199225 data

// Find all of the directories with a total size of at most 100000.
// What is the sum of the total sizes of those directories?
function findSmallSum() {
  const LIMIT = 100000;
  let sum = 0;
  if (headSize <= LIMIT) sum+= headSize;

  const queue = [...head.children];
  while (queue.length) {
    const cur = queue.pop();
    if (cur.size <= LIMIT) sum+= cur.size;
    if (cur.children.length) queue.push(...cur.children);
  }

  return sum;
}

console.log(findSmallSum()); // -> 1501149

// What is the size of the smallest directory that, if deleted,
// would free up enough space on the filesystem to run the update.
function findSmallestDeletion() {
  const SPACE = 70000000;
  const NEED = 30000000;
  const toDelete = NEED - (SPACE - headSize);
  let smallest = Infinity;

  const queue = [...head.children];
  while (queue.length) {
    const cur = queue.pop();
    if (cur.children.length) queue.push(...cur.children);
    if (cur.size >= toDelete) smallest = Math.min(cur.size, smallest);
  }

  return smallest;
}

console.log(findSmallestDeletion()); // -> 10096985