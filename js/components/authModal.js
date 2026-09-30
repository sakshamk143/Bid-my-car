// ==========================================================================
// BID MY CAR - AUTH MODAL
// LOGIN + REGISTER CONNECTED TO BACKEND
// PHONE NUMBER SUPPORTED
// ==========================================================================

let isAuthModalOpen = false;
let authMode = "login";

// ==========================================================================
// BACKEND CONFIG
// ==========================================================================

const API_BASE_URL = "http://localhost:5000/api";

// ==========================================================================
// MAIN AUTH MODAL
// ==========================================================================

export function renderAuthModal(containerId = "auth-modal-container") {

  const container = document.getElementById(containerId);

  if (!container) {
    console.error("Auth modal container not found:", containerId);
    return;
  }

  if (!isAuthModalOpen) {
    container.innerHTML = "";
    return;
  }

  // ------------------------------------------------------------------------
  // MODE SWITCH
  // ------------------------------------------------------------------------

  let modeSwitchHTML = "";

  if (authMode === "login") {

    modeSwitchHTML = `
      <span>Don't have an account? </span>

      <button
        type="button"
        onclick="window.switchAuthMode('register')"
        class="text-[#39A7FF] hover:underline font-bold"
      >
        Sign Up
      </button>
    `;

  } else {

    modeSwitchHTML = `
      <span>Already have an account? </span>

      <button
        type="button"
        onclick="window.switchAuthMode('login')"
        class="text-[#39A7FF] hover:underline font-bold"
      >
        Login
      </button>
    `;
  }

  // ------------------------------------------------------------------------
  // FORM
  // ------------------------------------------------------------------------

  let formHTML = "";

  if (authMode === "login") {
    formHTML = renderLoginForm();
  } else {
    formHTML = renderRegisterForm();
  }

  // ------------------------------------------------------------------------
  // RIGHT SIDE HERO
  // ------------------------------------------------------------------------

  let heroHTML = "";

  if (authMode === "login") {

    heroHTML = `
      <div>

        <h3
          class="text-2xl font-black text-white font-heading leading-tight"
        >
          Drive Your Dreams
        </h3>

        <p
          class="text-xs text-[#8FA5B8] mt-2 leading-relaxed"
        >
          Join thousands of verified bidders, dealers, and collectors
          who trust Bid My Car for transparent auto auctions.
        </p>

      </div>
    `;

  } else {

    heroHTML = `
      <div>

        <span
          class="text-[10px] font-bold uppercase tracking-widest
          text-[#39A7FF] block mb-1"
        >
          Buy. Sell. Bid.
        </span>

        <h3
          class="text-2xl font-black text-white
          font-heading leading-tight"
        >
          Be Part of Something Bigger
        </h3>

        <div
          class="space-y-2.5 mt-4 text-xs text-[#F3F6F9]"
        >

          <div class="flex items-center gap-2">

            <i
              data-lucide="check-circle-2"
              class="w-4 h-4 text-[#39A7FF]"
            ></i>

            <span>
              Access to thousands of verified vehicles
            </span>

          </div>

          <div class="flex items-center gap-2">

            <i
              data-lucide="check-circle-2"
              class="w-4 h-4 text-[#39A7FF]"
            ></i>

            <span>
              Secure and transparent bidding process
            </span>

          </div>

          <div class="flex items-center gap-2">

            <i
              data-lucide="check-circle-2"
              class="w-4 h-4 text-[#39A7FF]"
            ></i>

            <span>
              Support whenever you need it
            </span>

          </div>

        </div>

      </div>
    `;
  }

  // ------------------------------------------------------------------------
  // COMPLETE MODAL
  // ------------------------------------------------------------------------

  container.innerHTML = `

    <div
      class="fixed inset-0 z-50 flex items-center justify-center
      p-3 sm:p-6 overflow-y-auto
      bg-[#061827]/85 backdrop-blur-md"
      onclick="
        if (event.target === this) {
          window.closeAuthModal();
        }
      "
    >

      <!-- MODAL -->

      <div
        class="relative w-full max-w-4xl
        bg-[#0B2235]
        border border-[#163959]
        rounded-3xl
        shadow-2xl
        overflow-hidden
        my-auto
        flex flex-col md:flex-row
        text-[#F3F6F9]"
      >

        <!-- CLOSE BUTTON -->

        <button
          type="button"
          onclick="window.closeAuthModal()"
          class="
            absolute top-4 right-4 z-20
            p-2 rounded-xl
            bg-[#061827]/60
            hover:bg-[#061827]
            text-[#8FA5B8]
            hover:text-white
            border border-[#163959]
            transition-colors
          "
        >

          <i
            data-lucide="x"
            class="w-4 h-4"
          ></i>

        </button>

        <!-- ============================================================
             LEFT SIDE
        ============================================================= -->

        <div
          class="
            w-full md:w-7/12
            p-6 sm:p-10
            flex flex-col justify-between
            bg-[#0B2235]
          "
        >

          <div>

            <!-- LOGO + MODE SWITCH -->

            <div
              class="
                flex items-center justify-between
                mb-8 pb-4
                border-b border-[#163959]/60
              "
            >

              <!-- LOGO -->

              <div class="flex items-center gap-2">

                <div
                  class="
                    w-8 h-8
                    rounded-lg
                    bg-[#087CFF]
                    flex items-center justify-center
                    text-white
                  "
                >

                  <i
                    data-lucide="gavel"
                    class="w-4 h-4"
                  ></i>

                </div>

                <span
                  class="
                    font-extrabold
                    text-lg
                    tracking-tight
                    text-white
                    font-heading
                  "
                >
                  Bid My Car
                </span>

              </div>

              <!-- MODE SWITCH -->

              <div
                class="text-xs text-[#8FA5B8]"
              >

                ${modeSwitchHTML}

              </div>

            </div>

            <!-- FORM -->

            ${formHTML}

            <!-- ========================================================
                 SOCIAL LOGIN
            ========================================================= -->

            <div
              class="
                mt-6 pt-6
                border-t border-[#163959]/60
              "
            >

              <div
                class="
                  text-center
                  text-[11px]
                  text-[#8FA5B8]
                  mb-3
                "
              >
                or continue with
              </div>

              <div
                class="grid grid-cols-2 gap-3"
              >

                <!-- GOOGLE -->

                <button
                  type="button"
                  onclick="
                    window.showAuthMessage(
                      'Google login will be connected later.'
                    )
                  "
                  class="
                    flex items-center justify-center gap-2
                    py-2.5 px-4
                    rounded-xl
                    bg-[#061827]
                    border border-[#163959]
                    hover:border-[#39A7FF]/50
                    text-xs font-semibold
                    text-[#F3F6F9]
                    transition-colors
                  "
                >

                  <svg
                    class="w-4 h-4"
                    viewBox="0 0 24 24"
                  >

                    <path
                      fill="#4285F4"
                      d="
                        M22.56 12.25
                        c0-.78-.07-1.53-.2-2.25
                        H12v4.26h5.92
                        c-.26 1.37-1.04 2.53-2.21 3.31
                        v2.77h3.57
                        c2.08-1.92 3.28-4.74 3.28-8.09z
                      "
                    />

                    <path
                      fill="#34A853"
                      d="
                        M12 23
                        c2.97 0 5.46-.98 7.28-2.66
                        l-3.57-2.77
                        c-.98.66-2.23 1.06-3.71 1.06
                        -2.86 0-5.29-1.93-6.16-4.53
                        H2.18v2.84
                        C3.99 20.53 7.7 23 12 23z
                      "
                    />

                    <path
                      fill="#FBBC05"
                      d="
                        M5.84 14.09
                        c-.22-.66-.35-1.36-.35-2.09
                        s.13-1.43.35-2.09
                        V7.06H2.18
                        C1.43 8.55 1 10.22 1 12
                        s.43 3.45 1.18 4.94
                        l2.85-2.22.81-.63z
                      "
                    />

                    <path
                      fill="#EA4335"
                      d="
                        M12 5.38
                        c1.62 0 3.06.56 4.21 1.64
                        l3.15-3.15
                        C17.45 2.09 14.97 1 12 1
                        7.7 1 3.99 3.47 2.18 7.06
                        l3.66 2.84
                        c.87-2.6 3.3-4.52 6.16-4.52z
                      "
                    />

                  </svg>

                  <span>Google</span>

                </button>

                <!-- FACEBOOK -->

                <button
                  type="button"
                  onclick="
                    window.showAuthMessage(
                      'Facebook login will be connected later.'
                    )
                  "
                  class="
                    flex items-center justify-center gap-2
                    py-2.5 px-4
                    rounded-xl
                    bg-[#061827]
                    border border-[#163959]
                    hover:border-[#39A7FF]/50
                    text-xs font-semibold
                    text-[#F3F6F9]
                    transition-colors
                  "
                >

                  <svg
                    class="w-4 h-4 fill-[#1877F2]"
                    viewBox="0 0 24 24"
                  >

                    <path
                      d="
                        M24 12.073
                        c0-6.627-5.373-12-12-12
                        s-12 5.373-12 12
                        c0 5.99 4.388 10.954 10.125 11.854
                        v-8.385H7.078v-3.47h3.047V9.43
                        c0-3.007 1.792-4.669 4.533-4.669
                        1.312 0 2.686.235 2.686.235v2.953H15.83
                        c-1.491 0-1.956.925-1.956 1.874v2.25h3.328
                        l-.532 3.47h-2.796v8.385
                        C19.612 23.027 24 18.062 24 12.073z
                      "
                    ></path>

                  </svg>

                  <span>Facebook</span>

                </button>

              </div>

            </div>

          </div>

        </div>

        <!-- ============================================================
             RIGHT SIDE
        ============================================================= -->

        <div
          class="
            hidden md:flex
            md:w-5/12
            relative
            bg-[#061827]
            overflow-hidden
            flex-col
            justify-end
            p-8
            border-l border-[#163959]/50
          "
        >

          <img
            src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80"
            alt="Luxury Automobile"
            class="
              absolute inset-0
              w-full h-full
              object-cover
              opacity-35
              contrast-125
            "
          />

          <div
            class="
              absolute inset-0
              bg-gradient-to-t
              from-[#061827]
              via-[#0B2235]/70
              to-transparent
            "
          ></div>

          <div
            class="
              relative z-10 space-y-4
            "
          >

            ${heroHTML}

          </div>

        </div>

      </div>

    </div>
  `;

  // ------------------------------------------------------------------------
  // LUCIDE ICONS
  // ------------------------------------------------------------------------

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// ==========================================================================
// LOGIN FORM
// ==========================================================================

function renderLoginForm() {

  return `

    <div>

      <h2
        class="
          text-2xl
          font-black
          text-white
          font-heading
        "
      >
        Welcome Back
      </h2>

      <p
        class="
          text-xs
          text-[#8FA5B8]
          mt-1
          mb-6
        "
      >
        Login to your account to continue
      </p>

      <form
        id="login-form"
        onsubmit="
          event.preventDefault();
          window.handleLoginSubmit();
        "
        class="space-y-4"
      >

        <!-- EMAIL -->

        <div>

          <label
            class="
              block
              text-[11px]
              font-semibold
              text-[#8FA5B8]
              mb-1.5
            "
          >
            Email Address
          </label>

          <div class="relative">

            <i
              data-lucide="mail"
              class="
                w-4 h-4
                text-[#8FA5B8]
                absolute
                left-3.5
                top-1/2
                -translate-y-1/2
              "
            ></i>

            <input
              id="login-email"
              name="email"
              type="email"
              required
              autocomplete="email"
              placeholder="Enter your email"
              class="
                w-full
                bg-[#061827]
                text-xs
                text-[#F3F6F9]
                placeholder-[#8FA5B8]/60
                pl-10
                pr-4
                py-3
                rounded-xl
                border border-[#163959]
                focus:outline-none
                focus:border-[#087CFF]
                focus:ring-1
                focus:ring-[#087CFF]
              "
            />

          </div>

        </div>

        <!-- PASSWORD -->

        <div>

          <label
            class="
              block
              text-[11px]
              font-semibold
              text-[#8FA5B8]
              mb-1.5
            "
          >
            Password
          </label>

          <div class="relative">

            <i
              data-lucide="lock"
              class="
                w-4 h-4
                text-[#8FA5B8]
                absolute
                left-3.5
                top-1/2
                -translate-y-1/2
              "
            ></i>

            <input
              id="login-password"
              name="password"
              type="password"
              required
              autocomplete="current-password"
              placeholder="Enter your password"
              class="
                w-full
                bg-[#061827]
                text-xs
                text-[#F3F6F9]
                placeholder-[#8FA5B8]/60
                pl-10
                pr-4
                py-3
                rounded-xl
                border border-[#163959]
                focus:outline-none
                focus:border-[#087CFF]
                focus:ring-1
                focus:ring-[#087CFF]
              "
            />

          </div>

        </div>

        <!-- REMEMBER ME -->

        <div
          class="
            flex items-center
            justify-between
            text-xs
            pt-1
          "
        >

          <label
            class="
              flex items-center gap-2
              cursor-pointer
              text-[#8FA5B8]
            "
          >

            <input
              id="remember-me"
              type="checkbox"
              class="
                rounded
                bg-[#061827]
                border-[#163959]
                text-[#087CFF]
                focus:ring-0
              "
            />

            <span>
              Remember me
            </span>

          </label>

          <button
            type="button"
            onclick="window.showForgotPassword()"
            class="
              text-[#39A7FF]
              hover:underline
              font-semibold
            "
          >
            Forgot password?
          </button>

        </div>

        <!-- LOGIN BUTTON -->

        <button
          id="login-submit-button"
          type="submit"
          class="
            w-full
            py-3
            rounded-xl
            bg-[#087CFF]
            hover:bg-[#006de6]
            disabled:opacity-50
            disabled:cursor-not-allowed
            text-white
            font-bold
            text-xs
            shadow-lg
            shadow-[#087CFF]/25
            hover:shadow-[#087CFF]/40
            transition-all
            flex
            items-center
            justify-center
            gap-2
            mt-2
          "
        >

          <i
            data-lucide="log-in"
            class="w-4 h-4"
          ></i>

          <span>
            Login
          </span>

        </button>

      </form>

    </div>
  `;
}

// ==========================================================================
// REGISTER FORM
// ==========================================================================

function renderRegisterForm() {

  return `

    <div>

      <h2
        class="
          text-2xl
          font-black
          text-white
          font-heading
        "
      >
        Create Your Account
      </h2>

      <p
        class="
          text-xs
          text-[#8FA5B8]
          mt-1
          mb-5
        "
      >
        Join Bid My Car and start bidding today
      </p>

      <form
        id="register-form"
        onsubmit="
          event.preventDefault();
          window.handleRegisterSubmit();
        "
        class="space-y-3"
      >

        <!-- NAME -->

        <div>

          <label
            class="
              block
              text-[11px]
              font-semibold
              text-[#8FA5B8]
              mb-1
            "
          >
            Full Name
          </label>

          <input
            id="register-name"
            name="name"
            type="text"
            required
            autocomplete="name"
            placeholder="Enter your full name"
            class="
              w-full
              bg-[#061827]
              text-xs
              text-[#F3F6F9]
              placeholder-[#8FA5B8]/60
              px-3.5
              py-2.5
              rounded-xl
              border border-[#163959]
              focus:outline-none
              focus:border-[#087CFF]
            "
          />

        </div>

        <!-- EMAIL -->

        <div>

          <label
            class="
              block
              text-[11px]
              font-semibold
              text-[#8FA5B8]
              mb-1
            "
          >
            Email Address
          </label>

          <input
            id="register-email"
            name="email"
            type="email"
            required
            autocomplete="email"
            placeholder="Enter your email"
            class="
              w-full
              bg-[#061827]
              text-xs
              text-[#F3F6F9]
              placeholder-[#8FA5B8]/60
              px-3.5
              py-2.5
              rounded-xl
              border border-[#163959]
              focus:outline-none
              focus:border-[#087CFF]
            "
          />

        </div>

        <!-- ==========================================================
             PHONE NUMBER
        =========================================================== -->

        <div>

          <label
            class="
              block
              text-[11px]
              font-semibold
              text-[#8FA5B8]
              mb-1
            "
          >
            Phone Number (+91)
          </label>

          <div class="relative">

            <i
              data-lucide="phone"
              class="
                w-4 h-4
                text-[#8FA5B8]
                absolute
                left-3
                top-1/2
                -translate-y-1/2
              "
            ></i>

            <input
              id="register-phone"
              name="phone"
              type="tel"
              required
              inputmode="numeric"
              autocomplete="tel"
              maxlength="10"
              minlength="10"
              pattern="[0-9]{10}"
              placeholder="Enter 10-digit mobile number"
              class="
                w-full
                bg-[#061827]
                text-xs
                text-[#F3F6F9]
                placeholder-[#8FA5B8]/60
                pl-9
                pr-3.5
                py-2.5
                rounded-xl
                border border-[#163959]
                focus:outline-none
                focus:border-[#087CFF]
              "
              oninput="window.validatePhoneInput(this)"
            />

          </div>

          <p
            id="register-phone-error"
            class="
              hidden
              text-[9px]
              text-[#EF4444]
              mt-1
            "
          >
            Invalid character. Please enter numbers only.
          </p>

          <p
            class="
              text-[9px]
              text-[#8FA5B8]/70
              mt-1
            "
          >
            Your phone number is stored securely and won't be publicly displayed.
          </p>

        </div>

        <!-- PASSWORDS -->

        <div
          class="grid grid-cols-2 gap-2"
        >

          <div>

            <label
              class="
                block
                text-[11px]
                font-semibold
                text-[#8FA5B8]
                mb-1
              "
            >
              Password
            </label>

            <input
              id="register-password"
              name="password"
              type="password"
              required
              minlength="8"
              autocomplete="new-password"
              placeholder="Create password"
              class="
                w-full
                bg-[#061827]
                text-xs
                text-[#F3F6F9]
                placeholder-[#8FA5B8]/60
                px-3.5
                py-2.5
                rounded-xl
                border border-[#163959]
                focus:outline-none
                focus:border-[#087CFF]
              "
            />

          </div>

          <div>

            <label
              class="
                block
                text-[11px]
                font-semibold
                text-[#8FA5B8]
                mb-1
              "
            >
              Confirm Password
            </label>

            <input
              id="register-confirm-password"
              name="confirmPassword"
              type="password"
              required
              minlength="8"
              autocomplete="new-password"
              placeholder="Confirm password"
              class="
                w-full
                bg-[#061827]
                text-xs
                text-[#F3F6F9]
                placeholder-[#8FA5B8]/60
                px-3.5
                py-2.5
                rounded-xl
                border border-[#163959]
                focus:outline-none
                focus:border-[#087CFF]
              "
            />

          </div>

        </div>

        <!-- REGISTER BUTTON -->

        <button
          id="register-submit-button"
          type="submit"
          class="
            w-full
            py-3
            rounded-xl
            bg-[#087CFF]
            hover:bg-[#006de6]
            disabled:opacity-50
            disabled:cursor-not-allowed
            text-white
            font-bold
            text-xs
            shadow-lg
            shadow-[#087CFF]/25
            hover:shadow-[#087CFF]/40
            transition-all
            flex
            items-center
            justify-center
            gap-2
            mt-3
          "
        >

          <i
            data-lucide="user-plus"
            class="w-4 h-4"
          ></i>

          <span>
            Register
          </span>

        </button>

      </form>

    </div>
  `;
}

// ==========================================================================
// PHONE INPUT VALIDATION
// ==========================================================================

function validatePhoneInput(input) {

  const originalValue = input.value;

  // Keep only numbers
  const cleanedValue = originalValue.replace(/\D/g, "");

  const errorElement =
    document.getElementById("register-phone-error");

  // Detect invalid characters
  if (originalValue !== cleanedValue) {

    if (errorElement) {
      errorElement.classList.remove("hidden");
    }

  } else {

    if (errorElement) {
      errorElement.classList.add("hidden");
    }
  }

  // Limit to 10 digits
  input.value = cleanedValue.slice(0, 10);
}

// ==========================================================================
// REGISTER → BACKEND
// POST /api/auth/register
// ==========================================================================

async function handleRegisterSubmit() {

  const name =
    document.getElementById("register-name")?.value.trim();

  const email =
    document.getElementById("register-email")?.value.trim();

  const phone =
    document.getElementById("register-phone")?.value.trim();

  const password =
    document.getElementById("register-password")?.value;

  const confirmPassword =
    document.getElementById("register-confirm-password")?.value;

  // ------------------------------------------------------------------------
  // REQUIRED FIELD VALIDATION
  // ------------------------------------------------------------------------

  if (!name || !email || !phone || !password || !confirmPassword) {

    showAuthToast(
      "Please fill in all required fields.",
      "error"
    );

    return;
  }

  // ------------------------------------------------------------------------
  // PHONE VALIDATION
  // ------------------------------------------------------------------------

  if (!/^\d{10}$/.test(phone)) {

    showAuthToast(
      "Please enter a valid 10-digit mobile number.",
      "error"
    );

    return;
  }

  // ------------------------------------------------------------------------
  // PASSWORD MATCH
  // ------------------------------------------------------------------------

  if (password !== confirmPassword) {

    showAuthToast(
      "Passwords do not match.",
      "error"
    );

    return;
  }

  // ------------------------------------------------------------------------
  // PASSWORD LENGTH
  // ------------------------------------------------------------------------

  if (password.length < 8) {

    showAuthToast(
      "Password must be at least 8 characters long.",
      "error"
    );

    return;
  }

  const button =
    document.getElementById("register-submit-button");

  setButtonLoading(
    button,
    true,
    "Creating account..."
  );

  try {

    const response = await fetch(
      `${API_BASE_URL}/auth/register`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          password: password
        })
      }
    );

    let data = {};

    try {
      data = await response.json();
    } catch (jsonError) {
      data = {};
    }

    if (!response.ok || !data.success) {

      showAuthToast(
        data.message || "Registration failed.",
        "error"
      );

      setButtonLoading(
        button,
        false,
        "Register"
      );

      return;
    }

    setButtonLoading(
      button,
      false,
      "Register"
    );

    showAuthToast(
      data.message ||
      "Registration successful. Please verify your email.",
      "success"
    );

    setTimeout(() => {

      authMode = "login";

      renderAuthModal();

    }, 2500);

  } catch (error) {

    console.error(
      "Registration request failed:",
      error
    );

    showAuthToast(
      "Cannot connect to the backend. Make sure the server is running.",
      "error"
    );

    setButtonLoading(
      button,
      false,
      "Register"
    );
  }
}

