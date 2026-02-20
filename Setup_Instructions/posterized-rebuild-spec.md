# Posterized.in - Complete Development Specification

## Project Overview

**Objective**: Create a modern, animated replica of Posterized.in (custom poster e-commerce store) with enhanced animations and dynamic interactions.

**Tech Stack Recommendations**:
- Frontend: Next.js + React + TypeScript
- Styling: Tailwind CSS + Framer Motion (animations)
- State: Zustand or Context API
- Database: MongoDB or PostgreSQL
- Backend: Node.js/FastAPI (orchestrate with IBM Watsonx if needed)
- Image Processing: Sharp, ImageMagick
- Payment: Razorpay/PayU for Indian market
- Hosting: Vercel (frontend), Railway/Render (backend)

---

## 1. CORE PAGE TYPES

### 1.1 Homepage / Landing Page

**URL**: `/`

**Key Sections** (in order):

#### Hero Section
- **Layout**: Full-width, video/image background with overlay
- **Animation**: Parallax scroll effect, fade-in text animation on load
- **Content**:
  - Main headline: "India's No. 1 Custom Wall Poster Store"
  - Sub-headline with value proposition
  - CTA buttons: "Shop Now" (primary), "Customize Your Poster" (secondary)
  - Background: Showcase poster collage or video hero

**Animation Details**:
- Fade-in on page load (0.8s ease)
- Parallax background at 0.5x scroll speed
- Hover effects on buttons with shadow/scale transforms

#### Featured Products Section
- **Layout**: Grid display (4 columns on desktop, 2 on tablet, 1 on mobile)
- **Animation**: 
  - Staggered fade-in of product cards (100ms delay between each)
  - On hover: Scale 1.05, shadow elevation, 3D tilt effect
  - Image zoom on hover (1.1x scale)
- **Content per card**:
  - Product image (with loading placeholder)
  - Title
  - Category badge (e.g., "Car Set", "Devotional")
  - Price with crossed-out original price
  - Quick view button
  - Add to cart button

#### Categories Section
- **Layout**: Horizontal scrollable carousel or grid
- **Animation**: 
  - Scroll snap behavior
  - Hover: Expand and highlight
  - Icon animation on hover (bounce/pulse)
- **Categories to display**:
  - Car Posters
  - Motivational
  - Movies & TV
  - Devotional
  - Gaming
  - Sports
  - Stickers
  - Collage Sets

#### Testimonials Section
- **Layout**: Carousel with 3 testimonials visible
- **Animation**:
  - Auto-rotate every 5s
  - Smooth slide transitions
  - Star ratings animate on scroll

#### USP Banner Section
- **Content**: 
  - Quality Assurance
  - Free Delivery on Prepaid
  - Custom Print Service
  - Bulk Orders Available
- **Animation**: Icon animations (fade, scale, rotate)

#### FAQ Section (Collapsible)
- **Animation**: Accordion expand/collapse with smooth height transition
- **Questions**:
  - Bulk order availability
  - Custom print process
  - Delivery timeline (5-7 days)
  - Order tracking

#### Newsletter Signup
- **Animation**: Slide-in from bottom on scroll
- **Input validation**: Real-time feedback animation

---

### 1.2 Product Listing Page (PLP)

**URL**: `/products` or `/shop`

**Key Components**:

#### Filters Sidebar (Left side)
- **Animations**:
  - Hamburger menu on mobile with slide-in animation
  - Filter collapse/expand smooth transitions
  - Checkbox animations on click
- **Filter Options**:
  - Price range slider (with value indicators)
  - Categories multi-select
  - Product type (Sets vs Individual Posters)
  - Sort by (relevance, price low-to-high, newest)
  - Collections/Collections toggle

#### Product Grid (Main area)
- **Layout**: 
  - Desktop: 4 columns
  - Tablet: 3 columns
  - Mobile: 2 columns
