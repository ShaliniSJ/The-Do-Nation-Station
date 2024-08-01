import React, { useEffect, useState } from 'react';
import { IconButton, Menu, MenuItem, Avatar, Tooltip, Divider } from '@mui/material';
import { AccountCircle, Logout } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { signOut,getCurrentUser } from '../lib/appwrite';

const ProfileButton = ({ isdonor }) => {
    
    const [log,SetLog]=useState([false])
    
    const [anchorEl, setAnchorEl] = useState(null);
    const [image, setImage] = useState('https://www.gravatar.com/avatar?d=mp');
    const router = useRouter();
    useEffect(( ) => {
        const fetchUserProfile=async()=>{
        if (isdonor) {
            const user=await getCurrentUser(true);
           
            setImage(user.avatar_url)
            


        } else {
            const user=await getCurrentUser(false);
            setImage(user.avatar_url)
        }
        
    }
    fetchUserProfile()
},[])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
   
    const handleLogout = async () => {
        try {
            await signOut();
            localStorage.clear();
            router.push('/');
            window.location.reload(); // Reload the page to reflect the changes
        } catch (error) {
            console.error('Failed to logout', error);
            alert('Logout failed. Please try again.');
        } finally {
            handleClose();
        }
    };

    const handleProfileRedirect = () => {
        handleClose();
        if (isdonor) {
            router.push(`/donorprofile`);
            // Redirect to donor profile with the user's ID as the slug
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
                        src={image} // Replace with your avatar source
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