// ==========================================================================
// LOGIN → BACKEND
// POST /api/auth/login
// ==========================================================================

async function handleLoginSubmit() {

  const email =
    document.getElementById("login-email")?.value.trim();

  const password =
    document.getElementById("login-password")?.value;

  if (!email || !password) {

    showAuthToast(
      "Please enter your email and password.",
      "error"
    );

    return;
  }

  const button =
    document.getElementById("login-submit-button");

  setButtonLoading(
    button,
    true,
    "Logging in..."
  );

  try {

    const response = await fetch(
      `${API_BASE_URL}/auth/login`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          email: email,
          password: password
        })
      }
    );

    let data = {};

    try {
      data = await response.json();
    } catch (jsonError) {
      data = {};
    }

    if (!response.ok || !data.success) {

      showAuthToast(
        data.message || "Login failed.",
        "error"
      );

      setButtonLoading(
        button,
        false,
        "Login"
      );

      return;
    }

    const token = data.token;
    const user = data.user;

    if (!token) {

      console.error(
        "Backend login response:",
        data
      );

      showAuthToast(
        "Login succeeded but no session token was received.",
        "error"
      );

      setButtonLoading(
        button,
        false,
        "Login"
      );

      return;
    }

    // ----------------------------------------------------------------------
    // REMEMBER ME
    // ----------------------------------------------------------------------

    const rememberMe =
      document.getElementById("remember-me")?.checked;

    if (rememberMe) {

      localStorage.setItem(
        "bidmycar_token",
        token
      );

      sessionStorage.removeItem(
        "bidmycar_token"
      );

    } else {

      sessionStorage.setItem(
        "bidmycar_token",
        token
      );

      localStorage.removeItem(
        "bidmycar_token"
      );
    }

    // ----------------------------------------------------------------------
    // SAVE USER
    // ----------------------------------------------------------------------

    localStorage.setItem(
      "bidmycar_user",
      JSON.stringify(user || {})
    );

    setButtonLoading(
      button,
      false,
      "Login"
    );

    showAuthToast(
      `Welcome back, ${(user && user.name) || "User"}!`,
      "success"
    );

    setTimeout(() => {

      closeAuthModal();

      window.dispatchEvent(
        new CustomEvent(
          "bidmycar:auth-changed",
          {
            detail: {
              loggedIn: true,
              user: user || null
            }
          }
        )
      );

    }, 1000);

  } catch (error) {

    console.error(
      "Login request failed:",
      error
    );

    showAuthToast(
      "Cannot connect to the backend. Make sure the server is running.",
      "error"
    );

    setButtonLoading(
      button,
      false,
      "Login"
    );
  }
}

