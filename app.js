/* =========================================
BLACKWOOD FURNITURES – FRONTEND JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* Mobile menu */
    const menuButton = document.querySelector(".mobile-menu-btn");
    const navigation = document.querySelector(".navigation");
    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            navigation.classList.toggle("active");
            menuButton.classList.toggle("open");
        });
    }

    /* Sticky header */
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

    /* Scroll reveal */
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

    /* Animated counters */
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
        counters.forEach((c) => counterObserver.observe(c));
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

    /* Smooth internal links */
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

    /* Image lazy loading */
    document.querySelectorAll("img").forEach((img) => {
        if (!img.hasAttribute("loading")) {
            img.setAttribute("loading", "lazy");
        }
    });

    /* WhatsApp tracking */
    document.querySelectorAll(".whatsapp-button").forEach((btn) => {
        btn.addEventListener("click", () => {
            if (typeof gtag === "function") {
                gtag("event", "whatsapp_click");
            }
        });
    });

    /* Form validation */
    document.querySelectorAll("form").forEach((form) => {
        form.addEventListener("submit", (event) => {
            const required = form.querySelectorAll("[required]");
            let valid = true;
            required.forEach((field) => {
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

    /* Active navigation highlight */
    const currentPath = window.location.pathname;
    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.classList.remove("active");
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath ||
            (currentPath === "/" && linkPath.endsWith("index.html"))) {
            link.classList.add("active");
        }
    });

});