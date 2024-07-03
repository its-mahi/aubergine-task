import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import './App.css';

const App = () => {
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [universities, setUniversities] = useState([]);

    const fetchUniversities = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/universities', {
                params: { country, state }
            });
            setUniversities(response.data);
        } catch (error) {
            console.error('Error fetching universities:', error);
        }
    };

    useEffect(() => {
        if (country) {
            fetchUniversities();
        }
    }, [country]);

    const handleDownload = async (id) => {
        const element = document.getElementById(id);
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/jpeg');
        const link = document.createElement('a');
        link.href = data;
        link.download = `${id}.jpeg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="App">
            <h1>University Search</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter country name"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Enter state name"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
            </div>
            <div className="university-cards">
                {universities.map((university, index) => (
                    <div key={index} className="card" id={`card-${index}`}>
                        <h2>{university.name}</h2>

                        <a href={university.web_pages[0]} target="_blank">
                            {university.web_pages[0]}
                        </a>
                        <button onClick={() => handleDownload(`card-${index}`)}>Download as JPEG</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
