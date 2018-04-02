import * as utils from '../../src/lib/utils';


describe('shiftCoords function', () => {

  const coordinates = { lat: 19.14641, long: 73.1424 };
  let shiftCoordsSpy;

  beforeAll(() => {
    shiftCoordsSpy = jest.spyOn(utils, 'shiftCoords');
  });

  afterAll(() => {
    shiftCoordsSpy.mockClear();
  });

  it('should receive one object', () => {
    utils.shiftCoords(coordinates);
    expect(shiftCoordsSpy.mock.calls[0].length).toBe(1);
    expect(typeof shiftCoordsSpy.mock.calls[0][0]).toBe('object');
  });

  it('input object should be a coordinate', () => {
    utils.shiftCoords(coordinates);
    expect(Object.keys(shiftCoordsSpy.mock.calls[0][0])).toEqual(expect.arrayContaining(['lat', 'long']));
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