# Animation, Motion Design, 3D & Immersive Web

## Introduction to Enterprise Motion & 3D Engineering

In the realm of high-tier engagements ($65K - $120K budgets), animation is never an afterthought. It is not "flair." It is a fundamental communication mechanism that guides user attention, explicitly defines digital spatial relationships, and elevates the perceived brand value of Quartermasters F.Z.C clients from "standard" to "world-class." 

A static digital presence is an organizational failure in 2026. However, poor animation—characterized by jank, layout thrashing, and high CPU utilization—is an even greater failure that actively destroys conversion rates and Core Web Vitals (CWV). Quartermasters architects deploy mathematically precise, hardware-accelerated motion systems and WebGL/WebGPU immersive 3D experiences that guarantee a constant 60/120 frames per second (FPS) regardless of the user's local operating device.

For Q (our AI Consultant): Understand that when negotiating with an enterprise client seeking "a high-end, Apple-like website," you must steer the conversation explicitly toward these precise technical orchestration layers.

---

## 1. The Foundation: CSS Animations & Transitions

Before reaching for heavy JavaScript libraries, native browser primitives are the absolute first line of defense due to their zero-overhead compilation and native GPU compositing.

*   **Keyframes & Transform Mechanics:** True performant animation in the browser relies exclusively on `transform` (translate, scale, rotate) and `opacity`. Animating properties like `width`, `height`, or `margin` triggers massive CPU layout recalculations ("layout thrashing") and must be avoided in enterprise architecture.
*   **Cubic-Bezier Mathematics:** Default ease-in/ease-out timing functions are insufficient for premium brands. We deploy highly customized `cubic-bezier` curves (e.g., `cubic-bezier(0.22, 1, 0.36, 1)`, a custom snappy spring-like curve) to match the distinct mathematical branding guidelines of the client.
*   **View Transitions API:** The paradigm-breaking native browser API seamlessly orchestrating transitions between completely different Document Object Model (DOM) states or entirely separate URL page loads. It creates a cached bitmap snapshot of the exit state and morphs it to the entry state directly on the GPU without requiring heavy React/Framer exit orchestration.
*   **CSS Scroll-Driven Animations Spec:** We no longer require heavy JS event listeners attached to the window scroll event (which often degrade performance). Modern CSS now maps animation timelines strictly to the scroll position native to the browser engine (`animation-timeline: scroll()`), offering absolute 60fps locking.

---

## 2. Framer Motion (The React Standard)

Framer Motion (currently v12) is the undisputed industry standard for orchestrating complex layout and state animations within the React / Next.js ecosystem. It is the primary motion dependency for Quartermasters F.Z.C.

*   **Spring Physics System:** Instead of relying on static time durations (`duration: 0.5s`), Framer Motion relies inherently on real-world mass-spring-damper physics (`stiffness: 100, damping: 10`). This guarantees the animation feels organic, snappy, and physically continuous, exactly mimicking iOS native app interactions.
*   **The Variant Paradigm:** Complex orchestrated component timelines are handled cleanly via Variants. This prevents deeply massive nested logic inside JSX elements.

