# Prabhune Diamonds Consultation Form Setup

## Database Setup

1. Create a MySQL database named `prabhune_diamonds`
2. Run the SQL script in `create_table.sql` to create the necessary table

## Twilio Setup

1. Sign up for a Twilio account at https://www.twilio.com/
2. Get your Account SID and Auth Token from the Twilio Console
3. Purchase a phone number for SMS
4. Enable WhatsApp for your Twilio number (follow Twilio's WhatsApp setup guide)

## Configuration

Update the following files with your credentials:

### db_config.php
- Update `$servername`, `$username`, `$password`, `$dbname` with your database details

### send_email.php
- Replace `'TWILIO_SID'` with your actual Twilio SID
- Replace `'TWILIO_AUTH_TOKEN'` with your actual Twilio Auth Token
- Replace `'+1TWILIO_NUMBER'` with your actual Twilio phone number
- Replace `'whatsapp:+1TWILIO_NUMBER'` with your actual Twilio WhatsApp number
- Update owner email and phone number if different

## Dependencies

Install Twilio PHP SDK:
```bash
composer require twilio/sdk
```

## Features Implemented

- ✅ Save form data to database
- ✅ Send email notification to owner
- ✅ Send SMS notification to owner
- ✅ Send WhatsApp notification to owner
- ✅ Send confirmation email to user
- ✅ Send confirmation SMS to user

## Testing

1. Fill out the consultation form at `cunsaltastion.html`
2. Submit the form
3. Check database for saved data
4. Check owner email for notification
5. Check owner phone for SMS/WhatsApp
6. Check user email and phone for confirmation
