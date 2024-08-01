import React from "react";
import Image from "next/image";
import arunpranavat from "../assets/arunpranavat.png";
import kierthana from "../assets/kierthana.jpeg";
import shalini from "../assets/shalinis.jpeg";
import kavirajar from "../assets/dataoverflow.png";
import solutionImage from "../assets/the-do-nation-station-high-resolution-logo.png";

const teamMembers = [
  { name: "Arun Pranav A T", role: "He/Him", image: arunpranavat },
  { name: "Shalini S", role: "She/Her", image: shalini },
  { name: "Kierthana R S", role: "She/Her", image: kierthana },
  { name: "Kavirajar B", role: "He/Him", image: kavirajar },
];

const AboutUs = () => {
  return (
    <div className="max-w-screen-lg mx-auto nunito">
      <div className="my-16">
        <h1 className="text-6xl jost font-bold mb-6 text-center">About Us</h1>
        <p className="text-lg leading-relaxed text-justify nunito">
          Welcome to The Do-Nation Station, the premier platform dedicated to
          bridging the gap between generous donors and charitable organizations
          in need. The Do-Nation Station operates within the domain of
          Inclusion, ensuring that every contribution reaches the right place
          and makes a meaningful impact.
        </p>
      </div>

      <div className="py-8 bg-secondary-blue -mx-8 px-8 rounded-3xl">
        <h2 className="text-4xl jost font-semibold mb-8 text-center">
          Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-24 h-24 md:h-32 md:w-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  alt={member.name}
                  src={member.image}
                  className="object-cover w-full h-full"
                  width={100}
                  height={100}
                />
              </div>
              <h3 className="text-lg font-medium">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="my-16">
        <h2 className="text-4xl jost mt-8 font-semibold mb-2">Our Mission</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg leading-relaxed text-justify mb-4">
              At The Do-Nation Station, our mission is to create a centralized
              platform that unites all orphanages, NGOs, hospitals, foundations,
              and old age homes. We aim to facilitate transparent and efficient
              donations by allowing these organizations to register and display
              their needs, locations, and urgency levels. Our platform is
              designed to provide donors with comprehensive information and
              detailed utilization reports, fostering trust and ensuring
              accountability.
            </p>
            <h2 className="text-4xl jost mt-8 font-semibold mb-2">
              The Need for a Central Platform
            </h2>
            <p className="text-lg leading-relaxed text-justify">
              Many charitable organizations currently have their own websites
              through which they solicit donations in various forms. However,
              the lack of a unified platform makes it challenging for donors to
              identify the most urgent needs and make informed contributions.
              The Do-Nation Station addresses this issue by offering a single,
              comprehensive portal where all orphanages, NGOs, hospitals,
              foundations, and old age homes can register and provide detailed
              information about their requirements.
            </p>
          </div>
          <div className="text-center">
            <Image
              src={solutionImage}
              alt="Company Logo"
              layout="responsive"
              width={300}
              height={300}
              className="mx-auto"
            />
          </div>
        </div>
      </div>

      <div className="my-16">
        <h2 className="text-4xl jost mt-8 font-semibold mb-2">
          Transparency and Accountability
        </h2>
        <p className="text-lg leading-relaxed text-justify">
          Transparency is at the core of our platform. We ensure that every
          registered organization provides verifiable government licenses,
          audits, detailed descriptions, and photographs. This level of
          transparency allows donors to see exactly how, where, and by whom
          their contributions are being utilized. Our goal is to build a
          community of trust, where donors feel confident that their generosity
          is making a real difference.
        </p>
      </div>

      <div className="my-16">
        <h2 className="text-4xl jost mt-8 font-semibold mb-2">
          Encouraging Donations
        </h2>
        <p className="text-lg leading-relaxed text-justify">
          To encourage donations, we have implemented a leaderboard system that
          ranks donors based on their contributions within specific locations.
          This feature not only recognizes the generosity of top donors but also
          fosters a sense of community and healthy competition, motivating
          others to give more.
        </p>
      </div>

      <div className="my-16">
        <h2 className="text-4xl jost mt-8 font-semibold mb-2">Our Solution</h2>
        <p className="text-lg leading-relaxed text-justify">
          To address the challenges faced by donors and charitable
          organizations, we propose the development of a comprehensive donation
          platform that seamlessly connects both parties. The Do-Nation Station
          serves as a central hub for all charitable organizations to register
          and showcase their work, allowing donors to easily search, filter, and
          donate to causes that align with their values.
        </p>
      </div>

      <div className="my-16">
        <h2 className="text-4xl jost mt-8 font-semibold mb-2">Key Features</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <p className="text-lg leading-relaxed text-justify">
              Centralized Registration for All Charitable Organizations:
              Organizations can register their details, including government
              licenses, audits, photographs, location, requirements, and more,
              ensuring transparency and credibility.
            </p>
          </li>
          <li>
            <p className="text-lg leading-relaxed text-justify">
              Enhanced Search Functionality: Donors can filter organizations
              based on location, urgency, date, timings, population, and
              specific requirements, making it easier to find causes that
              resonate with them.
            </p>
          </li>
          <li>
            <p className="text-lg leading-relaxed text-justify">
              Impact Tracking and Visualization: Donors receive real-time
              insights into how their contributions are being utilized,
              showcasing the impact of their generosity.
            </p>
          </li>
          <li>
            <p className="text-lg leading-relaxed text-justify">
              Leaderboard and Recognition System: A leaderboard feature
              recognizes and encourages top donors within specific locations,
              fostering a culture of giving.
            </p>
          </li>
          <li>
            <p className="text-lg leading-relaxed text-justify">
              Transparency and Accountability: The platform ensures that all
              registered organizations provide verifiable information, fostering
              trust among donors.
            </p>
          </li>
          <li>
            <p className="text-lg leading-relaxed text-justify">
              AI-based Verification of Charitable Organizations: Our platform
              uses artificial intelligence to verify the integrity of
              organizations, ensuring only genuine entities are listed.
            </p>
          </li>
          <li>
            <p className="text-lg leading-relaxed text-justify">
              Comprehensive Donation Options: Donors can choose to donate money
              directly to bank accounts or deliver in-kind donations to
              specified addresses.
            </p>
          </li>
        </ul>
      </div>

      <div className="my-16">
        <h2 className="text-4xl jost mt-8 font-semibold mb-2">Process Flow</h2>
        <ul className="list-decimal pl-5 space-y-2">
          <li>
            <p className="text-lg leading-relaxed text-justify">
              User Registration & Login: Both charitable organizations and
              donors register and log in to the platform.
            </p>
          </li>
          <li>
            <p className="text-lg leading-relaxed text-justify">
              Profile Setup: Organizations upload their details, while donors
              set their preferences.
            </p>
          </li>
          <li>
            <p className="text-lg leading-relaxed text-justify">
              Organization Verification: A thorough verification process ensures
              the authenticity of registered organizations.
            </p>
          </li>
          <li>
            <p className="text-lg leading-relaxed text-justify">
              Enhanced Search Functionality: Donors can filter organizations
              based on location, urgency, date, timings, population, and
              specific requirements.
            </p>
          </li>
          <li>
            <p className="text-lg leading-relaxed text-justify">
              Donation Process: Donors can make monetary donations directly to
              bank accounts or deliver in-kind donations as per provided
              instructions.
            </p>
          </li>
          <li>
            <p className="text-lg leading-relaxed text-justify">
              Impact Tracking & Real-Time Updates: Organizations update the
              status of donations, and donors receive real-time notifications.
            </p>
          </li>
          <li>
            <p className="text-lg leading-relaxed text-justify">
              Leaderboard & Recognition: A donor ranking system recognizes top
              donors and promotes a sense of community.
            </p>
          </li>
          <li>
            <p className="text-lg leading-relaxed text-justify">
              Feedback & Reviews: Donors can leave feedback, and organizations
              can update their profiles.
            </p>
          </li>
        </ul>
      </div>

      <div className="my-16">
        <h2 className="text-4xl jost mt-8 font-semibold mb-2">
          Benefits of Our Solution
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <p className="text-lg leading-relaxed text-justify">
              Ease of Access: Donors can effortlessly discover and support
              charitable organizations that align with their values.
            </p>
          </li>
          <li>
            <p className="text-lg leading-relaxed text-justify">
              Enhanced Visibility: Organizations gain increased visibility and
              access to a broader donor base.
            </p>
          </li>
          <li>
            <p className="text-lg leading-relaxed text-justify">
              Greater Transparency: Detailed information and real-time updates
              foster trust and accountability.
            </p>
          </li>
          <li>
            <p className="text-lg leading-relaxed text-justify">
              Efficient Donations: Streamlined donation processes and tracking
              ensure a seamless experience for both donors and organizations.
            </p>
          </li>
          <li>
            <p className="text-lg leading-relaxed text-justify">
              Encouraged Giving: The leaderboard system motivates donors to
              contribute more and be recognized for their generosity.
            </p>
          </li>
        </ul>
      </div>
      <footer className="bg-gray-100 text-center p-6 mt-auto">
        <p>Thank you for your support!</p>
        <p>
          For feedback or to work with us, contact us at{" "}
          <a
            href="mailto:pranav9176@gmail.com"
            className="text-blue-600 hover:underline"
          >
            pranav9176@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
};

export default AboutUs;

// import React from 'react';
// import Image from 'next/image';
// import arunpranavat from '../assets/arunpranavat.png';
// import kierthana from '../assets/kierthana.jpeg';
// import shalini from '../assets/shalinis.jpeg';
// import kavirajar from '../assets/dataoverflow.png';
// import solutionImage from '../assets/the-do-nation-station-high-resolution-logo.png';
// import { Typography, Container, Box, Grid, Avatar, List, ListItem } from '@mui/material';

// const teamMembers = [
//     { name: 'Arun Pranav A T', role: 'He/Him', image: arunpranavat },
//     { name: 'Shalini S', role: 'She/Her', image: shalini },
//     { name: 'Kierthana R S', role: 'She/Her', image: kierthana },
//     { name: 'Kavirajar B', role: 'He/Him', image: kavirajar },
// ];

// const AboutUs = () => {
//     return (
//         <Container maxWidth="lg">
//             <Box my={4}>
//                 <Typography variant="h2" component="h1" gutterBottom align="center ">
//                     About Us
//                 </Typography>
//                 <Typography variant="body1" paragraph align="justify">
//                     Welcome to The Do-Nation Station, the premier platform dedicated to bridging the gap between generous donors and charitable organizations in need.
//                     The Do-Nation Station operates within the domain of Inclusion, ensuring that every contribution reaches the right place and makes a meaningful impact.
//                 </Typography>
//             </Box>

//             <Box my={4}>
//                 <Typography variant="h4" component="h2" gutterBottom align="left">
//                     Our Team
//                 </Typography>
//                 <Grid container spacing={4}>
//                     {teamMembers.map((member, index) => (
//                         <Grid item xs={12} sm={6} md={3} key={index}>
//                             <Box textAlign="center">
//                                 <Avatar alt={member.name} src={member.image.src} sx={{ width: 100, height: 100, margin: '0 auto' }} />
//                                 <Typography variant="h6" component="h3">
//                                     {member.name}
//                                 </Typography>
//                                 <Typography variant="body2" color="textSecondary">
//                                     {member.role}
//                                 </Typography>
//                             </Box>
//                         </Grid>
//                     ))}
//                 </Grid>
//             </Box>

//             <Box my={4}>
//                 <Typography variant="h4" component="h2" gutterBottom align="left">
//                     Our Mission
//                 </Typography>
//                 <Grid container spacing={4}>
//                     <Grid item xs={12} md={6}>
//                         <Typography variant="body1" paragraph align="justify">
//                             At The Do-Nation Station, our mission is to create a centralized platform that unites all orphanages, NGOs, hospitals, foundations, and old age homes. We aim to facilitate transparent and efficient donations by allowing these organizations to register and display their needs, locations, and urgency levels. Our platform is designed to provide donors with comprehensive information and detailed utilization reports, fostering trust and ensuring accountability.
//                         </Typography>
//                         <Typography variant="h4" component="h2" gutterBottom align="left">
//                             The Need for a Central Platform
//                         </Typography>
//                         <Typography variant="body1" paragraph align="justify">
//                             Many charitable organizations currently have their own websites through which they solicit donations in various forms. However, the lack of a unified platform makes it challenging for donors to identify the most urgent needs and make informed contributions. The Do-Nation Station addresses this issue by offering a single, comprehensive portal where all orphanages, NGOs, hospitals, foundations, and old age homes can register and provide detailed information about their requirements.
//                         </Typography>
//                     </Grid>
//                     <Grid item xs={12} md={6}>
//                         <Box textAlign="center">
//                           <Image src={solutionImage} alt="Company Logo" layout="responsive" width={300} height={300} />
//                         </Box>
//                     </Grid>
//                 </Grid>
//             </Box>

//             <Box my={4}>

//             </Box>

//             <Box my={4}>
//                 <Typography variant="h4" component="h2" gutterBottom align="left">
//                     Transparency and Accountability
//                 </Typography>
//                 <Typography variant="body1" paragraph align="justify">
//                     Transparency is at the core of our platform. We ensure that every registered organization provides verifiable government licenses, audits, detailed descriptions, and photographs. This level of transparency allows donors to see exactly how, where, and by whom their contributions are being utilized. Our goal is to build a community of trust, where donors feel confident that their generosity is making a real difference.
//                 </Typography>
//             </Box>

//             <Box my={4}>
//                 <Typography variant="h4" component="h2" gutterBottom align="left">
//                     Encouraging Donations
//                 </Typography>
//                 <Typography variant="body1" paragraph align="justify">
//                     To encourage donations, we have implemented a leaderboard system that ranks donors based on their contributions within specific locations. This feature not only recognizes the generosity of top donors but also fosters a sense of community and healthy competition, motivating others to give more.
//                 </Typography>
//             </Box>

//             <Box my={4}>
//                 <Typography variant="h4" component="h2" gutterBottom align="left">
//                     Our Solution
//                 </Typography>
//                 <Typography variant="body1" paragraph align="justify">
//                     To address the challenges faced by donors and charitable organizations, we propose the development of a comprehensive donation platform that seamlessly connects both parties. The Do-Nation Station serves as a central hub for all charitable organizations to register and showcase their work, allowing donors to easily search, filter, and donate to causes that align with their values.
//                 </Typography>
//             </Box>

//             <Box my={4}>
//                 <Typography variant="h4" component="h2" gutterBottom align="left">
//                     Key Features
//                 </Typography>
//                 <List>
//                     <ListItem>
//                         <Typography variant="body1" align="justify">
//                             1. Centralized Registration for All Charitable Organizations: Organizations can register their details, including government licenses, audits, photographs, location, requirements, and more, ensuring transparency and credibility.
//                         </Typography>
//                     </ListItem>
//                     <ListItem>
//                         <Typography variant="body1" align="justify">
//                             2. Enhanced Search Functionality: Donors can filter organizations based on location, urgency, date, timings, population, and specific requirements, making it easier to find causes that resonate with them.
//                         </Typography>
//                     </ListItem>
//                     <ListItem>
//                         <Typography variant="body1" align="justify">
//                             3. Impact Tracking and Visualization: Donors receive real-time insights into how their contributions are being utilized, showcasing the impact of their generosity.
//                         </Typography>
//                     </ListItem>
//                     <ListItem>
//                         <Typography variant="body1" align="justify">
//                             4. Leaderboard and Recognition System: A leaderboard feature recognizes and encourages top donors within specific locations, fostering a culture of giving.
//                         </Typography>
//                     </ListItem>
//                     <ListItem>
//                         <Typography variant="body1" align="justify">
//                             5. Transparency and Accountability: The platform ensures that all registered organizations provide verifiable information, fostering trust among donors.
//                         </Typography>
//                     </ListItem>
//                     <ListItem>
//                         <Typography variant="body1" align="justify">
//                             6. AI-based Verification of Charitable Organizations: Our platform uses artificial intelligence to verify the integrity of organizations, ensuring only genuine entities are listed.
//                         </Typography>
//                     </ListItem>
//                     <ListItem>
//                         <Typography variant="body1" align="justify">
//                             7. Comprehensive Donation Options: Donors can choose to donate money directly to bank accounts or deliver in-kind donations to specified addresses.
//                         </Typography>
//                     </ListItem>
//                 </List>
//             </Box>

//             <Box my={4}>
//                 <Typography variant="h4" component="h2" gutterBottom align="left">
//                     Process Flow
//                 </Typography>
//                 <List>
//                     <ListItem>
//                         <Typography variant="body1" align="justify">
//                             1. User Registration & Login: Both charitable organizations and donors register and log in to the platform.
//                         </Typography>
//                     </ListItem>
//                     <ListItem>
//                         <Typography variant="body1" align="justify">
//                             2. Profile Setup: Organizations upload their details, while donors set their preferences.
//                         </Typography>
//                     </ListItem>
//                     <ListItem>
//                         <Typography variant="body1" align="justify">
//                             3. Organization Verification: A thorough verification process ensures the authenticity of registered organizations.
//                         </Typography>
//                     </ListItem>
//                     <ListItem>
//                         <Typography variant="body1" align="justify">
//                             4. Enhanced Search Functionality: Donors can filter organizations based on location, urgency, date, timings, population, and specific requirements.
//                         </Typography>
//                     </ListItem>
//                     <ListItem>
//                         <Typography variant="body1" align="justify">
//                             5. Donation Process: Donors can make monetary donations directly to bank accounts or deliver in-kind donations as per provided instructions.
//                         </Typography>
//                     </ListItem>
//                     <ListItem>
//                         <Typography variant="body1" align="justify">
//                             6. Impact Tracking & Real-Time Updates: Organizations update the status of donations, and donors receive real-time notifications.
//                         </Typography>
//                     </ListItem>
//                     <ListItem>
//                         <Typography variant="body1" align="justify">
//                             7. Leaderboard & Recognition: A donor ranking system recognizes top donors and promotes a sense of community.
//                         </Typography>
//                     </ListItem>
//                     <ListItem>
//                         <Typography variant="body1" align="justify">
//                             8. Feedback & Reviews: Donors can leave feedback, and organizations can update their profiles.
//                         </Typography>
//                     </ListItem>
//                 </List>
//             </Box>

//             <Box my={4}>
//                 <Typography variant="h4" component="h2" gutterBottom align="left">
//                     Benefits of Our Solution
//                 </Typography>
//                 <List>
//                     <ListItem>
//                         <Typography variant="body1" align="justify">
//                             1. Ease of Access: Donors can effortlessly discover and support charitable organizations that align with their values.
//                         </Typography>
//                     </ListItem>
//                     <ListItem>
//                         <Typography variant="body1" align="justify">
//                             2. Enhanced Visibility: Organizations gain increased visibility and access to a broader donor base.
//                         </Typography>
//                     </ListItem>
//                     <ListItem>
//                         <Typography variant="body1" align="justify">
//                             3. Greater Transparency: Detailed information and real-time updates foster trust and accountability.
//                         </Typography>
//                     </ListItem>
//                     <ListItem>
//                         <Typography variant="body1" align="justify">
//                             4. Efficient Donations: Streamlined donation processes and tracking ensure a seamless experience for both donors and organizations.
//                         </Typography>
//                     </ListItem>
//                     <ListItem>
//                         <Typography variant="body1" align="justify">
//                             5. Encouraged Giving: The leaderboard system motivates donors to contribute more and be recognized for their generosity.
//                         </Typography>
//                     </ListItem>
//                 </List>
//             </Box>
//             <footer className="bg-gray-100 text-center p-6 mt-auto">
//               <p>Thank you for your support!</p>
//               <p>For feedback or to work with us, contact us at <a href="mailto:pranav9176@gmail.com" className="text-blue hover:underline">pranav9176@gmail.com</a></p>
//             </footer>
//         </Container>
//     );
// };

// export default AboutUs;