- **Animations**:
  - Grid reflow when filters change (staggered fade-in)
  - Card hover: Scale, shadow, reveal hidden elements
  - Image lazy loading with blur-up effect
  - Price animation (number counter effect)

#### Pagination/Infinite Scroll
- **Options**: Both implemented
- **Animation**: Fade-in of new products when loading

#### Product Card Details
- **Elements**:
  - Product image (primary + hover to show secondary)
  - Title (truncated with tooltip on hover)
  - Category badges
  - Rating stars
  - Regular price (struck through)
  - Sale price (highlighted)
  - Discount percentage badge
  - Quick actions (View, Add to Cart)

---

### 1.3 Product Detail Page (PDP)

**URL**: `/products/[slug]`

**Layout**: Two-column on desktop, single-column on mobile

#### Left Column: Image Gallery
- **Animations**:
  - Main image fade transitions on thumbnail click
  - Thumbnail hover: Scale 1.1
  - Zoom on hover (2x magnification with lens effect)
  - Smooth image loading transition
- **Features**:
  - Thumbnail carousel (5-6 thumbs visible)
  - Horizontal scroll on mobile
  - Full-screen lightbox option

#### Right Column: Product Information
- **Animations**:
  - Fade-in on page load (staggered)
  - Price highlight animation
  - Stock status color pulse if low stock
- **Content Sections**:
  1. **Title & Meta**
     - Product name
     - Category breadcrumb
     - Rating & reviews count
  
  2. **Pricing Section**
     - Regular price (struck)
     - Sale price (bold, large)
     - Discount percentage
     - Stock status
  
  3. **Product Description**
     - Overview text
     - Key features as bullet points
     - Material/quality info
  
  4. **Options/Customization** (if applicable)
     - Poster set size (e.g., "3-Piece" vs "5-Piece")
     - Frame options (if available)
     - Quantity selector (with +/- buttons, animated on change)
  
  5. **Action Buttons** (with ripple effects)
     - Add to Cart (primary, large)
     - Add to Wishlist (outline, with heart icon animation)
     - Share (social icons with copy-to-clipboard animation)
  
  6. **Shipping Info** (collapsible)
     - Free delivery on prepaid orders
     - 5-7 days delivery
     - Bulk order info
  
  7. **Reviews Section** (collapsible)
     - Star rating breakdown
     - Individual reviews carousel
     - Write review button

#### Related Products Section
- **Layout**: Carousel of 4-6 products
- **Animation**: Auto-scroll or manual navigation with smooth transitions

---

### 1.4 Custom Print / Upload Page

**URL**: `/custom-print` or `/customize`

**Layout**: Single-column form with live preview

#### Form Section (Left)
- **Animations**:
  - Field focus state: Underline animation, label floating
  - Error messages fade-in with slide-up
  - Success checkmarks animate in
- **Form Fields**:
  1. **Image Upload**
     - Drag & drop zone with hover highlight
     - File preview thumbnail
     - Upload progress bar animation
  
  2. **Image Customization**
     - Crop tool with preview
     - Filter options (brightness, contrast, saturation) with sliders
     - Preview updates in real-time
  
  3. **Size Selection**
     - Radio buttons or tabs
     - Options: A4, A3, Custom size
     - Price update animation on selection
  
  4. **Finish Options**
     - Matte vs Glossy toggle
     - Material quality selector
  
  5. **Quantity**
     - Input field with +/- buttons
     - Dynamic price calculation

#### Preview Section (Right)
- **Animations**:
  - Real-time preview updates (0.3s transition)
  - 3D card perspective tilt on mouse move (on desktop)
  - Frame preview with shadow
  - Mockup rotation animation

#### Action Buttons
- **Order Custom Print** (primary, large)
- **Reset** (secondary)

---

### 1.5 Wishlist Page

**URL**: `/wishlist`

**Layout**: Grid similar to PLP

