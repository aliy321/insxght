'use client'

import useScreenSize from '@/hooks/useScreenSize'
import MediaBetweenText from './media-between-text'

// Utility function to split text from the middle
function splitTextFromMiddle(text: string): { left: string; right: string } {
  const midPoint = Math.floor(text.length / 2)
  return {
    left: text.slice(0, midPoint),
    right: text.slice(midPoint),
  }
}

interface ProjectItem {
  title: string
  image: string
  link: string
}

interface MediaBetweenTextVerticalProps {
  list: ProjectItem[]
}

export default function MediaBetweenTextVertical({ list }: MediaBetweenTextVerticalProps) {
  const screenSize = useScreenSize()

  const animationVariants = {
    initial: {
      width: '0px',
      height: screenSize.lessThan('md') ? '60px' : '150px',
      transition: {
        duration: 0.6,
        ease: [0.944, 0.008, 0.147, 1.002] as [number, number, number, number],
      },
    },
    animate: {
      width: screenSize.lessThan('md') ? '6px' : '150px',
      height: screenSize.lessThan('md') ? '60px' : '150px',
      transition: {
        duration: 0.6,
        ease: [0.944, 0.008, 0.147, 1.002] as [number, number, number, number],
      },
    },
  }

  const mediaContainerClassName =
    'w-full h-[60px] md:h-[100px] overflow-hidden pt-1 shadow-lg rounded-lg'
  const baseClassName =
    'hover:cursor-pointer text-3xl sm:text-7xl flex flex-row font-light items-center justify-center md:mb-4'
  const leftTextClassName = 'font-pixel uppercase text-4xl md:text-7xl lg:text-8xl 2xl:text-9xl'
  const rightTextClassName = 'font-pixel uppercase text-4xl md:text-7xl lg:text-8xl 2xl:text-9xl'

  return (
    <div className="">
      <div className="grid place-items-center">
        {list.map((item, index) => {
          const { left, right } = splitTextFromMiddle(item.title)
          return (
            <MediaBetweenText
              key={index}
              firstText={left}
              secondText={right}
              mediaUrl={item.image}
              mediaType="image"
              link={item.link}
              triggerType="hover"
              mediaContainerClassName={mediaContainerClassName}
              className={baseClassName}
              animationVariants={animationVariants}
              leftTextClassName={leftTextClassName}
              rightTextClassName={rightTextClassName}
            />
          )
        })}
      </div>
    </div>
  )
}
