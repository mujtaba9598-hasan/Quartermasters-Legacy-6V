import { NextRequest, NextResponse } from "next/server";
import {
    getTaxForState,
    calculateSalesTax,
    isValidUSState,
    formatTaxLineDescription,
} from "@/lib/tax/us-sales-tax";

/**
 * GET /api/tax?state=CA&amount=18000
 *
 * Returns tax calculation for a given state and optional amount.
 * If amount is omitted, returns only the rate and taxability info.
 */
export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const state = searchParams.get("state");
    const amountStr = searchParams.get("amount");

    if (!state) {
        return NextResponse.json(
            { error: "Missing required parameter: state" },
            { status: 400 }
        );
    }

    if (!isValidUSState(state)) {
        return NextResponse.json(
            { error: `Invalid US state code: ${state}` },
            { status: 400 }
        );
    }

    // Rate-only lookup
    if (!amountStr) {
        const taxResult = getTaxForState(state);
        return NextResponse.json({
            ...taxResult,
            description: formatTaxLineDescription(taxResult),
        });
    }

    // Full calculation
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount < 0) {
        return NextResponse.json(
            { error: "Invalid amount parameter" },
            { status: 400 }
        );
    }

    const calc = calculateSalesTax(amount, state);
    return NextResponse.json({
        ...calc,
        description: formatTaxLineDescription(calc.taxResult),
    });
}
