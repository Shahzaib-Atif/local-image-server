# Express Server for Image and LocalDB Routes

This is a basic Express.js server that exposes two main routes:
- `/images`: handles image-related operations.
- `/localdb`: handles local database-related operations.

## Features

- Uses ES modules and `dotenv` for environment variable support.
- Includes modular route handling for scalability.
- Ready for local development with cloudflared tunneling.

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm

### Tunneling with cloudflared
```bash
npx cloudflared tunnel --url http://localhost:3010
```
