import { Node, Queue } from './structures.js';
import { initialise, drawArray, execute, drawColouredArray } from './graphics.js';
import { insertionSort, mergeSort, countingSort, partition } from './sorting.js';

// TODO Comparisons should also be an action

let test = Array.from({length: 20}, () => Math.floor(Math.random() * 20) - 10);
console.log(test);

let arr = Array.from({length: 80}, () => Math.floor(Math.random() * 20));
console.log(arr);

let canvasIndex = 0;

document.getElementById('working').innerHTML += `
    <div id="insertion">
        <canvas id="canvas${canvasIndex}"></canvas>
    </div>
`
document.getElementById('working').innerHTML += `
    <div id="merge">
        <canvas id="canvas${canvasIndex+1}"></canvas>
        <canvas id="canvas${canvasIndex+2}"></canvas>
        <canvas id="canvas${canvasIndex+3}"></canvas>
    </div>
`

document.getElementById('working').innerHTML += `
    <div id="count">
        <canvas id="canvas${canvasIndex+4}"></canvas>
        <canvas id="canvas${canvasIndex+5}"></canvas>
        <canvas id="canvas${canvasIndex+6}"></canvas>
    </div>
`

document.getElementById('working').innerHTML += `
    <div id="count">
        <canvas id="canvas${canvasIndex+7}"></canvas>
    </div>
`

let insArr = [...arr];
let insDrawArr = [...arr];

let canvas = document.getElementById(`canvas${canvasIndex}`);
initialise(canvas, screen.width, 100);
window.requestAnimationFrame(() => {drawArray(canvas, insDrawArr)});

let insResult = insertionSort(insArr, new Queue(new Node(0)));
let insActions = insResult[1];
insActions.dequeue();
console.log('insert');
window.requestAnimationFrame(() => {execute([canvas], [insDrawArr], insActions)});
canvasIndex++;



let mergeArr = [...arr];
let mergeDrawArr = [...arr];

let mergeCanvases = [], i = canvasIndex;
while (i < canvasIndex+3) {
    mergeCanvases.push(document.getElementById(`canvas${i}`));
    i++;
}
initialise(mergeCanvases[0], screen.width, 100);
initialise(mergeCanvases[1], 500, 100);
initialise(mergeCanvases[2], 500, 100);
window.requestAnimationFrame(() => {drawArray(mergeCanvases[0], mergeDrawArr)});

let mergeResult = mergeSort(mergeArr, new Queue(new Node(0)));
let mergeActions = mergeResult[1];
mergeActions.dequeue();
console.log('merge');
window.requestAnimationFrame(() => {execute(mergeCanvases, [mergeDrawArr, [], []], mergeActions)});
canvasIndex += 3;

let countArr = [...arr];
let countDrawArr = [...arr];

let countCanvases = [];
i = canvasIndex;
while (i < canvasIndex+3) {
    countCanvases.push(document.getElementById(`canvas${i}`));
    i++;
}
initialise(countCanvases[0], screen.width, 100);
initialise(countCanvases[1], screen.width, 100);
initialise(countCanvases[2], screen.width, 100);
window.requestAnimationFrame(() => {drawArray(countCanvases[0], countDrawArr)});

let countResult = countingSort(countArr, new Queue(new Node(0)));
let countActions = countResult[1];
countActions.dequeue();
console.log('count');
window.requestAnimationFrame(() => {execute(countCanvases, [countDrawArr, []], countActions)});
canvasIndex += 3;

// Dutch Flag Problem: Orange, White, Blue, sort in that order
// Extension: what if there is 4 colours? 5?
// As nColors ~> N, will become countingSort.
// If nColors > 3, probably sacrificing space is the better idea.
// Else use linked list for O(1) insertion.
let dutch = Array.from({length: 80}, () => Math.floor(Math.random() * 3));
let drawDutch = [...dutch];

let dutchCanvas = document.getElementById(`canvas${canvasIndex}`);
initialise(dutchCanvas, screen.width, 100);
window.requestAnimationFrame(() => {drawColouredArray(dutchCanvas, drawDutch)});

let partitionResults = partition(dutch, new Queue(new Node(0)));
let partitionActions = partitionResults[1];
partitionActions.dequeue();
window.requestAnimationFrame(() => {execute([dutchCanvas], [drawDutch], partitionActions, 'colour')});

