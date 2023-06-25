import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/' }),
    endpoints: (builder) => ({
        getMovies: builder.query({query: () => 'movies'}),
        getMovie: builder.query({query: ({id}) => `movie?movieId=${id}`}),
        getCinema:  builder.query({query: (id: string) => `movies?cinemaId=${id}`}),
        getAllReviews:  builder.query({query: () => 'reviews'}),
        getSingleFilmReviews:  builder.query({query: (id: string) => `reviews?movieId=${id}`}),

    }),
})

export const { useGetMoviesQuery, useGetMovieQuery, useGetCinemaQuery, useGetAllReviewsQuery, useGetSingleFilmReviewsQuery } = movieApi;
