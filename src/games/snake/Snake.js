import React, {useEffect, useRef, useState} from 'react';


function Snake(props) {
    let SETUP = 0;
    let RUNNING = 1;
    let GAMEOVER = 2;
    let height = 20;
    let width = 20;
    let board = createBoard(height, width);
    const [state, setState] = useState(getInitialState(SETUP, width, height))

    board[state.fruit.Y].values[state.fruit.X].value = 2;
    state.snake.forEach(p => board[p.Y].values[p.X].value = 1);

    let boardUI = board.map(row => {
        let cols = row.values.map(col => {
            return <td key={col.id} className={getClassNameByValue(col.value)}>&nbsp;</td>
        });
        return (
            <tr key={row.id}>
                {cols}
            </tr>
        )
    })

    function moveForward() {
        let nextSnakeHead = getNextSnakeHead(state.snake, state.transform);
        let nextGameState = isOutOfBounds(nextSnakeHead, width, height) ? GAMEOVER : state.gameState;

        var nextSnake = [...state.snake];
        var nextScore = state.score;
        var nextFruit = state.fruit;
        if (!isOutOfBounds(nextSnakeHead, width, height)) {
            nextSnake.unshift(nextSnakeHead)
            nextSnake.pop();

            if (samePos(nextSnakeHead, state.fruit)) {
                nextScore += 1;
                nextFruit = getRandomFruitPos(width, height, nextSnake)
            }
        }

        setState({...state,
            snake:nextSnake,
            gameState:nextGameState,
            score: nextScore,
            fruit: nextFruit
        });
    }

    function handleKeyEvent(event) {
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
            setState(getInitialState(SETUP, width, height))
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
        <div className={"snake"} align={'center'} onClick={handleOnClick} onKeyDown={handleKeyEvent} tabIndex={0}>
            <h1>Welcome to Snake</h1>
            <p>{info}</p>
            <h2>Score:{state.score}</h2>
            <table className={"board"}>
                <tbody>{boardUI}</tbody>
            </table>
        </div>
    )
}

function getNextSnakeHead(snake, transform) {
    let nextY = snake[0].Y + transform.dY;
    let nextX = snake[0].X + transform.dX;
    return {Y:nextY, X:nextX};
}

function isOutOfBounds(pos, width, height) {
    return pos.Y < 0 || pos.Y > height || pos.X < 0 || pos.X > width;
}

function getRandomFruitPos(maxX, maxY, snake) {
    function getRandomFruitPosRecursive(maxX,   maxY, snake, remainingAttempts) {
        if (remainingAttempts === 0) {
            throw "Exhusted attempts to find fruit position";
        }
        var fruitPos = getRadomPos(maxX, maxY);
        if (!contains(fruitPos, snake)) {
            return fruitPos;
        }
        return getRandomFruitPosRecursive(maxX, maxY, snake, --remainingAttempts);
    }
    return getRandomFruitPosRecursive(maxX, maxY, snake, 100);


}

function samePos(a, b) {
    return a.X === b.X && a.Y === b.Y;
}
function contains(p, ps) {
    return ps.some(pp => {
        return p === pp;
    })
}
function getRadomPos(maxX, maxY){
    return {X:getRandomInt(maxX), Y:getRandomInt(maxY)};
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function getClassNameByValue(value) {
    switch (value) {
        case 1:
            return "occupied";
        case 2:
            return "apple";
        default:
            return "empty";
    }
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
    let initialSnakeState = getInitialSnakeState(maxX, maxY);
    return {
        gameState: gameState,
        speed: getInitialSpeed(),
        transform: getInitialTransformer(),
        snake: initialSnakeState,
        fruit: getRandomFruitPos(maxX, maxY, initialSnakeState),
        score:0,

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