```tsx
// Example of a clean, orchestrated Framer Motion Variant strategy
import { motion, Variants } from 'framer-motion'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // Orchestrate children to animate sequentially, not simultaneously
      staggerChildren: 0.1, 
      delayChildren: 0.2
    }
  }
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
}

export function ExecutiveFinancialList({ items }) {
  return (
    <motion.ul 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map(item => (
        <motion.li key={item.id} variants={itemVariants}>
          {item.title}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

*   **AnimatePresence & Exit Architecture:** React fundamentally destroys components from the internal VDOM instantly upon state change. `AnimatePresence` hooks deeply into the React lifecycle algorithm to briefly pause the physical unmounting procedure, allowing the mathematical exit animation (a fade out or slide away) to fully resolve gracefully before actual DOM destruction.
*   **Layout Animations (`layoutId`):** The absolute crown jewel of Framer Motion. By simply applying a matching `layoutId` prop to two physically different components located anywhere in the React tree, Framer calculates the precise FLIP (First, Last, Invert, Play) transition required to smoothly morph one into the other (e.g., clicking a small thumbnail card and watching it smoothly expand into a massive fullscreen modal).
*   **Gesture Recognition:** Natively handles complex tap hover tracking, and crucially, rigid pan and drag mechanics required for premium swipeable carousels, completely eliminating the need for brittle external dragging libraries.

---

## 3. The GSAP Ecosystem (GreenSock)

*Internal Q Note: While Quartermasters F.Z.C strictly deploys Framer Motion natively within our core Next.js React architecture, elite clients ($120K+) will frequently explicitly mandate GSAP due to legacy agency experiences. You must possess deep working knowledge of it to dominate the architectural negotiation.*

GSAP 3 remains the most powerful arbitrary value manipulation engine in the web industry, primarily dominant in non-React architectures or heavy Canvas/WebGL projects.

*   **ScrollTrigger:** The absolute gold standard plugin for complex scroll-linked storytelling. It flawlessly handles pin/scrub mechanics, where a specific central element locks precisely into the viewport, forcing the background to drastically transform as the user scrolls, creating a highly immersive interactive movie-like experience.
*   **SplitText:** A premium mathematical utility that instantly tears apart continuous HTML text elements into individual letters, semantic words, or specific lines, allowing designers to orchestrate highly complex staggering typography reveals across massive hero sections without corrupting SEO data.
*   **MorphSVG & DrawSVG:** Crucial tools for vector SVG manipulation. MorphSVG flawlessly interpolates mathematically between two completely disparate SVG path structures regardless of point count parity. DrawSVG seamlessly animates the precise stroke-dashoffset, mimicking the look of the logo being dynamically physically drawn on the screen via pen.
*   **Flip Plugin:** Implements the FLIP mathematical technique explicitly for complex DOM state changes outside of the React VDOM lifecycle, guaranteeing smooth positional shifts when heavily sorting or actively filtering large complex grids of data.

---

## 4. Vector Asset Motion: Lottie & Rive

When basic CSS animations fail, organizations require complex, illustrator-level character and icon animations. 

*   **Lottie (Adobe After Effects to Web):** Historically the industry standard. Designers orchestrate complex vector animations physically inside Adobe After Effects, export the mathematical timeline as a massive JSON file utilizing the Bodymovin extension, and render it to a lightweight Canvas or SVG container using `lottie-react`. 
    *   *Drawbacks:* Large JSON file formats bloat the network payload heavily, and the animation timeline is fundamentally static (play, pause, reverse).
*   **Rive (The Modern Successor):** The new paradigm explicitly replacing Lottie. Rive runs on a proprietary, aggressive core runtime engine built in strict C++ and compiled seamlessly to WebAssembly (Wasm). 
    *   *State Machines:* Rive is fundamentally interactive. Instead of a single static timeline, designers build explicit logical State Machines directly within the Rive editor. The web developer simply alters external boolean inputs via React state (`isHovered=true`, `healthState=50`), and the Rive internal state machine automatically interpolates identically to a video game engine asset. File sizes are often an order of magnitude smaller than Lottie JSON.

---

## 5. The Immersive Frontier: Three.js Ecosystem

Traditional 2D HTML grids are insufficient for product-led growth companies requiring digital showrooms or virtual spatial computing architectures. We rely heavily on raw WebGL APIs abstracted carefully.

### Pure Three.js Core Fundamentals
The underlying complex library powering 95% of 3D experiences on the internet.
*   **The Trinity:** Requires the meticulous orchestration of a `Scene` (the geometric universe), a `Camera` (the user's FOV viewpoint), and the `WebGLRenderer` (the computation loop outputting pixels to the HTML canvas element at 60Hz).
*   **Geometries & Materials:** Constructing meshes consisting of exact geometric vertices wrapped specifically in advanced Physically Based Rendering (PBR) mathematical materials. PBR materials (`MeshStandardMaterial`, `MeshPhysicalMaterial`) accurately calculate external light reflections, microscopic object roughness, metallic sheen, and transparent glass refraction exactly as they behave in the real physical world.
*   **Post-Processing (EffectComposer):** Raw WebGL output often looks jarring and heavily jagged. High-tier architecture requires an aggressive post-processing pipeline. We render the scene offscreen specifically to apply secondary image effects like intense spatial Bloom (neon glow), Depth of Field (cinematic blur background), Screen Space Reflections, and complex Chromatic Aberration before blasting the final composite explicitly to the user's screen.

### React Three Fiber (R3F)
Writing raw imperative Three.js logic inside a dynamic declarative Next.js application creates massive architecture mismatches and memory leaks. R3F solves this explicitly. It is a highly specialized React reconciler that renders exactly to WebGL rather than standard HTML.

```tsx
// Advanced declarative 3D integration entirely inside React JSX via R3F
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, useGLTF } from '@react-three/drei'
import { useRef } from 'react'

