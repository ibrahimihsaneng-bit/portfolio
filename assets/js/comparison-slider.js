/**
 * COMPARISON SLIDER COMPONENT
 * Restrained engineering before/after reveal interaction.
 * Compares finite element / CFD computational mesh with simulation result contours.
 * Fully keyboard accessible (Arrow keys, Home, End), touch & mouse responsive,
 * and respects prefers-reduced-motion settings.
 */

export class ComparisonSlider {
    constructor(containerElement) {
        if (!containerElement) return;
        this.container = containerElement;
        this.beforeImage = this.container.querySelector('.slider-before');
        this.afterImage = this.container.querySelector('.slider-after');
        this.handle = this.container.querySelector('.slider-handle');
        this.sliderLine = this.container.querySelector('.slider-line');
        this.value = 50; // Initial split at 50%
        this.isDragging = false;

        this.init();
    }

    init() {
        if (!this.beforeImage || !this.handle) return;

        // Check prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            this.container.classList.add('reduced-motion');
        }

        this.updatePosition(this.value);

        // Pointer event listeners (Mouse + Touch unified)
        const onPointerMove = (e) => {
            if (!this.isDragging) return;
            const rect = this.container.getBoundingClientRect();
            const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : rect.left);
            const x = clientX - rect.left;
            let percent = (x / rect.width) * 100;
            percent = Math.max(0, Math.min(100, percent));
            this.updatePosition(percent);
        };

        const onPointerUp = () => {
            if (this.isDragging) {
                this.isDragging = false;
                window.removeEventListener('pointermove', onPointerMove);
                window.removeEventListener('pointerup', onPointerUp);
                window.removeEventListener('pointercancel', onPointerUp);
            }
        };

        const onPointerDown = (e) => {
            this.isDragging = true;
            onPointerMove(e);
            window.addEventListener('pointermove', onPointerMove);
            window.addEventListener('pointerup', onPointerUp);
            window.addEventListener('pointercancel', onPointerUp);
        };

        this.container.addEventListener('pointerdown', onPointerDown);

        // Keyboard navigation for accessibility
        this.handle.setAttribute('role', 'slider');
        this.handle.setAttribute('aria-label', 'Reveal simulation contours from computational mesh');
        this.handle.setAttribute('aria-valuemin', '0');
        this.handle.setAttribute('aria-valuemax', '100');
        this.handle.setAttribute('aria-valuenow', '50');
        this.handle.setAttribute('tabindex', '0');

        this.handle.addEventListener('keydown', (e) => {
            let step = 5;
            if (e.shiftKey) step = 15;

            if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                e.preventDefault();
                this.updatePosition(Math.max(0, this.value - step));
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                e.preventDefault();
                this.updatePosition(Math.min(100, this.value + step));
            } else if (e.key === 'Home') {
                e.preventDefault();
                this.updatePosition(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                this.updatePosition(100);
            }
        });
    }

    updatePosition(percent) {
        this.value = Math.round(percent);
        if (this.beforeImage) {
            // Clip before-layer using inset (top right bottom left)
            this.beforeImage.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
        }
        if (this.handle) {
            this.handle.style.left = `${percent}%`;
            this.handle.setAttribute('aria-valuenow', String(this.value));
        }
        if (this.sliderLine) {
            this.sliderLine.style.left = `${percent}%`;
        }
    }
}

export function initAllComparisonSliders() {
    const sliders = document.querySelectorAll('.comparison-slider');
    sliders.forEach(slider => new ComparisonSlider(slider));
}
