// ==========================================================================
// BID MY CAR - LIVE AUCTION ARENA (MATCHING VEHICLE DETAILS PAGE FROM REFERENCE)
// ==========================================================================

import { auctionStore } from '../state/auctionStore.js';
import { formatINR, formatKM } from '../utils/formatters.js';
import { auctionAudio } from '../utils/audio.js';
import { INDIAN_YARDS } from '../data/indianYards.js';

let activeDetailTab = 'overview'; // 'overview', 'specs', 'inspection', 'bids'

export function renderLiveAuctionFloor(containerId = 'live-auction-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const lot = auctionStore.getActiveLiveVehicle();
  const status = auctionStore.liveAuctionStatus;
  const yard = INDIAN_YARDS.find(y => y.id === lot.yardId) || INDIAN_YARDS[0];
  const isUserHigh = status.isUserHighBidder;
  const isSold = status.hammerStatus === 'SOLD!';

  // Calculate days, hours, mins, seconds from status.countdown
  const totalSecs = status.countdown;
  const days = Math.floor(totalSecs / 86400);
  const hours = Math.floor((totalSecs % 86400) / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  const secs = Math.floor(totalSecs % 60);

  const pad = (n) => String(n).padStart(2, '0');

  container.innerHTML = `
    <section id="live-auction-arena" class="py-12 bg-[#061827] border-b border-[#163959]/60">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- BREADCRUMB (FROM REFERENCE) -->
        <div class="flex items-center gap-2 text-xs text-[#8FA5B8] mb-6">
          <a href="#" onclick="event.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'});" class="hover:text-white transition-colors">Home</a>
          <span>&gt;</span>
          <a href="#inventory-section" onclick="window.scrollToSection('inventory-section');" class="hover:text-white transition-colors">Browse Vehicles</a>
          <span>&gt;</span>
          <span class="text-white font-semibold truncate">${lot.title}</span>
        </div>

        <!-- MAIN TWO-COLUMN VEHICLE DETAILS LAYOUT (EXACTLY AS IN REFERENCE) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <!-- LEFT / CENTER: VEHICLE PHOTO, SPECS & TABS (8 COLS) -->
          <div class="lg:col-span-8 space-y-6">
            
            <!-- MAIN VEHICLE IMAGE & THUMBNAILS -->
            <div class="bg-[#0B2235] border border-[#163959] rounded-2xl overflow-hidden p-4 space-y-3">
              <div class="relative aspect-video rounded-xl overflow-hidden bg-[#061827]">
                <img 
                  id="arena-hero-image"
                  src="${lot.images[0]}" 
                  alt="${lot.title}" 
                  class="w-full h-full object-cover"
                />
                
                <!-- RUN & DRIVE COPARD BADGE -->
                <div class="absolute top-3 left-3 flex gap-2">
                  <span class="px-2.5 py-1 rounded-lg text-xs font-bold shadow-md uppercase tracking-wider ${
                    lot.runAndDrive === 'Runs & Drives' 
                      ? 'bg-[#10B981] text-[#061827]' 
                      : (lot.runAndDrive === 'Engine Starts Only' ? 'bg-[#F59E0B] text-[#061827]' : 'bg-[#EF4444] text-white')
                  }">
                    ${lot.runAndDrive}
                  </span>
                </div>

                <!-- ENGINE AUDIO CHECK BUTTON -->
                <button 
                  onclick="window.testEngineSound()"
                  class="absolute bottom-3 left-3 bg-[#061827]/80 hover:bg-[#061827] backdrop-blur-md border border-[#163959] text-[#39A7FF] text-xs font-semibold px-3 py-1.5 rounded-xl shadow flex items-center gap-1.5 transition-all"
                  title="Simulate engine ignition audio"
                >
                  <i data-lucide="volume-2" class="w-3.5 h-3.5 text-[#087CFF]"></i>
                  <span>Engine Sound Check</span>
                </button>
              </div>

              <!-- THUMBNAILS ROW (FROM REFERENCE) -->
              <div class="flex items-center gap-2.5 overflow-x-auto pb-1">
                ${lot.images.map((img, idx) => `
                  <button 
                    onclick="document.getElementById('arena-hero-image').src = '${img}'"
                    class="w-20 h-14 rounded-lg overflow-hidden border border-[#163959] hover:border-[#087CFF] shrink-0 transition-colors focus:border-[#087CFF]"
                  >
                    <img src="${img}" alt="Thumbnail ${idx + 1}" class="w-full h-full object-cover" />
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- VEHICLE TITLE & SPECS GRID (EXACTLY AS IN REFERENCE) -->
            <div class="bg-[#0B2235] border border-[#163959] rounded-2xl p-5 space-y-4">
              
              <!-- TITLE, PRICE & LIVE TAG ROW -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#163959]">
                <div>
                  <h2 class="text-2xl font-black text-white font-heading">${lot.title}</h2>
                  <div class="flex items-center gap-3 mt-1">
                    <span class="text-2xl font-black font-mono text-white">${formatINR(status.currentHighBid)}</span>
                    <span class="text-xs text-[#8FA5B8]">Est. Retail: <span class="line-through">${formatINR(lot.estRetailValue)}</span></span>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EF4444]/15 border border-[#EF4444]/30 text-xs font-bold text-[#EF4444]">
                    <span class="w-2 h-2 rounded-full bg-[#EF4444] animate-ping"></span>
                    <span>Live Auction</span>
                  </span>
                </div>
              </div>

              <!-- 6-ICON SPEC GRID (FROM REFERENCE: Make, Model, Year, Fuel, Transmission, Location) -->
              <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                <div class="bg-[#061827] p-2.5 rounded-xl border border-[#163959]">
                  <span class="text-[10px] text-[#8FA5B8] uppercase block">Make</span>
                  <span class="font-bold text-white truncate block mt-0.5">${lot.make}</span>
                </div>
                <div class="bg-[#061827] p-2.5 rounded-xl border border-[#163959]">
                  <span class="text-[10px] text-[#8FA5B8] uppercase block">Model</span>
                  <span class="font-bold text-white truncate block mt-0.5">${lot.model}</span>
                </div>
                <div class="bg-[#061827] p-2.5 rounded-xl border border-[#163959]">
                  <span class="text-[10px] text-[#8FA5B8] uppercase block">Year</span>
                  <span class="font-bold text-white block mt-0.5">${lot.year}</span>
                </div>
                <div class="bg-[#061827] p-2.5 rounded-xl border border-[#163959]">
                  <span class="text-[10px] text-[#8FA5B8] uppercase block">Fuel Type</span>
                  <span class="font-bold text-white block mt-0.5">${lot.fuelType}</span>
                </div>
                <div class="bg-[#061827] p-2.5 rounded-xl border border-[#163959]">
                  <span class="text-[10px] text-[#8FA5B8] uppercase block">Transmission</span>
                  <span class="font-bold text-white block mt-0.5">${lot.transmission}</span>
                </div>
                <div class="bg-[#061827] p-2.5 rounded-xl border border-[#163959]">
                  <span class="text-[10px] text-[#8FA5B8] uppercase block">Location</span>
                  <span class="font-bold text-[#39A7FF] truncate block mt-0.5">${yard.city}</span>
                </div>
              </div>

            </div>

            <!-- TABS SECTION (FROM REFERENCE: Overview, Specifications, 150-Point, Bid History) -->
            <div class="bg-[#0B2235] border border-[#163959] rounded-2xl p-5 space-y-4">
              <div class="flex items-center space-x-6 border-b border-[#163959] text-xs font-semibold pb-3">
                <button 
                  onclick="window.switchArenaTab('overview')" 
                  class="pb-1 transition-colors ${activeDetailTab === 'overview' ? 'text-[#39A7FF] border-b-2 border-[#087CFF] font-bold' : 'text-[#8FA5B8] hover:text-white'}"
                >
                  Overview
                </button>
                <button 
                  onclick="window.switchArenaTab('specs')" 
                  class="pb-1 transition-colors ${activeDetailTab === 'specs' ? 'text-[#39A7FF] border-b-2 border-[#087CFF] font-bold' : 'text-[#8FA5B8] hover:text-white'}"
                >
                  Specifications
                </button>
                <button 
                  onclick="window.switchArenaTab('inspection')" 
                  class="pb-1 transition-colors ${activeDetailTab === 'inspection' ? 'text-[#39A7FF] border-b-2 border-[#087CFF] font-bold' : 'text-[#8FA5B8] hover:text-white'}"
                >
                  150-Point Inspection
                </button>
                <button 
                  onclick="window.switchArenaTab('bids')" 
                  class="pb-1 transition-colors ${activeDetailTab === 'bids' ? 'text-[#39A7FF] border-b-2 border-[#087CFF] font-bold' : 'text-[#8FA5B8] hover:text-white'}"
                >
                  Bid History (${status.bidHistory.length})
                </button>
              </div>

              <!-- TAB BODY -->
              <div class="text-xs pt-1">
                ${activeDetailTab === 'overview' ? `
                  <div class="space-y-4">
                    <div>
                      <h4 class="font-bold text-white text-sm mb-1.5">Vehicle Overview</h4>
                      <p class="text-[#8FA5B8] leading-relaxed">
                        The ${lot.title} is registered at ${lot.rtoLocation} with valid Parivahan paperwork. 
                        Engine displacement is ${lot.engineCc || lot.fuelType}, currently showing ${formatKM(lot.odometer)} on the original digital odometer. 
                        Primary damage classification: <strong class="text-[#F3F6F9]">${lot.primaryDamage}</strong>. Keys condition: <strong class="text-[#10B981]">${lot.keys}</strong>.
                      </p>
                    </div>

                    <!-- KEY FEATURES CHECKLIST (FROM REFERENCE) -->
                    <div>
                      <h5 class="font-bold text-white text-xs mb-2">Key Features</h5>
                      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        <div class="flex items-center gap-1.5 text-[#8FA5B8]"><i data-lucide="check" class="w-3.5 h-3.5 text-[#39A7FF]"></i> <span>Leather seats</span></div>
                        <div class="flex items-center gap-1.5 text-[#8FA5B8]"><i data-lucide="check" class="w-3.5 h-3.5 text-[#39A7FF]"></i> <span>Sunroof / Moonroof</span></div>
                        <div class="flex items-center gap-1.5 text-[#8FA5B8]"><i data-lucide="check" class="w-3.5 h-3.5 text-[#39A7FF]"></i> <span>Navigation & ADAS</span></div>
                        <div class="flex items-center gap-1.5 text-[#8FA5B8]"><i data-lucide="check" class="w-3.5 h-3.5 text-[#39A7FF]"></i> <span>Backup camera & 360</span></div>
                        <div class="flex items-center gap-1.5 text-[#8FA5B8]"><i data-lucide="check" class="w-3.5 h-3.5 text-[#39A7FF]"></i> <span>Alloy wheels</span></div>
                        <div class="flex items-center gap-1.5 text-[#8FA5B8]"><i data-lucide="check" class="w-3.5 h-3.5 text-[#39A7FF]"></i> <span>Touchscreen Infotainment</span></div>
                      </div>
                    </div>
                  </div>
                ` : ''}

                ${activeDetailTab === 'specs' ? `
                  <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div class="bg-[#061827] p-2.5 rounded-xl border border-[#163959]"><span class="text-[10px] text-[#8FA5B8] block">VIN</span><span class="font-mono text-white font-bold">${lot.vin}</span></div>
                    <div class="bg-[#061827] p-2.5 rounded-xl border border-[#163959]"><span class="text-[10px] text-[#8FA5B8] block">Reg No</span><span class="font-mono text-white font-bold">${lot.regNo}</span></div>
                    <div class="bg-[#061827] p-2.5 rounded-xl border border-[#163959]"><span class="text-[10px] text-[#8FA5B8] block">Ownership</span><span class="text-white font-semibold">${lot.ownership}</span></div>
                    <div class="bg-[#061827] p-2.5 rounded-xl border border-[#163959]"><span class="text-[10px] text-[#8FA5B8] block">Yard Address</span><span class="text-white truncate block">${yard.address}</span></div>
                    <div class="bg-[#061827] p-2.5 rounded-xl border border-[#163959]"><span class="text-[10px] text-[#8FA5B8] block">Starting Bid</span><span class="font-mono text-white">${formatINR(lot.startingBid)}</span></div>
                    <div class="bg-[#061827] p-2.5 rounded-xl border border-[#163959]"><span class="text-[10px] text-[#8FA5B8] block">Reserve Status</span><span class="font-semibold ${lot.reserveMet ? 'text-[#10B981]' : 'text-[#F59E0B]'}">${lot.reserveMet ? 'Met' : 'Not Met'}</span></div>
                  </div>
                ` : ''}

                ${activeDetailTab === 'inspection' ? `
                  <div class="space-y-2">
                    ${lot.inspectionHighlights.map(item => `
                      <div class="flex items-start gap-2 bg-[#061827] p-2.5 rounded-xl border border-[#163959]">
                        <i data-lucide="${item.status === 'pass' ? 'check-circle-2' : (item.status === 'warning' ? 'alert-circle' : 'x-circle')}" class="w-4 h-4 mt-0.5 ${item.status === 'pass' ? 'text-[#10B981]' : (item.status === 'warning' ? 'text-[#F59E0B]' : 'text-[#EF4444]')}"></i>
                        <div>
                          <span class="font-bold text-white">${item.category}: </span>
                          <span class="text-[#8FA5B8]">${item.note}</span>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                ` : ''}

                ${activeDetailTab === 'bids' ? `
                  <div class="space-y-1.5 max-h-48 overflow-y-auto">
                    ${status.bidHistory.map((item, i) => `
                      <div class="flex items-center justify-between p-2 rounded-lg bg-[#061827] border border-[#163959] text-xs">
                        <span class="text-white font-medium">${item.bidder}</span>
                        <span class="font-mono font-bold text-[#39A7FF]">${formatINR(item.amount)}</span>
                        <span class="text-[11px] text-[#8FA5B8] font-mono">${item.time}</span>
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
            </div>

          </div>

          <!-- RIGHT COLUMN: AUCTION CONTROLLER & BID HISTORY (4 COLS - FROM REFERENCE) -->
          <div class="lg:col-span-4 space-y-5">
            
            <!-- AUCTION CARD WITH SEGMENTED COUNTDOWN (MATCHING REFERENCE) -->
            <div class="bg-[#0B2235] border border-[#163959] rounded-2xl p-5 shadow-xl space-y-4">
              
              <!-- AUCTION ENDS IN -->
              <div>
                <span class="text-[11px] font-bold text-[#8FA5B8] uppercase tracking-wider block mb-2">Auction Ends In</span>
                
                <div class="grid grid-cols-4 gap-2 text-center font-mono">
                  <div class="bg-[#061827] border border-[#163959] rounded-xl p-2">
                    <span id="arena-timer-days" class="text-xl sm:text-2xl font-black text-white tabular-nums">${pad(days)}</span>
                    <span class="text-[9px] text-[#8FA5B8] block uppercase">Days</span>
                  </div>
                  <div class="bg-[#061827] border border-[#163959] rounded-xl p-2">
                    <span id="arena-timer-hours" class="text-xl sm:text-2xl font-black text-white tabular-nums">${pad(hours)}</span>
                    <span class="text-[9px] text-[#8FA5B8] block uppercase">Hours</span>
                  </div>
                  <div class="bg-[#061827] border border-[#163959] rounded-xl p-2">
                    <span id="arena-timer-mins" class="text-xl sm:text-2xl font-black text-white tabular-nums">${pad(mins)}</span>
                    <span class="text-[9px] text-[#8FA5B8] block uppercase">Mins</span>
                  </div>
                  <div class="bg-[#061827] border border-[#163959] rounded-xl p-2">
                    <span id="arena-timer-secs" class="text-xl sm:text-2xl font-black text-[#39A7FF] tabular-nums">${pad(secs)}</span>
                    <span class="text-[9px] text-[#8FA5B8] block uppercase">Sec</span>
                  </div>
                </div>
              </div>

              <!-- CURRENT HIGHEST BID -->
              <div class="pt-3 border-t border-[#163959]">
                <div class="flex items-center justify-between text-xs text-[#8FA5B8]">
                  <span>Current Highest Bid</span>
                  <span class="w-2 h-2 rounded-full bg-[#10B981]"></span>
                </div>
                
                <div class="text-2xl sm:text-3xl font-black font-mono text-white mt-1">
                  ${formatINR(status.currentHighBid)}
                </div>
                
                <div class="text-xs text-[#8FA5B8] mt-0.5">
                  by <strong class="text-[#F3F6F9]">${status.highBidder}</strong>
                </div>
              </div>

              <!-- BID INPUT & PLACE BID BUTTON (FROM REFERENCE) -->
              <div class="space-y-2 pt-2">
                <label class="block text-[10px] uppercase font-bold text-[#8FA5B8]">Enter your bid amount</label>
                <div class="relative">
                  <input 
                    type="text" 
                    id="arena-bid-input"
                    value="${formatINR(status.currentHighBid + 5000)}" 
                    readonly
                    class="w-full bg-[#061827] border border-[#163959] rounded-xl py-2.5 px-3 font-mono font-bold text-white text-sm focus:outline-none"
                  />
                </div>

                <!-- QUICK INCREMENTS -->
                <div class="grid grid-cols-3 gap-1.5">
                  <button onclick="window.placeBidIncrement(2000)" class="py-1.5 rounded-lg bg-[#061827] hover:bg-[#0E2A42] border border-[#163959] text-[11px] font-mono text-[#39A7FF] font-semibold transition-colors">+₹2,000</button>
                  <button onclick="window.placeBidIncrement(5000)" class="py-1.5 rounded-lg bg-[#061827] hover:bg-[#0E2A42] border border-[#163959] text-[11px] font-mono text-[#39A7FF] font-semibold transition-colors">+₹5,000</button>
                  <button onclick="window.placeBidIncrement(10000)" class="py-1.5 rounded-lg bg-[#061827] hover:bg-[#0E2A42] border border-[#163959] text-[11px] font-mono text-[#39A7FF] font-semibold transition-colors">+₹10,000</button>
                </div>

                <!-- MAIN PLACE BID BUTTON -->
                <button 
                  onclick="window.placeBidIncrement(5000)"
                  ${isSold ? 'disabled' : ''}
                  class="w-full py-3 rounded-xl bg-[#087CFF] hover:bg-[#006de6] disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#087CFF]/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <i data-lucide="gavel" class="w-4 h-4"></i>
                  <span>${isSold ? 'AUCTION CONCLUDED' : 'Place Bid'}</span>
                </button>
              </div>

            </div>

            <!-- BID HISTORY TABLE (EXACTLY AS IN REFERENCE) -->
            <div class="bg-[#0B2235] border border-[#163959] rounded-2xl p-4 shadow-xl">
              <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#163959] text-xs">
                <span class="font-bold text-white">Bid History</span>
                <span class="text-[#8FA5B8] text-[10px]">Real-Time</span>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                  <thead class="text-[10px] text-[#8FA5B8] uppercase">
                    <tr>
                      <th class="pb-2">User</th>
                      <th class="pb-2">Bid Amount</th>
                      <th class="pb-2 text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#163959]/50 text-xs">
                    ${status.bidHistory.map((b, i) => `
                      <tr class="${b.isUser ? 'text-[#10B981] font-bold' : 'text-[#F3F6F9]'}">
                        <td class="py-2 flex items-center gap-1.5">
                          <i data-lucide="user" class="w-3 h-3 text-[#8FA5B8]"></i>
                          <span class="truncate max-w-[100px]">${b.bidder}</span>
                        </td>
                        <td class="py-2 font-mono font-semibold">${formatINR(b.amount)}</td>
                        <td class="py-2 text-right text-[10px] text-[#8FA5B8] font-mono">${b.time}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  `;

  window.switchArenaTab = (tabKey) => {
    activeDetailTab = tabKey;
    renderLiveAuctionFloor(containerId);
  };

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
