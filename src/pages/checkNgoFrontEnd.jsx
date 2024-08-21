import { useState } from 'react';

export default function CheckNgo() {
    const [ngoId, setNgoId] = useState('');
    const [message, setMessage] = useState('');

    const checkNgo = async (e) => {
        e.preventDefault();
        setMessage('');  // Reset the message

        const response = await fetch(`/lib/checkNgo?ngoId=${ngoId}`);
        const data = await response.json();
        setMessage(data.message || 'Error checking NGO');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Check NGO Legitimacy</h1>
            <form onSubmit={checkNgo}>
                <input 
                    type="text"
                    value={ngoId}
                    onChange={(e) => setNgoId(e.target.value)}
                    placeholder="Enter NGO Unique ID"
                    style={{ marginRight: '10px' }}
                />
                <button type="submit">Check</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
