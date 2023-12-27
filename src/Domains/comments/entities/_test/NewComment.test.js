const NewComment = require('../NewComment');

describe('NewComment', () => {
  it('should create a new comment with valid payload', () => {
    const commentPayload = {
      threadId: '1',
      content: 'This is a comment',
      owner: 'user123',
    };

    const newComment = new NewComment(commentPayload);

    expect(newComment.threadId).toBe(commentPayload.threadId);
    expect(newComment.content).toBe(commentPayload.content);
    expect(newComment.owner).toBe(commentPayload.owner);
  });

  it('should throw an error for invalid payload (missing property)', () => {
    const invalidPayload = {
      threadId: '1',
      content: 'This is a comment',
      // Missing 'owner' property
    };

    expect(() => new NewComment(invalidPayload)).toThrow('NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw an error for invalid payload (incorrect data type)', () => {
    const invalidPayload = {
      threadId: '1',
      content: 'This is a comment',
      owner: 123, // 'owner' should be a string
    };

    expect(() => new NewComment(invalidPayload)).toThrow('NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
});
