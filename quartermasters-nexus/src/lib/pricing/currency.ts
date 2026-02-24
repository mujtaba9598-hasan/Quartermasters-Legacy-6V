/**
 * Multi-currency support for Quartermasters
 * All base prices are in USD. This module converts to target currencies.
 * Rates are updated manually (no external API dependency — zero spend).
 * At scale, swap to a live forex API (e.g., ExchangeRate-API or Open Exchange Rates).
 */

export type SupportedCurrency = "USD" | "EUR" | "GBP" | "SGD";

export type CurrencyConfig = {
    code: SupportedCurrency;
    symbol: string;
    name: string;
    locale: string;
    rate: number; // 1 USD = X of this currency
    stripeCurrency: string; // Stripe currency code (lowercase)
    decimalPlaces: number;
};

/**
 * Exchange rates relative to USD.
 * Last updated: 2026-02-24
 * Source: Manual (founder-approved static rates until live API is approved)
 */
export const CURRENCIES: Record<SupportedCurrency, CurrencyConfig> = {
    USD: {
        code: "USD",
        symbol: "$",
        name: "US Dollar",
        locale: "en-US",
        rate: 1.0,
        stripeCurrency: "usd",
        decimalPlaces: 2,
    },
    EUR: {
        code: "EUR",
        symbol: "\u20AC",
        name: "Euro",
        locale: "de-DE",
        rate: 0.92,
        stripeCurrency: "eur",
        decimalPlaces: 2,
    },
    GBP: {
        code: "GBP",
        symbol: "\u00A3",
        name: "British Pound",
        locale: "en-GB",
        rate: 0.79,
        stripeCurrency: "gbp",
        decimalPlaces: 2,
    },
    SGD: {
        code: "SGD",
        symbol: "S$",
        name: "Singapore Dollar",
        locale: "en-SG",
        rate: 1.34,
        stripeCurrency: "sgd",
        decimalPlaces: 2,
    },
};

/**
 * Convert amount from USD to target currency
 */
export function convertFromUSD(amountUSD: number, targetCurrency: SupportedCurrency): number {
    const config = CURRENCIES[targetCurrency];
    if (!config) return amountUSD;
    const converted = amountUSD * config.rate;
    return Math.round(converted * 100) / 100;
}

/**
 * Convert amount from target currency back to USD
 */
export function convertToUSD(amount: number, fromCurrency: SupportedCurrency): number {
    const config = CURRENCIES[fromCurrency];
    if (!config || config.rate === 0) return amount;
    const converted = amount / config.rate;
    return Math.round(converted * 100) / 100;
}

/**
 * Format an amount in the specified currency with proper locale and symbol
 */
export function formatCurrencyAmount(amount: number, currency: SupportedCurrency): string {
    const config = CURRENCIES[currency];
    if (!config) return `$${amount.toFixed(2)}`;

    return new Intl.NumberFormat(config.locale, {
        style: "currency",
        currency: config.code,
        minimumFractionDigits: config.decimalPlaces,
        maximumFractionDigits: config.decimalPlaces,
    }).format(amount);
}

/**
 * Convert amount to Stripe's smallest unit (cents/pence/fils etc.)
 * Stripe expects amounts in the smallest currency unit (e.g., 1000 = $10.00)
 */
export function toStripeAmount(amount: number, currency: SupportedCurrency): number {
    const config = CURRENCIES[currency];
    const multiplier = Math.pow(10, config?.decimalPlaces ?? 2);
    return Math.round(amount * multiplier);
}

/**
 * Convert from Stripe's smallest unit back to standard amount
 */
export function fromStripeAmount(stripeAmount: number, currency: SupportedCurrency): number {
    const config = CURRENCIES[currency];
    const divisor = Math.pow(10, config?.decimalPlaces ?? 2);
    return stripeAmount / divisor;
}

/**
 * Get all supported currency codes
 */
export function getSupportedCurrencies(): SupportedCurrency[] {
    return Object.keys(CURRENCIES) as SupportedCurrency[];
}

/**
 * Check if a currency code is supported
 */
export function isSupportedCurrency(code: string): code is SupportedCurrency {
    return code in CURRENCIES;
}

/**
 * Get a full price breakdown for a service in a target currency
 */
export function getPriceInCurrency(
    basePriceUSD: number,
    targetCurrency: SupportedCurrency,
    taxRate: number = 0
): {
    subtotal: number;
    taxAmount: number;
    total: number;
    currency: SupportedCurrency;
    formatted: {
        subtotal: string;
        taxAmount: string;
        total: string;
    };
} {
    const subtotal = convertFromUSD(basePriceUSD, targetCurrency);
    const taxAmount = Math.round(subtotal * (taxRate / 100) * 100) / 100;
    const total = subtotal + taxAmount;

    return {
        subtotal,
        taxAmount,
        total,
        currency: targetCurrency,
        formatted: {
            subtotal: formatCurrencyAmount(subtotal, targetCurrency),
            taxAmount: formatCurrencyAmount(taxAmount, targetCurrency),
            total: formatCurrencyAmount(total, targetCurrency),
        },
    };
}
