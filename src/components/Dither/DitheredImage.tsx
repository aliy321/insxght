'use client'

 
import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_texture;
uniform float u_brightness;
uniform float u_contrast;
uniform float u_saturation;
uniform vec2 u_mouse;
uniform float u_mouseRadius;
uniform bool u_enableMouse;
uniform float u_colorNum;
uniform float u_pixelSize;
uniform float u_scale;
uniform vec2 u_offset;
uniform bool u_colorDither;

varying vec2 vUv;

// Bayer matrix for dithering
const mat4 bayerMatrix = mat4(
  0.0/16.0, 8.0/16.0, 2.0/16.0, 10.0/16.0,
  12.0/16.0, 4.0/16.0, 14.0/16.0, 6.0/16.0,
  3.0/16.0, 11.0/16.0, 1.0/16.0, 9.0/16.0,
  15.0/16.0, 7.0/16.0, 13.0/16.0, 5.0/16.0
);

float getBayerValue(vec2 coord) {
  int x = int(mod(coord.x, 4.0));
  int y = int(mod(coord.y, 4.0));

  if (x == 0 && y == 0) return bayerMatrix[0][0];
  if (x == 1 && y == 0) return bayerMatrix[0][1];
  if (x == 2 && y == 0) return bayerMatrix[0][2];
  if (x == 3 && y == 0) return bayerMatrix[0][3];
  if (x == 0 && y == 1) return bayerMatrix[1][0];
  if (x == 1 && y == 1) return bayerMatrix[1][1];
  if (x == 2 && y == 1) return bayerMatrix[1][2];
  if (x == 3 && y == 1) return bayerMatrix[1][3];
  if (x == 0 && y == 2) return bayerMatrix[2][0];
  if (x == 1 && y == 2) return bayerMatrix[2][1];
  if (x == 2 && y == 2) return bayerMatrix[2][2];
  if (x == 3 && y == 2) return bayerMatrix[2][3];
  if (x == 0 && y == 3) return bayerMatrix[3][0];
  if (x == 1 && y == 3) return bayerMatrix[3][1];
  if (x == 2 && y == 3) return bayerMatrix[3][2];
  return bayerMatrix[3][3];
}

vec3 dither(vec3 color, vec2 coord) {
  // Get Bayer matrix value
  vec2 bayerCoord = floor(coord * u_resolution / u_pixelSize);
  float threshold = getBayerValue(bayerCoord) - 0.5;
  float levels = u_colorNum - 1.0;
  float gray = dot(color, vec3(0.299, 0.587, 0.114));
  gray += threshold / levels;
  gray = floor(gray * levels + 0.5) / levels;
  // Map grayscale to #0041FF
  vec3 ditherColor = mix(vec3(0.0), vec3(0.0, 0.254, 1.0), gray); // #0041FF
  return ditherColor;
}

vec3 adjustColor(vec3 color) {
  // Brightness
  color += u_brightness;

  // Contrast
  color = (color - 0.5) * u_contrast + 0.5;

  // Saturation
  float gray = dot(color, vec3(0.299, 0.587, 0.114));
  color = mix(vec3(gray), color, u_saturation);

  return clamp(color, 0.0, 1.0);
}

