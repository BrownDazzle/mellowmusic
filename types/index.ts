
export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  picture?: {
    data: {
      url: string
    }
  };
  accessToken?: string;
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};


export interface User {
  id: string;
  name?: string;
  image?: string;
  picture?: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  accessToken?: string;
}
// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string
  firstName: string
  lastName: string
  username: string
  email: string
  photo: string
}

export type UpdateUserParams = {
  firstName: string
  lastName: string
  username: string
  photo: string
}

// ====== EVENT PARAMS
export type CreateEventParams = {
  userId: string
  event: {
    title: string
    description: string
    genre: string
    imageUrl: string
    category: string
    isFree: boolean
    url: string
  }
  path: string
}

export type UpdateEventParams = {
  userId: string
  event: {
    _id: string
    title: string
    imageUrl: string
    description: string
    genre: string
    category: string
    views?: string
    type?: string
    isFree: boolean
    url: string
  }
  path: string
}

export interface Category {
  id: string;
  name: string;
  url: string;
};


export type DeleteEventParams = {
  eventId: string
  path: string
}

export type GetAllEventsParams = {
  query: string
  category: string
  genre: string
  limit: number
  page: number
}

export type GetEventsByUserParams = {
  userId: string
  limit?: number
  page: number
}

export type GetRelatedEventsByCategoryParams = {
  category: string
  eventId: string
  limit?: number
  page: number | string
}

export type Event = {
  _id: string;
  title: string;
  description?: string;
  genre: { _id: string, name: string, type: string };
  createdAt: Date;
  imageUrl: string;
  views: string;
  type: string
  isFree: boolean;
  socialUrl?: {
    facebook?: string;
    youtube?: string;
    instagram?: string;
  };
  category: string
}

export type Track = {
  id: string,
  artist: string,
  audioUrl: string,
  imageUrl: string,
  desc: string,
  index: number,
  title: string,
}
// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  categoryName: string
  type: string
}

// ====== GENRE PARAMS
export type CreateGenreParams = {
  genreName: string
  type: string
}


// ====== ORDER PARAMS
export type CheckoutOrderParams = {
  eventTitle: string
  eventId: string
  price: string
  isFree: boolean
  buyerId: string
}

export type CreateOrderParams = {
  stripeId: string
  eventId: string
  buyerId: string
  totalAmount: string
  createdAt: Date
}

export type GetOrdersByEventParams = {
  eventId: string
  searchString: string
}

export type GetOrdersByUserParams = {
  userId: string | null
  limit?: number
  page: string | number | null
}

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}

export type RemoveUrlQueryParams = {
  params: string
  keysToRemove: string[]
}

export type SearchParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export interface ICategory extends Document {
  _id: string;
  type: string;
  name: string;
}

export interface IEvent extends Document {
  _id: string;
  title: string;
  artist: string;
  description?: string;
  genre: { _id: string, name: string, type: string };
  createdAt: Date;
  imageUrl: string;
  audioUrl?: string,
  videoUrl?: string,
  views: number;
  type: string
  isFree: boolean;
  socialUrl?: {
    facebook?: string;
    youtube?: string;
    instagram?: string;
  };
  category: { _id: string, name: string, type: string }
}

export interface IGenre extends Document {
  _id: string;
  type: string;
  name: string;
}

