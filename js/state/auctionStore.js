// ==========================================================================
// BID MY CAR - REACTIVE AUCTION STORE
// Backend-integrated store with mock-data fallback
// ==========================================================================

import { MOCK_VEHICLES } from '../data/mockVehicles.js';
import { auctionAudio } from '../utils/audio.js';

// ==========================================================================
// CONFIGURATION
// ==========================================================================

const API_BASE_URL = 'http://localhost:5000/api';

const STORAGE_KEY = 'bidmycar.state.v1';


// ==========================================================================
// localStorage PERSISTENCE
// ==========================================================================

const StoreStorage = {

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;

    } catch (e) {

      console.warn(
        '[Bid My Car] Could not read saved state:',
        e
      );

      return null;
    }
  },


  save(data) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
      );

    } catch (e) {

      console.warn(
        '[Bid My Car] Could not persist state:',
        e
      );
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


// ==========================================================================
// BACKEND HELPERS
// ==========================================================================

const fetchJSON = async (url, options = {}) => {

  const response = await fetch(url, options);

  let data = null;

  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  if (!response.ok) {

    const message =
      data?.message ||
      `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data;
};


// ==========================================================================
// DATE / COUNTDOWN HELPERS
// ==========================================================================

const getAuctionEndTime = (auction) => {

  if (!auction) {
    return null;
  }

  return (
    auction.current_end_time ||
    auction.end_time ||
    null
  );
};


const getSecondsUntil = (dateValue) => {

  if (!dateValue) {
    return 0;
  }

  const timestamp = new Date(dateValue).getTime();

  if (Number.isNaN(timestamp)) {
    return 0;
  }

  return Math.max(
    0,
    Math.floor((timestamp - Date.now()) / 1000)
  );
};


// ==========================================================================
// FRONTEND COMPATIBILITY MAPPING
//
// IMPORTANT:
// Backend fields remain available in their original snake_case form.
// The compatibility fields below temporarily allow the existing UI
// components to continue working without redesigning them.
// ==========================================================================

const mapBackendVehicle = (backendVehicle, auction = null) => {

  const currentBid = Number(
    backendVehicle.current_bid ?? 0
  );

  const reservePrice = Number(
    backendVehicle.reserve_price ?? 0
  );

  const buyItNowPrice =
    backendVehicle.buy_it_now_price !== null &&
    backendVehicle.buy_it_now_price !== undefined
      ? Number(backendVehicle.buy_it_now_price)
      : null;

  const bidCount = Number(
    backendVehicle.bid_count ?? 0
  );

  const auctionEndTime = getAuctionEndTime(auction);

  const auctionStatus =
    auction?.status ||
    'none';

  const auctionEndsInSeconds =
    auction
      ? getSecondsUntil(auctionEndTime)
      : Number(
          backendVehicle.auction_ends_in_seconds ?? 0
        );


  return {

    // ==========================================================
    // ORIGINAL BACKEND VEHICLE FIELDS
    // ==========================================================

    ...backendVehicle,


    // ==========================================================
    // AUCTION INFORMATION FROM BACKEND
    // ==========================================================

    auction_id:
      auction?.id ?? null,

    start_time:
      auction?.start_time ?? null,

    end_time:
      auction?.end_time ?? null,

    scheduled_end_time:
      auction?.scheduled_end_time ?? null,

    current_end_time:
      auction?.current_end_time ?? null,

    extension_seconds:
      auction?.extension_seconds ?? null,

    max_extension_seconds:
      auction?.max_extension_seconds ?? null,

    starting_bid:
      auction?.starting_bid ?? null,

    auction_current_bid:
      auction?.current_bid ?? null,

    auction_reserve_price:
      auction?.reserve_price ?? null,

    auction_reserve_met:
      auction?.reserve_met ?? null,

    auction_bid_count:
      auction?.bid_count ?? null,

    auction_status:
      auctionStatus,

    high_bidder:
      auction?.high_bidder ?? null,

    high_bidder_id:
      auction?.high_bidder_id ?? null,


    // Keep the complete raw auction object available.
    auction: auction || null,


    // ==========================================================
    // EXISTING FRONTEND COMPATIBILITY FIELDS
    // ==========================================================

    id:
      backendVehicle.id,

    title:
      backendVehicle.title || '',

    lotNumber:
      backendVehicle.lot_number || '',

    sellerId:
      backendVehicle.seller_id ?? null,

    make:
      backendVehicle.make || '',

    model:
      backendVehicle.model || '',

    year:
      backendVehicle.year ?? null,

    category:
      backendVehicle.category || '',

    fuelType:
      backendVehicle.fuel_type || '',

    transmission:
      backendVehicle.transmission || '',

    regNo:
      backendVehicle.reg_no || '',

    vin:
      backendVehicle.vin || '',

    yardId:
      backendVehicle.yard_id || '',

    saleType:
      backendVehicle.sale_type || '',

    conditionType:
      backendVehicle.condition_type || '',

    runAndDrive:
      backendVehicle.run_and_drive || '',

    currentBid:
      currentBid,

    reservePrice:
      reservePrice,

    reserveMet:
      Boolean(
        backendVehicle.reserve_met ??
        auction?.reserve_met ??
        false
      ),

    buyItNowPrice:
      buyItNowPrice,

    estRetailValue:
      Number(
        backendVehicle.est_retail_value ?? 0
      ),

    bidCount:
      bidCount,

    primaryDamage:
      backendVehicle.primary_damage || '',

    secondaryDamage:
      backendVehicle.secondary_damage || '',

    auctionEndsInSeconds:
      auctionEndsInSeconds,

    // Backend source marker.
    _source:
      'backend'

  };
};


// ==========================================================================
// MOCK VEHICLE COMPATIBILITY
//
// Existing mock vehicles are left untouched.
// ==========================================================================

const mapMockVehicle = (vehicle) => {

  return {
    ...vehicle,

    _source: 'mock',

    // Keep backend-style fields where possible.
    lot_number:
      vehicle.lot_number ??
      vehicle.lotNumber ??
      '',

    seller_id:
      vehicle.seller_id ??
      vehicle.sellerId ??
      null,

    buy_it_now_price:
      vehicle.buy_it_now_price ??
      vehicle.buyItNowPrice ??
      null,

    current_bid:
      vehicle.current_bid ??
      vehicle.currentBid ??
      0,

    reserve_price:
      vehicle.reserve_price ??
      vehicle.reservePrice ??
      0,

    bid_count:
      vehicle.bid_count ??
      vehicle.bidCount ??
      0,

    primary_damage:
      vehicle.primary_damage ??
      vehicle.primaryDamage ??
      '',

    secondary_damage:
      vehicle.secondary_damage ??
      vehicle.secondaryDamage ??
      '',

    auction_ends_in_seconds:
      vehicle.auction_ends_in_seconds ??
      vehicle.auctionEndsInSeconds ??
      0
  };
};


// ==========================================================================
// AUCTION STORE
// ==========================================================================

class AuctionStore {

  constructor() {

    const saved = StoreStorage.load();


    // ==========================================================
    // LOCAL STATE
    // ==========================================================

    this.customListings =
      (
        saved &&
        Array.isArray(saved.customListings)
      )
        ? saved.customListings
        : [];


    // Start with mock data.
    // Backend data will replace it after initialization.
    this.vehicles =
      [
        ...this.customListings,
        ...MOCK_VEHICLES.map(mapMockVehicle)
      ];


    this.currentRole = 'buyer';


    this.watchlist =
      (
        saved &&
        Array.isArray(saved.watchlist) &&
        saved.watchlist.length > 0
      )
        ? new Set(saved.watchlist)
        : new Set([
            'lot-108291',
            'lot-108293'
          ]);


    this.userBids =
      new Map(
        Object.entries(
          (saved && saved.userBids) || {}
        )
      );


    // ==========================================================
    // BACKEND STATE
    // ==========================================================

    this.backendConnected = false;

    this.backendLoading = false;

    this.backendError = null;

    this.auctions = [];

    this.lastBackendSync = null;


    // ==========================================================
    // FILTER STATE
    // ==========================================================

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


    // ==========================================================
    // LIVE AUCTION ARENA STATE
    // ==========================================================

    this.activeLiveLotId =
      (
        saved &&
        saved.liveAuctionStatus &&
        saved.liveAuctionStatus.lotId
      )
        ? saved.liveAuctionStatus.lotId
        : 'lot-108291';


    this.liveAuctionStatus =
      (
        saved &&
        saved.liveAuctionStatus &&
        saved.liveAuctionStatus.lotId
      )
        ? saved.liveAuctionStatus
        : {

            lotId: 'lot-108291',

            countdown: 142,

            maxCountdown: 180,

            hammerStatus: 'BIDDING OPEN',

            currentHighBid: 1680000,

            highBidder:
              'Rajesh K. (Chandigarh)',

            isUserHighBidder: false,

            bidHistory: [

              {
                time: '18:44:10',
                bidder: 'AutoHub Pune',
                amount: 1620000,
                isUser: false
              },

              {
                time: '18:44:32',
                bidder: 'Vipul M. (Ahmedabad)',
                amount: 1650000,
                isUser: false
              },

              {
                time: '18:45:01',
                bidder: 'Rajesh K. (Chandigarh)',
                amount: 1680000,
                isUser: false
              }

            ]

          };


    // ==========================================================
    // SELECTED VEHICLE
    // ==========================================================

    this.selectedVehicleId = null;


    // ==========================================================
    // LISTENERS
    // ==========================================================

    this.listeners = new Set();


    // ==========================================================
    // START LOCAL TIMER
    // ==========================================================

    this.startLiveSimulation();


    // ==========================================================
    // LOAD BACKEND DATA
    // ==========================================================

    this.loadBackendData();

  }


  // ========================================================================
  // SUBSCRIBE
  // ========================================================================

  subscribe(listener) {

    this.listeners.add(listener);

    return () =>
      this.listeners.delete(listener);
  }


  // ========================================================================
  // NOTIFY
  // ========================================================================

  notify(changeType = 'GENERAL') {

    for (const listener of this.listeners) {

      try {

        listener(
          this,
          changeType
        );

      } catch (error) {

        console.error(
          '[Bid My Car] Store listener error:',
          error
        );

      }

    }

  }


  // ========================================================================
  // BACKEND DATA LOADING
  // ========================================================================

  async loadBackendData() {

    if (this.backendLoading) {
      return;
    }


    this.backendLoading = true;

    this.backendError = null;

    this.notify('BACKEND_LOADING');


    try {

      console.log(
        '[Bid My Car] Loading backend vehicles and auctions...'
      );


      const [
        vehicleResponse,
        auctionResponse
      ] = await Promise.all([

        fetchJSON(
          `${API_BASE_URL}/vehicles`
        ),

        fetchJSON(
          `${API_BASE_URL}/auctions`
        )

      ]);


      const backendVehicles =
        Array.isArray(vehicleResponse?.vehicles)
          ? vehicleResponse.vehicles
          : [];


      const backendAuctions =
        Array.isArray(auctionResponse?.auctions)
          ? auctionResponse.auctions
          : [];


      this.auctions =
        backendAuctions;


      // Create quick lookup:
      // vehicle_id -> auction
      const auctionByVehicleId =
        new Map();


      for (const auction of backendAuctions) {

        if (auction.vehicle_id) {

          auctionByVehicleId.set(
            auction.vehicle_id,
            auction
          );

        }

      }


      // Convert backend vehicles while preserving
      // original backend fields.
      const mappedVehicles =
        backendVehicles.map(
          vehicle =>
            mapBackendVehicle(
              vehicle,
              auctionByVehicleId.get(vehicle.id) || null
            )
        );


      // ======================================================
      // IMPORTANT:
      //
      // Backend becomes the primary inventory.
      // Custom local listings are kept for now.
      // ======================================================

      this.vehicles = [

        ...this.customListings,

        ...mappedVehicles

      ];


      this.backendConnected = true;

      this.backendError = null;

      this.lastBackendSync =
        new Date();


      console.log(
        `[Bid My Car] Backend connected: ${mappedVehicles.length} vehicles, ${backendAuctions.length} auctions`
      );


      this.notify(
        'BACKEND_DATA_LOADED'
      );


    } catch (error) {

      console.error(
        '[Bid My Car] Backend data loading failed:',
        error
      );


      this.backendConnected = false;

      this.backendError =
        error.message;


      // Keep existing mock data.
      console.warn(
        '[Bid My Car] Keeping mock inventory as fallback.'
      );


      this.notify(
        'BACKEND_ERROR'
      );


    } finally {

      this.backendLoading = false;

    }

  }


  // ========================================================================
  // MANUAL BACKEND REFRESH
  // ========================================================================

  async refreshBackendData() {

    return this.loadBackendData();

  }


  // ========================================================================
  // PERSISTENCE
  // ========================================================================

  persist() {

    StoreStorage.save({

      watchlist:
        Array.from(
          this.watchlist
        ),

      userBids:
        Object.fromEntries(
          this.userBids
        ),

      liveAuctionStatus:
        this.liveAuctionStatus,

      customListings:
        this.customListings

    });

  }


  clearPersistedState() {

    StoreStorage.clear();

  }


  // ========================================================================
  // ROLE MANAGEMENT
  // ========================================================================

  setRole(role) {

    this.currentRole = role;

    this.notify(
      'ROLE_CHANGE'
    );

  }


  // ========================================================================
  // WATCHLIST
  // ========================================================================

  toggleWatchlist(vehicleId) {

    if (
      this.watchlist.has(vehicleId)
    ) {

      this.watchlist.delete(
        vehicleId
      );

    } else {

      this.watchlist.add(
        vehicleId
      );

    }


    this.persist();

    this.notify(
      'WATCHLIST_CHANGE'
    );

  }


  // ========================================================================
  // FILTER ACTIONS
  // ========================================================================

  setFilter(key, value) {

    this.filters[key] = value;

    this.notify(
      'FILTER_CHANGE'
    );

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


    this.notify(
      'FILTER_CHANGE'
    );

  }


  // ========================================================================
  // FILTERED VEHICLES
  // ========================================================================

  getFilteredVehicles() {

    return this.vehicles

      .filter(vehicle => {

        // --------------------------------------------------
        // SEARCH
        // --------------------------------------------------

        if (this.filters.search) {

          const q =
            this.filters.search
              .toLowerCase();


          const matches = (

            String(
              vehicle.title || ''
            )
              .toLowerCase()
              .includes(q)

            ||

            String(
              vehicle.lotNumber ||
              vehicle.lot_number ||
              ''
            )
              .toLowerCase()
              .includes(q)

            ||

            String(
              vehicle.regNo ||
              vehicle.reg_no ||
              ''
            )
              .toLowerCase()
              .includes(q)

            ||

            String(
              vehicle.make || ''
            )
              .toLowerCase()
              .includes(q)

            ||

            String(
              vehicle.model || ''
            )
              .toLowerCase()
              .includes(q)

            ||

            String(
              vehicle.vin || ''
            )
              .toLowerCase()
              .includes(q)

          );


          if (!matches) {
            return false;
          }

        }


        // --------------------------------------------------
        // SALE TYPE
        // --------------------------------------------------

        if (
          this.filters.saleType !== 'all'
        ) {

          if (
            this.filters.saleType ===
            'buy_it_now'
          ) {

            const buyNowPrice =
              vehicle.buy_it_now_price ??
              vehicle.buyItNowPrice;


            if (
              !buyNowPrice ||
              Number(buyNowPrice) <= 0
            ) {

              return false;

            }

          } else {

            const saleType =
              vehicle.sale_type ??
              vehicle.saleType;


            if (
              saleType !==
              this.filters.saleType
            ) {

              return false;

            }

          }

        }


        // --------------------------------------------------
        // CONDITION
        // --------------------------------------------------

        if (
          this.filters.conditionType !==
          'all'
        ) {

          const condition =
            vehicle.condition_type ??
            vehicle.conditionType;


          if (
            condition !==
            this.filters.conditionType
          ) {

            return false;

          }

        }


        // --------------------------------------------------
        // CATEGORY
        // --------------------------------------------------

        if (
          this.filters.category !==
          'all'
        ) {

          const category =
            vehicle.category || '';


          if (
            category.toLowerCase() !==
            this.filters.category.toLowerCase()
          ) {

            return false;

          }

        }


        // --------------------------------------------------
        // YARD
        // --------------------------------------------------

        if (
          this.filters.yardId !==
          'all'
        ) {

          const yardId =
            vehicle.yard_id ??
            vehicle.yardId;


          if (
            yardId !==
            this.filters.yardId
          ) {

            return false;

          }

        }


        // --------------------------------------------------
        // RUN AND DRIVE
        // --------------------------------------------------

        if (
          this.filters.runAndDrive !==
          'all'
        ) {

          const runAndDrive =
            vehicle.run_and_drive ??
            vehicle.runAndDrive ??
            '';


          if (
            this.filters.runAndDrive ===
            'runs_and_drives' &&
            runAndDrive !==
            'Runs & Drives'
          ) {

            return false;

          }


          if (
            this.filters.runAndDrive ===
            'engine_starts' &&
            runAndDrive !==
            'Engine Starts Only'
          ) {

            return false;

          }


          if (
            this.filters.runAndDrive ===
            'non_runner' &&
            !runAndDrive.includes(
              'Non-Runner'
            )
          ) {

            return false;

          }

        }


        // --------------------------------------------------
        // FUEL TYPE
        // --------------------------------------------------

        if (
          this.filters.fuelType !==
          'all'
        ) {

          const fuelType =
            vehicle.fuel_type ??
            vehicle.fuelType;


          if (
            fuelType !==
            this.filters.fuelType
          ) {

            return false;

          }

        }


        // --------------------------------------------------
        // MAX PRICE
        // --------------------------------------------------

        const currentBid =
          Number(
            vehicle.current_bid ??
            vehicle.currentBid ??
            0
          );


        if (
          currentBid >
          this.filters.maxPrice
        ) {

          return false;

        }


        return true;

      })


      // ======================================================
      // SORTING
      // ======================================================

      .sort((a, b) => {

        if (
          this.filters.sortBy ===
          'countdown'
        ) {

          return (
            Number(
              a.auctionEndsInSeconds ||
              0
            )
            -
            Number(
              b.auctionEndsInSeconds ||
              0
            )
          );

        }


        if (
          this.filters.sortBy ===
          'bid_low_high'
        ) {

          return (
            Number(
              a.current_bid ??
              a.currentBid ??
              0
            )
            -
            Number(
              b.current_bid ??
              b.currentBid ??
              0
            )
          );

        }


        if (
          this.filters.sortBy ===
          'bid_high_low'
        ) {

          return (
            Number(
              b.current_bid ??
              b.currentBid ??
              0
            )
            -
            Number(
              a.current_bid ??
              a.currentBid ??
              0
            )
          );

        }


        if (
          this.filters.sortBy ===
          'newest'
        ) {

          return (
            Number(b.year || 0)
            -
            Number(a.year || 0)
          );

        }


        return 0;

      });

  }


  // ========================================================================
  // LIVE AUCTION FLOOR
  // ========================================================================

  setActiveLiveLot(lotId) {

    const lot =
      this.vehicles.find(
        v => v.id === lotId
      );


    if (!lot) {
      return;
    }


    this.activeLiveLotId =
      lotId;


    const currentBid =
      Number(
        lot.current_bid ??
        lot.currentBid ??
        0
      );


    const countdown =
      Number(
        lot.auctionEndsInSeconds || 0
      );


    this.liveAuctionStatus = {

      lotId: lot.id,

      countdown:
        Math.min(
          countdown,
          160
        ),

      maxCountdown: 180,

      hammerStatus:
        'BIDDING OPEN',

      currentHighBid:
        currentBid,

      highBidder:
        lot.high_bidder ||
        'AutoCorp Mumbai',

      isUserHighBidder:
        false,

      bidHistory: []

    };


    this.persist();

    this.notify(
      'LIVE_LOT_CHANGE'
    );

  }


  // ========================================================================
  // LOCAL DEMO BID
  //
  // IMPORTANT:
  // This is still the existing frontend simulation.
  // Real backend bidding will be connected in the next controlled step.
  // ========================================================================

  placeBid(incrementAmount) {

    const newBid =
      this.liveAuctionStatus.currentHighBid +
      incrementAmount;


    const now =
      new Date();


    const timeStr =
      now
        .toTimeString()
        .split(' ')[0];


    this.liveAuctionStatus.currentHighBid =
      newBid;


    this.liveAuctionStatus.highBidder =
      'You (Bidder #9901)';


    this.liveAuctionStatus.isUserHighBidder =
      true;


    if (
      this.liveAuctionStatus.countdown <
      25
    ) {

      this.liveAuctionStatus.countdown =
        30;

      this.liveAuctionStatus.hammerStatus =
        'OVERTIME EXTENSION';

    } else {

      this.liveAuctionStatus.hammerStatus =
        'BIDDING OPEN';

    }


    this.liveAuctionStatus.bidHistory.unshift({

      time:
        timeStr,

      bidder:
        'You (Bidder #9901)',

      amount:
        newBid,

      isUser:
        true

    });


    const lot =
      this.vehicles.find(
        v =>
          v.id ===
          this.activeLiveLotId
      );


    if (lot) {

      lot.currentBid =
        newBid;

      lot.current_bid =
        newBid;


      lot.bidCount =
        Number(
          lot.bidCount || 0
        ) + 1;


      lot.bid_count =
        Number(
          lot.bid_count || 0
        ) + 1;


      const reservePrice =
        Number(
          lot.reserve_price ??
          lot.reservePrice ??
          0
        );


      if (
        newBid >= reservePrice
      ) {

        lot.reserveMet =
          true;

        lot.reserve_met =
          1;

      }

    }


    this.userBids.set(
      this.activeLiveLotId,
      newBid
    );


    this.persist();


    auctionAudio.playBidChime();

    auctionAudio.playGavel();


    this.notify(
      'BID_PLACED'
    );


    this.scheduleCompetitorBid();

  }


  // ========================================================================
  // SIMULATED COMPETITOR BID
  // ========================================================================

  scheduleCompetitorBid() {

    if (
      Math.random() > 0.65
    ) {

      return;

    }


    const delay =
      4000 +
      Math.random() * 3500;


    setTimeout(() => {

      if (

        this.liveAuctionStatus.countdown > 8 &&

        this.liveAuctionStatus.isUserHighBidder

      ) {

        const competitors = [

          'Apex Pre-Owned (Delhi)',

          'Royal Autos (Pune)',

          'Krishna Salvage Rebuilders (Chennai)',

          'Gurukripa Motors (Jaipur)',

          'Bidder #7814 (Bengaluru)'

        ];


        const randomComp =
          competitors[
            Math.floor(
              Math.random() *
              competitors.length
            )
          ];


        const inc =
          [5000, 10000, 15000][
            Math.floor(
              Math.random() * 3
            )
          ];


        const compBid =
          this.liveAuctionStatus.currentHighBid +
          inc;


        const now =
          new Date();


        const timeStr =
          now
            .toTimeString()
            .split(' ')[0];


        this.liveAuctionStatus.currentHighBid =
          compBid;


        this.liveAuctionStatus.highBidder =
          randomComp;


        this.liveAuctionStatus.isUserHighBidder =
          false;


        if (
          this.liveAuctionStatus.countdown <
          20
        ) {

          this.liveAuctionStatus.countdown =
            25;

        }


        this.liveAuctionStatus.bidHistory.unshift({

          time:
            timeStr,

          bidder:
            randomComp,

          amount:
            compBid,

          isUser:
            false

        });


        const lot =
          this.vehicles.find(
            v =>
              v.id ===
              this.activeLiveLotId
          );


        if (lot) {

          lot.currentBid =
            compBid;

          lot.current_bid =
            compBid;


          lot.bidCount =
            Number(
              lot.bidCount || 0
            ) + 1;


          lot.bid_count =
            Number(
              lot.bid_count || 0
            ) + 1;

        }


        this.persist();


        auctionAudio.playOutbid();


        this.notify(
          'OUTBID'
        );

      }

    }, delay);

  }


  // ========================================================================
  // TIMER
  //
  // Backend vehicles use current_end_time.
  // Mock vehicles continue using the old simulated countdown.
  // ========================================================================

  startLiveSimulation() {

    setInterval(() => {


      // ======================================================
      // UPDATE VEHICLE COUNTDOWNS
      // ======================================================

      this.vehicles.forEach(
        vehicle => {

          if (
            vehicle._source ===
            'backend'
          ) {

            const auction =
              vehicle.auction;


            if (
              auction &&
              auction.status ===
              'active'
            ) {

              vehicle.auctionEndsInSeconds =
                getSecondsUntil(
                  getAuctionEndTime(
                    auction
                  )
                );

            } else {

              vehicle.auctionEndsInSeconds =
                0;

            }


            return;

          }


          // Existing mock behavior.
          if (
            vehicle.auctionEndsInSeconds >
            0
          ) {

            vehicle.auctionEndsInSeconds -=
              1;

          }

        }
      );


      // ======================================================
      // LIVE ARENA TIMER
      // ======================================================

      if (
        this.liveAuctionStatus.countdown >
        0
      ) {

        this.liveAuctionStatus.countdown -=
          1;


        const cd =
          this.liveAuctionStatus.countdown;


        if (
          cd <= 20 &&
          cd > 12
        ) {

          this.liveAuctionStatus.hammerStatus =
            'GOING ONCE...';

        }

        else if (
          cd <= 12 &&
          cd > 5
        ) {

          this.liveAuctionStatus.hammerStatus =
            'GOING TWICE...';

          auctionAudio.playWarningTick();

        }

        else if (
          cd <= 5 &&
          cd > 0
        ) {

          this.liveAuctionStatus.hammerStatus =
            'FAIR WARNING!';

          auctionAudio.playWarningTick();

        }

        else if (
          cd === 0
        ) {

          this.liveAuctionStatus.hammerStatus =
            'SOLD!';

          auctionAudio.playGavel();


          if (
            this.liveAuctionStatus.isUserHighBidder
          ) {

            auctionAudio.playVictory();


            if (
              typeof window.confetti ===
              'function'
            ) {

              window.confetti({

                particleCount: 120,

                spread: 80,

                origin: {
                  y: 0.6
                }

              });

            }

          }

        }

      }


      this.notify(
        'TICK'
      );


    }, 1000);

  }


  // ========================================================================
  // VEHICLE MODAL
  // ========================================================================

  openVehicleModal(id) {

    this.selectedVehicleId =
      id;

    this.notify(
      'MODAL_OPEN'
    );

  }


  closeVehicleModal() {

    this.selectedVehicleId =
      null;

    this.notify(
      'MODAL_CLOSE'
    );

  }


  getSelectedVehicle() {

    return this.vehicles.find(
      v =>
        v.id ===
        this.selectedVehicleId
    );

  }


  getActiveLiveVehicle() {

    return (
      this.vehicles.find(
        v =>
          v.id ===
          this.activeLiveLotId
      )
      ||
      this.vehicles[0]
    );

  }


  // ========================================================================
  // ADD VEHICLE LISTING
  // ========================================================================

  addVehicleListing(newListing) {

    this.vehicles.unshift(
      newListing
    );


    this.customListings.unshift(
      newListing
    );


    this.persist();


    this.notify(
      'NEW_LISTING'
    );

  }

}


// ==========================================================================
// EXPORT STORE
// ==========================================================================

export const auctionStore =
  new AuctionStore();
