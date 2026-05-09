# VerifyX Backend

Express API for VerifyX app-side storage: document requests, notifications, analytics, local OCR proxying, and optional non-chain cache records.

The VCRegistry/IPFS/Web3 API is a separate service owned by the Web3 team. The frontend calls that service directly through `NEXT_PUBLIC_WEB3_API_URL`. This backend does not store Pinata keys, RPC URLs, private keys, or contract addresses.

## Run Locally

```bash
cd Backend_verifyX
npm install
copy .env.example .env
npm run dev
```

Health check:

```http
GET http://localhost:4000/api/health
```

If `MONGODB_URI` is not set, or is set to `memory`, the API uses in-memory storage so Postman testing still works. Add MongoDB Atlas credentials to persist app workflow data.

## Main Endpoints

- `POST /api/document-requests` creates a student document request.
- `GET /api/document-requests?studentWallet=...` lists requests for a student wallet.
- `GET /api/document-requests?institutionName=...` lists requests for an institution.
- `PATCH /api/document-requests/:id` updates request status and optional Web3 proof fields.
- `GET /api/notifications` lists notifications by `email` or `walletAddress`.
- `GET /api/analytics/overview` returns app storage analytics.
- `POST /api/ocr/extract` accepts a certificate image/PDF and requires `OCR_API_URL` to be configured.
- `POST /api/ocr/validate` compares OCR text with claimed metadata.

MetaMask is handled in the frontend. No backend login is required.
