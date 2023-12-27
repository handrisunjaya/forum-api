// MockThreadRepository.js
class MockThreadRepository {
  async getThreadById(threadId) {
    const thread = {
      id: threadId,
      title: 'Test Thread',
      body: 'This is a test thread.',
      date: new Date().toISOString(),
      username: 'user123',
      comments: [],
      setComments(comments) {
        this.comments = comments;
      },
    };

    return thread;
  }
}

module.exports = MockThreadRepository;
