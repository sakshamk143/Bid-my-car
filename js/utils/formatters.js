// ==========================================================================
// BID MY CAR - UTILITY FORMATTERS (INDIAN RUPEES, NUMBERS, DATES & FEES)
// ==========================================================================

import { INDIAN_YARDS } from '../data/indianYards.js';

/**
 * Formats a number into Indian Rupee format (e.g., ₹16,80,000 or ₹16.80 Lakh)
 */
export function formatINR(amount, compact = false) {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0';
  
  if (compact) {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} Lakh`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}k`;
    }
  }

  // Indian Rupee standard comma separation: 3 digits from right, then every 2 digits
  const x = Math.round(amount).toString();
  const lastThree = x.substring(x.length - 3);
  const otherNumbers = x.substring(0, x.length - 3);
  const res = otherNumbers !== '' ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree : lastThree;
  return `₹${res}`;
}

/**
 * Format odometer kilometers
 */
export function formatKM(km) {
  if (!km && km !== 0) return '0 km';
  return `${new Intl.NumberFormat('en-IN').format(km)} km`;
}

/**
 * Format countdown seconds into MM:SS or HH:MM:SS
 */
export function formatCountdown(seconds) {
  if (seconds <= 0) return 'AUCTION ENDED';
  
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m ${s < 10 ? '0' : ''}${s}s`;
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

/**
 * Copart-style Indian Auction Buyer Fee Schedule (Transparent breakdown)
 * Copart India standard: Tiered buyer fee based on hammer price + 18% GST + Yard Loading/Gate Pass Fee
 */
export function calculateAuctionFees(hammerPrice) {
  let buyerFee = 0;
  
  if (hammerPrice <= 50000) {
    buyerFee = 2500;
  } else if (hammerPrice <= 100000) {
    buyerFee = 4500;
  } else if (hammerPrice <= 300000) {
    buyerFee = 8500;
  } else if (hammerPrice <= 600000) {
    buyerFee = 14500;
  } else if (hammerPrice <= 1200000) {
    buyerFee = 22000;
  } else if (hammerPrice <= 2500000) {
    buyerFee = 35000;
  } else {
    buyerFee = hammerPrice * 0.0175; // 1.75% for luxury/high value
  }

  // Fixed yard gate pass & forklift loading fee
  const yardLoadingFee = 1500;
  // Documentation / Parivahan verification fee
  const documentationFee = 1200;
  
  // 18% Indian GST on platform service fees only (not on vehicle hammer price)
  const gstAmount = Math.round((buyerFee + yardLoadingFee + documentationFee) * 0.18);
  
  // Total on-road invoice amount before shipping
  const totalAmount = hammerPrice + buyerFee + yardLoadingFee + documentationFee + gstAmount;

  return {
    hammerPrice,
    buyerFee,
    yardLoadingFee,
    documentationFee,
    gstAmount,
    totalAmount
  };
}

/**
 * Pan-India flatbed towing cost calculator
 */
export function estimateLogisticsCost(yardId, destinationPincode, vehicleType = 'suv') {
  const yard = INDIAN_YARDS.find(y => y.id === yardId) || INDIAN_YARDS[0];
  
  // Approximate base distance simulation based on pincode prefix
  const pinPrefix = parseInt(String(destinationPincode || '110001').substring(0, 2), 10);
  let distanceKm = 85; // Default local metro delivery

  if (yard.code.startsWith('DEL')) {
    if (pinPrefix >= 11 && pinPrefix <= 13) distanceKm = 45; // Delhi NCR
    else if (pinPrefix >= 14 && pinPrefix <= 16) distanceKm = 260; // Punjab / Chandigarh
    else if (pinPrefix >= 40 && pinPrefix <= 44) distanceKm = 1420; // Mumbai / MH
    else distanceKm = 850;
  } else if (yard.code.startsWith('BOM')) {
    if (pinPrefix >= 40 && pinPrefix <= 44) distanceKm = 50; // Mumbai / Thane / Pune
    else if (pinPrefix >= 56 && pinPrefix <= 59) distanceKm = 980; // Bengaluru / KA
    else distanceKm = 720;
  } else {
    distanceKm = 240;
  }

  // Rates in India: Base flatbed rate + ₹45 per km + GST
  let baseRate = 3500;
  if (vehicleType === 'luxury' || vehicleType === 'commercial') baseRate = 5500;
  if (vehicleType === 'twowheeler') baseRate = 1800;

  const perKmRate = vehicleType === 'twowheeler' ? 18 : (vehicleType === 'luxury' ? 55 : 42);
  const transitCost = baseRate + (distanceKm * perKmRate);
  const transitInsurance = Math.round(transitCost * 0.04);
  const totalTowing = transitCost + transitInsurance;

  return {
    originYard: yard.name,
    originCity: yard.city,
    distanceKm,
    estimatedDays: distanceKm < 150 ? 'Same Day (Within 8 hrs)' : (distanceKm < 600 ? '24 - 48 hrs' : '3 - 5 Days'),
    transitCost,
    transitInsurance,
    totalTowing
  };
}
