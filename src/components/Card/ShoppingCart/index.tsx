import { PureComponent, ReactNode } from "react";
import Counter from "../../Counter";
import { Close, ImgContainer, WrapperCart } from "./ShoppingCart.style";
import { Grid, Typography } from "@mui/material";
import { ConnectedProps, connect } from "react-redux";
import { addToCart, removeFromCart } from "../../../redux/actions/cart.actions";
import { calculateDiscount } from "../../../utils/helpers";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../redux/store";
import { ActionsType } from "../../../@types/cart.types";
import Img from "../../common/Img";
import { Link } from "react-router-dom";

interface IPropsShoppingCart extends PropsFromRedux {
  id: string;
  imgSrc?: string;
  title: string;
  counter: number;
  price: number;
  discount?: number;
}

class ShoppingCartCard extends PureComponent<IPropsShoppingCart> {
  RemoveFromCart(id: string) {
    this.props.removeFromCart(id);
  }

  ModifyCart(id: string, value: number) {
    this.props.addToCart(id, value);
  }

  render(): ReactNode {
    return (
      <WrapperCart id={this.props.id} container alignItems="center">
        <Close onClick={this.RemoveFromCart.bind(this, this.props.id)} />
        <ImgContainer item xs={12} lg={3}>
          <Link to={`/product/${this.props.id}`}>
            <Img
              height="100%"
              width="100%"
              src={this.props.imgSrc}
              alt={this.props.title}
            />
          </Link>
        </ImgContainer>
        <Grid
          item
          xs={12}
          lg={4}
          sx={{ textAlign: { xs: "center", lg: "left" } }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color="text.primary"
            p="40px 20px 40px 10px"
          >
            {this.props.title}
          </Typography>
        </Grid>
        <Grid
          item
          xs={8}
          lg={3}
          sx={{ textAlign: { xs: "center", lg: "right" } }}
        >
          <Counter
            value={this.props.counter}
            onChange={(value: number) => this.ModifyCart(this.props.id, value)}
          />
        </Grid>
        <Grid
          item
          xs={4}
          lg={2}
          sx={{ textAlign: { xs: "center", md: "left", lg: "right" } }}
        >
          {(this.props.discount as number) > 0 ? (
            <>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="text.secondary"
                sx={{ textDecoration: "line-through" }}
              >
                {this.props.price?.toFixed(2)}
              </Typography>
              <Typography variant="h4" fontWeight="900" color="text.primary">
                {calculateDiscount(
                  this.props.price as number,
                  (this.props.discount as number) * this.props.counter,
                )?.toFixed(2)}
              </Typography>
            </>
          ) : (
            <Typography variant="h4" fontWeight="900" color="text.primary">
              {this.props.price.toFixed(2)}
            </Typography>
          )}
        </Grid>
      </WrapperCart>
    );
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, any, ActionsType>
) => ({
  ...bindActionCreators({ removeFromCart, addToCart }, dispatch),
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ShoppingCartCard);
