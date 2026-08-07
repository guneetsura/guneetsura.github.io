const HEADERS = ['Timestamp', 'Name', 'Reply email', 'Request type', 'Message', 'Status'];

function doGet() {
  return jsonResponse({ ok: true, service: 'portfolio-contact' });
}

function doPost(event) {
  try {
    const payload = event.postData && event.postData.type === 'application/json' ? JSON.parse(event.postData.contents || '{}') : (event.parameter || {});
    const name = clean(payload.name);
    const email = clean(payload.email);
    const requestType = clean(payload.requestType || 'General inquiry');
    const message = clean(payload.message);

    if (!name || !email || !message || !email.includes('@')) {
      return jsonResponse({ ok: false, error: 'Missing or invalid required fields.' });
    }

    const sheet = getSubmissionSheet();
    sheet.appendRow([new Date(), name, email, requestType, message, 'New']);
    notifyOwner({ name, email, requestType, message });

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: 'Unable to save submission.' });
  }
}

function getSubmissionSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName('Resume requests');
  if (!sheet) sheet = spreadsheet.insertSheet('Resume requests');
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  return sheet;
}

function notifyOwner(submission) {
  const recipient = PropertiesService.getScriptProperties().getProperty('NOTIFICATION_EMAIL');
  if (!recipient) return;
  MailApp.sendEmail({
    to: recipient,
    subject: `${submission.requestType} from ${submission.name}`,
    replyTo: submission.email,
    body: [
      `Name: ${submission.name}`,
      `Reply email: ${submission.email}`,
      `Request type: ${submission.requestType}`,
      '',
      submission.message,
    ].join('\n'),
  });
}

function clean(value) {
  return String(value || '').trim().slice(0, 5000);
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
