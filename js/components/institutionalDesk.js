// ==========================================================================
// BID MY CAR - INSTITUTIONAL PORTAL (INSURANCE, BANKS & GOVERNMENT)
// ==========================================================================

import { auctionStore } from '../state/auctionStore.js';

let activeInstTab = 'insurance';

export function renderInstitutionalDesk(containerId = 'institutional-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <section id="institutional-section" class="py-14 bg-[#061827] border-b border-[#163959]/60">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <!-- HEADER -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B2235] border border-[#163959] text-xs font-bold text-[#39A7FF] mb-2">
              <i data-lucide="building-2" class="w-3.5 h-3.5"></i>
              <span>INSTITUTIONAL ASSET DESK</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-black text-white font-heading">Enterprise Asset Liquidation</h2>
            <p class="text-xs text-[#8FA5B8] mt-1 max-w-xl">
              Dedicated remarketing channels for Indian General Insurers, Banks, NBFCs, and State Government departments.
            </p>
          </div>

          <!-- TABS -->
          <div class="flex items-center bg-[#0B2235] border border-[#163959] rounded-2xl p-1 gap-1 text-xs">
            <button 
              onclick="window.switchInstTab('insurance')"
              class="px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${activeInstTab === 'insurance' ? 'bg-[#087CFF] text-white shadow' : 'text-[#8FA5B8] hover:text-white'}"
            >
              <i data-lucide="shield-alert" class="w-4 h-4"></i>
              <span>Insurance Salvage</span>
            </button>

            <button 
              onclick="window.switchInstTab('bank')"
              class="px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${activeInstTab === 'bank' ? 'bg-[#087CFF] text-white shadow' : 'text-[#8FA5B8] hover:text-white'}"
            >
              <i data-lucide="landmark" class="w-4 h-4"></i>
              <span>Bank Repos</span>
            </button>

            <button 
              onclick="window.switchInstTab('government')"
              class="px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${activeInstTab === 'government' ? 'bg-[#087CFF] text-white shadow' : 'text-[#8FA5B8] hover:text-white'}"
            >
              <i data-lucide="building" class="w-4 h-4"></i>
              <span>Govt Surplus</span>
            </button>
          </div>
        </div>

        <!-- CONTENT CARD -->
        <div class="bg-[#0B2235] border border-[#163959] rounded-3xl p-6 sm:p-8 shadow-xl">
          ${activeInstTab === 'insurance' ? renderInsuranceTab() : ''}
          ${activeInstTab === 'bank' ? renderBankTab() : ''}
          ${activeInstTab === 'government' ? renderGovtTab() : ''}
        </div>

      </div>
    </section>
  `;

  window.switchInstTab = (tab) => {
    activeInstTab = tab;
    renderInstitutionalDesk(containerId);
  };

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function renderInsuranceTab() {
  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#163959]">
        <div>
          <h3 class="text-lg font-bold text-white">General Insurance Salvage & Total Loss Liquidation</h3>
          <p class="text-xs text-[#8FA5B8] mt-1">IRDAI-compliant salvage auctions with certified surveyor worksheets and Pan-India yards.</p>
        </div>
        <button onclick="window.openSellVehicleModal()" class="px-4 py-2 rounded-xl bg-[#087CFF] hover:bg-[#006de6] text-white font-bold text-xs shadow flex items-center gap-1.5">
          <i data-lucide="upload" class="w-4 h-4"></i>
          <span>Upload Surveyor Batch</span>
        </button>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div class="bg-[#061827] p-4 rounded-xl border border-[#163959]">
          <span class="text-[10px] text-[#8FA5B8] uppercase block">Avg Salvage Recovery</span>
          <span class="text-2xl font-black text-white font-mono mt-1 block">42.8%</span>
          <span class="text-[10px] text-[#10B981]">+6.4% above scrap baseline</span>
        </div>
        <div class="bg-[#061827] p-4 rounded-xl border border-[#163959]">
          <span class="text-[10px] text-[#8FA5B8] uppercase block">Turnaround to Cash</span>
          <span class="text-2xl font-black text-white font-mono mt-1 block">6.2 Days</span>
          <span class="text-[10px] text-[#39A7FF]">From intake to hammer close</span>
        </div>
        <div class="bg-[#061827] p-4 rounded-xl border border-[#163959]">
          <span class="text-[10px] text-[#8FA5B8] uppercase block">Insurance Partners</span>
          <span class="text-2xl font-black text-white font-mono mt-1 block">18 Majors</span>
          <span class="text-[10px] text-[#8FA5B8]">Bajaj, ICICI, HDFC, Digit</span>
        </div>
        <div class="bg-[#061827] p-4 rounded-xl border border-[#163959]">
          <span class="text-[10px] text-[#8FA5B8] uppercase block">Digital Form 29/30</span>
          <span class="text-2xl font-black text-[#10B981] font-mono mt-1 block">100%</span>
          <span class="text-[10px] text-[#8FA5B8]">Zero legal liability</span>
        </div>
      </div>
    </div>
  `;
}

