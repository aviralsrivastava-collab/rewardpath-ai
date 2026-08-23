# RewardPath — API Reference

This document documents the REST API endpoints available in the application.

## API Endpoints Overview

### 1. Cards API
- **Endpoint**: `GET /api/cards`
- **Description**: Returns all card structured facts or a specific card by ID query parameter (`?id=card-id`).
- **Response**: `CardStructuredData[]` or `CardStructuredData`.

### 2. Matchmaker AI API
- **Endpoint**: `POST /api/matchmaker`
- **Description**: Executes citation-grounded hybrid RAG search for user spending intent.
- **Request Body**:
  ```json
  {
    "query": "Best card for international flight bookings and lounge access"
  }
  ```
- **Response**: `MatchmakerResponse` containing ranked recommendations, Net Annual Value math, and chunk citations.

### 3. ROI Calculator API
- **Endpoint**: `POST /api/roi`
- **Description**: Calculates Net Annual Value across cards based on annual category spending inputs.
- **Request Body**:
  ```json
  {
    "dining": 15000,
    "groceries": 25000,
    "travel": 20000,
    "gas": 10000,
    "other": 30000
  }
  ```
- **Response**: `ROICalculation[]`.

### 4. AI Chat Copilot API
- **Endpoint**: `POST /api/ai/chat`
- **Description**: Conversational copilot supporting multi-engine AI reasoning (Nexus, Matchmaker, Accelerator, Arbitrageur, Guardian).
- **Request Body**:
  ```json
  {
    "query": "How do I redeem Axis Edge Rewards for Marriott flights?",
    "mode": "nexus"
  }
  ```
- **Response**: `NexusResponse` or engine-specific response object.

### 5. Admin Reindexing API
- **Endpoint**: `POST /api/ai/admin/reindex`
- **Description**: Re-builds knowledge base embeddings index. Protected by `ADMIN_SECRET_KEY` bearer header.

### 6. User Data Deletion API
- **Endpoint**: `POST /api/user/delete-data`
- **Description**: Clears locally stored user preferences and consent metadata.
