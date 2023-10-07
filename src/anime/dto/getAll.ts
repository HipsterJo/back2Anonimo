export interface getAlldto{
    offset:number,
    limit:number,
    sort:string,
    genres:string[],
    genreExclude:string[],
    studios:string[],
    studiosExclude:string[],
    mediaTypes:string[],
    mediaTypesExclude:string[],
    year:number[],
    yearExclude:number[],
    season:string[],
    seasonExclude:string[],
    status:string[]
}

