import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import axios from "axios";
import { Table } from "reactstrap";

const ListProduct = ({ productos, setProductos }) => {

  const deleteProduct = (id) => {
    axios.delete(`https://practicabackmongo-production.up.railway.app/api/product/${id}`)
      .then(() => {
        setProductos(productos.filter((pro) => pro._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get("https://practicabackmongo-production.up.railway.app/api/list")
        .then(({ data }) => {
          setProductos(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);

    return () => clearInterval(interval);
  }, [setProductos]);

  return (
    <>
    <center className="mt-3"></center>
      <h3  className="titulo" >Lista de Productos</h3>
      {productos.map((pro) => (




        <div className="mb-3 border rounded p-3" key={pro._id}>

<Table striped bordered hover>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Fecha de vencimiento</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{pro.name}</td>
          <td>{pro.price}</td>
          <td> {new Date(pro.expiry_date).toLocaleDateString()}</td>
          <FontAwesomeIcon icon={faTrash} className="cursor-pointer ms-2" onClick={() => deleteProduct(pro._id)} />
          <td></td>
        </tr>
     
      </tbody>
    </Table>

        </div>



      ))}
    </>
  );
};

export default ListProduct;