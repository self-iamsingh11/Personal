# Posterized.in - Technical Architecture & Setup Guide

## For Antigravity Development Team

This guide covers the technical implementation, folder structure, and setup instructions.

---

## FOLDER STRUCTURE

```
posterized/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── index.jsx (Homepage)
│   │   │   ├── products.jsx (PLP)
│   │   │   ├── products/[slug].jsx (PDP)
│   │   │   ├── cart.jsx
│   │   │   ├── checkout.jsx
│   │   │   ├── checkout-success.jsx
│   │   │   ├── custom-print.jsx
│   │   │   ├── account/
│   │   │   │   ├── index.jsx
│   │   │   │   ├── orders.jsx
│   │   │   │   ├── wishlist.jsx
│   │   │   │   ├── settings.jsx
│   │   │   ├── orders/[orderId].jsx
│   │   │   ├── search.jsx
│   │   │   ├── collections/[category].jsx
│   │   │   ├── faq.jsx
│   │   │   ├── 404.jsx
│   │   │   ├── _app.jsx (Global layout, theme)
│   │   │   ├── _document.jsx (Head, meta tags)
│   │   │
│   │   ├── components/
│   │   │   ├── Common/
│   │   │   │   ├── Header.jsx (Navigation, logo, search)
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── SearchBar.jsx
│   │   │   │   ├── Toast.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Sidebar.jsx (Mobile)
│   │   │   │
│   │   │   ├── Homepage/
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── FeaturedProducts.jsx
│   │   │   │   ├── CategoriesCarousel.jsx
│   │   │   │   ├── TestimonialSection.jsx
│   │   │   │   ├── USPBanner.jsx
│   │   │   │   ├── FAQSection.jsx
│   │   │   │   ├── NewsletterSignup.jsx
│   │   │   │
│   │   │   ├── Product/
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   ├── ProductGrid.jsx
│   │   │   │   ├── ProductFilters.jsx
│   │   │   │   ├── ProductGallery.jsx
│   │   │   │   ├── ProductDetails.jsx
│   │   │   │   ├── RelatedProducts.jsx
│   │   │   │   ├── ReviewsSection.jsx
│   │   │   │   ├── QuickViewModal.jsx
│   │   │   │
│   │   │   ├── Cart/
│   │   │   │   ├── CartItem.jsx
│   │   │   │   ├── CartSummary.jsx
│   │   │   │   ├── PromoCode.jsx
│   │   │   │
│   │   │   ├── Checkout/
│   │   │   │   ├── AddressForm.jsx
│   │   │   │   ├── DeliveryMethod.jsx
│   │   │   │   ├── PaymentMethod.jsx
│   │   │   │   ├── OrderReview.jsx
│   │   │   │   ├── StepIndicator.jsx
│   │   │   │   ├── OrderSuccess.jsx
│   │   │   │
│   │   │   ├── Account/
│   │   │   │   ├── AccountSidebar.jsx
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── OrdersList.jsx
│   │   │   │   ├── AddressList.jsx
│   │   │   │   ├── PersonalInfo.jsx
│   │   │   │
│   │   │   ├── CustomPrint/
│   │   │   │   ├── ImageUpload.jsx
│   │   │   │   ├── ImageEditor.jsx
│   │   │   │   ├── SizeSelector.jsx
│   │   │   │   ├── PreviewPanel.jsx
│   │   │   │   ├── CustomPrintForm.jsx
│   │   │   │
│   │   │   ├── Shared/
│   │   │   │   ├── Loading.jsx
│   │   │   │   ├── Skeleton.jsx
│   │   │   │   ├── EmptyState.jsx
│   │   │   │   ├── Pagination.jsx
│   │   │   │   ├── Timeline.jsx
│   │   │   │
│   │   ├── hooks/
│   │   │   ├── useCart.js
│   │   │   ├── useAuth.js
│   │   │   ├── useFetch.js
│   │   │   ├── useInfiniteScroll.js
│   │   │   ├── useLocalStorage.js
│   │   │   ├── useDebounce.js
│   │   │   ├── useMediaQuery.js
│   │   │
│   │   ├── context/
│   │   │   ├── CartContext.jsx
│   │   │   ├── AuthContext.jsx
│   │   │   ├── UIContext.jsx (toast, modals)
│   │   │   ├── FilterContext.jsx
│   │   │
│   │   ├── lib/
│   │   │   ├── api.js (Axios instance, base config)
│   │   │   ├── constants.js (URLs, endpoints)
│   │   │   ├── utils.js (Formatting, calculations)
│   │   │   ├── validators.js (Form validation)
│   │   │   ├── animations.js (Framer Motion presets)
│   │   │
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   ├── tailwind.css
│   │   │   ├── animations.css
│   │   │
│   │   ├── public/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   ├── fonts/
│   │   │
│   │   ├── .env.local
│   │   ├── next.config.js
│   │   ├── tailwind.config.js
│   │   ├── postcss.config.js
│   │   ├── package.json
│   │
│   ├── public/
│   └── .gitignore
│
├── backend/
│   ├── app/
│   │   ├── main.py (FastAPI app)
│   │   ├── config.py (Settings, env vars)
│   │   ├── dependencies.py (DB, auth dependencies)
│   │   │
│   │   ├── routes/
│   │   │   ├── products.py
│   │   │   ├── cart.py
│   │   │   ├── orders.py
│   │   │   ├── auth.py
│   │   │   ├── users.py
│   │   │   ├── payments.py
│   │   │   ├── custom_print.py
│   │   │   ├── search.py
│   │   │   ├── wishlist.py
│   │   │
│   │   ├── models/
│   │   │   ├── product.py
│   │   │   ├── cart.py
│   │   │   ├── order.py
│   │   │   ├── user.py
│   │   │   ├── payment.py
│   │   │   ├── custom_print.py
│   │   │
│   │   ├── schemas/
│   │   │   ├── product.py (Pydantic schemas)
│   │   │   ├── cart.py
│   │   │   ├── order.py
│   │   │   ├── user.py
│   │   │
│   │   ├── services/
│   │   │   ├── product_service.py
│   │   │   ├── order_service.py
│   │   │   ├── payment_service.py (Razorpay)
│   │   │   ├── email_service.py (SendGrid)
│   │   │   ├── image_service.py (Image processing)
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.py (JWT)
│   │   │   ├── cors.py
│   │   │   ├── error_handler.py
│   │   │
│   │   ├── database/
│   │   │   ├── db.py (MongoDB/PostgreSQL connection)
│   │   │   ├── migrations/ (Alembic for SQL)
│   │   │
│   │   ├── tests/
│   │   │   ├── test_products.py
│   │   │   ├── test_orders.py
│   │   │   ├── test_auth.py
│   │   │
│   │   ├── requirements.txt
│   │   ├── .env
│   │   ├── .gitignore
│
└── docs/
    ├── API_DOCUMENTATION.md
    ├── DEPLOYMENT.md
    └── TESTING.md
```

