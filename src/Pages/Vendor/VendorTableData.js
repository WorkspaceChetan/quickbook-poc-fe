import React, { useCallback, useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import VendorServices from "../../ApiServises/VendorServises";
import VendorModal from "./VendorModal";
import VendorTableRows from "./VendorRow";
import { toast } from "react-toastify";

function VendorTableData() {
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpen = useCallback((data) => {
    setOpen(true);
    if (data) setSelectedProduct(data);
    else setSelectedProduct(null);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setSelectedProduct(null);
  }, []);

  const fetchdata = async () => {
    const response = await VendorServices.getAll();
    if (response.status === 200) {
      setProduct(response.data.data);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  useEffect(() => {
    if (open === false) {
      fetchdata();
    }
  }, [open]);

  const addProduct = useCallback(
    (userData) => {
      if (userData) {
        const existingProducts = [userData, ...product];
        // existingProducts.splice(0, 0, userData);
        setProduct(JSON.parse(existingProducts));
      }
    },
    [product]
  );

  const editProduct = useCallback(
    (userData) => {
      if (userData) {
        const existingProducts = [...product];
        const index = existingProducts.findIndex((x) => x.id === userData.id);
        existingProducts[index] = userData;
        setProduct(JSON.parse(existingProducts));
      }
    },
    [product]
  );

  const deleteusr = async (id) => {
    try {
      const response = await VendorServices.delete(id);
      if (response.status === 200) {
        const existingProducts = [...product];
        const index = existingProducts.findIndex((x) => x.id === id);
        existingProducts.splice(index, 1);
        setProduct(existingProducts);
        toast.success(" Data Deleted Successfully", { autoClose: 3000 });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <div>
        <Button onClick={() => handleOpen()}>Add Vendor</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Vendor Name</th>
            <th> Company Name </th>
            <th>Family Name</th>
            <th>Print On Chek Name</th>
            <th>QB Data</th>
            <th>Edit</th>
            {/* <th>Delete</th> */}
            <th>Sync</th>
          </tr>
        </thead>
        <tbody>
          <VendorTableRows
            data={product}
            handleOpen={handleOpen}
            deleteusr={deleteusr}
            fetchData={fetchdata}
          />
        </tbody>
      </Table>
      <VendorModal
        open={open}
        product={selectedProduct}
        addProduct={addProduct}
        editProduct={editProduct}
        handleClose={handleClose}
      />
    </div>
  );
}

export default VendorTableData;
