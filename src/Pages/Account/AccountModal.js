import React, { memo, useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import AccountServices from "../../ApiServises/AccountServices";
import { toast } from "react-toastify";

function AccounttModal(props) {
  const isEdit = Boolean(props.product);
  const [Name, setName] = useState("");
  const [AccountType, setAccountType] = useState("");

  useEffect(() => {
    async function getById() {
      if (isEdit) {
        const id = props.product.id;
        const resp = await AccountServices.getById(id);
        const content = resp.data.data.content;
        // console.log("getId", content);
        const AcData = JSON.parse(content);
        setName(AcData.Name);
        setAccountType(AcData.AccountType);
        // console.log("AcData", AcData);
      }
    }
    if (props.open) getById();
  }, [props.open]);

  useEffect(() => {
    if (props.product) {
      setName(props.product.Name);
      setAccountType(props.product.AccountType);
    } else {
      setName("");
      setAccountType("");
    }
  }, [props.product]);

  const handleUpdate = async (e) => {
    const id = props.product.id;
    const data = { Name, AccountType };
    const response = await AccountServices.update({
      content: JSON.stringify(data),
      id,
    });

    if (response.status === 200) {
      toast.success("Data  Updated Successfully", { autoClose: 3000 });
      props.handleClose();
      props.editProduct(response.data);
    } else {
      props.handleClose();
      toast.warning("Some thing Went Wrong", { autoClose: 3000 });
    }
  };

  const handleAdd = async (e) => {
    const data = { ...props.product, Name, AccountType };
    const response = await AccountServices.add({
      content: JSON.stringify(data),
    });
    if (response.status === 200) {
      toast.success("Data  Added Successfully", { autoClose: 3000 });
      props.handleClose();
      props.addProduct(response.data);
    } else {
      props.handleClose();
      toast.warning("Some thing Went Wrong", { autoClose: 3000 });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (isEdit) handleUpdate();
    else handleAdd();
  };

  return (
    <Modal show={props.open}>
      <Modal.Header closeButton onClick={props.handleClose}>
        <Modal.Title>{isEdit ? "Edit" : "Add"} Account</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSave}>
        <Modal.Body>
          <Form.Control
            type="text"
            name="Name"
            placeholder="Enter Account Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br />
          <Form.Control
            type="text"
            name="AccountType"
            placeholder="Enter Account Type"
            value={AccountType}
            onChange={(e) => setAccountType(e.target.value)}
            required
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            {isEdit ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
export default memo(AccounttModal);
