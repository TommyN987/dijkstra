export interface NodeProps {
  col: number,
  row: number,
  isStart: boolean,
  isFinish: boolean,
  isWall: boolean,
  onMouseEnter: Function,
  onMouseDown: Function,
  onMouseUp: Function,
  isMousePressed: boolean
}