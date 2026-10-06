// Reads ?focus=software|mobile|ai once, when the page loads.
import { focusProfiles } from './site.js'

// Links sent before the rename still work.
const ALIASES = { fullstack: 'software' }

const raw = typeof location === 'undefined' ? null : new URLSearchParams(location.search).get('focus')
const requested = ALIASES[raw] || raw

export const focusKey = Object.hasOwn(focusProfiles, requested) && requested !== 'default' ? requested : 'default'
export const focusQuery = focusKey === 'default' ? '' : `?focus=${focusKey}`
export const profile = focusProfiles[focusKey]
