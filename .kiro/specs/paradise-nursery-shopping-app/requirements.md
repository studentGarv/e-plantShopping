# Requirements Document

## Introduction

Paradise Nursery is a front-end shopping application for browsing and purchasing house plants. The app consists of three pages: a landing page, a product listing page, and a shopping cart page. Users can browse plants grouped by category, add them to a cart, adjust quantities, and view a running total before checkout. State is shared across pages so that the cart icon count and "Add to Cart" button states remain consistent throughout the session.

## Glossary

- **App**: The Paradise Nursery front-end single-page application.
- **Landing_Page**: The entry page displaying the company name, background image, company description, and a "Get Started" button.
- **Product_Listing_Page**: The page displaying all available plants grouped by category, with individual plant cards.
- **Cart_Page**: The page displaying all items currently in the cart with quantity controls and cost summary.
- **Plant_Card**: A UI card on the Product_Listing_Page showing a plant's thumbnail, name, price, description, and "Add to Cart" button.
- **Cart_Item_Card**: A UI card on the Cart_Page showing a plant's thumbnail, name, unit price, subtotal, quantity controls, and a delete button.
- **Cart**: The in-memory data structure holding the user's selected plants and their quantities.
- **Cart_Icon**: The shopping cart icon displayed in the header of the Product_Listing_Page and Cart_Page, showing the total number of plant items currently in the Cart.
- **Category**: A named grouping of plants (e.g., "Air Purifying", "Aromatic") displayed as a section on the Product_Listing_Page.
- **Checkout_Button**: The button on the Cart_Page that initiates the checkout flow.

---

## Requirements

### Requirement 1: Landing Page Display

**User Story:** As a customer, I want to see an engaging landing page, so that I can learn about Paradise Nursery and enter the app.

#### Acceptance Criteria

1. THE Landing_Page SHALL display the company name "Paradise Nursery".
2. THE Landing_Page SHALL display a full-page background image.
3. THE Landing_Page SHALL display a paragraph describing the company.
4. THE Landing_Page SHALL display a "Get Started" button.
5. WHEN the user clicks the "Get Started" button, THE App SHALL navigate to the Product_Listing_Page.

---

### Requirement 2: Product Listing Page Header

**User Story:** As a customer, I want a consistent header on the product listing page, so that I can identify the store and access the cart at a glance.

#### Acceptance Criteria

1. THE Product_Listing_Page SHALL display a header containing the company name, a logo image, and a tagline.
2. WHEN the user clicks the logo image in the header, THE App SHALL navigate to the Landing_Page.
3. THE Product_Listing_Page header SHALL display the Cart_Icon with the current total item count from the Cart.
4. WHEN the user clicks the Cart_Icon, THE App SHALL navigate to the Cart_Page.

---

### Requirement 3: Plant Browsing by Category

**User Story:** As a customer, I want to browse plants grouped by category, so that I can find plants that match my needs.

#### Acceptance Criteria

1. THE Product_Listing_Page SHALL display plants grouped into named Category sections.
2. WHEN a Category section is rendered, THE Product_Listing_Page SHALL display a section heading with the Category name.
3. WHEN a Category section is rendered, THE Product_Listing_Page SHALL display a Plant_Card for each plant in that Category.
4. THE Plant_Card SHALL display the plant's thumbnail image, name, price, and description.

---

### Requirement 4: Add to Cart

**User Story:** As a customer, I want to add a plant to my cart from the product listing page, so that I can purchase it later.

#### Acceptance Criteria

1. THE Plant_Card SHALL display an "Add to Cart" button WHEN the plant's quantity in the Cart is zero.
2. WHEN the user clicks the "Add to Cart" button on a Plant_Card, THE App SHALL add one unit of that plant to the Cart.
3. WHEN a plant is added to the Cart, THE Plant_Card "Add to Cart" button SHALL become disabled.
4. WHEN a plant is added to the Cart, THE Cart_Icon count SHALL increment by one.

