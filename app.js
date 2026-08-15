/* =========================================
BLACKWOOD FURNITURES
PREMIUM FRONTEND JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
    MOBILE MENU TOGGLE & AUTO‑COLLAPSE
    ========================================= */
    const menuButton = document.querySelector(".mobile-menu-btn");
    const navigation = document.querySelector(".navigation");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            navigation.classList.toggle("active");
            menuButton.classList.toggle("open");
            const expanded = navigation.classList.contains("active");
            menuButton.setAttribute("aria-expanded", expanded);
        });

        navigation.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navigation.classList.remove("active");
                menuButton.classList.remove("open");
                menuButton.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* =========================================
    STICKY HEADER
    ========================================= */
    const header = document.querySelector(".header");
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 80) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    /* =========================================
    SCROLL REVEAL ANIMATION
    ========================================= */
    const revealElements = document.querySelectorAll(".reveal");
    if (revealElements.length) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
        );
        revealElements.forEach((el) => revealObserver.observe(el));
    }

    /* =========================================
    ANIMATED STATISTICS (COUNTERS)
    ========================================= */
    const counters = document.querySelectorAll(".trust-box h2");
    if (counters.length) {
        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );
        counters.forEach((counter) => counterObserver.observe(counter));
    }

    function animateCounter(element) {
        const text = element.innerText;
        const number = parseInt(text.replace(/\D/g, ""), 10) || 0;
        const suffix = text.replace(/[0-9]/g, "");
        if (number === 0) {
            element.innerText = "0" + suffix;
            return;
        }
        let current = 0;
        const increment = number / 80;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                element.innerText = number + suffix;
                clearInterval(timer);
            } else {
                element.innerText = Math.floor(current) + suffix;
            }
        }, 20);
    }

    /* =========================================
    SMOOTH INTERNAL LINKS
    ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (targetId === "#" || targetId === "") return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    /* =========================================
    IMAGE LAZY LOADING (already set in HTML)
    ========================================= */
    // No extra action needed – `loading="lazy"` is already on all images.

    /* =========================================
    WHATSAPP CLICK TRACKING
    ========================================= */
    document.querySelectorAll(".whatsapp-button").forEach((button) => {
        button.addEventListener("click", () => {
            if (typeof gtag === "function") {
                gtag("event", "whatsapp_click");
            }
        });
    });

    /* =========================================
    ACTIVE NAVIGATION (hash‑based)
    ========================================= */
    const navLinks = document.querySelectorAll(".nav-links a");
    function setActiveLink() {
        const hash = window.location.hash;
        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === hash) {
                link.classList.add("active");
            }
        });
    }
    window.addEventListener("hashchange", setActiveLink);
    // Set initial active based on current hash (or default Home)
    setActiveLink();

    /* =========================================
    QUOTE FORM – AJAX SUBMISSION VIA FORMSPREE
    ========================================= */
    const quoteForm = document.getElementById("quoteForm");
    const formStatus = document.getElementById("formStatus");

    if (quoteForm) {
        quoteForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            // Basic client‑side validation (HTML `required` already covers most)
            const name = document.getElementById("quote-name").value.trim();
            const email = document.getElementById("quote-email").value.trim();
            const project = document.getElementById("quote-type").value;
            const message = document.getElementById("quote-message").value.trim();

            if (!name || !email || !project || !message) {
                formStatus.textContent = "Please fill in all required fields.";
                formStatus.className = "form-error";
                return;
            }
            if (!email.includes("@") || !email.includes(".")) {
                formStatus.textContent = "Please enter a valid email address.";
                formStatus.className = "form-error";
                return;
            }

            // Prepare FormData
            const formData = new FormData(quoteForm);

            // Show sending status
            const submitBtn = quoteForm.querySelector("button[type='submit']");
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;
            formStatus.textContent = "";
            formStatus.className = "";

            try {
                const response = await fetch(quoteForm.action, {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                });

                if (response.ok) {
                    // Success
                    formStatus.textContent = "Thank you! We'll get back to you within 24 hours.";
                    formStatus.className = "form-success";
                    quoteForm.reset();
                } else {
                    const data = await response.json();
                    const errorMsg = data.error ? data.error : "Something went wrong. Please try again later.";
                    formStatus.textContent = errorMsg;
                    formStatus.className = "form-error";
                }
            } catch (error) {
                formStatus.textContent = "Network error. Please check your connection and try again.";
                formStatus.className = "form-error";
            } finally {
                submitBtn.textContent = "Send Request";
                submitBtn.disabled = false;
            }
        });
    }
});