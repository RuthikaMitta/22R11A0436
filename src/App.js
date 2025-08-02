import React, { useState } from 'react';
import { Container, Typography, Tabs, Tab, Box } from '@mui/material';
import UrlShortenerForm from './components/UrlShortenerForm';
import UrlStatistics from './components/UrlStatistics';

function App() {
  const [tab, setTab] = useState(0);

  return (
    <Container>
      <Typography variant="h4" align="center" mt={4}>
        AffordMed - URL Shortener
      </Typography>
      <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)} centered>
        <Tab label="Shorten URL" />
        <Tab label="Statistics" />
      </Tabs>
      <Box mt={4}>
        {tab === 0 && <UrlShortenerForm />}
        {tab === 1 && <UrlStatistics />}
      </Box>
    </Container>
  );
}

export default App;
