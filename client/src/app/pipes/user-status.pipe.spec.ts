import { UserStatusPipe } from './user-status.pipe';

describe('UserStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new UserStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
