export const ACTIVITY_MULTIPLIERS: Record<string, { category: string; multiplier: number; unit: string; source: string; suggestion: string }> = {
  'Car (Gasoline)': { 
    category: 'Transport', multiplier: 0.411, unit: 'miles', 
    source: 'EPA GHG Emission Factors Hub (2023)', 
    suggestion: 'Consider replacing 2 short car trips with biking this week.' 
  },
  'Car (Electric)': { 
    category: 'Transport', multiplier: 0.12, unit: 'miles', 
    source: 'EPA GHG Emission Factors Hub (2023)', 
    suggestion: 'Great choice! Try charging during off-peak hours for greener grid energy.' 
  },
  'Bus': { 
    category: 'Transport', multiplier: 0.17, unit: 'miles', 
    source: 'EPA GHG Emission Factors Hub (2023)', 
    suggestion: 'Public transit is excellent. Encourage a friend to join you next time!' 
  },
  'Train / Subway': { 
    category: 'Transport', multiplier: 0.06, unit: 'miles', 
    source: 'EPA GHG Emission Factors Hub (2023)', 
    suggestion: 'Trains are highly efficient! Keep riding the rails.' 
  },
  'Flight (Short Haul)': { 
    category: 'Transport', multiplier: 0.25, unit: 'miles', 
    source: 'DEFRA (2023)', 
    suggestion: 'For trips under 300 miles, taking a train can cut emissions by up to 80%.' 
  },
  'Bicycle / Walk': { 
    category: 'Transport', multiplier: 0, unit: 'miles', 
    source: 'Zero Emission (Verified)', 
    suggestion: 'Perfect zero-emission travel! You are a climate hero.' 
  },
  
  'Vegetarian Meal': { 
    category: 'Food', multiplier: 1.5, unit: 'servings', 
    source: 'Our World in Data (2020)', 
    suggestion: 'Excellent! Plant-based meals use 70% less land and water.' 
  },
  'Vegan Meal': { 
    category: 'Food', multiplier: 0.9, unit: 'servings', 
    source: 'Our World in Data (2020)', 
    suggestion: 'Vegan meals have the lowest carbon footprint of any diet!' 
  },
  'Beef Meal': { 
    category: 'Food', multiplier: 7.2, unit: 'servings', 
    source: 'Our World in Data (2020)', 
    suggestion: 'Beef is highly intensive. Try swapping one beef meal for chicken or beans to save ~5kg CO2.' 
  },
  
  'Air Conditioning': { 
    category: 'Electricity', multiplier: 1.2, unit: 'hours', 
    source: 'US EIA (2022 Average Grid Factor)', 
    suggestion: 'Raising your thermostat by just 1°C can save up to 10% on cooling emissions.' 
  },
  'Heater': { 
    category: 'Electricity', multiplier: 1.5, unit: 'hours', 
    source: 'US EIA (2022 Average Grid Factor)', 
    suggestion: 'Lowering the thermostat 1°C and wearing a sweater saves significant energy.' 
  },
  
  'Clothing / Apparel': { 
    category: 'Purchases', multiplier: 15.0, unit: 'items', 
    source: 'UN Environment Programme', 
    suggestion: 'Fast fashion is carbon-heavy. Try thrifting or buying high-quality lasting pieces.' 
  },
  'Electronics': { 
    category: 'Purchases', multiplier: 50.0, unit: 'items', 
    source: 'Carbon Trust', 
    suggestion: 'Manufacturing electronics takes huge energy. Keep devices longer or buy refurbished.' 
  },
  'General Shopping': { 
    category: 'Purchases', multiplier: 5.0, unit: 'items', 
    source: 'Carbon Trust Average', 
    suggestion: 'Mindful consumption is key. Ask yourself: do I really need this today?' 
  },
}
