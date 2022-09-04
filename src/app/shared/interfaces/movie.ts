export interface IMovie {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    release_date: string,
    poster_path: string,
    popularity: number,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

export interface IPage {
    dates: {
        minimum: string,
        maximim: string
    },
    page: number,
    results: IMovie[],
    total_pages: number,
    total_results: number
}
