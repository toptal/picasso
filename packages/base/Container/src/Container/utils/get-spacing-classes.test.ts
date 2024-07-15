import {getGapStyle} from '.'


describe('getGapStyle', () => {
  describe('when provided with valid numeric gap spacing', () => {
    it('returns a style object', () => {
      const result = getGapStyle(2);
      
      expect(result).toEqual({ gap: '2rem' });
    });
  });

  describe('when gap spacing is undefined', () => {
    it('returns undefined', () => {
      const result = getGapStyle();
      
      expect(result).toBeUndefined();
    });
  });

  describe('when provided with non-numeric gap spacing', () => {
    it('returns undefined', () => {
      const result = getGapStyle('small');
      
      expect(result).toBeUndefined();
    });
  });

  // Add more tests if there are more cases to consider.
});