import React, {useState, useRef, useEffect} from 'react';

function Snake(props) {
    let maxY = 50;
    let maxX = 100;
    let board = createBoard(maxY, maxX);

    const [transform, setTransform] = useState({dX:0, dY:-1});
    const [snake, setSnake] = useState([
        {X:maxX/2, Y:maxY/2},
        {X:maxX/2, Y:maxY/2},
        {X:maxX/2, Y:maxY/2},
        {X:maxX/2, Y:maxY/2}
        ]);

    const [speed, setSpeed] = useState(1000);
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


    function moveForward() {
        var nextSnake = [...snake];
        nextSnake.unshift({Y: nextSnake[0].Y + transform.dY, X: nextSnake[0].X + transform.dX})
        nextSnake.pop();
        setSnake(nextSnake)
    }

    function move(event) {
        var key = event.key || "";

        if (key === "ArrowUp") {
            let newSpeed = speed - 100;
            console.log("MOVE - faster", newSpeed)
            setSpeed(newSpeed);
        } else if (key === "ArrowDown") {
            console.log("MOVE - slower")
            setSpeed(speed + 100);
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

    useInterval(() => moveForward(), speed);
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

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
export default Snake;
