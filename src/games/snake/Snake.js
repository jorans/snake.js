import React, {useEffect, useRef, useState} from 'react';


function Snake(props) {
    let SETUP = 0;
    let RUNNING = 1;
    let GAMEOVER = 2;
    let maxY = 50;
    let maxX = 100;
    let board = createBoard(maxY, maxX);

    const [gameState, setGameState] = useState(SETUP);
    const [speed, setSpeed] = useState(getInitialSpeed());
    const [transform, setTransform] = useState(getInitialTransformer());
    const [snake, setSnake] = useState(getInitialSnakeState(maxX, maxY));

    snake.forEach(p => board[p.Y].values[p.X].value = 1)

    let boardUI = board.map(row => {
        let cols = row.values.map(col => {
            var className = col.value === 1 ? "occupied" : "empty";
            return <td key={col.id} className={className}>&nbsp;</td>

        });
        return (
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
        if (gameState === RUNNING) {
            if (key === "ArrowUp") {
                let newSpeed = speed - 100;
                console.log("MOVE - faster", newSpeed);
                setSpeed(newSpeed);
            } else if (key === "ArrowDown") {
                console.log("MOVE - slower");
                setSpeed(speed + 100);
            } else if (key === "ArrowLeft") {
                console.log("MOVE - turn left");
                setTransform({dY: transform.dX * (-1), dX: transform.dY});
            } else if (key === "ArrowRight") {
                console.log("MOVE - turn right");
                setTransform({dY: transform.dX, dX: transform.dY * (-1)});
            } else {
                console.log("MOVE - " + event.key);

            }
        }
    }

    function handleOnClick(evt) {
        console.log("startGame", gameState)
        if (gameState === SETUP) {
            setGameState(RUNNING);
        } else if (gameState === RUNNING) {
            setGameState(GAMEOVER);
        } else if (gameState === GAMEOVER) {
            setTransform(getInitialTransformer());
            setSnake(getInitialSnakeState(maxX, maxY));
            setSpeed(getInitialSpeed());
            setGameState(SETUP);
        }
    }
    useInterval(() => {if (gameState === RUNNING) moveForward()}, speed);

    var info = (() => {
        if (gameState === SETUP) {
            return "Klick to start";
        } else if (gameState === RUNNING) {
            return "Use LEFT and RIGHT to turn the snake";
        } else if (gameState === GAMEOVER) {
            return "Game Over!"
        }
    })();

    return (
        <div className={"snake"} align={'center'} onClick={handleOnClick} onKeyDown={move} tabIndex={0}>
            <h1>Welcome to Snake</h1>
            <p>{info}</p>
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
function getInitialSnakeState(maxX, maxY) {
    return [
        {X: maxX / 2, Y: maxY / 2},
        {X: maxX / 2, Y: maxY / 2},
        {X: maxX / 2, Y: maxY / 2},
        {X: maxX / 2, Y: maxY / 2}
    ];
}
function getInitialTransformer() {
    return {dX: 0, dY: -1};
}
function getInitialSpeed() {
    return 1000;
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
