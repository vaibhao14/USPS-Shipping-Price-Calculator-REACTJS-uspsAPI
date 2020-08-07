import React, { useState } from "react";
import "./App.css";
import { priceCalculatorUrl } from "./keys/constants";

const App = () => {
  const [sourceZip, setSourceZip] = useState();
  const [destinationZip, setDestinationZip] = useState();
  const [calculatedPrice, setCalculatedPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [service, setService] = useState("PRIORITY");
  const [firstClassMailType, setFirstClassMailType] = useState("LETTER");
  const [ounce, setOunce] = useState(0);

  const onCalculate = () => {
    let priceUri = priceCalculatorUrl(
      sourceZip,
      destinationZip,
      weight,
      ounce,
      service,
      firstClassMailType
    );
    fetch(priceUri)
      .then((rawData) => rawData.text())
      .then((response) => {
        let parser = new DOMParser();
        let xmlDataFormat = parser.parseFromString(response, "text/xml");
        if (xmlDataFormat.getElementsByTagName("Rate")[0]) {
          let price = xmlDataFormat.getElementsByTagName("Rate")[0].innerHTML;
          document.getElementById("calculatedPrice").style.color = "green";
          setCalculatedPrice("$" + price);
        } else if (xmlDataFormat.getElementsByTagName("Error")) {
          let description = xmlDataFormat.getElementsByTagName("Description")[0]
            .innerHTML;
          document.getElementById("calculatedPrice").style.color = "red";
          setCalculatedPrice(description);
        }
      });
  };

  return (
    <div className="form-container">
      <h1>USPS - Price Calculator</h1>
      <div>
        <label htmlFor="source">Source Zipcode: </label>
        <input
          name="source"
          type="text"
          placeholder="Source zipcode"
          maxLength="5"
          minLength="5"
          required
          onChange={(e) => setSourceZip(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="destination">Destination Zipcode: </label>
        <input
          name="destination"
          type="text"
          placeholder="Destination zipcode"
          maxLength="5"
          minLength="5"
          required
          onChange={(e) => setDestinationZip(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="pounds">Weight(Pound): </label>
        <input
          name="pounds"
          type="text"
          placeholder="Pounds"
          maxLength="5"
          minLength="1"
          required
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="ounce">Weight(Ounce): </label>
        <input
          name="ounce"
          type="text"
          placeholder="Ounce"
          maxLength="5"
          minLength="1"
          required
          onChange={(e) => setOunce(e.target.value)}
        />
      </div>
      <div>
        <label>Service: </label>
        <select required onChange={(e) => setService(e.target.value)}>
          <option defaultValue="PRIORITY">Priority</option>
          <option value="MEDIA">Media</option>
          <option value="ONLINE">Online</option>
          <option value="FIRST%20CLASS">First Class</option>
        </select>
      </div>
      {service === "FIRST%20CLASS" ? (
        <div>
          <label>Service: </label>
          <select
            required
            onChange={(e) => setFirstClassMailType(e.target.value)}
          >
            <option defaultValue="LETTER">Letter</option>
            <option value="FLAT">Flat</option>
            <option value="POSTCARD">Postcard</option>
          </select>
        </div>
      ) : null}
      <div>
        <button type="button" onClick={onCalculate}>
          Calculate
        </button>
      </div>
      <br></br>
      <div>
        <span className="price">Price: </span>
        <span id="calculatedPrice">{calculatedPrice}</span>
      </div>
    </div>
  );
};

export default App;
