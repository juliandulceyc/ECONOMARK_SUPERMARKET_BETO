import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import DashboardStats from '../components/DashboardStats';
import SalesChart from '../components/SalesChart';
import RecentOrders from '../components/RecentOrders';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';

function Home() {
  const navigate = useNavigate()
  const fetchUser= async () => {     
    try{
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:3000/auth/home', {
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      })
      if(response.status === 201) {
        navigate('/login')
      }
      console.log(response)
    }catch(err){
      navigate('/login')
      console.log(err)
    }
  }
  
  useEffect(()=> {
    fetchUser()
  }, [])
  
  return (
    <div className="wrapper">
      <Row className="g-0">
        <Col md={2} className="sidebar-wrapper">
          <Sidebar />
        </Col>
        <Col md={10} className="main-content">
          <nav className="navbar navbar-expand-lg navbar-light bg-white px-4 py-3 shadow-sm">
            <div className="d-flex justify-content-between w-100 align-items-center">
              <h4 className="mb-0">Dashboard</h4>
              <div className="d-flex align-items-center">
                <div className="position-relative me-3">
                  <i className="bi bi-bell fs-5"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    3
                  </span>
                </div>
                <img
                  src="https://via.placeholder.com/40"
                  alt="Profile"
                  className="rounded-circle"
                />
              </div>
            </div>
          </nav>
          <Container fluid className="px-4 py-4">
            <DashboardStats />
            <SalesChart />
            <RecentOrders />
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default Home;