import React from "react";
import { StyledDescriptBox, StyledTitle, StyledDescript } from "./styles";


interface PlayDescript{
    name: string;
    description: string;
}
export default function PlaylistDescriptionComponent({name, description}:PlayDescript){

    return(
        <>
        <StyledDescriptBox>
            <StyledTitle>{name}</StyledTitle>
            <StyledDescript>{description}</StyledDescript>
        </StyledDescriptBox>
        </>
    )
}