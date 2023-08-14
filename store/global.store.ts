import {defineStore} from 'pinia';
import axios from "axios";
import {useRoute} from "#app";



export const useFilmStore = defineStore('films', {
    state: () => ({
        films: [] as Film[],
        filmInfo: [] as Film[],
        apiUrl: 'http://www.omdbapi.com/?apikey=c7b67e5' as string,
        error: false as boolean,
        errorMsg: 'По вашему запросу ничего не найдено' as string,
        pages: 0 as number
    }),

    actions: {
        async searchFilm(s:string, p:number | 1) {
            const route = useRoute();

            if (route.path !== '/') {
                navigateTo('/')
            }
            this.films.splice(0, this.films.length)

            const searchUrl = `${this.apiUrl}&s=${s}&page=${p}`
            const response = await axios.get(searchUrl);

            if (response.data.Response === 'False') {
                return this.error = true;
            }

            this.pages = Math.ceil(response.data.totalResults / 10)

            response.data.Search.forEach(el => {
                this.films.push(el)
            })
            return this.error = false;
        },

        async filmDetails(id) {
            const route = useRoute();
            const response = await axios.get(`${this.apiUrl}&i=${id}`);
            if (response.data.Response === 'False') {
                this.error = true;
                return navigateTo('/')
            }
            this.error = false;
            this.filmInfo = response.data
            if (route.path !== `/film/${id}`){
                this.error = false;
                return navigateTo(`/film/${id}`)
            }
            return this.error = false;
        },

    }
})

interface Film {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string,
    Runtime?: string,
    Genre?: string,
    Director?: string,
    Writer?: string,
    Actors?: string,
    Plot?: string,
    imdbRating?: string,
    BoxOffice?: string,
    Rated?: string,
    Released?: string,
    Country?: string,
}
