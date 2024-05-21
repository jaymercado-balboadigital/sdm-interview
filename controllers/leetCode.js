/**
        The challenge is to implement a queue using two stacks.
        The queue should support the standard operations: enqueue, dequeue, peek, and empty.
 */

function createQueue() {
  // Initialize two stacks. One stack will be used for enqueuing operations, and the other for dequeuing.
  let enqueue = [];

  return {
    // Enqueue operation will push the element to the first stack.
    enqueue: function (x) {
      enqueuing.push(x);
    },
    // Dequeue operation will check if the second stack is empty.
    // If it is empty, all elements from the first stack are popped and pushed into the second stack, effectively reversing their order.
    // Then, the top element of the second stack is popped.
    dequeue: function () {},
    // Peek operation is similar to dequeue but returns the element without removing it.
    peek: function () {},
    // Empty operation checks if both stacks are empty.
    empty: function () {},
  };
}

module.exports = { createQueue };
