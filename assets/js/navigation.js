/**
 * NAVIGATION & UI INTERACTION CONTROLLER
 * Accessible mobile drawer navigation, scrollspy, project filters,
 * theme toggle, and editorial FAQ accordion.
 */

export function initNavigation() {
    initMobileMenu();
    initScrollspy();
    initProjectFilters();
    initFaqAccordion();
    initThemeSwitcher();
}

/**
 * Mobile Drawer Menu with ARIA states and keyboard trap
 */
function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const ham = document.getElementById('hamburger-icon');
    const close = document.getElementById('close-icon');

    if (!toggleBtn || !drawer) return;

    function openDrawer() {
        drawer.classList.remove('hidden');
        if (ham) ham.classList.add('hidden');
        if (close) close.classList.remove('hidden');
        toggleBtn.setAttribute('aria-expanded', 'true');
    }

    function closeDrawer() {
        drawer.classList.add('hidden');
        if (ham) ham.classList.remove('hidden');
        if (close) close.classList.add('hidden');
        toggleBtn.setAttribute('aria-expanded', 'false');
    }

    toggleBtn.addEventListener('click', () => {
        const isOpen = !drawer.classList.contains('hidden');
        if (isOpen) {
            closeDrawer();
        } else {
            openDrawer();
        }
    });

    // Close on link click
    const drawerLinks = drawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeDrawer();
        });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !drawer.classList.contains('hidden')) {
            closeDrawer();
            toggleBtn.focus();
        }
    });

    // Window exposure
    window.toggleMobileMenu = () => {
        if (drawer.classList.contains('hidden')) openDrawer();
        else closeDrawer();
    };
    window.closeMobileMenu = closeDrawer;
}

/**
 * Scrollspy for dynamic active navigation pill
 */
function initScrollspy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#desktop-nav .nav-item');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${id}`) {
                        link.classList.add('active');
                        link.setAttribute('aria-current', 'page');
                    } else {
                        link.classList.remove('active');
                        link.removeAttribute('aria-current');
                    }
                });
            }
        });
    }, {
        rootMargin: '-20% 0px -60% 0px'
    });

    sections.forEach(section => observer.observe(section));
}

/**
 * Project Category Filter Buttons
 */
function initProjectFilters() {
    const filterWrapper = document.getElementById('filter-wrapper');
    if (!filterWrapper) return;

    const chips = filterWrapper.querySelectorAll('button[data-filter]');
    const cards = document.querySelectorAll('#projects-feed article');

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const category = chip.getAttribute('data-filter');
            
            // Update active states
            chips.forEach(c => {
                c.classList.remove('active');
                c.setAttribute('aria-selected', 'false');
            });
            chip.classList.add('active');
            chip.setAttribute('aria-selected', 'true');

            // Filter cards
            cards.forEach(card => {
                if (category === 'all' || card.classList.contains(category)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Programmatic filter trigger from other links
    window.filterProjects = (category) => {
        let targetChip = filterWrapper.querySelector(`button[data-filter="${category}"]`);
        if (!targetChip) targetChip = filterWrapper.querySelector('button[data-filter="all"]');
        if (targetChip) targetChip.click();
        const projSec = document.getElementById('projects');
        if (projSec) projSec.scrollIntoView({ behavior: 'smooth' });
    };
    window.applyFilter = (category, btn) => {
        if (btn) btn.click();
        else window.filterProjects(category);
    };
}

/**
 * Editorial FAQ Accordion Toggle
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-trigger');
        if (!btn) return;

        btn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close others
            faqItems.forEach(i => {
                i.classList.remove('active');
                const b = i.querySelector('.faq-trigger');
                if (b) b.setAttribute('aria-expanded', 'false');
            });

            if (!isActive) {
                item.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    window.toggleFaq = (btn) => {
        const item = btn.closest('.faq-item');
        if (!item) return;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('active');
            const b = i.querySelector('.faq-trigger');
            if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (!isActive) {
            item.classList.add('active');
            btn.setAttribute('aria-expanded', 'true');
        }
    };
}

/**
 * Hero Eye Theme Switcher (White View / Dark View)
 */
function initThemeSwitcher() {
    const eyeBtn = document.getElementById('hero-eye-theme-btn');
    if (!eyeBtn) return;

    window.toggleHeroTheme = () => {
        const isWhite = document.body.classList.toggle('white-view-theme');
        const eyeLabel = document.getElementById('hero-eye-label');
        if (eyeLabel) {
            eyeLabel.textContent = isWhite ? 'SWITCH: DARK OBSIDIAN' : 'SWITCH: WHITE VIEW';
        }
    };
}
