# mail-pdf

Send an email with a PDF attachment via SMTP. Supports **Resend**, **Brevo** or **Gmail**. Free.

Pick provider with `PROVIDER=resend | brevo | gmail` in `.env`.

## Setup

1. `npm install`
2. `cp .env.example .env`
3. Fill the vars for the provider you use, set `PROVIDER`.

### Resend (3000/mo free, easiest — no IP allowlist, no 2FA)

- Signup: https://resend.com
- API key: https://resend.com/api-keys → Create → copy (`re_...`) → `RESEND_API_KEY`.
- `SENDER_EMAIL=onboarding@resend.dev` works with no domain, but can only send **to the email you signed up with**. Real recipients need a verified domain (https://resend.com/domains, add DNS records).

### Brevo (300 mails/day free)

- Signup: https://www.brevo.com
- Verify a sender: Senders → add email → click verify link → `SENDER_EMAIL`.
- SMTP key: https://app.brevo.com/settings/keys/smtp → "Generate a new SMTP key".
  - `BREVO_USER` = Brevo login email
  - `BREVO_SMTP_KEY` = key (starts `xsmtpsib-`)
- `SENDER_EMAIL` must be a verified sender, else send rejected.

### Gmail (~500 mails/day free)

- Turn on 2-Step Verification.
- App Password: https://myaccount.google.com/apppasswords (16 chars).
  - `GMAIL_USER` = your gmail
  - `GMAIL_APP_PASSWORD` = the app password (not real password)

> Keep `.env` out of git.

## Run

```
node index.js recipient@example.com ./report.pdf "Monthly report"
```

Args: `<to> <pdfPath> [subject]`. Provider comes from `PROVIDER` in `.env`.
# Mail-pdf
