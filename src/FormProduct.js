import React, { useState } from 'react';
import axios from 'axios';
import { FormGroup, Label, Input, Button } from 'reactstrap';

const FormProduct = () => {
  const [product, setProduct] = useState({ name: '', price: '', expiry_date: '' });

  const handleInputChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://practicabackmongo-production.up.railway.app/api/product', product)
      .then((response) => {
        console.log(response);
        setProduct({ name: '', price: '', expiry_date: '' });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mb-3 border rounded p-3 mt-2">
      <h3  className="titulo" >Agregar Producto</h3>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Nombre:</Label>
          <Input type="text" name="name" id="name" value={product.name} onChange={handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="price">Precio:</Label>
          <Input type="number" name="price" id="price" value={product.price} onChange={handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="expiry_date">Fecha de expiración:</Label>
          <Input type="date" name="expiry_date" id="expiry_date" value={product.expiry_date} onChange={handleInputChange} />
        </FormGroup>
        <Button type="submit" color="primary">Agregar</Button>
      </form>
    </div>
  );
};

export default FormProduct;