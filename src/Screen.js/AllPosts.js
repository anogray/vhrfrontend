import React, {  useEffect, useState } from 'react'
import axios from "axios";
import { Button, Card, Form, Modal, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import InfiniteScrollMe from 'react-infinite-scroll-component';

const AllPosts = () => {

    const [posts, setPosts] = useState([])
    const[pagesize, setPageSize] = useState(0);
    const [openmodal, setModal] = useState(false);
    const [lastloading,setLastLoading] = useState(false);
    const[pageno, setPageNo] = useState(0);

   const [url, setUrl] = useState(`http://localhost:3002/api/employees/all/?skip=${0}`)
    // const [url, setUrl] = useState(`https://sportscafe-test.herokuapp.com/api/employees/all/?skip=${0}`)
    const[delPost, setDeletePost] = useState(false);
    const[delShow,setdelShow] = useState("");

    const handleClose = ()=>{setdelShow("")};
    
    const DelModal = ({delShow})=>{
      
      const getUser = posts.filter((prev)=>prev._id===delShow.id)[0];
      
      return (
        delShow.delPost && <Modal show={delShow} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Deleting Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form className="edit-form">
            <Form.Group className="mb-3" >
              <Form.Label>Full Name</Form.Label>
              <Form.Control className="mb-3" name="name" type="text" placeholder="Full Name" value={getUser.fullname} readOnly/>
              <Form.Label>Address</Form.Label>
              <Form.Control className="mb-3" name="address" type="text" placeholder="Address" value={getUser.address} readOnly/>
            </Form.Group>
            <Form.Group as={Col} controlId="formState">
                                <Form.Label>State</Form.Label>
                                <Form.Control as="select" name="state" value={getUser.State} readOnly>
                                <option></option>
                                    <option value="New Delhi">New Delhi</option>
                                    <option value="Bengaluru">Bengaluru</option>
                                    <option value="Hyderabad">Hyderabad</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                </Form.Control>
                            </Form.Group>
        
            <Form.Group className="mb-3 col" >
              <Form.Label>City</Form.Label>
              <Form.Control className="mb-3" type="text" name="city" placeholder="City" value={getUser.city} readOnly/>
            </Form.Group>
        </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>handleDel(delShow.id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      )
    }

    const handleDel=(id)=>confirmDeletePost(id)

    const mUrl  = "http://localhost:3002/api/employees/all/?skip="

    useEffect(()=>{
      const getData = async()=>{
        const resp = await axios.get(`${mUrl}${pageno}`);
        console.log("gettingresult",resp)
        setPosts(resp.data.posts);
        setPageSize(resp.data.size);
      }
      getData();
      return (()=>setPosts([]));
    },[])

    const allPosts = async()=>{
              try{
                // console.log("seeing",pagesize,posts.length)
                if(pagesize<=posts.length) {                 
                  setLastLoading(false);
                  return;
                }
                setLastLoading(true);

              const resp = await axios.get(`${mUrl}${pageno+1}`);
                
              setPageNo(pageno+1);
              setLastLoading(false);


                // console.log({resp});
                setPosts([...posts,...resp.data.posts]);
                //
                
              }catch(err){
              console.log("useffect err",err);
              }
    }
    

    const deletePost = async(id)=>{
      try{
        setdelShow({show:true, id:id,delPost:true});
      }catch(err){
        console.log(err);
      }

    }

    const confirmDeletePost = async(id)=>{
      try{
        console.log("confirmDel",id)
        const resp = await axios.delete(`/api/employees/${id}`)
       // setDeletePost(true);
        if(resp.data.success){
          let prev = posts.filter((prev)=>prev._id!=id)
          handleClose();
          setPosts(prev);
        }
      }catch(err){
        console.log(err);
      }

    }


    return ( 
        <div className="posts-container">
            All Employees
            <div className="article-container">
            
            <Link to = "/employee" ><div className="add-Button"><Button style={{"margin-bottom":10, "margin-top":10}}>Add an Employee</Button></div></Link>
            <div className="article-padding">
          
            {/* <div className="loader" key={0}>
                  Loading ...
                </div> */}
            <InfiniteScrollMe
            dataLength={posts.length}
            next={allPosts}
            hasMore={true}
            loader={lastloading ? <div className="loader" key={0}>
                  Loading ...
                </div> : <></>}
            style={{
              overflow:"initial"
            }}
            >
            
                {posts.length ? posts.map((post)=>
                    (<div className="article" key={post._id}>
                            <div className="article-post">                                
                                <div className="feature-buttons">
                                <Link to={{pathname: `/seeEmployee/${post._id}`,
                                post}}>
                                <Button className="style-btn">Read</Button></Link>
                                <Link to={{pathname: `/employee/${post._id}`,
                                post}}>
                                <Button className="style-btn">Edit</Button></Link>
                                <Button className="style-btn" onClick={(e)=>deletePost(post._id)}>Delete</Button>

                                </div>
                            </div>
                            <div className="article-body">


                                <div className="fullname">
                                
                                <p>{post.fullname}</p>
                                
                                </div>
                                <div className="address">
                                <p>{post.address}</p>
                                </div>
                                <div className="State">
                                 {post.State}
                                </div>
                                <div className="city">
                                <p>{post.city}</p>
                                </div>

                            </div>
                    </div>)
                    ) : <div>No Content</div>
                }
            </InfiniteScrollMe>
                
            </div>
            {delShow.show? <DelModal delShow={delShow}/>:""}
          </div>
        
        </div>
     );
}
 
export default AllPosts;