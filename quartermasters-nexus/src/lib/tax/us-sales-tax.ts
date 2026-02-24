/**
 * US Sales Tax Compliance Module
 * ================================
 * Quartermasters — California, United States
 *
 * Consultancy services are generally EXEMPT from sales tax in most US states.
 * However, some states tax certain "information services," "data processing,"
 * or bundled deliverables (e.g., reports delivered digitally). This module
 * provides a conservative compliance layer:
 *
 *  1. Nexus states — where QM must collect tax (initially: CA only, home state)
 *  2. State rate lookup — combined state + avg local rate
 *  3. Service taxability rules — per-state overrides for consultancy exemptions
 *  4. Tax calculation — integrates with invoice-service.ts and currency.ts
 *
 * IMPORTANT: This is NOT legal advice. Rates are approximate combined
 * (state + average local). A tax advisor should review before going live.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type USStateCode =
    | "AL" | "AK" | "AZ" | "AR" | "CA" | "CO" | "CT" | "DE" | "FL" | "GA"
    | "HI" | "ID" | "IL" | "IN" | "IA" | "KS" | "KY" | "LA" | "ME" | "MD"
    | "MA" | "MI" | "MN" | "MS" | "MO" | "MT" | "NE" | "NV" | "NH" | "NJ"
    | "NM" | "NY" | "NC" | "ND" | "OH" | "OK" | "OR" | "PA" | "RI" | "SC"
    | "SD" | "TN" | "TX" | "UT" | "VT" | "VA" | "WA" | "WV" | "WI" | "WY"
    | "DC";

export type TaxExemptionReason =
    | "no_nexus"
    | "no_state_sales_tax"
    | "consultancy_exempt"
    | "below_threshold";

export type TaxResult = {
    taxable: boolean;
    rate: number;           // Effective rate as percentage (e.g., 7.25)
    stateRate: number;      // State portion only
    localRate: number;      // Average local portion
    exemptionReason: TaxExemptionReason | null;
    stateCode: USStateCode;
    stateName: string;
    nexusState: boolean;
};

export type TaxCalculation = {
    subtotal: number;
    taxRate: number;        // Percentage
    taxAmount: number;
    total: number;
    taxResult: TaxResult;
};

// ---------------------------------------------------------------------------
// State Sales Tax Rates (combined state + average local)
// Source: Tax Foundation 2025 estimates. Updated manually.
// States with 0 state sales tax: AK, DE, MT, NH, OR (5 states + DC partial)
// ---------------------------------------------------------------------------

type StateInfo = {
    name: string;
    stateRate: number;
    avgLocalRate: number;
    consultancyExempt: boolean; // True = professional services exempt
};

const US_STATES: Record<USStateCode, StateInfo> = {
    AL: { name: "Alabama",              stateRate: 4.00,  avgLocalRate: 5.24, consultancyExempt: true },
    AK: { name: "Alaska",               stateRate: 0,     avgLocalRate: 1.82, consultancyExempt: true },
    AZ: { name: "Arizona",              stateRate: 5.60,  avgLocalRate: 2.80, consultancyExempt: true },
    AR: { name: "Arkansas",             stateRate: 6.50,  avgLocalRate: 2.97, consultancyExempt: true },
    CA: { name: "California",           stateRate: 7.25,  avgLocalRate: 1.60, consultancyExempt: true },
    CO: { name: "Colorado",             stateRate: 2.90,  avgLocalRate: 4.87, consultancyExempt: true },
    CT: { name: "Connecticut",          stateRate: 6.35,  avgLocalRate: 0,    consultancyExempt: false },
    DE: { name: "Delaware",             stateRate: 0,     avgLocalRate: 0,    consultancyExempt: true },
    FL: { name: "Florida",              stateRate: 6.00,  avgLocalRate: 1.02, consultancyExempt: true },
    GA: { name: "Georgia",              stateRate: 4.00,  avgLocalRate: 3.38, consultancyExempt: true },
    HI: { name: "Hawaii",              stateRate: 4.00,  avgLocalRate: 0.50, consultancyExempt: false },
    ID: { name: "Idaho",                stateRate: 6.00,  avgLocalRate: 0.02, consultancyExempt: true },
    IL: { name: "Illinois",             stateRate: 6.25,  avgLocalRate: 2.57, consultancyExempt: true },
    IN: { name: "Indiana",              stateRate: 7.00,  avgLocalRate: 0,    consultancyExempt: true },
    IA: { name: "Iowa",                 stateRate: 6.00,  avgLocalRate: 0.94, consultancyExempt: true },
    KS: { name: "Kansas",               stateRate: 6.50,  avgLocalRate: 2.20, consultancyExempt: true },
    KY: { name: "Kentucky",             stateRate: 6.00,  avgLocalRate: 0,    consultancyExempt: true },
    LA: { name: "Louisiana",            stateRate: 4.45,  avgLocalRate: 5.10, consultancyExempt: true },
    ME: { name: "Maine",                stateRate: 5.50,  avgLocalRate: 0,    consultancyExempt: true },
    MD: { name: "Maryland",             stateRate: 6.00,  avgLocalRate: 0,    consultancyExempt: true },
    MA: { name: "Massachusetts",        stateRate: 6.25,  avgLocalRate: 0,    consultancyExempt: true },
    MI: { name: "Michigan",             stateRate: 6.00,  avgLocalRate: 0,    consultancyExempt: true },
    MN: { name: "Minnesota",            stateRate: 6.875, avgLocalRate: 0.62, consultancyExempt: true },
    MS: { name: "Mississippi",          stateRate: 7.00,  avgLocalRate: 0.07, consultancyExempt: true },
    MO: { name: "Missouri",             stateRate: 4.225, avgLocalRate: 4.06, consultancyExempt: true },
    MT: { name: "Montana",              stateRate: 0,     avgLocalRate: 0,    consultancyExempt: true },
    NE: { name: "Nebraska",             stateRate: 5.50,  avgLocalRate: 1.44, consultancyExempt: true },
    NV: { name: "Nevada",               stateRate: 6.85,  avgLocalRate: 1.38, consultancyExempt: true },
    NH: { name: "New Hampshire",        stateRate: 0,     avgLocalRate: 0,    consultancyExempt: true },
    NJ: { name: "New Jersey",           stateRate: 6.625, avgLocalRate: 0,    consultancyExempt: true },
    NM: { name: "New Mexico",           stateRate: 4.875, avgLocalRate: 2.71, consultancyExempt: false },
    NY: { name: "New York",             stateRate: 4.00,  avgLocalRate: 4.53, consultancyExempt: true },
    NC: { name: "North Carolina",       stateRate: 4.75,  avgLocalRate: 2.25, consultancyExempt: true },
    ND: { name: "North Dakota",         stateRate: 5.00,  avgLocalRate: 1.97, consultancyExempt: true },
    OH: { name: "Ohio",                 stateRate: 5.75,  avgLocalRate: 1.48, consultancyExempt: true },
    OK: { name: "Oklahoma",             stateRate: 4.50,  avgLocalRate: 4.48, consultancyExempt: true },
    OR: { name: "Oregon",               stateRate: 0,     avgLocalRate: 0,    consultancyExempt: true },
    PA: { name: "Pennsylvania",         stateRate: 6.00,  avgLocalRate: 0.34, consultancyExempt: true },
    RI: { name: "Rhode Island",         stateRate: 7.00,  avgLocalRate: 0,    consultancyExempt: true },
    SC: { name: "South Carolina",       stateRate: 6.00,  avgLocalRate: 1.46, consultancyExempt: true },
    SD: { name: "South Dakota",         stateRate: 4.20,  avgLocalRate: 1.90, consultancyExempt: false },
    TN: { name: "Tennessee",            stateRate: 7.00,  avgLocalRate: 2.55, consultancyExempt: true },
    TX: { name: "Texas",                stateRate: 6.25,  avgLocalRate: 1.95, consultancyExempt: true },
    UT: { name: "Utah",                 stateRate: 6.10,  avgLocalRate: 1.09, consultancyExempt: true },
    VT: { name: "Vermont",              stateRate: 6.00,  avgLocalRate: 0.38, consultancyExempt: true },
    VA: { name: "Virginia",             stateRate: 5.30,  avgLocalRate: 0.47, consultancyExempt: true },
    WA: { name: "Washington",           stateRate: 6.50,  avgLocalRate: 3.83, consultancyExempt: true },
    WV: { name: "West Virginia",        stateRate: 6.00,  avgLocalRate: 0.55, consultancyExempt: false },
    WI: { name: "Wisconsin",            stateRate: 5.00,  avgLocalRate: 0.46, consultancyExempt: true },
    WY: { name: "Wyoming",              stateRate: 4.00,  avgLocalRate: 1.44, consultancyExempt: true },
    DC: { name: "District of Columbia", stateRate: 6.00,  avgLocalRate: 0,    consultancyExempt: true },
};

// ---------------------------------------------------------------------------
// Nexus States — where Quartermasters has tax collection obligation
// Initially California only (home state). Add states as physical/economic
// nexus thresholds are met (typically $100K revenue or 200 transactions/year).
// ---------------------------------------------------------------------------

const NEXUS_STATES: Set<USStateCode> = new Set([
    "CA",   // Home state — always nexus
]);

/**
 * Economic nexus thresholds by state (revenue in USD).
 * Most states use $100K, some use $500K. Tracked here for future automation.
 */
