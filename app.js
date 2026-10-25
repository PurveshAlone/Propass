(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const passwordInput = $("passwordInput");
  const generatedPassword = $("generatedPassword");
  const toast = $("toast");
  const COMMON = new Set([
    "password", "123456", "12345678", "qwerty", "abc123", "admin", "letmein",
    "welcome", "monkey", "dragon", "master", "sunshine", "princess", "password1",
    "123456789", "12345", "1234567", "1234567890", "qwertyuiop", "qwerty123",
    "111111", "123123", "password123", "iloveyou", "trustno1"
  ]);
  const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()-_=+";
  const WORDS = [
    "amber","anchor","apricot","badger","bamboo","beacon","birch","bluejay","breeze","cactus",
    "candle","canvas","cedar","cinder","cobalt","comet","coral","cosmos","cricket","dahlia",
    "delta","dolphin","drift","ember","falcon","fern","frost","galaxy","garden","glacier",
    "harbor","hazel","heron","honey","indigo","island","jasmine","juniper","lantern","lemon",
    "lotus","maple","marble","meadow","meteor","midnight","mint","nebula","nectar","oasis",
    "ocean","olive","onyx","orchid","otter","pebble","pepper","planet","plum","quartz",
    "raven","river","rocket","saffron","shadow","silver","spruce","starling","summit","thistle",
    "thunder","tiger","topaz","velvet","violet","willow","winter","zephyr"
  ];

  function randomInt(max) {
    if (!Number.isSafeInteger(max) || max < 1 || max > 256) throw new Error("Invalid random range");
    // Rejection sampling avoids modulo bias.
    const limit = Math.floor(256 / max) * max;
    const bytes = new Uint8Array(1);
    let value;
    do { crypto.getRandomValues(bytes); value = bytes[0]; } while (value >= limit);
    return value % max;
  }

  function generateRandom(length = 20) {
    let out = "";
    for (let i = 0; i < length; i++) out += CHARSET[randomInt(CHARSET.length)];
    return out;
  }

  function generatePassphrase(count = 5) {
    const words = [];
    for (let i = 0; i < count; i++) words.push(WORDS[randomInt(WORDS.length)]);
    return words.join("-");
  }

  function analyze(password) {
    if (!password) return null;
    const groups = [
      /[a-z]/.test(password), /[A-Z]/.test(password),
      /[0-9]/.test(password), /[^A-Za-z0-9]/.test(password)
    ].filter(Boolean).length;
    const unique = new Set(password).size;
    const lower = password.toLowerCase();
    const checks = [];
    const recommendations = [];
    const common = COMMON.has(lower);
    const repeated = /(.)\1{2,}/u.test(password);
    const sequence = /(?:0123|1234|2345|abcd|bcde|cdef|qwer|asdf)/i.test(password);
    const length = [...password].length;

    if (common) checks.push("Matches a small built-in list of common passwords.");
    else checks.push("Not found in this app's small built-in common-password list (not a breach lookup).");
    if (repeated) checks.push("Contains a repeated-character pattern.");
    if (sequence) checks.push("Contains a simple sequence or keyboard pattern.");
    if (length >= 14) checks.push("Length is 14 characters or more.");
    else recommendations.push("Use at least 14 characters, or a long random passphrase.");
    if (common) recommendations.push("Avoid common passwords and predictable variations.");
    if (repeated || sequence) recommendations.push("Avoid repeated characters, sequences, and keyboard patterns.");
    if (unique < Math.min(8, length)) recommendations.push("Use more varied, less repetitive characters.");
    if (groups < 3) recommendations.push("Consider using a mix of character types, or use a long random passphrase.");
    recommendations.push("Use a unique password for each account and store it in a password manager.");

    // A rough estimate only. This is not a crack-time prediction or a formal strength score.
    let pool = 0;
    if (/[a-z]/.test(password)) pool += 26;
    if (/[A-Z]/.test(password)) pool += 26;
    if (/[0-9]/.test(password)) pool += 10;
    if (/[^A-Za-z0-9]/.test(password)) pool += 33;
    const estimatedEntropy = Math.round(length * Math.log2(Math.max(pool, 1)) * 10) / 10;
    let level = "Weak", score = 15, color = "var(--bad)";
    if (!common && length >= 14 && estimatedEntropy >= 70 && !repeated && !sequence) {
      level = "Very strong"; score = 100; color = "var(--good)";
    } else if (!common && length >= 12 && estimatedEntropy >= 55) {
      level = "Strong"; score = 75; color = "var(--good)";
    } else if (!common && length >= 10 && estimatedEntropy >= 35) {
      level = "Fair"; score = 50; color = "var(--warn)";
    }
    return { length, groups, estimatedEntropy, level, score, color, checks, recommendations: [...new Set(recommendations)] };
  }

  function addListItems(list, items) {
    list.replaceChildren();
    for (const item of items) {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    }
  }

  function render() {
    const password = passwordInput.value;
    const result = analyze(password);
    $("lengthDisplay").textContent = String(result ? result.length : 0);
    $("entropyDisplay").textContent = String(result ? result.estimatedEntropy : 0);
    $("varietyDisplay").textContent = `${result ? result.groups : 0} / 4`;
    $("strengthBar").style.width = `${result ? result.score : 0}%`;
    $("strengthBar").style.background = result ? result.color : "var(--bad)";
    if (!result) {
      $("resultIcon").textContent = "🔎";
      $("resultTitle").textContent = "Ready to analyze";
      $("resultSummary").textContent = "Enter a sample password to see guidance.";
      addListItems($("checksList"), ["No password has been analyzed."]);
      addListItems($("recommendationsList"), ["Use a long, unique password or passphrase."]);
      return;
    }
    $("resultIcon").textContent = result.level === "Weak" ? "⚠️" : result.level === "Fair" ? "🟡" : "🛡️";
    $("resultTitle").textContent = result.level;
    $("resultTitle").style.color = result.color;
    $("resultSummary").textContent = "This is a simplified local estimate, not a guarantee of account security.";
    addListItems($("checksList"), result.checks);
    addListItems($("recommendationsList"), result.recommendations);
  }

  function announce(message) { toast.textContent = message; }
  async function copyGenerated() {
    const value = generatedPassword.textContent;
    if (!value || value === "Select Generate to create one") { announce("Generate a password first."); return; }
    try {
      await navigator.clipboard.writeText(value);
      announce("Generated password copied. Clear your clipboard when finished.");
    } catch {
      announce("Clipboard access is unavailable. Select and copy the generated text manually.");
    }
  }

  $("toggleVisibility").addEventListener("click", () => {
    const show = passwordInput.type === "password";
    passwordInput.type = show ? "text" : "password";
    $("toggleVisibility").textContent = show ? "Hide" : "Show";
    $("toggleVisibility").setAttribute("aria-pressed", String(show));
  });
  passwordInput.addEventListener("input", render);
  $("generateBtn").addEventListener("click", () => {
    passwordInput.value = generateRandom();
    render();
    announce("Generated locally. Save it securely if you choose to use it.");
  });
  $("refreshGenerated").addEventListener("click", () => {
    generatedPassword.textContent = generateRandom();
    announce("New password generated.");
  });
  $("copyGenerated").addEventListener("click", copyGenerated);
  $("themeToggle").addEventListener("click", () => {
    const light = document.documentElement.dataset.theme !== "light";
    if (light) document.documentElement.dataset.theme = "light";
    else delete document.documentElement.dataset.theme;
    $("themeToggle").setAttribute("aria-pressed", String(light));
    $("themeToggle").textContent = light ? "Switch to dark theme" : "Switch to light theme";
  });

  // Avoid localStorage and analytics so no password or preference is persisted by this app.
  try {
    if (!globalThis.crypto || typeof crypto.getRandomValues !== "function") {
      $("generateBtn").disabled = true;
      $("refreshGenerated").disabled = true;
      announce("Secure random generation is unavailable. Open this site over HTTPS in a modern browser.");
    } else {
      generatedPassword.textContent = generateRandom();
    }
  } catch {
    $("generateBtn").disabled = true;
    $("refreshGenerated").disabled = true;
    announce("Secure random generation is unavailable in this browser.");
  }
  render();
})();
