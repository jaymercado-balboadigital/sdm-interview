const { createQueue } = require("../controllers/leetCode");

describe("createQueue", () => {
  let queue;

  beforeEach(() => {
    queue = createQueue();
  });

  test("enqueue adds elements to the queue", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.peek()).toBe(1);
  });

  test("dequeue removes and returns the front element of the queue", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.dequeue()).toBe(1);
    expect(queue.peek()).toBe(2);
  });

  test("peek returns the front element without removing it from the queue", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.peek()).toBe(1);
    queue.dequeue();
    expect(queue.peek()).toBe(2);
  });

  test("empty returns true for an empty queue and false for a non-empty queue", () => {
    expect(queue.empty()).toBe(true);
    queue.enqueue(1);
    expect(queue.empty()).toBe(false);
    queue.dequeue();
    expect(queue.empty()).toBe(true);
  });
});
