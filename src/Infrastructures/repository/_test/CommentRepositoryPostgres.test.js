const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const Comment = require('../../../Domains/comments/entities/Comment');

describe('CommentRepositoryPostgres', () => {
  let commentRepository;

  beforeEach(() => {
    const pool = {
      query: jest.fn(),
    };
    const idGenerator = jest.fn(() => 'mocked-comment-id');

    commentRepository = new CommentRepositoryPostgres(pool, idGenerator);
  });

  describe('addComment', () => {
    it('should add a new comment to the database', async () => {
      // Prepare
      const newComment = {
        content: 'This is a test comment',
        owner: 'user123',
        threadId: 'thread-123',
      };

      const expectedQuery = {
        text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6) RETURNING id, content, owner',
        values: expect.arrayContaining([expect.any(String), 'This is a test comment', 'user123', 'thread-123', false, expect.any(String)]),
      };

      const mockedResult = {
        rows: [{ id: 'mocked-comment-id', content: 'This is a test comment', owner: 'user123' }],
      };

      const poolQueryMock = jest.fn().mockResolvedValue(mockedResult);
      commentRepository._pool.query = poolQueryMock;

      // Act
      const addedComment = await commentRepository.addComment(newComment);

      // Assert
      expect(addedComment).toBeInstanceOf(AddedComment);
      expect(addedComment.id).toBe('mocked-comment-id');
      expect(addedComment.content).toBe('This is a test comment');
      expect(addedComment.owner).toBe('user123');

      // Additional assertions based on your specific use case

      // Check if the query was called with the expected values
      expect(poolQueryMock).toHaveBeenCalledWith(expectedQuery);
    });
  });

  // Add more test cases for other methods...
});
