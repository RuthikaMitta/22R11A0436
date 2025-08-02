import React, { useState } from 'react';
import {
  TextField, Button, Grid, Typography, Card, CardContent, Box
} from '@mui/material';

const generateShortcode = () => Math.random().toString(36).substring(2, 8);

const UrlShortenerForm = () => {
  const [urls, setUrls] = useState([{ longUrl: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const isValidUrl = (url) =>
    /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/([\w/_\-\.]*(\?\S+)?)?)?$/.test(url);

  const handleShorten = () => {
    for (let url of urls) {
      if (!isValidUrl(url.longUrl)) return setError('Invalid URL');
      if (url.validity && (!Number.isInteger(Number(url.validity)) || Number(url.validity) < 1))
        return setError('Validity must be a positive integer');
    }

    const shortened = urls.map((url) => {
      const code = url.shortcode || generateShortcode();
      const expiry = url.validity ? Date.now() + url.validity * 60000 : null;
      return {
        ...url,
        shortUrl: `https://short.ly/${code}`,
        expiryTime: expiry ? new Date(expiry).toLocaleString() : 'Never',
        clicks: [],
      };
    });

    setResults(shortened);
    sessionStorage.setItem('shortenedUrls', JSON.stringify(shortened));
    setError('');
  };

  return (
    <Box>
      <Typography variant="h6">Add up to 5 URLs:</Typography>
      {urls.map((url, index) => (
        <Grid container spacing={2} mt={1} key={index}>
          <Grid item xs={12} sm={5}>
            <TextField fullWidth label="Original URL" value={url.longUrl}
              onChange={(e) => handleChange(index, 'longUrl', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="Validity (min)" type="number" value={url.validity}
              onChange={(e) => handleChange(index, 'validity', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="Custom Shortcode" value={url.shortcode}
              onChange={(e) => handleChange(index, 'shortcode', e.target.value)} />
          </Grid>
        </Grid>
      ))}

      <Box mt={2}>
        <Button variant="contained" onClick={() =>
          urls.length < 5 && setUrls([...urls, { longUrl: '', validity: '', shortcode: '' }])}>
          + Add
        </Button>
        <Button variant="contained" color="success" sx={{ ml: 2 }} onClick={handleShorten}>
          Shorten
        </Button>
      </Box>

      {error && <Typography color="error" mt={2}>{error}</Typography>}

      {results.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Results:</Typography>
          {results.map((r, i) => (
            <Card key={i} sx={{ mt: 2 }}>
              <CardContent>
                <Typography>Original: {r.longUrl}</Typography>
                <Typography>Short: {r.shortUrl}</Typography>
                <Typography>Expires At: {r.expiryTime}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default UrlShortenerForm;
