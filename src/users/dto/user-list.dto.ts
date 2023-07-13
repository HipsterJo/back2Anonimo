export interface AddToListDto {
    type: "planning" | "watching" | "favorites" | "delete"|"topAnime"|"waifu"|"deleteFromTop"|"deleteWaifu";
    animeId: string;
}