**Animations**:
- Item removal: Slide-out to right, fade
- Item addition notification: Toast from top
- Empty state: Fade-in illustration + CTA button
- Move to cart: Item briefly highlights before transition

**Functionality**:
- Add all to cart button
- Remove individual items
- Share wishlist
- Clear all wishlist
- Sort/filter options

---

### 1.6 Shopping Cart Page

**URL**: `/cart`

**Layout**: Two-column on desktop (cart items left, summary right), single-column on mobile

#### Cart Items Section
- **Animations**:
  - Item removal: Slide-out left, collapse space
  - Quantity update: Number counter animation
  - Price recalculation: Flash highlight
  - Item hover: Subtle background highlight
- **Per Item**:
  - Product image thumbnail
  - Title
  - Category tag
  - Quantity +/- buttons (animated)
  - Unit price & line total
  - Remove button (with confirmation prompt animation)

#### Cart Summary Section (Sticky on desktop)
- **Animations**:
  - Subtotal calculates with number tween
  - Discount badge pulses if applicable
  - Final total highlights on change
- **Content**:
  - Subtotal
  - Discount (if coupon applied)
  - Delivery charges
  - **Total (emphasized)**
  - Coupon code input field
  - Proceed to Checkout button (CTA)
  - Continue Shopping button

#### Empty Cart State
- **Animation**: Fade-in illustration
- **Content**: Message + link to shop

---

### 1.7 Checkout Page

**URL**: `/checkout` (multi-step or single-page)

**Layout**: Steps indicator at top (desktop), step title (mobile)

#### Step 1: Shipping Address
- **Animations**:
  - Form field animations (focus, error, success)
  - Address suggestions dropdown with fade-in
  - Saved addresses fade-in from API call
- **Fields**:
  - Full Name
  - Phone Number
  - Address Line 1 & 2
  - City, State, ZIP
  - Save address checkbox

#### Step 2: Delivery Method
- **Animations**:
  - Option cards highlight on select
  - Delivery date updates with transition
- **Options**:
  - Standard (5-7 days) - Free for prepaid
  - Express (2-3 days) - Paid option
  - Economy (7-10 days) - Discounted

#### Step 3: Payment Method
- **Animations**:
  - Payment method icons animate in
  - Selected method highlights
- **Options**:
  - Credit/Debit Card
  - UPI (popular in India)
  - Wallet
  - Bank Transfer
  - Prepaid vs Cash on Delivery toggle

#### Step 4: Order Review
- **Animations**:
  - Order summary with item cards
  - Final price animation (counter effect)
  - Confirm Order button pulse effect
- **Content**:
  - Items summary
  - Address summary
  - Payment method
  - Total price
  - Confirm Order button

#### Order Success Page
- **Animations**:
  - Confetti burst effect on load
  - Checkmark icon bounce animation
  - Order details fade-in
  - Countdown to redirect with timer animation
- **Content**:
  - Success message
  - Order ID (copy to clipboard button)
  - Order summary
  - Tracking link
  - WhatsApp notification info
  - Back to home / Continue shopping buttons

---

### 1.8 Account / User Profile Page

**URL**: `/account` or `/profile`

**Layout**: Sidebar navigation (left) + content area (right)

#### Sidebar Menu
- **Animation**: Active indicator slide/highlight
- **Options**:
  - Dashboard
  - Orders
  - Wishlist
  - Saved Addresses
  - Personal Info
  - Password
  - Logout

#### Dashboard Tab (Default)
- **Animations**: Cards fade-in, stats counter animation
- **Content**:
  - Recent orders preview
  - Quick stats (total orders, wishlist count)
  - Recommended products carousel

#### Orders Tab
- **Animations**: 
  - Order cards fade-in
  - Status badge animations
  - Expand/collapse order details
- **Content per order**:
  - Order ID
  - Date
  - Status (with progress indicator)
  - Total amount
  - Items count
  - Track button

