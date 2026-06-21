import { test, expect } from '@playwright/test';

test.describe('CarbonAware E2E Testing', () => {
  test('homepage loads and displays correct branding', async ({ page }) => {
    await page.goto('/');
    
    // Check that the title is correct
    await expect(page).toHaveTitle(/Carbon Aware/);
    
    // Check that the main hero heading is visible
    await expect(page.getByText('Understand Your Carbon Footprint. Experience the Impact.')).toBeVisible();
  });

  test('navigation to activity logging works correctly', async ({ page }) => {
    await page.goto('/');
    
    // Click the Calculate Your Impact button
    await page.click('text=Calculate Your Impact');
    
    // Verify we are on the activity page
    await expect(page).toHaveURL(/.*activity/);
    await expect(page.getByText('Log Your Activities')).toBeVisible();
  });

  test('navigation to dashboard works correctly', async ({ page }) => {
    await page.goto('/');
    
    // Click the View Live Dashboard button
    await page.click('text=View Live Dashboard');
    
    // Verify we are on the dashboard
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.getByText('Environmental Dashboard')).toBeVisible();
  });
});