// // Node constructor
// (function() {
//     try {
//         let node = new Node(0, new Node(1));
//         console.log('Test 1 passed');
//     } catch (error) {
//         console.log('Test 1 failed');
//         console.error(error);
//     }
// } ());

// (function() {
//     try {
//         let node = new Node(0, 1);
//         console.log('Test 2 failed');
//         console.error('Failed to catch error');
//     } catch (error) {
//         console.log('Test 2 passed');
//     }
// } ());

// // Queue constructor
// (function(queue) {
//     try {
//         let queue = new Queue(new Node(0));
//         if (queue.head.value != 0) {
//             throw new Error(`head should be 0 but is ${queue.head}`);
//         }
//         if (queue.tail.value != 0) {
//             throw new Error(`tail should be 0 but is ${queue.tail}`);
//         }
//         if (queue.size != 1) {
//             throw new Error(`size should be 1 but is ${queue.size}`);
//         }
//         console.log('Test 3 passed');
//     } catch (error) {
//         console.log('Test 3 failed');
//         console.error(error);
//     }
// } ());

// (function() {
//     try {
//         let queue = new Queue(new Node(0, new Node(1)));
//         if (queue.head.value != 0) {
//             throw new Error(`head should be 0 but is ${queue.head}`);
//         }
//         if (queue.tail.value != 1) {
//             throw new Error(`tail should be 1 but is ${queue.tail}`);
//         }
//         if (queue.size != 2) {
//             throw new Error(`size should be 2 but is ${queue.size}`);
//         }
//         console.log('Test 4 passed');
//     } catch (error) {
//         console.log('Test 4 failed');
//         console.error(error);
//     }
// } ());

// (function() {
//     try {
//         let queue = new Queue(0);
//         console.log('Test 5 failed');
//         console.error('Failed to catch error');
//     } catch (error) {
//         console.log('Test 5 passed');
//     }
// } ());

// // Queue enqueue
// (function() {
//     try {
//         let queue = new Queue(new Node(0));
//         queue.enqueue(new Node(1));
//         if (queue.head.value != 0) {
//             throw new Error(`head should be 0 but is ${queue.head}`);
//         }
//         if (queue.tail.value != 1) {
//             throw new Error(`tail should be 1 but is ${queue.tail}`);
//         }
//         if (queue.size != 2) {
//             throw new Error(`size should be 2 but is ${queue.size}`);
//         }
//         console.log('Test 6 passed');
//     } catch (error) {
//         console.log('Test 6 failed');
//         console.error(error);
//     }
// } ());

// (function() {
//     try {
//         let queue = new Queue(new Node(0));
//         queue.enqueue(0);
//         console.log('Test 7 failed');
//         console.error('Failed to catch error');
//     } catch (error) {
//         console.log('Test 7 passed');
//     }
// } ());

// // Queue dequeue
// (function() {
//     try {
//         let queue = new Queue(new Node(0));
//         let value = queue.dequeue();
//         if (value != 0) {
//             throw new Error(`value should be 0 but is ${value}`);
//         }
//         if (queue.size != 0) {
//             throw new Error(`queue.size should be 0 but is ${queue.size}`);
//         }
//         console.log('Test 8 passed');
//     } catch (error) {
//         console.log('Test 8 failed');
//         console.error(error);
//     }
// } ());

// // Queue join
// (function() {
//     try {
//         let queue = new Queue(new Node(0));
//         let appendix = new Queue(new Node(1));
//         appendix.enqueue(new Node(2));
//         queue.join(appendix);
//         if (queue.head.value != 0) {
//             throw new Error(`head should be 0 but is ${queue.head}`);
//         }
//         if (queue.tail.value != 2) {
//             throw new Error(`tail should be 2 but is ${queue.tail}`);
//         }
//         if (queue.size != 3) {
//             throw new Error(`size should be 3 but is ${queue.size}`);
//         }
//         console.log('Test 9 passed');
//     } catch (error) {
//         console.log('Test 9 failed');
//         console.error(error);
//     }
// } ());

// (function() {
//     try {
//         let queue = new Queue(new Node(0));
//         queue.join(0);
//         console.log('Test 10 failed');
//         console.error('Failed to catch error');
//     } catch (error) {
//         console.log('Test 10 passed');
//     }
// } ());