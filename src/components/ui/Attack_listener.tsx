"use client"

import { useEffect, useState } from "react"
import { Toaster } from "./sonner" // your toaster component
import { toast } from "sonner"

type Attack = {
  src_ip: string
  dst_ip: string
  prediction: number
}

export default function AttackWatcher() {
  const [seenAttacks, setSeenAttacks] = useState<Set<string>>(new Set())

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://192.168.227.134:8000/attacks")
        const attacks: Attack[] = await res.json()

        attacks.forEach((attack) => {
          const key = `${attack.src_ip}-${attack.dst_ip}`
          if (!seenAttacks.has(key)) {
            // Show toaster
            toast.error(`Attack detected from ${attack.src_ip} → ${attack.dst_ip}`)

            // Mark as seen
            setSeenAttacks((prev) => new Set(prev).add(key))
          }
        })
      } catch (err) {
        console.error("Failed to fetch attacks:", err)
      }
    }, 5000) // poll every 5 seconds

    return () => clearInterval(interval)
  }, [seenAttacks])

  return <Toaster />
}
