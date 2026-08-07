const HEADERS = ['Timestamp', 'Name', 'Reply email', 'Request type', 'Message', 'Status'];
const SPREADSHEET_ID_PROPERTY = 'SPREADSHEET_ID';

function doGet() {
  const diagnostics = {
    ok: true,
    service: 'portfolio-contact',
    sheetReady: getSubmissionSheet() !== null,
    notificationEmailSet: Boolean(PropertiesService.getScriptProperties().getProperty('NOTIFICATION_EMAIL')),
  };
  return jsonResponse(diagnostics);
}

function doPost(event) {
  const payload = parsePayload(event);
  const submission = {
    name: clean(payload.name),
    email: clean(payload.email),
    requestType: clean(payload.requestType || 'General inquiry'),
    message: clean(payload.message),
  };

  if (!submission.name || !submission.email || !submission.message || !submission.email.includes('@')) {
    return jsonResponse({ ok: false, error: 'Missing or invalid required fields.' });
  }

  const results = { sheetSaved: false, notified: false };

  try {
    getSubmissionSheet().appendRow([new Date(), submission.name, submission.email, submission.requestType, submission.message, 'New']);
    results.sheetSaved = true;
  } catch (error) {
    console.error('Sheet save failed:', error);
    results.sheetError = String(error);
  }

  try {
    results.notified = notifyOwner(submission);
  } catch (error) {
    console.error('Notification failed:', error);
  }

  // If the sheet save failed, email the submission to the owner so no data is lost.
  if (!results.sheetSaved) {
    try {
      notifyOwner(submission, true);
      results.notified = true;
    } catch (error) {
      console.error('Emergency notification failed:', error);
    }
  }

  if (results.sheetSaved || results.notified) {
    return jsonResponse({ ok: true, results });
  }
  return jsonResponse({ ok: false, error: 'Unable to save submission or send notification.', results });
}

function parsePayload(event) {
  if (event.postData && event.postData.type === 'application/json') {
    return JSON.parse(event.postData.contents || '{}');
  }
  return event.parameter || {};
}

function getSubmissionSheet() {
  const properties = PropertiesService.getScriptProperties();
  const configuredId = properties.getProperty(SPREADSHEET_ID_PROPERTY);

  let spreadsheet = null;
  if (configuredId) {
    try {
      spreadsheet = SpreadsheetApp.openById(configuredId);
    } catch (error) {
      console.error(`SPREADSHEET_ID "${configuredId}" is not valid:`, error);
    }
  }
  if (!spreadsheet) spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) return null;

  let sheet = spreadsheet.getSheetByName('Resume requests');
  if (!sheet) sheet = spreadsheet.insertSheet('Resume requests');
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  return sheet;
}

function notifyOwner(submission, urgent) {
  const properties = PropertiesService.getScriptProperties();
  const recipient = properties.getProperty('NOTIFICATION_EMAIL') || Session.getEffectiveUser().getEmail();
  if (!recipient) return false;

  const body = [
    urgent ? '⚠️ URGENT: The form saved a request but could NOT write it to the spreadsheet.' : '',
    `Name: ${submission.name}`,
    `Reply email: ${submission.email}`,
    `Request type: ${submission.requestType}`,
    '',
    submission.message,
  ].filter(Boolean).join('\n');

  MailApp.sendEmail({
    to: recipient,
    subject: `${urgent ? '[STORAGE FAILED] ' : ''}${submission.requestType} from ${submission.name}`,
    replyTo: submission.email,
    body,
  });
  return true;
}

function clean(value) {
  return String(value || '').trim().slice(0, 5000);
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
