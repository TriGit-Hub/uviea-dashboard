/**
=========================================================
* UVIECA React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// UVIECA React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// UVIECA React examples
// import DataTable from "examples/Tables/DataTable";
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";    
import { PinDropSharp } from "@mui/icons-material";
// Data



function Projects(props) {
  // const { columns, rows } = data();
  const [menu, setMenu] = useState(null);
  const [selectedProduct1, setSelectedProduct1] = useState(null);
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  const [products, setProducts] = useState([]);
  const columns = [
      {field: 'nombre', header: 'Nombre'},
      {field: 'email', header: 'Correo'},
      {field: 'telefono', header: 'Telefono'},
      {field: 'nit', header: 'Nit'},
      {field: 'createdAt', header: 'Fecha de Creacion'},
  
      
      
    
      
  ];

  useEffect(() => {
    fetch('http://137.184.125.192:3000/cliente/todos')
    .then(response => response.json())
    .then(data => setProducts(data.data));
}, []); // eslint-disable-line react-hooks/exhaustive-deps

const requestPdfFiller = (e) => {
  
  fetch('http://192.168.1.21:3000/archivo/formularioSolicitud/obtener', {
     method: 'POST',
     body: JSON.stringify({
      "razonSocial": e.nombre,
      "nit" : e.nit,
      "ncr" : e.nrc,
     "actividadEconomica" : e.act_economica,
      "email":e.email,
      "telefono":e.telefono
     }),
     headers: {
        'Content-type': 'application/json; charset=UTF-8',
     },
  })
     .then((res) => res.json())
     .then((post) => {
      
     downloadPDF(post.data,e)
     })
     .catch((err) => {
        console.log(err.message);
     });
};

function downloadPDF(pdf,e) {
  const linkSource = `data:application/pdf;base64,${pdf}`;
  const downloadLink = document.createElement("a");
  const fileName = e.nombre+".pdf";

  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}

const imprimir = (e) =>{
  console.log(e);
  requestPdfFiller(e);
} 
// no se esta usando el ojetivo era que se llenara on la informaion del liente par amostarla antes de imprimirla
const Form = () => {
  const [values, setValues] = useState({ name: '', email: '', message: '' });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
  };



  return (
    <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form style={{  background: '#f2f2f2', borderRadius: '5px' }}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input type="text" id="phone" name="phone" />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input type="text" id="state" name="state" />
        </div>
        <div>
          <label htmlFor="zip">Zip:</label>
          <input type="text" id="zip" name="zip" />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input type="text" id="country" name="country" />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message"></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div></MDBox>
  );
};


const dynamicColumns = columns.map((col,i) => {
  return <Column on key={col.field} field={col.field} header={col.header} />;
  <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>;
});

const searchBodyTemplate = () => {
  return "imprimir";
};

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Opcion a futuro 1</MenuItem>
      <MenuItem onClick={closeMenu}>Opcion a futuro 2</MenuItem>
      <MenuItem onClick={closeMenu}>Opcion a futuro 3</MenuItem>
    </Menu>
  );

  return (
    <Card>
      {props.state == 1 && 
         <><MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <MDBox>
            <MDTypography variant="h6" gutterBottom>
              Solicitudes recientes
            </MDTypography>
            {/* <MDBox display="flex" alignItems="center" lineHeight={0}>
      <Icon
        sx={{
          fontWeight: "bold",
          color: ({ palette: { info } }) => info.main,
          mt: -0.5,
        }}
      >
        done
      </Icon>
      <MDTypography variant="button" fontWeight="regular" color="text">
        &nbsp;<strong>30 done</strong> this month
      </MDTypography>
    </MDBox> */}
          </MDBox>
          <MDBox color="text" px={2}>
            <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
              more_vert
            </Icon>
          </MDBox>
          {renderMenu}
        </MDBox><MDBox>
            <DataTable value={products} selectionMode="single" selection={selectedProduct1} onSelectionChange={e => imprimir(e.value)} dataKey="id" responsiveLayout="scroll">
              {dynamicColumns}
              <Column  header="Descargar" headerStyle={{ width: '4rem' }} body={searchBodyTemplate}></Column>
            </DataTable>
          </MDBox></>
      }
       {/* {props.state == 2 && 
         <><Form/></>
      } */}
    </Card>
  );
}

export default Projects;
