import { ABExperiment } from './ab-testing';

/**
 * Global Registry of Quartermasters A/B Experiments
 * Defines active tests, variants, and traffic allocation.
 */
export const ACTIVE_EXPERIMENTS: ABExperiment[] = [
    {
        id: 'q-greeting',
        name: 'Q Initial Greeting Interaction',
        traffic: 1.0, // 100% of visitors enter the experiment
        variants: [
            { id: 'standard', name: 'Standard Help', weight: 0.33 },        // "How can I help?"
            { id: 'challenge', name: 'Challenge-led', weight: 0.33 },       // "What challenge are you facing?"
            { id: 'service', name: 'Service-led', weight: 0.34 }            // "Which service interests you?"
        ]
    },
    {
        id: 'cta-copy',
        name: 'Primary Hub CTA Copy',
        traffic: 1.0,
        variants: [
            { id: 'conversation', name: 'Start a Conversation', weight: 0.34 },
            { id: 'strategic', name: 'Get Strategic Advice', weight: 0.33 },
            { id: 'talk-to-q', name: 'Talk to Q', weight: 0.33 }
        ]
    },
    {
        id: 'pricing-layout',
        name: 'VelvetRope Package Presentation',
        traffic: 1.0,
        variants: [
            { id: 'side-by-side', name: 'Standard Grid', weight: 0.5 },
            { id: 'featured-premium', name: 'Highlight Premium (Center)', weight: 0.5 }
        ]
    }
];
