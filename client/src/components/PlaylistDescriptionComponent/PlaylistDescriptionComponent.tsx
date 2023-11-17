import React from "react";
import { PlayDescriptBox, PlaylistTitle, PlaylistDescript,DivideLine } from "./styles";


export default function PlaylistDescriptionComponent({name, description}){

interface Description {
    name: string;
    description: string;
}


    return(
        <>
        <PlayDescriptBox>
            <PlaylistTitle>{name}</PlaylistTitle>
            <PlaylistDescript>{description}</PlaylistDescript>
        </PlayDescriptBox>
        </>
    )
}