const ECONOMIC_NEXUS_THRESHOLDS: Partial<Record<USStateCode, number>> = {
    CA: 500000,
    TX: 500000,
    NY: 500000,
    FL: 100000,
    WA: 100000,
    // Most other states: $100K — only listed where different
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Determine tax applicability and rate for a given US state.
 * Returns full TaxResult with exemption reason if not taxable.
 */
export function getTaxForState(stateCode: string): TaxResult {
    const code = stateCode.toUpperCase() as USStateCode;
    const state = US_STATES[code];

    if (!state) {
        return {
            taxable: false,
            rate: 0,
            stateRate: 0,
            localRate: 0,
            exemptionReason: "no_nexus",
            stateCode: code,
            stateName: "Unknown",
            nexusState: false,
        };
    }

    const isNexus = NEXUS_STATES.has(code);
    const hasStateTax = state.stateRate > 0 || state.avgLocalRate > 0;
    const combinedRate = state.stateRate + state.avgLocalRate;

    // Not a nexus state — no obligation to collect
    if (!isNexus) {
        return {
            taxable: false,
            rate: 0,
            stateRate: state.stateRate,
            localRate: state.avgLocalRate,
            exemptionReason: "no_nexus",
            stateCode: code,
            stateName: state.name,
            nexusState: false,
        };
    }

    // Nexus state but no state sales tax (e.g., OR, MT — unlikely nexus but defensive)
    if (!hasStateTax) {
        return {
            taxable: false,
            rate: 0,
            stateRate: 0,
            localRate: 0,
            exemptionReason: "no_state_sales_tax",
            stateCode: code,
            stateName: state.name,
            nexusState: true,
        };
    }

    // Professional/management consultancy is exempt in most states
    if (state.consultancyExempt) {
        return {
            taxable: false,
            rate: 0,
            stateRate: state.stateRate,
            localRate: state.avgLocalRate,
            exemptionReason: "consultancy_exempt",
            stateCode: code,
            stateName: state.name,
            nexusState: true,
        };
    }

    // Taxable: nexus + has tax + not exempt
    return {
        taxable: true,
        rate: Math.round(combinedRate * 100) / 100,
        stateRate: state.stateRate,
        localRate: state.avgLocalRate,
        exemptionReason: null,
        stateCode: code,
        stateName: state.name,
        nexusState: true,
    };
}

/**
 * Calculate sales tax for a given amount and US state.
 * Returns full breakdown with subtotal, tax, and total.
 */
export function calculateSalesTax(
    subtotalUSD: number,
    stateCode: string
): TaxCalculation {
    const taxResult = getTaxForState(stateCode);

    if (!taxResult.taxable) {
        return {
            subtotal: subtotalUSD,
            taxRate: 0,
            taxAmount: 0,
            total: subtotalUSD,
            taxResult,
        };
    }

    const taxAmount = Math.round(subtotalUSD * (taxResult.rate / 100) * 100) / 100;

    return {
        subtotal: subtotalUSD,
        taxRate: taxResult.rate,
        taxAmount,
        total: Math.round((subtotalUSD + taxAmount) * 100) / 100,
        taxResult,
    };
}

/**
 * Check if a state code is a valid US state/territory.
 */
export function isValidUSState(code: string): code is USStateCode {
    return code.toUpperCase() in US_STATES;
}

/**
 * Get state name from code.
 */
export function getStateName(code: string): string | null {
    const state = US_STATES[code.toUpperCase() as USStateCode];
    return state ? state.name : null;
}

/**
 * Get all nexus states (where QM collects tax).
 */
export function getNexusStates(): USStateCode[] {
    return Array.from(NEXUS_STATES);
}

/**
 * Add a nexus state at runtime (e.g., when economic nexus threshold is crossed).
 * Persisting this change to the database is the caller's responsibility.
 */
export function addNexusState(stateCode: USStateCode): void {
    NEXUS_STATES.add(stateCode);
}

/**
 * Get all US states with their tax info (for admin dashboard).
 */
export function getAllStateTaxInfo(): Array<TaxResult> {
    return (Object.keys(US_STATES) as USStateCode[]).map(code => getTaxForState(code));
}

/**
 * Get economic nexus threshold for a state.
 * Returns the threshold in USD, or 100000 as default (most common).
 */
export function getEconomicNexusThreshold(stateCode: string): number {
    const code = stateCode.toUpperCase() as USStateCode;
    return ECONOMIC_NEXUS_THRESHOLDS[code] ?? 100000;
}

/**
 * Format a tax line item description for invoices.
 * e.g., "Sales Tax (CA 8.85%)" or "Tax Exempt — Professional Services"
 */
export function formatTaxLineDescription(taxResult: TaxResult): string {
    if (!taxResult.taxable) {
        switch (taxResult.exemptionReason) {
            case "no_nexus":
                return "No tax — outside nexus jurisdiction";
            case "no_state_sales_tax":
                return `No sales tax — ${taxResult.stateName}`;
            case "consultancy_exempt":
                return "Tax exempt — Professional consultancy services";
            case "below_threshold":
                return "Tax exempt — Below economic nexus threshold";
            default:
                return "No tax applicable";
        }
    }

    return `Sales Tax (${taxResult.stateCode} ${taxResult.rate}%)`;
}