function renderBankTab() {
  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#163959]">
        <div>
          <h3 class="text-lg font-bold text-white">Bank & NBFC Stressed Auto Loans Repossession Wing</h3>
          <p class="text-xs text-[#8FA5B8] mt-1">Conducted under SARFAESI Act 2002 guidelines with loan account mapping.</p>
        </div>
        <button onclick="window.setConditionFilter('bank_repo')" class="px-4 py-2 rounded-xl bg-[#087CFF] hover:bg-[#006de6] text-white font-bold text-xs shadow flex items-center gap-1.5">
          <i data-lucide="filter" class="w-4 h-4"></i>
          <span>Browse Bank Repos</span>
        </button>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div class="bg-[#061827] p-4 rounded-xl border border-[#163959]">
          <span class="text-[10px] text-[#8FA5B8] uppercase block">Principal Recovery</span>
          <span class="text-2xl font-black text-white font-mono mt-1 block">78.5%</span>
          <span class="text-[10px] text-[#10B981]">Direct loan offset</span>
        </div>
        <div class="bg-[#061827] p-4 rounded-xl border border-[#163959]">
          <span class="text-[10px] text-[#8FA5B8] uppercase block">NOC Release Time</span>
          <span class="text-2xl font-black text-white font-mono mt-1 block">48 Hours</span>
          <span class="text-[10px] text-[#39A7FF]">Form 35 digital issuance</span>
        </div>
        <div class="bg-[#061827] p-4 rounded-xl border border-[#163959]">
          <span class="text-[10px] text-[#8FA5B8] uppercase block">Participating Banks</span>
          <span class="text-2xl font-black text-white font-mono mt-1 block">32+ Lenders</span>
          <span class="text-[10px] text-[#8FA5B8]">SBI, HDFC, Kotak, Mahindra</span>
        </div>
        <div class="bg-[#061827] p-4 rounded-xl border border-[#163959]">
          <span class="text-[10px] text-[#8FA5B8] uppercase block">Fast Yard Release</span>
          <span class="text-2xl font-black text-[#10B981] font-mono mt-1 block">100%</span>
          <span class="text-[10px] text-[#8FA5B8]">Immediate gate pass</span>
        </div>
      </div>
    </div>
  `;
}

function renderGovtTab() {
  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#163959]">
        <div>
          <h3 class="text-lg font-bold text-white">Government & Municipal E-Auction Cell</h3>
          <p class="text-xs text-[#8FA5B8] mt-1">National Vehicle Scrappage Policy (RVSF) certified tender auctions.</p>
        </div>
        <button onclick="window.setConditionFilter('govt_surplus')" class="px-4 py-2 rounded-xl bg-[#087CFF] hover:bg-[#006de6] text-white font-bold text-xs shadow flex items-center gap-1.5">
          <i data-lucide="award" class="w-4 h-4"></i>
          <span>View Govt Lots</span>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div class="bg-[#061827] p-4 rounded-xl border border-[#163959]">
          <h4 class="font-bold text-white mb-1">RVSF Vehicle Scrappage Certificates</h4>
          <p class="text-[#8FA5B8]">Automated Certificate of Deposit (COD) issuance granting up to 25% road tax concessions on new vehicles under MoRTH rules.</p>
        </div>
        <div class="bg-[#061827] p-4 rounded-xl border border-[#163959]">
          <h4 class="font-bold text-white mb-1">Tender E-Auction Gazette Compliance</h4>
          <p class="text-[#8FA5B8]">Statutory Earnest Money Deposit (EMD) escrow with sealed electronic bids for State PWD, Police, and Municipal fleets.</p>
        </div>
      </div>
    </div>
  `;
}
