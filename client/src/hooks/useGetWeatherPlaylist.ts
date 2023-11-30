import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';
import { useAxios } from '../utils';
import { useEffect, useState } from 'react';

const getCurrentWeather = async (axiosInstance: AxiosInstance, latitude, longitude) => {

  const API_KEY = "c98216fdd5f29bb8103a673be31e42a9";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

  try {
      const response = await axiosInstance.get(url);
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching weather: ${error.message}`);
    }
};

const getWeatherId = (weatherData) => {
  console.log(weatherData)
  return weatherData?.weather[0]?.id;
};

const GetWeatherPlaylist = async (axiosInstance: AxiosInstance, latitude, longitude) => {
  try {

    const weatherData = await getCurrentWeather(axiosInstance, latitude, longitude);
    const weatherId = getWeatherId(weatherData);
    console.log(weatherData);
    const playlistResponse = await axiosInstance.get(`/playlist/weather/${weatherId}`);
    console.log(playlistResponse);
    return playlistResponse.data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

export function useGetWeatherPlaylist() {
  const axiosInstance = useAxios();
  const [userLocation, setUserLocation] = useState(null);

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
  console.log(userLocation)
  useEffect(() => {
    if (userLocation) {
      GetWeatherPlaylist(axiosInstance, userLocation.latitude, userLocation.longitude)
        .then((result) => console.log(result))
        .catch((error) => console.log(error))
    }
  }, [userLocation]);

  return useQuery(['weatherPlaylist', userLocation?.latitude, userLocation?.longitude], async () =>{
    if (!userLocation) {
      return Promise.resolve(null);
    }

    const data = await GetWeatherPlaylist(
      axiosInstance,
      userLocation.latitude,
      userLocation.longitude
    );
    return data;
});
}