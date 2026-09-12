// ==========================================================================
// BID MY CAR - ENTERPRISE AUTOMOTIVE MARKETPLACE & LIVE AUCTION PLATFORM
// Unified Single-Page Application Bundle (Compatible with file:// and http://)
// Palette: Midnight Navy (#061827), Deep Navy (#0B2235), Electric Blue (#087CFF),
// Sky Blue (#39A7FF), White (#FFFFFF), Light Gray (#F3F6F9)
// ==========================================================================

(function() {
  'use strict';

  // --- 1. PAN-INDIA AUCTION YARDS DATA ---
  const INDIAN_YARDS = [
    {
      id: "yard-del-manesar",
      code: "DEL-01",
      name: "Delhi NCR Mega Yard (Manesar)",
      city: "Gurugram / Manesar",
      state: "Haryana",
      address: "Plot 44-48, Sector 8, IMT Manesar, Delhi-Jaipur Expressway, Gurugram",
      capacity: 2400,
      currentInventory: 1845,
      primaryPhone: "+91 124 492 8800"
    },
    {
      id: "yard-bom-bhiwandi",
      code: "BOM-01",
      name: "Mumbai Logistics Hub (Bhiwandi)",
      city: "Mumbai / Thane",
      state: "Maharashtra",
      address: "Survey 112/4, Mumbai-Nashik Highway, Mankoli Naka, Bhiwandi",
      capacity: 3100,
      currentInventory: 2680,
      primaryPhone: "+91 22 6820 4400"
    },
    {
      id: "yard-blr-nelamangala",
      code: "BLR-01",
      name: "Bengaluru South Hub (Nelamangala)",
      city: "Bengaluru",
      state: "Karnataka",
      address: "NH-48 Tumkur Road, Near Nelamangala Toll Plaza, Bengaluru",
      capacity: 1800,
      currentInventory: 1420,
      primaryPhone: "+91 80 4710 9922"
    },
    {
      id: "yard-hyd-shamshabad",
      code: "HYD-01",
      name: "Hyderabad Central Yard (Shamshabad)",
      city: "Hyderabad",
      state: "Telangana",
      address: "Outer Ring Road Exit 16, Shamshabad, Hyderabad",
      capacity: 1500,
      currentInventory: 1120,
      primaryPhone: "+91 40 4918 3355"
    },
    {
      id: "yard-maa-sriperumbudur",
      code: "MAA-01",
      name: "Chennai Auto Corridor (Sriperumbudur)",
      city: "Chennai",
      state: "Tamil Nadu",
      address: "SIPCOT Industrial Park, Phase 2, Sriperumbudur",
      capacity: 1600,
      currentInventory: 1290,
      primaryPhone: "+91 44 6712 1100"
    },
    {
      id: "yard-pnq-chakan",
      code: "PNQ-01",
      name: "Pune Auto Cluster (Chakan)",
      city: "Pune",
      state: "Maharashtra",
      address: "MIDC Phase 4, Chakan Industrial Area, Pune",
      capacity: 1400,
      currentInventory: 980,
      primaryPhone: "+91 20 6698 2200"
    }
  ];

  // --- 2. VEHICLE DATABASE (INDIAN MARKET & SALVAGE COPART MOCK DATA) ---
  const INITIAL_VEHICLES = [
    {
      id: "bmc-2024-001",
      lotNumber: "10048291",
      title: "2023 Mahindra XUV700 AX7 L AWD",
      make: "Mahindra",
      model: "XUV700",
      year: 2023,
      variant: "AX7 Luxury Pack AWD Automatic",
      category: "suvs",
      fuel: "Diesel",
      transmission: "Automatic",
      odometer: 18450,
      regNo: "HR 26 DQ 8821",
      rtoState: "HR",
      rtoLocation: "Gurugram, Haryana",
      yardId: "yard-del-manesar",
      saleType: "live_auction",
      conditionType: "clean_used",
      conditionLabel: "Clean Title Pre-Owned",
      primaryDamage: "Minor Scratches",
      secondaryDamage: "None",
      estimatedRepairCost: 15000,
      estimatedRetailValue: 2450000,
      currentBid: 1480000,
      startingBid: 1100000,
      reservePrice: 1650000,
      reserveMet: false,
      buyItNowPrice: 1850000,
      bidCount: 28,
      auctionEndsInSeconds: 3840,
      sellerType: "individual",
      sellerName: "Col. Rajesh Verma (Retd.)",
      sellerRating: 4.9,
      isVerifiedSeller: true,
      hasCleanTitle: true,
      keysAvailable: "Yes (2 Keys)",
      runAndDrive: "Runs & Drives",
      engineNote: "Engine starts seamlessly on first crank. Transmission shifts smooth without jerk.",
      images: [
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80"
      ],
      features: ["Panoramic Sunroof", "ADAS Level 2", "Sony 12-Speaker 3D Audio", "Ventilated Seats", "Wireless Android Auto/Apple CarPlay"],
      documents: { rcStatus: "Original RC Smart Card Available", insurance: "Comprehensive Valid till Oct 2026", form29_30: "Signed & Ready", challanStatus: "Clear (No Active Challans)" },
      inspection: { overallScore: 92, engineCompression: "Excellent (185 PSI across all cylinders)", gearbox: "Smooth (TC fluid fresh)", chassis: "Unaltered & Rust-free", tyres: "Front: 6.2mm, Rear: 6.5mm", obdCode: "Clean (0 Fault Codes)" }
    },
    {
      id: "bmc-2024-002",
      lotNumber: "10048292",
      title: "2022 Tata Safari Dark Edition XZA+",
      make: "Tata",
      model: "Safari",
      year: 2022,
      variant: "XZA+ Dark Edition 6-Seater",
      category: "suvs",
      fuel: "Diesel",
      transmission: "Automatic",
      odometer: 32100,
      regNo: "MH 02 FM 1044",
      rtoState: "MH",
      rtoLocation: "Mumbai West, Maharashtra",
      yardId: "yard-bom-bhiwandi",
      saleType: "live_auction",
      conditionType: "insurance_salvage",
      conditionLabel: "Insurance Salvage (Repairable)",
      primaryDamage: "Front Bumper & Radiator Support",
      secondaryDamage: "Left Headlamp Assembly",
      estimatedRepairCost: 85000,
      estimatedRetailValue: 1980000,
      currentBid: 890000,
      startingBid: 650000,
      reservePrice: 950000,
      reserveMet: false,
      buyItNowPrice: null,
      bidCount: 34,
      auctionEndsInSeconds: 142,
      sellerType: "insurance",
      sellerName: "HDFC ERGO General Insurance Co.",
      sellerRating: 4.8,
      isVerifiedSeller: true,
      hasCleanTitle: false,
      keysAvailable: "Yes (1 Key)",
      runAndDrive: "Engine Starts Only",
      engineNote: "Kryotec 2.0L Diesel turns over smoothly. Coolant drained due to punctured radiator.",
      images: [
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80"
      ],
      features: ["Ventilated Captain Seats", "Akrish Black Alloy Wheels", "Terrain Response Modes", "JBL 9-Speaker Audio", "Wireless Charging"],
      documents: { rcStatus: "RC with Insurance Hypothecation NOC", insurance: "Cancelled (Salvage Lot)", form29_30: "IRDAI Salvage Transfer Forms Ready", challanStatus: "Clear" },
      inspection: { overallScore: 78, engineCompression: "Good (175 PSI)", gearbox: "Intact", chassis: "Main rails 100% straight. Subframe mount dented", tyres: "Front: 4.8mm, Rear: 5.1mm", obdCode: "P0117 (Coolant Temp Sensor open)" }
    },
    {
      id: "bmc-2024-003",
      lotNumber: "10048293",
      title: "2021 Hyundai Creta SX(O) 1.4 Turbo DCT",
      make: "Hyundai",
      model: "Creta",
      year: 2021,
      variant: "SX(O) Turbo Petrol Dual Clutch",
      category: "suvs",
      fuel: "Petrol",
      transmission: "Automatic",
      odometer: 27800,
      regNo: "KA 03 NC 4910",
      rtoState: "KA",
      rtoLocation: "Bengaluru East, Karnataka",
      yardId: "yard-blr-nelamangala",
      saleType: "buy_it_now",
      conditionType: "bank_repo",
      conditionLabel: "Bank Repossessed (Form 35 NOC)",
      primaryDamage: "Normal Wear & Tear",
      secondaryDamage: "None",
      estimatedRepairCost: 8000,
      estimatedRetailValue: 1420000,
      currentBid: 980000,
      startingBid: 850000,
      reservePrice: 980000,
      reserveMet: true,
      buyItNowPrice: 1050000,
      bidCount: 19,
      auctionEndsInSeconds: 9840,
      sellerType: "bank",
      sellerName: "Kotak Mahindra Prime Auto Loans",
      sellerRating: 5.0,
      isVerifiedSeller: true,
      hasCleanTitle: true,
      keysAvailable: "Yes (2 Keys)",
      runAndDrive: "Runs & Drives",
      engineNote: "Flawless turbo engine and smooth dual clutch shifts. AC chilled.",
      images: [
        "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80"
      ],
      features: ["Panoramic Sunroof", "Bose Premium Audio", "Air Purifier with AQI Display", "Electronic Parking Brake with Auto Hold"],
      documents: { rcStatus: "Form 35 Bank NOC Issued", insurance: "Third Party Valid till Dec 2025", form29_30: "SARFAESI Act Court Release Order Enclosed", challanStatus: "Clear" },
      inspection: { overallScore: 94, engineCompression: "Factory Spec (190 PSI)", gearbox: "Perfect", chassis: "Pristine", tyres: "5.5mm all four", obdCode: "Clean" }
    },
    {
      id: "bmc-2024-004",
      lotNumber: "10048294",
      title: "2020 BMW 3 Series 330i M Sport",
      make: "BMW",
      model: "3 Series",
      year: 2020,
      variant: "330i M Sport Steptronic",
      category: "luxury",
      fuel: "Petrol",
      transmission: "Automatic",
      odometer: 41200,
      regNo: "MH 01 DK 0077",
      rtoState: "MH",
      rtoLocation: "Mumbai Central, Maharashtra",
      yardId: "yard-bom-bhiwandi",
      saleType: "live_auction",
      conditionType: "clean_used",
      conditionLabel: "VIP Clean Title Luxury",
      primaryDamage: "None",
      secondaryDamage: "None",
      estimatedRepairCost: 5000,
      estimatedRetailValue: 3450000,
      currentBid: 2350000,
      startingBid: 1900000,
      reservePrice: 2400000,
      reserveMet: false,
      buyItNowPrice: 2650000,
      bidCount: 41,
      auctionEndsInSeconds: 2400,
      sellerType: "dealer",
      sellerName: "Apex Motors South Mumbai",
      sellerRating: 4.9,
      isVerifiedSeller: true,
      hasCleanTitle: true,
      keysAvailable: "Yes (2 Keys + Display Key)",
      runAndDrive: "Runs & Drives",
      engineNote: "2.0L TwinPower Turbo 258 BHP. Launch control functional, sports exhaust crisp.",
      images: [
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80"
      ],
      features: ["M Aerodynamics Package", "BMW Live Cockpit Professional", "Harman Kardon Surround Sound", "Ambient Lighting 6 Colors"],
      documents: { rcStatus: "Individual Single Owner RC", insurance: "Zero Dep Valid till Mar 2026", form29_30: "Ready", challanStatus: "Clear" },
      inspection: { overallScore: 96, engineCompression: "Factory Spec", gearbox: "ZF 8-Speed Flawless", chassis: "Mint", tyres: "Run-flat Bridgestone 5.8mm", obdCode: "Clean" }
    },
    {
      id: "bmc-2024-005",
      lotNumber: "10048295",
      title: "2022 Toyota Fortuner 4x4 AT Legender",
      make: "Toyota",
      model: "Fortuner",
      year: 2022,
      variant: "Legender 4x4 Automatic 2.8L",
      category: "suvs",
      fuel: "Diesel",
      transmission: "Automatic",
      odometer: 36500,
      regNo: "DL 1C AC 5599",
      rtoState: "DL",
      rtoLocation: "Delhi North, Mall Road",
      yardId: "yard-del-manesar",
      saleType: "live_auction",
      conditionType: "clean_used",
      conditionLabel: "Clean Title (Delhi RTO)",
      primaryDamage: "Right Fender Dent",
      secondaryDamage: "Scuffed Alloy",
      estimatedRepairCost: 22000,
      estimatedRetailValue: 4200000,
      currentBid: 2950000,
      startingBid: 2400000,
      reservePrice: 3100000,
      reserveMet: false,
      buyItNowPrice: 3350000,
      bidCount: 52,
      auctionEndsInSeconds: 520,
      sellerType: "individual",
      sellerName: "Harpreet Singh Narang",
      sellerRating: 4.9,
      isVerifiedSeller: true,
      hasCleanTitle: true,
      keysAvailable: "Yes (2 Keys)",
      runAndDrive: "Runs & Drives",
      engineNote: "Legendary 2.8L D-4D 500Nm torque engine. 4x4 High/Low transfer case working flawlessly.",
      images: [
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
      ],
      features: ["Legender Front Grille & Quad LED Headlamps", "Kick Sensor Powered Tailgate", "Wireless Charger", "Black & Maroon Dual-Tone Leather"],
      documents: { rcStatus: "Delhi RTO Smart Card", insurance: "Comprehensive Valid till Nov 2025", form29_30: "Ready with Seller PAN", challanStatus: "Clear" },
      inspection: { overallScore: 93, engineCompression: "Factory Grade", gearbox: "Smooth", chassis: "Heavy duty ladder-frame clean", tyres: "Dunlop Grandtrek 6.0mm", obdCode: "Clean" }
    },
    {
      id: "bmc-2024-006",
      lotNumber: "10048296",
      title: "2023 Maruti Suzuki Grand Vitara Alpha Hybrid",
      make: "Maruti Suzuki",
      model: "Grand Vitara",
      year: 2023,
      variant: "Alpha+ Strong Hybrid e-CVT",
      category: "sedans",
      fuel: "EV",
      transmission: "Automatic",
      odometer: 14200,
      regNo: "TS 09 FH 9922",
      rtoState: "TS",
      rtoLocation: "Hyderabad Central, Telangana",
      yardId: "yard-hyd-shamshabad",
      saleType: "live_auction",
      conditionType: "insurance_salvage",
      conditionLabel: "Insurance Salvage (Flood Recovery)",
      primaryDamage: "Water Inundation (Floor Level)",
      secondaryDamage: "Electrical ECU Relays",
      estimatedRepairCost: 75000,
      estimatedRetailValue: 1850000,
      currentBid: 720000,
      startingBid: 500000,
      reservePrice: 800000,
      reserveMet: false,
      buyItNowPrice: null,
      bidCount: 22,
      auctionEndsInSeconds: 6800,
      sellerType: "insurance",
      sellerName: "Bajaj Allianz General Insurance",
      sellerRating: 4.7,
      isVerifiedSeller: true,
      hasCleanTitle: false,
      keysAvailable: "Yes (1 Key)",
      runAndDrive: "Engine Starts Only",
      engineNote: "Toyota 1.5L Atkinson Hybrid motor starts. High voltage hybrid battery isolated and tested safe.",
      images: [
        "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
      ],
      features: ["Strong Hybrid 27.97 km/l Mileage", "Panoramic Sunroof", "Head-Up Display (HUD)", "360-Degree Surround Camera"],
      documents: { rcStatus: "Insurance Salvage NOC Ready", insurance: "Cancelled by Insurer", form29_30: "IRDAI Salvage Certificate", challanStatus: "Clear" },
      inspection: { overallScore: 81, engineCompression: "Good (180 PSI)", gearbox: "e-CVT functional", chassis: "Zero rust (underbody coated)", tyres: "5.7mm", obdCode: "B1000 (ECU reset recommended)" }
    },
    {
      id: "bmc-2024-007",
      lotNumber: "10048297",
      title: "2021 Ashok Leyland Bada Dost i4 Truck",
      make: "Ashok Leyland",
      model: "Bada Dost",
      year: 2021,
      variant: "Bada Dost i4 Heavy Duty Flatbed",
      category: "commercial",
      fuel: "Diesel",
      transmission: "Manual",
      odometer: 58000,
      regNo: "TN 11 B 3340",
      rtoState: "TN",
      rtoLocation: "Chennai South RTO, Tamil Nadu",
      yardId: "yard-maa-sriperumbudur",
      saleType: "buy_it_now",
      conditionType: "bank_repo",
      conditionLabel: "Commercial Fleet Repo",
      primaryDamage: "Cargo Bay Wear",
      secondaryDamage: "None",
      estimatedRepairCost: 12000,
      estimatedRetailValue: 780000,
      currentBid: 420000,
      startingBid: 350000,
      reservePrice: 420000,
      reserveMet: true,
      buyItNowPrice: 460000,
      bidCount: 15,
      auctionEndsInSeconds: 12400,
      sellerType: "bank",
      sellerName: "Cholamandalam Investment & Finance",
      sellerRating: 4.8,
      isVerifiedSeller: true,
      hasCleanTitle: true,
      keysAvailable: "Yes (2 Keys)",
      runAndDrive: "Runs & Drives",
      engineNote: "Robust 1.5L 3-cylinder turbo diesel pulls heavy load. Leaf springs intact.",
      images: [
        "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80"
      ],
      features: ["1,860 kg Certified Payload Capacity", "Power Steering & Air Conditioning", "Wide 3-Seater Cabin", "Reverse Parking Sensors"],
      documents: { rcStatus: "Commercial Fitness Valid till 2026", insurance: "Comprehensive Commercial Policy", form29_30: "Bank Form 35 NOC Ready", challanStatus: "Clear" },
      inspection: { overallScore: 88, engineCompression: "Heavy Commercial Spec", gearbox: "Crisp", chassis: "Reinforced chassis rail untouched", tyres: "Commercial Grade 7.2mm", obdCode: "Clean" }
    },
    {
      id: "bmc-2024-008",
      lotNumber: "10048298",
      title: "2023 Royal Enfield Himalayan 450",
      make: "Royal Enfield",
      model: "Himalayan",
      year: 2023,
      variant: "Himalayan 450 Hanle Black Tubeless",
      category: "bikes",
      fuel: "Petrol",
      transmission: "Manual",
      odometer: 6400,
      regNo: "MH 12 VQ 7711",
      rtoState: "MH",
      rtoLocation: "Pune RTO, Maharashtra",
      yardId: "yard-pnq-chakan",
      saleType: "live_auction",
      conditionType: "clean_used",
      conditionLabel: "Certified Pre-Owned Bike",
      primaryDamage: "Left Handguard Scuff",
      secondaryDamage: "None",
      estimatedRepairCost: 3000,
      estimatedRetailValue: 310000,
      currentBid: 215000,
      startingBid: 160000,
      reservePrice: 220000,
      reserveMet: false,
      buyItNowPrice: 245000,
      bidCount: 31,
      auctionEndsInSeconds: 1820,
      sellerType: "individual",
      sellerName: "Tanmay Deshmukh",
      sellerRating: 5.0,
      isVerifiedSeller: true,
      hasCleanTitle: true,
      keysAvailable: "Yes (2 Keys)",
      runAndDrive: "Runs & Drives",
      engineNote: "Sherpa 450 liquid-cooled engine purrs. Ride-by-wire modes responsive.",
      images: [
        "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80"
      ],
      features: ["Tripper Navigation TFT Screen", "Tubeless Cross-Spoke Wheels", "Switchable ABS (Eco/Off-road)", "Full Touring Crash Guards"],
      documents: { rcStatus: "Smart Card RC Available", insurance: "5-Year Insurance Valid till Nov 2028", form29_30: "Signed", challanStatus: "Clear" },
      inspection: { overallScore: 95, engineCompression: "Crisp", gearbox: "6-Speed with Slip & Assist Clutch", chassis: "Twin-spar frame pristine", tyres: "CEAT Gripp-XL 5.9mm", obdCode: "Clean" }
    }
  ];

  // --- 3. AUDIO SYNTHESIZER (NATIVE WEB AUDIO API) ---
  class AuctionAudioEngine {
    constructor() {
      this.ctx = null;
      this.isMuted = false;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      return this.isMuted;
    }

    playGavel() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(35, t + 0.12);
      gain.gain.setValueAtTime(0.8, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.2);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(820, t);
      osc2.frequency.exponentialRampToValueAtTime(120, t + 0.05);
      gain2.gain.setValueAtTime(0.6, t);
      gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(t);
      osc2.stop(t + 0.1);
    }

    playBidChime() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;
      [587.33, 880].forEach((freq, idx) => {
        const t = this.ctx.currentTime + (idx * 0.07);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.3);
      });
    }

    playOutbid() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, t);
      osc.frequency.setValueAtTime(349.23, t + 0.1);
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.setValueAtTime(0.25, t + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.35);
    }
  }

  const audio = new AuctionAudioEngine();
  window.auctionAudio = audio;

  // --- 4. TOAST NOTIFICATION MANAGER ---
  class ToastManager {
    static show(title, message, type = 'info') {
      const container = document.getElementById('toast-container');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      
      const iconMap = {
        success: 'check-circle-2',
        error: 'alert-circle',
        warning: 'alert-triangle',
        info: 'info'
      };
      const iconName = iconMap[type] || 'info';

      toast.innerHTML = `
        <i data-lucide="${iconName}" class="w-5 h-5 flex-shrink-0 mt-0.5 ${type === 'success' ? 'text-emerald-400' : type === 'error' ? 'text-rose-400' : type === 'warning' ? 'text-amber-400' : 'text-[#39A7FF]'}"></i>
        <div class="flex-grow">
          <p class="text-xs font-bold text-white">${title}</p>
          <p class="text-xs text-slate-300 mt-0.5">${message}</p>
        </div>
        <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-white p-1">
          <i data-lucide="x" class="w-3.5 h-3.5"></i>
        </button>
      `;

      container.appendChild(toast);
      if (window.lucide) window.lucide.createIcons();

      setTimeout(() => {
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 320);
      }, 4200);
    }
  }
  window.showToast = ToastManager.show;

  // --- 5. CENTRAL APPLICATION STATE STORE ---
  class AuctionStore {
    constructor() {
      this.vehicles = [...INITIAL_VEHICLES];
      this.yards = [...INDIAN_YARDS];
      this.userRole = 'buyer'; // 'buyer', 'seller', 'admin', 'dealer'
      this.userProfile = {
        name: 'Vikram Malhotra',
        email: 'vikram.m@indiamail.com',
        phone: '+91 98201 44521',
        city: 'Mumbai, MH',
        kycStatus: 'Verified (Level 2)',
        depositBalance: 50000,
        buyingPower: 500000,
        memberSince: 'Oct 2023',
        preferredYard: 'yard-bom-bhiwandi'
      };
      this.watchlist = new Set(['bmc-2024-001', 'bmc-2024-004']);
      this.userBids = new Map([
        ['bmc-2024-001', 1450000],
        ['bmc-2024-002', 850000]
      ]);
      this.notifications = [
        { id: 1, type: 'warning', title: 'Outbid Warning!', message: 'Rohan Sharma just outbid you on Lot #10048292 (Tata Safari). New high bid: ₹8,90,000.', time: '2 mins ago', read: false, lotId: 'bmc-2024-002' },
        { id: 2, type: 'info', title: 'Auction Starting Soon', message: 'Lot #10048295 (Toyota Fortuner) enters Live Bidding in 8 minutes.', time: '15 mins ago', read: false, lotId: 'bmc-2024-005' },
        { id: 3, type: 'success', title: 'KYC Verification Approved', message: 'Your Aadhaar & PAN verification was successful. Buying power increased to ₹5,00,000.', time: '1 hour ago', read: true },
        { id: 4, type: 'info', title: 'Security Deposit Confirmed', message: '₹50,000 EMD received via Net Banking (Ref: HDFC882910).', time: 'Yesterday', read: true }
      ];
      this.activeLiveLotId = 'bmc-2024-002';
      this.liveAuctionStatus = {
        lotId: 'bmc-2024-002',
        countdown: 142,
        currentHighBid: 890000,
        highBidder: 'Rohan Sharma (Bidder #4092)',
        isUserHighBidder: false,
        bidHistory: [
          { time: '1m ago', bidder: 'Rohan Sharma', amount: 890000, isUser: false },
          { time: '3m ago', bidder: 'AutoCorp Mumbai', amount: 870000, isUser: false },
          { time: '5m ago', bidder: 'You (Bidder #9901)', amount: 850000, isUser: true }
        ]
      };
      this.filters = {
        search: '',
        category: 'all',
        fuel: 'all',
        transmission: 'all',
        rtoState: 'all',
        conditionType: 'all',
        yardId: 'all',
        maxPrice: 5000000,
        sortBy: 'countdown'
      };
      this.currentViewMode = 'grid'; // 'grid' or 'list'
      this.activePage = 'home';
      this.selectedVehicleId = 'bmc-2024-001';
      this.subscribers = [];
      this.startSimulation();
    }

    subscribe(fn) {
      this.subscribers.push(fn);
    }

    notify(type) {
      this.subscribers.forEach(fn => fn(this, type));
    }

    toggleWatchlist(id) {
      if (this.watchlist.has(id)) {
        this.watchlist.delete(id);
        ToastManager.show('Removed from Watchlist', 'Vehicle removed from your saved items.', 'info');
      } else {
        this.watchlist.add(id);
        ToastManager.show('Saved to Watchlist', 'Vehicle bookmarked. You will receive ending soon alerts.', 'success');
      }
      this.notify('WATCHLIST_CHANGE');
    }

    setUserRole(role) {
      this.userRole = role;
      ToastManager.show('Role Switched', `Switched view mode to: ${role.toUpperCase()}`, 'info');
      this.notify('ROLE_CHANGE');
    }

    getFilteredVehicles() {
      return this.vehicles.filter(v => {
        if (this.filters.search) {
          const q = this.filters.search.toLowerCase();
          const match = v.title.toLowerCase().includes(q) || v.lotNumber.includes(q) || v.regNo.toLowerCase().includes(q) || v.make.toLowerCase().includes(q);
          if (!match) return false;
        }
        if (this.filters.category !== 'all' && v.category !== this.filters.category) return false;
        if (this.filters.fuel !== 'all' && v.fuel.toLowerCase() !== this.filters.fuel.toLowerCase()) return false;
        if (this.filters.transmission !== 'all' && v.transmission.toLowerCase() !== this.filters.transmission.toLowerCase()) return false;
        if (this.filters.rtoState !== 'all' && v.rtoState !== this.filters.rtoState) return false;
        if (this.filters.conditionType !== 'all' && v.conditionType !== this.filters.conditionType) return false;
        if (this.filters.yardId !== 'all' && v.yardId !== this.filters.yardId) return false;
        if (v.currentBid > this.filters.maxPrice) return false;
        return true;
      }).sort((a, b) => {
        if (this.filters.sortBy === 'countdown') return a.auctionEndsInSeconds - b.auctionEndsInSeconds;
        if (this.filters.sortBy === 'bid_low_high') return a.currentBid - b.currentBid;
        if (this.filters.sortBy === 'bid_high_low') return b.currentBid - a.currentBid;
        if (this.filters.sortBy === 'newest') return b.year - a.year;
        return 0;
      });
    }

    placeBid(lotId, increment) {
      const lot = this.vehicles.find(v => v.id === lotId) || this.vehicles.find(v => v.id === this.activeLiveLotId);
      if (!lot) return;

      const newBid = lot.currentBid + increment;
      lot.currentBid = newBid;
      lot.bidCount += 1;
      this.userBids.set(lot.id, newBid);

      if (lot.id === this.activeLiveLotId) {
        this.liveAuctionStatus.currentHighBid = newBid;
        this.liveAuctionStatus.highBidder = 'You (Bidder #9901)';
        this.liveAuctionStatus.isUserHighBidder = true;
        if (this.liveAuctionStatus.countdown < 30) this.liveAuctionStatus.countdown = 35;
        this.liveAuctionStatus.bidHistory.unshift({
          time: 'Just now',
          bidder: 'You (Bidder #9901)',
          amount: newBid,
          isUser: true
        });
      }

      audio.playBidChime();
      audio.playGavel();
      ToastManager.show('Bid Placed Successfully!', `Your bid of ₹${newBid.toLocaleString('en-IN')} is now the highest bid for ${lot.title}.`, 'success');
      this.notify('BID_PLACED');
    }

    startSimulation() {
      // Countdown timer & simulated competing bidder
      setInterval(() => {
        if (this.liveAuctionStatus.countdown > 0) {
          this.liveAuctionStatus.countdown -= 1;
        } else {
          this.liveAuctionStatus.countdown = 120; // reset for continuous live demo
        }

        this.vehicles.forEach(v => {
          if (v.auctionEndsInSeconds > 0) v.auctionEndsInSeconds -= 1;
        });

        // Periodic bot outbid simulation if user is high bidder
        if (this.liveAuctionStatus.isUserHighBidder && Math.random() < 0.12 && this.liveAuctionStatus.countdown > 15) {
          const botBidders = ['Rohan Sharma (Jaipur)', 'AutoCorp Mumbai', 'Shree Ram Refurbishers', 'TechFleet Bangalore'];
          const bot = botBidders[Math.floor(Math.random() * botBidders.length)];
          const newBid = this.liveAuctionStatus.currentHighBid + 10000;
          this.liveAuctionStatus.currentHighBid = newBid;
          this.liveAuctionStatus.highBidder = bot;
          this.liveAuctionStatus.isUserHighBidder = false;
          this.liveAuctionStatus.bidHistory.unshift({
            time: 'Just now',
            bidder: bot,
            amount: newBid,
            isUser: false
          });
          const lot = this.vehicles.find(v => v.id === this.activeLiveLotId);
          if (lot) {
            lot.currentBid = newBid;
            lot.bidCount += 1;
          }
          audio.playOutbid();
          ToastManager.show('⚠️ You Were Outbid!', `${bot} placed a higher bid of ₹${newBid.toLocaleString('en-IN')} on ${lot ? lot.title : 'Active Lot'}. Counter bid now?`, 'warning');
          this.notify('OUTBID');
        }

        this.notify('TICK');
      }, 1000);
    }
  }

  const store = new AuctionStore();
  window.appStore = store;

  // --- 6. FORMATTER UTILITIES ---
  function formatINR(amount) {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} Lakh`;
    return `₹${amount.toLocaleString('en-IN')}`;
  }

  function formatKM(km) {
    return `${km.toLocaleString('en-IN')} km`;
  }

  function formatCountdown(sec) {
    if (sec <= 0) return 'Ended';
    const d = Math.floor(sec / 86400);
    const h = Math.floor((sec % 86400) / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (d > 0) return `${d}d ${h}h ${m}m`;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    return `${m}m ${s}s`;
  }

  // --- 7. ROUTING SYSTEM ---
  window.navigateTo = function(page, param) {
    store.activePage = page;
    if (param) store.selectedVehicleId = param;
    window.location.hash = `#${page}${param ? `/${param}` : ''}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderActiveView();
    renderNavbar();
    renderMobileBottomNav();
  };

  window.addEventListener('hashchange', () => {
    const raw = window.location.hash.replace('#', '') || 'home';
    const parts = raw.split('/');
    const page = parts[0] || 'home';
    const param = parts[1] || null;
    store.activePage = page;
    if (param) store.selectedVehicleId = param;
    renderActiveView();
    renderNavbar();
    renderMobileBottomNav();
  });

  // --- 8. REUSABLE VEHICLE CARD COMPONENT ---
  function renderVehicleCard(v, viewMode = 'grid') {
    const isWatch = store.watchlist.has(v.id);
    const yard = store.yards.find(y => y.id === v.yardId) || store.yards[0];
    const isLive = v.saleType === 'live_auction';

    if (viewMode === 'list') {
      return `
        <div class="card-white p-4 flex flex-col md:flex-row gap-5 items-center group relative overflow-hidden">
          <div class="relative w-full md:w-64 h-44 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
            <img src="${v.images[0]}" alt="${v.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
              ${isLive ? '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow"><span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>Live Lot</span>' : '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#087CFF] text-white">Buy It Now</span>'}
            </div>
            <button onclick="event.stopPropagation(); window.appStore.toggleWatchlist('${v.id}')" class="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 hover:bg-white shadow transition-all ${isWatch ? 'text-red-500' : 'text-slate-500 hover:text-red-500'}">
              <i data-lucide="heart" class="w-4 h-4 ${isWatch ? 'fill-red-500' : ''}"></i>
            </button>
          </div>
          <div class="flex-grow w-full">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-bold text-[#087CFF] uppercase tracking-wider">Lot #${v.lotNumber} • ${v.rtoState} RTO</span>
              <span class="text-xs font-bold text-amber-600 flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5"></i> ${formatCountdown(v.auctionEndsInSeconds)}</span>
            </div>
            <h3 onclick="window.navigateTo('details', '${v.id}')" class="text-lg font-bold text-slate-900 mt-1 cursor-pointer hover:text-[#087CFF] transition-colors">${v.title}</h3>
            <p class="text-xs text-slate-500 mt-0.5">${v.variant}</p>
            <div class="flex flex-wrap gap-3 mt-3 text-xs text-slate-600">
              <span class="flex items-center gap-1"><i data-lucide="gauge" class="w-3.5 h-3.5 text-slate-400"></i> ${formatKM(v.odometer)}</span>
              <span class="flex items-center gap-1"><i data-lucide="fuel" class="w-3.5 h-3.5 text-slate-400"></i> ${v.fuel}</span>
              <span class="flex items-center gap-1"><i data-lucide="zap" class="w-3.5 h-3.5 text-slate-400"></i> ${v.transmission}</span>
              <span class="flex items-center gap-1"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-400"></i> ${yard.city}</span>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row md:flex-col items-end justify-between w-full md:w-48 gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-5 flex-shrink-0">
            <div>
              <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Current Highest Bid</p>
              <p class="text-xl font-extrabold text-[#087CFF] font-mono">${formatINR(v.currentBid)}</p>
              <p class="text-[10px] text-slate-400 mt-0.5">${v.bidCount} bids placed</p>
            </div>
            <div class="flex gap-2 w-full">
              <button onclick="window.navigateTo('details', '${v.id}')" class="flex-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold text-center">Details</button>
              <button onclick="window.appStore.placeBid('${v.id}', 5000)" class="flex-1 btn-electric px-3 py-2 rounded-xl text-xs font-bold text-center">Bid +₹5k</button>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div class="card-white flex flex-col group relative overflow-hidden" onclick="window.navigateTo('details', '${v.id}')">
        <!-- IMAGE CONTAINER -->
        <div class="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 cursor-pointer">
          <img src="${v.images[0]}" alt="${v.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
            ${isLive ? '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow"><span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>Live</span>' : '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#087CFF] text-white">Buy It Now</span>'}
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-sm text-white">${v.rtoState} RTO</span>
          </div>
          <button onclick="event.stopPropagation(); window.appStore.toggleWatchlist('${v.id}')" class="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow transition-all ${isWatch ? 'text-red-500' : 'text-slate-500 hover:text-red-500'}">
            <i data-lucide="heart" class="w-4 h-4 ${isWatch ? 'fill-red-500' : ''}"></i>
          </button>
          <div class="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
            <span class="font-mono text-[11px] bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded">Lot #${v.lotNumber}</span>
            <span class="font-bold flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded text-amber-300">
              <i data-lucide="clock" class="w-3 h-3"></i> ${formatCountdown(v.auctionEndsInSeconds)}
            </span>
          </div>
        </div>

        <!-- CONTENT CONTAINER -->
        <div class="p-4 sm:p-5 flex flex-col flex-grow justify-between">
          <div>
            <h3 class="font-bold text-slate-900 text-base group-hover:text-[#087CFF] transition-colors line-clamp-1">${v.title}</h3>
            <p class="text-xs text-slate-500 mt-0.5 line-clamp-1">${v.variant}</p>
            <div class="grid grid-cols-2 gap-2 mt-3 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div class="flex items-center gap-1.5"><i data-lucide="gauge" class="w-3.5 h-3.5 text-[#087CFF]"></i> ${formatKM(v.odometer)}</div>
              <div class="flex items-center gap-1.5"><i data-lucide="fuel" class="w-3.5 h-3.5 text-[#087CFF]"></i> ${v.fuel}</div>
              <div class="flex items-center gap-1.5"><i data-lucide="zap" class="w-3.5 h-3.5 text-[#087CFF]"></i> ${v.transmission}</div>
              <div class="flex items-center gap-1.5 truncate"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#087CFF]"></i> ${yard.city.split('/')[0]}</div>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <p class="text-[10px] uppercase font-bold text-slate-400">Current Bid</p>
              <p class="text-lg font-black text-[#087CFF] font-mono">${formatINR(v.currentBid)}</p>
            </div>
            <div class="flex items-center gap-1.5">
              <button onclick="event.stopPropagation(); window.navigateTo('details', '${v.id}')" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold">Details</button>
              <button onclick="event.stopPropagation(); window.appStore.placeBid('${v.id}', 5000)" class="btn-electric px-3.5 py-1.5 rounded-xl text-xs font-bold">Bid +₹5k</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // --- 9. TOP NAVBAR COMPONENT ---
  function renderNavbar() {
    const el = document.getElementById('navbar-container');
    if (!el) return;
    const unreadCount = store.notifications.filter(n => !n.read).length;
    const active = store.activePage;

    el.innerHTML = `
      <!-- ANNOUNCEMENT TICKER -->
      <div class="bg-[#061827] border-b border-[#163959] text-xs py-1.5 px-4 overflow-hidden relative z-50">
        <div class="ticker-wrap flex items-center justify-between">
          <div class="ticker-move flex items-center gap-8 text-slate-300 font-medium">
            <span class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Live Pan-India Salvage Auction: <strong>48 Lots Active</strong></span>
            <span>•</span>
            <span>Manesar Mega Yard: Next Batch Starts <strong>Tomorrow 10:00 AM IST</strong></span>
            <span>•</span>
            <span>IRDAI & Vahan RTO Compliant Clean Title Documentation</span>
            <span>•</span>
            <span>Bhiwandi Logistics Hub: <strong>2,680 Units Staged for Viewing</strong></span>
          </div>
          <div class="hidden lg:flex items-center gap-4 text-slate-400 flex-shrink-0 bg-[#061827] pl-4 z-10">
            <button onclick="window.auctionAudio.toggleMute(); window.showToast('Audio Settings', window.auctionAudio.isMuted ? 'Sound effects muted' : 'Sound effects enabled', 'info'); renderNavbar();" class="hover:text-white flex items-center gap-1 text-[11px]">
              <i data-lucide="${window.auctionAudio.isMuted ? 'volume-x' : 'volume-2'}" class="w-3.5 h-3.5 text-[#39A7FF]"></i>
              ${window.auctionAudio.isMuted ? 'Muted' : 'Sound On'}
            </button>
            <span>|</span>
            <span class="flex items-center gap-1 text-[11px]"><i data-lucide="phone-call" class="w-3.5 h-3.5 text-[#39A7FF]"></i> 1800-209-9000 (Toll Free)</span>
          </div>
        </div>
      </div>

      <!-- MAIN NAVIGATION HEADER -->
      <header class="sticky top-0 z-40 bg-[#061827]/95 backdrop-blur-md border-b border-[#163959]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          <!-- LOGO -->
          <a href="#home" onclick="window.navigateTo('home')" class="flex items-center gap-2.5 flex-shrink-0">
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#087CFF] to-[#39A7FF] flex items-center justify-center text-white font-black text-xl shadow-lg shadow-[#087CFF]/30">
              <i data-lucide="gauge" class="w-5 h-5 sm:w-6 sm:h-6"></i>
            </div>
            <div>
              <span class="text-lg sm:text-2xl font-black text-white tracking-tight font-heading">BID<span class="text-[#087CFF]">MY</span>CAR</span>
              <span class="hidden sm:block text-[9px] uppercase tracking-widest text-[#8FA5B8] font-mono">India's Vehicle Auction</span>
            </div>
          </a>

          <!-- DESKTOP NAVIGATION LINKS -->
          <nav class="hidden md:flex items-center gap-1 lg:gap-2 text-xs font-bold text-slate-300">
            <button onclick="window.navigateTo('home')" class="px-3 py-2 rounded-xl transition-all ${active === 'home' ? 'text-white bg-[#0B2235] border border-[#163959]' : 'hover:text-white'}">Home</button>
            <button onclick="window.navigateTo('browse')" class="px-3 py-2 rounded-xl transition-all ${active === 'browse' ? 'text-white bg-[#0B2235] border border-[#163959]' : 'hover:text-white'}">Browse Vehicles</button>
            <button onclick="window.navigateTo('live')" class="px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${active === 'live' ? 'text-white bg-[#0B2235] border border-[#163959]' : 'hover:text-white'}">
              <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Live Auction
            </button>
            <button onclick="window.navigateTo('watchlist')" class="px-3 py-2 rounded-xl transition-all ${active === 'watchlist' ? 'text-white bg-[#0B2235] border border-[#163959]' : 'hover:text-white'}">Watchlist</button>
            <button onclick="window.navigateTo('my-bids')" class="px-3 py-2 rounded-xl transition-all ${active === 'my-bids' ? 'text-white bg-[#0B2235] border border-[#163959]' : 'hover:text-white'}">My Bids</button>
            
            <!-- DASHBOARD DROPDOWN -->
            <div class="relative group">
              <button class="px-3 py-2 rounded-xl hover:text-white flex items-center gap-1 transition-all ${['buyer-dashboard', 'seller-dashboard', 'admin-dashboard'].includes(active) ? 'text-white bg-[#0B2235] border border-[#163959]' : ''}">
                Dashboards <i data-lucide="chevron-down" class="w-3.5 h-3.5"></i>
              </button>
              <div class="absolute top-full left-0 mt-1 w-48 bg-[#0B2235] border border-[#163959] rounded-xl shadow-xl py-1.5 hidden group-hover:block animate-in fade-in duration-150">
                <button onclick="window.navigateTo('buyer-dashboard')" class="w-full text-left px-4 py-2 text-xs text-slate-200 hover:bg-[#0E2A42] hover:text-white flex items-center gap-2">
                  <i data-lucide="shopping-bag" class="w-4 h-4 text-[#39A7FF]"></i> Buyer Dashboard
                </button>
                <button onclick="window.navigateTo('seller-dashboard')" class="w-full text-left px-4 py-2 text-xs text-slate-200 hover:bg-[#0E2A42] hover:text-white flex items-center gap-2">
                  <i data-lucide="store" class="w-4 h-4 text-emerald-400"></i> Seller Dashboard
                </button>
                <button onclick="window.navigateTo('admin-dashboard')" class="w-full text-left px-4 py-2 text-xs text-slate-200 hover:bg-[#0E2A42] hover:text-white flex items-center gap-2">
                  <i data-lucide="shield-check" class="w-4 h-4 text-amber-400"></i> Admin Center
                </button>
              </div>
            </div>
          </nav>

          <!-- ACTIONS & PROFILE -->
          <div class="flex items-center gap-2 sm:gap-3">
            <!-- NOTIFICATIONS TRIGGER -->
            <button onclick="window.navigateTo('notifications')" class="relative p-2 rounded-xl bg-[#0B2235] border border-[#163959] text-slate-300 hover:text-white transition-colors" title="Notifications">
              <i data-lucide="bell" class="w-4 h-4 sm:w-5 sm:h-5"></i>
              ${unreadCount > 0 ? `<span class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[9px] font-black text-white flex items-center justify-center">${unreadCount}</span>` : ''}
            </button>

            <!-- SELL BUTTON -->
            <button onclick="window.navigateTo('add-vehicle')" class="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all">
              <i data-lucide="plus-circle" class="w-4 h-4 text-emerald-400"></i>
              Sell Vehicle
            </button>

            <!-- PROFILE BUTTON -->
            <button onclick="window.navigateTo('profile')" class="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-[#0B2235] border border-[#163959] hover:border-[#087CFF] transition-all">
              <div class="w-7 h-7 rounded-lg bg-[#087CFF] text-white font-bold text-xs flex items-center justify-center">VM</div>
              <div class="hidden xl:block text-left">
                <p class="text-xs font-bold text-white leading-tight">Vikram M.</p>
                <p class="text-[10px] text-emerald-400 font-mono">₹5.0L Power</p>
              </div>
            </button>
          </div>
        </div>
      </header>
    `;
    if (window.lucide) window.lucide.createIcons();
  }

  // --- 10. MOBILE BOTTOM NAVIGATION COMPONENT ---
  function renderMobileBottomNav() {
    const el = document.getElementById('mobile-nav-container');
    if (!el) return;
    const active = store.activePage;

    el.innerHTML = `
      <div class="mobile-bottom-bar md:hidden flex items-center justify-around">
        <button onclick="window.navigateTo('home')" class="flex flex-col items-center gap-1 py-1 text-[10px] font-bold ${active === 'home' ? 'text-[#087CFF]' : 'text-slate-400'}">
          <i data-lucide="home" class="w-5 h-5"></i> Home
        </button>
        <button onclick="window.navigateTo('browse')" class="flex flex-col items-center gap-1 py-1 text-[10px] font-bold ${active === 'browse' ? 'text-[#087CFF]' : 'text-slate-400'}">
          <i data-lucide="search" class="w-5 h-5"></i> Browse
        </button>
        <button onclick="window.navigateTo('live')" class="flex flex-col items-center gap-1 py-1 text-[10px] font-bold ${active === 'live' ? 'text-red-400' : 'text-slate-400'}">
          <div class="relative">
            <i data-lucide="flame" class="w-5 h-5"></i>
            <span class="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          </div>
          Live
        </button>
        <button onclick="window.navigateTo('my-bids')" class="flex flex-col items-center gap-1 py-1 text-[10px] font-bold ${active === 'my-bids' ? 'text-[#087CFF]' : 'text-slate-400'}">
          <i data-lucide="gavel" class="w-5 h-5"></i> Bids
        </button>
        <button onclick="window.navigateTo('profile')" class="flex flex-col items-center gap-1 py-1 text-[10px] font-bold ${active === 'profile' ? 'text-[#087CFF]' : 'text-slate-400'}">
          <i data-lucide="user" class="w-5 h-5"></i> Profile
        </button>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  }

  // --- 11. FOOTER COMPONENT ---
  function renderFooter() {
    const el = document.getElementById('footer-container');
    if (!el) return;

    el.innerHTML = `
      <footer class="bg-[#061827] border-t border-[#163959] text-slate-400 text-xs py-14">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <!-- BRAND & BIO -->
            <div class="lg:col-span-2 space-y-4">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#087CFF] to-[#39A7FF] flex items-center justify-center text-white font-black text-base shadow">
                  <i data-lucide="gauge" class="w-4 h-4"></i>
                </div>
                <span class="text-xl font-black text-white tracking-tight font-heading">BID<span class="text-[#087CFF]">MY</span>CAR</span>
              </div>
              <p class="text-slate-400 leading-relaxed text-xs max-w-sm">
                India's premier digital auto auction house modeled after Copart. Seamless liquidation for individual owners, dealers, insurance salvage, bank repossessions, and fleet operators across 18+ pan-India yards.
              </p>
              <div class="flex items-center gap-3 pt-2 text-white">
                <span class="p-2 rounded-xl bg-[#0B2235] border border-[#163959] hover:text-[#087CFF] cursor-pointer"><i data-lucide="twitter" class="w-4 h-4"></i></span>
                <span class="p-2 rounded-xl bg-[#0B2235] border border-[#163959] hover:text-[#087CFF] cursor-pointer"><i data-lucide="linkedin" class="w-4 h-4"></i></span>
                <span class="p-2 rounded-xl bg-[#0B2235] border border-[#163959] hover:text-[#087CFF] cursor-pointer"><i data-lucide="youtube" class="w-4 h-4"></i></span>
              </div>
            </div>

            <!-- QUICK LINKS -->
            <div>
              <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading">Quick Browse</h4>
              <ul class="space-y-2.5">
                <li><a href="#browse" onclick="window.navigateTo('browse'); store.filters.category='suvs'; store.notify('FILTER_CHANGE');" class="hover:text-white transition-colors">Used SUVs & MUVs</a></li>
                <li><a href="#browse" onclick="window.navigateTo('browse'); store.filters.category='sedans'; store.notify('FILTER_CHANGE');" class="hover:text-white transition-colors">Sedans & Hatchbacks</a></li>
                <li><a href="#browse" onclick="window.navigateTo('browse'); store.filters.conditionType='insurance_salvage'; store.notify('FILTER_CHANGE');" class="hover:text-white transition-colors">Insurance Salvage Lots</a></li>
                <li><a href="#browse" onclick="window.navigateTo('browse'); store.filters.conditionType='bank_repo'; store.notify('FILTER_CHANGE');" class="hover:text-white transition-colors">Bank Repossessed Cars</a></li>
                <li><a href="#browse" onclick="window.navigateTo('browse'); store.filters.category='luxury'; store.notify('FILTER_CHANGE');" class="hover:text-white transition-colors">VIP Luxury Auctions</a></li>
              </ul>
            </div>

            <!-- DASHBOARDS -->
            <div>
              <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading">Portals</h4>
              <ul class="space-y-2.5">
                <li><a href="#buyer-dashboard" onclick="window.navigateTo('buyer-dashboard')" class="hover:text-white transition-colors">Buyer Command Center</a></li>
                <li><a href="#seller-dashboard" onclick="window.navigateTo('seller-dashboard')" class="hover:text-white transition-colors">Seller Dashboard</a></li>
                <li><a href="#add-vehicle" onclick="window.navigateTo('add-vehicle')" class="hover:text-white transition-colors">List Your Vehicle</a></li>
                <li><a href="#admin-dashboard" onclick="window.navigateTo('admin-dashboard')" class="hover:text-white transition-colors">Admin Center</a></li>
                <li><a href="#profile" onclick="window.navigateTo('profile')" class="hover:text-white transition-colors">KYC & Deposit Wallet</a></li>
              </ul>
            </div>

            <!-- PAN-INDIA HUBS -->
            <div>
              <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading">Mega Yards</h4>
              <ul class="space-y-2.5 text-xs">
                <li class="flex items-center gap-1.5"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#39A7FF]"></i> Delhi NCR (Manesar)</li>
                <li class="flex items-center gap-1.5"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#39A7FF]"></i> Mumbai Hub (Bhiwandi)</li>
                <li class="flex items-center gap-1.5"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#39A7FF]"></i> Bengaluru (Nelamangala)</li>
                <li class="flex items-center gap-1.5"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#39A7FF]"></i> Hyderabad (Shamshabad)</li>
                <li class="flex items-center gap-1.5"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#39A7FF]"></i> Chennai (Sriperumbudur)</li>
              </ul>
            </div>
          </div>

          <div class="border-t border-[#163959] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 Bid My Car Technologies India Pvt. Ltd. All rights reserved.</p>
            <div class="flex items-center gap-6">
              <span class="hover:text-slate-300 cursor-pointer">Auction Terms of Service</span>
              <span class="hover:text-slate-300 cursor-pointer">Vahan Verification Policy</span>
              <span class="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            </div>
          </div>
        </div>
      </footer>
    `;
    if (window.lucide) window.lucide.createIcons();
  }

  // --- 12. PAGE 1: HOME VIEW ---
  function renderHomeView() {
    const featured = store.vehicles.slice(0, 4);
    const liveLot = store.vehicles.find(v => v.id === store.activeLiveLotId) || store.vehicles[1];

    return `
      <div class="space-y-16 pb-12">
        <!-- HERO SECTION -->
        <section class="relative pt-12 pb-20 overflow-hidden">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <!-- LEFT COPY & SEARCH -->
              <div class="lg:col-span-7 space-y-6">
                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B2235] border border-[#163959] text-xs font-bold text-[#39A7FF]">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Copart-Style Auctions Now in India
                </div>

                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-heading">
                  Find Your Car.<br />
                  <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#087CFF] to-[#39A7FF]">Make Your Bid.</span><br />
                  Drive Away.
                </h1>

                <p class="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
                  Join India's most transparent vehicle marketplace. Bid live on certified pre-owned cars, bank repossessions, and insurance salvage lots with 150-point inspection certificates.
                </p>

                <!-- SEARCH BOX -->
                <div class="bg-white p-2 sm:p-2.5 rounded-2xl shadow-2xl flex flex-col sm:flex-row gap-2 max-w-xl border border-slate-100">
                  <div class="flex items-center gap-2 px-3 flex-grow text-slate-800">
                    <i data-lucide="search" class="w-5 h-5 text-slate-400"></i>
                    <input 
                      type="text" 
                      id="hero-search-input"
                      placeholder="Search by make, model, city or lot..." 
                      class="w-full bg-transparent text-xs sm:text-sm font-medium focus:outline-none placeholder:text-slate-400 text-slate-900" 
                      onkeydown="if(event.key === 'Enter') { store.filters.search = this.value; window.navigateTo('browse'); }"
                    />
                  </div>
                  <button 
                    onclick="store.filters.search = document.getElementById('hero-search-input').value; window.navigateTo('browse');"
                    class="btn-electric px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Search</span>
                    <i data-lucide="arrow-right" class="w-4 h-4"></i>
                  </button>
                </div>

                <!-- QUICK CTAS -->
                <div class="flex flex-wrap items-center gap-3 pt-2">
                  <button onclick="window.navigateTo('browse')" class="btn-electric px-5 py-2.5 rounded-xl text-xs font-bold shadow-md">
                    Browse All Vehicles
                  </button>
                  <button onclick="window.navigateTo('live')" class="px-5 py-2.5 rounded-xl bg-[#0B2235] hover:bg-[#0E2A42] text-white border border-[#163959] text-xs font-bold flex items-center gap-2 transition-all">
                    <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    Live Bidding Room
                  </button>
                </div>

                <!-- TRUST STRIP STATS -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#163959]/60">
                  <div>
                    <p class="text-xl sm:text-2xl font-black text-white font-mono">₹150+ Cr</p>
                    <p class="text-[11px] text-[#8FA5B8] uppercase font-bold">Liquidated</p>
                  </div>
                  <div>
                    <p class="text-xl sm:text-2xl font-black text-white font-mono">25,000+</p>
                    <p class="text-[11px] text-[#8FA5B8] uppercase font-bold">Lots Listed</p>
                  </div>
                  <div>
                    <p class="text-xl sm:text-2xl font-black text-white font-mono">18+ Hubs</p>
                    <p class="text-[11px] text-[#8FA5B8] uppercase font-bold">Pan-India Yards</p>
                  </div>
                  <div>
                    <p class="text-xl sm:text-2xl font-black text-emerald-400 font-mono">100%</p>
                    <p class="text-[11px] text-[#8FA5B8] uppercase font-bold">Vahan Verified</p>
                  </div>
                </div>
              </div>

              <!-- RIGHT HERO SHOWCASE IMAGE -->
              <div class="lg:col-span-5 relative">
                <div class="relative rounded-3xl overflow-hidden border border-[#163959] shadow-2xl group bg-[#0B2235]">
                  <img 
                    src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80" 
                    alt="2023 Mahindra XUV700" 
                    class="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#061827] via-transparent to-transparent"></div>
                  <div class="absolute top-4 left-4">
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase bg-red-600 text-white shadow-lg">
                      <span class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                      Featured Auction Lot
                    </span>
                  </div>
                  <div class="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#061827]/90 backdrop-blur-md border border-[#163959] flex items-center justify-between">
                    <div>
                      <p class="text-xs text-[#39A7FF] font-mono font-bold">Mahindra XUV700 AX7 L AWD</p>
                      <p class="text-lg font-black text-white font-mono">Current: ₹14.80 Lakh</p>
                    </div>
                    <button onclick="window.navigateTo('details', 'bmc-2024-001')" class="btn-electric px-4 py-2 rounded-xl text-xs font-bold">
                      Bid Now
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <!-- 4 TRUST FEATURE PILLARS -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div class="card-white p-6 flex items-start gap-4">
              <div class="w-12 h-12 rounded-2xl bg-blue-50 text-[#087CFF] flex items-center justify-center flex-shrink-0">
                <i data-lucide="shield-check" class="w-6 h-6"></i>
              </div>
              <div>
                <h4 class="font-bold text-slate-900 text-sm">Trusted Platform</h4>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Verified sellers, genuine Vahan RTO records & secure escrow deposits.</p>
              </div>
            </div>

            <div class="card-white p-6 flex items-start gap-4">
              <div class="w-12 h-12 rounded-2xl bg-sky-50 text-[#39A7FF] flex items-center justify-center flex-shrink-0">
                <i data-lucide="gavel" class="w-6 h-6"></i>
              </div>
              <div>
                <h4 class="font-bold text-slate-900 text-sm">Live Auctions</h4>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Copart-style real-time bidding room with transparent price discovery.</p>
              </div>
            </div>

            <div class="card-white p-6 flex items-start gap-4">
              <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <i data-lucide="layers" class="w-6 h-6"></i>
              </div>
              <div>
                <h4 class="font-bold text-slate-900 text-sm">Wide Selection</h4>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Clean title pre-owned, insurance salvage, bank repossessed & commercial fleet.</p>
              </div>
            </div>

            <div class="card-white p-6 flex items-start gap-4">
              <div class="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                <i data-lucide="truck" class="w-6 h-6"></i>
              </div>
              <div>
                <h4 class="font-bold text-slate-900 text-sm">Doorstep Delivery</h4>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Pan-India flatbed towing and fast RTO transfer assistance included.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- VEHICLE CATEGORIES SHOWCASE -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-2xl sm:text-3xl font-black text-white font-heading">Browse by Category</h2>
              <p class="text-xs text-slate-400 mt-1">Explore inventory curated for every buyer profile</p>
            </div>
            <button onclick="window.navigateTo('browse')" class="text-xs font-bold text-[#39A7FF] hover:underline flex items-center gap-1">
              View All <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            ${[
              { id: 'suvs', label: 'SUVs & MUVs', count: '1,420 Lots', icon: 'shield' },
              { id: 'sedans', label: 'Sedans', count: '890 Lots', icon: 'car' },
              { id: 'luxury', label: 'VIP Luxury', count: '240 Lots', icon: 'sparkles' },
              { id: 'commercial', label: 'Commercial Fleet', count: '650 Lots', icon: 'truck' },
              { id: 'bikes', label: 'Bikes & Scooters', count: '420 Lots', icon: 'bike' },
              { id: 'all', label: 'Salvage / Scrap', count: '1,180 Lots', icon: 'wrench' }
            ].map(cat => `
              <div 
                onclick="store.filters.category='${cat.id}'; window.navigateTo('browse');" 
                class="card-navy p-4 rounded-2xl text-center cursor-pointer group hover:border-[#087CFF] transition-all"
              >
                <div class="w-12 h-12 rounded-xl bg-[#0E2A42] text-[#39A7FF] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:bg-[#087CFF] group-hover:text-white transition-all">
                  <i data-lucide="${cat.icon}" class="w-6 h-6"></i>
                </div>
                <p class="text-xs font-bold text-white group-hover:text-[#39A7FF] transition-colors">${cat.label}</p>
                <p class="text-[10px] text-slate-400 mt-0.5">${cat.count}</p>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- LIVE AUCTION SPOTLIGHT -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="rounded-3xl bg-gradient-to-r from-[#0B2235] via-[#0E2A42] to-[#0B2235] border border-[#163959] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div class="lg:col-span-7 space-y-4">
                <div class="flex items-center gap-2">
                  <span class="px-3 py-1 rounded-full text-xs font-black uppercase bg-red-600 text-white animate-pulse flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-white"></span>
                    Live on Virtual Block
                  </span>
                  <span class="text-xs font-mono text-slate-400 font-bold">Lot #${liveLot.lotNumber}</span>
                </div>
                <h3 class="text-2xl sm:text-3xl font-black text-white font-heading">${liveLot.title}</h3>
                <p class="text-xs text-slate-300 max-w-lg">${liveLot.variant} • ${liveLot.rtoState} RTO • ${liveLot.conditionLabel}</p>

                <!-- LIVE TIMERS & PRICE -->
                <div class="flex flex-wrap items-center gap-6 pt-2">
                  <div>
                    <p class="text-[11px] font-bold uppercase text-slate-400">Current High Bid</p>
                    <p class="text-2xl sm:text-3xl font-black text-[#39A7FF] font-mono">${formatINR(liveLot.currentBid)}</p>
                  </div>
                  <div>
                    <p class="text-[11px] font-bold uppercase text-slate-400">Auction Clock</p>
                    <p class="text-2xl sm:text-3xl font-black text-amber-400 font-mono flex items-center gap-2">
                      <i data-lucide="clock" class="w-6 h-6"></i>
                      ${formatCountdown(liveLot.auctionEndsInSeconds)}
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-3 pt-4">
                  <button onclick="window.navigateTo('live')" class="btn-electric px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg">
                    <i data-lucide="flame" class="w-4 h-4"></i>
                    Enter Live Bidding Hall
                  </button>
                  <button onclick="window.appStore.placeBid('${liveLot.id}', 10000)" class="px-5 py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs shadow">
                    Quick Bid +₹10,000
                  </button>
                </div>
              </div>

              <div class="lg:col-span-5">
                <div class="rounded-2xl overflow-hidden border border-[#163959] shadow-xl">
                  <img src="${liveLot.images[0]}" alt="${liveLot.title}" class="w-full h-64 object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- FEATURED VEHICLES (CRISP WHITE SECTION) -->
        <section class="py-12 bg-[#F3F6F9] text-slate-900 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
          <div class="max-w-7xl mx-auto space-y-8">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 class="text-2xl sm:text-3xl font-black text-slate-900 font-heading">Featured Vehicles</h2>
                <p class="text-xs text-slate-500 mt-1">Verified cars with ready inspection certificates and clean legal history</p>
              </div>
              <button onclick="window.navigateTo('browse')" class="btn-electric px-5 py-2.5 rounded-xl text-xs font-bold self-start sm:self-auto">
                Explore All 1,420 Lots
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              ${featured.map(v => renderVehicleCard(v, 'grid')).join('')}
            </div>
          </div>
        </section>

        <!-- HOW IT WORKS IN INDIA -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-2xl mx-auto mb-12">
            <h2 class="text-2xl sm:text-3xl font-black text-white font-heading">How Bid My Car Works</h2>
            <p class="text-xs text-slate-400 mt-2">Transparent, streamlined vehicle liquidation for buyers and sellers across India</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="card-navy p-6 rounded-2xl relative">
              <span class="text-4xl font-black text-[#087CFF]/30 font-mono absolute top-4 right-4">01</span>
              <div class="w-10 h-10 rounded-xl bg-[#087CFF] text-white flex items-center justify-center font-bold text-sm mb-4">1</div>
              <h4 class="font-bold text-white text-sm">Register & KYC</h4>
              <p class="text-xs text-slate-400 mt-1.5 leading-relaxed">Instant Aadhaar & PAN verification. Deposit refundable EMD wallet balance to unlock buying power.</p>
            </div>

            <div class="card-navy p-6 rounded-2xl relative">
              <span class="text-4xl font-black text-[#087CFF]/30 font-mono absolute top-4 right-4">02</span>
              <div class="w-10 h-10 rounded-xl bg-[#087CFF] text-white flex items-center justify-center font-bold text-sm mb-4">2</div>
              <h4 class="font-bold text-white text-sm">Inspect 150+ Points</h4>
              <p class="text-xs text-slate-400 mt-1.5 leading-relaxed">Review certified inspection sheets, Vahan RC status, e-Challans, and HD damage photos.</p>
            </div>

            <div class="card-navy p-6 rounded-2xl relative">
              <span class="text-4xl font-black text-[#087CFF]/30 font-mono absolute top-4 right-4">03</span>
              <div class="w-10 h-10 rounded-xl bg-[#087CFF] text-white flex items-center justify-center font-bold text-sm mb-4">3</div>
              <h4 class="font-bold text-white text-sm">Bid in Real-Time</h4>
              <p class="text-xs text-slate-400 mt-1.5 leading-relaxed">Place live bids in the virtual Copart hall. Dynamic timer extensions protect against last-second sniping.</p>
            </div>

            <div class="card-navy p-6 rounded-2xl relative">
              <span class="text-4xl font-black text-[#087CFF]/30 font-mono absolute top-4 right-4">04</span>
              <div class="w-10 h-10 rounded-xl bg-[#087CFF] text-white flex items-center justify-center font-bold text-sm mb-4">4</div>
              <h4 class="font-bold text-white text-sm">Doorstep Delivery</h4>
              <p class="text-xs text-slate-400 mt-1.5 leading-relaxed">Pick up from our secure mega yards or request insured flatbed truck delivery with RTO NOC transfer.</p>
            </div>
          </div>
        </section>

        <!-- SELL YOUR VEHICLE CTA BANNER -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="rounded-3xl bg-gradient-to-r from-[#0B2235] via-[#0E2A42] to-[#087CFF] p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-[#163959]">
            <div class="space-y-3 max-w-xl">
              <span class="px-3 py-1 rounded-full text-xs font-bold uppercase bg-white/10 text-[#39A7FF] border border-white/20">For Individual Owners & Fleet Managers</span>
              <h3 class="text-2xl sm:text-4xl font-black font-heading leading-tight">Got a Car to Sell? Get the Highest Auction Value.</h3>
              <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">
                List your clean, accidental, or non-running car in front of 50,000+ verified buyers across India. Free 150-point inspection and guaranteed payout within 48 hours.
              </p>
            </div>
            <button onclick="window.navigateTo('add-vehicle')" class="btn-electric bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-2xl font-black text-sm shadow-xl flex-shrink-0">
              List Your Vehicle Free
            </button>
          </div>
        </section>

        <!-- FAQ ACCORDION -->
        <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8">
            <h2 class="text-2xl sm:text-3xl font-black text-white font-heading">Frequently Asked Questions</h2>
            <p class="text-xs text-slate-400 mt-1">Everything you need to know about vehicle auctions in India</p>
          </div>

          <div class="space-y-3" id="faq-container">
            ${[
              { q: "Can individual normal buyers purchase vehicles on Bid My Car?", a: "Yes! While platforms like Copart in the US often require dealer licenses, Bid My Car allows verified individuals with a valid Aadhaar and PAN card to bid on clean-title and selected salvage vehicles." },
              { q: "How does the refundable security deposit (EMD) work?", a: "To ensure serious bidding, users deposit a refundable Earnest Money Deposit (EMD). A ₹50,000 deposit provides ₹5,00,000 in bidding power (10x). If you do not win any lots, your deposit can be refunded to your bank account with one click." },
              { q: "How does RTO transfer and interstate NOC work?", a: "For clean-title vehicles, we provide signed Form 29/30 along with original RC and bank NOC. If transporting between states (e.g., Haryana to Karnataka), our concierge team handles the RTO Form 28 interstate NOC transfer." },
              { q: "Can I inspect the vehicle in person before placing a bid?", a: "Absolutely. All vehicles are housed in our secured pan-India mega yards (Manesar, Bhiwandi, Nelamangala, etc.). You or your trusted mechanic can visit during gate hours (9 AM - 6 PM) to inspect the engine and chassis." }
            ].map((faq, i) => `
              <div class="card-navy rounded-xl overflow-hidden border border-[#163959]">
                <button onclick="this.nextElementSibling.classList.toggle('hidden');" class="w-full p-4 text-left font-bold text-xs sm:text-sm text-white flex items-center justify-between hover:text-[#39A7FF] transition-colors">
                  <span>${faq.q}</span>
                  <i data-lucide="chevron-down" class="w-4 h-4 flex-shrink-0"></i>
                </button>
                <div class="px-4 pb-4 text-xs text-slate-300 border-t border-[#163959]/40 pt-3 leading-relaxed hidden">
                  ${faq.a}
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      </div>
    `;
  }

  // --- 13. PAGE 2: BROWSE VEHICLES CATALOG VIEW ---
  function renderBrowseView() {
    const vehicles = store.getFilteredVehicles();
    const f = store.filters;

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <!-- BROWSE HEADER & BREADCRUMBS -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <nav class="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <span onclick="window.navigateTo('home')" class="hover:text-white cursor-pointer">Home</span>
              <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
              <span class="text-[#39A7FF] font-bold">Browse Vehicles</span>
            </nav>
            <h1 class="text-2xl sm:text-3xl font-black text-white font-heading">
              Vehicle Inventory Catalog 
              <span class="text-xs font-mono font-bold text-[#39A7FF] bg-[#0B2235] px-2.5 py-1 rounded-full border border-[#163959] ml-2">
                ${vehicles.length} Lots Available
              </span>
            </h1>
          </div>

          <!-- CONTROLS: SORT & VIEW MODE -->
          <div class="flex items-center gap-3">
            <div class="bg-[#0B2235] border border-[#163959] rounded-xl px-3 py-1.5 flex items-center gap-2 text-xs">
              <span class="text-slate-400 font-bold uppercase text-[10px]">Sort By:</span>
              <select 
                onchange="store.filters.sortBy = this.value; renderActiveView();" 
                class="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
              >
                <option value="countdown" ${f.sortBy === 'countdown' ? 'selected' : ''}>Ending Soonest</option>
                <option value="bid_low_high" ${f.sortBy === 'bid_low_high' ? 'selected' : ''}>Price: Low to High</option>
                <option value="bid_high_low" ${f.sortBy === 'bid_high_low' ? 'selected' : ''}>Price: High to Low</option>
                <option value="newest" ${f.sortBy === 'newest' ? 'selected' : ''}>Model Year</option>
              </select>
            </div>

            <div class="bg-[#0B2235] border border-[#163959] rounded-xl p-1 flex items-center gap-1">
              <button onclick="store.currentViewMode = 'grid'; renderActiveView();" class="p-1.5 rounded-lg ${store.currentViewMode === 'grid' ? 'bg-[#087CFF] text-white shadow' : 'text-slate-400 hover:text-white'}">
                <i data-lucide="grid" class="w-4 h-4"></i>
              </button>
              <button onclick="store.currentViewMode = 'list'; renderActiveView();" class="p-1.5 rounded-lg ${store.currentViewMode === 'list' ? 'bg-[#087CFF] text-white shadow' : 'text-slate-400 hover:text-white'}">
                <i data-lucide="list" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- MAIN LAYOUT: SIDEBAR FILTERS + RESULTS -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <!-- SIDEBAR FILTERS -->
          <div class="lg:col-span-3 space-y-5">
            <div class="card-navy p-5 rounded-2xl space-y-6">
              <div class="flex items-center justify-between pb-3 border-b border-[#163959]">
                <span class="font-bold text-white text-sm flex items-center gap-2"><i data-lucide="sliders-horizontal" class="w-4 h-4 text-[#087CFF]"></i> Filters</span>
                <button onclick="store.filters = { search: '', category: 'all', fuel: 'all', transmission: 'all', rtoState: 'all', conditionType: 'all', yardId: 'all', maxPrice: 5000000, sortBy: 'countdown' }; renderActiveView();" class="text-[11px] text-[#39A7FF] hover:underline font-bold">Reset</button>
              </div>

              <!-- SEARCH INPUT -->
              <div>
                <label class="block text-xs font-bold text-slate-300 uppercase mb-2">Search Term</label>
                <div class="relative">
                  <input 
                    type="text" 
                    value="${f.search}" 
                    placeholder="Make, Model, VIN..." 
                    class="w-full bg-[#061827] border border-[#163959] rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#087CFF]"
                    oninput="store.filters.search = this.value; renderActiveView();" 
                  />
                  <i data-lucide="search" class="w-3.5 h-3.5 text-slate-500 absolute right-3 top-3"></i>
                </div>
              </div>

              <!-- CATEGORY -->
              <div>
                <label class="block text-xs font-bold text-slate-300 uppercase mb-2">Body Type / Category</label>
                <select 
                  onchange="store.filters.category = this.value; renderActiveView();"
                  class="w-full bg-[#061827] border border-[#163959] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#087CFF]"
                >
                  <option value="all" ${f.category === 'all' ? 'selected' : ''}>All Categories</option>
                  <option value="suvs" ${f.category === 'suvs' ? 'selected' : ''}>SUVs & MUVs</option>
                  <option value="sedans" ${f.category === 'sedans' ? 'selected' : ''}>Sedans & Hatchbacks</option>
                  <option value="luxury" ${f.category === 'luxury' ? 'selected' : ''}>VIP Luxury</option>
                  <option value="commercial" ${f.category === 'commercial' ? 'selected' : ''}>Commercial Trucks</option>
                  <option value="bikes" ${f.category === 'bikes' ? 'selected' : ''}>Motorcycles</option>
                </select>
              </div>

              <!-- STATE RTO FILTER -->
              <div>
                <label class="block text-xs font-bold text-slate-300 uppercase mb-2">State RTO Registration</label>
                <select 
                  onchange="store.filters.rtoState = this.value; renderActiveView();"
                  class="w-full bg-[#061827] border border-[#163959] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#087CFF]"
                >
                  <option value="all" ${f.rtoState === 'all' ? 'selected' : ''}>All States</option>
                  <option value="DL" ${f.rtoState === 'DL' ? 'selected' : ''}>Delhi (DL)</option>
                  <option value="MH" ${f.rtoState === 'MH' ? 'selected' : ''}>Maharashtra (MH)</option>
                  <option value="HR" ${f.rtoState === 'HR' ? 'selected' : ''}>Haryana (HR)</option>
                  <option value="KA" ${f.rtoState === 'KA' ? 'selected' : ''}>Karnataka (KA)</option>
                  <option value="TS" ${f.rtoState === 'TS' ? 'selected' : ''}>Telangana (TS)</option>
                  <option value="TN" ${f.rtoState === 'TN' ? 'selected' : ''}>Tamil Nadu (TN)</option>
                </select>
              </div>

              <!-- CONDITION & SALVAGE TYPE -->
              <div>
                <label class="block text-xs font-bold text-slate-300 uppercase mb-2">Legal & Salvage Status</label>
                <select 
                  onchange="store.filters.conditionType = this.value; renderActiveView();"
                  class="w-full bg-[#061827] border border-[#163959] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#087CFF]"
                >
                  <option value="all" ${f.conditionType === 'all' ? 'selected' : ''}>All Conditions</option>
                  <option value="clean_used" ${f.conditionType === 'clean_used' ? 'selected' : ''}>Clean Title Used Cars</option>
                  <option value="insurance_salvage" ${f.conditionType === 'insurance_salvage' ? 'selected' : ''}>Insurance Salvage (Repairable)</option>
                  <option value="bank_repo" ${f.conditionType === 'bank_repo' ? 'selected' : ''}>Bank Repossessions (NOC Ready)</option>
                </select>
              </div>

              <!-- FUEL & TRANSMISSION -->
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-[10px] font-bold text-slate-300 uppercase mb-1">Fuel</label>
                  <select onchange="store.filters.fuel = this.value; renderActiveView();" class="w-full bg-[#061827] border border-[#163959] rounded-xl p-2 text-xs text-white focus:outline-none">
                    <option value="all">All</option>
                    <option value="Diesel" ${f.fuel === 'Diesel' ? 'selected' : ''}>Diesel</option>
                    <option value="Petrol" ${f.fuel === 'Petrol' ? 'selected' : ''}>Petrol</option>
                    <option value="EV" ${f.fuel === 'EV' ? 'selected' : ''}>Electric/Hybrid</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[10px] font-bold text-slate-300 uppercase mb-1">Gearbox</label>
                  <select onchange="store.filters.transmission = this.value; renderActiveView();" class="w-full bg-[#061827] border border-[#163959] rounded-xl p-2 text-xs text-white focus:outline-none">
                    <option value="all">All</option>
                    <option value="Automatic" ${f.transmission === 'Automatic' ? 'selected' : ''}>Auto</option>
                    <option value="Manual" ${f.transmission === 'Manual' ? 'selected' : ''}>Manual</option>
                  </select>
                </div>
              </div>

              <!-- PAN-INDIA YARD -->
              <div>
                <label class="block text-xs font-bold text-slate-300 uppercase mb-2">Auction Yard Location</label>
                <select 
                  onchange="store.filters.yardId = this.value; renderActiveView();"
                  class="w-full bg-[#061827] border border-[#163959] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#087CFF]"
                >
                  <option value="all">All Mega Yards</option>
                  ${store.yards.map(y => `<option value="${y.id}" ${f.yardId === y.id ? 'selected' : ''}>${y.city} (${y.code})</option>`).join('')}
                </select>
              </div>

            </div>
          </div>

          <!-- RESULTS GRID -->
          <div class="lg:col-span-9 space-y-6">
            ${vehicles.length === 0 ? `
              <div class="card-navy p-12 text-center rounded-3xl space-y-4">
                <div class="w-16 h-16 rounded-2xl bg-[#0E2A42] text-slate-400 flex items-center justify-center mx-auto">
                  <i data-lucide="search-x" class="w-8 h-8 text-[#39A7FF]"></i>
                </div>
                <h3 class="text-xl font-bold text-white">No vehicles found matching your criteria</h3>
                <p class="text-xs text-slate-400 max-w-md mx-auto">Try clearing your filters or searching with a different make, model, or RTO state.</p>
                <button onclick="store.filters = { search: '', category: 'all', fuel: 'all', transmission: 'all', rtoState: 'all', conditionType: 'all', yardId: 'all', maxPrice: 5000000, sortBy: 'countdown' }; renderActiveView();" class="btn-electric px-6 py-2.5 rounded-xl text-xs font-bold">
                  Reset All Filters
                </button>
              </div>
            ` : `
              <div class="${store.currentViewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}">
                ${vehicles.map(v => renderVehicleCard(v, store.currentViewMode)).join('')}
              </div>
            `}
          </div>

        </div>
      </div>
    `;
  }

  // --- 14. PAGE 3: VEHICLE DETAILS VIEW ---
  function renderVehicleDetailsView() {
    const v = store.vehicles.find(x => x.id === store.selectedVehicleId) || store.vehicles[0];
    const yard = store.yards.find(y => y.id === v.yardId) || store.yards[0];
    const isWatch = store.watchlist.has(v.id);

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <!-- BREADCRUMBS -->
        <nav class="flex items-center gap-2 text-xs text-slate-400">
          <span onclick="window.navigateTo('home')" class="hover:text-white cursor-pointer">Home</span>
          <i data-lucide="chevron-right" class="w-3 h-3"></i>
          <span onclick="window.navigateTo('browse')" class="hover:text-white cursor-pointer">Browse Vehicles</span>
          <i data-lucide="chevron-right" class="w-3 h-3"></i>
          <span class="text-[#39A7FF] font-bold truncate max-w-xs">${v.title}</span>
        </nav>

        <!-- TOP HEADER CARD (CRISP WHITE) -->
        <div class="card-white p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-red-600 text-white shadow">Live Auction</span>
              <span class="font-mono text-xs font-bold text-[#087CFF]">Lot #${v.lotNumber}</span>
              <span class="text-xs text-slate-400">• Registered ${v.rtoLocation}</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-black text-slate-900 font-heading">${v.title}</h1>
            <p class="text-xs text-slate-500 mt-1">${v.variant} • ${v.conditionLabel}</p>
          </div>
          <div class="flex items-center gap-3">
            <button onclick="window.appStore.toggleWatchlist('${v.id}')" class="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-2 shadow-sm">
              <i data-lucide="heart" class="w-4 h-4 ${isWatch ? 'fill-red-500 text-red-500' : ''}"></i>
              ${isWatch ? 'Saved' : 'Watch'}
            </button>
            <button onclick="navigator.clipboard.writeText(window.location.href); window.showToast('Copied Link', 'Vehicle link copied to clipboard!', 'info');" class="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-sm" title="Share Vehicle">
              <i data-lucide="share-2" class="w-4 h-4"></i>
            </button>
          </div>
        </div>

        <!-- MAIN DETAILS GRID: GALLERY + BIDDING BOX -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <!-- LEFT: GALLERY & SPEC TABS (8 COLS) -->
          <div class="lg:col-span-8 space-y-6">
            
            <!-- IMAGE GALLERY -->
            <div class="card-white rounded-2xl overflow-hidden p-3 space-y-3">
              <div class="relative h-80 sm:h-[420px] rounded-xl overflow-hidden bg-slate-100">
                <img id="details-main-img" src="${v.images[0]}" alt="${v.title}" class="w-full h-full object-cover" />
                <div class="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-mono font-bold">
                  Inspection Verified Photos (3 Available)
                </div>
              </div>
              <div class="flex gap-3 overflow-x-auto pb-1">
                ${v.images.map((img, i) => `
                  <button onclick="document.getElementById('details-main-img').src = '${img}'" class="w-24 h-16 rounded-lg overflow-hidden border-2 border-slate-200 hover:border-[#087CFF] flex-shrink-0 transition-all">
                    <img src="${img}" class="w-full h-full object-cover" />
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- 6 SPEC GRID -->
            <div class="card-white p-6 rounded-2xl">
              <h3 class="font-bold text-slate-900 text-sm mb-4 uppercase tracking-wider">Key Specifications</h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p class="text-[10px] text-slate-400 uppercase font-bold">Odometer</p>
                  <p class="text-sm font-bold text-slate-900 font-mono mt-0.5">${formatKM(v.odometer)}</p>
                </div>
                <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p class="text-[10px] text-slate-400 uppercase font-bold">Fuel Type</p>
                  <p class="text-sm font-bold text-slate-900 mt-0.5">${v.fuel}</p>
                </div>
                <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p class="text-[10px] text-slate-400 uppercase font-bold">Transmission</p>
                  <p class="text-sm font-bold text-slate-900 mt-0.5">${v.transmission}</p>
                </div>
                <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p class="text-[10px] text-slate-400 uppercase font-bold">Engine / Drive</p>
                  <p class="text-sm font-bold text-emerald-600 mt-0.5">${v.runAndDrive}</p>
                </div>
                <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p class="text-[10px] text-slate-400 uppercase font-bold">Keys</p>
                  <p class="text-sm font-bold text-slate-900 mt-0.5">${v.keysAvailable}</p>
                </div>
                <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p class="text-[10px] text-slate-400 uppercase font-bold">Location</p>
                  <p class="text-sm font-bold text-slate-900 truncate mt-0.5">${yard.city}</p>
                </div>
              </div>
            </div>

            <!-- 150-POINT INSPECTION & DAMAGE REPORT -->
            <div class="card-white p-6 rounded-2xl space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 class="font-bold text-slate-900 text-sm uppercase tracking-wider">Certified 150-Point Inspection</h3>
                  <p class="text-xs text-slate-500">Conducted by certified automotive surveyor at ${yard.name}</p>
                </div>
                <span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs font-mono">
                  ${v.inspection.overallScore} / 100 Score
                </span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div class="space-y-2">
                  <p class="text-slate-500 font-bold uppercase text-[10px]">Mechanical Diagnostics</p>
                  <p class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700"><strong>Engine:</strong> ${v.inspection.engineCompression}</p>
                  <p class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700"><strong>Gearbox:</strong> ${v.inspection.gearbox}</p>
                  <p class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700"><strong>OBD Diagnostics:</strong> ${v.inspection.obdCode}</p>
                </div>
                <div class="space-y-2">
                  <p class="text-slate-500 font-bold uppercase text-[10px]">Chassis & Damage Assessment</p>
                  <p class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700"><strong>Primary Damage:</strong> ${v.primaryDamage}</p>
                  <p class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700"><strong>Repair Estimate:</strong> ₹${v.estimatedRepairCost.toLocaleString('en-IN')}</p>
                  <p class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700"><strong>Tyre Tread:</strong> ${v.inspection.tyres}</p>
                </div>
              </div>
            </div>

            <!-- DOCUMENTS & VAHAN VERIFICATION -->
            <div class="card-white p-6 rounded-2xl">
              <h3 class="font-bold text-slate-900 text-sm mb-3 uppercase tracking-wider">Document & Legal Clearance</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-800">
                  <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-500 flex-shrink-0"></i>
                  <span>${v.documents.rcStatus}</span>
                </div>
                <div class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-800">
                  <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-500 flex-shrink-0"></i>
                  <span>${v.documents.form29_30}</span>
                </div>
                <div class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-800">
                  <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-500 flex-shrink-0"></i>
                  <span>${v.documents.insurance}</span>
                </div>
                <div class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-800">
                  <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-500 flex-shrink-0"></i>
                  <span>${v.documents.challanStatus}</span>
                </div>
              </div>
            </div>

          </div>

          <!-- RIGHT: LIVE BIDDING BOX & SELLER (4 COLS) -->
          <div class="lg:col-span-4 space-y-6">
            
            <!-- BIDDING CARD (CRISP WHITE) -->
            <div class="card-white p-6 rounded-2xl space-y-5 border-2 border-[#087CFF]/20 shadow-xl">
              <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                <span class="text-xs font-bold uppercase text-slate-400">Auction Clock</span>
                <span class="text-xs font-bold text-red-600 flex items-center gap-1">
                  <i data-lucide="flame" class="w-3.5 h-3.5"></i> Live Block
                </span>
              </div>

              <!-- SEGMENTED TIMER -->
              <div>
                <p class="text-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Auction Ends In</p>
                <div class="grid grid-cols-4 gap-2 text-center">
                  <div class="timer-box">
                    <span class="block text-xl font-black text-slate-900 font-mono">00</span>
                    <span class="block text-[9px] uppercase text-slate-400 font-bold">Days</span>
                  </div>
                  <div class="timer-box">
                    <span class="block text-xl font-black text-slate-900 font-mono">01</span>
                    <span class="block text-[9px] uppercase text-slate-400 font-bold">Hours</span>
                  </div>
                  <div class="timer-box">
                    <span class="block text-xl font-black text-slate-900 font-mono">24</span>
                    <span class="block text-[9px] uppercase text-slate-400 font-bold">Mins</span>
                  </div>
                  <div class="timer-box bg-red-50 border-red-200">
                    <span class="block text-xl font-black text-red-600 font-mono">18</span>
                    <span class="block text-[9px] uppercase text-red-400 font-bold">Secs</span>
                  </div>
                </div>
              </div>

              <!-- CURRENT HIGH BID -->
              <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                <p class="text-xs text-slate-400 uppercase font-bold">Current Highest Bid</p>
                <p class="text-3xl font-black text-[#087CFF] font-mono mt-1">${formatINR(v.currentBid)}</p>
                <p class="text-xs text-slate-500 mt-1">${v.bidCount} Bids Placed</p>
              </div>

              <!-- QUICK INCREMENTS -->
              <div class="space-y-2">
                <p class="text-xs font-bold text-slate-600">Quick Bid Increments:</p>
                <div class="grid grid-cols-3 gap-2">
                  <button onclick="window.appStore.placeBid('${v.id}', 2000)" class="py-2.5 rounded-xl border border-slate-200 hover:border-[#087CFF] hover:bg-blue-50 text-xs font-bold text-slate-800 transition-all">+₹2k</button>
                  <button onclick="window.appStore.placeBid('${v.id}', 5000)" class="py-2.5 rounded-xl border border-slate-200 hover:border-[#087CFF] hover:bg-blue-50 text-xs font-bold text-slate-800 transition-all">+₹5k</button>
                  <button onclick="window.appStore.placeBid('${v.id}', 10000)" class="py-2.5 rounded-xl border border-[#087CFF] bg-blue-50 text-xs font-bold text-[#087CFF] transition-all">+₹10k</button>
                </div>
              </div>

              <!-- CUSTOM BID FORM -->
              <div class="space-y-2">
                <div class="relative">
                  <span class="absolute left-3.5 top-3 text-slate-400 font-bold text-sm">₹</span>
                  <input 
                    type="number" 
                    id="custom-bid-input" 
                    placeholder="Enter custom amount..." 
                    class="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#087CFF]"
                    value="${v.currentBid + 15000}"
                  />
                </div>
                <button 
                  onclick="const val = parseInt(document.getElementById('custom-bid-input').value); if(val > ${v.currentBid}) { window.appStore.placeBid('${v.id}', val - ${v.currentBid}); } else { window.showToast('Invalid Bid', 'Bid must be higher than current bid', 'error'); }"
                  class="w-full btn-electric py-3 rounded-xl text-xs font-bold shadow-lg"
                >
                  Place Highest Bid
                </button>
              </div>

              <div class="text-[11px] text-slate-400 space-y-1 pt-2 border-t border-slate-100">
                <p class="flex items-center gap-1.5"><i data-lucide="shield" class="w-3.5 h-3.5 text-emerald-500"></i> Protected by Escrow Deposit</p>
                <p class="flex items-center gap-1.5"><i data-lucide="refresh-cw" class="w-3.5 h-3.5 text-[#39A7FF]"></i> 30s Extension Rule Active</p>
              </div>
            </div>

            <!-- SELLER & YARD INFO -->
            <div class="card-white p-5 rounded-2xl space-y-3">
              <h4 class="font-bold text-slate-900 text-xs uppercase tracking-wider">Seller & Staging Yard</h4>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 font-bold flex items-center justify-center">
                  <i data-lucide="user-check" class="w-5 h-5 text-[#087CFF]"></i>
                </div>
                <div>
                  <p class="text-xs font-bold text-slate-900">${v.sellerName}</p>
                  <p class="text-[10px] text-emerald-600 font-bold">★ ${v.sellerRating} / 5.0 • Verified Seller</p>
                </div>
              </div>
              <div class="pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                <p><strong>Yard:</strong> ${yard.name}</p>
                <p><strong>Address:</strong> ${yard.address}</p>
                <p><strong>Phone:</strong> ${yard.primaryPhone}</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    `;
  }

  // --- 15. PAGE 4: LIVE AUCTION ROOM VIEW (COPART ARENA) ---
  function renderLiveAuctionView() {
    const s = store.liveAuctionStatus;
    const lot = store.vehicles.find(v => v.id === s.lotId) || store.vehicles[1];

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <!-- LIVE ARENA HEADER -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
              <span class="text-xs font-black uppercase tracking-widest text-red-500">Live Virtual Bidding Hall</span>
              <span class="text-slate-500">•</span>
              <span class="text-xs text-slate-400 font-mono">Pan-India Session #BMC-IN-889</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-black text-white font-heading mt-1">Copart-Style Live Block</h1>
          </div>

          <div class="flex items-center gap-3">
            <button onclick="window.auctionAudio.toggleMute(); renderActiveView();" class="px-3.5 py-2 rounded-xl bg-[#0B2235] border border-[#163959] text-xs font-bold text-slate-200 flex items-center gap-1.5 hover:text-white">
              <i data-lucide="${window.auctionAudio.isMuted ? 'volume-x' : 'volume-2'}" class="w-4 h-4 text-[#39A7FF]"></i>
              ${window.auctionAudio.isMuted ? 'Audio Off' : 'Live Audio On'}
            </button>
            <span class="px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              124 Bidders Online
            </span>
          </div>
        </div>

        <!-- MAIN AUCTION THEATER -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <!-- LEFT: VIDEO/PHOTO STREAM (8 COLS) -->
          <div class="lg:col-span-8 space-y-4">
            <div class="relative h-96 sm:h-[480px] rounded-3xl overflow-hidden bg-black border border-[#163959] shadow-2xl">
              <img src="${lot.images[0]}" alt="${lot.title}" class="w-full h-full object-cover opacity-90" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>

              <!-- TOP OVERLAYS -->
              <div class="absolute top-4 left-4 flex items-center gap-2">
                <span class="px-3 py-1 rounded-full text-xs font-black uppercase bg-red-600 text-white shadow flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  Current Lot on Floor
                </span>
                <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-black/60 backdrop-blur-sm text-white border border-white/20">
                  Lot #${lot.lotNumber}
                </span>
              </div>

              <!-- BOT STATUS BANNER -->
              <div class="absolute bottom-4 left-4 right-4 p-5 rounded-2xl bg-[#061827]/90 backdrop-blur-md border border-[#163959] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 class="text-xl font-bold text-white font-heading">${lot.title}</h3>
                  <p class="text-xs text-slate-400 mt-0.5">${lot.variant} • ${lot.rtoLocation}</p>
                </div>
                <div class="text-right">
                  <p class="text-[10px] text-slate-400 uppercase font-bold">Winning Bidder</p>
                  <p class="text-xs font-bold text-emerald-400 font-mono">${s.highBidder}</p>
                </div>
              </div>
            </div>

            <!-- AUDIO TEST & DETAILS BAR -->
            <div class="flex items-center justify-between p-4 rounded-2xl bg-[#0B2235] border border-[#163959] text-xs">
              <div class="flex items-center gap-2 text-slate-300">
                <i data-lucide="info" class="w-4 h-4 text-[#39A7FF]"></i>
                <span>Every bid in final 25 seconds resets timer to 35 seconds to allow fair counter-bidding.</span>
              </div>
              <button onclick="window.auctionAudio.playGavel()" class="text-[#39A7FF] hover:underline font-bold flex items-center gap-1">
                <i data-lucide="hammer" class="w-3.5 h-3.5"></i> Test Gavel
              </button>
            </div>
          </div>

          <!-- RIGHT: LIVE BIDDING CONTROLS & LOG (4 COLS) -->
          <div class="lg:col-span-4 space-y-5">
            
            <!-- BIDDING CONSOLE CARD -->
            <div class="card-navy p-6 rounded-3xl space-y-5 border-2 border-[#087CFF] shadow-2xl">
              <!-- STATUS BADGE -->
              <div class="text-center">
                ${s.isUserHighBidder ? `
                  <div class="p-3 rounded-2xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2">
                    <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400"></i>
                    You Are Currently The Highest Bidder!
                  </div>
                ` : `
                  <div class="p-3 rounded-2xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2">
                    <i data-lucide="alert-triangle" class="w-4 h-4 text-red-400"></i>
                    You Are Outbid! Place Next Bid
                  </div>
                `}
              </div>

              <!-- COUNTDOWN BOX -->
              <div class="text-center py-2">
                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Time Remaining</p>
                <div class="text-4xl font-black font-mono ${s.countdown <= 30 ? 'text-red-500 animate-pulse' : 'text-amber-400'}">
                  ${s.countdown}s
                </div>
                <div class="w-full bg-[#061827] h-2 rounded-full mt-3 overflow-hidden border border-[#163959]">
                  <div class="bg-gradient-to-r from-[#087CFF] to-red-500 h-full transition-all duration-1000" style="width: ${(s.countdown / 120) * 100}%"></div>
                </div>
              </div>

              <!-- CURRENT BID AMOUNT -->
              <div class="p-4 rounded-2xl bg-[#061827] border border-[#163959] text-center">
                <p class="text-[11px] text-slate-400 uppercase font-bold">Current Lot High Bid</p>
                <p class="text-3xl sm:text-4xl font-black text-white font-mono mt-1 text-[#39A7FF]">${formatINR(s.currentHighBid)}</p>
              </div>

              <!-- INSTANT BID BUTTONS -->
              <div class="space-y-2">
                <button onclick="window.appStore.placeBid('${lot.id}', 10000)" class="w-full btn-electric py-3.5 rounded-2xl font-black text-sm shadow-xl flex items-center justify-center gap-2">
                  <i data-lucide="gavel" class="w-4 h-4"></i>
                  Bid +₹10,000 (₹${(s.currentHighBid + 10000).toLocaleString('en-IN')})
                </button>
                <div class="grid grid-cols-2 gap-2">
                  <button onclick="window.appStore.placeBid('${lot.id}', 20000)" class="py-2.5 rounded-xl bg-[#0E2A42] hover:bg-[#133552] text-white text-xs font-bold border border-[#163959]">
                    +₹20,000
                  </button>
                  <button onclick="window.appStore.placeBid('${lot.id}', 50000)" class="py-2.5 rounded-xl bg-[#0E2A42] hover:bg-[#133552] text-white text-xs font-bold border border-[#163959]">
                    +₹50,000
                  </button>
                </div>
              </div>

              <!-- BID HISTORY ACTIVITY STREAM -->
              <div class="space-y-2 pt-2 border-t border-[#163959]">
                <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Bidding Feed</p>
                <div class="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  ${s.bidHistory.map(b => `
                    <div class="flex items-center justify-between p-2 rounded-xl text-xs ${b.isUser ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300' : 'bg-[#061827] border border-[#163959]/60 text-slate-300'}">
                      <span class="font-bold truncate max-w-[150px]">${b.bidder}</span>
                      <span class="font-mono font-bold">${formatINR(b.amount)}</span>
                      <span class="text-[10px] text-slate-500">${b.time}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    `;
  }

  // --- 16. PAGE 5: BUYER DASHBOARD ---
  function renderBuyerDashboardView() {
    const activeBids = Array.from(store.userBids.entries()).map(([lotId, amount]) => {
      const v = store.vehicles.find(x => x.id === lotId);
      return { vehicle: v, amount };
    }).filter(x => x.vehicle);

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <!-- HEADER -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl sm:text-3xl font-black text-white font-heading">Buyer Command Center</h1>
            <p class="text-xs text-slate-400 mt-1">Welcome back, ${store.userProfile.name} • Registered Pan-India Yard: ${store.yards[1].city}</p>
          </div>
          <div class="flex items-center gap-3">
            <button onclick="window.navigateTo('browse')" class="btn-electric px-4 py-2 rounded-xl text-xs font-bold">
              Find More Cars
            </button>
          </div>
        </div>

        <!-- STATS CARDS -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="card-navy p-5 rounded-2xl">
            <p class="text-xs text-slate-400 uppercase font-bold">Active Bids</p>
            <p class="text-2xl sm:text-3xl font-black text-white font-mono mt-1">${activeBids.length}</p>
            <p class="text-[11px] text-[#39A7FF] mt-1 font-bold">2 Ending Today</p>
          </div>
          <div class="card-navy p-5 rounded-2xl">
            <p class="text-xs text-slate-400 uppercase font-bold">Won Lots</p>
            <p class="text-2xl sm:text-3xl font-black text-white font-mono mt-1">1</p>
            <p class="text-[11px] text-emerald-400 mt-1 font-bold">Gate Pass Ready</p>
          </div>
          <div class="card-navy p-5 rounded-2xl">
            <p class="text-xs text-slate-400 uppercase font-bold">Watchlist Items</p>
            <p class="text-2xl sm:text-3xl font-black text-white font-mono mt-1">${store.watchlist.size}</p>
            <p class="text-[11px] text-slate-400 mt-1">Price Alerts On</p>
          </div>
          <div class="card-navy p-5 rounded-2xl">
            <p class="text-xs text-slate-400 uppercase font-bold">Available Buying Power</p>
            <p class="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1">${formatINR(store.userProfile.buyingPower)}</p>
            <p class="text-[11px] text-slate-400 mt-1">EMD Deposit: ₹50,000</p>
          </div>
        </div>

        <!-- ACTIVE BIDS TABLE -->
        <div class="card-navy rounded-2xl overflow-hidden border border-[#163959]">
          <div class="p-5 border-b border-[#163959] flex items-center justify-between">
            <h3 class="font-bold text-white text-sm">Your Active Bids & Live Auction Status</h3>
            <span class="text-xs text-[#39A7FF] font-bold cursor-pointer hover:underline" onclick="window.navigateTo('live')">Join Live Arena →</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-slate-300">
              <thead class="bg-[#061827] text-slate-400 uppercase text-[10px] font-bold border-b border-[#163959]">
                <tr>
                  <th class="p-4">Vehicle / Lot</th>
                  <th class="p-4">Your Bid</th>
                  <th class="p-4">Current High</th>
                  <th class="p-4">Time Left</th>
                  <th class="p-4">Status</th>
                  <th class="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#163959]/60">
                ${activeBids.map(b => {
                  const isHigh = b.vehicle.currentBid === b.amount;
                  return `
                    <tr class="hover:bg-[#0E2A42]/50 transition-colors">
                      <td class="p-4 font-bold text-white flex items-center gap-3">
                        <img src="${b.vehicle.images[0]}" class="w-12 h-9 rounded-lg object-cover" />
                        <div>
                          <p class="hover:text-[#087CFF] cursor-pointer" onclick="window.navigateTo('details', '${b.vehicle.id}')">${b.vehicle.title}</p>
                          <p class="text-[10px] text-slate-400 font-mono">Lot #${b.vehicle.lotNumber} • ${b.vehicle.rtoState}</p>
                        </div>
                      </td>
                      <td class="p-4 font-mono font-bold">${formatINR(b.amount)}</td>
                      <td class="p-4 font-mono font-bold text-[#39A7FF]">${formatINR(b.vehicle.currentBid)}</td>
                      <td class="p-4 font-bold text-amber-400">${formatCountdown(b.vehicle.auctionEndsInSeconds)}</td>
                      <td class="p-4">
                        ${isHigh ? '<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/40">Winning</span>' : '<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-950 text-red-400 border border-red-500/40">Outbid</span>'}
                      </td>
                      <td class="p-4 text-right">
                        <button onclick="window.appStore.placeBid('${b.vehicle.id}', 5000)" class="btn-electric px-3 py-1.5 rounded-lg text-xs font-bold">
                          Counter +₹5k
                        </button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // --- 17. PAGE 6: SELLER DASHBOARD ---
  function renderSellerDashboardView() {
    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl sm:text-3xl font-black text-white font-heading">Seller Command Center</h1>
            <p class="text-xs text-slate-400 mt-1">Manage listings, view auction reserves & track settlement payouts</p>
          </div>
          <button onclick="window.navigateTo('add-vehicle')" class="btn-electric px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg">
            <i data-lucide="plus-circle" class="w-4 h-4"></i> List New Vehicle
          </button>
        </div>

        <!-- STATS -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="card-navy p-5 rounded-2xl">
            <p class="text-xs text-slate-400 uppercase font-bold">Vehicles Listed</p>
            <p class="text-2xl sm:text-3xl font-black text-white font-mono mt-1">4</p>
            <p class="text-[11px] text-[#39A7FF] mt-1 font-bold">2 Live on Floor</p>
          </div>
          <div class="card-navy p-5 rounded-2xl">
            <p class="text-xs text-slate-400 uppercase font-bold">Reserve Reached</p>
            <p class="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1">1 Lot</p>
            <p class="text-[11px] text-slate-400 mt-1">Ready for Sale Approval</p>
          </div>
          <div class="card-navy p-5 rounded-2xl">
            <p class="text-xs text-slate-400 uppercase font-bold">Total Bid Volume</p>
            <p class="text-2xl sm:text-3xl font-black text-white font-mono mt-1">₹42.8 Lakh</p>
            <p class="text-[11px] text-slate-400 mt-1">Across 85 Bids</p>
          </div>
          <div class="card-navy p-5 rounded-2xl">
            <p class="text-xs text-slate-400 uppercase font-bold">Settlement Due</p>
            <p class="text-2xl sm:text-3xl font-black text-[#39A7FF] font-mono mt-1">₹10.5 Lakh</p>
            <p class="text-[11px] text-emerald-400 mt-1">Payout in 48h</p>
          </div>
        </div>

        <!-- LISTINGS TABLE -->
        <div class="card-navy rounded-2xl overflow-hidden border border-[#163959]">
          <div class="p-5 border-b border-[#163959] flex items-center justify-between">
            <h3 class="font-bold text-white text-sm">Your Active Vehicle Listings</h3>
            <span class="text-xs text-slate-400">Showing 4 units</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-slate-300">
              <thead class="bg-[#061827] text-slate-400 uppercase text-[10px] font-bold border-b border-[#163959]">
                <tr>
                  <th class="p-4">Vehicle</th>
                  <th class="p-4">Reserve Price</th>
                  <th class="p-4">Current Bid</th>
                  <th class="p-4">Reserve Met?</th>
                  <th class="p-4">Status</th>
                  <th class="p-4 text-right">Options</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#163959]/60">
                ${store.vehicles.slice(0, 4).map(v => `
                  <tr class="hover:bg-[#0E2A42]/50">
                    <td class="p-4 font-bold text-white flex items-center gap-3">
                      <img src="${v.images[0]}" class="w-12 h-9 rounded-lg object-cover" />
                      <div>
                        <p>${v.title}</p>
                        <p class="text-[10px] text-slate-400 font-mono">Lot #${v.lotNumber}</p>
                      </div>
                    </td>
                    <td class="p-4 font-mono font-bold">${formatINR(v.reservePrice)}</td>
                    <td class="p-4 font-mono font-bold text-[#087CFF]">${formatINR(v.currentBid)}</td>
                    <td class="p-4">
                      ${v.currentBid >= v.reservePrice ? '<span class="text-emerald-400 font-bold">✓ Reserve Met</span>' : '<span class="text-amber-400 font-bold">Pending Reserve</span>'}
                    </td>
                    <td class="p-4">
                      <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-500/40">Active in Yard</span>
                    </td>
                    <td class="p-4 text-right">
                      <button onclick="window.navigateTo('details', '${v.id}')" class="px-3 py-1.5 rounded-lg bg-[#0E2A42] hover:bg-[#133552] text-xs font-bold text-white">View Lot</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // --- 18. PAGE 7: ADD VEHICLE WIZARD ---
  function renderAddVehicleView() {
    return `
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div>
          <nav class="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span onclick="window.navigateTo('home')" class="hover:text-white cursor-pointer">Home</span>
            <i data-lucide="chevron-right" class="w-3 h-3"></i>
            <span class="text-[#39A7FF] font-bold">List Vehicle for Auction</span>
          </nav>
          <h1 class="text-2xl sm:text-3xl font-black text-white font-heading">Sell Your Vehicle in 4 Simple Steps</h1>
          <p class="text-xs text-slate-400 mt-1">Get verified buyer bids from 18+ mega yards across India</p>
        </div>

        <!-- 4-STEP WIZARD CONTAINER -->
        <div class="card-navy p-6 sm:p-8 rounded-3xl space-y-8 border border-[#163959]">
          
          <!-- PROGRESS INDICATOR -->
          <div class="grid grid-cols-4 gap-2 text-center text-xs font-bold">
            <div class="pb-2 border-b-2 border-[#087CFF] text-[#39A7FF]">1. Details</div>
            <div class="pb-2 border-b-2 border-[#087CFF] text-[#39A7FF]">2. Condition</div>
            <div class="pb-2 border-b-2 border-slate-700 text-slate-500">3. Photos</div>
            <div class="pb-2 border-b-2 border-slate-700 text-slate-500">4. Pricing</div>
          </div>

          <form onsubmit="event.preventDefault(); window.showToast('Vehicle Submitted!', 'Your vehicle has been submitted for yard inspection & auction scheduling.', 'success'); window.navigateTo('seller-dashboard');" class="space-y-6">
            
            <!-- STEP 1: IDENTITY -->
            <div class="space-y-4">
              <h3 class="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <i data-lucide="car" class="w-4 h-4 text-[#087CFF]"></i> Step 1: Vehicle Registration & Identity
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-slate-300 uppercase mb-1">Registration Number (RC)</label>
                  <input type="text" required placeholder="e.g. MH 02 DQ 8821" class="w-full bg-[#061827] border border-[#163959] rounded-xl px-3 py-2.5 text-xs text-white uppercase font-mono focus:outline-none focus:border-[#087CFF]" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-300 uppercase mb-1">Make & Model</label>
                  <input type="text" required placeholder="e.g. Mahindra Scorpio-N Z8L" class="w-full bg-[#061827] border border-[#163959] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#087CFF]" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-300 uppercase mb-1">Model Year</label>
                  <input type="number" required value="2022" class="w-full bg-[#061827] border border-[#163959] rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#087CFF]" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-300 uppercase mb-1">Odometer Reading (KM)</label>
                  <input type="number" required placeholder="e.g. 35000" class="w-full bg-[#061827] border border-[#163959] rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#087CFF]" />
                </div>
              </div>
            </div>

            <!-- STEP 2: STAGING YARD & CONDITION -->
            <div class="space-y-4 pt-4 border-t border-[#163959]">
              <h3 class="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <i data-lucide="map-pin" class="w-4 h-4 text-[#087CFF]"></i> Step 2: Preferred Yard & Drive Status
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-slate-300 uppercase mb-1">Drop-off Mega Yard</label>
                  <select class="w-full bg-[#061827] border border-[#163959] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none">
                    ${store.yards.map(y => `<option value="${y.id}">${y.name}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-300 uppercase mb-1">Engine & Drivetrain Status</label>
                  <select class="w-full bg-[#061827] border border-[#163959] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none">
                    <option>Runs & Drives (Clean Mechanicals)</option>
                    <option>Engine Starts Only (Accidental / Tow Required)</option>
                    <option>Non-Runner / Scrap Condition</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- STEP 3: PRICING -->
            <div class="space-y-4 pt-4 border-t border-[#163959]">
              <h3 class="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <i data-lucide="tag" class="w-4 h-4 text-[#087CFF]"></i> Step 3: Reserve Price & Auction Floor
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-slate-300 uppercase mb-1">Minimum Reserve Price (₹)</label>
                  <input type="number" required placeholder="e.g. 1200000" class="w-full bg-[#061827] border border-[#163959] rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#087CFF]" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-300 uppercase mb-1">Instant Buy-It-Now Price (Optional)</label>
                  <input type="number" placeholder="e.g. 1450000" class="w-full bg-[#061827] border border-[#163959] rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#087CFF]" />
                </div>
              </div>
            </div>

            <div class="pt-6 border-t border-[#163959] flex items-center justify-end gap-3">
              <button type="button" onclick="window.navigateTo('seller-dashboard')" class="px-5 py-2.5 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 hover:text-white">Cancel</button>
              <button type="submit" class="btn-electric px-8 py-3 rounded-xl text-xs font-bold shadow-lg">Submit for Yard Inspection</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  // --- 19. PAGE 8: WATCHLIST VIEW ---
  function renderWatchlistView() {
    const saved = store.vehicles.filter(v => store.watchlist.has(v.id));

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl sm:text-3xl font-black text-white font-heading">Your Saved Watchlist</h1>
            <p class="text-xs text-slate-400 mt-1">Get instant price drops and ending-soon alerts on your bookmarked vehicles</p>
          </div>
          <button onclick="window.navigateTo('browse')" class="btn-electric px-4 py-2 rounded-xl text-xs font-bold">
            Browse More Vehicles
          </button>
        </div>

        ${saved.length === 0 ? `
          <div class="card-navy p-12 text-center rounded-3xl space-y-4">
            <div class="w-16 h-16 rounded-2xl bg-[#0E2A42] text-slate-400 flex items-center justify-center mx-auto">
              <i data-lucide="heart" class="w-8 h-8 text-rose-400"></i>
            </div>
            <h3 class="text-xl font-bold text-white">Your Watchlist is Empty</h3>
            <p class="text-xs text-slate-400 max-w-md mx-auto">Click the heart icon on any vehicle card to bookmark it and track live bids.</p>
            <button onclick="window.navigateTo('browse')" class="btn-electric px-6 py-2.5 rounded-xl text-xs font-bold">
              Explore Auctions
            </button>
          </div>
        ` : `
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${saved.map(v => renderVehicleCard(v, 'grid')).join('')}
          </div>
        `}
      </div>
    `;
  }

  // --- 20. PAGE 9: MY BIDS VIEW ---
  function renderMyBidsView() {
    const activeBids = Array.from(store.userBids.entries()).map(([lotId, amount]) => {
      const v = store.vehicles.find(x => x.id === lotId);
      return { vehicle: v, amount };
    }).filter(x => x.vehicle);

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 class="text-2xl sm:text-3xl font-black text-white font-heading">My Active & Past Bids</h1>
          <p class="text-xs text-slate-400 mt-1">Track your bidding status across all live Pan-India lots</p>
        </div>

        <!-- HIGH PRIORITY OUTBID ALERT -->
        <div class="p-4 rounded-2xl bg-red-950/80 border border-red-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-red-900/60 text-red-400 flex items-center justify-center flex-shrink-0">
              <i data-lucide="alert-triangle" class="w-5 h-5"></i>
            </div>
            <div>
              <p class="text-xs font-bold text-white">Action Required: You have been outbid on 1 lot</p>
              <p class="text-xs text-red-300">2022 Tata Safari Dark Edition • Next bid increment: ₹8,95,000</p>
            </div>
          </div>
          <button onclick="window.navigateTo('live')" class="btn-electric px-4 py-2 rounded-xl text-xs font-bold shadow flex-shrink-0">
            Counter Bid in Live Arena
          </button>
        </div>

        <!-- BIDS LIST -->
        <div class="card-navy rounded-2xl overflow-hidden border border-[#163959]">
          <div class="p-4 border-b border-[#163959] flex items-center justify-between">
            <h3 class="font-bold text-white text-xs uppercase tracking-wider">All Active Bids</h3>
            <span class="text-xs text-slate-400">${activeBids.length} Lots Active</span>
          </div>

          <div class="divide-y divide-[#163959]/60">
            ${activeBids.map(b => `
              <div class="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#0E2A42]/40 transition-colors">
                <div class="flex items-center gap-4">
                  <img src="${b.vehicle.images[0]}" class="w-16 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 class="font-bold text-white text-sm hover:text-[#087CFF] cursor-pointer" onclick="window.navigateTo('details', '${b.vehicle.id}')">${b.vehicle.title}</h4>
                    <p class="text-xs text-slate-400">Lot #${b.vehicle.lotNumber} • Ends in <strong class="text-amber-400 font-mono">${formatCountdown(b.vehicle.auctionEndsInSeconds)}</strong></p>
                  </div>
                </div>
                <div class="flex items-center gap-6">
                  <div>
                    <p class="text-[10px] text-slate-400 uppercase font-bold">Your Placed Bid</p>
                    <p class="text-base font-bold text-white font-mono">${formatINR(b.amount)}</p>
                  </div>
                  <div>
                    <p class="text-[10px] text-slate-400 uppercase font-bold">Current Top Bid</p>
                    <p class="text-base font-bold text-[#39A7FF] font-mono">${formatINR(b.vehicle.currentBid)}</p>
                  </div>
                  <button onclick="window.appStore.placeBid('${b.vehicle.id}', 5000)" class="btn-electric px-4 py-2 rounded-xl text-xs font-bold">
                    Bid +₹5k
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // --- 21. PAGE 10: NOTIFICATIONS CENTER ---
  function renderNotificationsView() {
    return `
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl sm:text-3xl font-black text-white font-heading">Notifications Center</h1>
            <p class="text-xs text-slate-400 mt-1">Real-time alerts, outbid warnings & payment receipts</p>
          </div>
          <button onclick="store.notifications.forEach(n => n.read = true); window.showToast('Marked as Read', 'All notifications cleared.', 'info'); renderActiveView(); renderNavbar();" class="text-xs text-[#39A7FF] hover:underline font-bold">
            Mark all as read
          </button>
        </div>

        <div class="card-navy rounded-2xl overflow-hidden border border-[#163959] divide-y divide-[#163959]/60">
          ${store.notifications.map(n => `
            <div class="p-5 flex items-start gap-4 hover:bg-[#0E2A42]/40 transition-colors ${n.read ? 'opacity-70' : 'bg-[#0E2A42]/20'}">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${n.type === 'warning' ? 'bg-amber-950 text-amber-400' : n.type === 'success' ? 'bg-emerald-950 text-emerald-400' : 'bg-blue-950 text-[#39A7FF]'}">
                <i data-lucide="${n.type === 'warning' ? 'alert-triangle' : n.type === 'success' ? 'check-circle-2' : 'info'}" class="w-5 h-5"></i>
              </div>
              <div class="flex-grow">
                <div class="flex items-center justify-between">
                  <h4 class="font-bold text-white text-sm">${n.title}</h4>
                  <span class="text-[10px] text-slate-500 font-mono">${n.time}</span>
                </div>
                <p class="text-xs text-slate-300 mt-1 leading-relaxed">${n.message}</p>
                ${n.lotId ? `<button onclick="window.navigateTo('details', '${n.lotId}')" class="mt-2 text-xs font-bold text-[#39A7FF] hover:underline">View Auction Lot →</button>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // --- 22. PAGE 11: USER PROFILE & KYC ---
  function renderProfileView() {
    const p = store.userProfile;

    return `
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div>
          <h1 class="text-2xl sm:text-3xl font-black text-white font-heading">User Profile & KYC Verification</h1>
          <p class="text-xs text-slate-400 mt-1">Manage personal credentials, Vahan buyer limits & security deposits</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <!-- LEFT CARD -->
          <div class="card-navy p-6 rounded-2xl text-center space-y-4">
            <div class="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#087CFF] to-[#39A7FF] text-white font-black text-2xl flex items-center justify-center mx-auto shadow-xl">
              VM
            </div>
            <div>
              <h3 class="font-bold text-white text-base">${p.name}</h3>
              <p class="text-xs text-slate-400">${p.email}</p>
            </div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
              <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
              ${p.kycStatus}
            </div>
            <div class="pt-4 border-t border-[#163959] text-xs text-slate-400 text-left space-y-2">
              <p><strong>Phone:</strong> ${p.phone}</p>
              <p><strong>City:</strong> ${p.city}</p>
              <p><strong>Member Since:</strong> ${p.memberSince}</p>
            </div>
          </div>

          <!-- RIGHT KYC & WALLET CARDS -->
          <div class="md:col-span-2 space-y-6">
            
            <!-- WALLET POWER CARD -->
            <div class="card-navy p-6 rounded-2xl space-y-4 border-2 border-[#087CFF]/40">
              <div class="flex items-center justify-between pb-3 border-b border-[#163959]">
                <div>
                  <h4 class="font-bold text-white text-sm">Escrow Security Deposit Wallet</h4>
                  <p class="text-xs text-slate-400">100% refundable Earnest Money Deposit (EMD)</p>
                </div>
                <button onclick="window.showToast('Deposit Portal', 'Mock payment gateway simulated. ₹25,000 added!', 'success'); store.userProfile.depositBalance += 25000; store.userProfile.buyingPower += 250000; renderActiveView();" class="btn-electric px-4 py-2 rounded-xl text-xs font-bold">
                  + Add Deposit
                </button>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="bg-[#061827] p-4 rounded-xl border border-[#163959]">
                  <p class="text-[10px] text-slate-400 uppercase font-bold">Current EMD Deposit</p>
                  <p class="text-2xl font-black text-white font-mono mt-1">${formatINR(p.depositBalance)}</p>
                </div>
                <div class="bg-[#061827] p-4 rounded-xl border border-[#163959]">
                  <p class="text-[10px] text-slate-400 uppercase font-bold">Active Buying Power</p>
                  <p class="text-2xl font-black text-emerald-400 font-mono mt-1">${formatINR(p.buyingPower)}</p>
                </div>
              </div>
            </div>

            <!-- KYC VERIFICATION STATUS -->
            <div class="card-navy p-6 rounded-2xl space-y-4">
              <h4 class="font-bold text-white text-sm uppercase tracking-wider">Government ID Verification</h4>
              <div class="space-y-3 text-xs">
                <div class="flex items-center justify-between p-3 rounded-xl bg-[#061827] border border-[#163959]">
                  <div class="flex items-center gap-3">
                    <i data-lucide="check-circle" class="w-5 h-5 text-emerald-400"></i>
                    <div>
                      <p class="font-bold text-white">Aadhaar Card (UIDAI Verified)</p>
                      <p class="text-[10px] text-slate-500 font-mono">XXXX-XXXX-8821</p>
                    </div>
                  </div>
                  <span class="text-emerald-400 font-bold">Active</span>
                </div>

                <div class="flex items-center justify-between p-3 rounded-xl bg-[#061827] border border-[#163959]">
                  <div class="flex items-center gap-3">
                    <i data-lucide="check-circle" class="w-5 h-5 text-emerald-400"></i>
                    <div>
                      <p class="font-bold text-white">Income Tax PAN Card</p>
                      <p class="text-[10px] text-slate-500 font-mono">ABCDE1234F</p>
                    </div>
                  </div>
                  <span class="text-emerald-400 font-bold">Verified</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    `;
  }

  // --- 23. PAGE 12: ADMIN DASHBOARD ---
  function renderAdminDashboardView() {
    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950 border border-amber-500/40 text-amber-400 text-xs font-bold mb-2">
              <i data-lucide="shield" class="w-3.5 h-3.5"></i> Super Admin Privileges
            </div>
            <h1 class="text-2xl sm:text-3xl font-black text-white font-heading">Pan-India Operations Command</h1>
          </div>
          <div class="flex items-center gap-3">
            <button onclick="window.showToast('Auction Floor Reset', 'Simulated timer reset triggered across all active floors.', 'warning');" class="px-4 py-2 rounded-xl bg-red-950 hover:bg-red-900 border border-red-500 text-red-300 text-xs font-bold">
              Emergency Floor Hold
            </button>
          </div>
        </div>

        <!-- KPI METRICS -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="card-navy p-5 rounded-2xl">
            <p class="text-xs text-slate-400 uppercase font-bold">Total Platform GMV</p>
            <p class="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1">₹18.4 Cr</p>
            <p class="text-[11px] text-slate-400 mt-1">This Month</p>
          </div>
          <div class="card-navy p-5 rounded-2xl">
            <p class="text-xs text-slate-400 uppercase font-bold">Active Auction Lots</p>
            <p class="text-2xl sm:text-3xl font-black text-white font-mono mt-1">48</p>
            <p class="text-[11px] text-[#39A7FF] mt-1 font-bold">Across 6 Mega Yards</p>
          </div>
          <div class="card-navy p-5 rounded-2xl">
            <p class="text-xs text-slate-400 uppercase font-bold">Registered Bidders</p>
            <p class="text-2xl sm:text-3xl font-black text-white font-mono mt-1">1,240</p>
            <p class="text-[11px] text-slate-400 mt-1">98% KYC Approved</p>
          </div>
          <div class="card-navy p-5 rounded-2xl">
            <p class="text-xs text-slate-400 uppercase font-bold">Yard Occupancy</p>
            <p class="text-2xl sm:text-3xl font-black text-amber-400 font-mono mt-1">78%</p>
            <p class="text-[11px] text-slate-400 mt-1">8,105 / 11,800 Staged</p>
          </div>
        </div>

        <!-- PENDING APPROVALS QUEUE -->
        <div class="card-navy rounded-2xl overflow-hidden border border-[#163959]">
          <div class="p-5 border-b border-[#163959] flex items-center justify-between">
            <h3 class="font-bold text-white text-sm">Vehicle Listing Approvals Queue (Vahan Verified)</h3>
            <span class="text-xs text-slate-400">3 Pending Review</span>
          </div>

          <div class="divide-y divide-[#163959]/60">
            ${store.vehicles.slice(4, 7).map(v => `
              <div class="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#0E2A42]/40 transition-colors">
                <div class="flex items-center gap-3">
                  <img src="${v.images[0]}" class="w-14 h-10 rounded-lg object-cover" />
                  <div>
                    <h4 class="font-bold text-white text-sm">${v.title}</h4>
                    <p class="text-xs text-slate-400">${v.sellerName} • Reserve: ${formatINR(v.reservePrice)}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button onclick="window.showToast('Listing Approved', '${v.title} published to live inventory.', 'success'); this.parentElement.innerHTML = '<span class=\"text-emerald-400 font-bold text-xs\">Approved ✓</span>';" class="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold">Approve</button>
                  <button onclick="window.showToast('Listing Rejected', 'Seller notified for document resubmission.', 'warning'); this.parentElement.innerHTML = '<span class=\"text-red-400 font-bold text-xs\">Rejected</span>';" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold">Reject</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // --- 24. PAGE ROUTER RENDER DISPATCHER ---
  function renderActiveView() {
    const mount = document.getElementById('app-view-container');
    if (!mount) return;

    mount.classList.remove('page-view-enter');
    void mount.offsetWidth; // trigger reflow for smooth fade-in
    mount.classList.add('page-view-enter');

    switch (store.activePage) {
      case 'home':
        mount.innerHTML = renderHomeView();
        break;
      case 'browse':
        mount.innerHTML = renderBrowseView();
        break;
      case 'details':
      case 'vehicle-details':
        mount.innerHTML = renderVehicleDetailsView();
        break;
      case 'live':
      case 'live-auction':
        mount.innerHTML = renderLiveAuctionView();
        break;
      case 'buyer-dashboard':
        mount.innerHTML = renderBuyerDashboardView();
        break;
      case 'seller-dashboard':
        mount.innerHTML = renderSellerDashboardView();
        break;
      case 'admin-dashboard':
        mount.innerHTML = renderAdminDashboardView();
        break;
      case 'add-vehicle':
        mount.innerHTML = renderAddVehicleView();
        break;
      case 'watchlist':
        mount.innerHTML = renderWatchlistView();
        break;
      case 'my-bids':
        mount.innerHTML = renderMyBidsView();
        break;
      case 'notifications':
        mount.innerHTML = renderNotificationsView();
        break;
      case 'profile':
        mount.innerHTML = renderProfileView();
        break;
      default:
        mount.innerHTML = renderHomeView();
        break;
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // --- 25. APP INITIALIZATION ---
  function init() {
    console.log('[Bid My Car] Initializing Enterprise Indian Marketplace & Live Auction Floor...');
    renderNavbar();
    renderMobileBottomNav();
    renderFooter();

    // Check hash route on startup
    const raw = window.location.hash.replace('#', '') || 'home';
    const parts = raw.split('/');
    store.activePage = parts[0] || 'home';
    if (parts[1]) store.selectedVehicleId = parts[1];

    renderActiveView();

    // Store reactive subscribers
    store.subscribe((s, type) => {
      if (type === 'TICK') {
        // Targeted DOM updates for tickers to prevent re-rendering entire view
        const arenaCountEl = document.querySelector('.live-arena-clock');
        if (arenaCountEl) arenaCountEl.textContent = `${s.liveAuctionStatus.countdown}s`;
      } else if (type === 'WATCHLIST_CHANGE' || type === 'ROLE_CHANGE') {
        renderActiveView();
        renderNavbar();
      } else if (type === 'BID_PLACED' || type === 'OUTBID') {
        renderActiveView();
        renderNavbar();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
