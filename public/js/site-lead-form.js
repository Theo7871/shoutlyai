/* Shared lead capture form handler for industry landing pages */
(function () {
  function initLeadForm() {
    var form = document.getElementById("leadCaptureForm");
    if (!form) return;

    // Prevent double binding
    if (form.getAttribute("data-bound") === "true") return;
    form.setAttribute("data-bound", "true");

    var nameInput = document.getElementById("lcName");
    var phoneInput = document.getElementById("lcPhone");
    var emailInput = document.getElementById("lcEmail");
    var companyInput = document.getElementById("lcCompany");
    var cityInput = document.getElementById("lcCity");
    var msgInput = document.getElementById("lcMsg");
    var submitBtn = document.getElementById("lcSubmit") || form.querySelector('button[type="submit"]');
    var leadFormContainer = document.getElementById("leadForm");
    var successContainer = document.getElementById("leadSuccess");

    // Create error element if not already present
    var errorBox = document.getElementById("lcError");
    if (!errorBox) {
      errorBox = document.createElement("div");
      errorBox.id = "lcError";
      errorBox.style.display = "none";
      errorBox.style.color = "#b91c1c";
      errorBox.style.backgroundColor = "#fef2f2";
      errorBox.style.border = "1px solid #fecaca";
      errorBox.style.borderRadius = "8px";
      errorBox.style.padding = "10px 14px";
      errorBox.style.fontSize = "13px";
      errorBox.style.fontWeight = "600";
      errorBox.style.marginBottom = "14px";
      form.insertBefore(errorBox, form.firstChild);
    }

    function showError(msg) {
      errorBox.textContent = msg;
      errorBox.style.display = "block";
      errorBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    function hideError() {
      errorBox.textContent = "";
      errorBox.style.display = "none";
    }

    function detectIndustry() {
      var badge = document.querySelector(".section-badge");
      if (badge && badge.textContent.trim()) {
        return badge.textContent.trim().replace(/^⚡\s*/, "").replace(/^📱\s*/, "");
      }
      var h1 = document.querySelector("h1");
      if (h1 && h1.textContent.trim()) {
        return h1.textContent.trim();
      }
      var title = document.title || "";
      return title.split("|")[0].split("-")[0].trim() || "Industry Lead";
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      hideError();

      var name = nameInput ? nameInput.value.trim() : "";
      var phone = phoneInput ? phoneInput.value.trim() : "";
      var email = emailInput ? emailInput.value.trim() : "";
      var company = companyInput ? companyInput.value.trim() : "";
      var city = cityInput ? cityInput.value.trim() : "";
      var message = msgInput ? msgInput.value.trim() : "";

      if (!name) {
        showError("Please enter your name.");
        if (nameInput) nameInput.focus();
        return;
      }
      if (!phone || phone.length < 6) {
        showError("Please enter a valid phone or WhatsApp number.");
        if (phoneInput) phoneInput.focus();
        return;
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError("Please enter a valid email address.");
        if (emailInput) emailInput.focus();
        return;
      }
      if (!company) {
        showError("Please enter your business or company name.");
        if (companyInput) companyInput.focus();
        return;
      }

      var originalBtnText = submitBtn ? submitBtn.textContent : "Send Me Free Sample Posts →";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting…";
        submitBtn.style.opacity = "0.75";
      }

      var payload = {
        name: name,
        phone: phone,
        email: email,
        company: company,
        city: city,
        message: message,
        industry: detectIndustry(),
        page: window.location.href,
        source: "Industry Landing Page Lead Capture"
      };

      fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (!res.ok) {
            return res.json().catch(function () { return {}; }).then(function (data) {
              throw new Error(data.error || "Submission failed");
            });
          }
          return res.json();
        })
        .then(function () {
          if (leadFormContainer) {
            leadFormContainer.style.display = "none";
          } else {
            form.style.display = "none";
          }
          if (successContainer) {
            successContainer.classList.add("show");
            successContainer.style.display = "block";
            successContainer.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        })
        .catch(function (err) {
          console.error("Lead form error:", err);
          showError("Something went wrong. Please check your connection and try again.");
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            submitBtn.style.opacity = "1";
          }
        });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLeadForm);
  } else {
    initLeadForm();
  }
})();
