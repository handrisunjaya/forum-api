// eslint-disable-next-line max-classes-per-file
const AddCommentUseCase = require('../AddCommentUseCase');

class MockCommentRepository {
  async addComment(comment) {
    return comment;
  }
}

class MockThreadRepository {
  async isThreadExist(threadId) {
    return true;
  }
}

const createMockCommentRepository = () => new MockCommentRepository();

const createMockThreadRepository = (exists = true) => ({
  async isThreadExist(threadId) {
    return exists;
  },
});

const createAddCommentUseCase = (commentRepository, threadRepository) => new AddCommentUseCase({
  commentRepository,
  threadRepository,
});

describe('AddCommentUseCase', () => {
  describe('execute', () => {
    it('should add a new comment when the thread exists', async () => {
      // Arrange
      const mockCommentRepository = createMockCommentRepository();
      const mockThreadRepository = createMockThreadRepository(true);
      // eslint-disable-next-line max-len
      const addCommentUseCase = createAddCommentUseCase(mockCommentRepository, mockThreadRepository);

      const useCasePayload = {
        threadId: 'thread-123',
        content: 'This is a test comment',
        owner: 'user123',
      };

      // Act
      const result = await addCommentUseCase.execute(useCasePayload);

      // Assert
      expect(result).toBeDefined();
      expect(result.threadId).toBe(useCasePayload.threadId);
      expect(result.content).toBe(useCasePayload.content);
      expect(result.owner).toBe(useCasePayload.owner);
    });

    it('should throw an error when the thread does not exist', async () => {
      // Arrange
      const mockCommentRepository = createMockCommentRepository();
      const mockThreadRepository = createMockThreadRepository(false);
      // eslint-disable-next-line max-len
      const addCommentUseCase = createAddCommentUseCase(mockCommentRepository, mockThreadRepository);

      const useCasePayload = {
        threadId: 'nonexistent-thread',
        content: 'This is a test comment',
        owner: 'user123',
      };

      // Act & Assert
      await expect(addCommentUseCase.execute(useCasePayload)).rejects.toThrow('ADD_COMMENT_USE_CASE.THREAD_NOT_FOUND');
    });
  });
});
