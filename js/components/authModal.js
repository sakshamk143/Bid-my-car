// ==========================================================================
// BID MY CAR - AUTH MODAL (LOGIN & REGISTER SPLIT-SCREEN FROM REFERENCE)
// ==========================================================================

let isAuthModalOpen = false;
let authMode = 'login'; // 'login' or 'register'

export function renderAuthModal(containerId = 'auth-modal-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!isAuthModalOpen) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#061827]/85 backdrop-blur-md animate-in fade-in duration-200" onclick="if(event.target === this) window.closeAuthModal();">
      
      <!-- SPLIT MODAL CONTAINER -->
      <div class="relative w-full max-w-4xl bg-[#0B2235] border border-[#163959] rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col md:flex-row text-[#F3F6F9]">
        
        <!-- CLOSE BUTTON -->
        <button 
          onclick="window.closeAuthModal()" 
          class="absolute top-4 right-4 z-20 p-2 rounded-xl bg-[#061827]/60 hover:bg-[#061827] text-[#8FA5B8] hover:text-[#FFFFFF] border border-[#163959] transition-colors"
        >
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>

        <!-- LEFT SIDE: AUTH FORM -->
        <div class="w-full md:w-7/12 p-6 sm:p-10 flex flex-col justify-between bg-[#0B2235]">
          <div>
            <!-- LOGO & TOGGLE HEADER -->
            <div class="flex items-center justify-between mb-8 pb-4 border-b border-[#163959]/60">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-[#087CFF] flex items-center justify-center text-white">
                  <i data-lucide="gavel" class="w-4 h-4"></i>
                </div>
                <span class="font-extrabold text-lg tracking-tight text-white font-heading">Bid My Car</span>
              </div>

              <div class="text-xs text-[#8FA5B8]">
                ${authMode === 'login' ? `
                  <span>Don't have an account? </span>
                  <button onclick="window.switchAuthMode('register')" class="text-[#39A7FF] hover:underline font-bold">Sign Up</button>
                ` : `
                  <span>Already have an account? </span>
                  <button onclick="window.switchAuthMode('login')" class="text-[#39A7FF] hover:underline font-bold">Login</button>
                `}
              </div>
            </div>

            ${authMode === 'login' ? renderLoginForm() : renderRegisterForm()}

            <!-- SOCIAL LOGINS -->
            <div class="mt-6 pt-6 border-t border-[#163959]/60">
              <div class="text-center text-[11px] text-[#8FA5B8] mb-3">or continue with</div>
              <div class="grid grid-cols-2 gap-3">
                <button class="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#061827] border border-[#163959] hover:border-[#39A7FF]/50 text-xs font-semibold text-[#F3F6F9] transition-colors">
                  <svg class="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Google</span>
                </button>

                <button class="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#061827] border border-[#163959] hover:border-[#39A7FF]/50 text-xs font-semibold text-[#F3F6F9] transition-colors">
                  <svg class="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        <!-- RIGHT SIDE: HERO IMAGE & BANNER -->
        <div class="hidden md:flex md:w-5/12 relative bg-[#061827] overflow-hidden flex-col justify-end p-8 border-l border-[#163959]/50">
          <img 
            src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80" 
            alt="Luxury Automobile" 
            class="absolute inset-0 w-full h-full object-cover opacity-35 filter contrast-125"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#061827] via-[#0B2235]/70 to-transparent"></div>

          <div class="relative z-10 space-y-4">
            ${authMode === 'login' ? `
              <div>
                <h3 class="text-2xl font-black text-white font-heading leading-tight">Drive Your Dreams</h3>
                <p class="text-xs text-[#8FA5B8] mt-2 leading-relaxed">
                  Join thousands of verified bidders, dealers, and collectors who trust Bid My Car for transparent auto auctions.
                </p>
              </div>
            ` : `
              <div>
                <span class="text-[10px] font-bold uppercase tracking-widest text-[#39A7FF] block mb-1">Buy. Sell. Bid.</span>
                <h3 class="text-2xl font-black text-white font-heading leading-tight">Be Part of Something Bigger</h3>
                
                <div class="space-y-2.5 mt-4 text-xs text-[#F3F6F9]">
                  <div class="flex items-center gap-2">
                    <i data-lucide="check-circle-2" class="w-4 h-4 text-[#39A7FF]"></i>
                    <span>Access to thousands of verified vehicles</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <i data-lucide="check-circle-2" class="w-4 h-4 text-[#39A7FF]"></i>
                    <span>Secure and transparent bidding process</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <i data-lucide="check-circle-2" class="w-4 h-4 text-[#39A7FF]"></i>
                    <span>Support whenever you need it</span>
                  </div>
                </div>
              </div>
            `}
          </div>
        </div>

      </div>

    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// LOGIN FORM TEMPLATE
function renderLoginForm() {
  return `
    <div>
      <h2 class="text-2xl font-black text-white font-heading">Welcome Back</h2>
      <p class="text-xs text-[#8FA5B8] mt-1 mb-6">Login to your account to continue</p>

      <form onsubmit="event.preventDefault(); window.handleAuthSubmit();" class="space-y-4">
        <div>
          <label class="block text-[11px] font-semibold text-[#8FA5B8] mb-1.5">Email Address</label>
          <div class="relative">
            <i data-lucide="mail" class="w-4 h-4 text-[#8FA5B8] absolute left-3.5 top-1/2 -translate-y-1/2"></i>
            <input 
              type="email" 
              required
              placeholder="Enter your email"
              class="w-full bg-[#061827] text-xs text-[#F3F6F9] placeholder-[#8FA5B8]/60 pl-10 pr-4 py-3 rounded-xl border border-[#163959] focus:outline-none focus:border-[#087CFF] focus:ring-1 focus:ring-[#087CFF]"
            />
          </div>
        </div>

        <div>
          <label class="block text-[11px] font-semibold text-[#8FA5B8] mb-1.5">Password</label>
          <div class="relative">
            <i data-lucide="lock" class="w-4 h-4 text-[#8FA5B8] absolute left-3.5 top-1/2 -translate-y-1/2"></i>
            <input 
              type="password" 
              required
              placeholder="Enter your password"
              class="w-full bg-[#061827] text-xs text-[#F3F6F9] placeholder-[#8FA5B8]/60 pl-10 pr-4 py-3 rounded-xl border border-[#163959] focus:outline-none focus:border-[#087CFF] focus:ring-1 focus:ring-[#087CFF]"
            />
          </div>
        </div>

        <div class="flex items-center justify-between text-xs pt-1">
          <label class="flex items-center gap-2 cursor-pointer text-[#8FA5B8]">
            <input type="checkbox" class="rounded bg-[#061827] border-[#163959] text-[#087CFF] focus:ring-0" />
            <span>Remember me</span>
          </label>
          <a href="#" class="text-[#39A7FF] hover:underline font-semibold">Forgot password?</a>
        </div>

        <button 
          type="submit" 
          class="w-full py-3 rounded-xl bg-[#087CFF] hover:bg-[#006de6] text-white font-bold text-xs shadow-lg shadow-[#087CFF]/25 hover:shadow-[#087CFF]/40 transition-all flex items-center justify-center gap-2 mt-2"
        >
          <span>Login</span>
        </button>
      </form>
    </div>
  `;
}

// REGISTER FORM TEMPLATE
function renderRegisterForm() {
  return `
    <div>
      <h2 class="text-2xl font-black text-white font-heading">Create Your Account</h2>
      <p class="text-xs text-[#8FA5B8] mt-1 mb-5">Join Bid My Car and start bidding today</p>

      <form onsubmit="event.preventDefault(); window.handleAuthSubmit();" class="space-y-3">
        <div>
          <label class="block text-[11px] font-semibold text-[#8FA5B8] mb-1">Full Name</label>
          <input 
            type="text" 
            required
            placeholder="Enter your full name"
            class="w-full bg-[#061827] text-xs text-[#F3F6F9] placeholder-[#8FA5B8]/60 px-3.5 py-2.5 rounded-xl border border-[#163959] focus:outline-none focus:border-[#087CFF]"
          />
        </div>

        <div>
          <label class="block text-[11px] font-semibold text-[#8FA5B8] mb-1">Email Address</label>
          <input 
            type="email" 
            required
            placeholder="Enter your email"
            class="w-full bg-[#061827] text-xs text-[#F3F6F9] placeholder-[#8FA5B8]/60 px-3.5 py-2.5 rounded-xl border border-[#163959] focus:outline-none focus:border-[#087CFF]"
          />
        </div>

        <div>
          <label class="block text-[11px] font-semibold text-[#8FA5B8] mb-1">Phone Number (+91)</label>
          <input 
            type="tel" 
            required
            placeholder="Enter your mobile number"
            class="w-full bg-[#061827] text-xs text-[#F3F6F9] placeholder-[#8FA5B8]/60 px-3.5 py-2.5 rounded-xl border border-[#163959] focus:outline-none focus:border-[#087CFF]"
          />
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-[11px] font-semibold text-[#8FA5B8] mb-1">Password</label>
            <input 
              type="password" 
              required
              placeholder="Create password"
              class="w-full bg-[#061827] text-xs text-[#F3F6F9] placeholder-[#8FA5B8]/60 px-3.5 py-2.5 rounded-xl border border-[#163959] focus:outline-none focus:border-[#087CFF]"
            />
          </div>
          <div>
            <label class="block text-[11px] font-semibold text-[#8FA5B8] mb-1">Confirm Password</label>
            <input 
              type="password" 
              required
              placeholder="Confirm password"
              class="w-full bg-[#061827] text-xs text-[#F3F6F9] placeholder-[#8FA5B8]/60 px-3.5 py-2.5 rounded-xl border border-[#163959] focus:outline-none focus:border-[#087CFF]"
            />
          </div>
        </div>

        <button 
          type="submit" 
          class="w-full py-3 rounded-xl bg-[#087CFF] hover:bg-[#006de6] text-white font-bold text-xs shadow-lg shadow-[#087CFF]/25 hover:shadow-[#087CFF]/40 transition-all flex items-center justify-center gap-2 mt-3"
        >
          <span>Register</span>
        </button>
      </form>
    </div>
  `;
}

// Global Hooks
export function openAuthModal(mode = 'login') {
  authMode = mode;
  isAuthModalOpen = true;
  renderAuthModal();
}

export function closeAuthModal() {
  isAuthModalOpen = false;
  renderAuthModal();
}

window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;

window.switchAuthMode = (mode) => {
  authMode = mode;
  renderAuthModal();
};

window.handleAuthSubmit = () => {
  closeAuthModal();
  // Show welcome toast
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-6 right-6 z-50 bg-[#0B2235] border border-[#087CFF] text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-4';
  toast.innerHTML = `
    <i data-lucide="check-circle" class="w-4 h-4 text-[#39A7FF]"></i>
    <span>Welcome! You are now signed in to Bid My Car.</span>
  `;
  document.body.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();
  setTimeout(() => toast.remove(), 3000);
};
