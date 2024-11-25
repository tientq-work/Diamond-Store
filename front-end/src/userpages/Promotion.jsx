import React, { useState, useEffect } from 'react';
import { Table, Typography, Space, Tag } from 'antd';
import PromotionAPI from '../api/PromotionAPI';

const { Title } = Typography;

const ActivePromotions = () => {
  const [activePromotion, setActivePromotion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivePromotion();
  }, []);

  const fetchActivePromotion = async () => {
    try {
      setLoading(true);
      const response = await PromotionAPI.getActivePromotion();
      console.log('API response:', response);
      if (response.success && response.data) {
        setActivePromotion(response.data);
      } else {
        console.error('Dữ liệu không hợp lệ:', response);
        setError('Không có khuyến mãi đang hoạt động');
      }
    } catch (err) {
      console.error('Lỗi khi tải khuyến mãi đang hoạt động:', err);
      setError('Có lỗi xảy ra khi tải khuyến mãi đang hoạt động');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
   
    {
      title: 'Tên khuyến mãi',
      dataIndex: 'promotionName',
      key: 'promotionName',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    
  ];

  if (error) return <Typography.Text type="danger">{error}</Typography.Text>;

  return (
    <Space direction="vertical" size="large" style={{ width: '100%', padding: '0 20px' }}>
    <Title level={2} style={{ textAlign: 'center', color: '#1890ff' }}>
      Khuyến mãi đang hoạt động
    </Title>
    {activePromotion ? (
      <div style={{ margin: '50px auto', maxWidth: '95%', }}>
        <Table
          columns={columns}
          dataSource={[activePromotion]}
          rowKey="promotionId"
          loading={loading}
          pagination={false}
          style={{ width: '100%' }}
          bordered
          tableLayout="fixed"
        />
      </div>
    ) : (
      <Typography.Text style={{ textAlign: 'center', display: 'block', fontSize: '16px', color: '#ff4d4f' }}>
        Không có khuyến mãi đang hoạt động
      </Typography.Text>
    )}
  </Space>
  );
};

export default ActivePromotions;