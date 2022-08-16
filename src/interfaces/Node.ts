export interface Node {
  col: number,
  row: number,
  isFinish: boolean,
  isStart: boolean,
  isWall: boolean,
  isMousePressed?: boolean,
  isVisited: boolean,
  distance: number,
  previousNode: Node | null
}