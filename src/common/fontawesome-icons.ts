import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  library,
  type IconDefinition,
} from "@fortawesome/fontawesome-svg-core";
import {
  faTrash,
  faLock,
  faGripHorizontal,
  faHouseUser,
  faCaretDown,
  faPenToSquare,
  faUpload,
  faSun,
  faPen,
  faHeart,
  faBookmark,
  faUserPlus,
  faNewspaper,
  faComment,
  faFire,
  faRankingStar,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark as rfaBookmark,
  faClock as rfaClock,
  faComment as rfaComment,
  faHeart as rfaHeart,
} from "@fortawesome/free-regular-svg-icons";

library.add(
  faTrash,
  faLock,
  faGripHorizontal,
  faHouseUser,
  faCaretDown,
  faPenToSquare,
  faUpload,
  faSun,
  faPen,
  faHeart,
  faBookmark,
  faUserPlus,
  faNewspaper,
  faComment,
  faFire,
  faRankingStar,
  faEllipsis,
  rfaBookmark as IconDefinition,
  rfaClock as IconDefinition,
  rfaComment as IconDefinition,
  rfaHeart as IconDefinition
);

export default FontAwesomeIcon;
