export type PackageDetails = {
    service: string
    tier: string
    basePrice: number
    description: string
    deliverables: string[]
    timeline: string
}

export const PRICING_TABLE: Record<string, Record<string, PackageDetails>> = {
    'financial-advisory': {
        'express': {
            service: 'financial-advisory',
            tier: 'express',
            basePrice: 1500,
            description: 'Rapid financial health audit and basic structuring recommendations.',
            deliverables: ['Initial Risk Assessment', 'Cash Flow Analysis', 'High-Level Tax Optimization Strategy'],
            timeline: '2-3 weeks'
        },
        'standard': {
            service: 'financial-advisory',
            tier: 'standard',
            basePrice: 18000,
            description: 'Comprehensive financial planning and operational implementation.',
            deliverables: ['Full Market Analysis', 'Detailed Financial Modeling', 'Investment Structuring', 'Banking Relationship Introduction'],
            timeline: '4-6 weeks'
        },
        'premium': {
            service: 'financial-advisory',
            tier: 'premium',
            basePrice: 45000,
            description: 'Advanced financial restructuring and bespoke wealth management solutions.',
            deliverables: ['M&A Readiness Review', 'Complex Cross-Border Tax Planning', 'Custom Portfolio Strategy', 'Quarterly Review Meetings'],
            timeline: '2-3 months'
        },
        'enterprise': {
            service: 'financial-advisory',
            tier: 'enterprise',
            basePrice: 85000,
            description: 'Full-scale outsourced CFO services and corporate governance.',
            deliverables: ['Dedicated Virtual CFO', 'Board-Level Reporting', 'Fundraising Preparation', 'Continuous Regulatory Compliance', 'Annual Audit Support'],
            timeline: '6+ months / Ongoing'
        }
    },
    'human-capital': {
        'express': {
            service: 'human-capital',
            tier: 'express',
            basePrice: 1200,
            description: 'Essential HR compliance check and policy review.',
            deliverables: ['Employee Handbook Review', 'Basic Contract Templates', 'US Labor Law Compliance Check'],
            timeline: '1-2 weeks'
        },
        'standard': {
            service: 'human-capital',
            tier: 'standard',
            basePrice: 14000,
            description: 'End-to-end recruitment strategy and talent acquisition setup.',
            deliverables: ['Role Profiling', 'Sourcing Strategy', 'Interview Playbook', 'Onboarding Framework'],
            timeline: '3-4 weeks'
        },
        'premium': {
            service: 'human-capital',
            tier: 'premium',
            basePrice: 35000,
            description: 'Leadership coaching, performance management, and organizational design.',
            deliverables: ['Executive Assessment', 'Compensation Benchmarking', 'KPI Framework Design', 'Leadership Development Plan'],
            timeline: '2 months'
        },
        'enterprise': {
            service: 'human-capital',
            tier: 'enterprise',
            basePrice: 72000,
            description: 'Comprehensive restructuring and outsourced HR partnership.',
            deliverables: ['Full HR Audit & Redesign', 'Change Management Implementation', 'Long-term Talent Retention Strategy', 'Dedicated HR Business Partner'],
            timeline: '6+ months / Ongoing'
        }
    },
    'management': {
        'express': {
            service: 'management',
            tier: 'express',
            basePrice: 1800,
            description: 'Rapid operational efficiency audit and strategic alignment session.',
            deliverables: ['Process Bottleneck Identification', 'Strategic Goal Review', '1-Day Executive Workshop'],
            timeline: '2 weeks'
        },
        'standard': {
            service: 'management',
            tier: 'standard',
            basePrice: 22000,
            description: 'In-depth market entry strategy and operational scaling roadmap.',
            deliverables: ['Competitor Analysis', 'Go-to-Market Strategy', 'Operational Scaling Plan', 'Risk Mitigation Strategy'],
            timeline: '4-6 weeks'
        },
        'premium': {
            service: 'management',
            tier: 'premium',
            basePrice: 50000,
            description: 'Complex organizational transformation and digital strategy integration.',
            deliverables: ['Digital Transformation Roadmap', 'Change Management execution', 'C-Suite Advisory', 'Vendor Selection Framework'],
            timeline: '3 months'
        },
        'enterprise': {
            service: 'management',
            tier: 'enterprise',
            basePrice: 95000,
            description: 'Turnaround management and long-term strategic partnership.',
            deliverables: ['Crisis Management Implementation', 'Full Strategic Pivot Execution', 'Interim Management Placement', 'Continuous Board Advisory'],
            timeline: '6-12 months'
        }
    },
    'tech-rnd': {
        'express': {
            service: 'tech-rnd',
            tier: 'express',
            basePrice: 1600,
            description: 'Initial technology stack audit and feasibility study.',
            deliverables: ['Current Architecture Review', 'Competitor Tech Analysis', 'Feasibility Report'],
            timeline: '2 weeks'
        },
        'standard': {
            service: 'tech-rnd',
            tier: 'standard',
            basePrice: 20000,
            description: 'Prototype design and technology roadmap development.',
            deliverables: ['Proof of Concept Design', 'Technology Selection Matrix', 'Development Roadmap', 'Security Assessment'],
            timeline: '4 weeks'
        },
        'premium': {
            service: 'tech-rnd',
            tier: 'premium',
            basePrice: 42000,
            description: 'Advanced R&D planning, AI integration strategy, and scalability architecture.',
            deliverables: ['AI/ML Integration Plan', 'Cloud Architecture Design', 'Data Pipeline Strategy', 'Innovation Workshop'],
            timeline: '2-3 months'
        },
        'enterprise': {
            service: 'tech-rnd',
            tier: 'enterprise',
            basePrice: 90000,
            description: 'End-to-end proprietary technology development advisory and outsourced CTO.',
            deliverables: ['Custom Algorithm Design Review', 'IP Strategy Alignment', 'Vendor Management', 'Fractional CTO Engagement'],
            timeline: '6+ months'
        }
    },
    'event-logistics': {
        'express': {
            service: 'event-logistics',
            tier: 'express',
            basePrice: 1000,
            description: 'Event concept review and basic vendor recommendations.',
            deliverables: ['Venue Shortlist', 'Concept Feasibility Check', 'Initial Budget Estimate'],
            timeline: '1-2 weeks'
        },
        'standard': {
            service: 'event-logistics',
            tier: 'standard',
            basePrice: 15000,
            description: 'Comprehensive event planning, timeline management, and vendor coordination.',
            deliverables: ['Detailed Project Plan', 'Vendor Contract Review', 'Marketing & Attendance Strategy', 'On-Site Coordination Plan'],
            timeline: '4-8 weeks'
        },
        'premium': {
            service: 'event-logistics',
            tier: 'premium',
            basePrice: 38000,
            description: 'High-profile corporate event execution with VIP handling and complex logistics.',
            deliverables: ['VIP Protocol Management', 'Cross-Border Logistics', 'Sponsorship Strategy', 'Post-Event ROI Analysis'],
            timeline: '3-4 months'
        },
        'enterprise': {
            service: 'event-logistics',
            tier: 'enterprise',
            basePrice: 75000,
            description: 'Global exhibition management and multi-city roadshow operations.',
            deliverables: ['Multi-Region Logistics Coordination', 'Custom Pavilion Design Management', 'End-to-End Delegate Experience', 'Dedicated Account Director'],
            timeline: '6+ months'
        }
    }
}

/**
 * Retrieves package details from the PRICING_TABLE.
 */
export function getPackageDetails(service: string, tier: string): PackageDetails | null {
    if (PRICING_TABLE[service] && PRICING_TABLE[service][tier]) {
        return PRICING_TABLE[service][tier]
    }
    return null
}
