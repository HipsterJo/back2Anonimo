import {Stats} from 'src/schemas/stats.schema'
import { Genre } from 'src/schemas/genre.schema'
import { Studio } from 'src/schemas/studio.schema'
import { MediaType } from 'src/schemas/mediaType.schema'
import { Season } from 'src/schemas/season.schema'
import { Relations } from 'src/schemas/relations.schema'
import { Status } from 'src/shared/enum/Status'


export interface creatAnimedto{
    title:string
    titleEng:string
    titleJap:string
    description:string
    descriptionEng:string
    episodes:number
    duration?:number
    genres:Genre[]
    studios:Studio[]
    mediaType:MediaType
    year:number
    season:Season
    status:Status
    relations?:Relations
    imageVersionRoute:string
    imagePanaramRoute:string
}






