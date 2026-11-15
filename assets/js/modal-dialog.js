/**
 * MODAL DIALOG CONTROLLER (W3C WAI-ARIA Compliant)
 * Accessible dialog with focus trap, focus restoration, keyboard arrow-key tablist,
 * Escape key listener, and URL hash routing for shareable case-study links.
 */

import { CASE_STUDIES } from './case-studies-data.js';
import { ComparisonSlider } from './comparison-slider.js';

let activeTriggerElement = null;
let currentSliderInstance = null;

const FOCUSABLE_SELECTORS = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function initModalDialog() {
    const modal = document.getElementById('tech-modal');
    if (!modal) return;

    // Close button click
    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Global Keydown (Escape & Focus containment)
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('hidden')) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            closeModal();
            return;
        }

        if (e.key === 'Tab') {
            handleFocusTrap(e, modal);
        }
    });

    // Accessible tablist keyboard controls
    const tablist = modal.querySelector('[role="tablist"]');
    if (tablist) {
        const tabs = tablist.querySelectorAll('[role="tab"]');
        tabs.forEach((tab, index) => {
            tab.addEventListener('keydown', (e) => {
                let targetIndex = null;
                if (e.key === 'ArrowRight') {
                    targetIndex = (index + 1) % tabs.length;
                } else if (e.key === 'ArrowLeft') {
                    targetIndex = (index - 1 + tabs.length) % tabs.length;
                } else if (e.key === 'Home') {
                    targetIndex = 0;
                } else if (e.key === 'End') {
                    targetIndex = tabs.length - 1;
                }

                if (targetIndex !== null) {
                    e.preventDefault();
                    tabs[targetIndex].focus();
                    tabs[targetIndex].click();
                }
            });
        });
    }

    // Check deep-linking URL hash on startup
    handleUrlHash();
    window.addEventListener('hashchange', handleUrlHash);
}

function handleUrlHash() {
    const hash = window.location.hash;
    const match = hash.match(/^#(?:case-study|project)-([a-z0-9_]+)$/i);
    if (match && match[1]) {
        const projectId = match[1].toLowerCase();
        if (CASE_STUDIES[projectId]) {
            // Slight timeout to allow initial DOM rendering
            setTimeout(() => {
                openCaseStudy(projectId, null, false);
            }, 100);
        }
    }
}

function handleFocusTrap(e, container) {
    const focusable = container.querySelectorAll(FOCUSABLE_SELECTORS);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
    }
}

