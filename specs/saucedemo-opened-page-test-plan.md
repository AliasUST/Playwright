# SauceDemo Opened Page Test Plan

## Application Overview

Functional test plan for the Sauce Labs storefront opened by tests/seed.spec.ts. Each scenario starts from a fresh browser state and uses the documented SauceDemo credentials where required. The plan covers authentication, inventory browsing, cart behavior, checkout, and validation/error handling.

## Test Scenarios

### 1. SauceDemo storefront

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful login opens the inventory page

**File:** `tests/saucedemo-opened-page/login.spec.ts`

**Steps:**
  1. Open the Sauce Labs login page from a fresh browser state.
    - expect: The page title is "Swag Labs".
    - expect: The Login form contains Username and Password fields and a Login button.
  2. Enter `standard_user` in Username and `secret_sauce` in Password, then click Login.
    - expect: The user is redirected to `/inventory.html`.
    - expect: The page shows the Products heading, an empty cart, product sorting control, and six products.
  3. Open the menu and choose Logout.
    - expect: The user returns to the login page.
    - expect: The username and password fields are empty.

#### 1.2. Inventory sorting and product detail navigation work

**File:** `tests/saucedemo-opened-page/inventory.spec.ts`

**Steps:**
  1. Log in with `standard_user` and `secret_sauce`.
    - expect: The inventory page is displayed.
  2. Change the Sort products control from Name (A to Z) to Price (low to high).
    - expect: The products are reordered from the lowest price to the highest price.
  3. Open the Sauce Labs Backpack product details.
    - expect: The URL is `/inventory-item.html?id=4`.
    - expect: The page shows the backpack name, description, price `$29.99`, and Add to cart button.
  4. Click Back to products.
    - expect: The inventory page is displayed again with the selected sort order preserved.

#### 1.3. User can add a product and complete checkout

**File:** `tests/saucedemo-opened-page/checkout.spec.ts`

**Steps:**
  1. Log in with `standard_user` and `secret_sauce`, open Sauce Labs Backpack, and click Add to cart.
    - expect: The button changes to Remove.
    - expect: The cart indicator shows one item.
  2. Open the cart.
    - expect: The cart page displays Sauce Labs Backpack with quantity 1.
    - expect: Continue Shopping and Checkout buttons are available.
  3. Click Checkout, enter `Test` as First Name, `User` as Last Name, and `12345` as Zip/Postal Code, then click Continue.
    - expect: The order overview page is displayed.
    - expect: The backpack appears in the order summary with the item price, subtotal, tax, and total.
  4. Click Finish.
    - expect: The order confirmation page is displayed.
    - expect: A thank-you/order-dispatched confirmation message and a Back Home button are visible.
  5. Click Back Home.
    - expect: The user returns to the inventory page.
    - expect: The cart is empty.

#### 1.4. Checkout information validates required fields

**File:** `tests/saucedemo-opened-page/checkout-validation.spec.ts`

**Steps:**
  1. Log in with `standard_user` and `secret_sauce`, add Sauce Labs Backpack to the cart, open the cart, and click Checkout.
    - expect: The Checkout: Your Information page is displayed with First Name, Last Name, and Zip/Postal Code fields.
  2. Leave all fields empty and click Continue.
    - expect: The checkout page remains open.
    - expect: An alert displays `Error: First Name is required`.
  3. Enter `Test` in First Name, leave Last Name and Zip/Postal Code empty, and click Continue.
    - expect: The checkout page remains open.
    - expect: An alert displays `Error: Last Name is required`.
  4. Enter `User` in Last Name, leave Zip/Postal Code empty, and click Continue.
    - expect: The checkout page remains open.
    - expect: An alert displays `Error: Postal Code is required`.

#### 1.5. Locked-out user cannot log in

**File:** `tests/saucedemo-opened-page/login-errors.spec.ts`

**Steps:**
  1. Open the Sauce Labs login page from a fresh browser state.
    - expect: The login form is displayed.
  2. Enter `locked_out_user` in Username and `secret_sauce` in Password, then click Login.
    - expect: The user remains on the login page.
    - expect: An error alert explains that the user has been locked out.
    - expect: The inventory page is not opened.
  3. Dismiss the error and enter `standard_user` with `secret_sauce`, then click Login.
    - expect: The user can recover from the failed attempt and reaches `/inventory.html`.
