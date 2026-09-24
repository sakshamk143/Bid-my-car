```js
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

function initApp() {
  console.log('[Bid My Car] Initializing Reference-Matched UI...');

  // Render All Components
  renderNavbar();
  renderHero();
  renderLiveAuctionFloor();
  renderInventoryGrid();
  renderInstitutionalDesk();
  renderHowItWorks();
  renderFooter();
  renderAuthModal();

  // Reactive state subscriber
  auctionStore.subscribe((store, changeType) => {
    if (changeType === 'TICK') {
      const cd = store.liveAuctionStatus.countdown;
      const days = Math.floor(cd / 86400);
      const hours = Math.floor((cd % 86400) / 3600);
      const mins = Math.floor((cd % 3600) / 60);
      const secs = Math.floor(cd % 60);
      const pad = (n) => String(n).padStart(2, '0');

      const dEl = document.getElementById('arena-timer-days');
      const hEl = document.getElementById('arena-timer-hours');
      const mEl = document.getElementById('arena-timer-mins');
      const sEl = document.getElementById('arena-timer-secs');

      if (dEl) dEl.textContent = pad(days);
      if (hEl) hEl.textContent = pad(hours);
      if (mEl) mEl.textContent = pad(mins);
      if (sEl) sEl.textContent = pad(secs);

    } else if (
      changeType === 'BID_PLACED' ||
      changeType === 'OUTBID' ||
      changeType === 'LIVE_LOT_CHANGE'
    ) {

      renderLiveAuctionFloor();
      renderInventoryGrid();
      renderNavbar();

    } else if (
      changeType === 'FILTER_CHANGE' ||
      changeType === 'WATCHLIST_CHANGE'
    ) {

      renderInventoryGrid();
      renderNavbar();

    } else if (changeType === 'ROLE_CHANGE') {

      renderNavbar();
      renderInstitutionalDesk();
      renderInventoryGrid();

    } else if (
      changeType === 'MODAL_OPEN' ||
      changeType === 'MODAL_CLOSE'
    ) {

      renderVehicleModal();

    } else if (changeType === 'NEW_LISTING') {

      renderInventoryGrid();
      renderLiveAuctionFloor();
      renderNavbar();

    } else {

      renderNavbar();
      renderLiveAuctionFloor();
      renderInventoryGrid();

    }
  });

  // Global Navigation
  window.scrollToLiveArena = () => {
    const arena = document.getElementById('live-auction-arena');

    if (arena) {
      arena.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  window.scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);

    if (el) {
      el.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  window.setPlatformRole = (role) => {
    auctionStore.setRole(role);
    showRoleToast(role);
  };

  window.setSaleFilter = (saleType) => {
    auctionStore.setFilter('saleType', saleType);
    window.scrollToSection('inventory-section');
  };

  window.setConditionFilter = (cond) => {
    auctionStore.setFilter('conditionType', cond);
    window.scrollToSection('inventory-section');
  };

  window.filterByWatchlist = () => {
    if (auctionStore.watchlist.size === 0) {
      alert(
        'Your watchlist is empty. Click the bookmark icon on any vehicle card to save it.'
      );
      return;
    }

    window.scrollToSection('inventory-section');
  };

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function showRoleToast(role) {
  const names = {
    buyer: 'Buyer / Retail Bidder',
    seller: 'Individual Car Seller',
    dealer: 'Certified Used Car Dealer',
    insurance: 'General Insurance Salvage',
    bank: 'Bank / NBFC Stressed Asset Recovery',
    government: 'Government Fleet E-Auction'
  };

  const toast = document.createElement('div');

  toast.className =
    'fixed bottom-6 right-6 z-50 bg-[#0B2235] border border-[#087CFF] text-[#F3F6F9] text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-200';

  toast.innerHTML = `
    <span class="w-2 h-2 rounded-full bg-[#087CFF]"></span>
    <span>
      Role View:
      <strong class="text-white">${names[role]}</strong>
    </span>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add(
      'opacity-0',
      'transition-opacity'
    );

    setTimeout(() => toast.remove(), 300);

  }, 2500);
}

if (document.readyState === 'loading') {

  document.addEventListener(
    'DOMContentLoaded',
    initApp
  );

} else {

  initApp();

}
```
