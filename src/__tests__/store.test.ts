import { useEmissionsStore } from '@/lib/store';

describe('Store Logic and Input Validation', () => {
  beforeEach(() => {
    // Reset store before each test to ensure clean state
    useEmissionsStore.getState().resetStore();
  });

  it('successfully logs a valid activity and updates profile points', () => {
    const initialEmissionsCount = useEmissionsStore.getState().emissions.length;

    const today = new Date().toISOString().split('T')[0];
    const result = useEmissionsStore.getState().logEmission('Car (Gasoline)', 10, today);

    expect(result.success).toBe(true);
    expect(result.amountKgCo2).toBeCloseTo(3.06, 2); // 10 miles * 0.306 kg/mile
    
    const state = useEmissionsStore.getState();
    expect(state.emissions.length).toBe(initialEmissionsCount + 1);
    expect(state.emissions[0].amount_kg_co2).toBeCloseTo(3.06, 2);
  });

  it('rejects missing or unknown activity types', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(() => {
      useEmissionsStore.getState().logEmission('Teleportation', 10, today);
    }).toThrow('Unknown activity type');
  });

  it('rejects negative quantity inputs', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(() => {
      useEmissionsStore.getState().logEmission('Car (Gasoline)', -5, today);
    }).toThrow('Quantity must be a positive finite number');
  });

  it('rejects zero quantity inputs', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(() => {
      useEmissionsStore.getState().logEmission('Car (Gasoline)', 0, today);
    }).toThrow('Quantity must be a positive finite number');
  });

  it('rejects NaN inputs', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(() => {
      useEmissionsStore.getState().logEmission('Car (Gasoline)', NaN, today);
    }).toThrow('Quantity must be a positive finite number');
  });

  it('rejects extreme inputs beyond max threshold to prevent overflow', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(() => {
      useEmissionsStore.getState().logEmission('Car (Gasoline)', 999999, today);
    }).toThrow('Quantity exceeds maximum allowed limit (100,000)');
  });

  it('rejects logging activities in the future', () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const futureDateStr = futureDate.toISOString().split('T')[0];

    expect(() => {
      useEmissionsStore.getState().logEmission('Car (Gasoline)', 10, futureDateStr);
    }).toThrow('Cannot log activities in the future');
  });

  it('rejects invalid date strings', () => {
    expect(() => {
      useEmissionsStore.getState().logEmission('Car (Gasoline)', 10, 'not-a-date');
    }).toThrow('Invalid date format');
  });
});
