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
// import 'tailwindcss/tailwind.css';

const fakeDonors = [
  {
    id: 1,
    name: "Alice Johnson",
    user_id: "alice123",
    avatar_url: "https://randomuser.me/api/portraits/women/1.jpg",
    total_amount: 50000,
  },
  {
    id: 2,
    name: "Bob Smith",
    user_id: "bob_smith",
    avatar_url: "https://randomuser.me/api/portraits/men/1.jpg",
    total_amount: 45000,
  },
  // Add more fake donors as needed
];

const Leaderboard = () => {
  const [donors, setDonors] = useState([
    ...fakeDonors,
    ...fakeDonors,
    ...fakeDonors,
    ...fakeDonors,
    ...fakeDonors,
    ...fakeDonors,
  ]);
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
        setIsLogged(Boolean(islogged));
      }

      if (isLogged) {
        setShowAfterLogin(true);
        try {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
          setIsdonor(user.is_donor)
          // setIsdonor(true)
          
        } catch (error) {
          console.error('Failed to fetch current user:', error);
        }
      }
    };
  
  
    // Call the async function
    fetchUserData();
  }, [isLogged]);

  const displayDonors = donors.slice(
    (page) => page * donorsPerPage,
    page * donorsPerPage
  );

  return (
    <>
      <Navbar islogged={isLogged}  isdonor={isdonor} user={user}/>
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
                    <a
                      href={`/donor/${donor.user_id}`}
                      className="flex flex-row items-center gap-4 md:gap-8"
                    >
                      <Avatar alt={donor.name} src={donor.avatar_url} />
                      <div className="flex flex-col">
                        <p className="text-lg md:text-xl">{donor.name}</p>
                        <p className="opacity-80">{donor.user_id}</p>
                      </div>
                    </a>
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
