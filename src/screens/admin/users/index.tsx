import { Typography } from "@mui/material";
import { IColumn } from "../../../@types/table.types";
import Table from "../../../components/Table";
import { ContainerFull } from "../products/Products.styled";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Edit from "./Update";
import { AppState } from "../../../redux/store";
import { getAllUsers } from "../../../redux/actions/user.actions";
import Loading from "../../../components/Loading";

const columns: IColumn[] = [
  {
    name: "firstName",
    cellRenderer: (params) => `${params.data?.firstName}`,
  },
  {
    name: "lastName",
    cellRenderer: (params) => `${params.data?.lastName}`,
  },
  {
    name: "email",
  },
  {
    name: "isAdmin",
    cellRenderer: (params) => `${params.data.isAdmin === true ? "Yes" : "No"}`,

  },
  {
    name: "dateOfBirth",
    cellRenderer: (params) => new Date(params.value).toLocaleDateString("en-UK"),
  },
  {
    name: "actions",
    cellRenderer: "ActionsRenderer",
  },
];

function Users() {
  const {
    users: { allUsers, loading },
  } = useSelector((state: AppState) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    // (async () => {
    //   setUsers(await fetchAllUsers(pages || 10));
    // })();
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <ContainerFull>
      <Typography variant="h2" color="text.primary">
        Users
      </Typography>
      <div style={{ width: "100%", margin: "auto" }}>
        {loading ? <Loading /> :

          <Table
            data={allUsers}
            columns={columns}
            frameworkComponents={{
              ActionsRenderer: Edit,
            }}
            paginationPageSize={10}
          />
        }
      </div>
    </ContainerFull>
  );
}

export default Users;
