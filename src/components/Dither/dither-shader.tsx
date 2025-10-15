'use client'

import type React from 'react'

import { useRef, useState, useEffect, useCallback } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Upload } from 'lucide-react'

type DitherType = 'floyd-steinberg' | 'atkinson' | 'ordered' | 'random'

export default function Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const originalCanvasRef = useRef<HTMLCanvasElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [ditherType, setDitherType] = useState<DitherType>('floyd-steinberg')
  const [threshold, setThreshold] = useState([128])
  const [imageLoaded, setImageLoaded] = useState(false)
  const [currentImage, setCurrentImage] = useState<HTMLImageElement | null>(null)

  const loadImage = useCallback((src: string) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      setCurrentImage(img)
      setImageLoaded(true)
    }
    img.src = src
  }, [])

  useEffect(() => {
    // Load default image
    loadImage('/placeholder.svg?height=400&width=400')
  }, [loadImage])

  useEffect(() => {
    if (!currentImage || !imageLoaded) return

    const canvas = canvasRef.current
    const originalCanvas = originalCanvasRef.current
    const ctx = canvas?.getContext('2d')
    const originalCtx = originalCanvas?.getContext('2d')

    if (!canvas || !ctx || !originalCanvas || !originalCtx) return

    // Set canvas dimensions
    canvas.width = currentImage.width
    canvas.height = currentImage.height
    originalCanvas.width = currentImage.width
    originalCanvas.height = currentImage.height

    // Draw original image
    originalCtx.drawImage(currentImage, 0, 0)

    // Apply dithering effect
    if (isHovered) {
      ctx.drawImage(currentImage, 0, 0)
    } else {
      const thresholdValue = threshold[0] ?? 128
      applyDithering(ctx, currentImage, ditherType, thresholdValue)
    }
  }, [currentImage, imageLoaded, isHovered, ditherType, threshold])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file')
        return
      }

      // Create object URL and load image
      const url = URL.createObjectURL(file)
      loadImage(url)

      // Clean up the object URL after loading
      setTimeout(() => {
        URL.revokeObjectURL(url)
      }, 1000)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Interactive Dither Shader</CardTitle>
          <CardDescription>
            Upload an image and apply various dithering effects. Hover to see the original image.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controls */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <Upload className="w-4 h-4" />
                Upload Image
              </Button>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                key={imageLoaded ? 'loaded' : 'not-loaded'} // Force re-render to clear input
              />
            </div>

            <Select value={ditherType} onValueChange={(value: DitherType) => setDitherType(value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select dither type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="floyd-steinberg">Floyd-Steinberg</SelectItem>
                <SelectItem value="atkinson">Atkinson</SelectItem>
                <SelectItem value="ordered">Ordered (Bayer)</SelectItem>
                <SelectItem value="random">Random</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 min-w-48">
              <span className="text-sm">Threshold:</span>
              <Slider
                value={threshold}
                onValueChange={setThreshold}
                max={255}
                min={0}
                step={1}
                className="flex-1"
              />
              <span className="text-sm w-8">{threshold[0]}</span>
            </div>
          </div>

          {/* Canvas Container */}
          <div className="relative inline-block">
            <canvas
              ref={canvasRef}
              className="border border-gray-300 shadow-lg rounded-lg max-w-full h-auto transition-opacity duration-300 cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
            <canvas ref={originalCanvasRef} className="hidden" />

            {/* Hover indicator */}
            <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {isHovered
                ? 'Original'
                : `${ditherType.charAt(0).toUpperCase() + ditherType.slice(1)} Dither`}
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Hover over the image to see the original. Try different dithering algorithms and adjust
            the threshold.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function applyDithering(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  type: DitherType,
  threshold: number,
) {
  ctx.drawImage(image, 0, 0)
  const imageData = ctx.getImageData(0, 0, image.width, image.height)
  const data = imageData.data

  switch (type) {
    case 'floyd-steinberg':
      applyFloydSteinberg(data, image.width, image.height, threshold)
      break
    case 'atkinson':
      applyAtkinson(data, image.width, image.height, threshold)
      break
    case 'ordered':
      applyOrderedDither(data, image.width, image.height, threshold)
      break
    case 'random':
      applyRandomDither(data, image.width, image.height, threshold)
      break
  }

  ctx.putImageData(imageData, 0, 0)
}

function applyFloydSteinberg(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  threshold: number,
) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      if (i + 2 >= data.length) continue

      const gray = (data[i]! + data[i + 1]! + data[i + 2]!) / 3
      const newGray = gray > threshold ? 255 : 0
      const error = gray - newGray

      data[i] = data[i + 1] = data[i + 2] = newGray

      // Distribute error
      distributeError(data, width, height, x, y, error, [
        [1, 0, 7 / 16],
        [-1, 1, 3 / 16],
        [0, 1, 5 / 16],
        [1, 1, 1 / 16],
      ])
    }
  }
}

function applyAtkinson(data: Uint8ClampedArray, width: number, height: number, threshold: number) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      if (i + 2 >= data.length) continue

      const gray = (data[i]! + data[i + 1]! + data[i + 2]!) / 3
      const newGray = gray > threshold ? 255 : 0
      const error = gray - newGray

      data[i] = data[i + 1] = data[i + 2] = newGray

      // Atkinson dithering pattern
      distributeError(data, width, height, x, y, error, [
        [1, 0, 1 / 8],
        [2, 0, 1 / 8],
        [-1, 1, 1 / 8],
        [0, 1, 1 / 8],
        [1, 1, 1 / 8],
        [0, 2, 1 / 8],
      ])
    }
  }
}

function applyOrderedDither(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  threshold: number,
) {
  // 4x4 Bayer matrix
  const bayerMatrix = [
    [0, 8, 2, 10],
    [12, 4, 14, 6],
    [3, 11, 1, 9],
    [15, 7, 13, 5],
  ]

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      if (i + 2 >= data.length) continue

      const gray = (data[i]! + data[i + 1]! + data[i + 2]!) / 3
      const bayerValue = bayerMatrix[y % 4]?.[x % 4] ?? 0
      const adjustedThreshold = threshold + (bayerValue - 7.5) * 16
      const newGray = gray > adjustedThreshold ? 255 : 0

      data[i] = data[i + 1] = data[i + 2] = newGray
    }
  }
}

function applyRandomDither(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  threshold: number,
) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      if (i + 2 >= data.length) continue

      const gray = (data[i]! + data[i + 1]! + data[i + 2]!) / 3
      const randomOffset = (Math.random() - 0.5) * 64
      const adjustedThreshold = threshold + randomOffset
      const newGray = gray > adjustedThreshold ? 255 : 0

      data[i] = data[i + 1] = data[i + 2] = newGray
    }
  }
}

function distributeError(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  x: number,
  y: number,
  error: number,
  distribution: [number, number, number][],
) {
  for (const [dx, dy, factor] of distribution) {
    const nx = x + dx
    const ny = y + dy
    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
      const i = (ny * width + nx) * 4
      if (i + 2 >= data.length) continue

      const adjustment = error * factor
      data[i] = Math.max(0, Math.min(255, data[i]! + adjustment))
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1]! + adjustment))
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2]! + adjustment))
    }
  }
}
