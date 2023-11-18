import React from "react";
import { PlayDescriptBox, PlaylistTitle, PlaylistDescript } from "./styles";


interface PlayDescript{
    name: string;
    description: string;
}
export default function PlaylistDescriptionComponent({name, description}:PlayDescript){


    return(
        <>
        <PlayDescriptBox>
            <PlaylistTitle>{name}</PlaylistTitle>
            <PlaylistDescript>{description}</PlaylistDescript>
        </PlayDescriptBox>
        </>
    )
}