#### Personal Info Tab
- **Animations**: 
  - Edit mode transitions
  - Field focus animations
  - Save button pulse
- **Fields**: Name, Email, Phone, DOB, Gender

#### Saved Addresses Tab
- **Animations**:
  - Address cards fade-in
  - Add new address: Slide-in form
  - Edit/delete: Confirm animation
  - Default address highlight

---

### 1.9 Order Tracking Page

**URL**: `/orders/[orderId]`

**Layout**: Single-column, centered

#### Order Status Timeline
- **Animations**:
  - Timeline line animates from top
  - Status badges appear with stagger
  - Current status pulses
- **Statuses**:
  1. Order Confirmed
  2. Processing
  3. Dispatched
  4. Out for Delivery
  5. Delivered

#### Order Details Section
- **Content**:
  - Order ID & date
  - Delivery address
  - Items summary
  - Pricing breakdown

#### Contact Support Section
- **Animation**: CTA button on hover
- **Options**:
  - WhatsApp support
  - Email support
  - Chat support

---

### 1.10 Search Results Page

**URL**: `/search?q=[query]`

**Layout**: Similar to PLP

**Animations**:
- Results fade-in on load
- "No results" illustration fade-in with suggestions
- Search query highlight in results
- Sort/filter animations

**Content**:
- Results count
- Product grid matching PLP
- Filters sidebar
- Sort options
- Pagination

---

### 1.11 Category Page

**URL**: `/collections/[category]` or `/category/[category]`

**Layout**: PLP layout with category banner

#### Category Hero Banner
- **Animation**: Parallax scroll, fade-in text overlay
- **Content**: Category name, description, category image

#### Category Products
- **Same as PLP** (grid, filters, sorting)
- **Filtered by category** automatically

---

### 1.12 FAQ / Help Center Page

**URL**: `/faq` or `/help`

**Layout**: Single-column, centered

**Animations**:
- Accordion expand/collapse (smooth height transition)
- Search field focus animation
- Results fade-in
- Scroll-to-section behavior

**Content**:
- Bulk orders FAQs
- Custom print FAQs
- Delivery & shipping FAQs
- Returns & policies FAQs
- Payment FAQs

---

### 1.13 404 / Error Page

**URL**: `/404` or error routes

**Animations**:
- Illustration animation (bouncing, floating effects)
- Text fade-in
- Button hover effects

**Content**:
- Error message
- Home link
- Back button
- Search suggestion

---

## 2. DESIGN SYSTEM & ANIMATIONS

### 2.1 Color Palette

**Primary Colors**:
- Primary Action: `#000000` or `#1F2937` (Dark)
- Secondary: `#6B7280` (Gray)
- Accent: `#F59E0B` (Amber/Gold) for highlights

**Status Colors**:
- Success: `#10B981` (Green)
- Error: `#EF4444` (Red)
- Warning: `#F59E0B` (Amber)
- Info: `#3B82F6` (Blue)

**Backgrounds**:
- Primary BG: `#FFFFFF` (White)
- Secondary BG: `#F9FAFB` (Light Gray)
- Dark mode BG: `#111827` (if implementing)

### 2.2 Typography

