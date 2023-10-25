import RootLayout from "@/components/Layouts/RootLayout";
import { Col, Image, Row } from "antd";
import {
  CalendarOutlined,
  CommentOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
const NewsDetailsPage = ({ news }) => {
  return (
    <Row
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}
      style={{ marginTop: "30px" }}
    >
      <Col className="gutter-row" span={12}>
        <Image
          src={news.image_url}
          alt={news.title}
          height={300}
          width={"100%"}
          layout="responsive"
        />
      </Col>
      <Col className="gutter-row" span={12}>
        <h1>{news.title}</h1>
        <div
          className="line"
          style={{
            height: "5px",
            margin: "20px 0",
            background: "#000",
            width: "100%",
          }}
        ></div>

        <p
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            color: "gray",
            margin: "10px 0px",
            fontSize: "12px",
          }}
        >
          <span>
            <CalendarOutlined /> {news?.release_date}
          </span>
          <span>
            <CommentOutlined /> {news?.comment_count} COMMENTS
          </span>
          <span>
            <ProfileOutlined /> {news?.category}
          </span>
        </p>

        <p style={{ fontSize: "15px" }}>{news?.description}</p>
      </Col>
    </Row>
  );
};

export default NewsDetailsPage;

NewsDetailsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:5000/news");
  const allNews = await res.json();
  const paths = allNews.map((news) => ({
    params: { newsId: news.id },
  }));
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const { newsId } = context.params;
  const res = await fetch(`http://localhost:5000/news/${newsId}`);
  const data = await res.json();
  return {
    props: {
      news: data,
    },
  };
};
