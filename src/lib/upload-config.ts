/**
 * Endpoint for the rider photo-upload form (/upload).
 *
 * Paste the Google Apps Script Web App URL here after you deploy it (see the
 * deploy steps shared with this feature), or set NEXT_PUBLIC_UPLOAD_ENDPOINT in
 * an .env file. Until it's a real https URL, the form shows a "not yet
 * configured" notice instead of trying to submit.
 */
export const UPLOAD_ENDPOINT =
  process.env.NEXT_PUBLIC_UPLOAD_ENDPOINT ||
  "https://script.google.com/macros/s/AKfycbyqj5c5hk8ZQR61_sOApP6xnPnVGtHjzIJQ62E2hoVjQf0i-r1bDAAxfD1Wwpsj7wZg4Q/exec";

export const UPLOAD_CONFIGURED = /^https:\/\//.test(UPLOAD_ENDPOINT);
