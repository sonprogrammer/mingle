import { AxiosInstance } from 'axios';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useAxios } from '../utils';
import { Playlists } from '../types';

const getCurrentWeather = async (_axiosInstance: AxiosInstance, latitude: number, longitude: number) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
  try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching weather: ${error.message}`);
    }
};
const getWeatherPlaylist = async (axiosInstance: AxiosInstance, latitude: number, longitude: number): Promise<{weatherPlaylists: Playlists[], weather: string}>  => {
  try {

    const weatherData = await getCurrentWeather(axiosInstance, latitude, longitude);
    const weatherId = weatherData.weather[0].id;
    const playlistResponse = await axiosInstance.get(`/api/playlist/weather/${weatherId}`);
    return playlistResponse.data;
  } catch (error: unknown) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

export function useGetWeatherPlaylist(latitude: number, longitude: number) {
  const { axiosInstance } = useAxios();
  return useQuery(
      ['weatherPlaylist', latitude, longitude],
      async ({ queryKey }) => getWeatherPlaylist(axiosInstance, queryKey[1] as number, queryKey[2] as number));
}