import { Node, Queue } from './structures.js';

export function initialise(canvas, width, height) {
    canvas.width = width;
    canvas.height = height;
}

export function drawArray(canvas, arr, style = 'height', width = 10, height = 10, clear = true, offset = 0) {
    let ctx = canvas.getContext('2d');

    if (clear) {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();
    }

    let i = 0;
    switch (style) {
        case 'height':
            ctx.fillStyle = '#000000';
            while (i < arr.length) {
                ctx.beginPath();
                ctx.rect((i+offset)*width, 0, width - 2, arr[i]*5);
                ctx.fill();
                i++;
            }
            break;
        
        case 'colour':
            while (i < arr.length) {
                switch (arr[i]) {
                    case 0:
                        ctx.fillStyle = '#0000FF';
                        break;
        
                    case 1:
                        ctx.fillStyle = '#FFFFFF';
                        break;
        
                    case 2:
                        ctx.fillStyle = '#FF0000';
                        break;
        
                }
                ctx.beginPath();
                ctx.rect((i+offset)*width, 0, width - 2, height);
                ctx.fill();
                i++;
            }
    }
}

export function drawColouredArray(canvas, arr, width = 10, height = 100, clear = true, offset = 0) {
    let ctx = canvas.getContext('2d');

    if (clear) {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();
    }

    let i = 0;
    while (i < arr.length) {
        switch (arr[i]) {
            case 0:
                ctx.fillStyle = '#0000FF';
                break;

            case 1:
                ctx.fillStyle = '#FFFFFF';
                break;

            case 2:
                ctx.fillStyle = '#FF0000';
                break;

        }
        ctx.beginPath();
        ctx.rect((i+offset)*width, 0, width - 2, height);
        ctx.fill();
        i++;
    }
}

export function execute(canvases, arrays, queue, style = 'height', working) {
    if (queue.head != undefined) {
        var action = queue.dequeue();
        switch (action[0]) {
            case 'swap':
                [arrays[0][action[1]], arrays[0][action[2]]] = [arrays[0][action[2]], arrays[0][action[1]]];
                drawArray(canvases[0], arrays[0], style);
                window.requestAnimationFrame(() => {
                    execute(canvases, arrays, queue, style);
                });
                break;
                
            case 'copy':
                if (action[1] == 0) {
                    arrays[action[2]] = arrays[action[1]].slice(action[3], action[4]+1);
                    if (action[2] == 1) {
                        working = [action[3], action[4]];
                    } else {
                        working.push(action[3], action[4]);
                    }
                } else {
                    if (action[4] == -2) {
                        arrays[action[2]][working[0]] = arrays[action[1]][action[3]];
                        working[0]++;
                    } else 
                    if (action[4] == 0) {
                        arrays[action[2]][working[0]] = arrays[action[1]].shift();
                        working[0] ++;
                    } else {
                        if (arrays[1].length > 0) {
                            arrays[action[2]].splice(working[0], arrays[1].length, ...arrays[1]);
                        }
                    }
                }
                drawArray(canvases[action[2]], arrays[action[2]]);
                window.requestAnimationFrame(() => {
                    execute(canvases, arrays, queue, style, working);
                });
                break;
            
            case 'create':
                arrays[1] = Array.from(Array(action[2]-action[1]+1), (_, x) => x + action[1]);
                arrays.push(Array(action[2]-action[1]+1).fill(0));
                drawArray(canvases[1], arrays[1]);
                window.requestAnimationFrame(() => {
                    execute(canvases, arrays, queue, style, working);
                });
                break;
            
            case 'increment':
                arrays[2][action[1]] += action[2];
                drawArray(canvases[2], arrays[2]);
                window.requestAnimationFrame(() => {
                    execute(canvases, arrays, queue, style, working);
                });
                break;

            case 'decrement':
                arrays[2][action[1]] -= action[2];
                drawArray(canvases[2], arrays[2]);
                window.requestAnimationFrame(() => {
                    execute(canvases, arrays, queue, style, working);
                });
                break;

            case 'working':
                working = [action[1]];
                window.requestAnimationFrame(() => {
                    execute(canvases, arrays, queue, style, working);
                });
                break;
        }
    } else {
        let i = 1;
        while (i < canvases.length) {
            drawArray(canvases[i], []);
            i++;
        }
    }
}