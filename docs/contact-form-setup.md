# Contact Form Setup

The portfolio uses a Google Apps Script Web App as a free, private form backend. It stores requests in a private Google Sheet and optionally sends a notification email. Your email address is never included in the website source or form endpoint.

## Deploy

1. Create a new Google Sheet for portfolio requests.
2. Open **Extensions > Apps Script**.
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

The first successful submission creates a `Resume requests` sheet tab with the request data. Reply to the visitor using the `Reply email` value and attach the resume manually.

## Privacy

- The private notification address lives only in Google Apps Script properties.
- Visitor email addresses are stored in your private Sheet and sent to your private inbox.
- The public site contains only the Web App URL.
- Do not commit the notification address or a Google API key.
