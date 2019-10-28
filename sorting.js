import { Node, Queue } from './structures.js';

export function insertionSort(arr, queue) {
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

export function mergeSort(arr, queue, left = 0, right = -1, length = -1) {

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