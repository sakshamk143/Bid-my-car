// ==========================================================================
// BID MY CAR - LOT DETAILS MODAL (MATCHING VEHICLE DETAILS PAGE REFERENCE)
// ==========================================================================

import { auctionStore } from '../state/auctionStore.js';
import { formatINR, formatKM, formatCountdown, calculateAuctionFees, estimateLogisticsCost } from '../utils/formatters.js';
import { INDIAN_YARDS } from '../data/indianYards.js';

let modalActiveTab = 'overview'; // 'overview', 'specs', 'inspection', 'calculator'

export function renderVehicleModal(containerId = 'modal-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const lot = auctionStore.getSelectedVehicle();
  if (!lot) {
    container.innerHTML = '';
    return;
  }

  const yard = INDIAN_YARDS.find(y => y.id === lot.yardId) || INDIAN_YARDS[0];
  const fees = calculateAuctionFees(lot.currentBid);
  const logistics = estimateLogisticsCost(lot.yardId, '110001', lot.category);

  // Time components
  const cd = lot.auctionEndsInSeconds;
  const days = Math.floor(cd / 86400);
  const hours = Math.floor((cd % 86400) / 3600);
  const mins = Math.floor((cd % 3600) / 60);
  const secs = Math.floor(cd % 60);
  const pad = (n) => String(n).padStart(2, '0');

  container.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#061827]/85 backdrop-blur-md animate-in fade-in duration-200" onclick="if(event.target === this) window.closeVehicleModal();">
      
      <div class="relative w-full max-w-5xl bg-[#0B2235] border border-[#163959] rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#F3F6F9]">
        
        <!-- TOP BREADCRUMB & HEADER -->
        <div class="bg-[#061827] px-6 py-4 border-b border-[#163959] flex items-center justify-between shrink-0">
          <div class="flex items-center gap-2 text-xs text-[#8FA5B8]">
            <span>Browse Vehicles</span>
            <span>&gt;</span>
            <span class="text-white font-bold truncate max-w-xs sm:max-w-md">${lot.title}</span>
            <span class="bg-[#0E2A42] text-[#39A7FF] font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-[#163959]">
              LOT #${lot.lotNumber}
            </span>
          </div>

          <button 
            onclick="window.closeVehicleModal()" 
            class="p-2 rounded-xl bg-[#0B2235] hover:bg-[#0E2A42] text-[#8FA5B8] hover:text-white border border-[#163959] transition-colors"
          >
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <!-- MODAL BODY -->
        <div class="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <!-- LEFT: GALLERY & SPECS (7 COLS) -->
            <div class="lg:col-span-7 space-y-4">
              
              <!-- MAIN IMAGE -->
              <div class="relative aspect-video rounded-2xl overflow-hidden bg-[#061827] border border-[#163959]">
                <img id="detail-modal-img" src="${lot.images[0]}" alt="${lot.title}" class="w-full h-full object-cover" />
                
                <div class="absolute top-3 left-3">
                  <span class="px-2.5 py-1 rounded-lg text-xs font-bold uppercase shadow ${
                    lot.runAndDrive === 'Runs & Drives' ? 'bg-[#10B981] text-[#061827]' : 'bg-[#F59E0B] text-[#061827]'
                  }">
                    ${lot.runAndDrive}
                  </span>
                </div>

                <div class="absolute bottom-3 right-3 bg-[#061827]/80 backdrop-blur-md px-3 py-1 rounded-lg border border-[#163959] text-[11px] font-mono text-[#39A7FF]">
                  150-Point Score: ${lot.inspectionScore}/10
                </div>
              </div>

              <!-- THUMBNAILS -->
              <div class="flex items-center gap-2 overflow-x-auto pb-1">
                ${lot.images.map((img, i) => `
                  <button 
                    onclick="document.getElementById('detail-modal-img').src = '${img}'"
                    class="w-16 h-12 rounded-lg overflow-hidden border border-[#163959] hover:border-[#087CFF] shrink-0 transition-colors"
                  >
                    <img src="${img}" alt="thumb" class="w-full h-full object-cover" />
                  </button>
                `).join('')}
              </div>

              <!-- SPEC ROW (Make, Model, Year, Fuel, Transmission, Location) -->
              <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs">
                <div class="bg-[#061827] p-2 rounded-xl border border-[#163959]">
                  <span class="text-[9px] text-[#8FA5B8] uppercase block">Make</span>
                  <span class="font-bold text-white truncate block mt-0.5">${lot.make}</span>
                </div>
                <div class="bg-[#061827] p-2 rounded-xl border border-[#163959]">
                  <span class="text-[9px] text-[#8FA5B8] uppercase block">Model</span>
                  <span class="font-bold text-white truncate block mt-0.5">${lot.model}</span>
                </div>
                <div class="bg-[#061827] p-2 rounded-xl border border-[#163959]">
                  <span class="text-[9px] text-[#8FA5B8] uppercase block">Year</span>
                  <span class="font-bold text-white block mt-0.5">${lot.year}</span>
                </div>
                <div class="bg-[#061827] p-2 rounded-xl border border-[#163959]">
                  <span class="text-[9px] text-[#8FA5B8] uppercase block">Fuel</span>
                  <span class="font-bold text-white block mt-0.5">${lot.fuelType}</span>
                </div>
                <div class="bg-[#061827] p-2 rounded-xl border border-[#163959]">
                  <span class="text-[9px] text-[#8FA5B8] uppercase block">Gearbox</span>
                  <span class="font-bold text-white block mt-0.5">${lot.transmission}</span>
                </div>
                <div class="bg-[#061827] p-2 rounded-xl border border-[#163959]">
                  <span class="text-[9px] text-[#8FA5B8] uppercase block">Yard</span>
                  <span class="font-bold text-[#39A7FF] truncate block mt-0.5">${yard.city}</span>
                </div>
              </div>

            </div>

            <!-- RIGHT: AUCTION COCKPIT & COUNTDOWN (5 COLS - FROM REFERENCE) -->
            <div class="lg:col-span-5 bg-[#061827] rounded-2xl p-5 border border-[#163959] flex flex-col justify-between space-y-4">
              
              <!-- COUNTDOWN BOXES -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-[10px] uppercase font-bold text-[#8FA5B8]">Auction Ends In</span>
                  <span class="inline-flex items-center gap-1 text-[10px] font-bold text-[#EF4444]">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-ping"></span>
                    <span>Live Auction</span>
                  </span>
                </div>

                <div class="grid grid-cols-4 gap-2 text-center font-mono">
                  <div class="bg-[#0B2235] border border-[#163959] rounded-xl p-2">
                    <span class="text-xl font-black text-white tabular-nums">${pad(days)}</span>
                    <span class="text-[9px] text-[#8FA5B8] block uppercase">Days</span>
                  </div>
                  <div class="bg-[#0B2235] border border-[#163959] rounded-xl p-2">
                    <span class="text-xl font-black text-white tabular-nums">${pad(hours)}</span>
                    <span class="text-[9px] text-[#8FA5B8] block uppercase">Hours</span>
                  </div>
                  <div class="bg-[#0B2235] border border-[#163959] rounded-xl p-2">
                    <span class="text-xl font-black text-white tabular-nums">${pad(mins)}</span>
                    <span class="text-[9px] text-[#8FA5B8] block uppercase">Mins</span>
                  </div>
                  <div class="bg-[#0B2235] border border-[#163959] rounded-xl p-2">
                    <span class="text-xl font-black text-[#39A7FF] tabular-nums">${pad(secs)}</span>
                    <span class="text-[9px] text-[#8FA5B8] block uppercase">Sec</span>
                  </div>
                </div>
              </div>

              <!-- CURRENT HIGHEST BID -->
              <div class="py-3 border-y border-[#163959]">
                <div class="flex items-center justify-between text-xs text-[#8FA5B8]">
                  <span>Current Highest Bid</span>
                  <span class="text-[11px] text-white">Retail: ${formatINR(lot.estRetailValue)}</span>
                </div>
                <div class="text-2xl sm:text-3xl font-black font-mono text-white mt-1">
                  ${formatINR(lot.currentBid)}
                </div>
                <div class="text-[11px] text-[#8FA5B8] mt-0.5">
                  by <strong class="text-[#F3F6F9]">${lot.currentBid === auctionStore.userBids.get(lot.id) ? 'You (Winning)' : 'Rohan Sharma'}</strong>
                </div>
              </div>

              <!-- ACTIONS -->
              <div class="space-y-2">
                <button 
                  onclick="window.enterLiveRoomWithLot('${lot.id}'); window.closeVehicleModal();"
                  class="w-full py-3 rounded-xl bg-[#087CFF] hover:bg-[#006de6] text-white font-bold text-xs shadow-lg shadow-[#087CFF]/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <i data-lucide="gavel" class="w-4 h-4"></i>
                  <span>Enter Live Bid Room</span>
                </button>

                <button 
                  onclick="window.toggleWatchlistItem('${lot.id}')"
                  class="w-full py-2.5 rounded-xl bg-[#0B2235] hover:bg-[#0E2A42] text-[#8FA5B8] hover:text-white border border-[#163959] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <i data-lucide="bookmark" class="w-3.5 h-3.5 ${auctionStore.watchlist.has(lot.id) ? 'text-[#39A7FF] fill-[#39A7FF]' : ''}"></i>
                  <span>${auctionStore.watchlist.has(lot.id) ? 'Saved in Watchlist' : 'Add to Watchlist'}</span>
                </button>
              </div>

            </div>

          </div>

          <!-- TABS SECTION -->
          <div class="bg-[#061827] rounded-2xl p-5 border border-[#163959] space-y-4">
            <div class="flex items-center space-x-6 border-b border-[#163959] text-xs font-semibold pb-3">
              <button onclick="window.switchModalTab('overview')" class="pb-1 transition-colors ${modalActiveTab === 'overview' ? 'text-[#39A7FF] border-b-2 border-[#087CFF] font-bold' : 'text-[#8FA5B8] hover:text-white'}">Overview</button>
              <button onclick="window.switchModalTab('specs')" class="pb-1 transition-colors ${modalActiveTab === 'specs' ? 'text-[#39A7FF] border-b-2 border-[#087CFF] font-bold' : 'text-[#8FA5B8] hover:text-white'}">Parivahan Title</button>
              <button onclick="window.switchModalTab('inspection')" class="pb-1 transition-colors ${modalActiveTab === 'inspection' ? 'text-[#39A7FF] border-b-2 border-[#087CFF] font-bold' : 'text-[#8FA5B8] hover:text-white'}">150-Point Report</button>
              <button onclick="window.switchModalTab('calculator')" class="pb-1 transition-colors ${modalActiveTab === 'calculator' ? 'text-[#39A7FF] border-b-2 border-[#087CFF] font-bold' : 'text-[#8FA5B8] hover:text-white'}">Landing Cost</button>
            </div>

            <div class="text-xs">
              ${modalActiveTab === 'overview' ? `
                <div class="space-y-3">
                  <p class="text-[#8FA5B8] leading-relaxed">
                    ${lot.title} inspected at ${yard.name}. Original registration: <strong class="text-white font-mono">${lot.regNo}</strong>. 
                    Primary condition tag: <strong class="text-white">${lot.primaryDamage}</strong>. Secondary tag: <strong class="text-white">${lot.secondaryDamage}</strong>.
                  </p>
                  <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[#8FA5B8] pt-2">
                    <div class="flex items-center gap-1.5"><i data-lucide="check" class="w-3.5 h-3.5 text-[#39A7FF]"></i> <span>Leather seats</span></div>
                    <div class="flex items-center gap-1.5"><i data-lucide="check" class="w-3.5 h-3.5 text-[#39A7FF]"></i> <span>Sunroof</span></div>
                    <div class="flex items-center gap-1.5"><i data-lucide="check" class="w-3.5 h-3.5 text-[#39A7FF]"></i> <span>Navigation system</span></div>
                    <div class="flex items-center gap-1.5"><i data-lucide="check" class="w-3.5 h-3.5 text-[#39A7FF]"></i> <span>Backup camera</span></div>
                    <div class="flex items-center gap-1.5"><i data-lucide="check" class="w-3.5 h-3.5 text-[#39A7FF]"></i> <span>Alloy wheels</span></div>
                    <div class="flex items-center gap-1.5"><i data-lucide="check" class="w-3.5 h-3.5 text-[#39A7FF]"></i> <span>Push button start</span></div>
                  </div>
                </div>
              ` : ''}

              ${modalActiveTab === 'specs' ? `
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div class="bg-[#0B2235] p-3 rounded-xl border border-[#163959]"><span class="text-[10px] text-[#8FA5B8] block">RC Status</span><span class="font-bold text-white">${lot.rtoDocuments.rcStatus}</span></div>
                  <div class="bg-[#0B2235] p-3 rounded-xl border border-[#163959]"><span class="text-[10px] text-[#8FA5B8] block">Inter-State NOC</span><span class="font-bold text-white">${lot.rtoDocuments.nocStatus}</span></div>
                  <div class="bg-[#0B2235] p-3 rounded-xl border border-[#163959]"><span class="text-[10px] text-[#8FA5B8] block">Hypothecation</span><span class="font-bold text-[#10B981]">${lot.rtoDocuments.hypothecation}</span></div>
                  <div class="bg-[#0B2235] p-3 rounded-xl border border-[#163959]"><span class="text-[10px] text-[#8FA5B8] block">Insurance</span><span class="font-bold text-white">${lot.rtoDocuments.insurance}</span></div>
                  <div class="bg-[#0B2235] p-3 rounded-xl border border-[#163959]"><span class="text-[10px] text-[#8FA5B8] block">PUC</span><span class="font-bold text-white">${lot.rtoDocuments.puc}</span></div>
                  <div class="bg-[#0B2235] p-3 rounded-xl border border-[#163959]"><span class="text-[10px] text-[#8FA5B8] block">Form 29/30</span><span class="font-bold text-[#10B981]">${lot.rtoDocuments.form29_30}</span></div>
                </div>
              ` : ''}

              ${modalActiveTab === 'inspection' ? `
                <div class="space-y-2">
                  ${lot.inspectionHighlights.map(item => `
                    <div class="flex items-start gap-2 bg-[#0B2235] p-2.5 rounded-xl border border-[#163959]">
                      <i data-lucide="${item.status === 'pass' ? 'check-circle' : 'alert-circle'}" class="w-4 h-4 mt-0.5 ${item.status === 'pass' ? 'text-[#10B981]' : 'text-[#F59E0B]'}"></i>
                      <div><strong class="text-white">${item.category}:</strong> <span class="text-[#8FA5B8]">${item.note}</span></div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}

              ${modalActiveTab === 'calculator' ? `
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="space-y-1.5">
                    <div class="flex justify-between text-[#8FA5B8]"><span>Hammer Price:</span><span class="font-mono text-white font-bold">${formatINR(fees.hammerPrice)}</span></div>
                    <div class="flex justify-between text-[#8FA5B8]"><span>Buyer Platform Fee:</span><span class="font-mono text-white">${formatINR(fees.buyerFee)}</span></div>
                    <div class="flex justify-between text-[#8FA5B8]"><span>Gate Pass & Loading:</span><span class="font-mono text-white">${formatINR(fees.yardLoadingFee)}</span></div>
                    <div class="flex justify-between text-[#8FA5B8]"><span>18% GST on fees:</span><span class="font-mono text-white">${formatINR(fees.gstAmount)}</span></div>
                  </div>
                  <div class="bg-[#0B2235] p-4 rounded-xl border border-[#163959] flex flex-col justify-between">
                    <div>
                      <span class="text-[10px] uppercase font-bold text-[#8FA5B8]">Total Gate Release Invoice</span>
                      <div class="text-2xl font-black font-mono text-[#39A7FF] mt-1">${formatINR(fees.totalAmount)}</div>
                    </div>
                    <div class="text-[11px] text-[#8FA5B8] mt-2 pt-2 border-t border-[#163959]">
                      Est. Towing to NCR: <strong class="text-white">${formatINR(logistics.totalTowing)}</strong>
                    </div>
                  </div>
                </div>
              ` : ''}
            </div>
          </div>

        </div>

        <!-- FOOTER -->
        <div class="bg-[#061827] px-6 py-3 border-t border-[#163959] flex items-center justify-between shrink-0">
          <span class="text-[11px] text-[#8FA5B8]">Verified Copart-Grade Lot Inspection</span>
          <button onclick="window.closeVehicleModal()" class="px-4 py-2 rounded-xl bg-[#0B2235] hover:bg-[#0E2A42] text-white text-xs font-semibold border border-[#163959]">
            Close
          </button>
        </div>

      </div>

    </div>
  `;

  window.switchModalTab = (tab) => {
    modalActiveTab = tab;
    renderVehicleModal(containerId);
  };

  window.closeVehicleModal = () => {
    auctionStore.closeVehicleModal();
  };

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
