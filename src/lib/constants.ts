export const ACTIVITY_MULTIPLIERS: Record<string, { category: string; multiplier: number }> = {
  'Car (Gasoline)': { category: 'Transport', multiplier: 0.411 }, // per mile
  'Car (Electric)': { category: 'Transport', multiplier: 0.12 }, // per mile
  'Bus': { category: 'Transport', multiplier: 0.17 }, // per mile
  'Train / Subway': { category: 'Transport', multiplier: 0.06 }, // per mile
  'Flight (Short Haul)': { category: 'Transport', multiplier: 0.25 }, // per mile
  'Bicycle / Walk': { category: 'Transport', multiplier: 0 },
  
  'Vegetarian Meal': { category: 'Food', multiplier: 1.5 }, // per serving
  'Vegan Meal': { category: 'Food', multiplier: 0.9 }, // per serving
  'Beef Meal': { category: 'Food', multiplier: 7.2 }, // per serving
  
  'Air Conditioning': { category: 'Electricity', multiplier: 1.2 }, // per hour
  'Heater': { category: 'Electricity', multiplier: 1.5 }, // per hour
  
  'Clothing / Apparel': { category: 'Purchases', multiplier: 15.0 }, // per item
  'Electronics': { category: 'Purchases', multiplier: 50.0 }, // per item
  'General Shopping': { category: 'Purchases', multiplier: 5.0 }, // per item
}
