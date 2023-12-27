const CommentRepository = require('../CommentRepository');

class ConcreteCommentRepository extends CommentRepository {
  async addComment(newComment) {
    // Implement logic for adding a comment in the concrete subclass
    return newComment;
  }

  async isCommentExist(commentId) {
    // Implement logic for checking if a comment exists in the concrete subclass
    return true; // For testing purposes, always return true
  }

  async isCommentOwner(commentId, owner) {
    // Implement logic for checking if a user is the owner of a comment in the concrete subclass
    return true; // For testing purposes, always return true
  }

  async deleteComment(commentId) {
    // Implement logic for deleting a comment in the concrete subclass
    // For testing purposes, do nothing
  }

  async getCommentsByThreadId(threadId) {
    // Implement logic for retrieving comments by thread ID in the concrete subclass
    return []; // For testing purposes, return an empty array
  }
}

describe('CommentRepository', () => {
  describe('Abstract methods', () => {
    it('should throw errors for unimplemented methods', async () => {
      const commentRepository = new CommentRepository();

      // Test each abstract method for proper error throwing
      await expect(commentRepository.addComment()).rejects.toThrow('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
      await expect(commentRepository.isCommentExist()).rejects.toThrow('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
      await expect(commentRepository.isCommentOwner()).rejects.toThrow('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
      await expect(commentRepository.deleteComment()).rejects.toThrow('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
      await expect(commentRepository.getCommentsByThreadId()).rejects.toThrow('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });
  });

  describe('Concrete methods', () => {
    it('should not throw errors for implemented methods in concrete subclass', async () => {
      const concreteCommentRepository = new ConcreteCommentRepository();

      // Test each implemented method in the concrete subclass
      await expect(concreteCommentRepository.addComment({})).resolves.toBeTruthy();
      await expect(concreteCommentRepository.isCommentExist('commentId')).resolves.toBe(true);
      await expect(concreteCommentRepository.isCommentOwner('commentId', 'owner')).resolves.toBe(true);
      await expect(concreteCommentRepository.deleteComment('commentId')).resolves.toBeUndefined();
      await expect(concreteCommentRepository.getCommentsByThreadId('threadId')).resolves.toEqual([]);
    });
  });
});
