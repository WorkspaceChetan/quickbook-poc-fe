import { Fragment } from "react";
import { Button } from "react-bootstrap";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

export const VendortTableRow = ({ prod, handleOpen, deleteusr }) => {
  const displayName = JSON.parse(prod.content).DisplayName;
  const companyName = JSON.parse(prod.content).CompanyName;

  return (
    <tr>
      <td> {prod.id} </td>
      <td> {displayName} </td>
      <td> {companyName} </td>
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
        <Button>Sync</Button>
      </td>
    </tr>
  );
};

const VendorTableRows = ({ data, handleOpen, deleteusr }) => {
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
            />
          </Fragment>
        ))}
    </>
  );
};

export default VendorTableRows;
