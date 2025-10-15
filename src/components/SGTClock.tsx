'use client'
import React, { useEffect, useState } from 'react'
import { format, toZonedTime } from 'date-fns-tz'

export default function SGTClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    function updateTime() {
      const now = new Date()
      const sgtDate = toZonedTime(now, 'Asia/Singapore')
      setTime(format(sgtDate, 'HH:mm:ss', { timeZone: 'Asia/Singapore' }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <p className="text-base md:text-xl lg:text-2xl 2xl:text-4xl ml-4 md:ml-6 lg:ml-12 xl:ml-16 2xl:ml-24">
      SGT {time}
    </p>
  )
}
