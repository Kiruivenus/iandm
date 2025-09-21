"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [authError, setAuthError] = useState("")
  const [showPinInput, setShowPinInput] = useState(false)
  const [pin, setPin] = useState("")
  const [pinError, setPinError] = useState("")
  const router = useRouter()

  const handleLogin = async () => {
    setIsAuthenticating(true)
    setAuthError("")

    try {
      if (!window.PublicKeyCredential) {
        throw new Error("WebAuthn is not supported on this device")
      }

      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: new Uint8Array(32),
          rp: {
            name: "I&M Bank",
            id: window.location.hostname,
          },
          user: {
            id: new TextEncoder().encode("patrick@imbank.com"),
            name: "patrick@imbank.com",
            displayName: "Patrick Kiprotich Kirui",
          },
          pubKeyCredParams: [{ alg: -7, type: "public-key" }],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required",
          },
          timeout: 60000,
          attestation: "direct",
        },
      })

      if (credential) {
        setTimeout(() => {
          setIsAuthenticating(false)
          router.push("/dashboard")
        }, 1000)
      }
    } catch (error: any) {
      console.log("[v0] Biometric auth error:", error)
      setIsAuthenticating(false)

      if (error.name === "NotAllowedError" || error.message.includes("not supported")) {
        setAuthError("Biometric authentication failed. Please enter your PIN.")
        setShowPinInput(true)
      } else {
        setAuthError("Authentication failed. Please try again.")
      }
    }
  }

  const handlePinSubmit = () => {
    setPinError("")

    if (pin === "1247") {
      setIsAuthenticating(true)
      setTimeout(() => {
        setIsAuthenticating(false)
        router.push("/dashboard")
      }, 1000)
    } else {
      setPinError("Incorrect PIN. Please try again.")
      setPin("")
    }
  }

  const handlePinKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handlePinSubmit()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-400/20 to-transparent rounded-full -translate-y-32 translate-x-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-400/10 to-transparent rounded-full translate-y-48 -translate-x-48" />

      <div className="flex flex-col items-center space-y-8 z-10">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <img src="banklogo.png"></img>
          
           
          </div>
         
        </div>

        <div className="text-center">
          <h2 className="text-white text-xl font-medium tracking-wide">OTG Personal KE</h2>
        </div>

        <div className="text-center mt-1">
          <h1 className="text-white text-2xl font-light">Hi Patrick</h1>
        </div>

        <div className="mt-2 w-full max-w-sm">
          {!showPinInput ? (
            <Button
              onClick={handleLogin}
              disabled={isAuthenticating}
              className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-full py-4 text-lg font-medium backdrop-blur-sm transition-all duration-200 disabled:opacity-50"
            >
              {isAuthenticating ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Authenticating...</span>
                </div>
              ) : (
                "Login"
              )}
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-white text-lg font-medium mb-4">Enter PIN</h3>
              </div>
              <Input
                type="password"
                placeholder="Enter 4-digit PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                onKeyPress={handlePinKeyPress}
                maxLength={4}
                className="w-full bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-full py-4 text-center text-lg tracking-widest backdrop-blur-sm"
              />
              <Button
                onClick={handlePinSubmit}
                disabled={isAuthenticating || pin.length !== 4}
                className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-full py-4 text-lg font-medium backdrop-blur-sm transition-all duration-200 disabled:opacity-50"
              >
                {isAuthenticating ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  "Submit"
                )}
              </Button>
              <Button
                onClick={() => {
                  setShowPinInput(false)
                  setPin("")
                  setPinError("")
                  setAuthError("")
                }}
                variant="ghost"
                className="w-full text-white/80 hover:text-white hover:bg-white/10 rounded-full py-2"
              >
                Try Fingerprint Again
              </Button>
            </div>
          )}
        </div>

        {(authError || pinError) && (
          <div className="mt-4 text-center max-w-sm">
            <p className="text-yellow-200 text-sm">{pinError || authError}</p>
          </div>
        )}

        <div className="mt-24 text-center max-w-sm">
          <p className="text-white/80 text-sm leading-relaxed">
            At I&M Bank, we are On Your Side and we value your data privacy. Read our{" "}
            <span className="underline">Privacy Notice</span>.
          </p>
        </div>
      </div>
    </div>
  )
}
