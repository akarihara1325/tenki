import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, addHours } from 'date-fns';
import { WeatherNameWithIcon } from './tenkiiconlist';

// 各市区町村の緯度経度を定義します
const locationList = {
  '東京都 港区': { lat: 35.701, lon: 139.709 },
  '東京都 新宿区': { lat: 35.652, lon: 139.745 },
  '東京都 葛飾区': { lat: 35.754, lon: 139.853 },
  '千葉県 松戸市': { lat: 35.798, lon: 139.940 },
  '千葉県 柏市': { lat: 35.858, lon: 140.012 },
  // 他の市区町村も追加...
};

const weatherClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

const openMeteoApiBase = 'https://api.open-meteo.com/v1/forecast';

interface OkiniiriTenkiProps {
  favorites: { jpName: string; enName: string; lat: number; lon: number }[];
}

export const OkiniiriTenki: React.FC<OkiniiriTenkiProps> = ({ favorites }) => {
  const [weatherInfoList, setWeatherInfoList] = useState({});
  const [loading, setLoading] = useState(true);
  const [cache, setCache] = useState({});
  const currentDate = new Date();

  const fetchWeather = async (location) => {
    const cacheKey = `${location.lat}-${location.lon}`;
    if (cache[cacheKey]) {
      return cache[cacheKey];
    }

    const res = await weatherClient.get(
      `${openMeteoApiBase}?timezone=Asia/Tokyo&latitude=${location.lat}&longitude=${location.lon}&hourly=weather_code`
    );

    const weatherData = res.data.hourly;
    const weatherDataByTime = weatherData.time.map((time, index) => ({
      datetime: time,
      weatherCode: weatherData.weather_code[index],
    }));

    const filteredWeatherData = weatherDataByTime.filter((info) => {
      const weatherDate = new Date(info.datetime);
      return weatherDate >= currentDate && weatherDate < addHours(currentDate, 24);
    });

    setCache((prevCache) => ({ ...prevCache, [cacheKey]: filteredWeatherData }));
    return filteredWeatherData;
  };

  useEffect(() => {
    const fetchAllWeather = async () => {
      const weatherList = await Promise.all(
        favorites.map(async (favorite) => {
          const coordsKey = `${favorite.jpName} ${favorite.enName}`; // jpNameとenNameを結合したキーを生成
          console.log(`Fetching weather for: ${coordsKey}`); // ここでキーを確認
          const coords = locationList[coordsKey]; // ここでlocationListから取得
          console.log(`Coordinates: ${coords}`); // ここで取得した座標を確認
          if (coords) {
            return fetchWeather(coords);
          }
          return [];
        })
      );

      const weatherMap = {};
      favorites.forEach((favorite, index) => {
        const coordsKey = `${favorite.jpName} ${favorite.enName}`;
        weatherMap[coordsKey] = weatherList[index]; // 各市区町村の天気をマップに保存
      });

      setWeatherInfoList(weatherMap);
      setLoading(false);
    };

    if (favorites.length) {
      fetchAllWeather();
    }
  }, [favorites]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading &&
        favorites.map((favorite) => {
          const coordsKey = `${favorite.jpName} ${favorite.enName}`; // 完全な名前を取得
          const weatherData = weatherInfoList[coordsKey]; // 各お気に入りに対する天気データを取得
          const fullLocationName = `${favorite.jpName} ${favorite.enName} の天気`; // お気に入りの完全な名前を取得

          return (
            <div key={fullLocationName}>
              <h1>{fullLocationName}</h1>
              <div>
                <table id="weather-table" style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                      {weatherData && weatherData.map((info) => (
                        <td key={info.datetime} style={{ border: '1px solid black', padding: '2px', lineHeight: '1' }}>
                          {format(new Date(info.datetime), 'MM/dd HH:mm')}
                          <WeatherNameWithIcon weatherCode={info.weatherCode} />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
    </div>
  );
};
