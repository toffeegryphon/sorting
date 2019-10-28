import { Node, Queue } from './structures.js';

export function initialise(canvas, width, height) {
    canvas.width = width;
    canvas.height = height;
}

export function drawArray(canvas, arr, clear = true, offset = 0) {
    let ctx = canvas.getContext('2d');

    if (clear) {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();
    }

    ctx.fillStyle = '#000000';
    var i = 0
    while (i < arr.length) {
        ctx.beginPath();
        ctx.rect((i+offset)*10, 0, 8, arr[i]*5);
        ctx.fill();
        i += 1;
    }
}

export function execute(canvases, arrays, queue, working) {
    if (queue.head != undefined) {
        var action = queue.dequeue();
        switch (action[0]) {
            case 'swap':
                [arrays[0][action[1]], arrays[0][action[2]]] = [arrays[0][action[2]], arrays[0][action[1]]];
                drawArray(canvases[0], arrays[0]);
                window.requestAnimationFrame(() => {
                    execute(canvases, arrays, queue);
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
                    execute(canvases, arrays, queue, working);
                });
                break;
        }
    } else {
        drawArray(canvases[1], []);
        drawArray(canvases[2], []);
    }
}