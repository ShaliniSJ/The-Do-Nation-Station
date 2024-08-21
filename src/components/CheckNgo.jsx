import axios from 'axios';
import cheerio from 'cheerio';
import qs from 'querystring';

export default async function handler(req, res) {
    const { ngoId } = req.query;

    if (!ngoId) {
        return res.status(400).json({ message: 'NGO ID is required' });
    }

    try {
        // Fetch the search page to get any necessary tokens/hidden fields
        const { data: searchPageHtml } = await axios.get('https://ngodarpan.gov.in/index.php/search/');

        // Load the HTML into cheerio for parsing
        const $ = cheerio.load(searchPageHtml);

        // If there are hidden fields or a CSRF token required, fetch it here
        const csrfToken = $('input[name="csrf_token"]').val();  // Example of extracting a CSRF token

        // Prepare the form data to be submitted
        const formData = qs.stringify({
            state: '',
            district: '',
            sector: '',
            ngo_type: '',
            unique_id_search: ngoId,
            csrf_token: csrfToken,  // Include CSRF token if required
        });

        // Submit the form to check the NGO ID, ensure correct headers are set
        const response = await axios.post('https://ngodarpan.gov.in/index.php/search/', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // Parse the response page
        const resultPage = response.data;
        const isRegistered = resultPage.includes('NGO Registration Details') || resultPage.includes('NGO Registration Number');

        if (isRegistered) {
            return res.status(200).json({ message: `NGO with ID ${ngoId} is registered.` });
        } else {
            return res.status(404).json({ message: `NGO with ID ${ngoId} is not registered.` });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Failed to scrape the website.', details: error.message });
    }
}