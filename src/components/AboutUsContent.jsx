import React from 'react';
import Image from 'next/image';
import solutionImage from '../assets/the-do-nation-station-high-resolution-logo.png';
import { Typography, Container, Box, Grid, Avatar, List, ListItem } from '@mui/material';

const teamMembers = [
    { name: 'Arun Pranav A T', role: 'He/Him', image: '/path/to/john-image.jpg' },
    { name: 'Shalini S', role: 'She/Her', image: '/path/to/jane-image.jpg' },
    { name: 'Kierthana R S', role: 'She/Her', image: '/path/to/alice-image.jpg' },
    { name: 'Kavirajar B', role: 'They/Them', image: '/path/to/alice-image.jpg' }
];

const AboutUs = () => {
    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <Typography variant="h2" component="h1" gutterBottom align="center ">
                    About Us
                </Typography>
                <Typography variant="body1" paragraph align="justify">
                    Welcome to The Do-Nation Station, the premier platform dedicated to bridging the gap between generous donors and charitable organizations in need. 
                    The Do-Nation Station operates within the domain of Inclusion, ensuring that every contribution reaches the right place and makes a meaningful impact.
                </Typography>
            </Box>

            <Box my={4}>
                <Typography variant="h4" component="h2" gutterBottom align="left">
                    Our Team
                </Typography>
                <Grid container spacing={4}>
                    {teamMembers.map((member, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Box textAlign="center">
                                <Avatar alt={member.name} src={member.image} sx={{ width: 100, height: 100, margin: '0 auto' }} />
                                <Typography variant="h6" component="h3">
                                    {member.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {member.role}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box my={4}>
                <Typography variant="h4" component="h2" gutterBottom align="left">
                    Our Mission
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body1" paragraph align="justify">
                            At The Do-Nation Station, our mission is to create a centralized platform that unites all orphanages, NGOs, hospitals, foundations, and old age homes. We aim to facilitate transparent and efficient donations by allowing these organizations to register and display their needs, locations, and urgency levels. Our platform is designed to provide donors with comprehensive information and detailed utilization reports, fostering trust and ensuring accountability.
                        </Typography>
                        <Typography variant="h4" component="h2" gutterBottom align="left">
                            The Need for a Central Platform
                        </Typography>
                        <Typography variant="body1" paragraph align="justify">
                            Many charitable organizations currently have their own websites through which they solicit donations in various forms. However, the lack of a unified platform makes it challenging for donors to identify the most urgent needs and make informed contributions. The Do-Nation Station addresses this issue by offering a single, comprehensive portal where all orphanages, NGOs, hospitals, foundations, and old age homes can register and provide detailed information about their requirements.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box textAlign="center">
                          <Image src={solutionImage} alt="Company Logo" layout="responsive" width={300} height={300} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box my={4}>
                
            </Box>

            <Box my={4}>
                <Typography variant="h4" component="h2" gutterBottom align="left">
                    Transparency and Accountability
                </Typography>
                <Typography variant="body1" paragraph align="justify">
                    Transparency is at the core of our platform. We ensure that every registered organization provides verifiable government licenses, audits, detailed descriptions, and photographs. This level of transparency allows donors to see exactly how, where, and by whom their contributions are being utilized. Our goal is to build a community of trust, where donors feel confident that their generosity is making a real difference.
                </Typography>
            </Box>

            <Box my={4}>
                <Typography variant="h4" component="h2" gutterBottom align="left">
                    Encouraging Donations
                </Typography>
                <Typography variant="body1" paragraph align="justify">
                    To encourage donations, we have implemented a leaderboard system that ranks donors based on their contributions within specific locations. This feature not only recognizes the generosity of top donors but also fosters a sense of community and healthy competition, motivating others to give more.
                </Typography>
            </Box>

            <Box my={4}>
                <Typography variant="h4" component="h2" gutterBottom align="left">
                    Our Solution
                </Typography>
                <Typography variant="body1" paragraph align="justify">
                    To address the challenges faced by donors and charitable organizations, we propose the development of a comprehensive donation platform that seamlessly connects both parties. The Do-Nation Station serves as a central hub for all charitable organizations to register and showcase their work, allowing donors to easily search, filter, and donate to causes that align with their values.
                </Typography>
            </Box>

            <Box my={4}>
                <Typography variant="h4" component="h2" gutterBottom align="left">
                    Key Features
                </Typography>
                <List>
                    <ListItem>
                        <Typography variant="body1" align="justify">
                            1. Centralized Registration for All Charitable Organizations: Organizations can register their details, including government licenses, audits, photographs, location, requirements, and more, ensuring transparency and credibility.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" align="justify">
                            2. Enhanced Search Functionality: Donors can filter organizations based on location, urgency, date, timings, population, and specific requirements, making it easier to find causes that resonate with them.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" align="justify">
                            3. Impact Tracking and Visualization: Donors receive real-time insights into how their contributions are being utilized, showcasing the impact of their generosity.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" align="justify">
                            4. Leaderboard and Recognition System: A leaderboard feature recognizes and encourages top donors within specific locations, fostering a culture of giving.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" align="justify">
                            5. Transparency and Accountability: The platform ensures that all registered organizations provide verifiable information, fostering trust among donors.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" align="justify">
                            6. AI-based Verification of Charitable Organizations: Our platform uses artificial intelligence to verify the integrity of organizations, ensuring only genuine entities are listed.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" align="justify">
                            7. Comprehensive Donation Options: Donors can choose to donate money directly to bank accounts or deliver in-kind donations to specified addresses.
                        </Typography>
                    </ListItem>
                </List>
            </Box>

            <Box my={4}>
                <Typography variant="h4" component="h2" gutterBottom align="left">
                    Process Flow
                </Typography>
                <List>
                    <ListItem>
                        <Typography variant="body1" align="justify">
                            1. User Registration & Login: Both charitable organizations and donors register and log in to the platform.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" align="justify">
                            2. Profile Setup: Organizations upload their details, while donors set their preferences.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" align="justify">
                            3. Organization Verification: A thorough verification process ensures the authenticity of registered organizations.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" align="justify">
                            4. Enhanced Search Functionality: Donors can filter organizations based on location, urgency, date, timings, population, and specific requirements.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" align="justify">
                            5. Donation Process: Donors can make monetary donations directly to bank accounts or deliver in-kind donations as per provided instructions.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" align="justify">
                            6. Impact Tracking & Real-Time Updates: Organizations update the status of donations, and donors receive real-time notifications.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" align="justify">
                            7. Leaderboard & Recognition: A donor ranking system recognizes top donors and promotes a sense of community.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" align="justify">
                            8. Feedback & Reviews: Donors can leave feedback, and organizations can update their profiles.
                        </Typography>
                    </ListItem>
                </List>
            </Box>

            <Box my={4}>
                <Typography variant="h4" component="h2" gutterBottom align="left">
                    Benefits of Our Solution
                </Typography>
                <List>
                    <ListItem>
                        <Typography variant="body1" align="justify">
                            1. Ease of Access: Donors can effortlessly discover and support charitable organizations that align with their values.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" align="justify">
                            2. Enhanced Visibility: Organizations gain increased visibility and access to a broader donor base.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" align="justify">
                            3. Greater Transparency: Detailed information and real-time updates foster trust and accountability.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" align="justify">
                            4. Efficient Donations: Streamlined donation processes and tracking ensure a seamless experience for both donors and organizations.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" align="justify">
                            5. Encouraged Giving: The leaderboard system motivates donors to contribute more and be recognized for their generosity.
                        </Typography>
                    </ListItem>
                </List>
            </Box>
            <footer className="bg-gray-100 text-center p-6 mt-auto">
              <p>Thank you for your support!</p>
              <p>For feedback or to work with us, contact us at <a href="mailto:pranav9176@gmail.com" className="text-blue hover:underline">pranav9176@gmail.com</a></p>
            </footer>
        </Container>
    );
};

export default AboutUs;