---

## INSTALLATION & SETUP

### Frontend Setup (Next.js)

**1. Create Next.js Project**
```bash
npx create-next-app@latest posterized --typescript --tailwind --eslint
cd posterized/frontend
```

**2. Install Dependencies**
```bash
npm install framer-motion axios zustand react-query react-hook-form zod
npm install -D tailwindcss postcss autoprefixer
npm install sharp next-image-optimization
npm install react-countup react-intersection-observer
npm install zustand zustand-immer
```

**3. Configure Tailwind** (`tailwind.config.js`)
```javascript
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1f2937',
        secondary: '#6b7280',
        accent: '#f59e0b',
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
      },
      spacing: {
        'gutter': '1.5rem',
        'container': '80rem',
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        pulse: 'pulse 2s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 0%' },
        },
      },
    },
  },
  plugins: [],
}
```

**4. Next.js Config** (`next.config.js`)
```javascript
module.exports = {
  images: {
    domains: ['cdn.yoursite.com', 'images.yoursite.com'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    esmExternals: true,
  },
}
```

**5. Environment Variables** (`.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key
NEXT_PUBLIC_GA_TRACKING_ID=your_ga_id
JWT_SECRET=your_jwt_secret
```

**6. Run Development Server**
```bash
npm run dev
# Runs on http://localhost:3000
```

---

### Backend Setup (FastAPI)

**1. Create Project Structure**
```bash
mkdir posterized-backend
cd posterized-backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

**2. Install Dependencies**
```bash
pip install fastapi uvicorn
pip install sqlalchemy pymongo pydantic
pip install python-jose python-multipart passlib bcrypt
pip install requests razorpay sendgrid
pip install pillow opencv-python
pip install python-dotenv
pip install pytest pytest-asyncio
pip install gunicorn
```

**3. Create `.env`**
```
DATABASE_URL=mongodb://localhost:27017/posterized
# OR for PostgreSQL
# DATABASE_URL=postgresql://user:password@localhost/posterized

JWT_SECRET=your_secret_key_here_min_32_chars
JWT_ALGORITHM=HS256

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

SENDGRID_API_KEY=your_sendgrid_key
SENDGRID_FROM_EMAIL=noreply@posterized.in

AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_S3_BUCKET=posterized-images

REDIS_URL=redis://localhost:6379

DEBUG=False
ENVIRONMENT=production
```

**4. Main FastAPI App** (`app/main.py`)
```python
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZIPMiddleware
from contextlib import asynccontextmanager

from app.config import settings
from app.routes import products, cart, orders, auth, payments
from app.middleware.error_handler import error_handler_middleware

# Lifespan context
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("Starting up...")
    yield
    # Shutdown
    print("Shutting down...")

# Initialize FastAPI app
app = FastAPI(
    title="Posterized API",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# GZIP compression
app.add_middleware(GZIPMiddleware, minimum_size=1000)

# Error handling
app.middleware("http")(error_handler_middleware)

# Include routes
app.include_router(products.router, prefix="/api/products", tags=["products"])
app.include_router(cart.router, prefix="/api/cart", tags=["cart"])
app.include_router(orders.router, prefix="/api/orders", tags=["orders"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(payments.router, prefix="/api/payments", tags=["payments"])

# Health check
@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

# Run: uvicorn app.main:app --reload
```

**5. Database Setup (MongoDB with Motor)**
```python
# app/database/db.py
from motor.motor_asyncio import AsyncClient, AsyncDatabase
from app.config import settings

client: AsyncClient = None
db: AsyncDatabase = None

async def connect_db():
    global client, db
    client = AsyncClient(settings.DATABASE_URL)
    db = client.posterized
    print("Connected to database")

async def close_db():
    global client
    client.close()
    print("Disconnected from database")

async def get_db() -> AsyncDatabase:
    return db
```

**6. Authentication (JWT)**
```python
# app/services/auth_service.py
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from app.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=7)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode,
        settings.JWT_SECRET,
        algorithm=settings.JWT_ALGORITHM
    )
    return encoded_jwt

def verify_token(token: str):
    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET,
            algorithms=[settings.JWT_ALGORITHM]
        )
        return payload
    except JWTError:
        return None
```

**7. Run Backend**
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
# Runs on http://localhost:8000
# API docs: http://localhost:8000/docs
```

---

## API RESPONSE PATTERNS

**Success Response:**
```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "Product Name",
    ...
  },
  "message": "Product retrieved successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Product with ID 123 not found"
  },
  "timestamp": "2024-02-18T10:05:00Z"
}
```

**Paginated Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

---

## DEPLOYMENT

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Automatic deployment from git
```

### Backend (Railway/Render)

**Railway:**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

**Render:**
- Connect GitHub repository
- Create new Web Service
- Set Environment Variables
- Deploy

---

## PERFORMANCE OPTIMIZATION

**Frontend:**
1. Image optimization with Next.js Image component
2. Code splitting and lazy loading
3. Static generation (SSG) for pages
4. Incremental Static Regeneration (ISR)
5. API caching with React Query
6. Browser caching with service workers

**Backend:**
1. Database indexing
2. Query optimization
3. Caching with Redis
4. Rate limiting
5. Pagination for large datasets
6. Compression (GZIP)

---

## MONITORING & LOGGING

**Frontend:**
- Google Analytics 4
- Sentry for error tracking
- Hotjar for heatmaps
- Vercel Analytics

**Backend:**
- Sentry for error tracking
- Winston/Loguru for logging
- Prometheus for metrics
- DataDog for monitoring

---

## CI/CD Pipeline

**.github/workflows/deploy.yml**
```yaml
name: Deploy

on:
  push:
    branches: [main, develop]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run tests
        run: npm run test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

---

## TESTING

**Frontend Testing:**
```bash
npm install -D jest @testing-library/react @testing-library/jest-dom

# Run tests
npm run test

# Coverage
npm run test:coverage
```

**Backend Testing:**
```bash
pytest tests/ -v
pytest tests/ --cov

# Run specific test
pytest tests/test_products.py -v
```

---

## MAINTENANCE & MONITORING

**Weekly Tasks:**
- Monitor error rates
- Check performance metrics
- Review user feedback
- Update security patches

**Monthly Tasks:**
- Analyze analytics
- Database optimization
- Cache invalidation review
- Cost analysis

---

## GIT WORKFLOW

```bash
# Feature branch
git checkout -b feature/product-page

# Commit with conventional commits
git commit -m "feat: add product detail page with gallery"

# Push and create PR
git push origin feature/product-page

# After review and approval
git merge develop
git push develop
```

**Conventional Commits:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code reorganization
- `perf:` Performance improvement
- `test:` Test addition
- `chore:` Dependency updates

---

## TROUBLESHOOTING

**Common Issues:**

1. **CORS Error** - Check backend CORS config
2. **Image Not Loading** - Verify image URLs and domains in next.config.js
3. **Payment Failure** - Check Razorpay credentials and test keys
4. **Database Connection Error** - Verify DATABASE_URL in .env
5. **Build Fails** - Clear `.next` folder and node_modules, reinstall

---

## SUPPORT & RESOURCES

- **Next.js Docs**: https://nextjs.org/docs
- **FastAPI Docs**: https://fastapi.tiangolo.com
- **Framer Motion**: https://www.framer.com/motion/
- **Tailwind CSS**: https://tailwindcss.com
- **React Query**: https://react-query.tanstack.com

---

This technical guide provides everything your Antigravity team needs to set up, develop, and deploy the Posterized.in replica. Reference the component guide and main specification alongside this document.