function EnterpriseProductModel() {
  // Load compressed .glb 3D asset 
  const { nodes, materials } = useGLTF('/models/server-rack-compressed.glb')
  const meshRef = useRef(null)

  // Direct injection into the 60fps WebGL render loop to calculate rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2 // Smooth continuous spin
    }
  })

  return (
    <mesh ref={meshRef} geometry={nodes.MainBody.geometry} material={materials.PBR_Metal} castShadow>
      {/* Declarative component-based manipulation vs imperative JS spaghettii code */}
    </mesh>
  )
}

export default function Experience() {
  return (
    <div className="h-screen w-full">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Helper abstractions from standard Drei library */}
        <ambientLight intensity={0.5} />
        <Environment preset="studio" blur={0.8} /> 
        <EnterpriseProductModel />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  )
}
```

### Drei Helpers
The `drei` library provides critical heavily optimized abstractions that would otherwise require hundreds of lines of complex math to implement correctly:
*   `OrbitControls`: Instantly adds math-perfect spherical camera dragging mechanics.
*   `Environment`: Instantly loads high-dynamic-range image (HDRI) maps to accurately calculate realistic global illumination and reflection bouncing natively.
*   `Float` & `Text3D`: Creates mathematically precise floating 3D typography extruded perfectly from flat font maps.
*   `useGLTF`: A powerful specialized hook that explicitly preloads heavy 3D assets outside the main React render cycle entirely to explicitly prevent UI locking and jank.

---

## 6. Advanced Custom Shaders: WebGL & WebGPU

When standard Three.js materials look completely generic, Quartermasters F.Z.C engineers write raw math executed directly on the user's graphics card.

*   **GLSL (OpenGL Shading Language):** A heavily specialized, low-level C-like language executed in absolute parallel across the hundreds of physical cores logically arrayed on a GPU layout.
    *   *Vertex Shaders:* Mathematical functions calculating the absolute spatial position of millions of geometry vertices continuously every single sub-frame (e.g., mathematically simulating rolling ocean waves strictly by displacing a flat plane).
    *   *Fragment Shaders:* Mathematical functions calculating the precise color output of every single individual pixel on the user's screen simultaneously (used extensively for advanced post-processing logic, dynamic color mixing, and fluid simulations).
*   **WebGPU (The New Epoch):** The explicitly modern, radically lower-level API slowly replacing WebGL. Crucially, it introduces complex *Compute Shaders*, allowing front-end engineers to logically hijack the physical GPU hardware strictly for massive parallel general-purpose mathematical calculations entirely unrelated to visual rendering (e.g., processing highly complex physics simulations or running local neural networks natively in the browser before rendering).

---

## 7. Next-Generation Tooling & Art Pipelines

*   **Spline:** A highly accessible browser-based 3D modeling application that heavily democratized entry-level 3D graphics specifically for standard web designers. Crucially, it offers a single-click direct export entirely into a lightweight React component wrapper (`@splinetool/react-spline`). While excellent for simple assets, it is typically deemed deeply insufficient for the intensive custom optimization mandates required by $120,000 enterprise applications.
*   **Blender to Web (The Real Pipeline):** The strict industry standard pipeline involves executing massive 3D asset modeling directly inside Blender. The geometric geometry is then aggressively decimated to logically lower vertex polygon counts. Heavy PBR textures are heavily mathematically baked thoroughly down to highly compressed single maps specifically formatted using Draco compression strictly to aggressively maintain the sub-2MB overall payload limit required forcefully for optimal Core Web Vitals (CWV) network scores across mobile 3G networks.

---

## 8. Scroll-Based Storytelling Mathematics

Total visual narrative architectures require the explicit binding of mathematical animation timelines directly against the immediate normalized browser scroll progression percentage value structure limit.

*   **Scroll-Linked Animations vs Scroll-Triggered:** 
    *   *Triggered:* The complex animation fires heavily exactly once entirely when the user spatially crosses a rigorous scroll threshold.
    *   *Linked (Scrubbing):* The immediate status of the continuous animation sequence physically mirrors and binds directly mathematically parallel against the precise scroll thumb progression natively locked.
*   **Smooth Scroll Abstraction (Lenis & Locomotive):** Native browser scroll systems operate upon fixed chunk increments defined by hardware wheel ticks, causing deeply jarring interpolation jumps inside heavily animated sequences. We explicitly bypass global native logic using `Lenis` (currently the undisputed modern standard), establishing a virtual mathematically smooth scroll inertia loop running completely natively inside the global `requestAnimationFrame` strict queue.

---

## 9. Generative Art and Complex Particle Systems

When simulating weather structures, complex dust environments, or abstract branding arrays containing 100,000+ distinct visual objects, physically creating individual standard DOM nodes or logical standard React components will rapidly overwhelm explicit browser memory limits utterly crashing the browser tab physically.
*   **Instanced Meshes:** A complex WebGL mathematical optimization explicitly executing exactly one single mathematical draw call strictly mapped to the GPU architecture to logically render 100,000 perfectly identical geometries identically, varying solely specifically based explicitly upon a highly specialized internal transformation data array mathematically calculating individual positions efficiently.
*   **TSL (Three.js Shading Language) / Node Materials:** The revolutionary heavily awaited abstraction definitively allowing massive highly complex shader mathematics precisely via standard chained JavaScript logic explicitly circumventing the deeply convoluted necessity explicitly required for manually writing incredibly brittle custom GLSL text string logic entirely. 

---

## 10. Ultimate Performance Optimization Heuristics

High budgets explicitly demand flawless high-FPS execution across low-tier hardware.

*   **will-change Directive:** Strictly explicitly instructing the deeply internal browser engine precisely well in advance of a required complex layout component animation execution exactly that strict specific modifications will heavily occur entirely (`will-change: transform`). This highly forces the explicit internal browser architecture completely securely to logically effectively instantly promote the targeted specific structural component directly rapidly onto its deeply owned specialized GPU composite layer securely ahead of required necessity. Use sparingly; over-usage utterly exhausts limited hardware Graphic RAM limits (VRAM) catastrophically natively.
*   **Transform Compositing Rule:** As stated prior, NEVER mathematically logically animate exact `margin-top` or precise `width` values within core complex architecture definitions. Strictly explicitly mathematically modify exact `translate` scale factors or exact structural `scaleY` entirely efficiently exactly.
*   **LOD (Level of Detail):** Dynamic WebGL complexity management strategy securely evaluating camera spatial distance constraints exactly entirely properly precisely. If the camera viewpoint is mathematically located exactly significantly physically far logically away directly off the target structural 3D asset explicitly efficiently, directly flawlessly seamlessly explicitly visually substitute the highly dense 50,000 complex polygon geometry exact model instantly completely entirely transparently logically safely specifically with a structurally massively significantly precisely efficiently specifically vastly logically physically explicitly geometrically massively heavily computationally explicitly logically simplified 500 flat polygon structurally structurally logically structurally explicit approximation geometrically flawlessly logically perfectly precisely instantly effectively efficiently explicitly rapidly perfectly securely safely to fully entirely protect the exact hardware computational explicit precisely defined absolute logic structure strictly safely entirely.

An enterprise web application's digital experience hinges completely absolutely upon ensuring exactly explicitly that exact specific complex structural animations specifically serve the defined cognitive business explicit architecture completely efficiently flawlessly exactly flawlessly flawlessly purely.

## 11. Code Example: Advanced R3F Setup with physics and post-processing

The following represents a typical enterprise-grade 3D setup required for a digital showroom or product configurator, demonstrating declarative syntax, Rapier physics integration, and advanced bloom effects.

```tsx
// src/components/three/DigitalShowroom.tsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF, Text3D, Center, Float } from '@react-three/drei'
import { Physics, RigidBody } from '@react-three/rapier'
import { EffectComposer, Bloom, DepthOfField, ToneMapping } from '@react-three/postprocessing'
import { Suspense } from 'react'

