// import React from "react";
import { Row, Col, Card, Typography } from "antd";

const { Title, Text } = Typography;

const articles = [
  {
    title: "Có nên mua nhẫn kim cương",
    description: "Có nên mua nhẫn kim cương để đầu tư hay để dành không?",
    summary:
      "Việc dùng một món đồ quý giá để đầu tư dự trữ thường xảy ra [...]",
    image:
      "https://caohungdiamond.com/wp-content/uploads/2022/07/co-nen-mua-nhan-kim-cuong-hay-khong.jpg",
    link: "https://caohungdiamond.com/co-nen-mua-nhan-kim-cuong/",
  },
  {
    title: "Cách phân biệt nhẫn kim cương thật",
    description: "9 cách nhận biết kim cương thật giả chuẩn xác nhất",
    summary:
      "Việc kiểm tra kim cương thật giả rất quan trọng để đảm bảo bạn không [...]",
    image:
      "https://caohungdiamond.com/wp-content/uploads/2023/06/nhan-kim-cuong-that-img-900x600.jpg",
    link: "https://caohungdiamond.com/cach-phan-biet-kim-cuong-that-gia/",
  },
  {
    title: "Cửa hàng bán kim cương nhân tạo",
    description: "Cửa hàng bán kim cương nhân tạo uy tín, giá tốt",
    summary:
      "Hiện nay có rất nhiều cửa hàng bán kim cương nhân tạo giá rẻ mạo trên [...]",
    image:
      "https://caohungdiamond.com/wp-content/uploads/2023/06/cua-hang-ban-kim-cuong-nhan-tao-01-900x600.jpg",
    link: "https://caohungdiamond.com/cua-hang-ban-kim-cuong-nhan-tao/",
  },
  {
    title: "Có thể đốt cháy kim cương không",
    description: "Có thể đốt cháy kim cương không?",
    summary:
      "Kim cương, với vẻ đẹp lấp lánh và bền bỉ, đã lôi cuốn con người [...]",
    image:
      "https://caohungdiamond.com/wp-content/uploads/2023/06/co-the-dot-chay-kim-cuong-khong-01-900x600.jpg",
    link: "https://caohungdiamond.com/co-the-dot-chay-kim-cuong-khong/",
  },
  {
    title: "Tại sao kim cương lại đắt",
    description: "Tại sao kim cương lại đắt giá như vậy?",
    summary:
      "Kim cương là loại một đá quý có vẻ đẹp tuyệt hảo thể hiện giá [...]",
    image:
      "https://caohungdiamond.com/wp-content/uploads/2023/12/tai-sao-kim-cuong-lai-dat-01-900x600.jpg",
    link: "https://caohungdiamond.com/tai-sao-kim-cuong-lai-dat/",
  },
  {
    title: "Xoàn xiêm và xoàn tám",
    description: "Xoàn xiêm và xoàn tám là gì? Có gì khác nhau?",
    summary:
      "Trong ngành kim hoàn, xoàn xiêm và xoàn tám là hai thuật ngữ phổ biến [...]",
    image:
      "https://caohungdiamond.com/wp-content/uploads/2023/06/xoan-xiem-va-xoan-tam-1-900x600.jpg",
    link: "https://caohungdiamond.com/xoan-xiem-va-xoan-tam/",
  },
];

export default function Knowledge() {
  return (
    <div className="container mx-auto p-4">
      <Title level={2} className="text-center mb-4">
        Danh Mục: Kiến Thức Kim Cương
      </Title>
      <Text className="text-center mb-4 block">
        Tổng hợp những bài viết mới nhất về kim cương, đá quý | từ Song Long
        Diamond
      </Text>
      <Row gutter={[16, 16]}>
        {articles.map((article, index) => (
          <Col span={8} key={index}>
            <Card
              hoverable
              cover={
                <img
                  alt={article.title}
                  src={article.image}
                  className="h-60 object-cover w-full"
                />
              }
              onClick={() => window.open(article.link, "_blank")}
              className="h-full flex flex-col justify-between"
            >
              <Card.Meta
                title={article.title}
                description={
                  <div className="flex flex-col h-full">
                    <Text
                      className="flex-grow"
                      style={{ wordBreak: "break-all" }}
                    >
                      {article.description}
                    </Text>
                    <Text className="mt-2" style={{ wordBreak: "break-all" }}>
                      {article.summary}
                    </Text>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
