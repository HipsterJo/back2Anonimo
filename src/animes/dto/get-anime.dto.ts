export class GetAnime{
    sort: 'title' | 'rating' | 'views'| 'createdAt' | 'updatedAt';
    type: 'movie' | 'tv' | 'ova' | 'ona' | 'special';
    status: 'ongoing' | 'completed'; 
    genres: [string];
    limit: number;
    page: number;
    search: string;
}