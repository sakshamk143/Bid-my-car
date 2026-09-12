// ==========================================================================
// BID MY CAR - LOGISTICS CALCULATOR (CLEAN PALETTE MATCHED)
// ==========================================================================

import { INDIAN_YARDS } from '../data/indianYards.js';
import { formatINR, estimateLogisticsCost } from '../utils/formatters.js';

let isLogisticsOpen = false;
let selectedYardId = 'yard-del-manesar';
let destinationPincode = '110001';
let selectedCategory = 'suv';

export function renderLogisticsCalculator(containerId = 'logistics-modal-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!isLogisticsOpen) {
    container.innerHTML = '';
    return;
  }

  const estimate = estimateLogisticsCost(selectedYardId, destinationPincode, selectedCategory);

  container.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#061827]/85 backdrop-blur-md animate-in fade-in duration-200" onclick="if(event.target === this) window.closeLogisticsCalculator();">
      
      <div class="relative w-full max-w-xl bg-[#0B2235] border border-[#163959] rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col text-[#F3F6F9]">
        
        <div class="bg-[#061827] px-6 py-4 border-b border-[#163959] flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-xl bg-[#087CFF]/20 text-[#39A7FF] flex items-center justify-center border border-[#087CFF]/30">
              <i data-lucide="truck" class="w-4 h-4"></i>
            </div>
            <div>
              <h3 class="text-base font-black text-white font-heading">Pan-India Towing Estimator</h3>
              <p class="text-xs text-[#8FA5B8]">Hydraulic flatbed delivery from auction yard to your doorstep</p>
            </div>
          </div>

          <button onclick="window.closeLogisticsCalculator()" class="p-2 rounded-xl bg-[#0B2235] hover:bg-[#0E2A42] text-[#8FA5B8] hover:text-white border border-[#163959] transition-colors">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <div class="p-6 space-y-4 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-[10px] font-bold text-[#8FA5B8] uppercase mb-1">Origin Auction Yard</label>
              <select 
                onchange="window.updateLogisticsYard(this.value)"
                class="w-full bg-[#061827] text-white rounded-xl border border-[#163959] p-2.5 focus:outline-none focus:border-[#087CFF] cursor-pointer"
              >
                ${INDIAN_YARDS.map(y => `<option value="${y.id}" ${selectedYardId === y.id ? 'selected' : ''}>${y.name}</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block text-[10px] font-bold text-[#8FA5B8] uppercase mb-1">Destination Pincode</label>
              <input 
                type="text" 
                value="${destinationPincode}"
                maxlength="6"
                placeholder="e.g. 110001"
                oninput="window.updateLogisticsPincode(this.value)"
                class="w-full bg-[#061827] text-white font-mono font-bold rounded-xl border border-[#163959] p-2.5 focus:outline-none focus:border-[#087CFF]"
              />
            </div>
          </div>

          <div>
            <label class="block text-[10px] font-bold text-[#8FA5B8] uppercase mb-1.5">Vehicle Type</label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              ${[
                { id: 'suv', label: 'SUV / Sedan' },
                { id: 'luxury', label: 'Luxury' },
                { id: 'twowheeler', label: 'Two-Wheeler' },
                { id: 'commercial', label: 'Truck' }
              ].map(item => `
                <button 
                  onclick="window.updateLogisticsCategory('${item.id}')"
                  class="py-2 px-2.5 rounded-xl border font-semibold text-xs transition-all ${
                    selectedCategory === item.id ? 'bg-[#087CFF] text-white border-[#087CFF] shadow' : 'bg-[#061827] text-[#8FA5B8] border-[#163959] hover:border-[#39A7FF]'
                  }"
                >
                  ${item.label}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="bg-[#061827] rounded-2xl p-5 border border-[#163959] space-y-3">
            <div class="flex items-center justify-between pb-2 border-b border-[#163959]">
              <div>
                <span class="text-[9px] text-[#8FA5B8] uppercase block">Route</span>
                <span class="font-bold text-white">${estimate.originCity} → PIN ${destinationPincode}</span>
              </div>
              <div class="text-right">
                <span class="text-[9px] text-[#8FA5B8] uppercase block">Transit Time</span>
                <span class="font-bold text-[#39A7FF] font-mono">${estimate.estimatedDays}</span>
              </div>
            </div>

            <div class="space-y-1.5 text-xs text-[#8FA5B8]">
              <div class="flex justify-between"><span>Driving Distance:</span><span class="text-white font-mono font-bold">${estimate.distanceKm} km</span></div>
              <div class="flex justify-between"><span>Hydraulic Flatbed Freight:</span><span class="text-white font-mono">${formatINR(estimate.transitCost)}</span></div>
              <div class="flex justify-between"><span>Comprehensive Transit Insurance:</span><span class="text-white font-mono">${formatINR(estimate.transitInsurance)}</span></div>
            </div>

            <div class="pt-3 border-t border-[#163959] flex items-baseline justify-between">
              <span class="text-xs font-bold text-white uppercase">Total Estimated Freight:</span>
              <span class="text-2xl font-black font-mono text-white">${formatINR(estimate.totalTowing)}</span>
            </div>
          </div>
        </div>

        <div class="bg-[#061827] px-6 py-3 border-t border-[#163959] flex items-center justify-between">
          <span class="text-[10px] text-[#8FA5B8]">Driver GPS link dispatched upon yard exit.</span>
          <button onclick="window.closeLogisticsCalculator()" class="px-4 py-2 rounded-xl bg-[#087CFF] hover:bg-[#006de6] text-white text-xs font-bold">
            Done
          </button>
        </div>

      </div>

    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

export function openLogisticsCalculator() {
  isLogisticsOpen = true;
  renderLogisticsCalculator();
}

export function closeLogisticsCalculator() {
  isLogisticsOpen = false;
  renderLogisticsCalculator();
}

window.openLogisticsCalculator = openLogisticsCalculator;
window.closeLogisticsCalculator = closeLogisticsCalculator;

window.updateLogisticsYard = (yId) => {
  selectedYardId = yId;
  renderLogisticsCalculator();
};

window.updateLogisticsPincode = (pin) => {
  destinationPincode = pin;
  renderLogisticsCalculator();
};

window.updateLogisticsCategory = (cat) => {
  selectedCategory = cat;
  renderLogisticsCalculator();
};
