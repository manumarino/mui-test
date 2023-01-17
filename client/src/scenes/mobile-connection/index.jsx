import React, {useState} from 'react';
import {
  Box,
  Button,
  useTheme
} from "@mui/material";
import DebModal from 'components/DebModal';

const apiCall = (data)=> {
  return new Promise((resolve, reject)=>{
    setTimeout(()=> {
      resolve("Data de la api: " + data);
    }, 3000)
  });
  }



const MobileConnection = () => {
  const myRequest = new Request('https://jsonplaceholder.typicode.com/users');
  const [open, setOpen] = useState(false);
  const openModal = ()=>{
    setOpen(true);
  }
  const closeModal = ()=>{
    setOpen(false);
  }

  //hacemos cosas cuando se aprieta confirmar
  const handleConfirm = ()=> {
    // aca podemos hacer alguna tarea asyncronica y devolvemos una promesa
    return apiCall(myRequest).then((response) => {
      alert("Recibimos esta response: " + response);
      // y talvez queremos cerrar el modal
      //closeModal();
    })
  }

 
  const handleReject = ()=> {
    // hacemos cosas cuando se aprieta rechazar
    alert("rechazaste el modal")
    // pero esta vez no lo cerramos
  }


  return (
  <Box>
    <Button onClick={openModal} variant="contained">Modal asyncronico</Button>
    <DebModal
    open={open}
    onClose={closeModal}
    onConfirm={handleConfirm}
    onReject={handleReject}
    onResponse={closeModal}
    >Esta seguro de hacer esta accion?</DebModal>
  </Box>
  );
}

export default MobileConnection;



 