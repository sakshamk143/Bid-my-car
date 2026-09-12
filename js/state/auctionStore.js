// ==========================================================================
// BID MY CAR - REACTIVE AUCTION STORE & SIMULATION ENGINE
// ==========================================================================

import { MOCK_VEHICLES } from '../data/mockVehicles.js';
import { auctionAudio } from '../utils/audio.js';

// ==========================================================================
// localStorage PERSISTENCE (watchlist, user bids, listings survive refresh)
// ==========================================================================
const STORAGE_KEY = 'bidmycar.state.v1';

const StoreStorage = {
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn('[Bid My Car] Could not read saved state:', e);
      return null;
    }
  },
  save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('[Bid My Car] Could not persist state:', e);
    }
  },
  clear() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      /* noop */
    }
  }
};

class AuctionStore {
  constructor() {
    const saved = StoreStorage.load();
    this.customListings = (saved && Array.isArray(saved.customListings)) ? saved.customListings : [];
    this.vehicles = [...this.customListings, ...JSON.parse(JSON.stringify(MOCK_VEHICLES))];
    this.currentRole = 'buyer'; // buyer, seller, dealer, insurance, bank, government
    this.watchlist = new Set((saved && Array.isArray(saved.watchlist) && saved.watchlist.length > 0) ? saved.watchlist : ['lot-108291', 'lot-108293']);
    this.userBids = new Map(Object.entries((saved && saved.userBids) || {})); // vehicleId -> maxBidPlaced
    
    // Filters State
    this.filters = {
      search: '',
      saleType: 'all', // all, live_now, pure_sale, upcoming, buy_it_now
      conditionType: 'all', // all, clean_title, insurance_salvage, flood_salvage, bank_repo, govt_surplus
      category: 'all', // all, suv, sedan, hatchback, luxury, commercial, twowheeler
      yardId: 'all',
      runAndDrive: 'all', // all, runs_and_drives, engine_starts, non_runner
      fuelType: 'all', // all, Petrol, Diesel, Electric, CNG
      maxPrice: 4000000,
      sortBy: 'countdown' // countdown, bid_low_high, bid_high_low, newest
    };

    // Live Auction Arena State (restored from previous session when available)
    this.activeLiveLotId = (saved && saved.liveAuctionStatus && saved.liveAuctionStatus.lotId) ? saved.liveAuctionStatus.lotId : 'lot-108291';
    this.liveAuctionStatus = (saved && saved.liveAuctionStatus && saved.liveAuctionStatus.lotId)
      ? saved.liveAuctionStatus
      : {
          lotId: 'lot-108291',
          countdown: 142,
          maxCountdown: 180,
          hammerStatus: 'BIDDING OPEN', // BIDDING OPEN, GOING ONCE, GOING TWICE, FAIR WARNING, SOLD!
          currentHighBid: 1680000,
          highBidder: 'Rajesh K. (Chandigarh)',
          isUserHighBidder: false,
          bidHistory: [
            { time: '18:44:10', bidder: 'AutoHub Pune', amount: 1620000, isUser: false },
            { time: '18:44:32', bidder: 'Vipul M. (Ahmedabad)', amount: 1650000, isUser: false },
            { time: '18:45:01', bidder: 'Rajesh K. (Chandigarh)', amount: 1680000, isUser: false }
          ]
        };

    // Selected vehicle for modal inspection
    this.selectedVehicleId = null;

    // Listeners
    this.listeners = new Set();
    
    // Start live timer simulation
    this.startLiveSimulation();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(changeType = 'GENERAL') {
    for (const listener of this.listeners) {
      listener(this, changeType);
    }
  }

  // --- Persistence ---
  persist() {
    StoreStorage.save({
      watchlist: Array.from(this.watchlist),
      userBids: Object.fromEntries(this.userBids),
      liveAuctionStatus: this.liveAuctionStatus,
      customListings: this.customListings
    });
  }

  clearPersistedState() {
    StoreStorage.clear();
  }

  // --- Role Management ---
  setRole(role) {
    this.currentRole = role;
    this.notify('ROLE_CHANGE');
  }

  // --- Watchlist Management ---
  toggleWatchlist(vehicleId) {
    if (this.watchlist.has(vehicleId)) {
      this.watchlist.delete(vehicleId);
    } else {
      this.watchlist.add(vehicleId);
    }
    this.persist();
    this.notify('WATCHLIST_CHANGE');
  }

  // --- Filter Actions ---
  setFilter(key, value) {
    this.filters[key] = value;
    this.notify('FILTER_CHANGE');
  }

  resetFilters() {
    this.filters = {
      search: '',
      saleType: 'all',
      conditionType: 'all',
      category: 'all',
      yardId: 'all',
      runAndDrive: 'all',
      fuelType: 'all',
      maxPrice: 4000000,
      sortBy: 'countdown'
    };
    this.notify('FILTER_CHANGE');
  }

  getFilteredVehicles() {
    return this.vehicles.filter(vehicle => {
      // Search
      if (this.filters.search) {
        const q = this.filters.search.toLowerCase();
        const matches = (
          vehicle.title.toLowerCase().includes(q) ||
          vehicle.lotNumber.toLowerCase().includes(q) ||
          vehicle.regNo.toLowerCase().includes(q) ||
          vehicle.make.toLowerCase().includes(q) ||
          vehicle.model.toLowerCase().includes(q) ||
          vehicle.vin.toLowerCase().includes(q)
        );
        if (!matches) return false;
      }

      // Sale Type
      if (this.filters.saleType !== 'all') {
        if (this.filters.saleType === 'buy_it_now' && !vehicle.buyItNowPrice) return false;
        if (this.filters.saleType !== 'buy_it_now' && vehicle.saleType !== this.filters.saleType) return false;
      }

      // Condition Type
      if (this.filters.conditionType !== 'all' && vehicle.conditionType !== this.filters.conditionType) {
        return false;
      }

      // Category
      if (this.filters.category !== 'all' && vehicle.category !== this.filters.category) {
        return false;
      }

      // Yard
      if (this.filters.yardId !== 'all' && vehicle.yardId !== this.filters.yardId) {
        return false;
      }

      // Run and Drive
      if (this.filters.runAndDrive !== 'all') {
        if (this.filters.runAndDrive === 'runs_and_drives' && vehicle.runAndDrive !== 'Runs & Drives') return false;
        if (this.filters.runAndDrive === 'engine_starts' && vehicle.runAndDrive !== 'Engine Starts Only') return false;
        if (this.filters.runAndDrive === 'non_runner' && !vehicle.runAndDrive.includes('Non-Runner')) return false;
      }

      // Fuel Type
      if (this.filters.fuelType !== 'all' && vehicle.fuelType !== this.filters.fuelType) {
        return false;
      }

      // Max Price
      if (vehicle.currentBid > this.filters.maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (this.filters.sortBy === 'countdown') {
        return a.auctionEndsInSeconds - b.auctionEndsInSeconds;
      } else if (this.filters.sortBy === 'bid_low_high') {
        return a.currentBid - b.currentBid;
      } else if (this.filters.sortBy === 'bid_high_low') {
        return b.currentBid - a.currentBid;
      } else if (this.filters.sortBy === 'newest') {
        return b.year - a.year;
      }
      return 0;
    });
  }

  // --- Live Auction Floor Controller ---
  setActiveLiveLot(lotId) {
    const lot = this.vehicles.find(v => v.id === lotId);
    if (!lot) return;
    this.activeLiveLotId = lotId;
    this.liveAuctionStatus = {
      lotId: lot.id,
      countdown: Math.min(lot.auctionEndsInSeconds, 160),
      maxCountdown: 180,
      hammerStatus: 'BIDDING OPEN',
      currentHighBid: lot.currentBid,
      highBidder: lot.currentBid === this.userBids.get(lot.id) ? 'You (Bidder #9901)' : 'AutoCorp Mumbai',
      isUserHighBidder: lot.currentBid === this.userBids.get(lot.id),
      bidHistory: [
        { time: '18:42:15', bidder: 'Yard Dealer #302', amount: lot.currentBid - 35000, isUser: false },
        { time: '18:43:50', bidder: 'AutoCorp Mumbai', amount: lot.currentBid, isUser: false }
      ]
    };
    this.persist();
    this.notify('LIVE_LOT_CHANGE');
  }

  // Place User Bid
  placeBid(incrementAmount) {
    const newBid = this.liveAuctionStatus.currentHighBid + incrementAmount;
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];

    this.liveAuctionStatus.currentHighBid = newBid;
    this.liveAuctionStatus.highBidder = 'You (Bidder #9901)';
    this.liveAuctionStatus.isUserHighBidder = true;
    
    // Add 25 seconds anti-sniping extension if timer is under 20s
    if (this.liveAuctionStatus.countdown < 25) {
      this.liveAuctionStatus.countdown = 30;
      this.liveAuctionStatus.hammerStatus = 'OVERTIME EXTENSION';
    } else {
      this.liveAuctionStatus.hammerStatus = 'BIDDING OPEN';
    }

    this.liveAuctionStatus.bidHistory.unshift({
      time: timeStr,
      bidder: 'You (Bidder #9901)',
      amount: newBid,
      isUser: true
    });

    // Update vehicle object
    const lot = this.vehicles.find(v => v.id === this.activeLiveLotId);
    if (lot) {
      lot.currentBid = newBid;
      lot.bidCount += 1;
      if (newBid >= lot.reservePrice) {
        lot.reserveMet = true;
      }
    }

    this.userBids.set(this.activeLiveLotId, newBid);
    this.persist();
    
    // Play sounds
    auctionAudio.playBidChime();
    auctionAudio.playGavel();

    this.notify('BID_PLACED');

    // Trigger simulated competitor bid after 4-7 seconds if auction not ended
    this.scheduleCompetitorBid();
  }

  scheduleCompetitorBid() {
    if (Math.random() > 0.65) return; // 35% chance no competitor bids

    const delay = 4000 + Math.random() * 3500;
    setTimeout(() => {
      // Only outbid if still active lot and countdown > 8
      if (this.liveAuctionStatus.countdown > 8 && this.liveAuctionStatus.isUserHighBidder) {
        const competitors = [
          'Apex Pre-Owned (Delhi)',
          'Royal Autos (Pune)',
          'Krishna Salvage Rebuilders (Chennai)',
          'Gurukripa Motors (Jaipur)',
          'Bidder #7814 (Bengaluru)'
        ];
        const randomComp = competitors[Math.floor(Math.random() * competitors.length)];
        const inc = [5000, 10000, 15000][Math.floor(Math.random() * 3)];
        const compBid = this.liveAuctionStatus.currentHighBid + inc;
        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];

        this.liveAuctionStatus.currentHighBid = compBid;
        this.liveAuctionStatus.highBidder = randomComp;
        this.liveAuctionStatus.isUserHighBidder = false;
        
        if (this.liveAuctionStatus.countdown < 20) {
          this.liveAuctionStatus.countdown = 25;
        }

        this.liveAuctionStatus.bidHistory.unshift({
          time: timeStr,
          bidder: randomComp,
          amount: compBid,
          isUser: false
        });

        const lot = this.vehicles.find(v => v.id === this.activeLiveLotId);
        if (lot) {
          lot.currentBid = compBid;
          lot.bidCount += 1;
        }

        this.persist();
        auctionAudio.playOutbid();
        this.notify('OUTBID');
      }
    }, delay);
  }

