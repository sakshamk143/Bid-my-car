// ==========================================================================
// BID MY CAR - NAVBAR & TOP TICKER
// Authentication-aware navbar
//
// CURRENT AUTH SYSTEM:
// - Logged out  -> Login + Sign Up
// - Logged in   -> Account icon + User menu + Logout
//
// IMPORTANT FUTURE DESIGN:
// - No role switcher.
// - Every registered user can BUY and SELL.
// - Later the account menu will dynamically show:
//      Buyer Dashboard
//      Seller Dashboard
//      or BOTH dashboards depending on user activity.
//
// DO NOT implement those dashboards yet.
// ==========================================================================

import { auctionStore } from '../state/auctionStore.js';
import { INDIAN_YARDS } from '../data/indianYards.js';
import { openAuthModal } from './authModal.js';

// ==========================================================================
// GET CURRENT AUTHENTICATION STATE
// ==========================================================================

function getCurrentAuthUser() {
  const storedUser = localStorage.getItem('bidmycar_user');

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    console.error('Could not read stored Bid My Car user:', error);
    return null;
  }
}

// ==========================================================================
// CHECK WHETHER USER HAS A TOKEN
// ==========================================================================

function isUserLoggedIn() {
  const localToken = localStorage.getItem('bidmycar_token');
  const sessionToken = sessionStorage.getItem('bidmycar_token');

  return Boolean(localToken || sessionToken);
}

// ==========================================================================
// RENDER NAVBAR
// ==========================================================================

