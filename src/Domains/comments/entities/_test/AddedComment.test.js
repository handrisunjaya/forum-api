const AddedComment = require('../AddedComment');

describe('AddedComment', () => {
  it('should create a new added comment with valid payload', () => {
    const commentPayload = {
      id: '1',
      content: 'This is an added comment',
      owner: 'user123',
    };

    const addedComment = new AddedComment(commentPayload);

    expect(addedComment.id).toBe(commentPayload.id);
    expect(addedComment.content).toBe(commentPayload.content);
    expect(addedComment.owner).toBe(commentPayload.owner);
  });

  it('should throw an error for invalid payload (missing property)', () => {
    const invalidPayload = {
      id: '1',
      content: 'This is an added comment',
      // Missing 'owner' property
    };

    expect(() => new AddedComment(invalidPayload)).toThrow('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw an error for invalid payload (incorrect data type)', () => {
    const invalidPayload = {
      id: '1',
      content: 'This is an added comment',
      owner: 123, // 'owner' should be a string
    };

    expect(() => new AddedComment(invalidPayload)).toThrow('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
});
