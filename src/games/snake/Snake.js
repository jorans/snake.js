import React, {useState} from 'react';

function Snake(props) {
    let maxY = 10;
    let maxX = 10;
    let board = createBoard(maxY, maxX);

    const [transform, setTransform] = useState({dX:0, dY:-1});
    const [snake, setSnake] = useState([
        {X:maxX/2, Y:maxY/2},
        {X:maxX/2, Y:maxY/2},
        {X:maxX/2, Y:maxY/2},
        {X:maxX/2, Y:maxY/2}
        ])

    snake.forEach(p => board[p.Y].values[p.X].value = 1)

    let boardUI = board.map(row => {
        let cols = row.values.map(col => {
            var className = col.value === 1 ? "occupied" : "empty";
            return <td key={col.id} className={className}>&nbsp;</td>

        });
        return(
            <tr key={row.id}>
                {cols}
            </tr>
        )
    })

    function move(event) {
        var key = event.key || "";

        if (key === "ArrowUp") {
            console.log("MOVE - forward")
            var nextSnake = [...snake];
            nextSnake.unshift({Y:nextSnake[0].Y + transform.dY, X:nextSnake[0].X + transform.dX})
            nextSnake.pop();
            setSnake(nextSnake)
        } else if (key === "ArrowLeft") {
            console.log("MOVE - turn left")
            setTransform({dY: transform.dX*(-1), dX: transform.dY})
        } else if (key === "ArrowRight") {
            console.log("MOVE - turn right")
            setTransform({dY: transform.dX, dX: transform.dY*(-1)})
        } else {
            console.log("MOVE - " + event.key)

        }
    }
    return(
        <div className={"snake"} align={'center'}  onKeyDown={move} tabIndex={0}>
            <h1>Welcome to Snake</h1>
            <table className={"board"}>
                <tbody>{boardUI}</tbody>
            </table>
        </div>
    )
}

function createBoard(height, width) {
    var result = [];
    for (var i = 0 ; i < height; i++) {
        result[i] = {id:i, values:[]};
        for (var j = 0; j < width; j++) {
            result[i].values[j] = {id:i+":"+j, value:0};
        }
    }
    return result;
}

export default Snake;
