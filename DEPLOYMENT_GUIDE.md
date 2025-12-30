# Prabhune Diamonds & Stones - Deployment Guide

## Prerequisites
- Domain name (e.g., prabhunediamonds.com)
- Web hosting with PHP 7.4+ and MySQL 5.7+
- FTP/SFTP access to hosting server
- Twilio account for SMS/WhatsApp
- Email account for notifications

## Step 1: Domain & Hosting Setup
1. Register domain name through provider (GoDaddy, Namecheap, etc.)
2. Choose hosting provider (Hostinger, Bluehost, SiteGround recommended)
3. Point domain DNS to hosting server (usually automatic)
4. Note down hosting control panel login details

## Step 2: Database Setup
1. Log into hosting control panel (cPanel/Plesk)
2. Create MySQL database and user
3. Run the SQL script from `create_table.sql`:
   ```sql
   CREATE TABLE consultations (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL,
       phone VARCHAR(20) NOT NULL,
       budget VARCHAR(50),
       topic VARCHAR(255) NOT NULL,
       preferred_date DATE,
       preferred_time VARCHAR(50),
       mode VARCHAR(50) NOT NULL,
       message TEXT,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

## Step 3: File Upload
1. Upload all files from Prabhune-Diamonds folder to public_html (or www) directory
2. Ensure file permissions:
   - Directories: 755
   - Files: 644
   - PHP files: 644

## Step 4: Configuration Updates
Update these files with your actual credentials:

### db_config.php (create this file)
```php
<?php
$servername = "localhost"; // Usually localhost
$username = "your_db_username";
$password = "your_db_password";
$dbname = "your_database_name";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
```

### send_email.php - Update these lines:
```php
// Line 23: Update owner email
$to = "your-email@domain.com";

// Line 30-31: Update Twilio credentials
$sid = 'your_twilio_sid';
$token = 'your_twilio_auth_token';

// Line 37: Update owner phone number
'+91xxxxxxxxxx', // Owner number

// Line 44: Update WhatsApp number
'whatsapp:+91xxxxxxxxxx', // Owner WhatsApp number

// Line 58: Update confirmation email from address
$user_headers = "From: your-email@domain.com";

// Line 62: Update contact number in confirmation
+91 xxxxx xxxxx
```

## Step 5: Twilio Setup
1. Sign up at twilio.com
2. Get Account SID and Auth Token
3. Purchase phone number for SMS
4. Enable WhatsApp Business API
5. Update credentials in send_email.php

## Step 6: Email Configuration
1. Set up email account on hosting
2. Update PHP mail settings if needed
3. Test email sending

## Step 7: SSL Certificate
1. Install free SSL certificate (Let's Encrypt)
2. Update all internal links to HTTPS
3. Redirect HTTP to HTTPS

## Step 8: Testing
1. Visit your domain
2. Test all pages load correctly
3. Submit consultation form
4. Check database for data
5. Verify email/SMS/WhatsApp notifications
6. Test on mobile devices

## Step 9: Go Live
1. Update any remaining placeholder content
2. Set up Google Analytics (optional)
3. Submit sitemap to Google Search Console
4. Monitor for errors

## Troubleshooting
- If emails not sending: Check PHP mail configuration
- If database connection fails: Verify credentials in db_config.php
- If Twilio fails: Check account balance and phone number verification
- If images not loading: Check file paths and permissions

## Security Checklist
- [ ] Change default database password
- [ ] Remove test files (test_twilio.php, simple_test.php)
- [ ] Update file permissions
- [ ] Enable SSL/HTTPS
- [ ] Regular backups
- [ ] Monitor for vulnerabilities

## Support
If you encounter issues, check:
1. Hosting provider documentation
2. PHP error logs
3. Database connection logs
4. Twilio dashboard for message status
