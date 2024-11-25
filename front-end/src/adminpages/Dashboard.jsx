import { CheckCircleOutlined, CloseCircleOutlined, DollarCircleOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { Card } from "antd";
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { Chart, Pie } from 'react-chartjs-2';
import DashboardAPI from "../api/DashboardAPI";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, LineElement, PointElement, ChartDataLabels);

const Dashboard = () => {
  const [cardData, setCardData] = useState({
    totalMembers: 0,
    activeOrders: 0,
    completedOrders: 0,
    returnOrders: 0,
    totalRevenue: 0,
  });

  const [revenueTimeframe, setRevenueTimeframe] = useState('weekly');
  const [pieChartData, setPieChartData] = useState({
    series: [],
    labels: ["Processing Orders", "Completed Orders", "Cancelled Orders"],
  });
  const [barChartData, setBarChartData] = useState({
    weekly: [],
    monthly: [],
    yearly: [],
  });

  const formatCurrency = (amount) => {
    if (amount == null || isNaN(amount)) return "N/A";
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
      .format(amount)
      .replace('₫', 'VND')
      .trim();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          DashboardAPI.countMember(),
          DashboardAPI.countProcessingOrder(),
          DashboardAPI.totalRevenue(),
          DashboardAPI.countCompleteOrder(),
          DashboardAPI.countCancelOrder(),
          DashboardAPI.getWeeklyRevenue(),
          DashboardAPI.getMonthlyRevenue(),
          DashboardAPI.getYearlyRevenue(),
        ]);

        console.log('API responses:', responses);

        setCardData({
          totalMembers: responses[0].data.data,
          activeOrders: responses[1].data.data,
          totalRevenue: responses[2].data.data,
          completedOrders: responses[3].data.data,
          returnOrders: responses[4].data.data,
        });

        setPieChartData({
          series: [
            responses[1].data.data,
            responses[3].data.data,
            responses[4].data.data,
          ],
          labels: ["Processing Orders", "Completed Orders", "Cancelled Orders"],
        });

        setBarChartData({
          weekly: responses[5].data.data.map(item => parseFloat(item)), // Ensure data is in float format
          monthly: responses[6].data.data.map(item => parseFloat(item)),
          yearly: responses[7].data.data.map(item => parseFloat(item)),
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const cardDetails = [
    {
      title: "Total Members",
      amount: cardData.totalMembers,
      icon: <UserOutlined className="text-2xl" />,
      bgColor: "bg-blue-500",
      textColor: "text-blue-700",
    },
    {
      title: "Processing Orders",
      amount: cardData.activeOrders,
      icon: <ShoppingCartOutlined className="text-2xl" />,
      bgColor: "bg-green-500",
      textColor: "text-green-700",
    },
    {
      title: "Completed Orders",
      amount: cardData.completedOrders,
      icon: <CheckCircleOutlined className="text-2xl" />,
      bgColor: "bg-teal-500",
      textColor: "text-teal-700",
    },
    {
      title: "Cancelled Orders",
      amount: cardData.returnOrders,
      icon: <CloseCircleOutlined className="text-2xl" />,
      bgColor: "bg-red-500",
      textColor: "text-red-700",
    },
    {
      title: "Total Revenue",
      amount: formatCurrency(cardData.totalRevenue),
      icon: <DollarCircleOutlined className="text-2xl" />,
      bgColor: "bg-yellow-500",
      textColor: "text-yellow-700",
    },
  ];

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: "#000",
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            label += context.parsed + ' Orders';
            return label;
          }
        }
      },
      datalabels: {
        color: '#ffffff',
        font: {
          weight: 'bold',
          size: 16
        },
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map(data => {
            sum += data;
          });
          let percentage = (value * 100 / sum).toFixed(2) + "%";
          return percentage;
        },
      }
    },
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      datalabels : {
        display: false
      },
      title: {
        display: true,
        text: `${revenueTimeframe.charAt(0).toUpperCase() + revenueTimeframe.slice(1)} Revenue Overview`,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== undefined) {
              label += formatCurrency(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Revenue (VND)',
        },
        ticks: {
          callback: function(value) {
            return formatCurrency(value);
          }
        }
      },
    },
    
  };

  const TimeframeButton = ({ label, value }) => (
    <button
      className={`px-4 py-2 rounded ${
        revenueTimeframe === value ? 'bg-green-500 text-white' : 'bg-gray-200'
      }`}
      onClick={() => setRevenueTimeframe(value)}
    >
      {label}
    </button>
  );

  TimeframeButton.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  };

  return (
    <div>
      <div className="flex justify-between items-center p-6">
        <h2 className="text-3xl font-bold ">Dashboard</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
      {cardDetails.map((card, index) => (
        <div key={index} className="w-full">
          <Card className="h-full shadow-lg rounded-lg overflow-hidden">
            <div className="p-4 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${card.textColor}`}>
                  {card.title}
                </h3>
                <div className={`${card.bgColor} text-white p-3 rounded-full`}>
                  {card.icon}
                </div>
              </div>
              <div className="mt-auto">
                <p className="text-2xl font-bold text-gray-800">
                  {card.amount}
                </p>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
      <div className="my-4 mx-6">
        <Card className="w-full shadow-lg rounded-lg overflow-hidden">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center p-4"
          >
            <Typography variant="h6" color="blue-gray">
              Orders Overview
            </Typography>
          </CardHeader>
          <CardBody className="px-4 pb-4 grid place-items-center">
            <div style={{ width: '400px', height: '400px' }}>
              <Pie data={{
                labels: pieChartData.labels,
                datasets: [
                  {
                    data: pieChartData.series,
                    backgroundColor: ["#1E3A8A", "#00897B", "#FF8F00"],
                    borderColor: ["#1E3A8A", "#00897B", "#FF8F00"],
                    borderWidth: 1,
                  },
                ],
              }} options={pieChartOptions} plugins={[ChartDataLabels]} />
            </div>
          </CardBody>
        </Card>
      </div>  
      <div className="my-4 mx-6">
        <Card className="w-full shadow-lg rounded-lg overflow-hidden">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center p-4"
          >
            <Typography variant="h6" color="blue-gray">
              Revenue Overview
            </Typography>
            <div className="flex space-x-2">
              <TimeframeButton label="Weekly" value="weekly" />
              <TimeframeButton label="Monthly" value="monthly" />
              <TimeframeButton label="Yearly" value="yearly" />
            </div>
          </CardHeader>
          <CardBody className="px-4 pb-4">
            <Chart 
              type='bar'
              data={{
                labels: revenueTimeframe === 'weekly' 
                  ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                  : revenueTimeframe === 'monthly'
                    ? ['Week 1', 'Week 2', 'Week 3', 'Week 4']
                    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                  {
                    type: 'bar',
                    label: `${revenueTimeframe.charAt(0).toUpperCase() + revenueTimeframe.slice(1)} Revenue`,
                    data: barChartData[revenueTimeframe],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                  },
                  {
                    type: 'line',
                    label: 'Trend',
                    data: barChartData[revenueTimeframe],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.1
                  }
                ],
              }} 
              options={barChartOptions} 
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
