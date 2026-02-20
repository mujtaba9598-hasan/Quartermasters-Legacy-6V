<?php
/**
 * Quartermasters F.Z.C — Contact Form Handler
 * Runs on Hostinger shared hosting (PHP native).
 * No third-party dependencies.
 *
 * Every valid submission is LOGGED TO DISK first (zero data loss),
 * then emailed. Even if mail() silently drops a message, the log has it.
 */

// ---------------------------------------------------------------------------
// CORS & Headers
// ---------------------------------------------------------------------------
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
    exit;
}

// ---------------------------------------------------------------------------
// Rate Limiting (file-based, survives across requests)
// ---------------------------------------------------------------------------
$rateLimitDir = sys_get_temp_dir() . '/qm_rate_limit';
if (!is_dir($rateLimitDir)) {
    @mkdir($rateLimitDir, 0755, true);
}

$ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ip = explode(',', $ip)[0];
$ip = trim($ip);
$ipHash = md5($ip);
$rateLimitFile = $rateLimitDir . '/' . $ipHash . '.json';

$maxRequests = 10;
$windowSeconds = 3600; // 1 hour

if (file_exists($rateLimitFile)) {
    $rateData = json_decode(file_get_contents($rateLimitFile), true);
    if ($rateData && time() < $rateData['reset_at']) {
        if ($rateData['count'] >= $maxRequests) {
            http_response_code(429);
            echo json_encode(['error' => 'Too many requests. Please try again later.']);
            exit;
        }
        $rateData['count']++;
    } else {
        $rateData = ['count' => 1, 'reset_at' => time() + $windowSeconds];
    }
} else {
    $rateData = ['count' => 1, 'reset_at' => time() + $windowSeconds];
}
file_put_contents($rateLimitFile, json_encode($rateData));

// ---------------------------------------------------------------------------
// Parse & Validate
// ---------------------------------------------------------------------------
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data || !is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request body.']);
    exit;
}

// Honeypot — if filled, fake success to fool bots
if (!empty($data['_honeypot'])) {
    echo json_encode(['success' => true]);
    exit;
}

// Required fields
$required = ['name', 'email', 'service', 'message'];
foreach ($required as $field) {
    if (empty($data[$field]) || !is_string($data[$field]) || trim($data[$field]) === '') {
        http_response_code(400);
        echo json_encode(['error' => "\"$field\" is required."]);
        exit;
    }
}

// Sanitize
$name         = htmlspecialchars(trim($data['name']), ENT_QUOTES, 'UTF-8');
$email        = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$organization = htmlspecialchars(trim($data['organization'] ?? ''), ENT_QUOTES, 'UTF-8');
$whatsapp     = htmlspecialchars(trim($data['whatsapp'] ?? ''), ENT_QUOTES, 'UTF-8');
$service      = htmlspecialchars(trim($data['service']), ENT_QUOTES, 'UTF-8');
$message      = htmlspecialchars(trim($data['message']), ENT_QUOTES, 'UTF-8');

// Max lengths
$maxLengths = ['name' => 200, 'email' => 320, 'organization' => 300, 'service' => 50, 'message' => 5000];
foreach ($maxLengths as $field => $max) {
    if (isset($data[$field]) && strlen($data[$field]) > $max) {
        http_response_code(400);
        echo json_encode(['error' => "\"$field\" exceeds maximum length of $max characters."]);
        exit;
    }
}

// Email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Please provide a valid email address.']);
    exit;
}

// Valid services
$validServices = ['banking', 'hr', 'management', 'events', 'tech', 'general'];
if (!in_array($service, $validServices)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid service selection.']);
    exit;
}

$serviceLabels = [
    'banking'    => 'Banking Services Consultancy',
    'hr'         => 'Human Resources Consultancy',
    'management' => 'Management Consultancies',
    'events'     => 'Organization & Event Management',
    'tech'       => 'Technology Education R&D',
    'general'    => 'General Inquiry',
];
$serviceLabel = $serviceLabels[$service] ?? $service;

// ---------------------------------------------------------------------------
// STEP 1: Log submission to disk FIRST (guarantees zero data loss)
// ---------------------------------------------------------------------------
$logDir = __DIR__ . '/../qm_inquiries';
if (!is_dir($logDir)) {
    @mkdir($logDir, 0750, true);
    // Block web access to the log directory
    @file_put_contents($logDir . '/.htaccess', "Deny from all\n");
}

