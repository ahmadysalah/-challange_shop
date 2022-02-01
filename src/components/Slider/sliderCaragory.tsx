import { useEffect, useMemo, useState } from "react";
import { autoPlay } from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";
import CategroyCard from "../CategroyCard";
import { Grid } from "@mui/material";
import { DotGroup, DotsItem } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/store";
import { getCategories } from "../../redux/actions/products.actions";
import Loading from "../common/Loading";
import { Categories, ICategory } from "../../@types/products.types";
import { useNavigate } from "react-router-dom";
import { formatCategory } from "../../utils/helpers";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function SliderCatagory() {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const navgate = useNavigate();

  const { loading, categories } = useSelector(
    (state: AppState) => state.products
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleChangeIndex = (index: number) => {
    setActiveStep(index);
  };
  const styles = {
    slideContainer: {
      padding: "0 60px",
    },
  };
  const handleNavgateCategory = (keyword: string) =>
    navgate(`/category/${keyword}`);

  const formattedCategories = useMemo(() => {
    return formatCategory(categories as ICategory[]);
  }, [categories]);

  return (
    <>
      <AutoPlaySwipeableViews
        interval={6000}
        index={activeStep}
        slideStyle={styles.slideContainer}
        onChangeIndex={handleChangeIndex}
        ignoreNativeScroll
        enableMouseEvents
        itemScope
        scrolling="auto"
      >
        {(formattedCategories as Categories[]).map((item_) => (
          <Grid
            key={item_.id}
            container
            md={12}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              margin: "auto",
            }}
          >
            {loading ? (
              <Loading />
            ) : (
              (item_.categories as ICategory[])?.map((item) => (
                <Grid key={item.name} item md={2.4}>
                  <CategroyCard
                    onClick={() => handleNavgateCategory(item.name as string)}
                    img={item.image}
                    name={item.name}
                  />
                </Grid>
              ))
            )}
          </Grid>
        ))}
      </AutoPlaySwipeableViews>
      <DotGroup>
        {Array.from(Array(formattedCategories.length)).map((_, index) => (
          <DotsItem
            active={activeStep === index}
            onClick={() => handleChangeIndex(index)}
            width="15px"
            height="15px"
            margin="5px"
            key={index}
          />
        ))}
      </DotGroup>
    </>
  );
}
