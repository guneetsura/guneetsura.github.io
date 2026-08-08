# Contact Fast-Acknowledgement Design

**Date:** 2026-08-08  
**Component:** `src/components/Contact.tsx`

## Goal

Make the contact form feel immediate without changing the Google Apps Script request contract.

## Current Delay

The form waits for Apps Script to append a spreadsheet row and send an email before opening the success dialog. It also keeps the submission animation visible for at least 600 milliseconds. Google performs both operations synchronously, so the browser waits on work that the visitor does not need to watch.

## Approved Design

After client-side validation passes, the form will create the existing URL-encoded request and start the `no-cors` POST immediately. The UI will show the submission animation for 250 milliseconds, then open the success dialog without waiting for the opaque Apps Script response.

The form will preserve the existing button disablement during the short acknowledgement period. It will clear the fields only after the success dialog opens. The payload remains `name`, `email`, `subject`, `requestType`, and `message`, so the deployed Apps Script continues to save the same Sheet row and send the same notification.

## Error Handling

The site cannot inspect the Apps Script response because GitHub Pages submits cross-origin with `no-cors`. The form will retain the existing error state for configuration and synchronous request-start failures. It cannot reliably distinguish a remote Sheets or email failure from a successful opaque response without changing to a CORS-capable backend.

## Verification

Add a focused test for the acknowledgement timing and request payload. Run it before and after the implementation, then run lint and the production build. Verify the live Apps Script separately with a benign submission when the deployment completes.
