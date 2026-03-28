import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PortfolioTileProps {
  id: string;
  title: string;
  thumbnail: string;
  video: string;
}

const PortfolioTile = ({ id, title, thumbnail, video }: PortfolioTileProps) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="portfolio-tile"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/project/${id}`)}
    >
      <img
        src={thumbnail}
        alt={title}
        className="portfolio-tile-image"
        loading="lazy"
        width={800}
        height={800}
      />
      <video
        ref={videoRef}
        src={video}
        muted
        loop
        playsInline
        preload="none"
        className={`portfolio-tile-video ${hovered ? "portfolio-tile-video--active" : ""}`}
      />
      <div className={`portfolio-tile-label ${hovered ? "portfolio-tile-label--active" : ""}`}>
        <span>{title}</span>
      </div>
    </div>
  );
};

export default PortfolioTile;
