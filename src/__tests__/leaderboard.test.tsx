import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LeaderboardPage from '@/app/leaderboard/page';
import { useEmissionsStore } from '@/lib/store';

describe('Leaderboard Ranking and Edge Cases', () => {
  beforeEach(() => {
    useEmissionsStore.getState().resetStore();
  });

  it('safely handles 0 score and ranks correctly', () => {
    useEmissionsStore.setState({ profile: { green_score: 0 } });
    render(<LeaderboardPage />);
    
    // User should have 0 pts
    expect(screen.getByText('0 pts')).toBeInTheDocument();
  });

  it('safely handles missing or corrupted profile state', () => {
    // Inject corrupted profile data
    useEmissionsStore.setState({ profile: { green_score: NaN } });
    render(<LeaderboardPage />);
    
    // Should fallback to 0 pts gracefully instead of rendering NaN
    expect(screen.getByText('0 pts')).toBeInTheDocument();
  });

  it('displays the user score prominently', () => {
    useEmissionsStore.setState({ profile: { green_score: 1250 } });
    render(<LeaderboardPage />);
    
    expect(screen.getByText('1250 pts')).toBeInTheDocument();
    // Since this is the only user in the local mock array right now, they should be rank 1
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
