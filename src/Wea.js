import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { Container, Col, Row } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Wea = () => {
  const api = {
    key: "c0b4b07a00e2c3db10fd7f42473c0da7",
    call: "https://api.openweathermap.org/data/2.5/",
  };

  const iploc = {
    key: "ae377611f5faacfea74a9d4185fe8c7a",
    call: "http://api.ipstack.com/",
  };

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [ip, setIp] = useState("");

  const weatherFetch = () => {
    fetch(`${api.call}weather?q=${query}&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        console.log(weather);
      });
  };

  const weatherF = (x) => {
    fetch(`${api.call}weather?q=${x}&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        //console.log(weather);
      });
  };

  const iplocation = (x) => {
    fetch(`${iploc.call}${x}?access_key=${iploc.key}`)
      .then((res) => res.json())
      .then((json) => {
        //setQuery(json.region_name);
        //console.log(json);
        weatherF(json.region_name);
      });
  };
  useEffect(() => {
    clientIp();
  }, []);

  const clientIp = () => {
    fetch("https://api.ipify.org/?format=json")
      .then((res) => res.json())
      .then((json) => {
        setIp(json.ip);
        iplocation(json.ip);
      });
  };
  const search = (e) => {
    if (e.key === "Enter") {
      weatherFetch();
    }
  };

  const d = new Date();
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = `${d.getHours()}:${d.getMinutes()} ${day[d.getDay()]} ${
    d.getMonth() + 1
  } ${d.getFullYear()}`;

  return (
    <>
      <div
        className={
          typeof weather.main != "undefined"
            ? weather.main.temp > 16
              ? "app"
              : "app cold"
            : "app cold"
        }
      >
        <main>
          <Container className="contain">
            <Col className="text-center">
              <div className="search">
                <input
                  type="text"
                  className="search-box"
                  placeholder="Location...."
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                  onKeyPress={search}
                />
              </div>
            </Col>
          </Container>
          {typeof weather.main != "undefined" ? (
            <Container>
              <Col className="text-center">
                <div className="weather">
                  <div className="location">
                    {weather.name}, {weather.sys.country}
                  </div>
                  <div className="time">{date}</div>
                  <div className="temp">{Math.round(weather.main.temp)}°C</div>
                  <div className="atmos">{weather.weather[0].main}</div>
                </div>
              </Col>
            </Container>
          ) : (
            <Container>
              <Col className="text-center">
                <div className="location">Loading...</div>
              </Col>
            </Container>
          )}
        </main>
      </div>
    </>
  );
};

export default Wea;
