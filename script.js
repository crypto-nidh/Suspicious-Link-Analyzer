function analyzeURL() {
  const url = document.getElementById("urlInput").value.trim();
  const result = document.getElementById("result");

  if (!url) {
    result.innerHTML = `<span style="color: orange;">❌ Please enter a URL.</span>`;
    return;
  }

  const suspiciousPatterns = [
    { pattern: /\b\d{1,3}(\.\d{1,3}){3}\b/, reason: "Contains IP address" },
    { pattern: /(login|verify|secure|account|free|win|giveaway|bank)/i, reason: "Contains suspicious keywords" },
    { pattern: /\.(tk|ml|ga|cf|gq)$/i, reason: "Suspicious top-level domain" },
    { pattern: /(bit\.ly|tinyurl\.com|t\.co|ow\.ly)/i, reason: "Shortened URL service" },
    { pattern: /@/, reason: "Uses '@' symbol — possible redirection" },
    { pattern: /\/\/.*\/.*\/.*\/.*\/.*/, reason: "Too many nested paths — possible redirect chain" }
  ];

  let suspiciousReasons = [];

  suspiciousPatterns.forEach(({ pattern, reason }) => {
    if (pattern.test(url)) {
      suspiciousReasons.push(reason);
    }
  });

  if (suspiciousReasons.length > 0) {
    result.innerHTML = `
      <span style="color: #fdcb6e;">⚠️ Suspicious link detected.</span><br>
      <ul>
        ${suspiciousReasons.map(r => `<li>🔸 ${r}</li>`).join('')}
      </ul>
    `;
  } else {
    result.innerHTML = `<span style="color: #00b894;">✅ This link seems safe.</span>`;
  }
}
