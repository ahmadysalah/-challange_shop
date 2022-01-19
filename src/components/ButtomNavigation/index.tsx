import SimpleBottomNavigation from "./ButtonNavigation";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Stack } from "@mui/material";
import { Link } from "./BottonNavigation.style";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";

interface Iprops {
  wishlist: number;
  cartItems: number;
  username?: string;
}

export default function BottonNavigationGroup(props: Iprops) {
  const { auth } = useSelector((state: AppState) => state);
  return (
    <Stack direction="row">
      <Link to={auth.isAuthenticated ? "/profile" : "/auth/login"}>
        <SimpleBottomNavigation
          label={
            (auth.isAuthenticated &&
              `${auth.user.firstName} ${auth.user.lastName}`) ||
            "Login / Sign up"
          }
          icon={<PersonIcon />}
          path=""
        />
      </Link>
      <Link to={"/wishlist"}>
        <SimpleBottomNavigation
          path=""
          label="Wishlist"
          icon={<BookmarkIcon />}
          badgeContent={props.wishlist}
        />
      </Link>
      <Link to={"/shopping-cart"}>
        <SimpleBottomNavigation
          path="/shopping-cart"
          label="Cart"
          icon={<ShoppingCartIcon />}
          badgeContent={props.cartItems}
        />
      </Link>
    </Stack>
  );
}
