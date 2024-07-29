import { useState, useEffect } from 'react';
import { getHistory } from '../lib/appwrite';
import { Box, Button, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const History = () => {
    const [history, setHistory] = useState([]);
    const [nbRows, setNbRows] = useState(10);

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

    // const removeRow = () => setNbRows((x) => Math.max(0, x - 1));
    // const addRow = () => setNbRows((x) => Math.min(history.length, x + 1));

    const columns = [
        { field: 'organisation_name', headerName: 'Organization Name', width: 250 },
        { field: 'total_amt', headerName: 'Amount Needed', width: 250 },
        { field: 'collected_amt', headerName: 'Amount Collected', width: 250 },
    ];

    return (
        <Box sx={{ width: '70%', padding: '20px' }} className="ml-[15%]">
            <Typography variant="h4" component="h1" gutterBottom className='center text-center mb-10'>
                Donation History
            </Typography>
            {/* <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Button variant="contained" color="primary" onClick={removeRow}>
                    Remove a row
                </Button>
                <Button variant="contained" color="secondary" onClick={addRow}>
                    Add a row
                </Button>
            </Stack> */}
            <DataGrid
                autoHeight
                rows={history.slice(0, nbRows)}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                getRowId={(row) => row.$id} // Specify the unique id for each row
                sx={{
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
