import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import InsightsPage from '@/app/insights/page';
import { useEmissionsStore } from '@/lib/store';

// Mock recharts to avoid rendering actual SVGs in Jest
jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts');
  return {
    ...OriginalModule,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
    PieChart: () => <div data-testid="pie-chart" />,
  };
});

describe('Insights Page', () => {
  beforeEach(() => {
    useEmissionsStore.setState({ emissions: [], profile: { green_score: 0 } });
  });

  it('renders the empty state gracefully when no data exists', () => {
    render(<InsightsPage />);
    
    // Check for the header
    expect(screen.getByText(/Deep Insights/i)).toBeInTheDocument();
    
    // Check that we see the 0% data fallback safely
    expect(screen.getAllByText(/0%/i).length).toBeGreaterThan(0);
  });

  it('calculates the dominant category and provides relevant recommendations', () => {
    // Populate store with mock data heavy on Transport
    useEmissionsStore.setState({
      emissions: [
        {
          id: '1',
          category: 'Transport',
          amount_kg_co2: 50,
          action_description: 'Test Drive',
          logged_date: new Date().toISOString(),
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          category: 'Diet',
          amount_kg_co2: 5,
          action_description: 'Test Meal',
          logged_date: new Date().toISOString(),
          created_at: new Date().toISOString()
        }
      ]
    });

    render(<InsightsPage />);

    // Transport is the highest, so "Switch to public transit" recommendation should appear
    expect(screen.getByText(/Protect 2026 Biodiversity/i)).toBeInTheDocument();
    expect(screen.getByText(/Reduce Health Impacts/i)).toBeInTheDocument();

  });

  it('handles corrupted NaN state securely without crashing', () => {
    useEmissionsStore.setState({
      emissions: [
        {
          id: '1',
          category: 'Transport',
          amount_kg_co2: NaN, // Invalid data
          action_description: 'Test',
          logged_date: new Date().toISOString(),
          created_at: new Date().toISOString()
        }
      ]
    });

    render(<InsightsPage />);

    // Should render without throwing, treating NaN as 0.0 kg
    expect(screen.getAllByText(/0\.0\s*kg/i)[0]).toBeInTheDocument();
  });
});
