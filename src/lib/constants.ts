export const DATA_LAST_UPDATED = 'June 2026';

export const ACTIVITY_MULTIPLIERS: Record<string, { category: string; multiplier: number; unit: string; source: string; suggestion: string }> = {
  'Car (Gasoline)': { 
    category: 'Transport', multiplier: 0.306, unit: 'miles', 
    source: 'EPA GHG Emission Factors Hub (2025/2026)', 
    suggestion: 'Consider replacing 2 short car trips with biking this week to reduce immediate localized air pollution.' 
  },
  'Car (Electric)': { 
    category: 'Transport', multiplier: 0.10, unit: 'miles', 
    source: 'EPA GHG Emission Factors Hub (2025 Grid Average)', 
    suggestion: 'Great choice! Try charging during off-peak hours for greener grid energy.' 
  },
  'Bus': { 
    category: 'Transport', multiplier: 0.16, unit: 'miles', 
    source: 'EPA GHG Emission Factors Hub (2025/2026)', 
    suggestion: 'Public transit drastically lowers per-passenger emissions. Encourage a friend to join you next time!' 
  },
  'Train / Subway': { 
    category: 'Transport', multiplier: 0.05, unit: 'miles', 
    source: 'EPA GHG Emission Factors Hub (2025/2026)', 
    suggestion: 'Trains are highly efficient! Keep riding the rails to combat urban smog.' 
  },
  'Flight (Short Haul)': { 
    category: 'Transport', multiplier: 0.207, unit: 'miles', 
    source: 'EPA GHG Emission Factors Hub (2025/2026)', 
    suggestion: 'For trips under 300 miles, taking a high-speed train can cut emissions by up to 80%.' 
  },
  'Bicycle / Walk': { 
    category: 'Transport', multiplier: 0, unit: 'miles', 
    source: 'Zero Emission (Verified)', 
    suggestion: 'Perfect zero-emission travel! You are actively helping keep global temperatures down.' 
  },
  
  'Vegetarian Meal': { 
    category: 'Food', multiplier: 1.2, unit: 'servings', 
    source: 'Our World in Data / IPCC (2025 Update)', 
    suggestion: 'Excellent! Plant-based meals use significantly less land, helping protect 2026 biodiversity targets.' 
  },
  'Vegan Meal': { 
    category: 'Food', multiplier: 0.7, unit: 'servings', 
    source: 'Our World in Data / IPCC (2025 Update)', 
    suggestion: 'Vegan meals have the lowest carbon footprint of any diet, drastically reducing water scarcity risks.' 
  },
  'Beef Meal': { 
    category: 'Food', multiplier: 27.0, unit: 'servings', 
    source: 'FAO / IPCC (2025 Lifecycle Analysis)', 
    suggestion: 'Beef is highly intensive. Swapping one beef meal for chicken or beans saves massive amounts of fresh water and emissions.' 
  },
  
  'Air Conditioning': { 
    category: 'Electricity', multiplier: 1.1, unit: 'hours', 
    source: 'US EIA (2025/2026 Grid Projections)', 
    suggestion: 'With 2026 heatwaves becoming more frequent, cooling is necessary but energy-intensive. Raise the thermostat 1°C to save 10%.' 
  },
  'Heater': { 
    category: 'Electricity', multiplier: 1.4, unit: 'hours', 
    source: 'US EIA (2025/2026 Grid Projections)', 
    suggestion: 'Lowering the thermostat 1°C and wearing a sweater saves significant energy and reduces grid strain.' 
  },
  
  'Clothing / Apparel': { 
    category: 'Purchases', multiplier: 15.0, unit: 'items', 
    source: 'UN Environment Programme (2025 Report)', 
    suggestion: 'Fast fashion fills landfills and pollutes waterways. Try thrifting or buying high-quality lasting pieces.' 
  },
  'Electronics': { 
    category: 'Purchases', multiplier: 50.0, unit: 'items', 
    source: 'Carbon Trust (2025/2026)', 
    suggestion: 'Electronic waste is a growing 2026 crisis. Keep devices longer or buy certified refurbished.' 
  },
  'General Shopping': { 
    category: 'Purchases', multiplier: 5.0, unit: 'items', 
    source: 'Carbon Trust (2025/2026)', 
    suggestion: 'Mindful consumption is key. Ask yourself: do I really need this today?' 
  },
}
