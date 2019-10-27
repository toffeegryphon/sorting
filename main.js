import { Node, Queue } from './structures.js';

// var queue = new Queue(new Node(0));
// var i = 1
// while (i < 10) {
//     queue.enqueue(new Node(i));
//     i++;
// }
// console.log(queue);
// console.log(queue.toArray());

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

function execute(canvases, arrays, queue, working) {
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
                // console.log(action);
                if (action[1] == 0) {
                    // Not drawing properly
                    arrays[action[2]] = arrays[action[1]].slice(action[3], action[4]+1);
                    // console.log(arrays[action[2]]);
                    if (action[2] == 1) {
                        working = [action[3], action[4]];
                    } else {
                        working.push(action[3], action[4]);
                    }
                    // console.log(working);

                    drawArray(canvases[action[2]], arrays[2]);
                    window.requestAnimationFrame(() => {
                        execute(canvases, arrays, queue, working);
                    })
                } else {
                    if (action[4] == 0) {
                        arrays[action[2]][working[0]] = arrays[action[1]].shift();
                        working[0] ++;
                        // console.log(arrays[action[2]]);
                        drawArray(canvases[action[2]], arrays[action[2]]);
                        window.requestAnimationFrame(() => {
                            execute(canvases, arrays, queue, working);
                        })
                    } else {
                        // console.log(arrays[action[2]]);
                        if (arrays[1].length > 0) {
                            arrays[action[2]].splice(working[0], arrays[1].length, ...arrays[1]);
                        }
                        // console.log(arrays[action[2]]);
                        drawArray(canvases[action[2]], arrays[action[2]]);
                        window.requestAnimationFrame(() => {
                            execute(canvases, arrays, queue, working);
                        })
                    }
                }
                break;
        }
    }
}

// TODO Comparisons should also be an action

function insertionSort(arr, queue) {
    var i = 1;
    while (i < arr.length) {
        var j = i;
        while (j > 0 && arr[j] < arr[j-1]) {
            [arr[j-1], arr[j]] = [arr[j], arr[j-1]];
            // Should not use queue, as unable to select stage
            queue.enqueue(new Node(['swap', j-1, j]));
            j--;
        }
        i++;
    }
    return [arr, queue];
}

function mergeSort(arr, queue, left = 0, right = -1, length = -1) {

    function merge(left, right, queue) {
        var arr = [];
        var tQ = new Queue(new Node(0));
        while (left.length > 0 && right.length > 0) {
            tQ.enqueue((left[0] < right[0] ? new Node(['copy', 1, 0, 0, 0]) : new Node(['copy', 2, 0, 0, 0])));
            arr.push((left[0] < right[0] ? left.shift() : right.shift()));
        }
    
        tQ.enqueue(new Node(['copy', 1, 0, 0, left.length-1]));
        tQ.enqueue(new Node(['copy', 2, 0, 0, right.length-1]));
        tQ.dequeue();
        arr = arr.concat(left, right);
        return [arr, tQ];
    }

    if (right == -1) {
        right = arr.length-1;
        length = arr.length;
    }
    var centre = Math.floor((left + right+1)/2);

    var leftRes = [], rightRes = [];

    var leftRes = (left == centre-1 ? [[arr[left]]] : mergeSort(arr, queue, left, centre-1, length));

    (leftRes.length > 1 ? queue.join(leftRes[1]) : undefined);

    var rightRes = (centre == right ? [[arr[centre]]] : mergeSort(arr, queue, centre, right, length));

    //merge queue, leftQ, rightQ
    
    (rightRes.length > 1 ? queue.join(rightRes[1]) : undefined);

    queue.enqueue(new Node(['copy', 0, 1, left, centre-1]));
    queue.enqueue(new Node(['copy', 0, 2, centre, right]));

    var res = merge(leftRes[0], rightRes[0], queue);
    if (res[0].length == length) {
        return [res[0], queue.join(res[1])];
    }

    return res;
}

var arr = Array.from({length: 100}, () => Math.floor(Math.random() * 40));
console.log(arr);
var insArr = arr.slice(0);
var insDrawArr = arr.slice(0);
var drawArr = arr.slice(0);
var insRes = insertionSort(insArr, new Queue(new Node(0)));
var result = mergeSort(arr, new Queue(new Node(0)));
console.log(result[0]);
console.log(result[1].toArray());

var canvas0 = document.getElementById('canvas0');
var canvas = document.getElementById('canvas');
var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');
initialise(canvas0, 1500, 300);
initialise(canvas, 1500, 300);
initialise(canvas1, 500, 300);
initialise(canvas2, 500, 300);
window.requestAnimationFrame(() => {
    drawArray(canvas0, insDrawArr);
    drawArray(canvas, drawArr);
});
var action = result[1];
action.dequeue();
var insAct = insRes[1];
insAct.dequeue();
// execute([canvas], [drawArr], action);
window.requestAnimationFrame(() => {
    execute([canvas0], [insDrawArr], insAct);
    execute(
        [canvas, canvas1, canvas2],
        [drawArr, [], []],
        action
    );
})