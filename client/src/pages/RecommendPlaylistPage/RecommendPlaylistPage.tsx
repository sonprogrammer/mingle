import React, { useEffect, useState } from 'react';
import { PlaylistRecommendComponent } from '../../components';
import { useGetWeatherPlaylist } from '../../hooks';

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
        const position = await new Promise((resolve, reject) => {
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

  const { data: weatherData, isLoading } = useGetWeatherPlaylist(
    userLocation?.latitude,
    userLocation?.longitude,
  );
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <PlaylistRecommendComponent
        weather={weatherData?.weather}
        playlists={weatherData?.weatherPlaylists}
      />
      {/* <PlaylistRecommendComponent genre="댄스" playlists={GenreplaylistInfo} /> */}
    </>
  );
}
