import { Fragment } from "react";
import { Button } from "react-bootstrap";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

export const AccountTableRow = ({ prod, handleOpen, deleteusr }) => {
  const accountName = JSON.parse(prod.content).Name;
  const accountType = JSON.parse(prod.content).AccountType;

  return (
    <tr>
      <td> {prod.id} </td>
      <td> {accountName} </td>
      <td> {accountType} </td>
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

const AccountTableRows = ({ data, handleOpen, deleteusr }) => {
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
            />
          </Fragment>
        ))}
    </>
  );
};

export default AccountTableRows;
