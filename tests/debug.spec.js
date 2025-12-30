// @ts-check
const { test, expect } = require('@playwright/test');

test('Debug - Inspect page structure', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  
  // Sign in
  await page.locator('input[name="username"]').fill('rahulshettyacademy');
  await page.locator('input[name="password"]').fill('learning');
  await page.locator('#signInBtn').click();

  // Wait for dashboard
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Take a screenshot
  await page.screenshot({ path: 'debug-screenshot.png' });

  // Log all text content to find iPhone X
  const bodyText = await page.locator('body').textContent();
  console.log('=== PAGE CONTENT ===');
  console.log(bodyText);

  // Try to find all product elements
  console.log('\n=== LOOKING FOR IPHONE X ===');
  const hasIPhoneX = await page.locator('text=iPhone X').count();
  console.log('Found "iPhone X" elements:', hasIPhoneX);

  if (hasIPhoneX > 0) {
    const iPhoneXElement = page.locator('text=iPhone X').first();
    console.log('iPhone X element HTML:', await iPhoneXElement.evaluate(el => el.outerHTML));
  }

  // Look for all buttons
  console.log('\n=== ALL BUTTONS ===');
  const buttons = page.locator('button');
  const buttonCount = await buttons.count();
  console.log('Total buttons:', buttonCount);
  for (let i = 0; i < Math.min(buttonCount, 10); i++) {
    const text = await buttons.nth(i).textContent();
    console.log(`Button ${i}: ${text}`);
  }
});
