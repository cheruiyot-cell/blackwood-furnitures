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
    IMAGE LAZY LOADING
    ========================================= */
    document.querySelectorAll("img").forEach((image) => {
        if (!image.hasAttribute("loading")) {
            image.setAttribute("loading", "lazy");
        }
    });

    /* =========================================
    WHATSAPP PERSONALIZATION
    ========================================= */
    document.querySelectorAll(".whatsapp-button").forEach((button) => {
        button.addEventListener("click", () => {
            if (typeof gtag === "function") {
                gtag("event", "whatsapp_click");
            }
        });
    });

    /* =========================================
    QUOTE FORM VALIDATION (for other forms)
    ========================================= */
    document.querySelectorAll("form:not(#quoteForm)").forEach((form) => {
        form.addEventListener("submit", (event) => {
            const requiredFields = form.querySelectorAll("[required]");
            let valid = true;
            requiredFields.forEach((field) => {
                field.style.borderColor = "";
                if (!field.value.trim()) {
                    valid = false;
                    field.style.borderColor = "#c7a24f";
                }
            });
            if (!valid) {
                event.preventDefault();
                alert("Please complete all required fields before submitting.");
            }
        });
        form.querySelectorAll("[required]").forEach((field) => {
            field.addEventListener("input", () => {
                field.style.borderColor = "";
            });
        });
    });

    /* =========================================
    ACTIVE NAVIGATION
    ========================================= */
    const currentPath = window.location.pathname;
    document.querySelectorAll(".nav-links a").forEach((link) => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath || 
            (currentPath === "/" && linkPath.endsWith("index.html"))) {
            link.classList.add("active");
        }
    });

    /* =========================================
    QUOTE FORM – MAILTO SUBMISSION
    ========================================= */
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('quote-name').value.trim();
            const email = document.getElementById('quote-email').value.trim();
            const phone = document.getElementById('quote-phone').value.trim();
            const project = document.getElementById('quote-type').value;
            const message = document.getElementById('quote-message').value.trim();

            if (!name || !email || !project || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            const recipient = 'harrisoncheruiyot04@gmail.com';
            const subject = encodeURIComponent('New Furniture Quote Request from Blackwood Website');
            const body = encodeURIComponent(
                `Name: ${name}\n` +
                `Email: ${email}\n` +
                `Phone: ${phone || 'Not provided'}\n` +
                `Project Type: ${project}\n` +
                `Message:\n${message}`
            );

            const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;

            // ✅ Confirmation alert + reset
            alert('Your email client has been opened. Please send the email to complete your request.');
            window.location.href = mailtoLink;
            quoteForm.reset();
        });
    }

});