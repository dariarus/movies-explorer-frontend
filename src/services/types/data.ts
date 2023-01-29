export type TErrorState = {
  message?: string,
  type?: ErrorType
};

export type TMovieItem = {
  id: number,
  country: string,
  director: string,
  duration: number,
  year: string,
  description: string,
  image: { url: string },
  trailerLink: string,
  thumbnail: string,
  movieId: number,
  nameRU: string,
  nameEN: string,
}

export type TSavedMovieItem = TMovieItem & { owner: string }

export type TInputValues = {
  email: string,
  password: string,
  name?: string
}

export type TUser = {
  _id: string,
  name: string,
  email: string
}

export enum ErrorType {
  SIGNIN = 'signin',
  UPDATE = 'update',
  GENERAL = 'general'
}