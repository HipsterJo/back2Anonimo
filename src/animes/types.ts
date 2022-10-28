import { Anime } from "src/schemes/anime.schema";


export interface property{
    label: "topAnime"| "recentlyUpdated" | "recentlyAdded" | "resentlyCompleted"
    value: "rating"| "updatedAt" | "createdAt" | "completed"
    period: "today"|"week" | "month" 
}

export interface returnFirstLoadType{
    cards: Anime[];
    topAnime: Anime[];
    recentlyUpdated: Anime[];
    recentlyAdded: Anime[];
    resentlyCompleted: Anime[];
}

export interface returnUpdateProperty{
    label: "topAnime"| "recentlyUpdated" | "recentlyAdded" | "resentlyCompleted"
    cards: Anime[]
}
export interface filterRecentlyUpdated{
    
    filter: "all"|"subbed"| "dubbed"|"trends"|"random"
}


