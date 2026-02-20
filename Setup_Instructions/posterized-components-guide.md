# Posterized.in - Component & Animation Details Guide

## For Antigravity Development Team

This document provides **visual specifications, code examples, and animation blueprints** for each component. Use this alongside the main specification.

---

## SECTION 1: HOMEPAGE COMPONENTS

### Component 1: Hero Section with Parallax

**Design Specs**:
- Height: 100vh (full viewport)
- Background: Poster showcase image + 40% dark overlay
- Text alignment: Center, vertically centered

**HTML Structure**:
```html
<section class="hero">
  <div class="hero-background"></div>
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <h1 class="hero-title">India's No. 1 Custom Wall Poster Store</h1>
    <p class="hero-subtitle">Premium quality posters delivered to your doorstep</p>
    <div class="hero-ctas">
      <button class="btn btn-primary">Shop Now</button>
      <button class="btn btn-secondary">Customize Your Poster</button>
    </div>
  </div>
</section>
```

**Framer Motion Animation**:
```javascript
const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.2, duration: 0.7 }
  }
};

// Apply motion.div and variants
<motion.h1
  variants={titleVariants}
  initial="hidden"
  animate="visible"
>
  India's No. 1 Custom Wall Poster Store
</motion.h1>
```

**CSS**:
```css
.hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/hero-bg.jpg') center/cover;
  z-index: 1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  text-align: center;
  color: white;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-ctas {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
```

**Parallax Effect** (Optional - More Advanced):
```javascript
const [scrollY, setScrollY] = useState(0);

useEffect(() => {
  const handleScroll = () => setScrollY(window.scrollY);
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

// Apply to background
style={{ transform: `translateY(${scrollY * 0.5}px)` }}
```

---

### Component 2: Product Card (Featured/PLP)

**Design Specs**:
- Width: 100% of grid column
- Aspect ratio: 1:1 (square)
- Border radius: 8px
- Box shadow: `0 4px 12px rgba(0, 0, 0, 0.1)`

**HTML Structure**:
```html
<div class="product-card">
  <div class="product-image-wrapper">
    <img src="product.jpg" alt="Product name" class="product-image" />
    <div class="product-overlay">
      <button class="btn-quick-view">Quick View</button>
    </div>
  </div>
  
  <div class="product-info">
    <div class="product-badges">
      <span class="badge badge-category">Car Set</span>
      <span class="badge badge-discount">-33%</span>
    </div>
    
    <h3 class="product-title">PORSCHE 911 GT3 RS #01</h3>
    
    <div class="product-rating">
      <span class="stars">★★★★★</span>
      <span class="review-count">(42)</span>
    </div>
    
    <div class="product-price">
      <span class="price-original">Rs. 299</span>
      <span class="price-current">Rs. 199</span>
    </div>
    
    <div class="product-ctas">
      <button class="btn btn-secondary">View Details</button>
      <button class="btn-wishlist">♡</button>
    </div>
  </div>
</div>
```

**Animation with Framer Motion**:
```javascript
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

const imageVariants = {
  default: { scale: 1 },
  hover: { scale: 1.1, transition: { duration: 0.3 } }
};

<motion.div
  className="product-card"
  variants={cardVariants}
  whileHover={{ y: -8, boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)" }}
  initial="hidden"
  animate="visible"
>
  <motion.div
    className="product-image-wrapper"
    variants={imageVariants}
    whileHover="hover"
  >
    <img src="product.jpg" />
  </motion.div>
  {/* ... rest of card */}
</motion.div>
```

