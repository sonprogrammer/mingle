import React, {useEffect, useState} from 'react';
import {PlaylistRecommendComponent} from '../../components';
import {useGetWeatherPlaylist, useGetUserPreference} from '../../hooks';

export default function RecommendPlaylistPage() {
    const [userLocation, setUserLocation] = useState<{
        latitude: number;
        longitude: number;
    }>({
        latitude: 0,
        longitude: 0,
    });
    useEffect(() => {
        const fetchUserLocation = async () => {
            try {
                const position: GeolocationPosition = await new Promise<GeolocationPosition>((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                if (position.coords) {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                } else {
                    console.error('Error getting location: Coordinates not available.');
                }
            } catch (error) {
                console.error('Error getting location:', error);
            }
        };

        fetchUserLocation();
    }, []);
    const {data: userPreference} = useGetUserPreference()

    const {data: weatherData, isLoading} = useGetWeatherPlaylist(
        userLocation?.latitude,
        userLocation?.longitude,
    );
    if (isLoading) {
        return <p>Loading...</p>;
    }

    const [randomType, playlists] = userPreference;


    return (
        <>
            <PlaylistRecommendComponent
                isMypage={false}
                weather={weatherData?.weather}
                playlists={weatherData?.weatherPlaylists}
            />

            {randomType === 'random' ? (
                <>
                    <PlaylistRecommendComponent
                        isMypage={false}
                        genre="랜덤"
                        playlists={playlists}
                    />
                </>
            ) : (
                userPreference.map((playlist: any) => {
                    return (
                        <PlaylistRecommendComponent
                            key={playlist.id}
                            isMypage={false}
                            genre={playlist[0]}
                            playlists={playlist.slice(1)}
                        />)
                }))}
        </>
    );
}
