export class CreateAnimeDto {
    title: string;//
    type: 'movie' | 'tv' | 'ova' | 'ona' | 'special';
    description: string;//
    image: string;//
    imageHuge: string;//
    episodes: number;//
    rating: number;//
    genre: string[];
    studio: string;//
    year: number;//
    status: 'ongoing' | 'completed';//
    duration: number;//
    country: string;//
    dubs: string[];//
    subs: boolean;//
    views: number;//

}


    // "title": "string",
    // "type": string,
    // "description": "string",
    // "image": "string",
    // "imageHuge": "string",
    // "episodes": 24,
    // "rating": 9,6,
    // "genre": [
    //     "mecha"
    // ],
    // "studio": "ufotable",
    // "year": 2019,
    // "status": "ongoing",
    // "duration": 24,
    // "country": "japan",
    // "dubs": [
    //     "anilibria",
    //     "anidub"
    // ],
    // "subs": true,
    // "views": 2000,