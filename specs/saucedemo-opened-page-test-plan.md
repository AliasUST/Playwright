# Test Plan: SauceDemo Inventory and Checkout Flow

**Target:** https://www.saucedemo.com
**Seed:** tests/seed.spec.ts
**Date:** 2026-09-25

## Overview
This plan covers the core SauceDemo user journey from the seeded login page through inventory browsing, cart updates, and checkout completion. The scenarios are designed to verify the browser behavior that matters to real users while staying aligned with the repository’s Playwright conventions.

## Preconditions
- The application is available at the SauceDemo login URL.
- Test environment is fresh and no active session is persisted from a prior run.
- The seeded login flow from tests/seed.spec.ts has already confirmed the page loads with visible Username and Password inputs.
- The standard test account is valid: username = standard_user, password = secret_sauce.

## Scenarios

### Scenario 1.1 — Successful login lands on the inventory page
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** User is on the SauceDemo login page with a clean browser state.
- **Steps:**
  1. Open the login page — expected: the Swag Labs login form is visible and ready for input.
  2. Enter standard_user in the Username field and secret_sauce in the Password field — expected: the credentials are accepted as text values and the form remains interactive.
  3. Click the Login button — expected: the page navigates to the inventory screen and the Products heading becomes visible.
- **Assertions:**
  - URL contains /inventory.html after login.
  - The Products heading is visible.
  - The shopping cart badge is present and initially empty.
  - The inventory list renders six product cards.
- **Edge cases considered:**
  - Blank username or password submission
  - Invalid credentials returning an error banner
  - Browser back button after successful login

### Scenario 1.2 — Inventory sorting and product detail navigation work correctly
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** User is logged in and on the inventory page.
- **Steps:**
  1. Open the sort dropdown and choose Price (low to high) — expected: the product list reorders from lowest to highest price.
  2. Confirm the first visible product item is the lowest-priced item in the list — expected: item ordering reflects the selection.
  3. Click the Sauce Labs Backpack product name — expected: the details page opens for the matching product.
  4. Validate the details panel and click Back to products — expected: the user returns to the inventory page with the same sort selection still active.
- **Assertions:**
  - Product order changes after selecting lohi.
  - Product details URL includes /inventory-item.html?id=4.
  - Backpack name, description, and price match the expected values.
  - Returning to products restores the inventory grid without resetting the sort state.
- **Edge cases considered:**
  - Sort value persists across navigation
  - Clicking product image versus product name
  - Missing or delayed product data on the details page

### Scenario 1.3 — Adding an item to the cart and completing checkout succeeds
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** User is authenticated and currently viewing the product details or inventory page.
- **Steps:**
  1. Add the Sauce Labs Backpack to the cart — expected: the Add to cart button changes state and the cart count increments to 1.
  2. Open the cart from the header — expected: the backpack appears in the cart with quantity 1 and checkout controls are available.
  3. Click Checkout and complete the buyer information form with valid values — expected: the order overview page loads and displays the line item and totals.
  4. Click Finish — expected: the confirmation message and Back Home action appear.
- **Assertions:**
  - Cart badge shows 1 after adding an item.
  - Cart page lists the expected product and quantity.
  - Checkout form accepts valid input and moves to the overview page.
  - Order summary reflects subtotal, tax, and total values.
  - Final confirmation page contains the success message.
- **Edge cases considered:**
  - Cart count not incrementing or resetting incorrectly
  - Missing item in the cart after navigation
  - Checkout with a single item versus multiple products

## Not covered (and why)
- Full negative validation for all checkout fields is intentionally left as a separate scenario because it is a distinct business rule and should be tested independently to keep failures easy to diagnose.
- Logout flow is not included in the primary scenarios because the base login test already validates the page state, and this plan focuses on revenue-critical inventory and checkout behavior.
