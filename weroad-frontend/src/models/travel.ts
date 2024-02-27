export interface Travel {
  id?: string;
  name: string;
  isPublic: boolean;
  slug: string;
  description: string;
  numberOfDays: number;
  numberOfNights: number;
  tours: Tour[];
}

export interface Tour {
  id?: string;
  name: string;
  startingDate: string;
  endingDate: string;
  price: number;
}