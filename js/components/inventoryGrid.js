// ==========================================================================
// BID MY CAR - INVENTORY GRID & "SELL YOUR VEHICLE" BANNER (REFERENCE MATCHED)
// ==========================================================================

import { auctionStore } from '../state/auctionStore.js';
import { formatINR, formatKM, formatCountdown } from '../utils/formatters.js';
import { INDIAN_YARDS } from '../data/indianYards.js';

let currentViewMode = 'grid'; // 'grid' or 'list'

export function renderInventoryGrid(containerId = 'inventory-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const vehicles = auctionStore.getFilteredVehicles();
  const filters = auctionStore.filters;
  const watchlist = auctionStore.watchlist;

  container.innerHTML = `
    <section id="inventory-section" class="py-12 bg-[#061827] border-b border-[#163959]/60">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <!-- SECTION TITLE & CONTROLS -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-2xl sm:text-3xl font-black text-white font-heading">Featured Vehicles</h2>
              <span class="bg-[#0B2235] text-[#39A7FF] font-mono font-bold text-xs px-2.5 py-0.5 rounded-full border border-[#163959]">
                ${vehicles.length} Lots
              </span>
            </div>
            <p class="text-xs text-[#8FA5B8] mt-1">Explore verified pre-owned, salvage, and repo vehicles across India</p>
          </div>

          <!-- VIEW MODE & SORT -->
          <div class="flex items-center gap-3">
            <div class="flex items-center bg-[#0B2235] border border-[#163959] rounded-xl px-3 py-1.5 text-xs text-[#8FA5B8]">
              <span class="mr-2 uppercase text-[10px] font-bold">Sort:</span>
              <select id="inv-sort-select" onchange="window.handleSortChange(this.value)" class="bg-transparent text-white font-medium focus:outline-none cursor-pointer">
                <option value="countdown" ${filters.sortBy === 'countdown' ? 'selected' : ''}>Ending Soonest</option>
                <option value="bid_low_high" ${filters.sortBy === 'bid_low_high' ? 'selected' : ''}>Price: Low to High</option>
                <option value="bid_high_low" ${filters.sortBy === 'bid_high_low' ? 'selected' : ''}>Price: High to Low</option>
                <option value="newest" ${filters.sortBy === 'newest' ? 'selected' : ''}>Model Year</option>
              </select>
            </div>

            <div class="flex items-center bg-[#0B2235] border border-[#163959] rounded-xl p-1">
              <button 
                onclick="window.setViewMode('grid')" 
                class="p-1.5 rounded-lg transition-colors ${currentViewMode === 'grid' ? 'bg-[#087CFF] text-white shadow' : 'text-[#8FA5B8] hover:text-white'}"
                title="Grid View"
              >
                <i data-lucide="grid-3x3" class="w-4 h-4"></i>
              </button>
              <button 
                onclick="window.setViewMode('list')" 
                class="p-1.5 rounded-lg transition-colors ${currentViewMode === 'list' ? 'bg-[#087CFF] text-white shadow' : 'text-[#8FA5B8] hover:text-white'}"
                title="List View"
              >
                <i data-lucide="list" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- MAIN LAYOUT: FILTERS + VEHICLE LISTINGS -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <!-- LEFT: CLEAN FILTERS SIDEBAR (3 COLS) -->
          <div class="lg:col-span-3 space-y-4">
            <div class="bg-[#0B2235] border border-[#163959] rounded-2xl p-4 sm:p-5 shadow-lg space-y-4 text-xs sticky top-24">
              
              <div class="flex items-center justify-between pb-3 border-b border-[#163959]">
                <div class="flex items-center gap-2 text-white font-bold">
                  <i data-lucide="filter" class="w-4 h-4 text-[#39A7FF]"></i>
                  <span>Filters</span>
                </div>
                <button onclick="window.resetAllFilters()" class="text-xs text-[#39A7FF] hover:underline">
                  Clear All
                </button>
              </div>

              <!-- SALE TYPE -->
              <div>
                <label class="block font-bold text-[#8FA5B8] uppercase text-[10px] mb-1">Sale Type</label>
                <select onchange="window.setFilterValue('saleType', this.value)" class="w-full bg-[#061827] text-white rounded-xl border border-[#163959] p-2 focus:outline-none focus:border-[#087CFF] cursor-pointer">
                  <option value="all" ${filters.saleType === 'all' ? 'selected' : ''}>All Auctions</option>
                  <option value="live_now" ${filters.saleType === 'live_now' ? 'selected' : ''}>Live Now</option>
                  <option value="pure_sale" ${filters.saleType === 'pure_sale' ? 'selected' : ''}>Pure Sale (No Reserve)</option>
                  <option value="buy_it_now" ${filters.saleType === 'buy_it_now' ? 'selected' : ''}>Buy It Now</option>
                  <option value="upcoming" ${filters.saleType === 'upcoming' ? 'selected' : ''}>Upcoming</option>
                </select>
              </div>

              <!-- CONDITION TYPE -->
              <div>
                <label class="block font-bold text-[#8FA5B8] uppercase text-[10px] mb-1">Condition & Source</label>
                <select onchange="window.setFilterValue('conditionType', this.value)" class="w-full bg-[#061827] text-white rounded-xl border border-[#163959] p-2 focus:outline-none focus:border-[#087CFF] cursor-pointer">
                  <option value="all" ${filters.conditionType === 'all' ? 'selected' : ''}>All Conditions</option>
                  <option value="clean_title" ${filters.conditionType === 'clean_title' ? 'selected' : ''}>Clean Title / Pre-Owned</option>
                  <option value="insurance_salvage" ${filters.conditionType === 'insurance_salvage' ? 'selected' : ''}>Insurance Salvage</option>
                  <option value="flood_salvage" ${filters.conditionType === 'flood_salvage' ? 'selected' : ''}>Flood / Monsoon Salvage</option>
                  <option value="bank_repo" ${filters.conditionType === 'bank_repo' ? 'selected' : ''}>Bank / NBFC Repos</option>
                  <option value="govt_surplus" ${filters.conditionType === 'govt_surplus' ? 'selected' : ''}>Govt Surplus</option>
                </select>
              </div>

              <!-- AUCTION YARD -->
              <div>
                <label class="block font-bold text-[#8FA5B8] uppercase text-[10px] mb-1">Yard Location</label>
                <select onchange="window.setFilterValue('yardId', this.value)" class="w-full bg-[#061827] text-white rounded-xl border border-[#163959] p-2 focus:outline-none focus:border-[#087CFF] cursor-pointer">
                  <option value="all" ${filters.yardId === 'all' ? 'selected' : ''}>All India (8 Yards)</option>
                  ${INDIAN_YARDS.map(yard => `
                    <option value="${yard.id}" ${filters.yardId === yard.id ? 'selected' : ''}>${yard.city} (${yard.code})</option>
                  `).join('')}
                </select>
              </div>

              <!-- RUN & DRIVE -->
              <div>
                <label class="block font-bold text-[#8FA5B8] uppercase text-[10px] mb-1">Drive Status</label>
                <select onchange="window.setFilterValue('runAndDrive', this.value)" class="w-full bg-[#061827] text-white rounded-xl border border-[#163959] p-2 focus:outline-none focus:border-[#087CFF] cursor-pointer">
                  <option value="all" ${filters.runAndDrive === 'all' ? 'selected' : ''}>Any Drive Condition</option>
                  <option value="runs_and_drives" ${filters.runAndDrive === 'runs_and_drives' ? 'selected' : ''}>Runs & Drives</option>
                  <option value="engine_starts" ${filters.runAndDrive === 'engine_starts' ? 'selected' : ''}>Engine Starts Only</option>
                  <option value="non_runner" ${filters.runAndDrive === 'non_runner' ? 'selected' : ''}>Non-Runner / Tow Only</option>
                </select>
              </div>

              <!-- MAX PRICE -->
              <div class="pt-2 border-t border-[#163959]">
                <div class="flex items-center justify-between mb-1 text-[11px]">
                  <span class="text-[#8FA5B8]">Max Price</span>
                  <span class="text-white font-mono font-bold">${formatINR(filters.maxPrice, true)}</span>
                </div>
                <input 
                  type="range" 
                  min="100000" 
                  max="4000000" 
                  step="50000" 
                  value="${filters.maxPrice}" 
                  oninput="window.setFilterValue('maxPrice', Number(this.value))"
                  class="w-full accent-[#087CFF] cursor-pointer"
                />
              </div>

            </div>
          </div>

          <!-- RIGHT: VEHICLES (9 COLS) -->
          <div class="lg:col-span-9 space-y-8">
            
            ${vehicles.length === 0 ? `
              <div class="bg-[#0B2235] border border-[#163959] rounded-2xl p-12 text-center">
                <i data-lucide="car" class="w-10 h-10 text-[#8FA5B8] mx-auto mb-2"></i>
                <h4 class="text-base font-bold text-white mb-1">No Vehicles Found</h4>
                <p class="text-xs text-[#8FA5B8] mb-3">Try adjusting your filters to see more results.</p>
                <button onclick="window.resetAllFilters()" class="bg-[#087CFF] text-white text-xs font-bold px-4 py-2 rounded-xl">
                  Reset Filters
                </button>
              </div>
            ` : (currentViewMode === 'grid' ? renderFeaturedCards(vehicles, watchlist) : renderDenseList(vehicles))}

          </div>

        </div>

        <!-- "SELL YOUR VEHICLE" BANNER (EXACTLY AS IN REFERENCE IMAGE) -->
        <div class="relative bg-gradient-to-r from-[#0B2235] via-[#0E2A42] to-[#0B2235] border border-[#163959] rounded-3xl p-6 sm:p-10 overflow-hidden shadow-2xl">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div class="md:col-span-7 space-y-3 z-10">
              <h3 class="text-2xl sm:text-3xl font-black text-white font-heading">Sell Your Vehicle</h3>
              <p class="text-xs sm:text-sm text-[#8FA5B8] max-w-md">
                Reach thousands of verified buyers, certified dealers, and auto recyclers. Get the highest market bid for your vehicle.
              </p>
              
              <div class="pt-2">
                <button 
                  onclick="window.openSellVehicleModal()"
                  class="px-6 py-3 rounded-xl bg-[#087CFF] hover:bg-[#006de6] text-white font-bold text-xs shadow-lg shadow-[#087CFF]/30 transition-all flex items-center gap-2"
                >
                  <span>List Your Vehicle</span>
                  <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </button>
              </div>
            </div>

            <div class="md:col-span-5 relative flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80" 
                alt="Sell Your Car" 
                class="w-full h-44 sm:h-52 object-cover rounded-2xl filter contrast-110 opacity-90 border border-[#163959]"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  `;

  window.setFilterValue = (key, val) => {
    auctionStore.setFilter(key, val);
  };

  window.resetAllFilters = () => {
    auctionStore.resetFilters();
  };

  window.handleSortChange = (sortBy) => {
    auctionStore.setFilter('sortBy', sortBy);
  };

  window.setViewMode = (mode) => {
    currentViewMode = mode;
    renderInventoryGrid(containerId);
  };

  window.toggleWatchlistItem = (vehicleId) => {
    auctionStore.toggleWatchlist(vehicleId);
  };

  window.openLotModal = (vehicleId) => {
    auctionStore.openVehicleModal(vehicleId);
  };

  window.enterLiveRoomWithLot = (vehicleId) => {
    auctionStore.setActiveLiveLot(vehicleId);
    const arena = document.getElementById('live-auction-arena');
    if (arena) {
      arena.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// FEATURED VEHICLES CARDS (REFERENCE MATCHED)
function renderFeaturedCards(vehicles, watchlist) {
  return `
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      ${vehicles.map(v => {
        const yard = INDIAN_YARDS.find(y => y.id === v.yardId) || INDIAN_YARDS[0];
        const isWatched = watchlist.has(v.id);

        return `
          <div class="card-clean overflow-hidden flex flex-col group cursor-pointer" onclick="window.openLotModal('${v.id}')">
            
            <!-- IMAGE & BADGES (MATCHING REFERENCE) -->
            <div class="relative aspect-[16/10] bg-[#061827] overflow-hidden">
              <img src="${v.images[0]}" alt="${v.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              
              <!-- LIVE AUCTION RED PILL (FROM REFERENCE) -->
              <div class="absolute top-2.5 left-2.5">
                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EF4444] text-white shadow">
                  <span class="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  <span>Live Auction</span>
                </span>
              </div>

              <!-- WATCHLIST TOGGLE -->
              <button 
                onclick="event.stopPropagation(); window.toggleWatchlistItem('${v.id}')"
                class="absolute top-2.5 right-2.5 p-1.5 rounded-xl bg-[#061827]/70 hover:bg-[#061827] text-white border border-[#163959] transition-colors"
                title="Save Lot"
              >
                <i data-lucide="bookmark" class="w-3.5 h-3.5 ${isWatched ? 'text-[#39A7FF] fill-[#39A7FF]' : 'text-[#8FA5B8]'}"></i>
              </button>

              <!-- BOTTOM DRIVE STATUS -->
              <div class="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-semibold text-white">
                <span class="bg-[#061827]/80 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-[#163959]">
                  ${v.runAndDrive}
                </span>
                <span class="bg-[#061827]/80 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-[#163959] font-mono text-[#39A7FF]">
                  ${formatCountdown(v.auctionEndsInSeconds)}
                </span>
              </div>
            </div>

            <!-- CARD BODY (FROM REFERENCE: Title, Price, Sub-specs) -->
            <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h4 class="text-sm font-bold text-white group-hover:text-[#39A7FF] transition-colors truncate">
                  ${v.title}
                </h4>

                <div class="flex items-center justify-between mt-1.5">
                  <div class="text-base font-black font-mono text-white">
                    ${formatINR(v.currentBid)}
                  </div>
                  <span class="text-[10px] text-[#8FA5B8] line-through font-mono">
                    ${formatINR(v.estRetailValue)}
                  </span>
                </div>

                <div class="flex items-center gap-1.5 text-[11px] text-[#8FA5B8] mt-2">
                  <span>${formatKM(v.odometer)}</span>
                  <span>•</span>
                  <span>${v.fuelType}</span>
                  <span>•</span>
                  <span>${yard.city}</span>
                </div>
              </div>

              <!-- CARD ACTIONS -->
              <div class="pt-2 border-t border-[#163959]/60 flex items-center gap-2">
                <button 
                  onclick="event.stopPropagation(); window.enterLiveRoomWithLot('${v.id}')"
                  class="flex-1 py-2 rounded-xl bg-[#087CFF] hover:bg-[#006de6] text-white text-xs font-bold shadow transition-all text-center"
                >
                  Place Bid
                </button>
                <button 
                  onclick="event.stopPropagation(); window.openLotModal('${v.id}')"
                  class="px-3 py-2 rounded-xl bg-[#061827] hover:bg-[#0E2A42] text-[#8FA5B8] hover:text-white text-xs font-semibold border border-[#163959] transition-colors"
                >
                  Details
                </button>
              </div>

            </div>

          </div>
        `;
      }).join('')}
    </div>
  `;
}

// DENSE TABLE VIEW
function renderDenseList(vehicles) {
  return `
    <div class="bg-[#0B2235] border border-[#163959] rounded-2xl overflow-hidden shadow-xl">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-[#061827] text-[#8FA5B8] uppercase text-[10px] border-b border-[#163959]">
            <tr>
              <th class="py-3 px-4">Vehicle</th>
              <th class="py-3 px-4">Condition</th>
              <th class="py-3 px-4">Drive</th>
              <th class="py-3 px-4">Current Bid</th>
              <th class="py-3 px-4">Time Left</th>
              <th class="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#163959]/60">
            ${vehicles.map(v => `
              <tr class="hover:bg-[#0E2A42] transition-colors cursor-pointer" onclick="window.openLotModal('${v.id}')">
                <td class="py-3 px-4">
                  <div class="font-bold text-white">${v.title}</div>
                  <div class="text-[10px] text-[#8FA5B8]">${formatKM(v.odometer)} • ${v.fuelType}</div>
                </td>
                <td class="py-3 px-4 text-[#8FA5B8]">${v.primaryDamage}</td>
                <td class="py-3 px-4">
                  <span class="text-[10px] font-bold ${v.runAndDrive === 'Runs & Drives' ? 'text-[#10B981]' : 'text-[#F59E0B]'}">${v.runAndDrive}</span>
                </td>
                <td class="py-3 px-4 font-mono font-bold text-white">${formatINR(v.currentBid)}</td>
                <td class="py-3 px-4 font-mono text-[#39A7FF] text-[11px]">${formatCountdown(v.auctionEndsInSeconds)}</td>
                <td class="py-3 px-4 text-right" onclick="event.stopPropagation()">
                  <button onclick="window.enterLiveRoomWithLot('${v.id}')" class="px-3 py-1.5 rounded-lg bg-[#087CFF] text-white text-xs font-bold">Bid</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
