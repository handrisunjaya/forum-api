// MockCommentRepository.js
class MockCommentRepository {
  async getCommentsByThreadId(threadId) {
    return [
      {
        id: 'comment-1',
        username: 'user456',
        date: new Date().toISOString(),
        content: 'This is a comment.',
        isDelete: false,
      },
      {
        id: 'comment-2',
        username: 'user789',
        date: new Date().toISOString(),
        content: 'Another comment.',
        isDelete: false,
      },
    ];
  }
}

module.exports = MockCommentRepository;
