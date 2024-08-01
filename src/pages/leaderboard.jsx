// src/pages/leaderboard/index.jsx

import React, { useState,useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Pagination,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { getLeaderBoard } from "../lib/appwrite";
// import 'tailwindcss/tailwind.css';


const Leaderboard = () => {
  const [donors, setDonors] = useState([]);
  const [page, setPage] = useState(1);
  const donorsPerPage = 9;
  const totalPages = Math.ceil(donors.length / donorsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const [showAfterLogin, setShowAfterLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isdonor,setIsdonor]=useState(false);

  useEffect(() => {
    // Define an async function to handle the async operation
    const fetchUserData = async () => {
      if (typeof window !== 'undefined') {
        const islogged = localStorage.getItem('islogged');
        if(islogged === 'true') {
          setIsLogged(true);
        }
        else{
          setIsLogged(false);
        }
      }
    };

  
    // Call the async function
    fetchUserData();
  }, [isLogged]);
  useEffect(async()=>{
      setDonors(await getLeaderBoard())
  },[])

  const displayDonors = donors.slice(
    (page) => page * donorsPerPage,
    page * donorsPerPage
  );

  return (
    <>
      <Navbar islogged={isLogged}   />
      <Container>
        <h1 className="text-3xl font-bold text-center my-8">Top Donors</h1>
        <TableContainer component={Paper}>
          <Table>
            {/* <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Total Amount</TableCell>
              </TableRow>
            </TableHead> */}
            <TableBody>
              {displayDonors.map((donor) => (
                <TableRow key={donor.id}>
                  <TableCell>
                      <Avatar alt={donor.name} src={donor.avatar_url} />
                      <div className="flex flex-col">
                        <p className="text-lg md:text-xl">{donor.name}</p>
                      </div>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <p className="text-lg md:text-xl">
                      Rs.{donor.total_amount}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex justify-center my-8">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
          />
        </div>
      </Container>
    </>
  );
};

export default Leaderboard;
