import { Fragment, useCallback } from "react";
import { Button } from "react-bootstrap";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import TokenServices from "./../../ApiServises/TokenService";
import { toast } from "react-toastify";

export const VendortTableRow = ({ prod, handleOpen, deleteusr, fetchData }) => {
  const content = JSON.parse(prod.content);
  const displayName = content.DisplayName;
  const companyName = content.CompanyName;
  const familyName = content.FamilyName;
  const printOncheckName = content.PrintOnCheckName;
  const qbData = prod.qb_data;
  const { id } = prod;

  const syncCb = useCallback(async () => {
    const tokenid = localStorage.getItem("tokenid");
    const resp = await TokenServices.sync("vendor", id, tokenid);
    if (!resp.data.isError) {
      toast.success("Data  Synced Successfully", { autoClose: 3000 });
      await fetchData();
    } else {
      toast.error(resp.data.message, { autoClose: 3000 });
    }
  }, [id]);

  return (
    <tr>
      <td> {prod.id} </td>
      <td> {displayName} </td>
      <td> {companyName} </td>
      <td>{familyName}</td>
      <td>{printOncheckName}</td>
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
      <td>
        <Button
          variant="danger"
          onClick={() => deleteusr(prod.id)}
          style={{ borderRadius: "20px" }}
        >
          <FaRegTrashAlt style={{ marginBottom: "5px" }} />
        </Button>
      </td>
      <td>
        <Button onClick={syncCb}>Sync</Button>
      </td>
    </tr>
  );
};

const VendorTableRows = ({ data, handleOpen, deleteusr, fetchData }) => {
  return (
    <>
      {data &&
        data.length > 0 &&
        data.map((prod, index) => (
          <Fragment key={index}>
            <VendortTableRow
              prod={prod}
              handleOpen={handleOpen}
              deleteusr={deleteusr}
              fetchData={fetchData}
            />
          </Fragment>
        ))}
    </>
  );
};

export default VendorTableRows;
