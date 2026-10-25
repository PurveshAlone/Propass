# 🔐 ProPass Secure — Password Strength Analyzer

A privacy-focused, browser-based password strength analyzer built with HTML, CSS, and JavaScript.

## 🌐 Live Demo

**Visit ProPass:** https://purveshalone.github.io/Propass/

> If the website is not deployed successfully yet, publish it first and then verify this link.

## ✨ Features

- 🔒 Client-side password analysis
- 🛡️ No application backend required for password analysis
- 🔑 Secure password generation using the Web Crypto API
- 📊 Password strength and simplified entropy estimates
- 👁️ Show/Hide password functionality
- 📋 Copy generated passwords
- 🎨 Theme support
- 📱 Responsive interface
- 🚫 No password storage in localStorage or console logging
- 🧩 DOM-based result rendering to reduce unsafe HTML injection risks

*Check the current source code to confirm each feature before making a public claim.*

## 🧰 Technologies Used

- HTML5
- CSS3
- JavaScript
- Web Crypto API
- GitHub Pages

## 🔐 Privacy and Security

- Password analysis runs in the browser and does not require an application backend.
- The analyzed password is not stored in localStorage or logged to the console by the application.
- Password generation uses Web Crypto and rejection sampling to avoid modulo bias.
- The common-password list is a small local list, not a real data-breach database.
- The application does not claim to verify passwords against actual data breaches.

**Important:** Do not enter a password you currently use for important accounts. This project is an educational tool, not a certified password auditing service. Strength and entropy values are simplified estimates.

No website can be guaranteed completely secure. Browser extensions, compromised devices, hosting-account takeovers, and other external risks are outside the application's control.

## 🚀 Deployment

### GitHub Pages

1. Upload `index.html` and its required CSS and JavaScript files to the repository's published root.
2. Open **Settings → Pages**.
3. Select **Deploy from a branch**.
4. Choose the `main` branch and `/(root)` folder.
5. Save and wait for the deployment to complete.
6. Open the Live Demo link above and verify the website.

**Note:** GitHub Pages does not automatically apply Netlify `_headers` or Vercel `vercel.json` configuration files as HTTP security headers.

### Netlify

1. Extract the project ZIP.
2. Deploy the project files using Netlify's manual deployment option.
3. Keep `_headers` at the published root.
4. Open the HTTPS URL provided by Netlify.
5. Verify the response headers and application behavior.

### Vercel

1. Upload the project files to a Git repository.
2. Import the repository into Vercel.
3. Configure it as a static project with the project root as the published directory.
4. Deploy and verify the HTTPS URL and response headers.

## 🧪 Local Testing

1. Extract the project ZIP.
2. Open a terminal in the project folder.
3. Run:

   ```bash
   python -m http.server 8000
   ```

   On Windows, you can also run:

   ```bash
   py -m http.server 8000
   ```

4. Visit `http://localhost:8000`.
5. Test blank input, short passwords, long passphrases, password generation, Show/Hide, Copy, theme, and mobile layout.
6. Inspect the browser's Developer Tools Console and Network tabs for errors or unexpected requests.

Use only fake sample passwords during testing.

## ✅ Security Verification Checklist

- [ ] HTTPS works and HTTP redirects to HTTPS.
- [ ] Security headers are present in actual server responses where configured.
- [ ] Password input does not trigger unexpected network requests.
- [ ] No unreviewed analytics, trackers, remote scripts, or external font dependencies are loaded.
- [ ] No real passwords are used during testing.
- [ ] Hosting and Git accounts use multi-factor authentication (MFA).
- [ ] Deployment configuration and source-code changes are reviewed before publishing.

## ⚠️ Security Limitations

This project is a security-minded educational baseline, not a penetration-test report or a guarantee of security. A configuration file alone does not prove that a hosting provider has applied the intended headers.

For production security claims, arrange an independent review and testing.

## 👨‍💻 Project Purpose

ProPass Secure demonstrates front-end development, privacy-aware design, password-strength estimation, secure random password generation, and basic web security considerations.

**Author:** Purvesh Alone

---

⭐ If you find this project useful, consider starring the repository.
