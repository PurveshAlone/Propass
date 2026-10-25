# ProPass Secure Static Version

## What this version does
- Runs password analysis in the browser; it does not send the entered password to an app backend.
- Does not store the analyzed password in localStorage or log it to the console.
- Uses DOM `textContent`/element creation for result text rather than injecting dynamic HTML.
- Generates passwords with Web Crypto and rejection sampling to avoid modulo bias.
- Removes the fake "found in data breach" claim. The small common-password list is not a breach database.
- Includes security headers for Netlify (`_headers`) and Vercel (`vercel.json`).

## Important limitations
No site can be guaranteed unhackable. This is a static front-end demo, not a certified password auditing service. Strength/entropy are simplified estimates and the crack-time estimate was intentionally removed because it would be misleading. Browser extensions, a compromised device, malicious hosting account, DNS/account takeover, and future dependency/hosting issues are outside the app's control. Do not enter a password you currently use for important accounts.

## Local testing
1. Extract the ZIP.
2. Open a terminal in this folder.
3. Run `python -m http.server 8000` (or `py -m http.server 8000` on Windows).
4. Visit `http://localhost:8000`.
5. Test blank input, short input, long passphrase, Generate, Show/Hide, Copy, theme, and mobile layout.
6. Check browser DevTools Console and Network: typing should not cause a request. Do not use a real password for tests.

The local HTTP server is for testing only, not public production hosting.

## Deploy to Netlify (easy option)
1. Create/sign in to a Netlify account.
2. In Netlify, choose **Add new site** / **Deploy manually** (wording may vary).
3. Extract this ZIP on your computer.
4. Drag the extracted folder's contents (`index.html`, `app.js`, `styles.css`, `_headers`, `vercel.json`, `README.md`) into the manual deploy area. Keep `_headers` at the published root.
5. Wait for the deploy to finish, then open the HTTPS URL Netlify gives you.
6. Verify the page loads and test the features with a fake sample password.
7. In browser DevTools → Network, confirm password input does not trigger requests. In DevTools → Console, check for errors.
8. Re-deploy after any change; verify the published headers using a security-header checker and browser DevTools.

## Deploy to Vercel
1. Create a Git repository and upload the extracted files.
2. Import that repository in Vercel.
3. Choose **Other** / static site with no build command and no output directory if prompted; publish the project root.
4. Deploy and open the HTTPS URL.
5. `vercel.json` applies the security headers. Verify the response headers in DevTools → Network.
6. Do not add a backend or third-party analytics unless you review privacy/security implications first.

## Security verification checklist
- [ ] HTTPS is enabled and HTTP redirects to HTTPS.
- [ ] CSP and security headers are actually present in response headers.
- [ ] Password input is never sent in Network requests.
- [ ] No analytics, trackers, remote scripts, or external font/CDN dependencies are loaded.
- [ ] No real passwords are used during testing.
- [ ] Hosting account has MFA enabled and a unique password.
- [ ] Domain registrar and Git account use MFA; protect deploy tokens and repository access.
- [ ] Keep copies of the deployed version and review changes before publishing.

## Header note
The `Strict-Transport-Security` header is suitable for HTTPS production hosting. Do not test HSTS preload submission casually; preload is a long-term browser policy. If you use a custom domain with subdomains that are not all HTTPS-ready, remove `includeSubDomains; preload` until you have checked the implications.

## Before public launch
This package is a security-minded baseline, not a penetration-test report. For a production security claim, arrange independent review and testing. The CSP and other headers must be verified on the deployed response; a config file alone does not prove that a host applied them.
