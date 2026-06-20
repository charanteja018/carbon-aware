import { ACTIVITY_MULTIPLIERS } from '@/lib/constants';

describe('Emission Calculations', () => {
  it('calculates transport emissions correctly', () => {
    const type = 'Car (Gasoline)';
    const quantity = 10;
    const multiplier = ACTIVITY_MULTIPLIERS[type].multiplier;
    const result = multiplier * quantity;
    expect(result).toBeCloseTo(3.06, 2);
  });

  it('calculates food emissions correctly', () => {
    const type = 'Vegetarian Meal';
    const quantity = 2;
    const multiplier = ACTIVITY_MULTIPLIERS[type].multiplier;
    const result = multiplier * quantity;
    expect(result).toBe(1.2 * 2);
  });

  it('validates input ranges effectively', () => {
    const validate = (quantity: number) => {
      if (isNaN(quantity) || quantity <= 0 || quantity > 10000) {
        throw new Error('Invalid input. Quantity must be greater than 0 and less than 10000.');
      }
      return true;
    };

    expect(() => validate(-5)).toThrow('Invalid input');
    expect(() => validate(0)).toThrow('Invalid input');
    expect(() => validate(15000)).toThrow('Invalid input');
    expect(validate(10)).toBe(true);
  });
});
