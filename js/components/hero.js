// ==========================================================================
// BID MY CAR - HERO & 4 TRUST PILLARS (REFERENCE MATCHED)
// ==========================================================================

import { auctionStore } from '../state/auctionStore.js';

export function renderHero(containerId = 'hero-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const currentCategory = auctionStore.filters.category;

  container.innerHTML = `
    <div class="relative bg-gradient-to-b from-[#061827] via-[#081F33] to-[#061827] pt-10 pb-16 border-b border-[#163959]/50 overflow-hidden">
      
      <!-- HERO MAIN CONTAINER -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px]">
          
          <!-- LEFT CONTENT & SEARCH BAR (7 COLS) -->
          <div class="lg:col-span-7 space-y-6 z-10">
            
            <div class="space-y-3">
              <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15] font-heading">
                Buy & Bid on <br />
                <span class="text-[#39A7FF]">Used & Damaged</span> Vehicles
              </h1>
              
              <p class="text-xs sm:text-sm text-[#8FA5B8] max-w-xl font-normal leading-relaxed">
                India's trusted platform for vehicle auctions. Find great deals from verified sellers, certified dealers, banks and insurance companies.
              </p>
            </div>

            <!-- INTEGRATED SEARCH BAR (FROM REFERENCE) -->
            <div class="max-w-xl bg-[#0B2235] p-2 rounded-2xl border border-[#163959] shadow-xl">
              <form onsubmit="event.preventDefault(); window.handleHeroSearch();" class="flex items-center gap-2">
                <div class="relative flex-1">
                  <i data-lucide="search" class="w-4 h-4 text-[#8FA5B8] absolute left-3.5 top-1/2 -translate-y-1/2"></i>
                  <input 
                    type="text" 
                    id="hero-search-input"
                    value="${auctionStore.filters.search}"
                    placeholder="Search by brand, model, or keyword..."
                    class="w-full bg-transparent text-xs text-[#F3F6F9] placeholder-[#8FA5B8]/70 pl-10 pr-3 py-2.5 focus:outline-none"
                  />
                </div>
                <button 
                  type="submit"
                  class="px-6 py-2.5 rounded-xl bg-[#087CFF] hover:bg-[#006de6] text-white font-bold text-xs shadow-md shadow-[#087CFF]/30 transition-all active:scale-95"
                >
                  Search
                </button>
              </form>
            </div>

            <!-- CATEGORY FILTER PILLS (REFERENCE MATCHED: Cars, SUVs, Trucks, Motorcycles, Other) -->
            <div class="flex flex-wrap items-center gap-2 text-xs pt-1">
              ${[
                { id: 'all', label: 'All Vehicles', icon: 'layers' },
                { id: 'sedan', label: 'Cars', icon: 'car' },
                { id: 'suv', label: 'SUVs', icon: 'shield' },
                { id: 'commercial', label: 'Trucks', icon: 'truck' },
                { id: 'twowheeler', label: 'Motorcycles', icon: 'bike' },
                { id: 'luxury', label: 'Luxury', icon: 'sparkles' }
              ].map(cat => `
                <button 
                  onclick="window.setHeroCategory('${cat.id}')"
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    currentCategory === cat.id 
                      ? 'bg-[#087CFF] text-white shadow-md shadow-[#087CFF]/20 border border-[#087CFF]' 
                      : 'bg-[#0B2235] text-[#8FA5B8] hover:text-[#F3F6F9] border border-[#163959] hover:border-[#39A7FF]/40'
                  }"
                >
                  <i data-lucide="${cat.icon}" class="w-3.5 h-3.5 ${currentCategory === cat.id ? 'text-white' : 'text-[#39A7FF]'}"></i>
                  <span>${cat.label}</span>
                </button>
              `).join('')}
            </div>

          </div>

          <!-- RIGHT AUTOMOTIVE HERO DISPLAY (5 COLS) -->
          <div class="lg:col-span-5 relative flex items-center justify-center">
            <div class="relative w-full max-w-lg">
              <!-- Dark ambient glow -->
              <div class="absolute -inset-4 bg-[#087CFF]/15 rounded-3xl blur-2xl pointer-events-none"></div>
              
              <div class="relative rounded-3xl overflow-hidden border border-[#163959] shadow-2xl bg-[#0B2235]">
                <img 
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80" 
                  alt="Premier Auto Auction" 
                  class="w-full h-72 sm:h-80 object-cover filter contrast-110"
                />
                
                <!-- Overlay live badge -->
                <div class="absolute top-4 left-4 bg-[#061827]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#163959] flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#EF4444] animate-ping"></span>
                  <span class="text-[11px] font-bold text-white uppercase tracking-wider">Virtual Floor Live</span>
                </div>

                <div class="absolute bottom-4 left-4 right-4 bg-[#0B2235]/90 backdrop-blur-md p-3 rounded-2xl border border-[#163959] flex items-center justify-between">
                  <div>
                    <span class="text-[10px] text-[#8FA5B8] uppercase block">Starting from</span>
                    <span class="text-base font-black font-mono text-white">₹ 4,50,000</span>
                  </div>
                  <button 
                    onclick="window.scrollToLiveArena()" 
                    class="px-3.5 py-1.5 rounded-xl bg-[#087CFF] hover:bg-[#006de6] text-white text-xs font-bold shadow transition-all"
                  >
                    View Live Room
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- 4 TRUST FEATURE PILLARS (DIRECTLY FROM REFERENCE IMAGE) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pt-8 border-t border-[#163959]/60">
          
          <div class="bg-[#0B2235]/60 hover:bg-[#0B2235] border border-[#163959] rounded-2xl p-4 transition-all duration-200 flex items-start gap-3.5">
            <div class="w-10 h-10 rounded-xl bg-[#087CFF]/15 text-[#39A7FF] flex items-center justify-center shrink-0 border border-[#087CFF]/20">
              <i data-lucide="shield-check" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-sm font-bold text-white">Trusted Platform</h3>
              <p class="text-[11px] text-[#8FA5B8] mt-0.5 leading-snug">Verified sellers & secure transactions with Parivahan check</p>
            </div>
          </div>

          <div class="bg-[#0B2235]/60 hover:bg-[#0B2235] border border-[#163959] rounded-2xl p-4 transition-all duration-200 flex items-start gap-3.5">
            <div class="w-10 h-10 rounded-xl bg-[#087CFF]/15 text-[#39A7FF] flex items-center justify-center shrink-0 border border-[#087CFF]/20">
              <i data-lucide="activity" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-sm font-bold text-white">Live Auctions</h3>
              <p class="text-[11px] text-[#8FA5B8] mt-0.5 leading-snug">Real-time bidding & fair market pricing with gavel audio</p>
            </div>
          </div>

          <div class="bg-[#0B2235]/60 hover:bg-[#0B2235] border border-[#163959] rounded-2xl p-4 transition-all duration-200 flex items-start gap-3.5">
            <div class="w-10 h-10 rounded-xl bg-[#087CFF]/15 text-[#39A7FF] flex items-center justify-center shrink-0 border border-[#087CFF]/20">
              <i data-lucide="car" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-sm font-bold text-white">Wide Selection</h3>
              <p class="text-[11px] text-[#8FA5B8] mt-0.5 leading-snug">Cars, SUVs, commercial trucks, bikes & EVs pan-India</p>
            </div>
          </div>

          <div class="bg-[#0B2235]/60 hover:bg-[#0B2235] border border-[#163959] rounded-2xl p-4 transition-all duration-200 flex items-start gap-3.5">
            <div class="w-10 h-10 rounded-xl bg-[#087CFF]/15 text-[#39A7FF] flex items-center justify-center shrink-0 border border-[#087CFF]/20">
              <i data-lucide="check-square" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-sm font-bold text-white">Easy Process</h3>
              <p class="text-[11px] text-[#8FA5B8] mt-0.5 leading-snug">Simple digital steps from listing to gate pass ownership</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  `;

  window.handleHeroSearch = () => {
    const q = document.getElementById('hero-search-input')?.value || '';
    auctionStore.setFilter('search', q);
    window.scrollToSection('inventory-section');
  };

  window.setHeroCategory = (cat) => {
    auctionStore.setFilter('category', cat);
    window.scrollToSection('inventory-section');
  };

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
