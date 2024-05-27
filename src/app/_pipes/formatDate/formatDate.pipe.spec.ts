import { FormatDatePipe } from './formatDate.pipe';

describe('formatDatePipe', () => {
  it('create an instance', () => {
    const pipe = new FormatDatePipe();
    expect(pipe).toBeTruthy();
  });
});
