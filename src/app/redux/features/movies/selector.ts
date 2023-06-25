export const selectAllMovies = (state: any) => state.movies;

export const selectMovieByIds = (state: any, ids: string[]) => {
  ids.forEach(id => selectAllMovies(state)[id]);
}
