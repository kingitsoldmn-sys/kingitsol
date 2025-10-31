
import React, { useEffect, useState, useRef} from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import neuclearmissile from "../../assets/img/nuclearmissle.png";
import {FaEnvelope,FaLocationArrow, FaPhone} from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import axios from 'axios';

function ContactUs() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [subject,setSubject] = useState('');
  const [message,setMessage] = useState('');
  const [cv,setCv] = useState();
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [cvError, setCvError] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() =>{
    if(name && nameError) {
      setNameError(false);
    }
  },[name]);

  useEffect(() =>{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email && re.test(String(email).toLowerCase() || emailError)) {
      setEmailError(false);
    }
  },[email]);

  useEffect(() =>{
    if(subject && subjectError) {
      setSubjectError(false);
    }
  },[subject]);

  useEffect(() =>{
    if(message && messageError) {
      setMessageError(false);
    }
  },[message]);

  useEffect(() =>{
    if(cvError) {
      setCvError(false);
    }
  },[cv])
  function contact() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if(!name) {
      setNameError(true);
      return;
    } else if(!email || !re.test(String(email).toLocaleLowerCase())) {
      setEmailError(true);
      return;
    } else if(!subject) {
      setSubjectError(true);
      return;
    } else if(!message) {
      setMessageError(true);
      return;
   } //else if(!cv) {
    //     setCvError(true);
    //     return;
     
    // }
    
    let formData = new FormData();
    formData.append('name',name);
    formData.append('email',email);
    formData.append('subject',subject);
    formData.append('message',message);
    cv && formData.append('cv',cv);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    try{
     axios.post('http://localhost:3000/contacts/create',formData,config).then((res) =>{
      console.log(res);
      if(res.status === 200) {
        toast.success("Congratulations, your application has been sent!");
      }
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // 🔹 Reset file input manually
      }
    });
  }catch(err) {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    toast.error('Cannot send your information, please try again!');
  }
  }
  return (
    <section id="contact" className="contact">
    
      <Container data-aos="fade-up">
        <div className="section-title">
          <h3>Contact Us</h3>
        </div>

        <Row data-aos="fade-up" data-aos-delay="100">
          <Col lg={6}>
            <div className="info-box mb-4">
              <FaLocationArrow/>
              <h3>Our Address</h3>
              <p>M9F Block A Military Accounts Society College Road Lahore</p>
            </div>
          </Col>
          <Col lg={3} md={6}>
            <div className="info-box mb-4">
              <FaEnvelope/>
              <h3>Email Us</h3>
              <p>info@kingitsol.com</p>
              <p>order@kingitsol.com</p>
              <p>career@kingitsol.com</p>
            </div>
          </Col>
          <Col lg={3} md={6}>
            <div className="info-box mb-4">
              <FaPhone/>
              <h3>Call Us</h3>
              <p>+92 320 7545617</p>
              <p>+92 300 6521781</p>
            </div>
          </Col>
        </Row>

        <Row data-aos="fade-up" data-aos-delay="100">
          <Col lg={6} style={{ marginTop: '6%' }}>
            <img src={neuclearmissile} width="70%" height="80%" alt="nuclear missile" />
          </Col>

          <Col lg={6}>
            <Form action="" method="post" encType="multipart/form-data">
              <Row>
                <Col className="form-group">
                  <Form.Control onChange={(event)=>{
                    // event.preventDefault();
                    setName(event.target.value);
                  }} type="text" name="name" id="name" placeholder="Your Name" value={name} required style={{border: nameError && '2px solid deeppink'}} />
                  {
                    nameError && <p style={{color:'deeppink'}}>Enter your full name</p>
                  }
                </Col>
                <Col className="form-group">
                  <Form.Control value={email} onChange={(event)=>{
                    // event.preventDefault();
                    setEmail(event.target.value);
                  }} type="email" name="email" id="email" placeholder="Your Email" required style={{border: emailError && '2px solid deeppink'}}/>
                  {
                    emailError && <p style={{color:'deeppink'}}>Enter a valid email address</p>
                  }
                </Col>
              </Row>
              <div className="form-group main_input" style={{ marginTop: '20px' }}>
                <Form.Control value={subject} onChange={(event)=>{
                  // event.preventDefault();
                  setSubject(event.target.value);
                }} type="text" name="subject" id="subject" placeholder="Subject" required  style={{border: subjectError && '2px solid deeppink'}}/>
               {
                subjectError && <p style={{color:'deeppink'}}>Enter a subject</p>
              }
              </div>
             
              <div className="form-group main_input" style={{ marginTop: '20px' }}>
                <Form.Control value={message} onChange={(event)=>{
                  // event.preventDefault();
                  setMessage(event.target.value);
                }} as="textarea" name="message" rows={5} placeholder="Message" required style={{border: messageError && '2px solid deeppink'}} />
                {
                  messageError && <p style={{color:'deeppink'}}>Enter a message</p>
                }
              </div>
              <div className="form-group main_input" style={{ marginTop: '20px' }}>
                <Form.Label htmlFor="cv" style={{ marginTop: '10px' }}>
                  Attach File : <span>(upload only PDF File)</span>{' '}
                </Form.Label>
                <Form.Control ref={fileInputRef}  onChange={(event)=>{
                  // event.preventDefault();
                  if(event.target.files){
                    console.dir(event.target.files[0]);
                    setCv(event.target.files[0]);
                  }
                }} type="file" accept='application/pdf' name="cv" id="cv" style={{border: cvError &&  '2px solid deeppink'}} />
                {
                  cvError && <p style={{color:'deeppink'}}>Upload your cv</p>
                }
              </div>
              <div className="form-group main_input" style={{ marginTop: '20px' }}>
                <Button variant="primary" onClick={(event)=>{
                  event.preventDefault();
                  contact();
                }} type="submit" name="submit" id="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </section>
  );
}

export default ContactUs;
