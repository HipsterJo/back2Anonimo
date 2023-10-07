import { SeasonEnum, SeasonEngEnum } from "src/shared/enum/Season";

export interface CreateSeasonDto
{
   year: number;
    season: SeasonEnum;
    seasonEng: SeasonEngEnum;
    route: string;
}
