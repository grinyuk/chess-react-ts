import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
}

const verticalCoordinates: string[] = ['8','7','6','5','4','3','2','1'];
const horizontalCoordinates: string[] = ['a','b','c','d','e','f','g','h'];

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
    
    useEffect(() => {
        highlightCells();
    }, [selectedCell]);

    function click(cell: Cell){
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayer();
            setSelectedCell(null);
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        }
    }
    
    function highlightCells() {
        board.highlightCells(selectedCell);
        updateBoard();
    }
    
    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <div>
            <h3>Current player {currentPlayer?.color}</h3>
            <div className="board" >
                {board.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {row.map(cell =>
                            <CellComponent
                                click={click}
                                key={cell.id}
                                cell={cell}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            />
                        )}
                        <div className="numbers"><div>{verticalCoordinates[index]}</div></div>
                    </React.Fragment>)}
                {horizontalCoordinates.map(letter =>
                    <div className="letter">{letter}</div>
                )}
            </div>
        </div>
    );
};

export default BoardComponent;