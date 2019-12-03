// TODO Type Checking

export class Node {
    constructor(value, next = undefined) {
        if (!(next === undefined || next.constructor.name === 'Node')) {
            throw new TypeError('next must be undefined or node');
        }

        this.value = value;
        this.next = next;
    }
}

export class Heap {
    // true is Min, false is Max
    constructor(array = [], order = true) {
        this.heap = array;
        this._order = order;
        this.build();
    }

    get val() {
        return this.heap;
    }

    get order() {
        return this._order;
    }

    set order(order = true) {
        this._order = order;
        this.build();
    }

    siftUp(i) {
        let parent = Math.floor((i - 1) / 2);

        if (parent > -1 && (this.heap[i] < this.heap[parent] == this._order)) {
            [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
            return this.siftUp(parent);
        }

        return this.heap;
    }

    siftDown(i) {
        let left = 2 * i + 1;
        let right = left + 1;
        let ext = -1;

        if (this.heap[left] < this.heap[right] == this._order) {
            ext = left;
        } else {
            ext = right;
        }

        if (right < this.heap.length && (this.heap[ext] < this.heap[i] == this._order)) {
            [this.heap[i], this.heap[ext]] = [this.heap[ext], this.heap[i]];
            return this.siftDown(ext);
        }

        return this.heap;
    }

    insert(x) {
        this.heap.push(x);
        this.siftUp(this.heap.length - 1);
        return this.heap;
    }

    extract() {
        let last = this.heap.length - 1;
        [this.heap[0], this.heap[last]] = [this.heap[last], this.heap[0]];
        let val = this.heap.pop();
        this.siftDown(0);
        return val;
    } 

    // O(n) time complexity
    build() {
        let i = this.heap.length - 1;
        while (i > -1) {
            this.siftDown(i);
            i --;
        }
    }
}

export class Queue {

    constructor(node) {
        if (node.constructor.name !== 'Node') {
            throw new TypeError('must be node');
        }

        this.head = node;
        this.size = 1;
        while (node.next != undefined) {
            node = node.next;
            this.size ++;
        }
        this.tail = node;
    }

    enqueue(node) {
        // enqueue(...Node)
        if (node.constructor.name !== 'Node') {
            throw new TypeError('must be node');
        }

        this.tail.next = node;
        this.tail = node;
        this.size ++;
        return this;
    }

    dequeue() {
        var node = this.head;
        this.head = this.head.next;
        this.size --;
        return node.value;
    }

    join(queue) {
        // join(...Queue)
        if (queue.constructor.name !== 'Queue') {
            throw new TypeError('must be queue');
        }

        this.tail.next = queue.head;
        this.tail = queue.tail;
        this.size += queue.size;
        return this;
    }

    toArray() {
        var array = [];
        var pointer = this.head;
        while (pointer != undefined) {
            array.push(pointer.value);
            pointer = pointer.next;
        }
        return array;
    }
}