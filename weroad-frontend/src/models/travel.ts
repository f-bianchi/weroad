import type { Tour } from './tour'

export interface Travel {
  id?: string
  name: string
  isPublic: boolean
  slug: string
  description: string
  numberOfDays: number
  numberOfNights: number
  tours: Tour[]
  moods: Moods
}

export const MOODS_PROPS = ['nature', 'relax', 'history', 'culture', 'party']

export type Moods = {
  [key in (typeof MOODS_PROPS)[number]]: number
}

export const TRAVEL_IMAGE_PREVIEW = 'https://source.unsplash.com/random/?'

export const INITIAL_MOODS: Moods = {
  nature: 50,
  relax: 50,
  history: 50,
  culture: 50,
  party: 50
}
