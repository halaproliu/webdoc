/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
  if (board.length === 0) return false
  const [ rows, columns, boxes ] = [{}, {}, {}]
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let num = board[i][j]
      if (num !== '.') {
        const boxIndex = ~~(i / 3) * 3 + ~~(j / 3)
        if (rows[`${i}-${num}`] || columns[`${j}-${num}`] || boxes[`${boxIndex}-${num}`]) {
          return false
        }
        rows[`${i}-${num}`] = true
        columns[`${j}-${num}`] = true
        boxes[`${boxIndex}-${num}`] = true
      }
    }
  }
  return true
};