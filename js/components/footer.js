// ==========================================================================
// BID MY CAR - FOOTER (MATCHING REFERENCE IMAGE)
// ==========================================================================

import { INDIAN_YARDS } from '../data/indianYards.js';

export function renderFooter(containerId = 'footer-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <footer class="bg-[#061827] text-[#8FA5B8] text-xs border-t border-[#163959]/70">
      
      <!-- MAIN FOOTER SITEMAP (FROM REFERENCE) -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <!-- BRAND & TAGLINE (FROM REFERENCE: AutoBid / Smarter Auctions, Better Deals) -->
          <div class="md:col-span-5 space-y-3">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-[#087CFF] flex items-center justify-center text-white">
                <i data-lucide="gavel" class="w-4 h-4"></i>
              </div>
              <span class="text-xl font-black text-white font-heading">Bid My Car</span>
            </div>
            
            <p class="text-xs text-[#8FA5B8] max-w-sm">
              Smarter Auctions, Better Deals. India's trusted online auto auction and salvage marketplace for buyers, sellers, banks, and insurers.
            </p>

            <div class="pt-2 text-[11px] text-[#8FA5B8]">
              <span>Toll Free Support: </span>
              <strong class="text-white">1800-209-4040</strong>
            </div>
          </div>

          <!-- QUICK LINKS (FROM REFERENCE: Home, Browse Vehicles, Sell Vehicle, About Us, Contact) -->
          <div class="md:col-span-2 space-y-2.5">
            <h5 class="text-xs font-bold text-white uppercase tracking-wider">Quick Links</h5>
            <ul class="space-y-2 text-xs text-[#8FA5B8]">
              <li><a href="#" onclick="event.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'});" class="hover:text-white transition-colors">Home</a></li>
              <li><a href="#inventory-section" onclick="window.scrollToSection('inventory-section');" class="hover:text-white transition-colors">Browse Vehicles</a></li>
              <li><a href="#" onclick="event.preventDefault(); window.openSellVehicleModal();" class="hover:text-white transition-colors">Sell Vehicle</a></li>
              <li><a href="#institutional-section" onclick="window.scrollToSection('institutional-section');" class="hover:text-white transition-colors">Institutional Portal</a></li>
              <li><a href="#how-it-works" onclick="window.scrollToSection('how-it-works');" class="hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>

          <!-- SUPPORT (FROM REFERENCE: FAQs, Terms & Conditions, Privacy Policy) -->
          <div class="md:col-span-2 space-y-2.5">
            <h5 class="text-xs font-bold text-white uppercase tracking-wider">Support</h5>
            <ul class="space-y-2 text-xs text-[#8FA5B8]">
              <li><a href="#" onclick="event.preventDefault(); window.scrollToSection('how-it-works');" class="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" onclick="event.preventDefault(); window.openLogisticsCalculator();" class="hover:text-white transition-colors">Towing Calculator</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Parivahan Title Guide</a></li>
            </ul>
          </div>

          <!-- FOLLOW US (FROM REFERENCE) -->
          <div class="md:col-span-3 space-y-3">
            <h5 class="text-xs font-bold text-white uppercase tracking-wider">Follow Us</h5>
            <div class="flex items-center gap-2.5">
              <a href="#" class="w-8 h-8 rounded-full bg-[#0B2235] border border-[#163959] hover:border-[#087CFF] text-[#8FA5B8] hover:text-white flex items-center justify-center transition-colors"><i data-lucide="twitter" class="w-4 h-4"></i></a>
              <a href="#" class="w-8 h-8 rounded-full bg-[#0B2235] border border-[#163959] hover:border-[#087CFF] text-[#8FA5B8] hover:text-white flex items-center justify-center transition-colors"><i data-lucide="facebook" class="w-4 h-4"></i></a>
              <a href="#" class="w-8 h-8 rounded-full bg-[#0B2235] border border-[#163959] hover:border-[#087CFF] text-[#8FA5B8] hover:text-white flex items-center justify-center transition-colors"><i data-lucide="instagram" class="w-4 h-4"></i></a>
              <a href="#" class="w-8 h-8 rounded-full bg-[#0B2235] border border-[#163959] hover:border-[#087CFF] text-[#8FA5B8] hover:text-white flex items-center justify-center transition-colors"><i data-lucide="linkedin" class="w-4 h-4"></i></a>
              <a href="#" class="w-8 h-8 rounded-full bg-[#0B2235] border border-[#163959] hover:border-[#087CFF] text-[#8FA5B8] hover:text-white flex items-center justify-center transition-colors"><i data-lucide="youtube" class="w-4 h-4"></i></a>
            </div>

            <div class="pt-2 text-[10px] text-[#8FA5B8]">
              <span>Operating across 8 Mega Hubs: </span>
              <span class="text-[#F3F6F9]">Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, Ahmedabad, Pune, Kolkata</span>
            </div>
          </div>

        </div>

        <!-- BOTTOM COPYRIGHT -->
        <div class="mt-10 pt-6 border-t border-[#163959]/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#8FA5B8]">
          <span>© 2026 Bid My Car. All rights reserved.</span>
          <span class="text-[#39A7FF]">Compliant with CMVR 1989 & SARFAESI Act 2002</span>
        </div>

      </div>

    </footer>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
