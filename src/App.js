import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row } from "reactstrap";
import ListProduct from "./ListProduct";
import FormProduct from './FormProduct';

function App() {
  const [pro, setPro] = useState([]);

  const cargaPro = () => {
    axios.get("https://practicabackmongo-production.up.railway.app/api/list").then(({ data }) => setPro(data));
  };

  useEffect(() => {
    cargaPro();
    const interval = setInterval(() => cargaPro(), 1 * 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <Container>
      <Row>
        <Col>
        <h2 className="titulo" >Practica Edisson Quinde - M5B</h2>
        <div className="center">
        <FormProduct/>
        </div>
          <ListProduct productos={pro} />
        </Col>
      </Row>
    </Container>
  </>
  );
}

export default App;