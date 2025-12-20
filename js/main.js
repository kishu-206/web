

function setYear() {
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function setActiveNavLink() {

  var path = window.location.pathname;
  var current = path.split("/").pop();
  if (!current) current = "index.html";

  var links = document.querySelectorAll(".site-nav .nav-link");
  for (var i = 0; i < links.length; i++) {
    var href = links[i].getAttribute("href");
    if (href === current) {
      links[i].classList.add("active");
    }
  }
}

function setupMobileNav() {
  var btn = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (!btn || !nav) return;

  btn.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

function setupHelloButton() {
  var btn = document.querySelector('[data-action="hello"]');
  if (!btn) return;

  btn.addEventListener("click", function () {
    var out = document.getElementById("helloOutput");
    if (out) {
      out.textContent = "Hello! Thanks for visiting IEEE VIT Vellore.";
    }
  });
}

function setupFactButton() {
  var btn = document.querySelector('[data-action="fact"]');
  if (!btn) return;

  var facts = [
    "IEEE stands for Institute of Electrical and Electronics Engineers.",
    "Small consistent practice beats last-minute learning.",
    "You learn faster when you build tiny projects regularly.",
  ];

  btn.addEventListener("click", function () {
    var out = document.getElementById("factOutput");
    if (!out) return;

    var idx = Math.floor(Math.random() * facts.length);
    out.textContent = facts[idx];
  });
}

function setupFocusTip() {
  var btn = document.querySelector('[data-action="focus-tip"]');
  if (!btn) return;

  btn.addEventListener("click", function () {
    var sel = document.getElementById("focusSelect");
    var out = document.getElementById("focusTipOutput");
    if (!sel || !out) return;

    var value = sel.value;
    var tip = "";

    if (value === "ai") tip = "Tip: Start with Python basics, then learn data cleaning and simple models.";
    if (value === "cyber") tip = "Tip: Learn how HTTP works, then study common web vulnerabilities safely.";
    if (value === "web") tip = "Tip: Build one small page, then add CSS, then add JavaScript interactions.";
    if (value === "iot") tip = "Tip: Begin with one sensor + one microcontroller and print values to serial.";

    out.textContent = tip;
  });
}

function setupEventsFilter() {
  var filterButtons = document.querySelectorAll(".chip[data-filter]");
  var grid = document.getElementById("eventsGrid");
  if (!filterButtons.length || !grid) return;

  function applyFilter(filter) {
    var cards = grid.querySelectorAll(".event");
    var shownCount = 0;

    for (var i = 0; i < cards.length; i++) {
      var status = cards[i].getAttribute("data-status");
      var show = filter === "all" || status === filter;
      cards[i].style.display = show ? "block" : "none";
      if (show) shownCount++;
    }

    var empty = document.getElementById("eventsEmpty");
    if (empty) {
      empty.style.display = shownCount === 0 ? "block" : "none";
    }
  }

  for (var b = 0; b < filterButtons.length; b++) {
    filterButtons[b].addEventListener("click", function (e) {
      var selected = e.currentTarget.getAttribute("data-filter");

      // style chips
      for (var k = 0; k < filterButtons.length; k++) {
        filterButtons[k].classList.remove("active");
      }
      e.currentTarget.classList.add("active");

      applyFilter(selected);
    });
  }

  applyFilter("all");
}

function setupEventModal() {
  var modal = document.getElementById("eventModal");
  if (!modal) return;

  var titleEl = document.getElementById("modalTitle");
  var metaEl = document.getElementById("modalMeta");
  var descEl = document.getElementById("modalDesc");

  function openModal(data) {
    if (titleEl) titleEl.textContent = data.title;
    if (metaEl) metaEl.textContent = "Date: " + data.date + " • Status: " + data.status;
    if (descEl) descEl.textContent = data.desc;

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }

  // Open from buttons
  document.addEventListener("click", function (e) {
    var target = e.target;

    // View details buttons
    if (target && target.getAttribute && target.getAttribute("data-action") === "event-details") {
      var card = target.closest(".event");
      if (!card) return;

      openModal({
        title: card.getAttribute("data-title") || "Event",
        date: card.getAttribute("data-date") || "",
        status: card.getAttribute("data-status") || "",
        desc: card.getAttribute("data-desc") || "",
      });
    }

    // Close modal
    if (target && target.getAttribute && target.getAttribute("data-action") === "close-modal") {
      closeModal();
    }
  });

  // Close on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });
}

function setupContactForm() {
  var form = document.getElementById("contactForm");
  if (!form) return;

  var nameInput = document.getElementById("name");
  var emailInput = document.getElementById("email");
  var messageInput = document.getElementById("message");

  var nameErr = document.getElementById("nameError");
  var emailErr = document.getElementById("emailError");
  var messageErr = document.getElementById("messageError");
  var success = document.getElementById("formSuccess");

  function setError(el, msg) {
    if (el) el.textContent = msg;
  }

  function clearAll() {
    setError(nameErr, "");
    setError(emailErr, "");
    setError(messageErr, "");
    if (success) success.textContent = "";
  }

  function validate() {
    clearAll();
    var ok = true;

    var nameVal = nameInput ? nameInput.value.trim() : "";
    var emailVal = emailInput ? emailInput.value.trim() : "";
    var msgVal = messageInput ? messageInput.value.trim() : "";

    if (nameVal.length < 2) {
      setError(nameErr, "Please enter your name (min 2 letters).");
      ok = false;
    }

    if (emailVal.indexOf("@")== -1 || emailVal.indexOf(".")== -1) {
      setError(emailErr, "Please enter a valid email.");
      ok = false;
    }

    if (msgVal.length < 10) {
      setError(messageErr, "Message should be at least 10 characters.");
      ok = false;
    }

    return ok;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validate()) return;

    var payload = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim(),
      savedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("ieeevit_last_message", JSON.stringify(payload));
    } catch (err) {
      // ignore if storage is blocked
    }

    if (success) {
      success.textContent = "Saved! (Demo) We stored your message in this browser.";
    }

    form.reset();
  });

  // Load last saved
  document.addEventListener("click", function (e) {
    var target = e.target;
    if (!target || !target.getAttribute) return;

    if (target.getAttribute("data-action") === "load-last") {
      clearAll();
      try {
        var raw = localStorage.getItem("ieeevit_last_message");
        if (!raw) {
          if (success) success.textContent = "No saved message found yet.";
          return;
        }

        var data = JSON.parse(raw);
        if (nameInput) nameInput.value = data.name || "";
        if (emailInput) emailInput.value = data.email || "";
        if (messageInput) messageInput.value = data.message || "";

        if (success) success.textContent = "Loaded the last saved message.";
      } catch (err) {
        if (success) success.textContent = "Could not load saved message.";
      }
    }
  });
}


setYear();
setActiveNavLink();
setupMobileNav();
setupHelloButton();
setupFactButton();
setupFocusTip();
setupEventsFilter();
setupEventModal();
setupContactForm();
