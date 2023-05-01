import React, { memo, useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import VendorServices from "../../ApiServises/VendorServises";
import { toast } from "react-toastify";

function VendortModal(props) {
  const isEdit = Boolean(props.product);
  const [DisplayName, setDisplayName] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [FamilyName, setFamilyName] = useState("");
  const [PrintOnCheckName, setPrintOnCheckName] = useState("");

  useEffect(() => {
    async function getById() {
      if (isEdit) {
        const id = props.product.id;
        const resp = await VendorServices.getById(id);
        const content = resp.data.data.content;
        // console.log("getId", content);
        const AcData = JSON.parse(content);
        setDisplayName(AcData.DisplayName);
        setCompanyName(AcData.CompanyName);
        setFamilyName(AcData.FamilyName);
        setPrintOnCheckName(AcData.PrintOnCheckName);
        // console.log("AcData", AcData);
      }
    }
    if (props.open) getById();
  }, [props.open]);

  useEffect(() => {
    if (props.product) {
      setDisplayName(props.product.DisplayName);
      setCompanyName(props.product.CompanyName);
      setFamilyName(props.FamilyName);
      setPrintOnCheckName(props.PrintOnCheckName);
    } else {
      setDisplayName("");
      setCompanyName("");
      setFamilyName("");
      setPrintOnCheckName("");
    }
  }, [props.product]);

  const handleUpdate = async (e) => {
    const id = props.product.id;
    const data = { DisplayName, CompanyName, FamilyName, PrintOnCheckName };
    const response = await VendorServices.update({
      content: JSON.stringify(data),
      id,
    });

    if (response.status === 200) {
      toast.success("Data  Updated Successfully", { autoClose: 3000 });
      props.handleClose();
      props.editProduct(response.data);
    } else {
      toast.warning("Some thing Went Wrong", { autoClose: 3000 });
    }
  };

  const handleAdd = async (e) => {
    const data = {
      ...props.product,
      DisplayName,
      CompanyName,
      FamilyName,
      PrintOnCheckName,
    };
    const response = await VendorServices.add({
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
        <Modal.Title>{isEdit ? "Edit" : "Add"} Vendor</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSave}>
        <Modal.Body>
          <Form.Control
            type="text"
            name="DisplayName"
            placeholder="Enter Display Name"
            value={DisplayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            disabled={isEdit}
          />
          <br />
          <Form.Control
            type="text"
            name="CompanyName"
            placeholder="Enter Company Name"
            value={CompanyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
          <br />
          <Form.Control
            type="text"
            name="FamilyName"
            placeholder="Enter Family Name"
            value={FamilyName}
            onChange={(e) => setFamilyName(e.target.value)}
            required
          />
          <br />
          <Form.Control
            type="text"
            name="PrintOnCheckName"
            placeholder="Enter Print On Check Name"
            value={PrintOnCheckName}
            onChange={(e) => setPrintOnCheckName(e.target.value)}
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
export default memo(VendortModal);
