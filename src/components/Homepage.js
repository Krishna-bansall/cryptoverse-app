import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";

import { useGetCryptoQuery } from "../services/cryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";

import { RightCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;

function Homepage() {
  const { data, isFetching } = useGetCryptoQuery(10);
  const globalStat = data?.data?.stats;

  if (isFetching) {
    return <div>Loading</div>;
  }
  console.log(data);
  return (
    <>
      <Title level={1} className="heading">
        Global Crypto Stats 🐶💹
      </Title>
      <Title level={5}>
        <Row>
          <Col span={12}>
            <Statistic
              title="Total Crypto Currencies"
              value={millify(globalStat?.total)}
              valueStyle={{ color: "var(--pink)" }}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Exchanges"
              value={millify(globalStat?.totalExchanges)}
              valueStyle={{ color: "var(--pink)" }}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total 24h Value"
              value={
                globalStat?.total24hVolume < 1000000000000000
                  ? millify(globalStat.total24hVolume)
                  : Math.floor(globalStat.total24hVolume / 10000000000) / 100 +
                    " T"
              }
              valueStyle={{ color: "var(--pink)" }}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Market Cap"
              value={millify(globalStat?.totalMarketCap)}
              valueStyle={{ color: "var(--pink)" }}
            />
          </Col>
          <Col span={12}>
            <Statistic
              valueStyle={{ color: "var(--pink)" }}
              title="Total Market"
              value={millify(globalStat?.totalMarkets)}
            />
          </Col>
        </Row>
      </Title>

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the World
        </Title>
        <Title level={4} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
          <RightCircleOutlined style={{ color: "var(--bgPrimary)" }} />
        </Title>
      </div>
      <Cryptocurrencies simplified />

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={4} className="show-more">
          <Link to="/news">Show More</Link>
          <RightCircleOutlined style={{ color: "var(--bgPrimary)" }} />
        </Title>
      </div>
      <News simplified />
    </>
  );
}

export default Homepage;
