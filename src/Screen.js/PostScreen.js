import React, { Component, useState } from 'react'
import { Form , Button, Image, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const PostScreen = (props) => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleError = () => {
    setOpen(true);
  };

  const handleClose = ()=>{
    setOpen(false);
  }

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  console.log("yesseeing",props)
  const history = useHistory();
    let data = props.location.post

    // if(!props.location.post){
    //   history.push("/");
    // }
    const request = data ? "put" : "post";

    const [fullname, setName] = useState(data ? data.fullname : "");
    const [address, setAddress] = useState(data? data.address:"");
    const [State, setState] = useState(data ? data.State:"");
    const [city, setCity] = useState(data ? data.city : "");
    const [success, setSuccess] = useState(false);
  
    useEffect(() => {

      if(success){
        props.history.push("/");
      }
      return () => {
        
      };
    }, [success])

    const submitHandler = async(e)=>{
      e.preventDefault();
      try{
        const formData = {
          fullname,
          address,
          State,
          city,
        }
        // console.log({formData});
        let resp="";
        if(request=="post"){
          resp = await axios.post("/api/employees",formData,{validateStatus:false})
          console.log("seeRespErr",resp)
          if(resp.data.success==false){
            handleError();
            setError(resp.data.errorMessage)
            return;
          }
          //  resp = await axios.post("https://sportscafe-test.herokuapp.com/api/employees",formData)

        }else{
          resp = await axios.put(`/api/employees/${data._id}`,formData,{validateStatus:false})

          if(resp.data.success==false){
            handleError();
            setError(resp.data.errorMessage)
            return;
          }
          //  resp = await axios.put(`https://sportscafe-test.herokuapp.com/api/employees/${data._id}`,formData)

        }
        if(!resp){
          console.log(resp);
          return;
        }
        
        // console.log("respinsepost",resp);
        setSuccess(true);

      }catch(err){

      }
    }

    return ( 
        <div className="">
            <p style= {{"margin-bottom":50}}>{request == "post" ?"Create Employee":"Edit Employee" }</p>
            <Form className="edit-form">
            <Form.Group className="mb-3" >
              <Form.Label>Full Name</Form.Label>
              <Form.Control className="mb-3" name="name" type="text" placeholder="Full Name" onChange={(e)=>setName(e.target.value)} value={fullname}/>
              <Form.Label>Address</Form.Label>
              <Form.Control className="mb-3" name="address" type="text" placeholder="Address" onChange={(e)=>setAddress(e.target.value)}  value={address}/>
            </Form.Group>
            <Form.Group as={Col} controlId="formState">
                                <Form.Label>State</Form.Label>
                                <Form.Control as="select" name="state" defaultValue={State} onChange={(e)=>setState(e.target.value)}>
                                <option></option>
                                    <option value="New Delhi">New Delhi</option>
                                    <option value="Bengaluru">Bengaluru</option>
                                    <option value="Hyderabad">Hyderabad</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                </Form.Control>
                            </Form.Group>
        
            <Form.Group className="mb-3 col" >
              <Form.Label>City</Form.Label>
              <Form.Control className="mb-3" type="text" name="city" onChange={(e)=>setCity(e.target.value)}  placeholder="City" value={city}/>
            </Form.Group>

            <Button onClick={submitHandler}>{data ? "Update" : "Add" }</Button>
        </Form>
        <Snackbar
            open={open}
            autoHideDuration={5000}
           onClose={handleClose}
            message={error}
            action={action}
          />
        </div>
     );
}
 
export default PostScreen;