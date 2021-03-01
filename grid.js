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

board[1][1] = "X";
board[0][2] = "O";

for(let r=0; r < board.length; r++){
    for(let c=0; c < board.length; c++) {
        process.stdout.write(board[r][c] + " ")
    }
    console.log("")
}
