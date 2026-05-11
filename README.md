<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/shield-check.svg" alt="VerifyX Logo" width="120" height="120" />
  
  # VerifyX 🛡️
  **The Trust Layer for Academic Integrity**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)](https://react.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![MetaMask](https://img.shields.io/badge/Auth-MetaMask-F6851B?style=for-the-badge)](https://metamask.io/)
</div>

## Local Ports

- VCRegistry Web3 API: `https://verifyx-web3.onrender.com`
- VerifyX frontend: `http://localhost:3000`
- VerifyX app backend: `http://localhost:4000`

The Web3 registry is already deployed, so the frontend can run normally on local port `3000` and call the deployed registry.

## Backend API

The backend lives in `Backend_verifyX` and runs on `http://localhost:4000`.

```bash
cd Backend_verifyX
npm install
copy .env.example .env
npm run dev
```

Use MetaMask from the frontend for identity. MongoDB Atlas stores app workflow data such as document requests and notifications. The separate VCRegistry Web3 API is configured in the frontend with `NEXT_PUBLIC_WEB3_API_URL`; Pinata keys, RPC URLs, private keys, and contract addresses stay with the Web3 service, not this backend. Without `MONGODB_URI`, or with `MONGODB_URI=memory`, the backend uses in-memory storage so local app testing works immediately.

## Frontend

```bash
cd Frontend_verifyX
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

The frontend expects the Web3 registry from your docs at:

```env
NEXT_PUBLIC_WEB3_API_URL=https://verifyx-web3.onrender.com
```

<br />

## 🌟 About VerifyX

**VerifyX** is a cutting-edge protocol designed to be the global standard for tamper-proof academic credentials. By leveraging modern web technologies and secure verifiable infrastructure, VerifyX ensures that:

- 🏛️ **Universities** can issue credentials with precision.
- 🎓 **Students** own their achievements with complete privacy.
- 🏢 **Organizations** can verify academic records with absolute certainty.

---

## 🚀 Key Features

* **Decentralized Cryptographic Proofs**: Tamper-proof, verifiable credentials.
* **Modern Aesthetic**: Built with a sleek, neo-minimalist, geometric dark mode design using Framer Motion and Tailwind CSS.
* **AI-Powered Validation**: Integrated with **Genkit** and Google GenAI for smart record validation.
* **Accessible UI**: Fully accessible component system utilizing **Radix UI**.
* **Wallet-First Access & Storage**: MetaMask-only entry, MongoDB Atlas app workflow storage, and direct frontend integration with the external VCRegistry Web3 API.

---

## 🛠️ Tech Stack

### Core Technologies
* [Next.js (App Router)](https://nextjs.org/) - React Framework
* [React 19](https://react.dev/) - UI Library
* [TypeScript](https://www.typescriptlang.org/) - Type Safety

### Styling & Animation
* [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
* [Framer Motion](https://www.framer.com/motion/) - Fluid animations
* [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible UI components
* [Lucide React](https://lucide.dev/) - Beautiful, consistent icon set
* [Google Fonts](https://fonts.google.com/) - Montserrat, Pacifico, and Sreda typography

### Backend, Web3 & AI
* MetaMask - Wallet-only application entry
* MongoDB Atlas - Persistent app workflow storage
* External VCRegistry API - IPFS/Pinata storage and VeriifyX smart-contract credential operations
* Genkit - AI-powered validation hooks
* [Zod](https://zod.dev/) - Schema declaration and validation

---

## 🚦 Getting Started

Follow these steps to run VerifyX locally on your machine.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v20 or higher recommended).

### Installation

1. **Clone the repository** (if applicable) and navigate to the project directory:
   ```bash
   cd web3
   ```

2. **Install the dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create `Frontend_verifyX/.env.local` for frontend API config and `Backend_verifyX/.env` for MongoDB/OCR config.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Start the AI/Genkit server** (Optional, for AI features):
   ```bash
   npm run genkit:dev
   ```

### 🌍 Open the App

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The main entry point is `src/app/page.tsx`.

---

## 📁 Project Structure

```text
web3/
├── src/
│   ├── ai/            # Genkit AI configurations and logic
│   ├── app/           # Next.js App Router (Pages, Layouts)
│   ├── components/    # Reusable UI components (Layout, Radix UI, Hero)
│   └── lib/           # Utility functions
├── public/            # Static assets
├── tailwind.config.ts # Tailwind CSS configuration
└── package.json       # Dependencies and scripts
```

---

<div align="center">
  <p>Built with ❤️ for a trusted academic future.</p>
</div>
