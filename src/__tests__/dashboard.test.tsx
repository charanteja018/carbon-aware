import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DashboardPage from '@/app/dashboard/page';
import { useEmissionsStore } from '@/lib/store';

// Mock Next.js routing hooks
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => new URLSearchParams('')),
}));

// Mock Recharts to avoid testing SVG/DOM rendering complexity
jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts');
  return {
    ...OriginalModule,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
    LineChart: () => <div data-testid="line-chart" />,
    PieChart: () => <div data-testid="pie-chart" />,
  };
});

describe('Dashboard Math and Edge Cases', () => {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  beforeEach(() => {
    useEmissionsStore.getState().resetStore();
  });

  it('safely handles empty data states without crashing or NaN', () => {
    // Inject empty emissions state
    useEmissionsStore.setState({ emissions: [], profile: { green_score: 0 } });
    
    render(<DashboardPage />);
    
    // Total footprint should be 0.0
    expect(screen.getAllByText(/0\.0\s*kg/i)[0]).toBeInTheDocument();
    
    // Trees needed should be 0
    expect(screen.getAllByText(/0\s*Trees/i)[0]).toBeInTheDocument();
    
    // Streak should be 0 Days
    expect(screen.getAllByText(/0\s*Days/i)[0]).toBeInTheDocument();
  });

  it('calculates total emissions and trees needed accurately', () => {
    useEmissionsStore.setState({ 
      emissions: [
        { id: '1', category: 'Transport', amount_kg_co2: 10, action_description: 'Test', logged_date: today, created_at: today },
        { id: '2', category: 'Food', amount_kg_co2: 15, action_description: 'Test', logged_date: today, created_at: today }
      ], 
      profile: { green_score: 50 } 
    });

    render(<DashboardPage />);
    
    // Total footprint: 10 + 15 = 25.0
    expect(screen.getAllByText(/25\.0\s*kg/i)[0]).toBeInTheDocument();
    
    // Trees needed: Math.ceil(25 / 2) = 13
    expect(screen.getAllByText(/13\s*Trees/i)[0]).toBeInTheDocument();
  });

  it('calculates streaks correctly for consecutive days', () => {
    const twoDaysAgo = new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0];

    useEmissionsStore.setState({ 
      emissions: [
        { id: '1', category: 'Transport', amount_kg_co2: 5, action_description: 'Test', logged_date: today, created_at: today },
        { id: '2', category: 'Food', amount_kg_co2: 5, action_description: 'Test', logged_date: yesterday, created_at: yesterday },
        { id: '3', category: 'Electricity', amount_kg_co2: 5, action_description: 'Test', logged_date: twoDaysAgo, created_at: twoDaysAgo }
      ]
    });

    render(<DashboardPage />);
    
    // Should detect a 3 day streak
    expect(screen.getAllByText(/3\s*Days/i)[0]).toBeInTheDocument();
  });

  it('ignores broken streaks', () => {
    const threeDaysAgo = new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0];

    useEmissionsStore.setState({ 
      emissions: [
        { id: '1', category: 'Transport', amount_kg_co2: 5, action_description: 'Test', logged_date: today, created_at: today },
        // Missed yesterday and 2 days ago
        { id: '2', category: 'Electricity', amount_kg_co2: 5, action_description: 'Test', logged_date: threeDaysAgo, created_at: threeDaysAgo }
      ]
    });

    render(<DashboardPage />);
    
    // Should detect a 1 day streak because yesterday is missing
    expect(screen.getAllByText(/1\s*Day/i)[0]).toBeInTheDocument();
  });

  it('handles High and Critical severity logic correctly', () => {
    useEmissionsStore.setState({ 
      emissions: [
        { id: '1', category: 'Transport', amount_kg_co2: 45, action_description: 'Test', logged_date: today, created_at: today }
      ]
    });

    const { unmount } = render(<DashboardPage />);
    
    // High Severity (> 40)
    expect(screen.getByText('High Severity')).toBeInTheDocument();
    
    unmount();

    useEmissionsStore.setState({ 
      emissions: [
        { id: '2', category: 'Transport', amount_kg_co2: 85, action_description: 'Test2', logged_date: today, created_at: today }
      ]
    });

    render(<DashboardPage />);
    // Critical Severity (> 80)
    expect(screen.getByText('Critical Severity')).toBeInTheDocument();
  });

  it('handles week, month, and year filters', () => {
    const { useSearchParams } = require('next/navigation');
    
    // Test Month
    useSearchParams.mockReturnValue(new URLSearchParams('?filter=month'));
    const { unmount } = render(<DashboardPage />);
    expect(screen.getByText('Live Carbon Tracker')).toBeInTheDocument();
    unmount();

    // Test Year
    useSearchParams.mockReturnValue(new URLSearchParams('?filter=year'));
    const { unmount: unmountYear } = render(<DashboardPage />);
    expect(screen.getByText('Live Carbon Tracker')).toBeInTheDocument();
    unmountYear();

    // Test Week
    useSearchParams.mockReturnValue(new URLSearchParams('?filter=week'));
    render(<DashboardPage />);
    expect(screen.getByText('Live Carbon Tracker')).toBeInTheDocument();
  });
});
