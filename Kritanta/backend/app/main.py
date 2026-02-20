from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

# Lifespan context
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("Starting up Kritanta API...")
    yield
    # Shutdown
    print("Shutting down Kritanta API...")

# Initialize FastAPI app
app = FastAPI(
    title="Kritanta API",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/api/health")
async def health_check():
    return {"status": "ok", "service": "Kritanta API"}

# Run: uvicorn app.main:app --reload
