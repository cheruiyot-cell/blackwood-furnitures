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
        // Toggle menu on button click
        menuButton.addEventListener("click", () => {
            navigation.classList.toggle("active");
            menuButton.classList.toggle("open");
        });

        // NEW: Close menu when any link inside it is clicked
        navigation.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navigation.classList.remove("active");
                menuButton.classList.remove("open");
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
            {
                threshold: 0.15,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        revealElements.forEach((element) => revealObserver.observe(element));
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
    SMOOTH INTERNAL LINKS (SCROLL TO ANCHOR)
    ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (targetId === "#" || targetId === "") return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
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
    WHATSAPP PERSONALIZATION (Tracking)
    ========================================= */
    document.querySelectorAll(".whatsapp-button").forEach((button) => {
        button.addEventListener("click", () => {
            if (typeof gtag === "function") {
                gtag("event", "whatsapp_click");
            }
        });
    });

    /* =========================================
    QUOTE FORM VALIDATION
    ========================================= */
    document.querySelectorAll("form").forEach((form) => {
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
    ACTIVE NAVIGATION (Highlight Current Page)
    ========================================= */
    const currentPath = window.location.pathname;

    document.querySelectorAll(".nav-links a").forEach((link) => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath || 
            (currentPath === "/" && linkPath.endsWith("index.html"))) {
            link.classList.add("active");
        }
    });

});