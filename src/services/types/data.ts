export type TErrorState = {
  message?: string
};

export type TMovieItem = {
  country: string,
  director: string,
  duration: number,
  year: string,
  description: string,
  image: { url: string },
  trailerLink: string,
  thumbnail: string,
  owner: string, //?
  movieId: number,
  nameRU: string,
  nameEN: string,
}
