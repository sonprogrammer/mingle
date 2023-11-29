import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';
import { useAxios } from '../utils';

const GetWeatherPlaylist = async (axiosInstance: AxiosInstance, latitude, longitude) => {
  try {
    const weatherResponse = await axiosInstance.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c98216fdd5f29bb8103a673be31e42a9`);

    const weatherId = weatherResponse.data.weather[0].id;
    const playlistResponse = await axiosInstance.get(`/playlist/weather/${weatherId}`);
    
    return playlistResponse.data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

const useGetWeatherPlaylist = () => {
  const axiosInstance = useAxios();
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }, []);

  return useQuery(['weatherPlaylist', userLocation?.latitude, userLocation?.longitude], () =>
    GetWeatherPlaylist(axiosInstance, userLocation?.latitude, userLocation?.longitude)
  );
};

export default useGetWeatherPlaylist;

