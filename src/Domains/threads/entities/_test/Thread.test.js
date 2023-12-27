const Comment = require('../../../comments/entities/Comment');
const Thread = require('../Thread');

describe('Thread', () => {
  it('should create a new thread with valid payload', () => {
    const threadPayload = {
      id: '1',
      title: 'Thread Title',
      body: 'Thread Body',
      date: '2023-01-01',
      username: 'user123',
    };

    const newThread = new Thread(threadPayload);

    expect(newThread.id).toBe(threadPayload.id);
    expect(newThread.title).toBe(threadPayload.title);
    expect(newThread.body).toBe(threadPayload.body);
    expect(newThread.date).toBe(threadPayload.date);
    expect(newThread.username).toBe(threadPayload.username);
    expect(newThread.comments).toEqual([]);
  });

  it('should throw an error for invalid payload (missing property)', () => {
    const invalidPayload = {
      id: '1',
      title: 'Thread Title',
      date: '2023-01-01',
      // Missing 'body' and 'username' properties
    };

    expect(() => new Thread(invalidPayload)).toThrow('THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw an error for invalid payload (incorrect data type)', () => {
    const invalidPayload = {
      id: '1',
      title: 'Thread Title',
      body: 'Thread Body',
      date: '2023-01-01',
      username: 123, // 'username' should be a string
    };

    expect(() => new Thread(invalidPayload)).toThrow('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should set comments for the thread', () => {
    const threadPayload = {
      id: '1',
      title: 'Thread Title',
      body: 'Thread Body',
      date: '2023-01-01',
      username: 'user123',
    };

    const newThread = new Thread(threadPayload);

    const comments = [
      new Comment({ id: 'comment1', username: 'user1', date: '2023-01-01', content: 'Comment 1', isDelete: false }),
      new Comment({ id: 'comment2', username: 'user2', date: '2023-01-01', content: 'Comment 2', isDelete: false }),
    ];

    newThread.setComments(comments);

    expect(newThread.comments).toEqual(comments);
  });

  it('should throw an error when setting invalid comments', () => {
    const threadPayload = {
      id: '1',
      title: 'Thread Title',
      body: 'Thread Body',
      date: '2023-01-01',
      username: 'user123',
    };

    const newThread = new Thread(threadPayload);

    // Creating an invalid comment without the required 'id' property
    const invalidComments = [
      { username: 'user1', date: '2023-01-01', content: 'Comment 1', isDelete: false },
    ];

    expect(() => newThread.setComments(invalidComments)).toThrow('THREAD.COMMENTS_CONTAINS_INVALID_MEMBER');
  });

  it('should throw an error when setting comments with non-array value', () => {
    const threadPayload = {
      id: '1',
      title: 'Thread Title',
      body: 'Thread Body',
      date: '2023-01-01',
      username: 'user123',
    };

    const newThread = new Thread(threadPayload);

    // Creating an invalid non-array value for comments
    const invalidComments = 'not an array';

    expect(() => newThread.setComments(invalidComments)).toThrow('THREAD.COMMENTS_NOT_ARRAY');
  });
});
