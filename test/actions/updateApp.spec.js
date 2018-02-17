import { updateApp } from '../../src/actions';

describe('updateApp action', () => {
  it('should create an action with type UPDATE_APP', () => {
    const expectedAction = {
      type: 'UPDATE_APP'
    };
    expect(updateApp()).toEqual(expectedAction);
  });
});
