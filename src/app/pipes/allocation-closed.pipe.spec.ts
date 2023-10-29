import { AllocationClosedPipe } from './allocation-closed.pipe';

describe('AllocationClosedPipe', () => {
  it('create an instance', () => {
    const pipe = new AllocationClosedPipe();
    expect(pipe).toBeTruthy();
  });
});
