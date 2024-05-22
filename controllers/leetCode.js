/**
        The challenge is to implement a queue using two stacks.
        The queue should support the standard operations: enqueue, dequeue, peek, and empty.
        Initialize two stacks. One stack will be used for enqueuing operations, and the other for dequeuing.
        Enqueue operation will push the element to the first stack.
        Dequeue operation will check if the second stack is empty.
        If it is empty, all elements from the first stack are popped and pushed into the second stack, effectively reversing their order.
        Then, the top element of the second stack is popped.
        Peek operation is similar to dequeue but returns the element without removing it.
        Empty operation checks if both stacks are empty.
 */

function createQueue() {
  var queue = [];
  var dequeue = [];

  return {
    enqueue: function (job) {
      queue.push(job);
    },
    dequeue: function (job) {
      if (queue.includes(job)) {
        dequeue.push(queue.pop(job));
      } else {
        return false;
      }
    },
    peek: function () {
      var element = queue[0];
      if (element) return element;
      else return false;
    },
    empty: function () {
      if (queue.length === 0 && dequeue.queue === 0) return true;
      else return false;
    },
  };
}

module.exports = { createQueue };
