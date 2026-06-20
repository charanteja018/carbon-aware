import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ActivityPage from '@/app/activity/page';
import { useEmissionsStore } from '@/lib/store';

describe('Activity Page', () => {
  beforeEach(() => {
    useEmissionsStore.setState({ emissions: [], profile: { green_score: 0 } });
  });

  it('renders the activity form and dynamic estimated impact', () => {
    render(<ActivityPage />);
    
    // Check main form elements
    expect(screen.getByText(/Log Your Activities/i)).toBeInTheDocument();
    expect(screen.getByText('Activity Type')).toBeInTheDocument();
    expect(screen.getByText(/Quantity/i)).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
  });

  it('calculates the estimated impact dynamically when input changes', () => {
    render(<ActivityPage />);
    
    const quantityInput = screen.getByPlaceholderText(/e.g. 15/i);
    
    // Default is Car (Gasoline) which is 0.306 kg/mile. 10 miles = 3.1 kg
    fireEvent.change(quantityInput, { target: { value: '10' } });
    
    expect(screen.getByText(/3.1/i)).toBeInTheDocument();
    expect(screen.getByText(/kg CO2/i)).toBeInTheDocument();
  });

  it('handles invalid inputs gracefully (NaN protection)', () => {
    render(<ActivityPage />);
    
    const quantityInput = screen.getByPlaceholderText(/e.g. 15/i);
    
    // Enter invalid text
    fireEvent.change(quantityInput, { target: { value: '-5' } });
    
    // Impact should default to 0 for negative numbers
    expect(screen.getByText(/0.0/i)).toBeInTheDocument();
  });

  it('submits the form successfully and clears state', async () => {
    render(<ActivityPage />);
    
    const quantityInput = screen.getByPlaceholderText(/e.g. 15/i);
    const submitBtn = screen.getByRole('button', { name: /Log Activity/i });
    
    fireEvent.change(quantityInput, { target: { value: '15' } });
    fireEvent.click(submitBtn);
    
    // Verify success message appears
    await waitFor(() => {
      expect(screen.getByText(/Activity Logged/i)).toBeInTheDocument();
    });
    
    // Verify it was saved to the store
    expect(useEmissionsStore.getState().emissions.length).toBe(1);
    expect(useEmissionsStore.getState().emissions[0].amount_kg_co2).toBeGreaterThan(0);
  });
});
