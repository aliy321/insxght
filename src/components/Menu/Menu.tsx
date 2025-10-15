'use client'
import './Menu.css'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'

import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'
import { useGSAP } from '@gsap/react'
import { useTransitionRouter } from 'next-view-transitions'
import { Logo } from '@/components/Logo/Logo'
import type { Header as HeaderType } from '@/payload-types'
import { slideInOut } from '@/utilities/animation'

gsap.registerPlugin(CustomEase)
CustomEase.create('hop', '.15, 1, .25, 1')

const Menu = ({ data }: { data: HeaderType }) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentPath, setCurrentPath] = useState('/')
  const router = useTransitionRouter()

  const menuRef = useRef<HTMLDivElement | null>(null)
  const navRef = useRef<HTMLDivElement | null>(null)
  const menuOverlayRef = useRef<HTMLDivElement | null>(null)

  const navLogoRef = useRef<HTMLAnchorElement | null>(null)
  const menuBtnRef = useRef<HTMLParagraphElement | null>(null)
  const cartBtnRef = useRef<HTMLParagraphElement | null>(null)

  const overlayLogoRef = useRef<HTMLAnchorElement | null>(null)
  const closeBtnRef = useRef<HTMLParagraphElement | null>(null)

  const menuItemsRef = useRef<HTMLDivElement | null>(null)
  const menuFooterColsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname)
    }
  }, [])

  useEffect(() => {
    const handleRouteChange = () => {
      if (typeof window !== 'undefined') {
        setCurrentPath(window.location.pathname)
      }
    }

    window.addEventListener('popstate', handleRouteChange)

    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [router])

  useGSAP(
    () => {
      gsap.set(menuOverlayRef.current, {
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        pointerEvents: 'none',
      })

      gsap.set([overlayLogoRef.current, closeBtnRef.current], {
        y: '100%',
      })

      gsap.set('.menu-overlay-items .revealer a', {
        y: '100%',
      })

      // gsap.set('.menu-footer .revealer p, .menu-footer .revealer a', {
      //   y: '100%',
      // })
    },
    { scope: menuRef },
  )

  const getExactPath = () => {
    if (typeof window !== 'undefined') {
      return window.location.pathname
    }
    return currentPath
  }

  const isExactPath = (path: string) => {
    const exactCurrentPath = getExactPath()
    return exactCurrentPath === path
  }

  const navigateTo = (path: string) => {
    if (isAnimating) return

    if (isExactPath(path)) {
      closeMenu()
      return
    }

    closeMenu()

    setTimeout(() => {
      router.push(path, {
        onTransitionReady: slideInOut,
      })
    }, 750)
  }

  const openMenu = () => {
    if (isAnimating) return

    setIsAnimating(true)
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    })

    tl.to([navLogoRef.current, menuBtnRef.current, cartBtnRef.current], {
      y: '-100%',
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out',
      onComplete: () => {
        if (navRef.current) {
          navRef.current.style.pointerEvents = 'none'
        }

        gsap.set([navLogoRef.current, menuBtnRef.current, cartBtnRef.current], {
          y: '100%',
        })
      },
    })

    tl.to(
      menuOverlayRef.current,
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1,
        ease: 'hop',
        onStart: () => {
          if (menuOverlayRef.current) {
            menuOverlayRef.current.style.pointerEvents = 'all'
          }
        },
      },
      '-=0.55',
    )

    tl.to(
      [overlayLogoRef.current, closeBtnRef.current],
      {
        y: '0%',
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      },
      '-=0.5',
    )

    tl.to(
      '.menu-overlay-items .revealer a',
      {
        y: '0%',
        duration: 1,
        stagger: 0.075,
        ease: 'power3.out',
      },
      '<',
    )

    // tl.to(
    //   '.menu-footer .revealer p, .menu-footer .revealer a',
    //   {
    //     y: '0%',
    //     duration: 1,
    //     stagger: 0.1,
    //     ease: 'power3.out',
    //   },
    //   '<',
    // )
  }

  const closeMenu = () => {
    if (isAnimating) return

    setIsAnimating(true)
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    })

    tl.to([overlayLogoRef.current, closeBtnRef.current], {
      y: '-100%',
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out',
    })

    tl.to(
      '.menu-overlay-items .revealer a',
      {
        y: '-100%',
        duration: 0.5,
        stagger: 0.05,
        ease: 'power3.in',
      },
      '<',
    )

    // tl.to(
    //   '.menu-footer .revealer p, .menu-footer .revealer a',
    //   {
    //     y: '-100%',
    //     duration: 0.5,
    //     stagger: 0.05,
    //     ease: 'power3.in',
    //   },
    //   '<',
    // )

    tl.to(
      menuOverlayRef.current,
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 1,
        ease: 'hop',
        onComplete: () => {
          if (menuOverlayRef.current) {
            menuOverlayRef.current.style.pointerEvents = 'none'
          }

          gsap.set(menuOverlayRef.current, {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          })

          gsap.set([overlayLogoRef.current, closeBtnRef.current], {
            y: '100%',
          })

          gsap.set('.menu-overlay-items .revealer a', {
            y: '100%',
          })

          // gsap.set('.menu-footer .revealer p, .menu-footer .revealer a', {
          //   y: '100%',
          // })
        },
      },
      '+=0.25',
    )

    tl.to(
      [navLogoRef.current, menuBtnRef.current, cartBtnRef.current],
      {
        y: '0%',
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        onStart: () => {
          if (navRef.current) {
            navRef.current.style.pointerEvents = 'all'
          }
        },
      },
      '-=0.35',
    )
  }

  return (
    <div className="menu" ref={menuRef}>
      <div className="nav" ref={navRef}>
        <div className="nav-logo">
          <div className="revealer">
            <Link
              href="/"
              ref={navLogoRef}
              onClick={(e) => {
                e.preventDefault()
                if (isExactPath('/')) return

                router.push('/', {
                  onTransitionReady: slideInOut,
                })
              }}
            >
              <Logo className="size-6 dark:fill-white mix-blend-difference" />
            </Link>
          </div>
        </div>
        <div className="nav-items">
          <div className="nav-menu-toggle-open">
            <div className="revealer" onClick={openMenu}>
              <p ref={menuBtnRef} className="text-primary">
                Menu
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="menu-overlay" ref={menuOverlayRef}>
        <div className="menu-overlay-nav">
          <div className="menu-overlay-nav-logo">
            <div className="revealer">
              <Link
                href="/"
                ref={overlayLogoRef}
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo('/')
                }}
              >
                <Logo className="size-6 dark:fill-white mix-blend-difference" />
              </Link>
            </div>
          </div>
          <div className="menu-overlay-nav-toggle-close">
            <div className="revealer" onClick={closeMenu}>
              <p ref={closeBtnRef}>Close</p>
            </div>
          </div>
        </div>
        <div className="menu-overlay-items" ref={menuItemsRef}>
          {data.navItems?.map((item, index: number) => (
            <div className="revealer" key={index}>
              <Link
                href={item.link.url!}
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo(item.link.url!)
                }}
              >
                {item.link.label}
              </Link>
            </div>
          ))}
        </div>

        <div className="menu-footer" ref={menuFooterColsRef}>
          {/* <div className="menu-footer-col">
            <div className="revealer">
              <p>&copy;2025 All rights reserved</p>
            </div>
          </div>
          <div className="menu-footer-col">
            <div className="socials">
              <div className="revealer">
                <a href="https://www.youtube.com/@codegrid">YouTube</a>
              </div>
              <div className="revealer">
                <a href="https://www.instagram.com/codegridweb/">Instagram</a>
              </div>
              <div className="revealer">
                <a href="https://x.com/codegridweb">X</a>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Menu
