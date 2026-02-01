# Test and Build

Validate the codebase before deployment (no actual build step for this static site).

## Instructions

1. Check for JavaScript syntax errors in main files:
   - Run: `node --check config.js`
   - Run: `node --check auth.js`
   - Run: `node --check comments.js`
   - Run: `node --check data.js`
   - Run: `node --check main.js`

2. Validate HTML structure:
   - Check index.html exists
   - Verify all script tags have correct src paths
   - Confirm Supabase CDN script is present

3. Check critical files exist:
   - index.html
   - style.css
   - All .js files (config, auth, comments, data, main)

4. Validate data.js:
   - Confirm nearbySpots has 6 items
   - Confirm allRestaurants array is populated
   - Check for any missing mainMenu fields
   - Verify all restaurants have lat/lng coordinates

5. Report validation results:
   - List any errors found
   - Confirm if site is ready to deploy
   - Suggest fixes if issues detected

## Notes

- This is a static site with NO build step
- Validation is primarily syntax checking
- Manual browser testing still recommended
