import { Node, Queue } from './structures.js';
import { initialise, drawArray, execute } from './graphics.js';
import { insertionSort, mergeSort } from './sorting.js';

// TODO Comparisons should also be an action

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
});

// Node constructor
(function() {
    try {
        let node = new Node(0, new Node(1));
        console.log('Test 1 passed');
    } catch (error) {
        console.log('Test 1 failed');
        console.error(error);
    }
} ());

(function() {
    try {
        let node = new Node(0, 1);
        console.log('Test 2 failed');
        console.error('Failed to catch error');
    } catch (error) {
        console.log('Test 2 passed');
    }
} ());

// Queue constructor
(function(queue) {
    try {
        let queue = new Queue(new Node(0));
        if (queue.head.value != 0) {
            throw new Error(`head should be 0 but is ${queue.head}`);
        }
        if (queue.tail.value != 0) {
            throw new Error(`tail should be 0 but is ${queue.tail}`);
        }
        if (queue.size != 1) {
            throw new Error(`size should be 1 but is ${queue.size}`);
        }
        console.log('Test 3 passed');
    } catch (error) {
        console.log('Test 3 failed');
        console.error(error);
    }
} ());

(function() {
    try {
        let queue = new Queue(new Node(0, new Node(1)));
        if (queue.head.value != 0) {
            throw new Error(`head should be 0 but is ${queue.head}`);
        }
        if (queue.tail.value != 1) {
            throw new Error(`tail should be 1 but is ${queue.tail}`);
        }
        if (queue.size != 2) {
            throw new Error(`size should be 2 but is ${queue.size}`);
        }
        console.log('Test 4 passed');
    } catch (error) {
        console.log('Test 4 failed');
        console.error(error);
    }
} ());

(function() {
    try {
        let queue = new Queue(0);
        console.log('Test 5 failed');
        console.error('Failed to catch error');
    } catch (error) {
        console.log('Test 5 passed');
    }
} ());

// Queue enqueue
(function() {
    try {
        let queue = new Queue(new Node(0));
        queue.enqueue(new Node(1));
        if (queue.head.value != 0) {
            throw new Error(`head should be 0 but is ${queue.head}`);
        }
        if (queue.tail.value != 1) {
            throw new Error(`tail should be 1 but is ${queue.tail}`);
        }
        if (queue.size != 2) {
            throw new Error(`size should be 2 but is ${queue.size}`);
        }
        console.log('Test 6 passed');
    } catch (error) {
        console.log('Test 6 failed');
        console.error(error);
    }
} ());

(function() {
    try {
        let queue = new Queue(new Node(0));
        queue.enqueue(0);
        console.log('Test 7 failed');
        console.error('Failed to catch error');
    } catch (error) {
        console.log('Test 7 passed');
    }
} ());

// Queue dequeue
(function() {
    try {
        let queue = new Queue(new Node(0));
        let value = queue.dequeue();
        if (value != 0) {
            throw new Error(`value should be 0 but is ${value}`);
        }
        if (queue.size != 0) {
            throw new Error(`queue.size should be 0 but is ${queue.size}`);
        }
        console.log('Test 8 passed');
    } catch (error) {
        console.log('Test 8 failed');
        console.error(error);
    }
} ());

// Queue join
(function() {
    try {
        let queue = new Queue(new Node(0));
        let appendix = new Queue(new Node(1));
        appendix.enqueue(new Node(2));
        queue.join(appendix);
        if (queue.head.value != 0) {
            throw new Error(`head should be 0 but is ${queue.head}`);
        }
        if (queue.tail.value != 2) {
            throw new Error(`tail should be 2 but is ${queue.tail}`);
        }
        if (queue.size != 3) {
            throw new Error(`size should be 3 but is ${queue.size}`);
        }
        console.log('Test 9 passed');
    } catch (error) {
        console.log('Test 9 failed');
        console.error(error);
    }
} ());

(function() {
    try {
        let queue = new Queue(new Node(0));
        queue.join(0);
        console.log('Test 10 failed');
        console.error('Failed to catch error');
    } catch (error) {
        console.log('Test 10 passed');
    }
} ());