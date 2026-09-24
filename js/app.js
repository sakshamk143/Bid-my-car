```js
// ==========================================================================
// BID MY CAR - MAIN APPLICATION COORDINATOR (SPA CONTROLLER)
// ==========================================================================
//
// This file is responsible for starting and coordinating the frontend UI.
//
// IMPORTANT:
// - This file does NOT contain database logic.
// - This file does NOT directly talk to MySQL.
// - Backend/API communication will be introduced through the API layer later.
// - Existing UI components remain responsible for their own visual structure.
// ==========================================================================

import { auctionStore } from './state/auctionStore.js';

import { renderNavbar } from './components/navbar.js';
import { renderHero } from './components/hero.js';
import { renderLiveAuctionFloor } from './components/liveAuctionFloor.js';
import { renderInventoryGrid } from './components/inventoryGrid.js';
import { renderInstitutionalDesk } from './components/institutionalDesk.js';
import { renderHowItWorks } from './components/howItWorks.js';
import { renderFooter } from './components/footer.js';
import { renderVehicleModal } from './components/vehicleModal.js';
import { renderSellVehicleWizard } from './components/sellVehicleWizard.js';
import { renderLogisticsCalculator } from './components/logisticsCalculator.js';
import { renderAuthModal } from './components/authModal.js';


// ==========================================================================
// APPLICATION INITIALIZATION
// ==========================================================================

function initApp() {

  console.log('[Bid My Car] Initializing frontend application...');


  // ------------------------------------------------------------------------
  // MAIN UI COMPONENTS
  // ------------------------------------------------------------------------

  renderNavbar();

  renderHero();

  renderLiveAuctionFloor();

  renderInventoryGrid();

  renderInstitutionalDesk();

  renderHowItWorks();

  renderFooter();


  // ------------------------------------------------------------------------
  // MODAL / OVERLAY COMPONENTS
  //
  // These functions safely clear their containers when the modal is closed.
  // They also make sure the components are ready when the user opens them.
  // ------------------------------------------------------------------------

  renderAuthModal();

  renderVehicleModal();

  renderSellVehicleWizard();

  renderLogisticsCalculator();


  // ------------------------------------------------------------------------
  // REACTIVE STORE LISTENER
  // ------------------------------------------------------------------------
  //
  // auctionStore notifies the application whenever something changes.
  //
  // Examples:
  //
  // TICK
  //      → auction countdown changed
  //
  // BID_PLACED
  //      → a bid was placed
  //
  // OUTBID
  //      → another bidder became the highest bidder
  //
  // FILTER_CHANGE
  //      → vehicle filtering changed
  //
  // NEW_LISTING
  //      → a vehicle was added
  //
  // Later, these same events will be triggered by REAL backend data.
  // ------------------------------------------------------------------------

  auctionStore.subscribe((store, changeType) => {


    // ======================================================================
    // AUCTION TIMER UPDATE
    // ======================================================================

    if (changeType === 'TICK') {

      const cd = Math.max(
        0,
        Number(store.liveAuctionStatus?.countdown) || 0
      );


      const days = Math.floor(cd / 86400);

      const hours = Math.floor(
        (cd % 86400) / 3600
      );

      const mins = Math.floor(
        (cd % 3600) / 60
      );

      const secs = Math.floor(
        cd % 60
      );


      const pad = (number) => {
        return String(number).padStart(2, '0');
      };


      const dEl = document.getElementById(
        'arena-timer-days'
      );

      const hEl = document.getElementById(
        'arena-timer-hours'
      );

      const mEl = document.getElementById(
        'arena-timer-mins'
      );

      const sEl = document.getElementById(
        'arena-timer-secs'
      );


      if (dEl) {
        dEl.textContent = pad(days);
      }

      if (hEl) {
        hEl.textContent = pad(hours);
      }

      if (mEl) {
        mEl.textContent = pad(mins);
      }

      if (sEl) {
        sEl.textContent = pad(secs);
      }

      return;
    }


    // ======================================================================
    // LIVE AUCTION / BID CHANGES
    // ======================================================================

    if (
      changeType === 'BID_PLACED' ||
      changeType === 'OUTBID' ||
      changeType === 'LIVE_LOT_CHANGE'
    ) {

      renderLiveAuctionFloor();

      renderInventoryGrid();

      renderNavbar();

      return;
    }


    // ======================================================================
    // FILTER / WATCHLIST CHANGES
    // ======================================================================

    if (
      changeType === 'FILTER_CHANGE' ||
      changeType === 'WATCHLIST_CHANGE'
    ) {

      renderInventoryGrid();

      renderNavbar();

      return;
    }


    // ======================================================================
    // ROLE CHANGE
    // ======================================================================

    if (changeType === 'ROLE_CHANGE') {

      renderNavbar();

      renderInstitutionalDesk();

      renderInventoryGrid();

      return;
    }


    // ======================================================================
    // VEHICLE MODAL
    // ======================================================================

    if (
      changeType === 'MODAL_OPEN' ||
      changeType === 'MODAL_CLOSE'
    ) {

      renderVehicleModal();

      return;
    }


    // ======================================================================
    // NEW VEHICLE LISTING
    // ======================================================================

    if (changeType === 'NEW_LISTING') {

      renderInventoryGrid();

      renderLiveAuctionFloor();

      renderNavbar();

      return;
    }


    // ======================================================================
    // DEFAULT REFRESH
    // ======================================================================
    //
    // If a future store event is introduced and does not have its own
    // rendering rule yet, refresh the major UI sections safely.
    // ======================================================================

    renderNavbar();

    renderLiveAuctionFloor();

    renderInventoryGrid();

  });


  // ========================================================================
  // GLOBAL NAVIGATION HELPERS
  // ========================================================================

  window.scrollToLiveArena = () => {

    const arena = document.getElementById(
      'live-auction-arena'
    );

    if (arena) {

      arena.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

    }

  };


  window.scrollToSection = (sectionId) => {

    const element = document.getElementById(
      sectionId
    );

    if (element) {

      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

    }

  };


  // ========================================================================
  // PLATFORM ROLE
  // ========================================================================

  window.setPlatformRole = (role) => {

    auctionStore.setRole(role);

    showRoleToast(role);

  };


  // ========================================================================
  // SALE TYPE FILTER
  // ========================================================================

  window.setSaleFilter = (saleType) => {

    auctionStore.setFilter(
      'saleType',
      saleType
    );

    window.scrollToSection(
      'inventory-section'
    );

  };


  // ========================================================================
  // CONDITION FILTER
  // ========================================================================

  window.setConditionFilter = (condition) => {

    auctionStore.setFilter(
      'conditionType',
      condition
    );

    window.scrollToSection(
      'inventory-section'
    );

  };


  // ========================================================================
  // WATCHLIST
  // ========================================================================

  window.filterByWatchlist = () => {

    if (
      !auctionStore.watchlist ||
      auctionStore.watchlist.size === 0
    ) {

      alert(
        'Your watchlist is empty. Click the bookmark icon on any vehicle card to save it.'
      );

      return;

    }


    window.scrollToSection(
      'inventory-section'
    );

  };


  // ========================================================================
  // LUCIDE ICON INITIALIZATION
  // ========================================================================
  //
  // The UI already uses Lucide icons.
  // We keep the existing library and do not introduce another icon system.
  // ========================================================================

  if (
    window.lucide &&
    typeof window.lucide.createIcons === 'function'
  ) {

    window.lucide.createIcons();

  }


  console.log(
    '[Bid My Car] Frontend application initialized successfully.'
  );

}


// ==========================================================================
// ROLE TOAST
// ==========================================================================

function showRoleToast(role) {

  const names = {

    buyer:
      'Buyer / Retail Bidder',

    seller:
      'Individual Car Seller',

    dealer:
      'Certified Used Car Dealer',

    insurance:
      'General Insurance Salvage',

    bank:
      'Bank / NBFC Stressed Asset Recovery',

    government:
      'Government Fleet E-Auction'

  };


  const roleName =
    names[role] ||
    'Platform User';


  const toast = document.createElement('div');

  toast.className =
    'fixed bottom-6 right-6 z-50 ' +
    'bg-[#0B2235] ' +
    'border border-[#087CFF] ' +
    'text-[#F3F6F9] ' +
    'text-xs font-semibold ' +
    'px-4 py-3 rounded-2xl ' +
    'shadow-2xl flex items-center gap-2 ' +
    'animate-in slide-in-from-bottom-3 duration-200';


  toast.innerHTML = `
    <span class="w-2 h-2 rounded-full bg-[#087CFF]"></span>

    <span>
      Role View:
      <strong class="text-white">
        ${roleName}
      </strong>
    </span>
  `;


  document.body.appendChild(toast);


  setTimeout(() => {

    toast.classList.add(
      'opacity-0',
      'transition-opacity'
    );


    setTimeout(() => {

      toast.remove();

    }, 300);

  }, 2500);

}


// ==========================================================================
// START APPLICATION
// ==========================================================================
//
// DOMContentLoaded is used when the HTML is still loading.
// If the module is loaded after the DOM already exists, initialization
// happens immediately.
//
// This works across modern Chrome, Edge, Firefox, Brave and Safari.
// ==========================================================================

if (
  document.readyState === 'loading'
) {

  document.addEventListener(
    'DOMContentLoaded',
    initApp
  );

} else {

  initApp();

}
```
