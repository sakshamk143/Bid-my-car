// ==========================================================================
// BID MY CAR - HOW IT WORKS (CLEAN PALETTE MATCHED)
// ==========================================================================

export function renderHowItWorks(containerId = 'how-it-works-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const steps = [
    {
      num: "01",
      title: "Digital KYC & Registration",
      description: "Quick 2-minute Aadhaar & PAN verification. Security deposit unlocks your digital bidding paddle.",
      icon: "user-check"
    },
    {
      num: "02",
      title: "150-Point Inspection",
      description: "Review detailed mechanical reports, engine sound clips, Copart damage codes, and 360° photo sets.",
      icon: "clipboard-list"
    },
    {
      num: "03",
      title: "Virtual Bid Room",
      description: "Bid in real-time with gavel audio, incremental bidding, and anti-sniping overtime protection.",
      icon: "gavel"
    },
    {
      num: "04",
      title: "Parivahan Digital Title",
      description: "Receive signed Form 29 & 30 transfer sets, Bank Form 35 loan NOCs, and inter-state dockets.",
      icon: "file-check"
    },
    {
      num: "05",
      title: "Yard Pickup or Towing",
      description: "Gate pass release at any of our 8 Pan-India hubs or GPS-tracked hydraulic flatbed delivery.",
      icon: "truck"
    }
  ];

  container.innerHTML = `
    <section id="how-it-works" class="py-16 bg-[#061827] border-b border-[#163959]/60">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div class="text-center max-w-2xl mx-auto">
          <span class="text-xs font-bold uppercase tracking-widest text-[#39A7FF]">Transparent Process</span>
          <h2 class="text-3xl sm:text-4xl font-black text-white font-heading mt-1">
            How Auto Auctions Work on Bid My Car
          </h2>
          <p class="text-xs sm:text-sm text-[#8FA5B8] mt-2">
            Copart-standard online vehicle remarketing with Indian Parivahan compliance and bank escrow.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          ${steps.map((step) => `
            <div class="bg-[#0B2235] border border-[#163959] hover:border-[#087CFF]/50 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-2xl font-black font-mono text-[#39A7FF]">${step.num}</span>
                  <div class="w-8 h-8 rounded-lg bg-[#087CFF]/15 text-[#39A7FF] flex items-center justify-center">
                    <i data-lucide="${step.icon}" class="w-4 h-4"></i>
                  </div>
                </div>

                <h3 class="text-sm font-bold text-white mb-1.5">${step.title}</h3>
                <p class="text-[11px] text-[#8FA5B8] leading-relaxed">${step.description}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- TITLE GUARANTEE BOX -->
        <div class="bg-[#0B2235] border border-[#163959] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-[#087CFF]/20 text-[#39A7FF] flex items-center justify-center shrink-0 border border-[#087CFF]/30">
              <i data-lucide="shield-check" class="w-6 h-6"></i>
            </div>
            <div>
              <h4 class="text-base font-bold text-white">100% Title & Odometer Guarantee</h4>
              <p class="text-xs text-[#8FA5B8] mt-0.5 max-w-xl">
                Every vehicle listed on Bid My Car is cross-verified with the central Parivahan Vahan registry. Full refund if registration details do not match upon yard inspection.
              </p>
            </div>
          </div>

          <button 
            onclick="window.scrollToLiveArena()" 
            class="px-5 py-2.5 rounded-xl bg-[#087CFF] hover:bg-[#006de6] text-white font-bold text-xs shadow transition-all shrink-0"
          >
            Explore Live Floor
          </button>
        </div>

      </div>
    </section>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
