import { Box, CircularProgress, Typography } from "@mui/material";
import {
  CardContainer,
  PriceContainer,
  SalaryPercentage,
  SittingContainer,
} from "../Card/Card.style";
import { Card } from "../Card/Types";
import RatingComponent from "../Rating";
import { Button } from "../Button/Button.style";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart.actions";
import { useNavigate } from "react-router-dom";
import Img from "../common/Img";
import { AppState } from "../../redux/store";
import { notify } from "../../utils/helpers";
import { useCart } from "../../utils/hooks";
export default function ProdectCard({
  id,
  img,
  name,
  price,
  valueRating,
  discountValue,
  borderRadius,
  boxShadow,
}: Card) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isInCart = useCart(id as string);
  const [loading, setLoading] = useState(false);
  const { auth } = useSelector((state: AppState) => state);
  const result = useMemo(
    () => ((discountValue as number) / (price as number)) * 100,
    [price, discountValue]
  );

  const AddToCart = useCallback(() => {
    if (auth.isAuthenticated) {
      setLoading(true);
      dispatch(
        addToCart(id as string, 1, () => {
          setLoading(false);
        })
      );

      return;
    }

    notify("warning", "Please Login to add Item to The Cart");
  }, [dispatch, id, auth.isAuthenticated]);

  const handleClick = () => navigate(`/product/${id}`);

  return (
    <CardContainer boxShadow={boxShadow} borderRadius={borderRadius}>
      <div style={{ cursor: "pointer" }} onClick={handleClick}>
        <Box width="98%" m="auto" height="350px">
          <Img src={img} alt={name} width="100%" height="100%" />
        </Box>
        <div style={{ padding: "0 5%", }}>
          <Typography
            color="text.primary"
            my="15px"
            fontSize="24px"
            textAlign="center"
            height="75px"
          >
            {name}
          </Typography>
          <PriceContainer>
            <RatingComponent value={valueRating as number} isReadOnly={true} />
          </PriceContainer>

          <PriceContainer>
            {(discountValue as number) > 0 && (
              <Typography
                fontWeight="bold"
                fontSize="30px"
                sx={{
                  color: "#FC4059",
                }}
              >
                {((price as number) - (discountValue as number)).toFixed(2)}$
              </Typography>
            )}

            <Typography
              fontWeight="bold"
              fontSize="30px"
              color=" text.primary"
              sx={{
                textDecoration: discountValue ? "line-through" : "none",
              }}
            >
              {price?.toFixed(2)}$
            </Typography>
          </PriceContainer>
        </div>
      </div>
      <SittingContainer style={{ gap: "14px" }}>
        <Button
          color="secondary"
          width="324px"
          background="secondary"
          onClick={AddToCart}
          disabled={isInCart}
        >
          {isInCart ? (
            "In Cart"
          ) : loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Add to Cart"
          )}
        </Button>
      </SittingContainer>

      {(discountValue as number) > 0 && (
        <SalaryPercentage>- {result.toFixed(0)}%</SalaryPercentage>
      )}
    </CardContainer>
  );
}
