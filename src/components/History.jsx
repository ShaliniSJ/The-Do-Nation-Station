import { useState, useEffect } from 'react';
import { getHistory } from '../lib/appwrite';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const History = () => {
    const [history, setHistory] = useState([]);
    const [nbRows, setNbRows] = useState(20);

    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Date(dateString).toLocaleString("en-US", options);
    };

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getHistory();
                setHistory(data); // Assuming getHistory returns an array of documents
            } catch (error) {
                console.error('Failed to fetch history:', error);
            }
        };

        fetchHistory();
    }, []);

    const columns = [
        { field: 'organisation_name', headerName: 'Organization Name', width: 250 },
        { field: 'donor_name', headerName: 'Donor Name', width: 250 },
        { field: 'donation_amt', headerName: 'Donation Amount', width: 250 },
        { field: '$createdAt', headerName: 'Date', width: 250, renderCell: (params) => (
            <Box>
                {formatDate(params.value)}
            </Box>
        ), },
        // {
        //     field: 'kind_description',
        //     headerName: 'Description',
        //     flex: 1,
        //     renderCell: (params) => (
        //         <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
        //             {params.value}
        //         </Box>
        //     ),
        // },
    ];

    return (
        <Box 
            sx={{ 
                width: '90%', 
                maxWidth: '1200px', 
                margin: '0 auto', // Center align
                padding: '20px',
                overflowX: 'auto', // Handle overflow for horizontal scrolling
            }} 
            className="ml-auto mr-auto"
        >
            <Typography variant="h4" component="h1" gutterBottom className="text-center mb-10">
                Donation History
            </Typography>
            <div style={{ height: 600 }}> {/* Increased height for DataGrid */}
                <DataGrid
                    rows={history.slice(0, nbRows)}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20, 50, 100]} // Added options for rows per page
                    disableSelectionOnClick
                    getRowId={(row) => row.$id}
                    sx={{
                        '& .MuiDataGrid-cell': {
                            textAlign: 'left',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#f5f5f5',
                            fontWeight: 'bold',
                        },
                        // Ensure the DataGrid does not overflow
                        width: '100%',
                        maxWidth: '100%',
                        height: '100%',
                        '& .MuiDataGrid-footerContainer': {
                            display: 'flex',
                            justifyContent: 'center', // Center the pagination controls
                            backgroundColor: '#f5f5f5',
                        },
                        '& .MuiDataGrid-footer': {
                            borderTop: 'none',
                        },
                    }}
                />
            </div>
        </Box>
    );
};

export default History;