void main() {
  vec2 uv = vUv;

  // Apply scaling and offset
  uv = (uv - 0.5) / u_scale + 0.5 + u_offset;

  // Sample texture
  vec3 color = texture2D(u_texture, uv).rgb;

  // Apply color adjustments
  color = adjustColor(color);

  // Mouse interaction
  if (u_enableMouse) {
    // Use vUv directly since mouse coordinates are already in UV space
    float dist = length(vUv - u_mouse);
    float effect = 1.0 - smoothstep(0.0, u_mouseRadius, dist);

    // Create a subtle ripple effect that doesn't accumulate
    float ripple = sin(dist * 20.0 - u_time * 6.0) * 0.1 * effect * effect;

    // Add a gentle brightness variation instead of additive brightness
    float brightness = effect * 0.15 * (0.5 + 0.5 * sin(u_time * 2.0));

    // Apply effects more subtly
    color = mix(color, color + ripple, effect);
    color = mix(color, color * (1.0 + brightness), effect * 0.5);
  }

  // Apply dithering
  color = dither(color, vUv);

  gl_FragColor = vec4(color, 1.0);
}
`

interface DitheredImageProps {
  imageUrl: string
}

function DitheredImageMesh({ imageUrl }: DitheredImageProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const [mousePos, setMousePos] = useState<[number, number]>([0.5, 0.5])
  const { viewport, size, gl } = useThree()

  // Fixed settings (using the previous defaults)
  const settings = {
    brightness: 0.1,
    contrast: 1,
    saturation: 1,
    colorNum: 4,
    pixelSize: 4,
    enableMouseInteraction: true,
    mouseRadius: 0.15,
    scale: 1,
    offset: [0, 0] as [number, number],
    colorDither: true,
  }

  // Load texture
  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.setCrossOrigin('anonymous')

    loader.load(
      imageUrl,
      (loadedTexture) => {
        loadedTexture.wrapS = THREE.ClampToEdgeWrapping
        loadedTexture.wrapT = THREE.ClampToEdgeWrapping
        loadedTexture.minFilter = THREE.LinearFilter
        loadedTexture.magFilter = THREE.LinearFilter
        setTexture(loadedTexture)
      },
      undefined,
      (error) => {
        console.error('Error loading texture:', error)
        // Create a fallback texture
        const canvas = document.createElement('canvas')
        canvas.width = 512
        canvas.height = 512
        const ctx = canvas.getContext('2d')!

        // Create a gradient fallback
        const gradient = ctx.createLinearGradient(0, 0, 512, 512)
        gradient.addColorStop(0, '#ff6b6b')
        gradient.addColorStop(0.5, '#4ecdc4')
        gradient.addColorStop(1, '#45b7d1')

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, 512, 512)

        const fallbackTexture = new THREE.CanvasTexture(canvas)
        setTexture(fallbackTexture)
      },
    )
  }, [imageUrl])

  // Shader uniforms
  const uniforms = useRef({
    u_resolution: { value: new THREE.Vector2(size.width, size.height) },
    u_time: { value: 0 },
    u_texture: { value: texture },
    u_brightness: { value: settings.brightness },
    u_contrast: { value: settings.contrast },
    u_saturation: { value: settings.saturation },
    u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    u_mouseRadius: { value: settings.mouseRadius },
    u_enableMouse: { value: settings.enableMouseInteraction },
    u_colorNum: { value: settings.colorNum },
    u_pixelSize: { value: settings.pixelSize },
    u_scale: { value: settings.scale },
    u_offset: { value: new THREE.Vector2(...settings.offset) },
    u_colorDither: { value: settings.colorDither },
  })

  // Update uniforms
  useFrame(({ clock }) => {
    if (materialRef.current) {
      uniforms.current.u_time.value = clock.getElapsedTime()
      uniforms.current.u_resolution.value.set(size.width, size.height)
      uniforms.current.u_texture.value = texture
      uniforms.current.u_mouse.value.set(...mousePos)
    }
  })

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!settings.enableMouseInteraction) return

    // WebGL renderer's real canvas
    const rect = gl.domElement.getBoundingClientRect()

    // Screen → UV (0-1) conversion with Y-flip for correct tracking
    const x = (e.clientX - rect.left) / rect.width
    const y = 1.0 - (e.clientY - rect.top) / rect.height // Flip Y coordinate

    setMousePos([x, y])
  }

  if (!texture) {
    return null
  }

  return (
    <mesh
      ref={meshRef}
      scale={[viewport.width, viewport.height, 1]}
      onPointerMove={handlePointerMove}
    >
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
      />
    </mesh>
  )
}

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-900 text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>Loading...</p>
      </div>
    </div>
  )
}

export default function Component({
  imageUrl = '/placeholder.svg?height=800&width=1200',
}: {
  imageUrl?: string
}) {
  return (
    <div className="h-svh w-screen">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
        className="h-svh w-screen"
      >
        <Suspense fallback={<LoadingScreen />}>
          <DitheredImageMesh imageUrl={imageUrl} />
        </Suspense>
      </Canvas>
    </div>
  )
}
