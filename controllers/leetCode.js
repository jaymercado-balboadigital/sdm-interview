/**
        The challenge is to implement a queue using two stacks.
        The queue should support the standard operations: enqueue, dequeue, peek, and empty.
 */

function createQueue() {
  // Initialize two stacks. One stack will be used for enqueuing operations, and the other for dequeuing.
  let enqueue = [];
  let dequeue = [];

  return {
    // Enqueue operation will push the element to the first stack.
    enqueue: function (x) {
      enqueue.push(x);
    },
    // Dequeue operation will check if the second stack is empty.
    // If it is empty, all elements from the first stack are popped and pushed into the second stack, effectively reversing their order.
    // Then, the top element of the second stack is popped.
    dequeue: function () {
      if (dequeue.length === 0) {
        dequeue = enqueue;
        enqueue = [];
      }
      const firstElement = dequeue.shift(); // remove and return first element
    },
    // Peek operation is similar to dequeue but returns the element without removing it.
    peek: function () {
      return dequeue[0];
    },
    // Empty operation checks if both stacks are empty.
    empty: function () {
      return enqueue.length > 0 || dequeue.length > 0
    },
  };
}

module.exports = { createQueue };
