// eslint-disable-next-line max-classes-per-file
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

class MockCommentRepository {
  async isCommentExist(commentId) {
    return true;
  }

  async isCommentOwner(commentId, owner) {
    return true;
  }

  async deleteComment(commentId) {
    // Mocked implementation for deleting a comment
    return { id: commentId };
  }
}

class MockThreadRepository {
  async isThreadExist(threadId) {
    return true;
  }
}

describe('DeleteCommentUseCase', () => {
  describe('execute', () => {
    it('should delete a comment when the thread and comment exist, and the user is the owner', async () => {
      // Arrange
      const mockCommentRepository = new MockCommentRepository();
      const mockThreadRepository = new MockThreadRepository();
      const deleteCommentUseCase = new DeleteCommentUseCase({
        commentRepository: mockCommentRepository,
        threadRepository: mockThreadRepository,
      });

      const useCasePayload = {
        id: 'comment-123',
        threadId: 'thread-456',
        owner: 'user-789',
      };

      // Act
      const result = await deleteCommentUseCase.execute(useCasePayload);

      // Assert
      expect(result).toEqual({ id: useCasePayload.id });
    });

    it('should throw an error when the thread does not exist', async () => {
      // Arrange
      const mockCommentRepository = new MockCommentRepository();
      const mockThreadRepository = {
        async isThreadExist(threadId) {
          return false;
        },
      };

      const deleteCommentUseCase = new DeleteCommentUseCase({
        commentRepository: mockCommentRepository,
        threadRepository: mockThreadRepository,
      });

      const useCasePayload = {
        id: 'comment-123',
        threadId: 'nonexistent-thread',
        owner: 'user-789',
      };

      // Act & Assert
      await expect(deleteCommentUseCase.execute(useCasePayload)).rejects.toThrow('DELETE_COMMENT_USE_CASE.THREAD_NOT_FOUND');
    });

    it('should throw an error when the comment does not exist', async () => {
      // Arrange
      const mockCommentRepository = {
        async isCommentExist(commentId) {
          return false;
        },
      };

      const mockThreadRepository = new MockThreadRepository();
      const deleteCommentUseCase = new DeleteCommentUseCase({
        commentRepository: mockCommentRepository,
        threadRepository: mockThreadRepository,
      });

      const useCasePayload = {
        id: 'nonexistent-comment',
        threadId: 'thread-456',
        owner: 'user-789',
      };

      // Act & Assert
      await expect(deleteCommentUseCase.execute(useCasePayload)).rejects.toThrow('DELETE_COMMENT_USE_CASE.COMMENT_NOT_FOUND');
    });

    it('should throw an error when the user is not the owner of the comment', async () => {
      // Arrange
      const mockCommentRepository = {
        async isCommentExist(commentId) {
          return true;
        },
        async isCommentOwner(commentId, owner) {
          return false;
        },
      };

      const mockThreadRepository = new MockThreadRepository();
      const deleteCommentUseCase = new DeleteCommentUseCase({
        commentRepository: mockCommentRepository,
        threadRepository: mockThreadRepository,
      });

      const useCasePayload = {
        id: 'comment-123',
        threadId: 'thread-456',
        owner: 'non-owner-user',
      };

      // Act & Assert
      await expect(deleteCommentUseCase.execute(useCasePayload)).rejects.toThrow('DELETE_COMMENT_USE_CASE.COMMENT_NOT_OWNED');
    });
  });
});
