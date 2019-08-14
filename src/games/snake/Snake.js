import React, {useEffect, useRef, useState} from 'react';


function Snake(props) {
    let SETUP = 0;
    let RUNNING = 1;
    let GAMEOVER = 2;
    let maxY = 50;
    let maxX = 100;
    let board = createBoard(maxY, maxX);
    const [state, setState] = useState(getInitialState(SETUP, maxX, maxY))

    state.snake.forEach(p => board[p.Y].values[p.X].value = 1)
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
        var nextSnake = [...state.snake];
        nextSnake.unshift({Y: nextSnake[0].Y + state.transform.dY, X: nextSnake[0].X + state.transform.dX})
        nextSnake.pop();
        setState({...state, snake:nextSnake});
    }

    function move(event) {
        var key = event.key || "";
        if (state.gameState === RUNNING) {
            if (key === "ArrowUp") {
                let newSpeed = state.speed - 100;
                console.log("MOVE - faster", newSpeed);
                setState({...state, speed: newSpeed});
            } else if (key === "ArrowDown") {
                console.log("MOVE - slower");
                setState({...state, speed: state.speed + 100});
            } else if (key === "ArrowLeft") {
                console.log("MOVE - turn left");
                setState({...state, transform:{dY: state.transform.dX * (-1), dX: state.transform.dY}})
            } else if (key === "ArrowRight") {
                console.log("MOVE - turn right");
                setState({...state, transform:{dY: state.transform.dX, dX: state.transform.dY * (-1)}})
            } else {
                console.log("MOVE - " + event.key);

            }
        }
    }

    function handleOnClick(evt) {
        if (state.gameState === SETUP) {
            setState({...state, gameState:RUNNING});
        } else if (state.gameState === RUNNING) {
            setState({...state, gameState:GAMEOVER});
        } else if (state.gameState === GAMEOVER) {
            setState(getInitialState(SETUP, maxX, maxY))
        }
    }
    useInterval(() => {if (state.gameState === RUNNING) moveForward()}, state.speed);

    var info = (() => {
        if (state.gameState === SETUP) {
            return "Klick to start";
        } else if (state.gameState === RUNNING) {
            return "Use LEFT and RIGHT to turn the snake";
        } else if (state.gameState === GAMEOVER) {
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

function getInitialState(gameState, maxX, maxY) {
    return {
        gameState: gameState,
        speed: getInitialSpeed(),
        transform: getInitialTransformer(),
        snake: getInitialSnakeState(maxX, maxY)
    };
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
