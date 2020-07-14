export function aStar(oldGrid, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL) {
  const grid = modifyGrid(oldGrid, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL);

  const startNode = grid[START_NODE_ROW][START_NODE_COL];
  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

  const visitedNodesInOrder = [];
  startNode.g = 0;
  startNode.h = getH(startNode, finishNode);
  startNode.f = startNode.g + startNode.h;
  //   const unvisitedNodes = getAllNodes(grid);

  const openList = [];
  //   const closeList = [];
  // use isVisited instead
  openList.push(startNode);

  while (!!openList.length) {
    openList.sort((nodeA, nodeB) => nodeA.f - nodeB.f);
    const currentNode = openList.shift();
    currentNode.isVisited = true;

    if (currentNode.row === finishNode.row && currentNode.col === finishNode.col) {
      console.log('finish');
      return [visitedNodesInOrder, getNodesInShortestPathOrder(finishNode)];
    }

    const neighbours = getNeighbours(currentNode, grid);
    neighbours.forEach((neighbour) => {
      if (neighbour.isWall || neighbour.isVisited) {
        // closeList.push(neighbour);
      } else {
        neighbour.previousNode = currentNode;
        if (neighbour.g !== null) {
          if (currentNode.g + 10 < neighbour.g) {
            neighbour.previousNode = currentNode;
          }

          neighbour.g = Math.min(neighbour.g, currentNode.g + 10);
        } else {
          neighbour.g = currentNode.g + 10;
        }
        neighbour.h = getH(neighbour, finishNode);
        neighbour.f = neighbour.g + neighbour.h;

        if (!openList.includes(neighbour)) {
          openList.push(neighbour);
          visitedNodesInOrder.push(neighbour);
        }
      }
    });

    // console.log(openList);
  }
  // cant find the path
  return [visitedNodesInOrder, null];
}

function getNeighbours(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors;
}

function getH(node1, node2) {
  return (Math.abs(node1.col - node2.col) + Math.abs(node1.row - node2.row)) * 10;
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

const modifyGrid = (grid, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL) => {
  const nodes = [];
  for (let row = 0; row < grid.length; row++) {
    const currentRow = [];
    for (let col = 0; col < grid[0].length; col++) {
      const isWall = grid[row][col] === 'wall';
      currentRow.push(createNode(isWall, col, row, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL));
    }
    nodes.push(currentRow);
  }
  return nodes;
};

const createNode = (isWall, col, row, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    // distance: Infinity,
    isVisited: false,
    isWall: isWall,
    previousNode: null,
    f: null,
    g: null,
    h: null,
  };
};

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
