# Tech Dr Backend

Express backend structured for growth with separate config, controllers, routes, models, middleware, and utils.

## Setup

1. Copy `.env.example` to `.env`
2. Fill in your Resend SMTP credentials
3. Install dependencies

```bash
npm install
```

4. Start the server

```bash
npm run dev
```

## Structure

- `src/config`
- `src/controllers`
- `src/middleware`
- `src/models`
- `src/routes`
- `src/utils`

## Endpoints

- `GET /api/health`
- `POST /api/contact`
- `POST /api/bookings`

## Resend SMTP

- Host: `smtp.resend.com`
- Port: `587`
- Username: `resend`
- Password: your Resend API key
