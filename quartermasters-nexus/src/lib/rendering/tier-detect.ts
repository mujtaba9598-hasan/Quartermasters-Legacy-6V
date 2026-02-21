export type RenderingTier = 'high' | 'medium' | 'low';

export function detectRenderingTier(): RenderingTier {
    if (typeof window === 'undefined') return 'low'; // SSR fallback

    let canvas: HTMLCanvasElement | null = document.createElement('canvas');
    let gl: WebGL2RenderingContext | null = null;
    let tier: RenderingTier = 'medium'; // Default fallback

    try {
        gl = canvas.getContext('webgl2');
        if (!gl) {
            // No WebGL2 support at all
            tier = 'low';
        } else {
            // WebGL2 supported, check GPU
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            if (debugInfo) {
                const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)?.toLowerCase() || '';

                // Known software renderers or extremely low-end GPUs
                const lowEndKeywords = ['swiftshader', 'llvmpipe', 'software', 'mesa'];
                const isLowEndGPU = lowEndKeywords.some(keyword => renderer.includes(keyword));

                if (isLowEndGPU) {
                    tier = 'medium';
                } else {
                    // GPU seems okay, check CPU cores as a proxy for overall system capability
                    const cores = window.navigator.hardwareConcurrency || 2; // Default to 2 if unknown
                    if (cores >= 4) {
                        tier = 'high';
                    } else {
                        tier = 'medium'; // Weak CPU, throttle to medium even if it has a GPU
                    }
                }
            } else {
                // Extensions blocked (e.g., Safari/Firefox privacy), rely on CPU cores
                const cores = window.navigator.hardwareConcurrency || 2;
                tier = cores >= 4 ? 'high' : 'medium';
            }
        }
    } catch (e) {
        // Any error during creation -> low tier
        tier = 'low';
    } finally {
        // Cleanup memory
        if (gl) {
            const ext = gl.getExtension('WEBGL_lose_context');
            if (ext) ext.loseContext();
        }
        canvas = null;
    }

    return tier;
}

export function getTierConfig(tier: RenderingTier): { avatar: 'three' | 'lottie' | 'css', particles: boolean, postProcessing: boolean } {
    switch (tier) {
        case 'high':
            return {
                avatar: 'three',
                particles: true,
                postProcessing: true
            };
        case 'medium':
            return {
                avatar: 'lottie',
                particles: false,
                postProcessing: false
            };
        case 'low':
        default:
            return {
                avatar: 'css',
                particles: false,
                postProcessing: false
            };
    }
}
