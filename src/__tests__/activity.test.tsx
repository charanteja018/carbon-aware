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

  it('handles invalid inputs gracefully (NaN protection)', async () => {
    render(<ActivityPage />);
    const quantityInput = screen.getByPlaceholderText(/e.g. 15/i);
    
    // Type something that parses as NaN or empty string (handled by input type="number" natively, 
    // but in testing we can simulate an empty string which sets it to NaN)
    fireEvent.change(quantityInput, { target: { value: '' } });
    
    // Impact should default to 0.0 without crashing
    expect(screen.getAllByText(/0\.0/i)[0]).toBeInTheDocument();

    const form = document.querySelector('form') as HTMLFormElement;

    // Test form submission validation (<= 0)
    fireEvent.change(quantityInput, { target: { value: '0' } });
    fireEvent.submit(form);
    
    expect(await screen.findByText('Quantity must be a valid positive number.')).toBeInTheDocument();

    // Test form submission validation (> 100000)
    fireEvent.change(quantityInput, { target: { value: '100001' } });
    fireEvent.submit(form);
    
    expect(await screen.findByText('Quantity cannot exceed 100,000 to maintain system stability.')).toBeInTheDocument();
  });

  it('submits the form successfully and clears state', async () => {
    render(<ActivityPage />);
    
    // Set valid form values
    const quantityInput = screen.getByPlaceholderText(/e.g. 15/i);
    fireEvent.change(quantityInput, { target: { value: '10' } });
    
    // Submit form
    const form = document.querySelector('form') as HTMLFormElement;
    fireEvent.submit(form);
    
    // Ensure success result box appears
    expect(await screen.findByText(/Car \(Gasoline\)/i)).toBeInTheDocument();
  });
  it('switches to Diet category and calculates impact', () => {
    render(<ActivityPage />);
    
    // Switch to Diet
    fireEvent.click(screen.getByText('Diet', { selector: 'span' }));
    
    // Check that select options updated
    expect(screen.getAllByText('Vegetarian Meal')[0]).toBeInTheDocument();
    
    const quantityInput = screen.getByPlaceholderText(/e.g. 15/i);
    fireEvent.change(quantityInput, { target: { value: '2' } });
    
    // 2 * 1.2 = 2.4
    expect(screen.getByText(/2.4/i)).toBeInTheDocument();
  });

  it('switches to Energy category and calculates impact', () => {
    render(<ActivityPage />);
    
    // Switch to Energy
    fireEvent.click(screen.getByText('Energy', { selector: 'span' }));
    
    // Check that select options updated
    expect(screen.getAllByText('Air Conditioning')[0]).toBeInTheDocument();
    
    const quantityInput = screen.getByPlaceholderText(/e.g. 15/i);
    fireEvent.change(quantityInput, { target: { value: '5' } });
    
    // 5 * 1.1 = 5.5
    expect(screen.getByText(/5.5/i)).toBeInTheDocument();
  });

  it('switches to Shopping category and calculates impact', () => {
    render(<ActivityPage />);
    
    // Switch to Shopping
    fireEvent.click(screen.getByText('Shopping', { selector: 'span' }));
    
    // Check that select options updated
    expect(screen.getAllByText('Electronics')[0]).toBeInTheDocument();
    
    const quantityInput = screen.getByPlaceholderText(/e.g. 15/i);
    fireEvent.change(quantityInput, { target: { value: '1' } });
    
    // 1 * 50 = 50.0 or 1 * 15 (if clothing is default)
    // Actually Clothing is default for Shopping: 15.0 * 1 = 15.0
    expect(screen.getByText(/15.0/i)).toBeInTheDocument();
  });

  it('handles Quick Add buttons correctly', () => {
    render(<ActivityPage />);
    
    // Quick Add Bus
    fireEvent.click(screen.getByText('Daily Commute (Bus)', { selector: 'p' }));
    // 10 miles * 0.16 = 1.6
    expect(screen.getByText(/1.6/i)).toBeInTheDocument();

    // Quick Add Vegetarian Meal
    fireEvent.click(screen.getByText('Vegetarian Meal', { selector: 'p' }));
    // 1 serving * 1.2 = 1.2
    expect(screen.getByText(/1.2/i)).toBeInTheDocument();

    // Quick Add Air Conditioning
    fireEvent.click(screen.getByText('Air Conditioning', { selector: 'p' }));
    // 4 hours * 1.1 = 4.4
    expect(screen.getByText(/4.4/i)).toBeInTheDocument();
  });

});