  // Timer Tick Simulation
  startLiveSimulation() {
    setInterval(() => {
      // Decrement main inventory countdowns
      this.vehicles.forEach(v => {
        if (v.auctionEndsInSeconds > 0) {
          v.auctionEndsInSeconds -= 1;
        }
      });

      // Live Arena Countdown
      if (this.liveAuctionStatus.countdown > 0) {
        this.liveAuctionStatus.countdown -= 1;

        const cd = this.liveAuctionStatus.countdown;
        if (cd <= 20 && cd > 12) {
          this.liveAuctionStatus.hammerStatus = 'GOING ONCE...';
        } else if (cd <= 12 && cd > 5) {
          this.liveAuctionStatus.hammerStatus = 'GOING TWICE...';
          auctionAudio.playWarningTick();
        } else if (cd <= 5 && cd > 0) {
          this.liveAuctionStatus.hammerStatus = 'FAIR WARNING!';
          auctionAudio.playWarningTick();
        } else if (cd === 0) {
          this.liveAuctionStatus.hammerStatus = 'SOLD!';
          auctionAudio.playGavel();
          if (this.liveAuctionStatus.isUserHighBidder) {
            auctionAudio.playVictory();
            if (typeof window.confetti === 'function') {
              window.confetti({
                particleCount: 120,
                spread: 80,
                origin: { y: 0.6 }
              });
            }
          }
        }
      }

      this.notify('TICK');
    }, 1000);
  }

  // Select vehicle for detail modal
  openVehicleModal(id) {
    this.selectedVehicleId = id;
    this.notify('MODAL_OPEN');
  }

  closeVehicleModal() {
    this.selectedVehicleId = null;
    this.notify('MODAL_CLOSE');
  }

  getSelectedVehicle() {
    return this.vehicles.find(v => v.id === this.selectedVehicleId);
  }

  getActiveLiveVehicle() {
    return this.vehicles.find(v => v.id === this.activeLiveLotId) || this.vehicles[0];
  }

  // Add new vehicle (from Seller Wizard)
  addVehicleListing(newListing) {
    this.vehicles.unshift(newListing);
    this.customListings.unshift(newListing);
    this.persist();
    this.notify('NEW_LISTING');
  }
}

export const auctionStore = new AuctionStore();
