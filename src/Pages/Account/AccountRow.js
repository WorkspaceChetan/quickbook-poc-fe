import { Fragment, useCallback } from "react";
import { Button } from "react-bootstrap";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import TokenServices from "./../../ApiServises/TokenService";
import { toast } from "react-toastify";

export const AccountTableRow = ({ prod, handleOpen, deleteusr, fetchdata }) => {
  const content = JSON.parse(prod.content);
  const accountName = content.Name;
  const accountType = content.AccountType;
  const Description = content.Description;
  const AccountAlias = content.AccountAlias;
  const qbData = prod.qb_data;
  const { id } = prod;

  const syncCb = useCallback(async () => {
    // console.log("fetchData", fetchData);
    const tokenid = localStorage.getItem("tokenid");
    const resp = await TokenServices.sync("account", id, tokenid);
    if (!resp.data.isError) {
      toast.success("Data  Synced Successfully", { autoClose: 3000 });
      fetchdata();
    } else {
      toast.error(resp.data.message, { autoClose: 3000 });
    }
    console.log(resp.data);
  }, [id]);

  return (
    <tr>
      <td> {prod.id} </td>
      <td> {accountName} </td>
      <td> {accountType} </td>
      <td>{Description}</td>
      <td>{AccountAlias}</td>
      <td>
        <pre className="max-pre">{qbData}</pre>
      </td>
      <td>
        <Button
          variant="primary"
          onClick={() => handleOpen(prod)}
          style={{ borderRadius: "20px" }}
        >
          <FaRegEdit style={{ marginBottom: "5px" }} />
        </Button>
      </td>
      {/* <td>
        <Button
          variant="danger"
          onClick={() => deleteusr(prod.id)}
          style={{ borderRadius: "20px" }}
        >
          <FaRegTrashAlt style={{ marginBottom: "5px" }} />
        </Button>
      </td> */}
      <td>
        <Button onClick={syncCb}>Sync</Button>
      </td>
    </tr>
  );
};

const AccountTableRows = ({ data, handleOpen, deleteusr, fetchdata }) => {
  return (
    <>
      {data &&
        data.length > 0 &&
        data.map((prod, index) => (
          <Fragment key={index}>
            <AccountTableRow
              prod={prod}
              handleOpen={handleOpen}
              deleteusr={deleteusr}
              fetchdata={fetchdata}
            />
          </Fragment>
        ))}
    </>
  );
};

export default AccountTableRows;
