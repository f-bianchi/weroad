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
