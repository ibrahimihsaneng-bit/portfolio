/**
 * MAIN ENTRY SCRIPT
 * Bootstraps accessible engineering portfolio components,
 * initializes case-study dialogs, comparison sliders, navigation,
 * and sets up reduced-motion fallbacks.
 */

import { initModalDialog, openCaseStudy } from './modal-dialog.js';
import { initNavigation } from './navigation.js';
import { initAllComparisonSliders } from './comparison-slider.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize core accessible modules
    initModalDialog();
    initNavigation();
    initAllComparisonSliders();

    // 2. Make all project cards interactive & keyboard accessible
    initProjectCardInteractions();

    // 3. Initialize hero CFD background canvas with reduced-motion respect
    initHeroCfdBackground();

    // 4. Ensure any lingering preloader immediately releases without delay
    const preloader = document.getElementById('lusion-preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
});

/**
 * Ensures project cards are fully accessible buttons with Enter / Space triggers
 */
function initProjectCardInteractions() {
    const projectCards = document.querySelectorAll('[data-project-id]');
    projectCards.forEach(card => {
        const projectId = card.getAttribute('data-project-id');
        if (!projectId) return;

        // Click handler
        card.addEventListener('click', (e) => {
            // Ignore if clicked on an anchor inside the card
            if (e.target.closest('a')) return;
            openCaseStudy(projectId, card);
        });

        // Keyboard handler (Enter / Space)
        card.addEventListener('keydown', (e) => {
            if (e.target !== card) return; // Ignore bubbling from inner links
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openCaseStudy(projectId, card);
            }
        });
    });
}

/**
 * Hero CFD Streamline Canvas: Restrained, subtle simulation particle traces
 * Automatically disabled if prefers-reduced-motion is active.
 */
function initHeroCfdBackground() {
    const canvas = document.getElementById('hero-cfd-canvas');
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        canvas.style.display = 'none';
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width, height;
    let particles = [];
    const PARTICLE_COUNT = 35; // Light footprint

    function resize() {
        const parent = canvas.parentElement;
        if (!parent) return;
        width = canvas.width = parent.clientWidth;
        height = canvas.height = parent.clientHeight;
        initParticles();
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                speed: 0.8 + Math.random() * 1.2,
                length: 20 + Math.random() * 40,
                opacity: 0.15 + Math.random() * 0.25,
                color: Math.random() > 0.4 ? 'rgba(245, 158, 70, ' : 'rgba(83, 187, 200, '
            });
        }
    }

    let animationId;
    function render() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + p.length, p.y);
            ctx.strokeStyle = p.color + p.opacity + ')';
            ctx.lineWidth = 1;
            ctx.stroke();

            p.x += p.speed;
            if (p.x > width) {
                p.x = -p.length;
                p.y = Math.random() * height;
            }
        });

        animationId = requestAnimationFrame(render);
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();
    render();

    // Pause when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            render();
        }
    });
}
