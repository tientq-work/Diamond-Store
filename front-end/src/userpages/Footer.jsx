import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import ZaloIcon from "@mui/icons-material/Chat";
import { Link } from "react-router-dom";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import styled from "styled-components";
import { Input } from "antd";
import logoImage from '../assets/images/Songlong.png';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleConnectClick = () => {
    window.open("https://zalo.me/0948704134", "_blank", "noopener,noreferrer");
  };

  const FooterLink = styled.a`
    position: relative;
    text-decoration: none;
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      bottom: -2px;
      left: 0;
      background-color: currentColor;
      visibility: hidden;
      transform: scaleX(0);
      transition: all 0.3s ease-in-out;
    }
    &:hover::after {
      visibility: visible;
      transform: scaleX(1);
    }
  `;

  const socialLinks = [
    {
      name: "Facebook",
      icon: FacebookIcon,
      url: "https://www.facebook.com/fpturvxnnnn",
    },
    {
      name: "Youtube",
      icon: YouTubeIcon,
      url: "https://www.youtube.com/channel/UC5iwPJH_2j7AUm48GcKkjaw",
    },
    {
      name: "Instagram",
      icon: InstagramIcon,
      url: "https://www.instagram.com/_5thjuly_/",
    },
    { name: "Zalo", icon: ZaloIcon, url: "https://zalo.me/0948704134" },
  ];
  return (
    <footer className="bg-pink-100 border-t mt-auto w-full">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 self-end">
            <LocalPhoneIcon className="text-red-500" />
            <span className="font-bold">HOTLINE: 0948704134</span>
          </div>
          <div className="flex justify-center">
          <Link to="/">
            <img
              src={logoImage}   
              alt="Song Long Diamond"
              className="mx-auto max-w-xs"
            />
          </Link>
          </div>
          <div className="flex items-center space-x-2 self-end">
            <LocationOnIcon className="text-red-500" />
            <a
              href="https://thegioikimcuong.vn/pages/destination/"
              className="hover:text-red-500 transition-colors duration-300 cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
            >
              HỆ THỐNG PHÂN PHỐI
            </a>
          </div>
        </div>

        <div className="border-t border-gray-300 my-8 w-full"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 w-full">
          <div className="text-left px-2 sm:px-4">
            <h3 className="font-bold flex items-center mb-4 sm:mb-8">
              LIÊN HỆ
            </h3>
            <p>Địa chỉ: NVHSV TPHCM</p>
            <p>Điện thoại: 0948704134</p>
            <p>Email: fptuni@fpt.edu.vn</p>
          </div>
          <div className="text-left">
            <h3 className="font-bold flex items-center mb-8">VỀ CHÚNG TÔI</h3>
            <FooterLink
              href="https://thegioikimcuong.vn/pages/khach-hang-than-thiet"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dịch vụ khách hàng
            </FooterLink>
          </div>
          <div className="text-left">
            <h3 className="font-bold flex items-center mb-8">
              DỊCH VỤ KHÁCH HÀNG
            </h3>
            <p>
              <FooterLink
                href="https://caohungdiamond.com/huong-dan-mua-hang/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hướng dẫn đặt hàng
              </FooterLink>
            </p>
            <p>
              <FooterLink
                href="https://caohungdiamond.com/huong-dan-mua-hang/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Phương thức thanh toán
              </FooterLink>
            </p>
            <p>
              <FooterLink
                href="https://caohungdiamond.com/chinh-sach-bao-hanh/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chính sách & bảo hành
              </FooterLink>
            </p>
            <p>
              <FooterLink
                href="https://caohungdiamond.com/cam-ket-kim-cuong/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cam kết chất lượng
              </FooterLink>
            </p>
            <p>
              <FooterLink
                href="https://caohungdiamond.com/dieu-khoan-su-dung/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Điều khoản mua bán
              </FooterLink>
            </p>
          </div>
          <div className="text-left">
            <h3 className="font-bold flex items-center mb-8">TIN TỨC</h3>
            <p>
              <FooterLink
                href="http://localhost:5173/promotions"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tin khuyến mãi
              </FooterLink>
            </p>
            <p>
              <FooterLink
                href="http://localhost:5173/knowledge"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tin trang sức
              </FooterLink>
            </p>
            <p>
              <FooterLink
                href="https://www.youtube.com/watch?v=g1h17YVx5ic"
                target="_blank"
                rel="noopener noreferrer"
              >
                Video
              </FooterLink>
            </p>
            <p>
              <FooterLink
                href="https://www.facebook.com/fpturvxnnnn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Blog
              </FooterLink>
            </p>
          </div>
          <div className="text-left px-2 sm:px-4">
            <h3 className="font-bold flex items-center mb-4 sm:mb-8">
              ĐĂNG KÝ NHẬN BẢN TIN
            </h3>
            <div className="flex items-center p-2 w-full">
              <Input
                type="email"
                placeholder="Nhập email..."
                className="flex-grow outline-none"
              />
              <PlayCircleIcon className="text-red-500 ml-2 cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 my-8 w-full"></div>

        <div className="flex flex-col items-center">
          <button
            onClick={handleConnectClick}
            className="bg-red-500 text-white py-2 px-4 rounded-full mb-4 hover:bg-red-600 transition-colors duration-300"
          >
            KẾT NỐI VỚI CHÚNG TÔI
          </button>
          <div className="flex justify-center space-x-28">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 hover:text-red-500 transition-colors duration-200"
              >
                <link.icon />
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-300 my-8 w-full"></div>

        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mt-8">
          <p className="text-gray-600 text-center">
            Copyright 2024 © Song Long Diamond powered by FPT Gold & Gems Group
          </p>
          <button
            onClick={scrollToTop}
            className="text-red-500 flex items-center hover:text-red-600 transition-colors duration-200"
          >
            <ArrowCircleUpIcon className="text-3xl mr-1" /> Về Đầu Trang
          </button>
        </div>
      </div>
    </footer>
  );
}
