import React from "react";
import pic from "../assets/12.png";
import "./About.css";
import "./Aboutless.less";
import { Button, Space } from "antd";
import { getDate } from "@utils/tools";
const About = () => {
  return (
    <div className="wrapper">
      <h2 className="about">This is the about page</h2>
      <div className="header">
        <h3 className="h3cla">adfadf</h3>
      </div>
      <Space wrap>
        <Button
          type="primary"
          onClick={() => {
            console.log("时间：" + getDate());
          }}
        >
          Primary Button
        </Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </Space>
      <img src={pic} />
    </div>
  );
};

export default About;
