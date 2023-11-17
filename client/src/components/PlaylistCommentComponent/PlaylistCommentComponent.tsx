import React from "react";
import { CommentContainer, User, UserFunction, UserNameAndImg, Comment } from "./styles";


interface Comment {
    userImage: string;
    userName: string;
    userComment: string;
    onEdit?: () => void;
    onDelete?: () => void;
}


export default function PlaylistCommentComponent(props:Comment){
    const { userImage, userName, userComment, onEdit, onDelete } = props

    return (
        <CommentContainer>
            
            <User>
                <UserNameAndImg>
                    <p>hi</p>
                </UserNameAndImg>
                <UserFunction></UserFunction>
            </User>
            <Comment></Comment>
        </CommentContainer>
    )
}