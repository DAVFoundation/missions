import * as utils from '../../src/lib/utils';


describe('shiftCoords function', () => {

  const coordinates = { lat: 19.14641, long: 73.1424 };

  it('return undefined if input object is not a coordinate', () => {
    const output = utils.shiftCoords({ other : 'than', a : 'coordinate' });
    expect(output).toEqual(undefined);
  });

  it('should return one object', () => {
    const output = utils.shiftCoords(coordinates);
    expect(typeof output).toBe('object');
  });
  
  it('return object should be a coordinate', () => {
    const output = utils.shiftCoords(coordinates);
    expect(Object.keys(output)).toEqual(expect.arrayContaining(['lat', 'long']));
  });

});