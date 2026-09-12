# Bid My Car - Online Auto Auction & Marketplace

India's premier Copart-style vehicle auction platform frontend, designed specifically for the Indian automotive ecosystem with a distinctive **Midnight Auto Blue** visual identity.

---

## 🚗 Overview & Mission

**Bid My Car** bridges the gap between institutional vehicle sellers (General Insurance Companies, Banks/NBFCs, Government/Police Fleets) and buyers (Retail Consumers, Used Car Dealers, Auto Dismantlers, and Recyclers) across India.

### Key Capabilities Built in Frontend:
- **Copart-Style Live Virtual Bid Room**: Real-time simulated countdown clock, wooden gavel hammer audio synthesizer (via native Web Audio API), anti-sniping overtime extensions, one-click incremental bidding (`+₹2,000`, `+₹5,000`, `+₹10,000`, `+₹25,000`), and automated competitor bids from Mumbai, Pune, Delhi NCR, and Bengaluru.
- **Indian Regulatory & Parivahan Integration**: Displays Parivahan Vahan verification badges, RTO Smart Card status (DL, MH, KA, HR, TN, TS, GJ, WB), Form 29 & 30 ownership transfer dockets, inter-state NOC readiness, and Bank Hypothecation Form 35 clearance under the SARFAESI Act 2002.
- **Run & Drive Verification Engine**: High-fidelity sound effects synthesizer simulating engine cranking and idle revving on demand for every lot.
- **Copart Loss & Condition Classification**: Categorized into Clean Title Pre-Owned, Accidental Collision Salvage, Monsoon Flood Damaged, Bank / NBFC Repossessions, and Government / Municipal Disposals.
- **8 Pan-India Mega Auction Hubs**: Manesar (Delhi NCR), Bhiwandi (Mumbai), Nelamangala (Bengaluru), Shamshabad (Hyderabad), Sriperumbudur (Chennai), Sanand (Ahmedabad), Chakan (Pune), and Dankuni (Kolkata).
- **Interactive 2D Vehicle Damage Tagger**: Visual SVG vehicle blueprint allowing sellers to click on Front Bumper, Hood, Windshield, Doors, and Roof to visually tag minor dents vs major collision points.
- **Transparent Fee Schedule & Landing Cost Calculator**: Calculates hammer price, tiered buyer platform fees, yard gate pass / forklift loading fee (₹1,500), documentation fee (₹1,200), 18% statutory Indian GST, and flatbed freight to the buyer's pincode.
- **Enterprise Liquidation Desks**: Dedicated portals for Insurance Surveyors, Bank NPA Recovery Officers, and Government E-Auction cells complying with the National Vehicle Scrappage Policy (RVSF).

---

## 🎨 Theme: Midnight Auto Blue

- **Deep Midnight Obsidian**: `#040814`, `#050b17`, `#08122d`
- **Card Surfaces**: Glassmorphic `#0b1638` with backdrop blur and `#1b3473` borders
- **Electric Cobalt & Neon Cyan**: `#1d4ed8`, `#2563eb`, `#00f0ff`, `#38bdf8`
- **Auction Urgency States**:
  - Live / Winning / Reserve Met: Emerald Green (`#10b981`)
  - Warning / Overtime / Going Twice: Amber Gold (`#f59e0b`)
  - Outbid / Total Loss: Crimson Coral (`#ef4444`)

---

## 🚀 How to Run

Zero build steps, zero npm installs required. Runs instantly in any modern web browser:

1. Open `index.html` directly in your browser (Chrome, Edge, Opera, Firefox, Safari):
   ```bash
   # On Windows PowerShell:
   Start-Process index.html
   ```
2. Or serve using VS Code Live Server or any lightweight local HTTP server.

---

## 📁 Architecture & File Structure

```
├── index.html                   # Master entry point with CDN dependencies & semantic containers
├── css/
│   └── styles.css               # Midnight Auto Blue theme, timer rings, animations
├── js/
│   ├── app.js                   # Application coordinator & state subscriber
│   ├── state/
│   │   └── auctionStore.js      # Reactive state (filters, bids, live simulation, watchlist)
│   ├── data/
│   │   ├── mockVehicles.js      # Authentic Indian Copart dataset (XUV700, Thar, Nexon EV, etc.)
│   │   └── indianYards.js       # 8 Pan-India auction storage yards
│   ├── utils/
│   │   ├── audio.js             # Native Web Audio API synthesizer (gavel, chimes, engine)
│   │   └── formatters.js        # Indian Rupees (Lakhs/Crores), odometer, fees & logistics
│   └── components/
│       ├── navbar.js            # Live ticker, regional yard picker, search, role switcher
│       ├── hero.js              # High-energy hero, instant vehicle finder, live stats
│       ├── liveAuctionFloor.js  # Virtual Bid Room simulation with live hammer & rivals
│       ├── inventoryGrid.js     # Copart faceted filter sidebar & dual grid/table view
│       ├── vehicleModal.js      # 150-point inspection, damage map, fees calculator, RC status
│       ├── sellVehicleWizard.js # 3-step listing flow (Vahan RC lookup, 2D damage tagger)
│       ├── institutionalDesk.js # Insurance salvage, Bank repo, and Govt seized portal
│       ├── logisticsCalculator.js # Pan-India flatbed towing rate finder
│       ├── howItWorks.js        # Guide to buying/selling auto auctions in India
│       └── footer.js            # Yard directory, legal compliance, CMVR disclaimers
```
