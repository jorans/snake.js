import React, {useEffect, useRef, useState} from 'react';


function Snake(props) {
    let SETUP = 0;
    let RUNNING = 1;
    let GAMEOVER = 2;
    let PAUSED = 3;
    let height = props.height;
    let width = props.width;
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
        let {snake, gameState, transform, score, fruit} = state;
        let nextSnakeHead = getNextSnakeHead(state.snake, transform);
        let outOfBounds = isOutOfBounds(nextSnakeHead, width, height);
        let snakeCollision = isSnakeEatingItSelf(nextSnakeHead, state.snake);
        let nextGameState = outOfBounds || snakeCollision ? GAMEOVER : gameState;

        var nextSnake = [...snake];
        var nextScore = score;
        var nextFruit = fruit;

        if (nextGameState === RUNNING) {
            nextSnake.unshift(nextSnakeHead);
            nextSnake.pop();

            if (isSnakeEatingFruit(nextSnakeHead, state.fruit)) {
                nextScore += 1;
                nextSnake = enlargeSnake(nextSnake);
                nextFruit = getNewFruit(width, height, nextSnake)
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
                setState({...state, speed: state.speed - 100});
            } else if (key === "ArrowDown") {
                setState({...state, speed: state.speed + 100});
            } else if (key === "ArrowLeft") {
                setState({...state, transform: {dY: state.transform.dX * (-1), dX: state.transform.dY}})
            } else if (key === "ArrowRight") {
                setState({...state, transform: {dY: state.transform.dX, dX: state.transform.dY * (-1)}})
            } else if (key === "a") {
                setState({...state, transform: {dY: 0, dX: -1}})
            } else if (key === "w") {
                setState({...state, transform: {dY: -1, dX: 0}})
            } else if (key === "d") {
                setState({...state, transform: {dY: 0, dX: 1}})
            } else if (key === "s") {
                setState({...state, transform: {dY: 1, dX: 0}})
            } else if (key === " " || key === "p") {
                setState({...state, gameState: PAUSED})
            } else {
                console.log("MOVE - " + event.key);
            }
            } else if (state.gameState === PAUSED) {
                setState({...state, gameState:RUNNING})
        }
    }

    function handleOnClick(evt) {
        if (state.gameState === SETUP) {
            setState({...state, gameState:RUNNING});
        } else if (state.gameState === RUNNING) {
            setState({...state, gameState:GAMEOVER});
        } else if (state.gameState === PAUSED) {
            setState({...state, gameState:RUNNING});
        } else if (state.gameState === GAMEOVER) {
            setState(getInitialState(SETUP, width, height))
        }
    }

    function handleLostFocus(evt) {
        if (state.gameState === RUNNING) {
            setState({...state, gameState:PAUSED});
        }
    }

    useInterval(() => {if (state.gameState === RUNNING) moveForward()}, state.speed);

    var info = (() => {
        if (state.gameState === SETUP) {
            return(
                <p>
                    Click to start
                </p>);
        } else if (state.gameState === RUNNING) {
            return(
                <p>
                    Use <b>LEFT</b> or <b>RIGHT</b> to turn the snakes head<br/>
                    or <b>a, w, d, s</b> to go West, North, East or South<br/>
                    Press SPACE or p to pause
                </p>);
        } else if (state.gameState === PAUSED) {
            return(
                <div>
                    <h3>Game Paused</h3>
                    <p>
                        Click to continue
                    </p>
                </div>);
        } else if (state.gameState === GAMEOVER) {
            return(
                <div>
                    <h3>Game Over!</h3>
                    <p>
                        Click to restart
                    </p>
                </div>);
        }
    })();

    return (
        <div className={"snake"} align={'center'} onBlur={handleLostFocus}  onClick={handleOnClick} onKeyDown={handleKeyEvent} tabIndex={0}>
            <h1>Welcome to Snake.js</h1>
            {info}
            <h2>Score:{state.score}</h2>
            <table className={"board"}>
                <tbody>{boardUI}</tbody>
            </table>
        </div>
    )
}

function isSnakeEatingItSelf(nextSnakeHead, snake) {
    let nextSnakeBody = [...snake];
    nextSnakeBody.pop();
    return contains(nextSnakeHead, nextSnakeBody, samePos);
}

function isSnakeEatingFruit(nextSnakeHead, fruit) {
    return samePos(nextSnakeHead, fruit);
}

function enlargeSnake(snake) {
    let tipOfTail = snake[snake.length-1];
    let nextSnake = [...snake];
    for(var i = 0; i < 5; i++){
        nextSnake.push(tipOfTail);
    }
    return nextSnake;
}

function getNextSnakeHead(snake, transform) {
    let nextY = snake[0].Y + transform.dY;
    let nextX = snake[0].X + transform.dX;
    return {Y:nextY, X:nextX};
}

function isOutOfBounds(pos, width, height) {
    return pos.Y < 0 || pos.Y >= height || pos.X < 0 || pos.X >= width;
}

function getNewFruit(maxX, maxY, snake) {
    function getRandomFruitPosRecursive(maxX,   maxY, snake, remainingAttempts) {
        if (remainingAttempts === 0) {
            throw new Error("Exhusted attempts to find fruit position");
        }
        var fruitPos = getRadomPos(maxX, maxY);
        if (!contains(fruitPos, snake, samePos)) {
            return fruitPos;
        }
        return getRandomFruitPosRecursive(maxX, maxY, snake, --remainingAttempts);
    }
    return getRandomFruitPosRecursive(maxX, maxY, snake, 100);


}

function samePos(a, b) {
    return a.X === b.X && a.Y === b.Y;
}
function contains(p, ps, comp) {
    return ps.some(pp => {
        return comp(p,pp);
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
        fruit: getNewFruit(maxX, maxY, initialSnakeState),
        score:0,

    };
}

function getInitialTransformer() {
    return {dX: 0, dY: -1};
}
function getInitialSpeed() {
    return 300;
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
