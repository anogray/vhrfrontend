import React, { Component, useState } from 'react'
import { Form , Button, Image, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const SeeEmployee = (props) => {
  const history = useHistory();
  let data = props.location.post
  let {id} = props.match.params

    const [fullname, setName] = useState(data ? data.fullname : "");
    const [address, setAddress] = useState(data? data.address:"");
    const [State, setState] = useState(data ? data.State:"");
    const [city, setCity] = useState(data ? data.city : "");
  

    useEffect(()=>{
    
      if(!data){
        const getEmployee = async()=>{
          const resp = await axios.get(`/api/employees/${id}`);
          if(resp.data.success){
            setName(resp.data.Post.fullname);
            setAddress(resp.data.Post.address);
            setState(resp.data.Post.State);
            setCity(resp.data.Post.city);
          }
        }
        getEmployee();
      }
    },[data])

    return ( 
        <div className="" >
            <p style={{"margin-bottom":50}}>View Employee Details</p>
            <Form className="edit-form">
            <Form.Group className="mb-3" >
              <Form.Label>Full Name</Form.Label>
              <Form.Control className="mb-3" name="name" type="text" placeholder="Full Name" value={fullname} readOnly/>
              <Form.Label>Address</Form.Label>
              <Form.Control className="mb-3" name="address" type="text" placeholder="Address" value={address} readOnly/>
            </Form.Group>
            <Form.Group as={Col} controlId="formState">
                                <Form.Label>State</Form.Label>
                                <Form.Control as="select" name="state" value={State} readOnly>
                                <option></option>
                                    <option value="New Delhi">New Delhi</option>
                                    <option value="Bengaluru">Bengaluru</option>
                                    <option value="Hyderabad">Hyderabad</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                </Form.Control>
                            </Form.Group>
        
            <Form.Group className="mb-3 col" >
              <Form.Label>City</Form.Label>
              <Form.Control className="mb-3" type="text" name="city" placeholder="City" value={city} readOnly/>
            </Form.Group>
        </Form>
        </div>
     );
}
 
export default SeeEmployee;