import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LandingPage from '@/app/page';

describe('Landing Page', () => {
  it('renders the main hero section with appropriate CTAs', () => {
    render(<LandingPage />);
    
    // Check for main headline
    expect(screen.getByText(/Understand Your/i)).toBeInTheDocument();
    
    // Check for key awareness content
    expect(screen.getByText(/Resource Depletion/i)).toBeInTheDocument();
    expect(screen.getByText(/Biodiversity/i)).toBeInTheDocument();
    
    // Check for call to action buttons
    expect(screen.getByRole('link', { name: /Calculate Your Impact/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View Live Dashboard/i })).toBeInTheDocument();
  });

  it('renders the problem alignment statistics correctly', () => {
    render(<LandingPage />);
    
    expect(screen.getByText(/Global Emergency/i)).toBeInTheDocument();
    expect(screen.getByText(/1.2 Million/i)).toBeInTheDocument();
  });
});
