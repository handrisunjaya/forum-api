const DeleteComment = require('../DeleteComment');

describe('DeleteComment', () => {
  it('should create a new delete comment with valid payload', () => {
    const deleteCommentPayload = {
      id: '1',
      threadId: '2',
      owner: 'user123',
    };

    const deleteComment = new DeleteComment(deleteCommentPayload);

    expect(deleteComment.id).toBe(deleteCommentPayload.id);
    expect(deleteComment.threadId).toBe(deleteCommentPayload.threadId);
    expect(deleteComment.owner).toBe(deleteCommentPayload.owner);
  });

  it('should throw an error for invalid payload (missing property)', () => {
    const invalidPayload = {
      id: '1',
      // Missing 'threadId' and 'owner' properties
    };

    expect(() => new DeleteComment(invalidPayload)).toThrow('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw an error for invalid payload (incorrect data type)', () => {
    const invalidPayload = {
      id: '1',
      threadId: '2',
      owner: 123, // 'owner' should be a string
    };

    expect(() => new DeleteComment(invalidPayload)).toThrow('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
});