**CSS**:
```css
.product-card {
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.product-image-wrapper {
  position: relative;
  overflow: hidden;
  background: #f9fafb;
  aspect-ratio: 1 / 1;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.product-info {
  padding: 1rem;
}

.product-badges {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.badge-category {
  background: #f0f0f0;
  color: #333;
}

.badge-discount {
  background: #ef4444;
  color: white;
}

.product-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0.5rem 0;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0.5rem 0;
  font-size: 0.85rem;
}

.stars {
  color: #f59e0b;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.75rem 0;
  font-weight: 600;
}

.price-original {
  text-decoration: line-through;
  color: #9ca3af;
  font-size: 0.9rem;
}

.price-current {
  font-size: 1.1rem;
  color: #1f2937;
}

.product-ctas {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.btn-wishlist {
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.2s;
}

.btn-wishlist:hover {
  color: #ef4444;
  border-color: #ef4444;
}

.btn-wishlist.active {
  background: #ef4444;
  color: white;
  border-color: #ef4444;
}
```

---

### Component 3: Featured Products Carousel

**Staggered Animation**:
```javascript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

<motion.div
  className="products-grid"
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-50px" }}
>
  {products.map((product) => (
    <motion.div key={product.id} variants={itemVariants}>
      <ProductCard product={product} />
    </motion.div>
  ))}
</motion.div>
```

---

## SECTION 2: PRODUCT DETAIL PAGE (PDP) COMPONENTS

### Component 4: Image Gallery with Zoom

**HTML Structure**:
```html
<div class="gallery">
  <div class="gallery-main">
    <img id="main-image" src="main.jpg" alt="Product" />
    <div class="zoom-icon">🔍</div>
  </div>
  
  <div class="gallery-thumbnails">
    <div class="thumbnails-scroll">
      <img class="thumbnail active" src="thumb1.jpg" alt="View 1" />
      <img class="thumbnail" src="thumb2.jpg" alt="View 2" />
      <img class="thumbnail" src="thumb3.jpg" alt="View 3" />
      <img class="thumbnail" src="thumb4.jpg" alt="View 4" />
    </div>
  </div>
</div>
```

**Zoom Effect**:
```javascript
const [zoomLevel, setZoomLevel] = useState(1);
const [position, setPosition] = useState({ x: 0, y: 0 });

const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  setPosition({
    x: (x / rect.width) * 100,
    y: (y / rect.height) * 100
  });
  setZoomLevel(2);
};

const handleMouseLeave = () => {
  setZoomLevel(1);
};

<motion.div
  className="gallery-main"
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
>
  <motion.img
    id="main-image"
    src={currentImage}
    style={{
      scale: zoomLevel,
      transformOrigin: `${position.x}% ${position.y}%`,
      cursor: zoomLevel > 1 ? "zoom-out" : "zoom-in"
    }}
    transition={{ duration: 0.2 }}
  />
</motion.div>
```

**CSS**:
```css
.gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.gallery-main {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background: #f9fafb;
  aspect-ratio: 1 / 1;
  max-width: 100%;
}

.gallery-main img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.zoom-icon {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s;
}

.gallery-main:hover .zoom-icon {
  opacity: 1;
}

.gallery-thumbnails {
  overflow-x: auto;
  padding: 0.5rem 0;
}

.thumbnails-scroll {
  display: flex;
  gap: 0.75rem;
  flex-wrap: nowrap;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid transparent;
  object-fit: cover;
  transition: all 0.2s;
  flex-shrink: 0;
}

.thumbnail:hover {
  border-color: #d1d5db;
  transform: scale(1.05);
}

.thumbnail.active {
  border-color: #1f2937;
  box-shadow: 0 0 0 2px white, 0 0 0 4px #1f2937;
}
```

---

### Component 5: Price & Options Section with Counter Animation

