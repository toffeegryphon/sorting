// TODO Type Checking

export class Node {
    constructor(value, next = undefined) {
        this.value = value;
        this.next = next;
    }
}

export class Queue {

    constructor(node) {
        this.head = node;
        this.tail = node;
        this.size = 1;
    }

    enqueue(node) {
        // enqueue(...Node)
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