**Font Stack**: `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

**Font Sizes**:
- H1: 48px (desktop), 32px (mobile)
- H2: 36px (desktop), 24px (mobile)
- H3: 24px (desktop), 20px (mobile)
- Body: 16px
- Small: 14px
- Tiny: 12px

**Font Weights**:
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### 2.3 Core Animations

#### Page Transitions
```javascript
// Framer Motion config
transition: {
  duration: 0.4,
  ease: "easeInOut"
}
```

#### Fade-in on Mount
```javascript
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.5 }}
```

#### Scale on Hover
```javascript
whileHover={{ scale: 1.05 }}
transition={{ duration: 0.2 }}
```

#### Stagger Children
```javascript
variants={{
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
}}
```

#### Button Ripple Effect
- Click animation: Scale + opacity pulse from center
- Duration: 0.4s

#### Loading Skeleton
- Animated gradient shimmer
- Duration: 1.5s infinite
- Effect: Left to right wave

#### Toast Notifications
- Slide-in from top (200px)
- Duration: 0.3s
- Auto-dismiss: 3s
- Slide-out on dismiss

#### Product Image Zoom
- Hover zoom: 1.15x scale
- Transition: 0.4s
- Cursor changes to zoom-in

#### Price Counter Animation
- From previous price to new price
- Duration: 0.6s
- Number format: Currency with 2 decimals

#### Blur-up Image Loading
- Placeholder blur: 20px
- Final image blur: 0px
- Transition: 0.6s

### 2.4 Interaction Patterns

#### Button States
1. **Default**: Dark background, white text
2. **Hover**: Darker background, elevated shadow
3. **Active**: Shadow increase, slight scale down
4. **Disabled**: Reduced opacity (0.5), no cursor

#### Form Input States
1. **Default**: Light gray border
2. **Focus**: Blue border, shadow glow
3. **Error**: Red border, error message appears
4. **Success**: Green border, checkmark icon

#### Card Hover Effects
- Shadow elevation
- Background color subtle shift
- Scale: 1.02x (slight)
- Duration: 0.3s

---

## 3. BACKEND API STRUCTURE

### 3.1 Core Endpoints

**Products**:
- `GET /api/products` - List all products (with filters, pagination)
- `GET /api/products/[id]` - Get product details
- `GET /api/categories` - Get all categories
- `GET /api/collections/[name]` - Get products by collection

**Cart**:
- `POST /api/cart` - Add to cart
- `GET /api/cart` - Get cart
- `PUT /api/cart/[itemId]` - Update quantity
- `DELETE /api/cart/[itemId]` - Remove from cart

**Orders**:
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/[orderId]` - Get order details
- `GET /api/orders/[orderId]/track` - Track order