**HTML Structure**:
```html
<div class="product-details">
  <h1 class="product-name">PORSCHE 911 GT3 RS #01</h1>
  
  <div class="product-rating">
    <span class="stars">★★★★★</span>
    <span>(127 reviews)</span>
  </div>
  
  <div class="price-section">
    <div class="price-display">
      <span class="original-price">Rs. 299</span>
      <span class="current-price">Rs. 199</span>
      <span class="discount-badge">33% OFF</span>
    </div>
    <div class="stock-status">In Stock (12 remaining)</div>
  </div>
  
  <div class="options-section">
    <div class="option-group">
      <label>Poster Set Size</label>
      <div class="option-buttons">
        <button class="option-btn active">3-Piece Set</button>
        <button class="option-btn">5-Piece Set</button>
      </div>
    </div>
    
    <div class="quantity-section">
      <label>Quantity</label>
      <div class="quantity-input">
        <button class="qty-btn minus">−</button>
        <input type="number" value="1" min="1" max="10" />
        <button class="qty-btn plus">+</button>
      </div>
      <div class="price-total">
        Total: <span id="total-price">Rs. 199</span>
      </div>
    </div>
  </div>
  
  <div class="action-buttons">
    <button class="btn btn-primary btn-large">Add to Cart</button>
    <button class="btn btn-secondary btn-large">Add to Wishlist</button>
  </div>
</div>
```

**Animation for Price Counter**:
```javascript
const { ref, inView } = useInView({ triggerOnce: true });
const animatedPrice = useMotionTemplate`Rs. ${useMotionValue(199)}`;

useEffect(() => {
  if (inView) {
    const controls = animate(0, 199, {
      duration: 1,
      ease: "easeOut",
      onUpdate: (value) => {
        // Update price display with counter effect
      }
    });
    return () => controls.stop();
  }
}, [inView]);

// Alternative: Use react-countup library
import CountUp from 'react-countup';

<CountUp
  start={0}
  end={199}
  duration={1}
  prefix="Rs. "
  decimal=","
/>
```

**Quantity Animation**:
```javascript
const [quantity, setQuantity] = useState(1);

const handleQuantityChange = (delta) => {
  setQuantity(Math.max(1, quantity + delta));
};

const variants = {
  tap: { scale: 0.95 }
};

<motion.button
  className="qty-btn plus"
  onClick={() => handleQuantityChange(1)}
  variants={variants}
  whileTap="tap"
>
  +
</motion.button>
```

**CSS**:
```css
.product-details {
  padding: 2rem 0;
}

.product-name {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.stars {
  color: #f59e0b;
  font-size: 1.1rem;
}

.price-section {
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
  padding: 1.5rem 0;
  margin-bottom: 2rem;
}

.price-display {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.original-price {
  text-decoration: line-through;
  color: #9ca3af;
  font-size: 1rem;
}

.current-price {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
}

.discount-badge {
  background: #ef4444;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

.stock-status {
  font-size: 0.95rem;
  color: #10b981;
  font-weight: 500;
}

.options-section {
  margin-bottom: 2rem;
}

.option-group {
  margin-bottom: 1.5rem;
}

.option-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.option-buttons {
  display: flex;
  gap: 0.75rem;
}

.option-btn {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s;
}

.option-btn:hover {
  border-color: #1f2937;
}

.option-btn.active {
  border-color: #1f2937;
  background: #1f2937;
  color: white;
}

.quantity-section {
  margin-bottom: 1.5rem;
}

.quantity-section label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.quantity-input {
  display: flex;
  align-items: center;
  gap: 0;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  width: fit-content;
  margin-bottom: 1rem;
}

.qty-btn {
  width: 44px;
  height: 44px;
  border: none;
  background: white;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s;
}

.qty-btn:hover {
  background: #f3f4f6;
}

.quantity-input input {
  width: 60px;
  text-align: center;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  padding: 0;
}

.quantity-input input::-webkit-outer-spin-button,
.quantity-input input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.price-total {
  font-size: 1.1rem;
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.btn-large {
  flex: 1;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  height: 56px;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: #1f2937;
  color: white;
}

.btn-primary:hover {
  background: #111827;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-secondary {
  background: white;
  color: #1f2937;
  border: 2px solid #1f2937;
}

.btn-secondary:hover {
  background: #f9fafb;
}
```

---

## SECTION 3: CART & CHECKOUT COMPONENTS

### Component 6: Cart Item Card with Remove Animation

