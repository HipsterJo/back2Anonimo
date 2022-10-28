export class GetAnime{
    sort: 'title' | 'rating' | 'views'| 'createdAt' | 'updatedAt';
    type: 'movie' | 'tv' | 'ova' | 'ona' | 'special';
    period: 'today' | 'week' | 'month' | 'year' | 'all';
    status: 'ongoing' | 'completed'; 
    genres: [string];
    limit: number;
    page: number;
    search: string;
}