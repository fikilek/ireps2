import MadiaMobileFilters from "./MediaMobileFilters";
import "./MediaMobileFooter.css";
import MediaThumbnails from "./MediaThumbnails";

const MediaMobileFooter = () => {
  return (
    <div className="media-mobile-footer">
      <MadiaMobileFilters />
      <MediaThumbnails />
    </div>
  )
}

export default MediaMobileFooter