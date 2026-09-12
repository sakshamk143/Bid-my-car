// ==========================================================================
// BID MY CAR - NAVBAR & TOP TICKER COMPONENT (REFERENCE MATCHED)
// ==========================================================================

import { auctionStore } from '../state/auctionStore.js';
import { INDIAN_YARDS } from '../data/indianYards.js';
import { openAuthModal } from './authModal.js';

export function renderNavbar(containerId = 'navbar-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const currentRole = auctionStore.currentRole;
  const watchlistCount = auctionStore.watchlist.size;
  const currentYardId = auctionStore.filters.yardId;

  const roleLabels = {
    buyer: { label: 'Buyer', icon: 'user-check' },
    seller: { label: 'Individual Seller', icon: 'tag' },
    dealer: { label: 'Dealer (Wholesale)', icon: 'briefcase' },
    insurance: { label: 'Insurance (Salvage)', icon: 'shield-alert' },
    bank: { label: 'Bank (Repo)', icon: 'landmark' },
    government: { label: 'Govt (Surplus)', icon: 'building-2' }
  };

  const currentRoleMeta = roleLabels[currentRole] || roleLabels.buyer;

  container.innerHTML = `
    <!-- TOP LIVE ANNOUNCEMENT TICKER -->
    <div class="bg-[#040F19] border-b border-[#163959]/60 text-xs py-1.5 px-4 font-mono text-[#8FA5B8]">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center space-x-2 text-[#39A7FF] font-semibold shrink-0 pr-4">
          <span class="inline-block w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>
          <span>LIVE AUCTIONS:</span>
        </div>
        <div class="ticker-wrap w-full overflow-hidden">
          <div class="ticker-move text-[#8FA5B8] space-x-8">
            <span class="inline-flex items-center">
              <span class="text-[#F3F6F9] font-bold mr-1">LOT 108291:</span> 2023 Mahindra XUV700 AX7L • High Bid: <strong class="text-[#10B981] ml-1">₹16,80,000</strong> (Mumbai Hub)
            </span>
            <span class="inline-flex items-center">
              <span class="text-[#39A7FF] font-bold mr-1">LOT 108292:</span> 2022 Tata Nexon EV Salvage • Reserve Met at <strong class="text-[#10B981] ml-1">₹6,85,000</strong> (Delhi Yard)
            </span>
            <span class="inline-flex items-center">
              <span class="text-[#F3F6F9] font-bold mr-1">BANK REPO:</span> 14 New Commercial Pickups Added from SBI & Kotak Prime
            </span>
            <span class="inline-flex items-center">
              <span class="text-[#39A7FF] font-bold mr-1">PARIVAHAN READY:</span> Digital Form 29/30 & Inter-State NOC Assistance Available
            </span>
          </div>
        </div>
        <div class="hidden md:flex items-center space-x-4 pl-4 shrink-0 text-[#8FA5B8]">
          <span class="flex items-center gap-1 hover:text-[#39A7FF] cursor-pointer">
            <i data-lucide="phone" class="w-3.5 h-3.5 text-[#087CFF]"></i>
            <span>1800-209-4040</span>
          </span>
        </div>
      </div>
    </div>

    <!-- MAIN HEADER NAVIGATION -->
    <header class="bg-[#061827]/95 backdrop-blur-md sticky top-0 z-40 border-b border-[#163959]/70">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-18 py-3">
          
          <!-- BRAND LOGO -->
          <div class="flex items-center gap-8">
            <a href="#" class="flex items-center gap-2.5 group" onclick="event.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'});">
              <div class="w-9 h-9 rounded-xl bg-[#087CFF] flex items-center justify-center shadow-md shadow-[#087CFF]/30 group-hover:scale-105 transition-transform">
                <i data-lucide="gavel" class="w-5 h-5 text-white"></i>
              </div>
              <div class="flex flex-col">
                <span class="text-xl font-black tracking-tight text-white font-heading">Bid My Car</span>
                <span class="text-[9px] text-[#8FA5B8] -mt-1 tracking-wider uppercase font-semibold">Online Auto Auction</span>
              </div>
            </a>

            <!-- NAV LINKS (MATCHING REFERENCE: Home, Browse Vehicles, Auctions, Sell, About) -->
            <nav class="hidden lg:flex items-center space-x-6 text-xs font-semibold text-[#8FA5B8]">
              <a href="#" onclick="event.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'});" class="text-white hover:text-[#39A7FF] transition-colors">Home</a>
              <a href="#inventory-section" onclick="window.scrollToSection('inventory-section');" class="hover:text-white transition-colors">Browse Vehicles</a>
              <a href="#live-auction-arena" onclick="window.scrollToLiveArena();" class="hover:text-white transition-colors flex items-center gap-1">
                <span>Auctions</span>
                <span class="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-pulse"></span>
              </a>
              <a href="#" onclick="event.preventDefault(); window.openSellVehicleModal();" class="hover:text-white transition-colors">Sell</a>
              <a href="#institutional-section" onclick="window.scrollToSection('institutional-section');" class="hover:text-white transition-colors">Institutional</a>
              <a href="#how-it-works" onclick="window.scrollToSection('how-it-works');" class="hover:text-white transition-colors">About</a>
            </nav>
          </div>

          <!-- RIGHT ACTIONS & AUTH BUTTONS -->
          <div class="flex items-center gap-3">
            
            <!-- YARD HUB DROPDOWN -->
            <div class="hidden xl:flex items-center bg-[#0B2235] border border-[#163959] rounded-xl px-2.5 py-1.5 text-xs text-[#8FA5B8]">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#39A7FF] mr-1.5 shrink-0"></i>
              <select id="navbar-yard-select" class="bg-transparent text-[#F3F6F9] text-xs font-medium focus:outline-none cursor-pointer pr-1">
                <option value="all" ${currentYardId === 'all' ? 'selected' : ''}>All 8 Indian Yards</option>
                ${INDIAN_YARDS.map(yard => `
                  <option value="${yard.id}" ${currentYardId === yard.id ? 'selected' : ''}>${yard.city} (${yard.code})</option>
                `).join('')}
              </select>
            </div>

            <!-- ROLE SWITCHER PILL -->
            <div class="relative">
              <button 
                id="role-switcher-btn"
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B2235] border border-[#163959] hover:border-[#39A7FF]/50 text-xs text-[#F3F6F9] transition-all"
                title="Switch Persona"
              >
                <i data-lucide="${currentRoleMeta.icon}" class="w-3.5 h-3.5 text-[#39A7FF]"></i>
                <span class="text-[11px] font-semibold">${currentRoleMeta.label}</span>
                <i data-lucide="chevron-down" class="w-3 h-3 text-[#8FA5B8]"></i>
              </button>

              <div id="role-menu" class="hidden absolute right-0 mt-2 w-56 bg-[#0B2235] border border-[#163959] rounded-2xl shadow-2xl p-2 z-50">
                <div class="px-3 py-1.5 text-[10px] font-bold uppercase text-[#8FA5B8] border-b border-[#163959]/60">
                  Switch Persona
                </div>
                <div class="space-y-1 mt-1">
                  ${Object.entries(roleLabels).map(([roleKey, meta]) => `
                    <button 
                      class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-all ${currentRole === roleKey ? 'bg-[#087CFF] text-white font-bold' : 'text-[#8FA5B8] hover:bg-[#0E2A42] hover:text-white'}"
                      onclick="window.setPlatformRole('${roleKey}')"
                    >
                      <div class="flex items-center gap-2">
                        <i data-lucide="${meta.icon}" class="w-3.5 h-3.5"></i>
                        <span>${meta.label}</span>
                      </div>
                      ${currentRole === roleKey ? '<i data-lucide="check" class="w-3.5 h-3.5"></i>' : ''}
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- WATCHLIST -->
            <button 
              id="nav-watchlist-btn"
              onclick="window.filterByWatchlist()"
              class="relative p-2 rounded-xl bg-[#0B2235] text-[#8FA5B8] hover:text-white border border-[#163959] transition-colors"
              title="Watchlist"
            >
              <i data-lucide="bookmark" class="w-4 h-4 ${watchlistCount > 0 ? 'text-[#39A7FF] fill-[#39A7FF]/30' : ''}"></i>
              ${watchlistCount > 0 ? `
                <span class="absolute -top-1 -right-1 w-4 h-4 bg-[#087CFF] text-white font-black text-[9px] rounded-full flex items-center justify-center">
                  ${watchlistCount}
                </span>
              ` : ''}
            </button>

            <!-- AUTH BUTTONS (REFERENCE MATCHED: Login & Sign Up) -->
            <button 
              onclick="window.openAuthModal('login')"
              class="hidden sm:inline-flex px-3.5 py-2 text-xs font-semibold text-[#F3F6F9] hover:text-white transition-colors"
            >
              Login
            </button>

            <button 
              onclick="window.openAuthModal('register')"
              class="px-4 py-2 rounded-xl bg-[#087CFF] hover:bg-[#006de6] text-white font-bold text-xs shadow-md shadow-[#087CFF]/30 hover:shadow-[#087CFF]/50 transition-all active:scale-95"
            >
              Sign Up
            </button>

          </div>
        </div>
      </div>
    </header>
  `;

  // Attach navbar events
  const yardSelect = document.getElementById('navbar-yard-select');
  if (yardSelect) {
    yardSelect.addEventListener('change', (e) => {
      auctionStore.setFilter('yardId', e.target.value);
    });
  }

  const roleBtn = document.getElementById('role-switcher-btn');
  const roleMenu = document.getElementById('role-menu');
  if (roleBtn && roleMenu) {
    roleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      roleMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!roleBtn.contains(e.target) && !roleMenu.contains(e.target)) {
        roleMenu.classList.add('hidden');
      }
    });
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