---

### Requirement 5: Shopping Cart Page Display

**User Story:** As a customer, I want to view all items in my cart, so that I can review my selections before checkout.

#### Acceptance Criteria

1. THE Cart_Page SHALL display a Cart_Item_Card for each plant currently in the Cart.
2. THE Cart_Item_Card SHALL display the plant's thumbnail image, name, and unit price.
3. THE Cart_Item_Card SHALL display the subtotal for that plant, calculated as unit price multiplied by quantity.
4. THE Cart_Page SHALL display the total number of plants across all Cart items.
5. THE Cart_Page SHALL display the total cost, calculated as the sum of all Cart_Item_Card subtotals.
6. THE Cart_Page SHALL display a Checkout_Button.

---

### Requirement 6: Cart Quantity Adjustment

**User Story:** As a customer, I want to increase or decrease the quantity of a plant in my cart, so that I can control how many I purchase.

#### Acceptance Criteria

1. THE Cart_Item_Card SHALL display an increase quantity button and a decrease quantity button.
2. WHEN the user clicks the increase quantity button on a Cart_Item_Card, THE App SHALL increment that plant's quantity in the Cart by one.
3. WHEN the user clicks the decrease quantity button on a Cart_Item_Card and the plant's quantity is greater than one, THE App SHALL decrement that plant's quantity in the Cart by one.
4. WHEN the plant's quantity in the Cart changes, THE Cart_Item_Card subtotal SHALL update to reflect the new quantity multiplied by the unit price.
5. WHEN the plant's quantity in the Cart changes, THE Cart_Page total cost SHALL update to reflect the new sum of all subtotals.
6. WHEN the plant's quantity in the Cart changes, THE Cart_Icon count SHALL update to reflect the new total number of items.

---

### Requirement 7: Remove Item from Cart

**User Story:** As a customer, I want to remove a plant from my cart, so that I can correct my selections.

#### Acceptance Criteria

1. THE Cart_Item_Card SHALL display a delete button.
2. WHEN the user clicks the delete button on a Cart_Item_Card, THE App SHALL remove that plant from the Cart entirely.
3. WHEN a plant is removed from the Cart, THE Cart_Page SHALL no longer display a Cart_Item_Card for that plant.
4. WHEN a plant is removed from the Cart, THE Cart_Icon count SHALL decrease by the quantity that was removed.
5. WHEN a plant is removed from the Cart, THE Plant_Card "Add to Cart" button on the Product_Listing_Page SHALL become enabled.

---

### Requirement 8: Quantity Drop to Zero Re-enables Add to Cart

**User Story:** As a customer, I want the "Add to Cart" button to become available again if I reduce a plant's cart quantity to zero, so that I can re-add it from the product listing page.

#### Acceptance Criteria

1. WHEN the user clicks the decrease quantity button on a Cart_Item_Card and the plant's quantity in the Cart is exactly one, THE App SHALL remove that plant from the Cart.
2. WHEN a plant is removed from the Cart as a result of a quantity decrease to zero, THE Plant_Card "Add to Cart" button on the Product_Listing_Page SHALL become enabled.
3. WHEN a plant is removed from the Cart as a result of a quantity decrease to zero, THE Cart_Icon count SHALL decrease by one.

---

### Requirement 9: Cart State Consistency Across Pages

**User Story:** As a customer, I want the cart state to be consistent across all pages, so that the item count and button states always reflect my current selections.

#### Acceptance Criteria

1. THE App SHALL maintain a single shared Cart state accessible by the Landing_Page, Product_Listing_Page, and Cart_Page.
2. WHEN the Cart state changes on any page, THE Cart_Icon count SHALL reflect the updated total item count on all pages that display the Cart_Icon.
3. WHEN the Cart state changes on any page, THE Plant_Card "Add to Cart" button states on the Product_Listing_Page SHALL reflect whether each plant is currently in the Cart.
