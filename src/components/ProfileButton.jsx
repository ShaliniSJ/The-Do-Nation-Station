import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Avatar, Tooltip, Divider } from '@mui/material';
import { AccountCircle, Logout } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { signOut } from '../lib/appwrite';
const ProfileButton = ({ isdonor }) => {
    console.log(isdonor)
    const [log,SetLog]=useState([false])
    
    const [anchorEl, setAnchorEl] = useState(null);
    const router = useRouter();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
   
    const handleLogout = () => {
        localStorage.clear();
        router.push('/')
        signOut();
        // console.log('Logout clicked');
        handleClose();
    };

    const handleProfileRedirect = () => {
        handleClose();
        console.log(isdonor);
        if (isdonor) {
            router.push(`/donorprofile`); // Redirect to donor profile with the user's ID as the slug
        } else {
            router.push('/organisationprofile'); // Redirect to organisation profile
        }
    };

    return (
        <div>
            <Tooltip title="Profile Options">
                <IconButton
                    onClick={handleClick}
                    style={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        padding: 0,
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                        backgroundColor: '#1976d2', // Customize the background color
                    }}
                >
                    <Avatar
                        alt="Profile Picture"
                        src="https://cloud.appwrite.io/v1/avatars/initials?name=WorldVisionIndia&width=96&height=96&project=console" // Replace with your avatar source
                        sx={{ width: 56, height: 56 }}
                    />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        width: '200px',
                    },
                }}
            >
                <MenuItem onClick={handleProfileRedirect}>
                    <AccountCircle style={{ marginRight: 10 }} />
                    My Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                    <Logout style={{ marginRight: 10 }} />
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
};

export default ProfileButton;
