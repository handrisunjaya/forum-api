// GetThreadUseCase.test.js
const GetThreadUseCase = require('../GetThreadUseCase');
const MockThreadRepository = require('../MockThreadRepository');
const MockCommentRepository = require('../MockCommentRepository');

describe('GetThreadUseCase', () => {
  it('should retrieve a thread with comments', async () => {
    // Arrange
    const mockThreadRepository = new MockThreadRepository();
    const mockCommentRepository = new MockCommentRepository();
    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    const threadId = 'thread-123';

    // Act
    const result = await getThreadUseCase.execute(threadId);

    // Assert
    expect(result).toBeDefined();
    expect(result.id).toBe(threadId);
    expect(result.title).toBe('Test Thread');
    expect(result.body).toBe('This is a test thread.');
    expect(result.date).toBeDefined();
    expect(result.username).toBe('user123');
    expect(result.comments).toHaveLength(2);
  });

  it('should throw an error when the thread is not found', async () => {
    // Arrange
    const mockThreadRepository = {
      async getThreadById(threadId) {
        return null;
      },
    };

    const mockCommentRepository = new MockCommentRepository();
    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    const threadId = 'nonexistent-thread';

    // Act & Assert
    await expect(getThreadUseCase.execute(threadId)).rejects.toThrow('GET_THREAD_USE_CASE.THREAD_NOT_FOUND');
  });
});