// ==========================================================================
// FORGOT PASSWORD
// ==========================================================================

function showForgotPassword() {

  showAuthToast(
    "Password reset will be connected next.",
    "info"
  );
}

// ==========================================================================
// AUTH TOAST
// ==========================================================================

function showAuthToast(
  message,
  type = "success"
) {

  const oldToast =
    document.getElementById(
      "bidmycar-auth-toast"
    );

  if (oldToast) {
    oldToast.remove();
  }

  let icon = "check-circle";
  let iconColor = "text-[#39A7FF]";

  if (type === "error") {

    icon = "alert-circle";
    iconColor = "text-[#EF4444]";

  } else if (type === "info") {

    icon = "info";
    iconColor = "text-[#F59E0B]";
  }

  const toast =
    document.createElement("div");

  toast.id =
    "bidmycar-auth-toast";

  toast.className = `
    fixed
    bottom-6
    right-6
    z-[100]
    bg-[#0B2235]
    border border-[#163959]
    text-white
    text-xs
    font-bold
    px-4
    py-3
    rounded-2xl
    shadow-2xl
    flex
    items-center
    gap-2
    max-w-sm
  `;

  toast.innerHTML = `

    <i
      data-lucide="${icon}"
      class="w-4 h-4 ${iconColor} shrink-0"
    ></i>

    <span>
      ${escapeHtml(message)}
    </span>

  `;

  document.body.appendChild(toast);

  if (window.lucide) {
    window.lucide.createIcons();
  }

  setTimeout(() => {

    if (toast.parentNode) {
      toast.remove();
    }

  }, 4000);
}

