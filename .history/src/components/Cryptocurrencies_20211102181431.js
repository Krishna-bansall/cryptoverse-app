import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Typography } from "antd";

import { useGetCryptoQuery } from "../services/cryptoApi";

const { Title } = Typography;
function Cryptocurrencies({ simplified }) {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptoQuery(count);
  const [cryptos, setcryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(cryptos);

  useEffect(() => {
    // setcryptos(cryptosList?.data?.coins);
    const filteredData = cryptosList?.data?.coins.filter((crypto) => {
      return crypto.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setcryptos(filteredData);
  }, [searchTerm, cryptosList]);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!simplified ? (
        <>
          <Title level={1}>Listed Cryptocurrencies 🌝</Title>
          <div className="search-crypto">
            <Input
              placeholder="Search Crypto Currencies"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </>
      ) : null}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((crypto) => (
          <Col className="crypto-card" key={crypto.id} xs={24} sm={12} lg={6}>
            <Link to={`/crypto/${crypto.id}`}>
              <Card
                title={`${crypto.rank}. ${crypto.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={crypto.iconUrl}
                    alt="coin-icon"
                  />
                }
                hoverable
              >
                <p>Price: {millify(crypto.price)}</p>
                <p>Market Cap: {millify(crypto.marketCap)}</p>
                <p>Daily Change: {millify(crypto.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Cryptocurrencies;
