import { AxiosInstance } from 'axios';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useAxios } from '../utils';

const getCurrentWeather = async (_axiosInstance: AxiosInstance, latitude: number, longitude: number) => {

  const API_KEY = "c98216fdd5f29bb8103a673be31e42a9";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching weather: ${error.message}`);
    }
};
const getWeatherPlaylist = async (axiosInstance: AxiosInstance, latitude: number, longitude: number) => {
  try {

    const weatherData = await getCurrentWeather(axiosInstance, latitude, longitude);
    const weatherId = weatherData.weather[0].id;
    const playlistResponse = await axiosInstance.get(`/playlist/weather/${weatherId}`);
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