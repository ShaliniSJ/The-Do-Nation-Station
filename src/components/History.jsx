import { useState, useEffect } from 'react';
import { getHistory } from '../lib/appwrite';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const History = () => {
    const [history, setHistory] = useState([]);
    const [nbRows, setNbRows] = useState(20);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getHistory();
                console.log("check", data);
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
        { field: 'donation', headerName: 'Donation Amount', width: 250 },
        {
            field: 'description',
            headerName: 'Description',
            flex: 1,
            renderCell: (params) => (
                <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </Box>
            ),
        },
    ];

    return (
        <Box sx={{ width: '70%', padding: '20px' }} className="ml-[15%]">
            <Typography variant="h4" component="h1" gutterBottom className="center text-center mb-10">
                Donation History
            </Typography>
            <DataGrid
                autoHeight
                rows={history.slice(0, nbRows)}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                getRowId={(row) => row.$id}
                sx={{
                    width: '1500px',
                    '& .MuiDataGrid-cell': {
                        textAlign: 'left',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#f5f5f5',
                        fontWeight: 'bold',
                    },
                }}
            />
        </Box>
    );
};

export default History;