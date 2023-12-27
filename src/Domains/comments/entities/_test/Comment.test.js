const Comment = require('../Comment');

describe('Comment', () => {
  it('should create a new comment with valid payload', () => {
    const commentPayload = {
      id: '1',
      username: 'user123',
      date: '2023-01-01',
      content: 'This is a comment',
      isDelete: false,
    };

    const comment = new Comment(commentPayload);

    expect(comment.id).toBe(commentPayload.id);
    expect(comment.username).toBe(commentPayload.username);
    expect(comment.date).toBe(commentPayload.date);
    expect(comment.content).toBe(commentPayload.content);
  });

  it('should create a new deleted comment with valid payload', () => {
    const deletedCommentPayload = {
      id: '1',
      username: 'user123',
      date: '2023-01-01',
      content: 'This is a comment',
      isDelete: true,
    };

    const deletedComment = new Comment(deletedCommentPayload);

    expect(deletedComment.id).toBe(deletedCommentPayload.id);
    expect(deletedComment.username).toBe(deletedCommentPayload.username);
    expect(deletedComment.date).toBe(deletedCommentPayload.date);
    expect(deletedComment.content).toBe('**komentar telah dihapus**');
  });

  it('should throw an error for invalid payload (missing property)', () => {
    const invalidPayload = {
      id: '1',
      username: 'user123',
      date: '2023-01-01',
      // Missing 'content' and 'isDelete' properties
    };

    expect(() => new Comment(invalidPayload)).toThrow('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw an error for invalid payload (incorrect data type)', () => {
    const invalidPayload = {
      id: '1',
      username: 'user123',
      date: '2023-01-01',
      content: 'This is a comment',
      isDelete: 'true', // 'isDelete' should be a boolean
    };

    expect(() => new Comment(invalidPayload)).toThrow('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
});
