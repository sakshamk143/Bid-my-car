// ==========================================================================
// BID MY CAR - SELL VEHICLE 3-STEP WIZARD (CLEAN PALETTE & 2D TAGGER)
// ==========================================================================

import { auctionStore } from '../state/auctionStore.js';
import { formatINR } from '../utils/formatters.js';
import { INDIAN_YARDS } from '../data/indianYards.js';

let wizardStep = 1;
let isModalOpen = false;

const draftListing = {
  regNo: 'DL-03-CB-4912',
  year: 2022,
  make: 'Tata',
  model: 'Harrier',
  variant: 'XZA Plus Dual Tone',
  fuelType: 'Diesel',
  transmission: 'Automatic',
  odometer: 28400,
  yardId: 'yard-del-manesar',
  runAndDrive: 'Runs & Drives',
  primaryDamage: 'Normal Wear',
  secondaryDamage: 'Minor Scratch',
  startingBid: 850000,
  reservePrice: 1100000,
  buyItNowPrice: 1250000,
  taggedZones: {
    frontBumper: 'minor',
    hood: null,
    windshield: null,
    roof: null,
    leftDoor: 'minor',
    rightDoor: null,
    rearBumper: null
  }
};

export function renderSellVehicleWizard(containerId = 'seller-wizard-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!isModalOpen) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#061827]/85 backdrop-blur-md animate-in fade-in duration-200" onclick="if(event.target === this) window.closeSellVehicleModal();">
      
      <div class="relative w-full max-w-4xl bg-[#0B2235] border border-[#163959] rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#F3F6F9]">
        
        <!-- HEADER -->
        <div class="bg-[#061827] px-6 py-4 border-b border-[#163959] flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-xl bg-[#087CFF]/20 text-[#39A7FF] flex items-center justify-center border border-[#087CFF]/30">
              <i data-lucide="tag" class="w-4 h-4"></i>
            </div>
            <div>
              <h3 class="text-base font-black text-white font-heading">List Your Vehicle for Auction</h3>
              <p class="text-xs text-[#8FA5B8]">Reach verified buyers, certified dealers, and auto recyclers across India</p>
            </div>
          </div>

          <button onclick="window.closeSellVehicleModal()" class="p-2 rounded-xl bg-[#0B2235] hover:bg-[#0E2A42] text-[#8FA5B8] hover:text-white border border-[#163959] transition-colors">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <!-- STEP PROGRESS -->
        <div class="bg-[#081F33] px-6 py-3 border-b border-[#163959] flex items-center justify-between text-xs">
          <div class="flex items-center gap-2 ${wizardStep >= 1 ? 'text-[#39A7FF] font-bold' : 'text-[#8FA5B8]'}">
            <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${wizardStep >= 1 ? 'bg-[#087CFF] text-white font-bold' : 'bg-[#061827] text-[#8FA5B8]'}">1</span>
            <span>Vahan RC Check</span>
          </div>
          <div class="h-0.5 flex-1 mx-4 bg-[#163959]">
            <div class="h-full bg-[#087CFF] transition-all duration-300 ${wizardStep === 1 ? 'w-0' : (wizardStep === 2 ? 'w-1/2' : 'w-full')}"></div>
          </div>
          <div class="flex items-center gap-2 ${wizardStep >= 2 ? 'text-[#39A7FF] font-bold' : 'text-[#8FA5B8]'}">
            <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${wizardStep >= 2 ? 'bg-[#087CFF] text-white font-bold' : 'bg-[#061827] text-[#8FA5B8]'}">2</span>
            <span>Damage Tagger</span>
          </div>
          <div class="h-0.5 flex-1 mx-4 bg-[#163959]">
            <div class="h-full bg-[#087CFF] transition-all duration-300 ${wizardStep < 3 ? 'w-0' : 'w-full'}"></div>
          </div>
          <div class="flex items-center gap-2 ${wizardStep >= 3 ? 'text-[#39A7FF] font-bold' : 'text-[#8FA5B8]'}">
            <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${wizardStep >= 3 ? 'bg-[#087CFF] text-white font-bold' : 'bg-[#061827] text-[#8FA5B8]'}">3</span>
            <span>Pricing</span>
          </div>
        </div>

        <!-- BODY -->
        <div class="p-6 overflow-y-auto flex-1 space-y-5 text-xs">
          ${wizardStep === 1 ? renderStep1() : ''}
          ${wizardStep === 2 ? renderStep2() : ''}
          ${wizardStep === 3 ? renderStep3() : ''}
        </div>

        <!-- FOOTER NAVIGATION -->
        <div class="bg-[#061827] px-6 py-3 border-t border-[#163959] flex items-center justify-between shrink-0">
          <button 
            onclick="window.prevWizardStep()"
            ${wizardStep === 1 ? 'disabled' : ''}
            class="px-4 py-2 rounded-xl bg-[#0B2235] hover:bg-[#0E2A42] disabled:opacity-30 text-[#8FA5B8] hover:text-white border border-[#163959] text-xs font-semibold"
          >
            ← Previous
          </button>

          ${wizardStep < 3 ? `
            <button 
              onclick="window.nextWizardStep()"
              class="px-5 py-2 rounded-xl bg-[#087CFF] hover:bg-[#006de6] text-white text-xs font-bold shadow flex items-center gap-1.5"
            >
              <span>Continue</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
          ` : `
            <button 
              onclick="window.submitListingToAuction()"
              class="px-6 py-2 rounded-xl bg-[#087CFF] hover:bg-[#006de6] text-white text-xs font-bold uppercase shadow-lg shadow-[#087CFF]/30 flex items-center gap-2"
            >
              <i data-lucide="check" class="w-4 h-4"></i>
              <span>Publish Vehicle</span>
            </button>
          `}
        </div>

      </div>

    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function renderStep1() {
  return `
    <div class="space-y-4">
      <div class="bg-[#061827] p-5 rounded-2xl border border-[#163959]">
        <h4 class="text-sm font-bold text-white mb-1">Enter Indian Registration Number</h4>
        <p class="text-[#8FA5B8] mb-4">Central Parivahan registry auto-fetches your vehicle specifications.</p>

        <div class="flex flex-col sm:flex-row gap-2.5 max-w-md">
          <input 
            type="text" 
            id="wizard-reg-input" 
            value="${draftListing.regNo}"
            placeholder="e.g. DL-03-CB-4912"
            class="flex-1 uppercase font-mono font-bold text-xs bg-[#0B2235] text-white rounded-xl border border-[#163959] px-3.5 py-2.5 focus:outline-none focus:border-[#087CFF]"
          />
          <button 
            type="button"
            onclick="window.simulateVahanFetch()"
            class="bg-[#087CFF] hover:bg-[#006de6] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition-colors"
          >
            Fetch Vahan
          </button>
        </div>
      </div>

      <div class="bg-[#061827] p-5 rounded-2xl border border-[#163959] space-y-3">
        <div class="flex items-center justify-between pb-2 border-b border-[#163959]">
          <span class="font-bold text-white text-xs flex items-center gap-1.5">
            <i data-lucide="check-circle-2" class="w-4 h-4 text-[#10B981]"></i>
            <span>Verified Parivahan Database Record</span>
          </span>
          <span class="text-[#10B981] font-mono text-[10px] font-bold">RC Active</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div><label class="text-[#8FA5B8] text-[10px] block">Make</label><input type="text" value="${draftListing.make}" class="w-full bg-[#0B2235] text-white rounded-xl border border-[#163959] p-2 mt-0.5" /></div>
          <div><label class="text-[#8FA5B8] text-[10px] block">Model</label><input type="text" value="${draftListing.model} ${draftListing.variant}" class="w-full bg-[#0B2235] text-white rounded-xl border border-[#163959] p-2 mt-0.5" /></div>
          <div><label class="text-[#8FA5B8] text-[10px] block">Year</label><input type="number" value="${draftListing.year}" class="w-full bg-[#0B2235] text-white rounded-xl border border-[#163959] p-2 mt-0.5" /></div>
          <div><label class="text-[#8FA5B8] text-[10px] block">Fuel</label><input type="text" value="${draftListing.fuelType}" class="w-full bg-[#0B2235] text-white rounded-xl border border-[#163959] p-2 mt-0.5" /></div>
          <div><label class="text-[#8FA5B8] text-[10px] block">Gearbox</label><input type="text" value="${draftListing.transmission}" class="w-full bg-[#0B2235] text-white rounded-xl border border-[#163959] p-2 mt-0.5" /></div>
          <div><label class="text-[#8FA5B8] text-[10px] block">Odometer (KM)</label><input type="number" value="${draftListing.odometer}" class="w-full bg-[#0B2235] text-white rounded-xl border border-[#163959] p-2 mt-0.5 font-mono" /></div>
        </div>
      </div>
    </div>
  `;
}

function renderStep2() {
  const zones = draftListing.taggedZones;

  return `
    <div class="space-y-4">
      <div class="bg-[#061827] p-5 rounded-2xl border border-[#163959]">
        <h4 class="text-sm font-bold text-white mb-1">Visual Vehicle Damage Tagger</h4>
        <p class="text-[#8FA5B8] mb-4">Click on vehicle zones to tag scratches (amber) or major collision points (red).</p>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div class="md:col-span-6 bg-[#0B2235] p-5 rounded-2xl border border-[#163959] flex flex-col items-center justify-center">
            <svg class="w-56 h-auto" viewBox="0 0 200 400" fill="none">
              <rect x="30" y="20" width="140" height="360" rx="40" stroke="#163959" stroke-width="3" fill="#061827" />
              
              <path d="M 45 25 Q 100 10 155 25 L 155 55 Q 100 45 45 55 Z" class="damage-silhouette-zone ${zones.frontBumper === 'minor' ? 'tagged-minor' : (zones.frontBumper === 'major' ? 'tagged-major' : '')}" stroke="#39A7FF" stroke-width="1.5" fill="#0E2A42" onclick="window.toggleZoneDamage('frontBumper')" />
              <text x="100" y="38" fill="#8FA5B8" font-size="7" text-anchor="middle">FRONT BUMPER</text>

              <path d="M 45 60 Q 100 52 155 60 L 155 120 Q 100 115 45 120 Z" class="damage-silhouette-zone ${zones.hood === 'minor' ? 'tagged-minor' : (zones.hood === 'major' ? 'tagged-major' : '')}" stroke="#39A7FF" stroke-width="1.5" fill="#0E2A42" onclick="window.toggleZoneDamage('hood')" />
              <text x="100" y="92" fill="#8FA5B8" font-size="8" text-anchor="middle">HOOD</text>

              <path d="M 50 125 L 150 125 L 145 160 L 55 160 Z" class="damage-silhouette-zone ${zones.windshield === 'minor' ? 'tagged-minor' : (zones.windshield === 'major' ? 'tagged-major' : '')}" stroke="#39A7FF" stroke-width="1.5" fill="#0E2A42" onclick="window.toggleZoneDamage('windshield')" />
              <text x="100" y="145" fill="#8FA5B8" font-size="7" text-anchor="middle">WINDSHIELD</text>

              <rect x="55" y="165" width="90" height="95" rx="6" class="damage-silhouette-zone ${zones.roof === 'minor' ? 'tagged-minor' : (zones.roof === 'major' ? 'tagged-major' : '')}" stroke="#39A7FF" stroke-width="1.5" fill="#0E2A42" onclick="window.toggleZoneDamage('roof')" />
              <text x="100" y="215" fill="#8FA5B8" font-size="8" text-anchor="middle">ROOF</text>

              <path d="M 32 120 L 50 120 L 50 260 L 32 260 Z" class="damage-silhouette-zone ${zones.leftDoor === 'minor' ? 'tagged-minor' : (zones.leftDoor === 'major' ? 'tagged-major' : '')}" stroke="#39A7FF" stroke-width="1.5" fill="#0E2A42" onclick="window.toggleZoneDamage('leftDoor')" />
              <text x="41" y="195" fill="#8FA5B8" font-size="7" text-anchor="middle" transform="rotate(-90 41 195)">LEFT DOORS</text>

              <path d="M 150 120 L 168 120 L 168 260 L 150 260 Z" class="damage-silhouette-zone ${zones.rightDoor === 'minor' ? 'tagged-minor' : (zones.rightDoor === 'major' ? 'tagged-major' : '')}" stroke="#39A7FF" stroke-width="1.5" fill="#0E2A42" onclick="window.toggleZoneDamage('rightDoor')" />
              <text x="159" y="195" fill="#8FA5B8" font-size="7" text-anchor="middle" transform="rotate(90 159 195)">RIGHT DOORS</text>

              <path d="M 45 320 Q 100 315 155 320 L 155 355 Q 100 370 45 355 Z" class="damage-silhouette-zone ${zones.rearBumper === 'minor' ? 'tagged-minor' : (zones.rearBumper === 'major' ? 'tagged-major' : '')}" stroke="#39A7FF" stroke-width="1.5" fill="#0E2A42" onclick="window.toggleZoneDamage('rearBumper')" />
              <text x="100" y="342" fill="#8FA5B8" font-size="7" text-anchor="middle">REAR BUMPER</text>
            </svg>
          </div>

          <div class="md:col-span-6 space-y-3">
            <div>
              <label class="block text-[10px] font-bold text-[#8FA5B8] uppercase mb-1">Copart Drive Status</label>
              <select class="w-full bg-[#0B2235] text-white rounded-xl border border-[#163959] p-2 focus:outline-none focus:border-[#087CFF]">
                <option>Runs & Drives (Engine & Transmission Smooth)</option>
                <option>Engine Starts Only</option>
                <option>Non-Runner / Tow Required</option>
              </select>
            </div>

            <div>
              <label class="block text-[10px] font-bold text-[#8FA5B8] uppercase mb-1">Primary Damage Classification</label>
              <select class="w-full bg-[#0B2235] text-white rounded-xl border border-[#163959] p-2 focus:outline-none focus:border-[#087CFF]">
                <option>Normal Wear & Tear</option>
                <option>Front End Collision</option>
                <option>Side Impact</option>
                <option>Flood / Water Ingress</option>
                <option>Mechanical Defect</option>
              </select>
            </div>

            <div class="border border-dashed border-[#163959] hover:border-[#39A7FF] rounded-xl p-3 text-center cursor-pointer bg-[#0B2235]">
              <i data-lucide="camera" class="w-5 h-5 text-[#39A7FF] mx-auto mb-1"></i>
              <div class="font-bold text-white text-xs">Add 6-12 Vehicle Photos</div>
              <p class="text-[10px] text-[#8FA5B8]">Front, Rear, Odometer & Engine Bay</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}

function renderStep3() {
  return `
    <div class="space-y-4">
      <div class="bg-[#061827] p-5 rounded-2xl border border-[#163959] space-y-4">
        <h4 class="text-sm font-bold text-white mb-1">Reserve Pricing & Hub Assignment</h4>
        
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-[10px] font-bold text-[#8FA5B8] uppercase mb-1">Starting Bid (₹)</label>
            <input type="number" value="${draftListing.startingBid}" class="w-full bg-[#0B2235] text-white font-mono font-bold rounded-xl border border-[#163959] p-2.5 focus:outline-none focus:border-[#087CFF]" />
          </div>
          <div>
            <label class="block text-[10px] font-bold text-[#8FA5B8] uppercase mb-1">Reserve Price (₹)</label>
            <input type="number" value="${draftListing.reservePrice}" class="w-full bg-[#0B2235] text-white font-mono font-bold rounded-xl border border-[#163959] p-2.5 focus:outline-none focus:border-[#087CFF]" />
          </div>
          <div>
            <label class="block text-[10px] font-bold text-[#8FA5B8] uppercase mb-1">Buy It Now Price (₹)</label>
            <input type="number" value="${draftListing.buyItNowPrice}" class="w-full bg-[#0B2235] text-white font-mono font-bold rounded-xl border border-[#163959] p-2.5 focus:outline-none focus:border-[#087CFF]" />
          </div>
        </div>

        <div>
          <label class="block text-[10px] font-bold text-[#8FA5B8] uppercase mb-1">Assigned Mega Yard for Physical Drop-off</label>
          <select class="w-full bg-[#0B2235] text-white rounded-xl border border-[#163959] p-2.5 focus:outline-none focus:border-[#087CFF]">
            ${INDIAN_YARDS.map(y => `<option value="${y.id}">${y.name} — ${y.city}</option>`).join('')}
          </select>
        </div>
      </div>
    </div>
  `;
}

export function openSellVehicleModal() {
  isModalOpen = true;
  wizardStep = 1;
  renderSellVehicleWizard();
}

export function closeSellVehicleModal() {
  isModalOpen = false;
  renderSellVehicleWizard();
}

window.openSellVehicleModal = openSellVehicleModal;
window.closeSellVehicleModal = closeSellVehicleModal;

window.nextWizardStep = () => {
  if (wizardStep < 3) {
    wizardStep += 1;
    renderSellVehicleWizard();
  }
};

window.prevWizardStep = () => {
  if (wizardStep > 1) {
    wizardStep -= 1;
    renderSellVehicleWizard();
  }
};

window.toggleZoneDamage = (z) => {
  const curr = draftListing.taggedZones[z];
  if (!curr) draftListing.taggedZones[z] = 'minor';
  else if (curr === 'minor') draftListing.taggedZones[z] = 'major';
  else draftListing.taggedZones[z] = null;
  renderSellVehicleWizard();
};

window.simulateVahanFetch = () => {
  const val = document.getElementById('wizard-reg-input')?.value;
  if (val) draftListing.regNo = val.toUpperCase();
  renderSellVehicleWizard();
};

window.submitListingToAuction = () => {
  const randomLot = '108' + Math.floor(10000 + Math.random() * 90000);
  const newLot = {
    id: 'lot-' + randomLot,
    lotNumber: randomLot,
    year: draftListing.year,
    make: draftListing.make,
    model: draftListing.model,
    variant: draftListing.variant,
    title: `${draftListing.year} ${draftListing.make} ${draftListing.model} ${draftListing.variant}`,
    category: 'suv',
    conditionType: 'clean_title',
    saleType: 'live_now',
    primaryDamage: draftListing.primaryDamage,
    secondaryDamage: draftListing.secondaryDamage,
    runAndDrive: draftListing.runAndDrive,
    keys: 'Yes (2 Keys)',
    regNo: draftListing.regNo,
    rtoLocation: 'Delhi NCR RTO',
    vin: 'MA3EYD21S' + Math.floor(10000000 + Math.random() * 90000000),
    odometer: draftListing.odometer,
    fuelType: draftListing.fuelType,
    transmission: draftListing.transmission,
    ownership: '1st Owner',
    yardId: draftListing.yardId,
    currentBid: draftListing.startingBid,
    startingBid: draftListing.startingBid,
    reservePrice: draftListing.reservePrice,
    reserveMet: false,
    estRetailValue: Math.round(draftListing.reservePrice * 1.35),
    estRepairCost: 15000,
    bidCount: 1,
    isLiveNow: true,
    isPureSale: false,
    buyItNowPrice: draftListing.buyItNowPrice,
    auctionEndsInSeconds: 300,
    sellerType: auctionStore.currentRole,
    sellerName: 'You (Verified Seller)',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
    ],
    inspectionScore: 8.9,
    inspectionHighlights: [
      { category: 'Engine & Gearbox', status: 'pass', note: 'Declared running well.' }
    ],
    rtoDocuments: {
      rcStatus: 'Digital Vahan Verified Smart Card',
      nocStatus: 'NOC Ready',
      hypothecation: 'Cleared',
      insurance: 'Comprehensive Valid',
      puc: 'Valid',
      form29_30: 'Signed Online'
    }
  };

  auctionStore.addVehicleListing(newLot);
  auctionStore.setActiveLiveLot(newLot.id);
  closeSellVehicleModal();

  const arena = document.getElementById('live-auction-arena');
  if (arena) {
    arena.scrollIntoView({ behavior: 'smooth' });
  }
};
