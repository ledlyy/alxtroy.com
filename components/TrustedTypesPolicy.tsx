"use client"

import { useEffect } from 'react'

type TrustedTypesFactory = {
  createPolicy: (
    name: string,
    policy: {
      createHTML: (value: string) => string
      createScript: (value: string) => string
      createScriptURL: (value: string) => string
    }
  ) => void
}

export function TrustedTypesPolicy() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const trustedTypesFactory = (window as typeof window & { trustedTypes?: TrustedTypesFactory }).trustedTypes
    if (!trustedTypesFactory) return
    const policyName = 'app-default'
    try {
      trustedTypesFactory.createPolicy(policyName, {
        createHTML: (input) => input,
        createScript: (input) => input,
        createScriptURL: (input) => input,
      })
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Trusted Types policy already exists', error)
      }
    }
  }, [])

  return null
}
