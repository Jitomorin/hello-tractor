const fs = require('fs');
const path = require('path');
const parseString = require('xml2js').parseString;

const sitemapPath = path.join(__dirname, 'utils', 'sitemap.xml'); // Adjust the path accordingly
const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

// Parse the XML content
parseString(sitemapContent, (err, result) => {
    if (err) {
        console.error('Error parsing sitemap:', err);
    } else {
        // Process the parsed sitemap data
        console.log(result);
    }
});