$logEntry = [
    'id'           => uniqid('inq_', true),
    'timestamp'    => date('c'),
    'name'         => $name,
    'email'        => $email,
    'organization' => $organization,
    'whatsapp'     => $whatsapp,
    'service'      => $serviceLabel,
    'message'      => $message,
    'ip'           => $ip,
    'email_sent'   => false,
];

// Append to daily log file (one file per day for easy management)
$logFile = $logDir . '/inquiries_' . date('Y-m-d') . '.json';

// Use file locking to prevent race conditions
$fh = fopen($logFile, 'a');
if ($fh) {
    flock($fh, LOCK_EX);
    fwrite($fh, json_encode($logEntry) . "\n");
    flock($fh, LOCK_UN);
    fclose($fh);
}

// ---------------------------------------------------------------------------
// STEP 2: Build HTML Email
// ---------------------------------------------------------------------------
$escapedMessage = nl2br($message);
$inquiryId = $logEntry['id'];

$htmlBody = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0c0a09;color:#e7e5e4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0c0a09;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#1c1917;border-radius:12px;overflow:hidden;">
        <tr>
          <td style="padding:32px 32px 20px;border-bottom:1px solid #292524;">
            <h1 style="margin:0;font-size:20px;color:#c15a2c;letter-spacing:0.05em;text-transform:uppercase;">
              New Contact Inquiry
            </h1>
            <p style="margin:8px 0 0;font-size:13px;color:#a8a29e;">
              Submitted via quartermasters.me contact form
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#78716c;font-weight:600;width:140px;vertical-align:top;">Name</td>
                <td style="padding:10px 0;font-size:14px;color:#e7e5e4;">$name</td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#78716c;font-weight:600;vertical-align:top;">Email</td>
                <td style="padding:10px 0;font-size:14px;color:#e7e5e4;">
                  <a href="mailto:$email" style="color:#c15a2c;text-decoration:none;">$email</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#78716c;font-weight:600;vertical-align:top;">WhatsApp</td>
                <td style="padding:10px 0;font-size:14px;color:#e7e5e4;">{$whatsapp}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#78716c;font-weight:600;vertical-align:top;">Organization</td>
                <td style="padding:10px 0;font-size:14px;color:#e7e5e4;">{$organization}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#78716c;font-weight:600;vertical-align:top;">Service</td>
                <td style="padding:10px 0;font-size:14px;color:#e7e5e4;">$serviceLabel</td>
              </tr>
              <tr>
                <td colspan="2" style="padding:18px 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#78716c;font-weight:600;">Message</td>
              </tr>
              <tr>
                <td colspan="2" style="padding:8px 16px;font-size:14px;color:#e7e5e4;background:#292524;border-radius:8px;line-height:1.6;">
                  $escapedMessage
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px;border-top:1px solid #292524;font-size:11px;color:#78716c;">
            Quartermasters F.Z.C &mdash; Ajman Free Zone, UAE &bull; License No: 37357
            <br>Ref: $inquiryId
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
HTML;

// ---------------------------------------------------------------------------
// STEP 3: Send Email (with unique Message-ID to prevent deduplication)
// ---------------------------------------------------------------------------
$to = 'hello@quartermasters.me, mujtaba@quartermasters.me';
$subject = "New Inquiry: $serviceLabel — $name";

// Unique Message-ID prevents mail servers from deduplicating rapid sends
$messageId = '<' . $inquiryId . '@quartermasters.me>';

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: Quartermasters Contact <noreply@quartermasters.me>\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "Message-ID: $messageId\r\n";
$headers .= "X-Mailer: Quartermasters-PHP/1.0\r\n";

$sent = @mail($to, $subject, $htmlBody, $headers);

// Update log entry with email status
if ($fh = fopen($logFile, 'r+')) {
    flock($fh, LOCK_EX);
    $contents = '';
    while (!feof($fh)) {
        $contents .= fread($fh, 8192);
    }
    $contents = str_replace(
        '"id":"' . $inquiryId . '","timestamp"',
        '"id":"' . $inquiryId . '","email_sent":' . ($sent ? 'true' : 'false') . ',"timestamp"',
        $contents
    );
    fseek($fh, 0);
    ftruncate($fh, 0);
    fwrite($fh, $contents);
    flock($fh, LOCK_UN);
    fclose($fh);
}

// Always return success — the inquiry is safely logged even if email fails
echo json_encode([
    'success' => true,
    'ref'     => $inquiryId,
]);
