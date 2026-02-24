import { NextResponse } from "next/server";
import {
    CURRENCIES,
    getSupportedCurrencies,
    convertFromUSD,
    formatCurrencyAmount,
    isSupportedCurrency,
    type SupportedCurrency,
} from "@/lib/pricing/currency";
import { getPackageDetails } from "@/lib/pricing/packages";

export const dynamic = "force-dynamic";

// GET /api/pricing/currencies — list supported currencies
// GET /api/pricing/currencies?service=management&tier=standard&currency=EUR — get converted price
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const service = searchParams.get("service");
    const tier = searchParams.get("tier");
    const currency = searchParams.get("currency");

    // If no service/tier, return currency list
    if (!service || !tier) {
        const currencies = getSupportedCurrencies().map((code) => ({
            code,
            symbol: CURRENCIES[code].symbol,
            name: CURRENCIES[code].name,
        }));
        return NextResponse.json({ currencies });
    }

    // Get the package
    const pkg = getPackageDetails(service, tier);
    if (!pkg) {
        return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    const targetCurrency: SupportedCurrency =
        currency && isSupportedCurrency(currency) ? currency : "USD";

    const convertedPrice = convertFromUSD(pkg.basePrice, targetCurrency);

    return NextResponse.json({
        service,
        tier,
        basePriceUSD: pkg.basePrice,
        currency: targetCurrency,
        convertedPrice,
        formatted: formatCurrencyAmount(convertedPrice, targetCurrency),
        rate: CURRENCIES[targetCurrency].rate,
    });
}
