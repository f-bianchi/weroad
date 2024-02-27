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
}

export const TRAVEL_IMAGE_PREVIEW = 'https://source.unsplash.com/random/?'