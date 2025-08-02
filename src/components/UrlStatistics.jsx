import React, { useEffect, useState } from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';

// Mock function to simulate click data
const mockClickData = () => ({
  timestamp: new Date().toLocaleString(),
  source: 'localhost',
  location: 'Hyderabad, India',
});

const UrlStatistics = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const data = sessionStorage.getItem('shortenedUrls');
    if (data) {
      const parsedUrls = JSON.parse(data);
      const urlsWithClicks = parsedUrls.map((url) => ({
        ...url,
        clicks: url.clicks?.length ? url.clicks : [mockClickData(), mockClickData()],
      }));
      setUrls(urlsWithClicks);
    }
  }, []);

  return (
    <Box>
      <Typography variant="h6">Shortened URL Statistics</Typography>

      {urls.length === 0 && (
        <Typography mt={2} color="textSecondary">
          No shortened URLs found in this session.
        </Typography>
      )}

      {urls.map((url, index) => (
        <Card key={index} sx={{ mt: 2 }}>
          <CardContent>
            <Typography><strong>Short URL:</strong> {url.shortUrl}</Typography>
            <Typography><strong>Original URL:</strong> {url.longUrl}</Typography>
            <Typography><strong>Expiry Time:</strong> {url.expiryTime}</Typography>
            <Typography><strong>Total Clicks:</strong> {url.clicks.length}</Typography>

            <Typography mt={1}><strong>Click Details:</strong></Typography>
            {url.clicks.map((click, i) => (
              <Typography key={i} sx={{ ml: 2 }}>
                • {click.timestamp} from {click.source} ({click.location})
              </Typography>
            ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default UrlStatistics;
