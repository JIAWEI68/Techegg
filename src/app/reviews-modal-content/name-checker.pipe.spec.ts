import { NameCheckerPipe } from './name-checker.pipe';

describe('NameCheckerPipe', () => {
  it('create an instance', () => {
    const pipe = new NameCheckerPipe();
    expect(pipe).toBeTruthy();
  });
});
