import { useEffect, useMemo, useState } from "react";
import { autoPlay } from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";
import { DotsItem } from "./style";
import ProdectCard from "../ProdectCard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/products.actions";
import { AppState } from "../../redux/store";
import Loading from "../common/Loading";
import { IProduct, Products } from "../../@types/products.types";
import { Grid } from "@mui/material";
import { formatProducts } from "../../utils/helpers";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function SliderProduct() {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();

  const {
    loading,
    products: { products },
  } = useSelector((state: AppState) => state.products);

  useEffect(() => {
    if ((products as IProduct[])?.length === 0) {
      dispatch(getProducts());
    }
  }, [dispatch, products]);

  const handleChangeIndex = (index: number) => {
    setActiveStep(index);
  };
  // const NewProduct = useMemo(() => {
  //   return formatProducts(products);
  // }, [products]);
  const styles = {
    slideContainer: {
      padding: "16px 60px",
    },
  };

  const formattedProducts = useMemo(() => {
    return formatProducts(products as IProduct[]);
  }, [products]);

  return (
    <>
      <AutoPlaySwipeableViews
        interval={6000}
        index={activeStep}
        slideStyle={styles.slideContainer}
        onChangeIndex={handleChangeIndex}
      >
        {(formattedProducts as Products[]).map((item) => (
          <Grid
            key={item.id}
            container
            md={11.2}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              margin: "auto",
            }}
          >
            {loading ? (
              <Loading />
            ) : (
              (item.products as IProduct[]).map((product) => (
                <Grid key={product._id} item md={3.8} sx={{ margin: "16px 0" }}>
                  <ProdectCard
                    id={product._id as string}
                    valueRating={product.rating}
                    price={product.price}
                    discountValue={product.discount}
                    img={product.images?.[0] || ""}
                    name={product.name}
                  />
                </Grid>
              ))
            )}
          </Grid>
        ))}
      </AutoPlaySwipeableViews>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "20px 0",
        }}
      >
        {Array.from(Array((formattedProducts as Products[]).length)).map(
          (_, index) => (
            <DotsItem
              active={activeStep === index && true}
              onClick={() => handleChangeIndex(index)}
              width="15px"
              height="15px"
              margin="5px"
              key={index}
            />
          )
        )}
      </div>
    </>
  );
}