// ==========================================================================
// BUTTON LOADING
// ==========================================================================

function setButtonLoading(
  button,
  loading,
  text
) {

  if (!button) {
    return;
  }

  button.disabled = loading;

  if (loading) {

    button.innerHTML = `

      <i
        data-lucide="loader-2"
        class="w-4 h-4 animate-spin"
      ></i>

      <span>
        ${escapeHtml(text)}
      </span>

    `;

  } else {

    button.innerHTML = `
      <span>
        ${escapeHtml(text)}
      </span>
    `;
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// ==========================================================================
// ESCAPE HTML
// ==========================================================================

function escapeHtml(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ==========================================================================
// GET AUTH TOKEN
// ==========================================================================

export function getAuthToken() {

  return (
    localStorage.getItem("bidmycar_token") ||
    sessionStorage.getItem("bidmycar_token")
  );
}

// ==========================================================================
// GET STORED USER
// ==========================================================================

export function getStoredUser() {

  const user =
    localStorage.getItem("bidmycar_user");

  if (!user) {
    return null;
  }

  try {

    return JSON.parse(user);

  } catch (error) {

    console.error(
      "Invalid stored user data:",
      error
    );

    return null;
  }
}

// ==========================================================================
// LOGOUT
// ==========================================================================

export function logoutUser() {

  localStorage.removeItem(
    "bidmycar_token"
  );

  sessionStorage.removeItem(
    "bidmycar_token"
  );

  localStorage.removeItem(
    "bidmycar_user"
  );

  window.dispatchEvent(
    new CustomEvent(
      "bidmycar:auth-changed",
      {
        detail: {
          loggedIn: false,
          user: null
        }
      }
    )
  );

  showAuthToast(
    "You have been logged out.",
    "success"
  );
}

// ==========================================================================
// OPEN AUTH MODAL
// ==========================================================================

export function openAuthModal(
  mode = "login"
) {

  authMode =
    mode === "register"
      ? "register"
      : "login";

  isAuthModalOpen = true;

  renderAuthModal();
}

// ==========================================================================
// CLOSE AUTH MODAL
// ==========================================================================

export function closeAuthModal() {

  isAuthModalOpen = false;

  renderAuthModal();
}

// ==========================================================================
// GLOBAL HOOKS
// ==========================================================================

window.openAuthModal =
  openAuthModal;

window.closeAuthModal =
  closeAuthModal;

window.handleLoginSubmit =
  handleLoginSubmit;

window.handleRegisterSubmit =
  handleRegisterSubmit;

window.showForgotPassword =
  showForgotPassword;

window.showAuthMessage =
  showAuthToast;

window.logoutUser =
  logoutUser;

window.validatePhoneInput =
  validatePhoneInput;

// ==========================================================================
// SWITCH LOGIN / REGISTER
// ==========================================================================

window.switchAuthMode = (mode) => {

  authMode =
    mode === "register"
      ? "register"
      : "login";

  renderAuthModal();
};

// ==========================================================================
// BACKWARD COMPATIBILITY
// ==========================================================================

window.handleAuthSubmit = () => {

  if (authMode === "login") {

    handleLoginSubmit();

  } else {

    handleRegisterSubmit();

  }
};