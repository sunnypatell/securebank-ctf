"use client"

import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const vantaRef = useRef<HTMLDivElement>(null)
  const [vantaLoaded, setVantaLoaded] = useState(false)

  useEffect(() => {
    // Load Vanta.js and Three.js from CDN
    const loadVantaJS = async () => {
      // Check if scripts are already loaded
      if (document.getElementById("three-js-script") && document.getElementById("vanta-globe-script")) {
        setVantaLoaded(true)
        return
      }

      // Load Three.js first
      const threeScript = document.createElement("script")
      threeScript.id = "three-js-script"
      threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.155.0/three.min.js"
      threeScript.async = true
      document.body.appendChild(threeScript)

      // Load Vanta Globe after Three.js
      threeScript.onload = () => {
        const vantaScript = document.createElement("script")
        vantaScript.id = "vanta-globe-script"
        vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js"
        vantaScript.async = true
        vantaScript.onload = () => setVantaLoaded(true)
        document.body.appendChild(vantaScript)
      }
    }

    loadVantaJS()
  }, [])

  useEffect(() => {
    if (!vantaLoaded || !vantaRef.current) return

    // Initialize Vanta effect
    if (!vantaEffect) {
      // @ts-ignore - Vanta is loaded via CDN
      const effect = window.VANTA.GLOBE({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 0.9, // Zoomed out more
        scaleMobile: 0.9,
        color: 0x3b82f6, // Blue-500
        color2: 0x1e40af, // Blue-800
        size: 1.2, // Slightly smaller size
        backgroundColor: 0x111827, // Gray-900 (will be overlaid with gradient)
        opacity: 0.6, // Lower opacity for better text contrast
      })

      setVantaEffect(effect)
    }

    // Cleanup
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect, vantaLoaded])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 z-0"></div>

      {/* Vanta.js container */}
      <div ref={vantaRef} className="absolute inset-0 z-10 opacity-70"></div>

      {/* Content */}
      <div className="w-full max-w-md mx-auto text-center relative z-20 px-4">
        {/* Logo/Brand */}
        <div className="mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-lg mb-6">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            SecureBank
          </h1>
          <p className="text-xl text-gray-300 mb-2 text-shadow">Your Trusted Financial Partner</p>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-8"></div>
        </div>

        {/* Card Container */}
        <div className="bg-gray-800/70 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-700 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Welcome to Secure Banking</h2>
          <p className="text-gray-300 mb-8">
            Experience secure, reliable banking services designed to protect your financial future.
          </p>

          <div className="space-y-4">
            <a href="/login" className="block">
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-xl transition duration-300 shadow-lg shadow-blue-900/30 flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Login to Your Account
              </button>
            </a>

            <a href="/register" className="block">
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-xl transition duration-300 border border-gray-600 hover:border-gray-500 shadow-lg shadow-gray-900/20 flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                Create New Account
              </button>
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4">
            <div className="w-10 h-10 mx-auto bg-blue-900/50 backdrop-blur-sm rounded-full flex items-center justify-center mb-2">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-300">Secure</h3>
          </div>
          <div className="p-4">
            <div className="w-10 h-10 mx-auto bg-blue-900/50 backdrop-blur-sm rounded-full flex items-center justify-center mb-2">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-300">Fast</h3>
          </div>
          <div className="p-4">
            <div className="w-10 h-10 mx-auto bg-blue-900/50 backdrop-blur-sm rounded-full flex items-center justify-center mb-2">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-300">Reliable</h3>
          </div>
        </div>
      </div>
    </main>
  )
}

