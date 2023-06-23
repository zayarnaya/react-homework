import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'localhost:3000/api/' }),
    endpoints: (builder) => ({
        getMovies: builder.query({query: () => 'movies'}),
        getMovie: builder.query({query: (id: number) => `movie?movieId=${id}`}),
        getCinema:  builder.query({query: (id: number) => `movies?cinemaId=${id}`}),
        getAllReviews:  builder.query({query: () => 'reviews'}),
        getSingleFilmReviews:  builder.query({query: (id: number) => `reviews?movieId=${id}`}),

    }),
})

export const { useGetMoviesQuery, useGetMovieQuery, useGetCinemaQuery, useGetAllReviewsQuery, useGetSingleFilmReviewsQuery } = movieApi;
