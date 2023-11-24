import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

function App() {
  const [countries, setCountries] = useState(null);
  const [regionFilter, setRegionFilter] = useState("all");
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    fetch("./data/data.json")
      .then((response) => response.json())
      .then((data) => {
        doRegionFilter(regionFilter, doSearchFilter(searchFilter, data));
      });
  }, [regionFilter, searchFilter]);

  function doRegionFilter(e, countries) {
    if (e === "all") {
      setCountries(countries);
      return;
    }
    const newCountries = [];
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].region === e) {
        newCountries.push(countries[i]);
      }
    }
    setCountries(newCountries);
  }

  function doSearchFilter(e, countries) {
    if (e === "") {
      return countries;
    }
    const regexp = new RegExp(`${e}`, "gi");
    const newCountries = [];
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].name.match(regexp)) {
        newCountries.push(countries[i]);
      }
    }
    return newCountries;
  }

  return (
    <>
      <Container id="header" fluid className="p-3 bg-primary mb-4">
        <Row className="justify-content-between fs-4">
          <Col className="px-5">
            <h1>Where in the world?</h1>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Col className="px-5 mx-3">
            <input
              style={{ padding: "10px 20px", fontSize: "1.3em" }}
              type="text"
              placeholder="Search for a country..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </Col>
          <Col xs={2}>
            <select
              style={{ padding: "5px 10px", fontSize: "1.3em" }}
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row className="px-5">
          {countries
            ? countries.map((entry) => {
                return (
                  <Col xs={3} className="my-5">
                    <Col
                      className="mb-2"
                      style={{
                        width: "255px",
                        height: "152px",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={entry.flags.png}
                        style={{ objectFit: "fill", width: "100%" }}
                      ></Image>
                    </Col>
                    <Col className="fs-4">{entry.name}</Col>
                    <Col className="fs-5">Population: {entry.population}</Col>
                    <Col className="fs-5">Regions: {entry.region}</Col>
                    <Col className="fs-5">Capital: {entry.capital}</Col>
                  </Col>
                );
              })
            : ""}
        </Row>
      </Container>
    </>
  );
}

export default App;
