import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import { IColumn } from "../../../@types/table.types";
import { Button } from "../../../components/Button/Button.style";
import { Row } from "../../../components/GlobalStyles";
import Table from "../../../components/Table";
import { Container, ContainerFull } from "./Products.styled";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/store";
import Actions from "./components/Actions";
import { minimizeID } from "../../../utils/helpers";
import { getAllProducts } from "../../../redux/actions/products.actions";

const columns: IColumn[] = [
  {
    name: "ID",
    // cellRenderer: (params) => `${params.data?._id}`,
    cellRenderer: (params) => `${minimizeID(params.data?._id)}`,
  },
  {
    name: "Product Name",
    cellRenderer: (params) => `${params.data?.name}`,
  },
  {
    name: "Price",
    cellRenderer: (params) => `$${params.data?.price}`,
  },
  {
    name: "Category",
    cellRenderer: (params) => `${params.data?.categories?.[0]}`,
  },
  {
    name: "actions",
    cellRenderer: "ActionsRenderer",
  },
];

const Products = () => {
  const {
    products: { loading, allProducts },
  } = useSelector((state: AppState) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <ContainerFull>
      <Typography variant="h2" color="text.primary">
        Products
      </Typography>
      <Row justfiyContent="flex-end" width="100%">
        <Button
          disabled={loading}
          as={Link}
          sx={{ width: "fit-content", height: "fit-content", padding: "10px" }}
          to={"/products/new"}
        >
          {!loading ? (
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ paddingInline: "2em", textTransform: "capitalize" }}
            >
              Create Product
            </Typography>
          ) : (
            <CircularProgress size={20} color="inherit" />
          )}
        </Button>
      </Row>
      <div style={{ width: "100%", margin: "auto" }}>
        <Table
          data={allProducts}
          columns={columns}
          frameworkComponents={{
            ActionsRenderer: Actions,
          }}
          paginationPageSize={10}
        />
      </div>
    </ContainerFull>
  );
};

export default Products;
