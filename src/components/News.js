import React, { useState } from "react";
import { Select, Typography, Row, Col, Card, Avatar } from "antd";
import moment from "moment";
import { useGetCryptoQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

const { Title, Text } = Typography;
const { Option } = Select;
const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

function News({ simplified }) {
  const [selectValue, setSelectValue] = useState("cryptocurrency");

  const { data } = useGetCryptoQuery(100);

  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory: selectValue,
    count: simplified ? 6 : 20,
  });

  // console.log(cryptoNews);
  if (isFetching) return <div>Loading..</div>;

  return (
    <>
      <Row align="middle" gutter={[24, 24]}>
        {!simplified && (
          <>
            <Col span={24}>
              <Title level={2}>News 📰</Title>
              <Select
                showSearch
                className="select-news"
                placeholder="Select A Crypto"
                onChange={(value) => setSelectValue(value)}
                optionFilterProp="children"
                filterOption={
                  (input, option) =>
                    option.children[0]
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  // console.log(option)
                }
              >
                <Option value="Cryptocurrencies">Cryptocurrencies</Option>
                {data?.data?.coins.map((coin) => (
                  <Option value={coin.name}>{coin.name} </Option>
                ))}
              </Select>
            </Col>
          </>
        )}
        {cryptoNews.value.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card
              hoverable
              size="small"
              extra={
                // <div>
                <>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                  />
                  <Text className="provider-text">
                    {news.provider[0]?.name.length > 12
                      ? `${news.provider[0]?.name.slice(0, 12)}..`
                      : news.provider[0]?.name}
                  </Text>
                  {/* </div> */}
                </>
              }
              className="news-card"
              title={
                <div className="provider-container">
                  <Text>
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </Text>
                </div>
              }
            >
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.name.length > 150
                      ? news.name.slice(0, 50) + "..."
                      : news.name}
                  </Title>
                  <img src={news?.image?.contentUrl || demoImage} alt="news" />
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default News;
