import { useState, useEffect, ChangeEvent } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { Col, Container, FormControl, InputGroup, Row } from "react-bootstrap"

export default function App() {
  const [city, setCity] = useState("London")
  const [lat, setLat] = useState("")
  const [lon, setLon] = useState("")
  const [weather, setWeather] = useState(null)

  const key = process.env.REACT_APP_WEATHER_API_KEY

  const geoApi = `http://api.openweathermap.org/geo/1.0/direct?q=${city || "London"
    }&limit=1&appid=${key}`

  const weatherApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${key}`

  useEffect(() => {
    try {
      const fetchCoord = async () => {
        const response = await fetch(geoApi)
        if (response.ok) {
          const data = await response.json()
          console.log(data)
          console.log(data[0].lat)
          console.log(data[0].lon)
          setLat(data[0].lat)
          setLon(data[0].lon)
        } else {
          console.log("someone fucked app")
        }
      }
      fetchCoord()
    } catch (error) {
      console.log(error)
    }
  }, [city, geoApi])

  useEffect(() => {
    try {
      const fetchWeather = async () => {
        const response = await fetch(weatherApi)
        if (response.ok) {
          const data = await response.json()
          console.log(data)
          setWeather(data)
        } else {
          console.log("someone fucked app")
        }
      }
      fetchWeather()
    } catch (error) {
      console.log(error)
    }
    // eslint-disable-next-line
  }, [city])

  return (
    <div className="App mt-5">
      <Container>
        <Row>
          <Col xs={10} md={8} className="mx-auto">
            <InputGroup>
              <FormControl
                placeholder="City"
                aria-label="City"
                aria-describedby="City"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={10} md={8} className="mx-auto">
            <h1>{city}</h1>
            <h1>{weather.current.weather[0].description}</h1>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
