import { useEffect, useState } from "react";
import NodeComponent from "./Node";
import { Node } from "../interfaces/Node";
import { dijkstra, getNodesInShortestPath } from '../algorithms/dijkstra'

const START_NODE_ROW: number = 10;
const START_NODE_COL: number = 15;
const FINISH_NODE_ROW: number = 10;
const FINISH_NODE_COL: number = 35;

const Visualizer = (): JSX.Element => {

  const [grid, setGrid] = useState<Node[][]>([]);
  const [isMousePressed, setIsMousePressed] = useState<boolean>(false);

  useEffect(() => {
    const initialGrid: Node[][] = getInitialGrid();
    setGrid(initialGrid);
  }, []);

  const handleMouseDown = (row: number, col: number): void => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setIsMousePressed(true);
  }

  const handleMouseEnter = (row: number, col: number): void => {
    if (!isMousePressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  }

  const handleMouseUp = (): void => setIsMousePressed(false);

  const animate = (visited: Node[], nodesInShortestPath: Node[]): void => {
    for (let i = 0; i <= visited.length; i++){
      if (i === visited.length){
        setTimeout(() => {
          animateShortestPath(nodesInShortestPath);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visited[i];
        document.getElementById(`node-${node.row}-${node.col}`)!.className = 'node node-visited';
      }, 10 * i);
    }
  }

  const animateShortestPath = (nodesInShortestPath: Node[]): void => {
    for (let i = 0; i < nodesInShortestPath.length; i++) {
      setTimeout(() => {
        const node: Node = nodesInShortestPath[i];
        document.getElementById(`node-${node.row}-${node.col}`)!.className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  const visualize = (): void => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPath(finishNode);
    animate(visitedNodesInOrder!, nodesInShortestPathOrder);
  }

  return (
    <div className="container">
      <button onClick={() => visualize()}>
        Start Dijkstra!
      </button>
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div 
              className="row"
              key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const {row, col, isFinish, isStart, isWall} = node;
                return (
                  <NodeComponent
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    isMousePressed={isMousePressed}
                    onMouseDown={(row: number, col: number) => handleMouseDown(row, col)}
                    onMouseEnter={(row: number, col: number) =>
                    handleMouseEnter(row, col)
                    }
                    onMouseUp={() => handleMouseUp()}
                    row={row}></NodeComponent>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  )
}
export default Visualizer;

const getInitialGrid = (): Node[][] => {
  const grid: Node[][] = [];
  
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }

  return grid;
}

const createNode = (col: number, row: number): Node => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid: Node[][], row: number, col: number): Node[][] => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};