export function renderNavbar(containerId = 'navbar-container') {
  const container = document.getElementById(containerId);

  if (!container) {
    return;
  }

  // ========================================================================
  // EXISTING AUCTION STATE
  // ========================================================================

  const watchlistCount = auctionStore.watchlist.size;
  const currentYardId = auctionStore.filters.yardId;

  // ========================================================================
  // AUTH STATE
  // ========================================================================

  const currentUser = getCurrentAuthUser();
  const loggedIn = isUserLoggedIn() && currentUser;

  // ========================================================================
  // SAFE USER INFORMATION
  // ========================================================================

  const userName = currentUser?.name || 'User';
  const userEmail = currentUser?.email || '';

  // First letter for account avatar
  const userInitial = userName
    .trim()
    .charAt(0)
    .toUpperCase() || 'U';

  // ========================================================================
  // NAVBAR HTML
  // ========================================================================

  container.innerHTML = `

    <!-- ================================================================
         TOP LIVE ANNOUNCEMENT TICKER
    ================================================================ -->

    <div
      class="bg-[#040F19]
      border-b border-[#163959]/60
      text-xs py-1.5 px-4
      font-mono text-[#8FA5B8]"
    >

      <div
        class="max-w-7xl mx-auto
        flex items-center justify-between"
      >

        <!-- LIVE AUCTIONS -->

        <div
          class="flex items-center
          space-x-2
          text-[#39A7FF]
          font-semibold
          shrink-0
          pr-4"
        >

          <span
            class="inline-block w-2 h-2
            rounded-full bg-[#10B981]
            animate-ping"
          ></span>

          <span>LIVE AUCTIONS:</span>

        </div>


        <!-- TICKER -->

        <div
          class="ticker-wrap
          w-full overflow-hidden"
        >

          <div
            class="ticker-move
            text-[#8FA5B8]
            space-x-8"
          >

            <span
              class="inline-flex
              items-center"
            >

              <span
                class="text-[#F3F6F9]
                font-bold mr-1"
              >
                LOT 108291:
              </span>

              2023 Mahindra XUV700 AX7L
              • High Bid:

              <strong
                class="text-[#10B981]
                ml-1"
              >
                ₹16,80,000
              </strong>

              (Mumbai Hub)

            </span>


            <span
              class="inline-flex
              items-center"
            >

              <span
                class="text-[#39A7FF]
                font-bold mr-1"
              >
                LOT 108292:
              </span>

              2022 Tata Nexon EV Salvage
              • Reserve Met at

              <strong
                class="text-[#10B981]
                ml-1"
              >
                ₹6,85,000
              </strong>

              (Delhi Yard)

            </span>


            <span
              class="inline-flex
              items-center"
            >

              <span
                class="text-[#F3F6F9]
                font-bold mr-1"
              >
                BANK REPO:
              </span>

              14 New Commercial Pickups Added
              from SBI & Kotak Prime

            </span>


            <span
              class="inline-flex
              items-center"
            >

              <span
                class="text-[#39A7FF]
                font-bold mr-1"
              >
                PARIVAHAN READY:
              </span>

              Digital Form 29/30 &
              Inter-State NOC Assistance Available

            </span>

          </div>

        </div>


        <!-- SUPPORT NUMBER -->

        <div
          class="hidden md:flex
          items-center
          space-x-4
          pl-4
          shrink-0
          text-[#8FA5B8]"
        >

          <span
            class="flex items-center
            gap-1
            hover:text-[#39A7FF]
            cursor-pointer"
          >

            <i
              data-lucide="phone"
              class="w-3.5 h-3.5
              text-[#087CFF]"
            ></i>

            <span>1800-209-4040</span>

          </span>

        </div>

      </div>

    </div>


    <!-- ================================================================
         MAIN HEADER
    ================================================================ -->

    <header
      class="bg-[#061827]/95
      backdrop-blur-md
      sticky top-0
      z-40
      border-b
      border-[#163959]/70"
    >

      <div
        class="max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8"
      >

        <div
          class="flex items-center
          justify-between
          h-18
          py-3"
        >

          <!-- ==========================================================
               BRAND
          ========================================================== -->

          <div
            class="flex items-center gap-8"
          >

            <a
              href="#"
              class="flex items-center
              gap-2.5 group"
              onclick="
                event.preventDefault();
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              "
            >

              <div
                class="w-9 h-9
                rounded-xl
                bg-[#087CFF]
                flex items-center
                justify-center
                shadow-md
                shadow-[#087CFF]/30
                group-hover:scale-105
                transition-transform"
              >

                <i
                  data-lucide="gavel"
                  class="w-5 h-5 text-white"
                ></i>

              </div>


              <div
                class="flex flex-col"
              >

                <span
                  class="text-xl
                  font-black
                  tracking-tight
                  text-white
                  font-heading"
                >
                  Bid My Car
                </span>

                <span
                  class="text-[9px]
                  text-[#8FA5B8]
                  -mt-1
                  tracking-wider
                  uppercase
                  font-semibold"
                >
                  Online Auto Auction
                </span>

              </div>

            </a>


            <!-- ========================================================
                 NAV LINKS
            ======================================================== -->

            <nav
              class="hidden lg:flex
              items-center
              space-x-6
              text-xs
              font-semibold
              text-[#8FA5B8]"
            >

              <a
                href="#"
                onclick="
                  event.preventDefault();
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
                "
                class="text-white
                hover:text-[#39A7FF]
                transition-colors"
              >
                Home
              </a>


              <a
                href="#inventory-section"
                onclick="
                  window.scrollToSection(
                    'inventory-section'
                  );
                "
                class="hover:text-white
                transition-colors"
              >
                Browse Vehicles
              </a>


              <a
                href="#live-auction-arena"
                onclick="
                  window.scrollToLiveArena();
                "
                class="hover:text-white
                transition-colors
                flex items-center gap-1"
              >

                <span>Auctions</span>

                <span
                  class="w-1.5 h-1.5
                  rounded-full
                  bg-[#EF4444]
                  animate-pulse"
                ></span>

              </a>


              <a
                href="#"
                onclick="
                  event.preventDefault();
                  window.openSellVehicleModal();
                "
                class="hover:text-white
                transition-colors"
              >
                Sell
              </a>


              <a
                href="#institutional-section"
                onclick="
                  window.scrollToSection(
                    'institutional-section'
                  );
                "
                class="hover:text-white
                transition-colors"
              >
                Institutional
              </a>


              <a
                href="#how-it-works"
                onclick="
                  window.scrollToSection(
                    'how-it-works'
                  );
                "
                class="hover:text-white
                transition-colors"
              >
                About
              </a>

            </nav>

          </div>


          <!-- ==========================================================
               RIGHT SIDE ACTIONS
          ========================================================== -->

          <div
            class="flex items-center gap-3"
          >

            <!-- ========================================================
                 YARD HUB
            ======================================================== -->

            <div
              class="hidden xl:flex
              items-center
              bg-[#0B2235]
              border border-[#163959]
              rounded-xl
              px-2.5
              py-1.5
              text-xs
              text-[#8FA5B8]"
            >

              <i
                data-lucide="map-pin"
                class="w-3.5 h-3.5
                text-[#39A7FF]
                mr-1.5
                shrink-0"
              ></i>


              <select
                id="navbar-yard-select"
                class="bg-transparent
                text-[#F3F6F9]
                text-xs
                font-medium
                focus:outline-none
                cursor-pointer
                pr-1"
              >

                <option
                  value="all"
                  ${
                    currentYardId === 'all'
                      ? 'selected'
                      : ''
                  }
                >
                  All 8 Indian Yards
                </option>

                ${
                  INDIAN_YARDS.map(
                    (yard) => `
                      <option
                        value="${yard.id}"
                        ${
                          currentYardId === yard.id
                            ? 'selected'
                            : ''
                        }
                      >
                        ${yard.city} (${yard.code})
                      </option>
                    `
                  ).join('')
                }

              </select>

            </div>


            <!-- ========================================================
                 WATCHLIST
            ======================================================== -->

            <button
              id="nav-watchlist-btn"
              onclick="
                window.filterByWatchlist();
              "
              class="relative
              p-2
              rounded-xl
              bg-[#0B2235]
              text-[#8FA5B8]
              hover:text-white
              border border-[#163959]
              transition-colors"
              title="Watchlist"
            >

              <i
                data-lucide="bookmark"
                class="w-4 h-4
                ${
                  watchlistCount > 0
                    ? 'text-[#39A7FF] fill-[#39A7FF]/30'
                    : ''
                }"
              ></i>


              ${
                watchlistCount > 0
                  ? `
                    <span
                      class="absolute
                      -top-1
                      -right-1
                      w-4 h-4
                      bg-[#087CFF]
                      text-white
                      font-black
                      text-[9px]
                      rounded-full
                      flex items-center
                      justify-center"
                    >
                      ${watchlistCount}
                    </span>
                  `
                  : ''
              }

            </button>


            <!-- ========================================================
                 AUTH AREA
            ======================================================== -->

            ${
              loggedIn
                ? `

                  <!-- ================================================
                       LOGGED-IN ACCOUNT BUTTON
                  ================================================= -->

                  <div
                    id="navbar-account-wrapper"
                    class="relative"
                  >

                    <button
                      id="navbar-account-button"
                      type="button"
                      class="flex items-center
                      gap-2
                      px-2
                      py-1.5
                      rounded-xl
                      bg-[#0B2235]
                      border border-[#163959]
                      hover:border-[#39A7FF]/50
                      transition-all"
                      title="My Account"
                    >

                      <!-- USER AVATAR -->

                      <span
                        class="w-8 h-8
                        rounded-lg
                        bg-[#087CFF]
                        flex items-center
                        justify-center
                        text-white
                        text-xs
                        font-black"
                      >
                        ${escapeHtml(userInitial)}
                      </span>


                      <!-- USER NAME -->

                      <span
                        class="hidden sm:block
                        max-w-[100px]
                        truncate
                        text-xs
                        font-semibold
                        text-[#F3F6F9]"
                      >
                        ${escapeHtml(userName)}
                      </span>


                      <i
                        data-lucide="chevron-down"
                        class="w-3.5 h-3.5
                        text-[#8FA5B8]"
                      ></i>

                    </button>


                    <!-- ==============================================
                         ACCOUNT MENU
                    =============================================== -->

                    <div
                      id="navbar-account-menu"
                      class="hidden
                      absolute
                      right-0
                      mt-2
                      w-72
                      bg-[#0B2235]
                      border border-[#163959]
                      rounded-2xl
                      shadow-2xl
                      p-3
                      z-50"
                    >

                      <!-- USER INFORMATION -->

                      <div
                        class="flex items-center
                        gap-3
                        px-2
                        py-2
                        mb-2"
                      >

                        <div
                          class="w-11 h-11
                          rounded-xl
                          bg-[#087CFF]
                          flex items-center
                          justify-center
                          text-white
                          font-black"
                        >
                          ${escapeHtml(userInitial)}
                        </div>


                        <div
                          class="min-w-0"
                        >

                          <div
                            class="text-sm
                            font-bold
                            text-white
                            truncate"
                          >
                            ${escapeHtml(userName)}
                          </div>

                          <div
                            class="text-[10px]
                            text-[#8FA5B8]
                            truncate"
                          >
                            ${escapeHtml(userEmail)}
                          </div>

                        </div>

                      </div>


                      <div
                        class="border-t
                        border-[#163959]/60
                        pt-2
                        space-y-1"
                      >

                        <!-- PROFILE -->

                        <button
                          type="button"
                          onclick="
                            window.showAccountComingSoon(
                              'Profile'
                            );
                          "
                          class="w-full
                          flex items-center
                          gap-2
                          px-3
                          py-2.5
                          rounded-xl
                          text-xs
                          text-[#F3F6F9]
                          hover:bg-[#0E2A42]
                          transition-colors
                          text-left"
                        >

                          <i
                            data-lucide="user"
                            class="w-4 h-4
                            text-[#39A7FF]"
                          ></i>

                          <span>My Profile</span>

                        </button>


                        <!-- FUTURE DASHBOARDS
                             DO NOT IMPLEMENT YET.
                        -->

                        <button
                          type="button"
                          onclick="
                            window.showAccountComingSoon(
                              'Buyer Dashboard'
                            );
                          "
                          class="w-full
                          flex items-center
                          gap-2
                          px-3
                          py-2.5
                          rounded-xl
                          text-xs
                          text-[#8FA5B8]
                          hover:bg-[#0E2A42]
                          hover:text-white
                          transition-colors
                          text-left"
                        >

                          <i
                            data-lucide="shopping-cart"
                            class="w-4 h-4
                            text-[#39A7FF]"
                          ></i>

                          <span>
                            Buyer Dashboard
                          </span>

                          <span
                            class="ml-auto
                            text-[8px]
                            uppercase
                            text-[#8FA5B8]"
                          >
                            Later
                          </span>

                        </button>


                        <button
                          type="button"
                          onclick="
                            window.showAccountComingSoon(
                              'Seller Dashboard'
                            );
                          "
                          class="w-full
                          flex items-center
                          gap-2
                          px-3
                          py-2.5
                          rounded-xl
                          text-xs
                          text-[#8FA5B8]
                          hover:bg-[#0E2A42]
                          hover:text-white
                          transition-colors
                          text-left"
                        >

                          <i
                            data-lucide="car-front"
                            class="w-4 h-4
                            text-[#39A7FF]"
                          ></i>

                          <span>
                            Seller Dashboard
                          </span>

                          <span
                            class="ml-auto
                            text-[8px]
                            uppercase
                            text-[#8FA5B8]"
                          >
                            Later
                          </span>

                        </button>


                        <!-- LOGOUT -->

                        <div
                          class="border-t
                          border-[#163959]/60
                          pt-1
                          mt-1"
                        >

                          <button
                            type="button"
                            onclick="
                              window.logoutUser();
                            "
                            class="w-full
                            flex items-center
                            gap-2
                            px-3
                            py-2.5
                            rounded-xl
                            text-xs
                            text-[#EF4444]
                            hover:bg-[#EF4444]/10
                            transition-colors
                            text-left"
                          >

                            <i
                              data-lucide="log-out"
                              class="w-4 h-4"
                            ></i>

                            <span>
                              Logout
                            </span>

                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                `
                : `

                  <!-- ================================================
                       LOGGED-OUT AUTH BUTTONS
                  ================================================= -->

                  <button
                    type="button"
                    onclick="
                      window.openAuthModal('login');
                    "
                    class="hidden sm:inline-flex
                    px-3.5
                    py-2
                    text-xs
                    font-semibold
                    text-[#F3F6F9]
                    hover:text-white
                    transition-colors"
                  >
                    Login
                  </button>


                  <button
                    type="button"
                    onclick="
                      window.openAuthModal('register');
                    "
                    class="px-4
                    py-2
                    rounded-xl
                    bg-[#087CFF]
                    hover:bg-[#006de6]
                    text-white
                    font-bold
                    text-xs
                    shadow-md
                    shadow-[#087CFF]/30
                    hover:shadow-[#087CFF]/50
                    transition-all
                    active:scale-95"
                  >
                    Sign Up
                  </button>

                `
            }

          </div>

        </div>

      </div>

    </header>
  `;


  // ========================================================================
  // YARD SELECT EVENT
  // ========================================================================

  const yardSelect =
    document.getElementById('navbar-yard-select');

  if (yardSelect) {

    yardSelect.addEventListener(
      'change',
      (event) => {

        auctionStore.setFilter(
          'yardId',
          event.target.value
        );

      }
    );

  }


  // ========================================================================
  // ACCOUNT DROPDOWN EVENT
  // ========================================================================

  const accountButton =
    document.getElementById(
      'navbar-account-button'
    );

  const accountMenu =
    document.getElementById(
      'navbar-account-menu'
    );

  if (accountButton && accountMenu) {

    accountButton.addEventListener(
      'click',
      (event) => {

        event.stopPropagation();

        accountMenu.classList.toggle(
          'hidden'
        );

      }
    );

  }


  // ========================================================================
  // CLOSE ACCOUNT MENU WHEN CLICKING OUTSIDE
  // ========================================================================

  if (accountButton && accountMenu) {

    document.addEventListener(
      'click',
      (event) => {

        if (
          !accountButton.contains(event.target) &&
          !accountMenu.contains(event.target)
        ) {

          accountMenu.classList.add(
            'hidden'
          );

        }

      }
    );

  }


  // ========================================================================
  // LUCIDE ICONS
  // ========================================================================

  if (window.lucide) {

    window.lucide.createIcons();

  }

}


// ==========================================================================
// AUTH STATE LISTENER
//
// authModal.js dispatches:
//
// window.dispatchEvent(
//   new CustomEvent('bidmycar:auth-changed', ...)
// )
//
// When that happens, completely re-render the navbar.
//
// This is what makes:
// Login + Sign Up
//
// become:
//
// 👤 User + Logout
// ==========================================================================

window.addEventListener(
  'bidmycar:auth-changed',
  () => {

    renderNavbar();

  }
);


// ==========================================================================
// ACCOUNT PLACEHOLDER
//
// Real Profile / Buyer Dashboard / Seller Dashboard will be implemented
// later. For now this prevents broken buttons.
// ==========================================================================

window.showAccountComingSoon = (sectionName) => {

  const oldToast =
    document.getElementById(
      'bidmycar-navbar-toast'
    );

  if (oldToast) {
    oldToast.remove();
  }


  const toast =
    document.createElement('div');

  toast.id =
    'bidmycar-navbar-toast';

  toast.className = `
    fixed
    bottom-6
    right-6
    z-[100]
    bg-[#0B2235]
    border
    border-[#163959]
    text-white
    text-xs
    font-bold
    px-4
    py-3
    rounded-2xl
    shadow-2xl
  `;

  toast.textContent =
    `${sectionName} will be implemented later.`;

  document.body.appendChild(toast);


  setTimeout(() => {

    if (toast.parentNode) {
      toast.remove();
    }

  }, 2500);

};


// ==========================================================================
// HTML ESCAPE
//
// User information comes from backend/database.
// Always escape it before inserting it into innerHTML.
// ==========================================================================

function escapeHtml(value) {

  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

}