**HTML Structure**:
```html
<div class="cart-item">
  <div class="item-image">
    <img src="product.jpg" alt="Product" />
  </div>
  
  <div class="item-details">
    <h3 class="item-title">PORSCHE 911 GT3 RS #01</h3>
    <p class="item-category">Car Set • 3-Piece</p>
    <p class="item-price">Rs. 199</p>
  </div>
  
  <div class="item-quantity">
    <button class="qty-btn minus">−</button>
    <input type="number" value="1" />
    <button class="qty-btn plus">+</button>
  </div>
  
  <div class="item-total">
    <strong>Rs. 199</strong>
  </div>
  
  <button class="item-remove">✕</button>
</div>
```

**Remove Animation**:
```javascript
const [items, setItems] = useState([...initialItems]);

const removeItem = (itemId) => {
  // Start animation then remove from state
  const itemElement = document.querySelector(`[data-item-id="${itemId}"]`);
  itemElement.style.animation = "slideOutLeft 0.3s ease forwards";
  
  setTimeout(() => {
    setItems(items.filter(item => item.id !== itemId));
  }, 300);
};

// Using Framer Motion
<AnimatePresence>
  {items.map(item => (
    <motion.div
      key={item.id}
      initial={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -400 }}
      transition={{ duration: 0.3 }}
      onClick={() => removeItem(item.id)}
    >
      <CartItemCard item={item} />
    </motion.div>
  ))}
</AnimatePresence>
```

**CSS**:
```css
.cart-item {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  background: #f9fafb;
  flex-shrink: 0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.item-category {
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.item-price {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1f2937;
}

.item-quantity {
  display: flex;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
}

.item-total {
  font-size: 1rem;
  font-weight: 600;
  min-width: 80px;
  text-align: right;
}

.item-remove {
  width: 40px;
  height: 40px;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1.2rem;
  color: #6b7280;
  flex-shrink: 0;
}

.item-remove:hover {
  color: #ef4444;
  border-color: #ef4444;
  background: #fef2f2;
}

@keyframes slideOutLeft {
  to {
    opacity: 0;
    transform: translateX(-100%);
  }
}
```

---

### Component 7: Toast Notification

**Animation Pattern**:
```javascript
// Toast from top
const toastVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.2 } }
};

<AnimatePresence>
  {toast && (
    <motion.div
      className="toast"
      variants={toastVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      role="alert"
    >
      <div class="toast-content">
        <span class="toast-icon">✓</span>
        <span class="toast-message">{toast.message}</span>
      </div>
    </motion.div>
  )}
</AnimatePresence>
```

**CSS**:
```css
.toast {
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: white;
  border-left: 4px solid #10b981;
  border-radius: 6px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 1000;
  max-width: 400px;
}

.toast-icon {
  color: #10b981;
  font-size: 1.5rem;
  font-weight: bold;
}

.toast-message {
  color: #1f2937;
  font-size: 0.95rem;
}

.toast.error {
  border-left-color: #ef4444;
}

.toast.error .toast-icon {
  color: #ef4444;
}

@media (max-width: 640px) {
  .toast {
    right: 1rem;
    left: 1rem;
  }
}
```

---

### Component 8: Order Status Timeline

**HTML Structure**:
```html
<div class="order-timeline">
  <div class="timeline-item completed">
    <div class="timeline-marker">✓</div>
    <div class="timeline-content">
      <h4>Order Confirmed</h4>
      <p>Feb 18, 10:30 AM</p>
    </div>
  </div>
  
  <div class="timeline-item completed">
    <div class="timeline-marker">✓</div>
    <div class="timeline-content">
      <h4>Processing</h4>
      <p>Feb 18, 2:45 PM</p>
    </div>
  </div>
  
  <div class="timeline-item active">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <h4>Dispatched</h4>
      <p>In Transit</p>
    </div>
  </div>
  
  <div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <h4>Out for Delivery</h4>
      <p>Expected: Feb 21</p>
    </div>
  </div>
  
  <div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <h4>Delivered</h4>
      <p>Pending</p>
    </div>
  </div>
</div>
```

