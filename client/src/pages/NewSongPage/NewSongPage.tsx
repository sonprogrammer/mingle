import React from 'react';
import {ChartComponent} from '../../components';
import {
    useGetNewSongChart,
} from '../../hooks';
import {formatDuration} from '../../utils';
import {SongType} from "../../types";

export default function NewSongPage() {
    const {data: song, isLoading} = useGetNewSongChart();

    interface SongData {
        song: {
            _id: string;
            songName: string;
            songImageName: string;
            songArtist: string | null;
            songDuration: number;
        };
        isCurrentUserLiked: boolean;
    }

    interface ChartItem {
        _id: string;
        title: string;
        img: string;
        artist: string;
        length: string;
        isLiked: boolean;
    }

    if (isLoading) {
        return <p>loading... </p>;
    }

    const songs: ChartItem[] =
        song?.map((item: SongType) => ({
            _id: item.song._id,
            title: item.song.songName,
            img: `http://kdt-sw-6-team09.elicecoding.com/file/songImg/${item.song.songImageLocation}`,
            artist: item.song.songArtist || 'Unknown Artist',
            length: formatDuration(item.song.songDuration),
            isLiked: item.isCurrentUserLiked,
        })) || [];

    return (
        <ChartComponent
            items={songs}
            title="최신 음악"
        />
    );
}