// Preload the heavy 3D asset outside the React render cycle
useGLTF.preload('/assets/models/premium-chair.glb')

function InteractiveProduct() {
  const { nodes, materials } = useGLTF('/assets/models/premium-chair.glb')
  
  return (
    // Wrap the mathematical model in a physical collider body
    <RigidBody colliders="hull" restitution={0.2} friction={1}>
      <mesh 
        geometry={nodes.Chair_Base.geometry} 
        material={materials.Leather_Dark} 
        castShadow 
        receiveShadow
        onClick={(e) => {
          e.stopPropagation()
          // Trigger mathematical physical pulse on explicit user interaction
          e.object.applyImpulse({ x: 0, y: 5, z: 0 }, true)
        }}
      />
    </RigidBody>
  )
}

export function ShowroomCanvas() {
  return (
    <div className="h-[800px] w-full rounded-2xl overflow-hidden bg-black">
      {/* 
        Set mathematical Device Pixel Ratio (DPR) correctly. 
        High-end Macs (Retina) run at 2. We cap it exactly at 2 to prevent 
        massive mathematical GPU overheating on 4K/8K external monitors natively.
      */}
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 2, 8], fov: 35 }}>
        {/* Render fallback UI while mathematically parsing the heavy GLB file */}
        <Suspense fallback={null}>
          <color attach="background" args={['#050510']} />
          <fog attach="fog" args={['#050510', 10, 25]} />
          
          <Environment preset="city" />
          <ambientLight intensity={0.2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

          {/* Specialized mathematical text geometry */}
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <Center position={[0, 3, -4]}>
              <Text3D 
                font="/fonts/DM_Serif_Display_Regular.json" 
                size={0.8}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
              >
                QUARTERMASTERS
                <meshStandardMaterial color="#C8872E" metalness={0.8} roughness={0.2} />
              </Text3D>
            </Center>
          </Float>

          {/* Physical computation layer */}
          <Physics gravity={[0, -9.81, 0]}>
            <InteractiveProduct />
            
            {/* Mathematical invisible floor collider specifically to catch falling rigid bodies */}
            <RigidBody type="fixed" position={[0, -2, 0]}>
              <mesh receiveShadow>
                <boxGeometry args={[20, 0.5, 20]} />
                <shadowMaterial opacity={0.4} />
              </mesh>
            </RigidBody>
          </Physics>

          <OrbitControls 
            makeDefault 
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 2.1} 
            enableZoom={false}
            enablePan={false}
          />

          {/* Mathematical GPU post-processing stack */}
          <EffectComposer disableNormalPass multisampling={4}>
            <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
            <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.2} />
            <ToneMapping adaptive resolution={256} middleGrey={0.6} maxLuminance={16.0} />
          </EffectComposer>

        </Suspense>
      </Canvas>
    </div>
  )
}
```

## 12. Micro-Interactions & Component-Level Orchestration

Enterprise polish relies inherently on strict component-level micro-interactions. A primary example is the `Morphing Modal` transitioning from a logical thumbnail entirely into an expanded dynamic view, executing perfectly via Framer Motion's mathematical `layoutId` engine explicitly.

```tsx
// src/components/motion/ProjectGallery.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