**Animation**:
```javascript
const { ref, inView } = useInView({ triggerOnce: true });

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 }
  }
};

const markerVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { duration: 0.3, type: "spring" }
  }
};

<motion.div
  ref={ref}
  className="order-timeline"
  variants={containerVariants}
  initial="hidden"
  animate={inView ? "visible" : "hidden"}
>
  {statuses.map((status, index) => (
    <motion.div
      key={index}
      className={`timeline-item ${status.status}`}
      variants={itemVariants}
    >
      <motion.div
        className="timeline-marker"
        variants={markerVariants}
      />
      {/* ... */}
    </motion.div>
  ))}
</motion.div>
```

**CSS**:
```css
.order-timeline {
  position: relative;
  padding: 2rem 0;
}

.timeline-item {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  position: relative;
}

.timeline-marker {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e5e7eb;
  border: 3px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 1.25rem;
  color: white;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.timeline-item.completed .timeline-marker {
  background: #10b981;
  color: white;
}

.timeline-item.active .timeline-marker {
  background: #3b82f6;
  box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.1);
  animation: pulse 2s infinite;
}

.timeline-content {
  padding-top: 0.5rem;
}

.timeline-content h4 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: #1f2937;
}

.timeline-content p {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 19px;
  top: 40px;
  width: 2px;
  height: calc(100% + 2rem);
  background: #e5e7eb;
  z-index: -1;
}

.timeline-item:last-child::before {
  display: none;
}

.timeline-item.completed::before {
  background: #10b981;
}

.timeline-item.active::before {
  background: #3b82f6;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.1);
  }
  50% {
    box-shadow: 0 0 0 15px rgba(59, 130, 246, 0);
  }
}
```

---

## SECTION 4: UTILITY ANIMATIONS

### Loading Skeleton (Shimmer)

```javascript
const skeletonVariants = {
  animate: {
    backgroundPosition: ["0% 0%", "100% 0%"],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

<motion.div
  className="skeleton"
  variants={skeletonVariants}
  animate="animate"
/>
```

**CSS**:
```css
.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 0%,
    #e0e0e0 50%,
    #f0f0f0 100%
  );
  background-size: 200% 100%;
  border-radius: 8px;
}

.skeleton-text {
  height: 1rem;
  margin-bottom: 0.5rem;
}

.skeleton-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
}
```

---

### Page Transition (Global)

```javascript
// Layout.jsx
<AnimatePresence mode="wait">
  <motion.div
    key={router.pathname}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

---

### Scroll-to-Top Animation

```javascript
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

// Or with Framer Motion
const { scrollY } = useScroll();
const scaleX = useTransform(scrollY, [0, 1000], [0, 1]);

<motion.div
  className="scroll-progress-bar"
  style={{ scaleX }}
/>
```

---

## IMPLEMENTATION TIPS FOR ANTIGRAVITY

1. **Always use `useInView` from Framer Motion for animations triggered on scroll** - prevents unnecessary animations off-screen
2. **Use `AnimatePresence` for list animations** - ensures proper enter/exit animations
3. **Implement `motion.div` wrappers sparingly** - they add overhead; use CSS transitions where animations are simple
4. **Test on 3G throttled network** - ensure animations don't block interactivity
5. **Use `will-change: transform` for smooth animations** - hardware acceleration
6. **Debounce scroll/resize events** - prevents jank
7. **Implement proper loading states** - always show skeleton before content
8. **Use `transition={{ type: "spring" }}` for organic feel** - feels better than easing functions

---

## Performance Checklist

- [ ] All images lazy-loaded with blur-up effect
- [ ] Code splitting for heavy components
- [ ] Memoize product lists with `React.memo`
- [ ] Virtualize long lists (react-window)
- [ ] Preload images on hover/focus
- [ ] Use `useCallback` for event handlers
- [ ] CSS animations for simple effects
- [ ] Framer Motion for complex interactions
- [ ] Debounce search input
- [ ] Cache API responses

