// src/pages/leaderboard/index.jsx

import React, { useState } from "react";
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

  const displayDonors = donors.slice(
    (page) => page * donorsPerPage,
    page * donorsPerPage
  );

  return (
    <>
      <Navbar />
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
                    <div className="flex flex-row items-center gap-8">
                      <Avatar alt={donor.name} src={donor.avatar_url} />
                      <div className="flex flex-col">
                        <p className="text-xl">{donor.name}</p>
                        <p className="opacity-80">{donor.user_id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <p className="text-xl">Rs.{donor.total_amount}</p>
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
