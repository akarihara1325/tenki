// tenki.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, addHours } from 'date-fns';
import { WeatherNameWithIcon } from './tenkiiconlist';

const weatherClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

const openMeteoApiBase = 'https://api.open-meteo.com/v1/forecast';

export const locationList = [
  { enName: 'tokyoto', jpName: '東京都', lat: 35.689, lon: 139.692 },
  { enName: 'hokkaido', jpName: '北海道', lat: 43.064, lon: 141.346 },
  { enName: 'chiba', jpName: '千葉県', lat: 35.607, lon: 140.106 },
  { enName: 'aomori', jpName: '青森県', lat: 40.824, lon: 140.740 },
];

export const tokyotoList = [
  { enName: 'shinjuku', jpName: '新宿区', lat: 35.701, lon: 139.709 },
  { enName: 'minatoku', jpName: '港区', lat: 35.652, lon: 139.745 },
  { enName: 'katsushikaku', jpName: '葛飾区', lat: 35.754, lon: 139.853 },
  // ここに他のエリアを追加
];

export const chibaList = [
  { enName: 'matsudoshi', jpName: '松戸市', lat: 35.754, lon: 139.853 },
  { enName: 'kashiwashi', jpName: '柏市', lat: 35.754, lon: 139.853 },
  // ここに千葉県の他のエリアを追加
];

const areaListMap = {
  tokyoto: tokyotoList,
  chiba: chibaList,
  // 他のリストもここに追加
};

interface AppProps {
    location: { jpName: string; enName: string; lat: number; lon: number };
    addFavorite: (favorite: string) => void;
    removeFavorite: (favorite: string) => void;
    favorites: string[];
  }
  

export const App: React.FC<AppProps> = ({ location, addFavorite, removeFavorite, favorites }) => {
  const [weatherInfo1, setWeatherInfo1] = useState([]);
  const [weatherInfo2, setWeatherInfo2] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(areaListMap[location.enName][0]);
  const [cache, setCache] = useState({});
  const [loading, setLoading] = useState(true);
  const currentDate = new Date();

  const isFavorite = favorites.includes(`${location.jpName} ${selectedLocation.jpName}`);

  useEffect(() => {
    let isMounted = true;
    const fetchWeather = async (location, setWeatherInfo) => {
      try {
        const cacheKey = `${location.lat}-${location.lon}`;
        if (cache[cacheKey]) {
          setWeatherInfo(cache[cacheKey]);
          setLoading(false);
          return;
        }
        setLoading(true);
        const res = await weatherClient.get(
          `${openMeteoApiBase}?timezone=Asia/Tokyo&latitude=${location.lat}&longitude=${location.lon}&hourly=weather_code`
        );
        if (isMounted) {
          const weatherData = res.data.hourly;
          const weatherDataByTime = weatherData.time.map((time, index) => ({
            datetime: time,
            weatherCode: weatherData.weather_code[index],
          }));
          const filteredWeatherData = weatherDataByTime.filter((info) => {
            const weatherDate = new Date(info.datetime);
            return weatherDate >= currentDate && weatherDate < addHours(currentDate, 24);
          });
          setWeatherInfo(filteredWeatherData);
          setCache((prevCache) => ({
            ...prevCache,
            [cacheKey]: filteredWeatherData,
          }));
        }
      } catch (error) {
        alert(error.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchWeather(location, setWeatherInfo1);
    fetchWeather(selectedLocation, setWeatherInfo2);
    return () => {
      isMounted = false;
    };
  }, [currentDate, selectedLocation, location]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          <h1>{location.jpName} の天気</h1>
          <div>
            <table id="weather-table" style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  {weatherInfo1.map((info) => (
                    <td
                      key={info.datetime}
                      style={{ border: '1px solid black', padding: '2px', lineHeight: '1' }}
                    >
                      {format(new Date(info.datetime), 'MM/dd HH:mm')}
                      <WeatherNameWithIcon weatherCode={info.weatherCode} />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <h1>{selectedLocation.jpName} の天気</h1>
          {!isFavorite ? (
            <button onClick={() => addFavorite(`${location.jpName} ${selectedLocation.jpName}`)}>
              お気に入り追加
            </button>
          ) : (
            <button onClick={() => removeFavorite(`${location.jpName} ${selectedLocation.jpName}`)}>
              お気に入り削除
            </button>
          )}
          <div>
            <table id="weather-table" style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  {weatherInfo2.map((info) => (
                    <td
                      key={info.datetime}
                      style={{ border: '1px solid black', padding: '2px', lineHeight: '1' }}
                    >
                      {format(new Date(info.datetime), 'MM/dd HH:mm')}
                      <WeatherNameWithIcon weatherCode={info.weatherCode} />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <select
              id="location-select"
              onChange={(e) => {
                const selected = areaListMap[location.enName].find(
                  (lo) => lo.enName === e.target.value
                );
                setSelectedLocation(selected);
              }}
            >
              {areaListMap[location.enName].map((lo) => (
                <option key={lo.enName} value={lo.enName}>
                  {lo.jpName}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
};