**Users**:
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/users/profile` - Get profile
- `PUT /api/users/profile` - Update profile

**Payment**:
- `POST /api/payments/initiate` - Initiate Razorpay payment
- `POST /api/payments/verify` - Verify payment

**Custom Print**:
- `POST /api/custom-print` - Create custom print order
- `POST /api/upload` - Upload image for custom print

**Wishlist**:
- `POST /api/wishlist` - Add to wishlist
- `GET /api/wishlist` - Get wishlist
- `DELETE /api/wishlist/[productId]` - Remove from wishlist

**Search**:
- `GET /api/search?q=[query]` - Search products

---

## 4. MOBILE-SPECIFIC CONSIDERATIONS

### 4.1 Responsive Breakpoints
- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+

### 4.2 Mobile Interactions
- Touch-friendly buttons (min 44x44px)
- Hamburger menu for navigation
- Bottom navigation bar for key sections
- Swipe gestures for product galleries
- Tap-to-expand for modals

### 4.3 Mobile Animations
- Reduce motion on slower devices
- Prefers-reduced-motion: CSS media query
- Lighter animations on mobile (shorter durations)

---

## 5. PERFORMANCE OPTIMIZATION

### 5.1 Image Optimization
- **Product Images**: Use WebP with JPEG fallback
- **Sizes**: 
  - Thumbnail: 300x300px
  - PDP main: 800x800px
  - Hero: 1920x1200px
- **Compression**: Imagemin or Sharp for auto-compression
- **Lazy Loading**: Implement Intersection Observer

### 5.2 Code Splitting
- Route-based code splitting with Next.js dynamic imports
- Component-level code splitting for heavy components

### 5.3 Caching
- Product list: 1 hour cache
- Product details: 2 hours cache
- User cart: Session storage
- Static assets: Long-term cache headers

### 5.4 Analytics
- Page view tracking
- Product click tracking
- Add to cart tracking
- Checkout completion tracking
- Custom event tracking

---

## 6. ACCESSIBILITY (A11Y)

### 6.1 Standards Compliance
- WCAG 2.1 AA compliance target
- Semantic HTML throughout
- ARIA labels for interactive elements

### 6.2 Keyboard Navigation
- All interactive elements accessible via Tab key
- Focus visible indicators
- Escape key closes modals
- Enter key submits forms

### 6.3 Screen Reader Support
- Alt text for all images
- Form labels properly associated
- Skip to main content link
- Announce dynamic updates

---

## 7. DEVELOPMENT PHASES

### Phase 1: Core Infrastructure (Week 1-2)
- [ ] Project setup (Next.js, Tailwind, Framer Motion)
- [ ] Database schema design
- [ ] API structure setup
- [ ] Authentication system
- [ ] Basic layout components

### Phase 2: Homepage & Browsing (Week 2-3)
- [ ] Homepage design & animations
- [ ] PLP (Product Listing Page)
- [ ] Category pages
- [ ] Search functionality

### Phase 3: Product & Cart (Week 3-4)
- [ ] PDP (Product Detail Page)
- [ ] Cart functionality
- [ ] Wishlist
- [ ] Quick view modal

### Phase 4: Checkout & Payment (Week 4-5)
- [ ] Checkout flow (multi-step)
- [ ] Razorpay integration
- [ ] Order management
- [ ] Order tracking

### Phase 5: Custom Print & Advanced (Week 5-6)
- [ ] Custom print upload page
- [ ] Image editing tools
- [ ] Mock-up generation
- [ ] User account system

### Phase 6: Polish & Launch (Week 6-7)
- [ ] Animation refinement
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] SEO setup
- [ ] Deployment

---

## 8. TESTING CHECKLIST

- [ ] Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness on all breakpoints
- [ ] Touch interactions on mobile/tablet
- [ ] Animation smoothness (60fps target)
- [ ] Payment flow end-to-end
- [ ] Search functionality
- [ ] Filter functionality
- [ ] Cart operations
- [ ] Checkout flow
- [ ] Form validation
- [ ] Error handling
- [ ] Loading states
- [ ] Empty states
- [ ] Accessibility (keyboard navigation, screen readers)
- [ ] Performance metrics (Lighthouse)

---

## 9. DEPLOYMENT & HOSTING

### Frontend
- **Platform**: Vercel (recommended for Next.js)
- **Auto-deploy from git**: `main` branch to production
- **Staging**: `develop` branch to staging environment

### Backend
- **Platform**: Railway, Render, or Heroku
- **Database**: MongoDB Atlas (cloud) or PostgreSQL
- **CDN**: Cloudflare for static assets

### Email & SMS
- **Email**: SendGrid for transactional emails
- **SMS/WhatsApp**: Twilio or Gupshup for order notifications

---

## 10. POST-LAUNCH MONITORING

- [ ] Error tracking (Sentry)
- [ ] Performance monitoring (Vercel Analytics, DataDog)
- [ ] User analytics (Google Analytics 4)
- [ ] Heatmap tracking (Hotjar)
- [ ] A/B testing framework
- [ ] Customer support integration (Intercom)

---

## Summary for Development Team

This specification provides a complete blueprint for rebuilding Posterized.in as a modern, fully-animated e-commerce platform. The key differentiators should be:

1. **Smooth, sophisticated animations** on every interaction
2. **Fast performance** with optimized images and code splitting
3. **Mobile-first design** with touch-optimized interactions
4. **Seamless payment integration** for Indian market (Razorpay)
5. **Custom print workflow** with image editing
6. **Order tracking** with WhatsApp integration
7. **User accounts** with wishlist and order history

Use Framer Motion for animations, Tailwind CSS for styling, and Next.js for the framework. This ensures a modern, maintainable, and scalable codebase.

