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