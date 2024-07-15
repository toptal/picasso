import type { SpacingType } from '@toptal/picasso-provider';
import { isPicassoSpacing, isResponsiveSpacing } from '@toptal/picasso-provider';

import {getGapStyle, getMappedClass, SPACING_CLASSES} from '.'

// Mocks for the type-checking functions
jest.mock('@toptal/picasso-provider', () => ({
  isPicassoSpacing: jest.fn(),
  isResponsiveSpacing: jest.fn(),
}));

describe('getMappedClass', () => {
  describe('when spacing is undefined', () => {
    it('returns undefined', () => {
      expect(getMappedClass(undefined, 'gap')).toBeUndefined();
    });
  });

  describe('when spacing is a number', () => {
    it('returns undefined', () => {
      expect(getMappedClass(5, 'gap')).toBeUndefined();
    });
  });

  describe('when spacing is a Picasso spacing object', () => {
    beforeEach(() => {
      (isPicassoSpacing as unknown as jest.Mock).mockReturnValue(true);
      (isResponsiveSpacing as unknown as jest.Mock).mockReturnValue(false);
    });

    it('returns the correct class for each type', () => {
      Object.entries(SPACING_CLASSES.base).forEach(([index, classes]) => {
        const spacing = { baseTokenIndex: parseInt(index) };
        
        Object.keys(classes).forEach((type) => {
          const expectedClass = classes[type];

          expect(getMappedClass(spacing as SpacingType, type as keyof typeof classes)).toBe(expectedClass);
        });
      });
    });
  });

  describe('when spacing is a string (deprecated spacing)', () => {
    beforeEach(() => {
      (isPicassoSpacing as unknown as jest.Mock).mockReturnValue(false);
      (isResponsiveSpacing as unknown as jest.Mock).mockReturnValue(false);
    });

    it('returns the correct class for each type', () => {
      Object.entries(SPACING_CLASSES.deprecated).forEach(([spacing, classes]) => {
        Object.keys(classes).forEach((type) => {

          expect(getMappedClass(spacing as SpacingType, type as keyof typeof classes)).toBe(classes);
        });
      });
    });
  });

  describe('when spacing is a responsive spacing object', () => {
    beforeEach(() => {
      (isPicassoSpacing as unknown as jest.Mock).mockReturnValue(false);
      (isResponsiveSpacing as unknown as jest.Mock).mockReturnValue(true);
    });

    it('handles responsive spacing correctly', () => {
      // TODO: Add tests for responsive spacing once the implementation is complete
      // For now, we can just check that the function does not throw
      expect(() => {
        const spacing = { responsive: true };

        getMappedClass(spacing, 'gap');
      }).not.toThrow();
    });
  });

  // Add more describe blocks to cover other scenarios as needed
});


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