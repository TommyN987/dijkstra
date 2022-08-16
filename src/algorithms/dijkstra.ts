import { Node } from "../interfaces/Node"

export const dijkstra = (grid: Node[][], startNode: Node, finishNode: Node): Node[] | undefined => {
  const visited: Node[] = [];
  const unvisited: Node[] = getAllNodes(grid);
  startNode.distance = 0;

  while (!!unvisited.length){
    sortNodesByDistance(unvisited);
    const closest = unvisited.shift();

    // If the closest node is a wall, skip it and continue with the loop
    if (closest?.isWall) continue;

    // If we are trapped (the closest node is at infinite distance), stop
    if (closest?.distance === Infinity) return visited;

    closest!.isVisited = true;
    visited.push(closest!);

    if (closest === finishNode) return visited;

    updateUnvisitedNeighbors(closest!, grid);
  }
}

export const getNodesInShortestPath = (finishNode: Node): Node[] => {
  const nodesInShortestPath = [];

  let currentNode: Node | null = finishNode;

  while (currentNode !== null){
    nodesInShortestPath.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodesInShortestPath;
}

function getAllNodes(grid: Node[][]): Node[] {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function sortNodesByDistance(unvisited: Node[]): void {
  unvisited.sort((a, b) => a.distance - b.distance);
}

function updateUnvisitedNeighbors(node: Node, grid: Node[][]): void {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);

  for (const neighbor of unvisitedNeighbors){
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node: Node, grid: Node[][]): Node[] {
  const neighbors = [];
  const { col, row } = node;
  
  if (row > 0) neighbors.push(grid[row - 1][col]);
  
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  
  if (col > 0) neighbors.push(grid[row][col - 1]);
  
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  
  return neighbors.filter(neighbor => !neighbor.isVisited);
}