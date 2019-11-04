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

export function countingSort(arr, queue) {
    //  Runs in 2O(n) time
    let min = Math.min(...arr), max = Math.max(...arr); 
    //  Create array of size (number of unique elements) in O(k) time, O(k) space
    let count = Array(max-min+1).fill(0);
    queue.enqueue(new Node(['create', min, max]));

    //  Runs in O(n) time
    arr.forEach(e => {
        count[e-min]++; // Increment number of such elements by 1
        queue.enqueue(new Node(['increment', e-min, 1]));
    }); 
    /* 
        Takes O(k + n) time. 
        Think of a 2 stage process:
        O(k) time to remove all count[c] = 0
        O(n) time to replace n elements back into source arr
    */
    let c = 0, a = 0;
    queue.enqueue(new Node(['working', a]));
    while (c < count.length) { 
        while (count[c] > 0) {
            arr[a] = c + min;
            queue.enqueue(new Node(['copy', 1, 0, c + min, -2]));
            a++;
            count[c] = count[c]-1;
            queue.enqueue(new Node(['decrement', c, 1]));
        }
        c++
    }
    /*
        Overall, runs in ~O(n + k) time
        and takes O(k + 1) space
        As long as k << n^2,
        Time complexity is O(n)
    */
    return [arr, queue];
}

/*
    Partition "sort" for Dutch National Flag Problem    

    Time complexity of O(n).
    Extension of Mathematical Induction.

    // first = a, last = -b.

    At i-th case,
    first a elements and last b elements are completely sorted,
        i.e. first a are 0s and last b are 2s;
    first i elements are sorted within its own reference array,
        i.e. first a are 0s and first i-a are 1s.

    If i == 0:
        then swap elements a and i,
        will be in correct order.

                    a          i      -b
        [0, ..., 0, 1, ..., 1, 0, ..., 2, ..., 2]
        [0, ..., 0, 0, ..., 1, 1, ..., 2, ..., 2]

    If i == 1:
        then move on, as
        the first i elements are still sorted.

                    a          i      -b
        [0, ..., 0, 1, ..., 1, 1, ..., 2, ..., 2]

    If i == 2:
        swap elements i and -b,
        however needs to recheck element i
        since it can be anything.

                    a          i         -b
        [0, ..., 0, 1, ..., 1, 2, ..., x, 2, ..., 2]
        [0, ..., 0, 0, ..., 1, x, ..., 2, 2, ..., 2]

    Values of all elements will be checked,
    hence O(n) time complexity.
    O(1) space complexity due to
    in place sorting of input array.
*/
export function partition(arr, queue) {

    // Base case
    let i = 0, first = 0, last = arr.length - 1;

    // i-th case
    while (i < last + 1) {
        switch (arr[i]) {
            case 0:
                [arr[i], arr[first]] = [arr[first], arr[i]];
                queue.enqueue(new Node(['swap', first, i]));
                first++;
                i++;
                break;

            case 1:
                i++;
                break;
            
            case 2:
                [arr[i], arr[last]] = [arr[last], arr[i]];
                queue.enqueue(new Node(['swap', i, last]));
                last--;
                break;
            
            default:
                throw new Error('Should not end up here, check inputs');
        }
    }
    return [arr, queue];
}