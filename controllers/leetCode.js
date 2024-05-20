/**
        The challenge is to implement a queue using two stacks.
        The queue should support the standard operations: enqueue, dequeue, peek, and empty.
 */

function createQueue() {
  // Initialize two stacks. One stack will be used for enqueuing operations, and the other for dequeuing.
  let enqueueStack = [];
  let dequeueStack = [];

  function transferStacks() {
    while (enqueueStack.length > 0) {
      dequeueStack.push(enqueueStack.pop());
    }
  }

  return {
    // Enqueue operation will push the element to the first stack.
    enqueue: function (x) {
      enqueueStack.push(x);
    },
    // Dequeue operation will check if the second stack is empty.
    // If it is empty, all elements from the first stack are popped and pushed into the second stack, effectively reversing their order.
    // Then, the top element of the second stack is popped.
    dequeue: function () {
      if (dequeueStack.length === 0) {
        transferStacks();
      }
      return dequeueStack.pop();
    },
    // Peek operation is similar to dequeue but returns the element without removing it.
    peek: function () {
      if (dequeueStack.length === 0) {
        transferStacks();
      }
      return dequeueStack[dequeueStack.length - 1];
    },
    // Empty operation checks if both stacks are empty.
    empty: function () {
      return enqueueStack.length === 0 && dequeueStack.length === 0;
    },
  };
}

module.exports = { createQueue };