export function openCaseStudy(projectId, triggerBtn = null, updateHash = true) {
    const data = CASE_STUDIES[projectId];
    const modal = document.getElementById('tech-modal');
    if (!data || !modal) return;

    // Save previous active element for restoration on close
    activeTriggerElement = triggerBtn || document.activeElement;

    // Update URL hash for shareable addressing
    if (updateHash) {
        history.replaceState(null, '', `#case-study-${projectId}`);
    }

    // Populate Modal Header & Badges
    document.getElementById('cm-title').textContent = data.title;
    document.getElementById('cm-category').textContent = data.category;
    document.getElementById('cm-role').textContent = data.role;
    document.getElementById('cm-tools').textContent = data.tools;
    document.getElementById('cm-badge').textContent = data.badge;

    // Populate Hero Visual (Comparison Slider or Static Image)
    const mediaContainer = document.getElementById('cm-media-container');
    if (mediaContainer) {
        if (data.hasComparison && data.meshImage && data.primaryImage) {
            mediaContainer.innerHTML = `
                <div class="comparison-slider relative w-full h-[260px] sm:h-[340px] md:h-[400px] rounded-2xl overflow-hidden bg-black border border-white/10 select-none">
                    <img src="${data.primaryImage}" alt="${data.title} simulation contour" class="slider-after absolute inset-0 w-full h-full object-contain bg-[#06080C]" width="800" height="450">
                    <img src="${data.meshImage}" alt="${data.title} computational mesh" class="slider-before absolute inset-0 w-full h-full object-contain bg-[#06080C]" width="800" height="450">
                    <div class="slider-line absolute top-0 bottom-0 w-0.5 bg-[#F59E46] shadow-[0_0_10px_#F59E46]"></div>
                    <button type="button" class="slider-handle absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#F59E46] text-[#080A0D] flex items-center justify-center font-bold text-xs shadow-lg cursor-ew-resize border border-white focus:outline-none focus:ring-2 focus:ring-white">
                        ⇄
                    </button>
                    <div class="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-neutral-300">
                        ◀ Mesh Structure | Simulation Contours ▶
                    </div>
                </div>
            `;
            const sliderEl = mediaContainer.querySelector('.comparison-slider');
            currentSliderInstance = new ComparisonSlider(sliderEl);
        } else {
            mediaContainer.innerHTML = `
                <div class="relative w-full h-[260px] sm:h-[340px] md:h-[400px] rounded-2xl overflow-hidden bg-[#06080C] border border-white/10 flex items-center justify-center">
                    <img id="cm-img" src="${data.primaryImage}" alt="${data.title}" class="w-full h-full object-contain" width="800" height="450">
                    <div class="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-[#F59E46]">
                        ${data.badge}
                    </div>
                </div>
            `;
            currentSliderInstance = null;
        }
    }

    // Populate Tab 1: Overview & Problem
    document.getElementById('cm-overview').textContent = data.summary;
    document.getElementById('cm-problem').textContent = data.problem;
    
    // Constraints list
    const constraintsList = document.getElementById('cm-constraints');
    if (constraintsList) {
        constraintsList.innerHTML = (data.constraints || []).map(c => `
            <li class="flex items-start space-x-2 text-xs text-[#A4AAB5]">
                <span class="text-[#F59E46] font-bold mt-0.5">▸</span>
                <span>${c}</span>
            </li>
        `).join('');
    }

    // Populate Tab 2: Methodology & Mesh
    const methodContainer = document.getElementById('cm-methodology');
    if (methodContainer) {
        methodContainer.innerHTML = (data.methodology || []).map(m => `
            <li class="flex items-start space-x-2.5 text-xs text-[#CBD5E1] leading-relaxed">
                <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                <span>${m}</span>
            </li>
        `).join('');
    }

    const meshStatsContainer = document.getElementById('cm-mesh-stats');
    if (meshStatsContainer && data.meshStats) {
        meshStatsContainer.innerHTML = Object.entries(data.meshStats).map(([key, val]) => `
            <div class="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <div class="text-[10px] uppercase font-mono text-[#94A3B8]">${key.replace(/([A-Z])/g, ' $1')}</div>
                <div class="text-xs font-bold text-[#F5F7FB] mt-0.5">${val}</div>
            </div>
        `).join('');
    }

    // Populate Tab 3: Verification & Results
    document.getElementById('cm-verification').textContent = data.verification;
    const resultsContainer = document.getElementById('cm-results-grid');
    if (resultsContainer) {
        resultsContainer.innerHTML = (data.results || []).map(r => `
            <div class="p-3.5 rounded-xl bg-white/[0.04] border border-[#F59E46]/30">
                <div class="text-[11px] font-mono text-[#F59E46]">${r.label}</div>
                <div class="text-base sm:text-lg font-black text-white mt-1">${r.value}</div>
                <div class="text-[10px] text-[#94A3B8] font-mono mt-0.5">${r.note}</div>
            </div>
        `).join('');
    }

    // Populate Tab 4: Limitations & Engineering Roadmap
    const limitationsList = document.getElementById('cm-limitations');
    if (limitationsList) {
        limitationsList.innerHTML = (data.limitations || []).map(l => `
            <li class="flex items-start space-x-2 text-xs text-[#A4AAB5] leading-relaxed">
                <span class="text-amber-400 font-bold mt-0.5">⚠️</span>
                <span>${l}</span>
            </li>
        `).join('');
    }

    // Update Action Buttons
    const waBtn = document.getElementById('cm-whatsapp-btn');
    if (waBtn) {
        const msg = encodeURIComponent(`Hello Ibrahim, I am reviewing your verified engineering case study on "${data.title}" and would like to discuss engineering analysis / consulting.`);
        waBtn.href = `https://wa.me/919446631380?text=${msg}`;
    }

    // Reset to first tab
    switchModalTab('overview');

    // Display Modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button initially
    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) closeBtn.focus();
}

export function switchModalTab(tabId) {
    const tabs = ['overview', 'methodology', 'results', 'limitations'];
    tabs.forEach(t => {
        const btn = document.getElementById(`tab-btn-${t}`);
        const pane = document.getElementById(`pane-${t}`);
        if (!btn || !pane) return;

        if (t === tabId) {
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            btn.setAttribute('tabindex', '0');
            pane.classList.remove('hidden');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
            btn.setAttribute('tabindex', '-1');
            pane.classList.add('hidden');
        }
    });
}

export function closeModal() {
    const modal = document.getElementById('tech-modal');
    if (!modal || modal.classList.contains('hidden')) return;

    modal.classList.remove('flex');
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Clear hash cleanly without triggering page jump
    if (window.location.hash.startsWith('#case-study-') || window.location.hash.startsWith('#project-')) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    // Restore focus to triggering button
    if (activeTriggerElement && typeof activeTriggerElement.focus === 'function') {
        activeTriggerElement.focus();
        activeTriggerElement = null;
    }
}

// Attach to window for legacy inline callers if needed
if (typeof window !== 'undefined') {
    window.openCaseStudy = openCaseStudy;
    window.closeModal = closeModal;
    window.switchModalTab = switchModalTab;
}
