# Contact Form Setup

The portfolio uses a Google Apps Script Web App as a free, private form backend. It stores requests in a private Google Sheet and optionally sends a notification email. Your email address is never included in the website source or form endpoint.

## Requirements

- The Apps Script project must be **bound to your Google Sheet**. Open the Sheet and use **Extensions > Apps Script** so `SpreadsheetApp.getActiveSpreadsheet()` resolves. A standalone script (created from script.google.com) has no spreadsheet and will fail to save.
- If you prefer to keep a standalone script, set the script property `SPREADSHEET_ID` to your Sheet's ID (the value between `/d/` and `/edit` in the Sheet URL). **If neither is set, the script now auto-creates a spreadsheet named "Portfolio Contact Requests" on first use and stores its ID in `SPREADSHEET_ID`.**
- To receive the notification email, set the script property `NOTIFICATION_EMAIL`. If it is missing, the script falls back to the owner of the script (the account that deployed it) via `Session.getEffectiveUser().getEmail()`.

## Deploy

1. Create a new Google Sheet for portfolio requests.
2. Open **Extensions > Apps Script** (this binds the script to the Sheet).
3. Replace the default script with `google-apps-script/Code.gs`.
4. In Apps Script, open **Project Settings > Script Properties** and add:
   - Property: `NOTIFICATION_EMAIL`
   - Value: your private email address
5. Deploy with **Deploy > New deployment**.
6. Select **Web app**.
7. Set **Execute as** to yourself.
8. Set **Who has access** to anyone.
9. Copy the Web App URL ending in `/exec`.
10. In the GitHub repository, open **Settings > Secrets and variables > Actions**.
11. Add a repository variable (or secret) named `CONTACT_FORM_ENDPOINT` with the Web App URL. The deployment workflow reads either.
12. Push any commit or manually run the deployment workflow.

> **Important:** After editing `Code.gs`, you must create a **new version** and redeploy (Deploy > Manage deployments > Edit > New version), otherwise the old code keeps running.

## Verify

- Open the `/exec` URL in a browser: it returns `{"ok":true,"service":"portfolio-contact","sheetReady":true,...}`. `sheetReady: false` means the script is not bound to a Sheet (or the `SPREADSHEET_ID` property is wrong).
- Submit the form once, then open your Sheet: the first successful submission creates a `Resume requests` sheet tab with the request data.
- The notification email goes to `NOTIFICATION_EMAIL` (or the deployer's account). Reply to the visitor using the `Reply email` value and attach the resume manually.

## Privacy

- The private notification address lives only in Google Apps Script properties.
- Visitor email addresses are stored in your private Sheet and sent to your private inbox.
- The public site contains only the Web App URL.
- Do not commit the notification address or a Google API key.