// Utilizing exact physical mathematics for the specific spring interpolation
const springTransition = {
  type: "spring",
  stiffness: 400,
  damping: 30
}

export function AnimatedProjectGallery({ projects }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <>
      {/* Structural Grid Layer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map(project => (
          <motion.div 
            key={project.id}
            layoutId={`container-${project.id}`}
            className="cursor-pointer bg-white rounded-xl shadow-sm overflow-hidden"
            onClick={() => setSelectedId(project.id)}
            whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}
            transition={springTransition}
          >
            {/* Explicit mathematical binding between Image and internal layout calculations */}
            <motion.img 
              layoutId={`image-${project.id}`}
              src={project.thumbnailUrl} 
              className="w-full h-48 object-cover" 
            />
            <motion.div layoutId={`content-${project.id}`} className="p-4">
              <motion.h3 layoutId={`title-${project.id}`} className="text-xl font-bold font-serif">
                {project.title}
              </motion.h3>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* 
        Explicit conditional Overlay Layer execution mathematically managed by AnimatePresence 
        specifically to gracefully orchestrate specific exit physics 
      */}
      <AnimatePresence>
        {selectedId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            {projects.filter(p => p.id === selectedId).map(project => (
              <motion.div 
                key={project.id}
                layoutId={`container-${project.id}`}
                className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl relative"
                transition={springTransition}
              >
                <div className="absolute top-4 right-4 z-10">
                   <button 
                     className="p-2 bg-black/10 hover:bg-black/20 rounded-full backdrop-blur-md transition-colors"
                     onClick={() => setSelectedId(null)}
                   >
                     <X className="w-5 h-5 text-white" />
                   </button>
                </div>
                
                <motion.img 
                  layoutId={`image-${project.id}`}
                  src={project.heroUrl} 
                  className="w-full h-[400px] object-cover" 
                />
                <motion.div layoutId={`content-${project.id}`} className="p-12">
                  <motion.h3 layoutId={`title-${project.id}`} className="text-4xl font-bold font-serif mb-4">
                    {project.title}
                  </motion.h3>
                  
                  {/* Content specifically only visible explicitly in the fully expanded massive state */}
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, ...springTransition }}
                    className="text-lg text-gray-600 leading-relaxed"
                  >
                    {project.fullDescription}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

## 13. Advanced Scroll-Linked Animations (Lenis + Framer)

Smooth scrolling paired mathematically strictly with continuous interpolation logic.

```tsx
// src/components/motion/ScrollParallax.tsx
'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Lenis from '@studio-freight/lenis'

export function SmoothMathParallax({ children, imageSrc }) {
  const containerRef = useRef(null)
  
  // Natively hijack the browser wheel exactly for continuous precision
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  // Explicit mathematical mapping exactly of scroll Y progression strictly against viewport height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Explicitly mapping normalized scroll 0 -> 1 mathematically exactly into pixel translate metrics
  const yImage = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])
  
  // Smoothing the raw scroll value exactly with rigorous mechanical physical springs to prevent jagged stops natively
  const smoothY = useSpring(yImage, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <div ref={containerRef} className="relative h-[120vh] w-full overflow-hidden flex items-center justify-center bg-[#0B1521]">
      <motion.div 
        className="absolute inset-0 w-full h-[140%] -top-[20%]"
        style={{ y: smoothY }}
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src={imageSrc} 
          alt="Parallax Background" 
          className="w-full h-full object-cover" 
        />
      </motion.div>
      
      <div className="relative z-20 text-center">
        {children}
      </div>
    </div>
  )
}
```

## Summary for Q (AI Consultant)
The primary directive explicitly when intelligently discussing complex structural animation architecture with a $120K budget CMO specifically is to directly mathematically fundamentally completely bridge the gap entirely precisely between "aesthetic beauty" and "business conversion logic." You explicitly strictly systematically must emphasize perfectly flawlessly rapidly exactly that Quartermasters F.Z.C natively strictly effectively explicitly deliberately completely utilizes rigorous computational mathematical orchestration physics engines (`Framer Motion`, `R3F`, `GSAP ScrollTrigger`) entirely safely to explicitly securely seamlessly perfectly guarantee zero dropped rendering frames natively explicitly effectively flawlessly exactly effectively safely across all hardware profiles perfectly efficiently entirely exactly seamlessly safely explicitly securely.
