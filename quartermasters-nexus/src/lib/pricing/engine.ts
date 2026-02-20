import { PRICING_TABLE, getPackageDetails } from './packages'

export type PricingState = {
    current_state: string
    service: string
    tier: string
    base_price: number
    current_price: number
    discount_applied: number
    nudge_triggered: boolean
}

export type NegotiationAction = 'negotiate' | 'accept' | 'reject' | 'nudge'

export class PricingEngine {
    /**
     * Returns the base price for a given service and tier.
     */
    getInitialPrice(service: string, tier: string): number {
        const details = getPackageDetails(service, tier)
        if (!details) {
            throw new Error(`Invalid service/tier combination: ${service} / ${tier}`)
        }
        return details.basePrice
    }

    /**
     * Creates the initial pricing state.
     */
    createInitialState(service: string, tier: string): PricingState {
        const basePrice = this.getInitialPrice(service, tier)
        return {
            current_state: 'initial',
            service,
            tier,
            base_price: basePrice,
            current_price: basePrice,
            discount_applied: 0,
            nudge_triggered: false
        }
    }

    /**
     * Returns true if the state has reached the maximum allowed discount (10%).
     */
    isAtFloor(state: PricingState): boolean {
        const maxDiscountAmount = state.base_price * 0.10
        // We add a tiny epsilon to account for floating point inaccuracies
        return state.discount_applied >= maxDiscountAmount - 0.01
    }

    /**
     * Returns true if hesitation > 30s has occurred and a nudge hasn't been triggered yet.
     */
    shouldNudge(state: PricingState, hesitationMs: number): boolean {
        return hesitationMs > 30000 && !state.nudge_triggered
    }

    /**
     * Processes a negotiation action and returns a new state.
     * Modifies the clone of the state, not the original reference.
     */
    processNegotiation(state: PricingState, action: NegotiationAction): PricingState {
        const newState = { ...state }

        switch (action) {
            case 'accept':
                newState.current_state = 'closed'
                break

            case 'reject':
                newState.current_state = 'terminated'
                break

            case 'negotiate':
                if (this.isAtFloor(newState)) {
                    // Reached the max discount -> any further negotiation attempt terminates it
                    newState.current_state = 'terminated'
                } else {
                    // Apply max 3% discount per step
                    const maxDiscountForThisStep = newState.base_price * 0.03
                    const remainingAllowedDiscount = (newState.base_price * 0.10) - newState.discount_applied

                    const discountToApply = Math.min(maxDiscountForThisStep, remainingAllowedDiscount)

                    newState.discount_applied += discountToApply
                    newState.current_price = newState.base_price - newState.discount_applied

                    // Move from 'initial' to 'negotiating', or stay in 'negotiating'. If reached floor, set to 'floor'.
                    if (this.isAtFloor(newState)) {
                        newState.current_state = 'floor'
                    } else {
                        newState.current_state = 'negotiating'
                    }
                }
                break

            case 'nudge':
                if (!newState.nudge_triggered) {
                    // Apply 5% one-time discount, ensuring we don't breach the floor
                    const nudgeDiscount = newState.base_price * 0.05
                    const remainingAllowedDiscount = (newState.base_price * 0.10) - newState.discount_applied

                    const discountToApply = Math.min(nudgeDiscount, remainingAllowedDiscount)

                    newState.discount_applied += discountToApply
                    newState.current_price = newState.base_price - newState.discount_applied
                    newState.nudge_triggered = true

                    // Update state if we immediately hit the floor
                    if (this.isAtFloor(newState)) {
                        newState.current_state = 'floor'
                    } else {
                        // In nudge, typically we might just be 'anchored' or stay in their current state (e.g. 'initial').
                        if (newState.current_state === 'initial') {
                            newState.current_state = 'anchored' // Or whatever fits best, task says initial->anchored->negotiating.
                        }
                    }
                }
                break
        }

        return newState
    }
}
