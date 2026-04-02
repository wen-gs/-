import { test, expect } from '@playwright/test';

test.describe('Matchmaking Profile Smoke Tests', () => {
  test('should load the page and toggle theme', async ({ page }) => {
    await page.goto('/');
    
    // Check initial state (should not crash)
    await expect(page).toHaveTitle(/遇见你/);
    
    // Wait for loader to disappear
    const loader = page.locator('#page-loader');
    await expect(loader).toBeHidden({ timeout: 5000 });
    
    // Test theme toggle
    const themeBtn = page.locator('#theme-toggle');
    const htmlElement = page.locator('html');
    
    // Retrieve current theme
    const initialTheme = await htmlElement.getAttribute('data-theme');
    
    // Toggle theme
    await themeBtn.click();
    
    // Retrieve new theme
    const newTheme = await htmlElement.getAttribute('data-theme');
    expect(newTheme).not.toEqual(initialTheme);
  });

  test('should open and close lightbox', async ({ page }) => {
    await page.goto('/');
    
    // Wait for loader to disappear
    const loader = page.locator('#page-loader');
    await expect(loader).toBeHidden({ timeout: 5000 });
    
    // The lightbox should be hidden initially
    const lightbox = page.locator('#lightbox');
    await expect(lightbox).toHaveAttribute('aria-hidden', 'true');
    
    // Click the first zoomable image
    const firstImage = page.locator('.gallery-item img.zoomable').first();
    await firstImage.click();
    
    // The lightbox should open
    await expect(lightbox).toHaveAttribute('aria-hidden', 'false');
    
    // Click the close button
    const closeBtn = page.locator('.close-lightbox');
    await closeBtn.click();
    
    // The lightbox should hide
    await expect(lightbox).toHaveAttribute('aria-hidden', 'true');
  });
});
