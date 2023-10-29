import { ClosureStatusPipe } from './closure-status.pipe';

describe('ClosureStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new ClosureStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
