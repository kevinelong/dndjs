// board = [ '.', '.', '.'];
//
// board[1] = "X";
//
// for(let index=0; index < board.length; index++){
//     process.stdout.write(board[index])
// }

board = [
    [ '.', '.', '.'],
    [ '.', '.', '.'],
    [ '.', '.', '.'],
];

board[1][1] = "X"; // put "X" in the middle (second row, second column)
board[0][2] = "O"; // put "O" in the top right (first row, last column.)

for(let r=0; r < board.length; r++){
    for(let c=0; c < board.length; c++) {
        process.stdout.write(board[r][c] + " ")
    }
    console.log("")
}
