import {defineStore} from 'pinia';
import axios from "axios";


export const useFilmStore = defineStore('films', {
    state: () => ({
        searchValue: '' as string,
        films: [] as Film[],
        filmInfo: [] as Film[],
        apiUrl: 'http://www.omdbapi.com/?apikey=c7b67e5' as string,
        error: false as boolean,
        errorMsg: 'По вашему запросу ничего не найдено' as string,
        pages: 0 as number
    }),

    actions: {
        async searchFilm(s:string, p:number=1) {
            navigateTo(`/?s=${s}&page=${p}`);
/*            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });*/

            const searchUrl = `${this.apiUrl}&s=${s}&page=${p}`
            const response = await axios.get(searchUrl);

            this.pages = Math.ceil(response.data.totalResults / 10);

            this.films.splice(0, this.films.length);

            if (response.data.Response === 'False') {
                navigateTo('/');
                return this.error = true;
            }

            this.searchValue = s;

            response.data.Search.forEach((el:Film) => {
                this.films.push(el)
            })
            return this.error = false;
        },

        async filmDetails(id:string) {
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
