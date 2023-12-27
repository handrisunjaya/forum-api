const NewThread = require('../NewThread');

describe('NewThread', () => {
  it('should create a new thread with valid payload', () => {
    const threadPayload = {
      title: 'Thread Title',
      body: 'Thread Body',
      owner: 'Thread Owner'
    };

    const newThread = new NewThread(threadPayload);

    expect(newThread.title).toBe(threadPayload.title);
    expect(newThread.body).toBe(threadPayload.body);
    expect(newThread.owner).toBe(threadPayload.owner);
  });

  it('should throw an error for invalid payload (missing property)', () => {
    const invalidPayload = {
      title: 'Thread Title',
      body: 'Thread Body',
      // Missing 'owner' property
    };

    expect(() => new NewThread(invalidPayload)).toThrow('NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw an error for invalid payload (incorrect data type)', () => {
    const invalidPayload = {
      title: 'Thread Title',
      body: 'Thread Body',
      owner: 123, // 'owner' should be a string
    };

    expect(() => new NewThread(invalidPayload)).toThrow('NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
});
