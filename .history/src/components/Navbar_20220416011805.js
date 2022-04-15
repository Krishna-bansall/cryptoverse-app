import React, { useState } from "react";

import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import icon from "../images/cryptocurrency.png";

import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";

function Navbar() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="nav-container">
      <div className="nav-content">
        <div className="logo-content">
          <Avatar src={icon} size="large" />
          <Typography.Title level={2} className="logo">
            <Link to="/">Cryptoverse</Link>
          </Typography.Title>
        </div>
        <Button
          ghost
          onClick={() => setIsOpened((prev) => !prev)}
          className="hamburger"
        >
          <MenuOutlined className="menu-icon" />
        </Button>
      </div>
      {/* {isOpened && (
        <Menu theme="dark">
          <Menu.Item icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>

          <Menu.Item icon={<FundOutlined />}>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>

          <Menu.Item icon={<BulbOutlined />}>
            <Link to="/news">News</Link>
          </Menu.Item>
        </Menu>
      )} */}
    </div>
  );
}

export default Navbar;
