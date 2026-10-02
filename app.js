/* =========================================
BLACKWOOD FURNITURES — FRONTEND JS v2
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
    MOBILE MENU
    ========================================= */
    const menuButton = document.querySelector(".mobile-menu-btn");
    const navigation = document.querySelector(".navigation");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            navigation.classList.toggle("active");
            menuButton.classList.toggle("open");
        });
    }

    /* =========================================
    STICKY HEADER
    ========================================= */
    const header = document.querySelector(".header");
    if (header) {
        window.addEventListener("scroll", () => {
            header.classList.toggle("scrolled", window.scrollY > 80);
        }, { passive: true });
    }

    /* =========================================
    SCROLL REVEAL
    ========================================= */
    const revealElements = document.querySelectorAll(".reveal");
    if (revealElements.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

        revealElements.forEach((el) => revealObserver.observe(el));
    }

    /* =========================================
    ANIMATED COUNTERS
    (skips non-integers like "4.8★" — those display as static)
    ========================================= */
    const counters = document.querySelectorAll(".trust-box h2");
    if (counters.length) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach((counter) => counterObserver.observe(counter));
    }

    function animateCounter(element) {
        const raw = element.innerText.trim();

        // Only animate pure integers with optional + or % suffix.
        // Anything else (e.g. "4.8★", "Since 2010") is left static.
        if (!/^\d+[+%]?$/.test(raw)) return;

        const number = parseInt(raw.replace(/\D/g, ""), 10) || 0;
        const suffix = raw.replace(/[0-9]/g, "");
        if (number === 0) { element.innerText = "0" + suffix; return; }

        let current = 0;
        const increment = number / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                element.innerText = number + suffix;
                clearInterval(timer);
            } else {
                element.innerText = Math.floor(current) + suffix;
            }
        }, 22);
    }

    /* =========================================
    SMOOTH SCROLL FOR INTERNAL ANCHORS
    ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (!targetId || targetId === "#") return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                // close mobile menu if open
                if (navigation) navigation.classList.remove("active");
                if (menuButton) menuButton.classList.remove("open");
            }
        });
    });

    /* =========================================
    LAZY LOAD IMAGES (fallback for older browsers)
    ========================================= */
    document.querySelectorAll("img").forEach((image) => {
        if (!image.hasAttribute("loading")) image.setAttribute("loading", "lazy");
    });

    /* =========================================
    QUOTE FORM — LEAD CAPTURE
    ------------------------------------------------------------
    SUBMITS VIA WHATSAPP DEEP LINK (no backend required).
    This captures the lead immediately in the channel where
    Kenyan buyers actually respond.

    TO SWAP IN A REAL BACKEND LATER:
      1. Replace the window.open(...) block below with:
           fetch('https://formspree.io/f/YOUR_ID', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(payload)
           }).then(() => { window.location.href = '/thank-you'; });
      2. Update the success handling accordingly.
    ========================================= */
    const quoteForm = document.getElementById("quote-form");
    const BUSINESS_WHATSAPP = "254702555093";

    if (quoteForm) {
        quoteForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const nameField  = document.getElementById("quote-name");
            const phoneField = document.getElementById("quote-phone");
            const typeField  = document.getElementById("quote-type");

            let valid = true;
            [nameField, phoneField, typeField].forEach((field) => {
                field.style.borderColor = "";
                if (!field.value.trim()) {
                    field.style.borderColor = "#c7a24f";
                    valid = false;
                }
            });

            if (!valid) {
                const firstInvalid = quoteForm.querySelector('input[style*="c7a24f"], select[style*="c7a24f"]');
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            const payload = {
                name: nameField.value.trim(),
                phone: phoneField.value.trim(),
                type: typeField.value,
                source: "website_quote_form",
                page: window.location.href,
                ts: new Date().toISOString()
            };

            // Analytics event
            if (typeof gtag === "function") {
                gtag("event", "generate_lead", {
                    event_category: "quote_form",
                    event_label: payload.type
                });
            }

            // Build WhatsApp message
            const labelMap = {
                sofa: "Sofa / Living Room",
                bed: "Bed / Bedroom",
                wardrobe: "Wardrobe",
                dining: "Dining Set",
                "tv-unit": "TV Unit / Shelving",
                office: "Office Fit-Out",
                hotel: "Hotel / Bulk Project",
                other: "Something Else"
            };

            const message =
                `Hi Blackwood, I'd like a quote.\n\n` +
                `Name: ${payload.name}\n` +
                `WhatsApp: ${payload.phone}\n` +
                `Project: ${labelMap[payload.type] || payload.type}\n\n` +
                `Sent from blackwoodfurnitures.co.ke`;

            const waURL = `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(message)}`;

            // Open WhatsApp (works on mobile app + WhatsApp Web)
            window.open(waURL, "_blank", "noopener");

            // Reset form + light confirmation
            quoteForm.reset();
            const btn = quoteForm.querySelector('button[type="submit"]');
            if (btn) {
                const original = btn.innerText;
                btn.innerText = "✓ Opening WhatsApp…";
                btn.disabled = true;
                setTimeout(() => {
                    btn.innerText = original;
                    btn.disabled = false;
                }, 3000);
            }
        });

        // Clear error state on input
        quoteForm.querySelectorAll("input, select").forEach((field) => {
            field.addEventListener("input", () => { field.style.borderColor = ""; });
            field.addEventListener("change", () => { field.style.borderColor = ""; });
        });
    }

    /* =========================================
    ACTIVE NAV HIGHLIGHT
    ========================================= */
    const currentPath = window.location.pathname;
    document.querySelectorAll(".nav-links a").forEach((link) => {
        const linkPath = new URL(link.href, window.location.origin).pathname;
        if (linkPath === currentPath ||
            (currentPath === "/" && linkPath.endsWith("index.html"))) {
            link.classList.add("active");
        }
    });

});