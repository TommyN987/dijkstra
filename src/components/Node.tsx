import { NodeProps } from "../interfaces/NodeProps"

const Node = (props: NodeProps) => {

  const {
    col,
    row,
    isStart,
    isFinish,
    isWall,
    onMouseEnter,
    onMouseDown,
    onMouseUp,
  } = props;

  const statusClassName = isFinish
  ? 'node-finish'
  : isStart
    ? 'node-start'
    : isWall
      ? 'node-wall'
      : '';

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${statusClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    >
    </div>
  )
}
export default Node