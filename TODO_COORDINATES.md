# TODO: Missing Restaurant Coordinates

**Issue:** C-01 from Data Quality Audit
**Priority:** P0 - BLOCKER for full production launch
**Status:** Manual work required

## Problem

79 out of 85 restaurants in `allRestaurants` are missing `lat` and `lng` coordinates. This blocks the "바로 길찾기" (navigation) feature for most restaurants.

**Impact:**
- Navigation feature will FAIL for 79 restaurants (93%)
- Only 6 restaurants in `nearbySpots` have complete coordinates
- Poor user experience when clicking "바로 길찾기"

## Affected Restaurants (79 missing coordinates)

All restaurants in `allRestaurantsRaw` (lines 385-469 in data.js) except:
- ✅ 밍글스 (rest-001) - HAS coordinates
- ✅ 가온 (rest-002) - HAS coordinates
- ✅ 옥동식 (rest-003) - HAS coordinates
- ✅ 정식당 (rest-004) - HAS coordinates
- ✅ 고향칼국수 (rest-005) - HAS coordinates
- ✅ 화양연화 (rest-015) - HAS coordinates

## Manual Work Required

### Option 1: Manual Naver Place Lookup (10 hours)

For each restaurant:
1. Search on Naver Place: https://map.naver.com/
2. Find exact restaurant location
3. Copy coordinates (6 decimal precision)
4. Add to `allRestaurantsRaw` pipe format

**Format:**
```
NAME | REGION | AREA | CATEGORY | BADGE | MENU | SOURCE | DATE | GROUP | URL | LAT | LNG
```

**Example:**
```
라연 | 서울 | 중구 | 미쉐린 가이드 | 미쉐린 3스타 | 신선로 | 출처 확인 중 | 2026-01-19 | michelin | | 37.564123 | 127.001234
```

### Option 2: Naver API Automation (2 hours)

**Requires:**
- Naver Cloud Platform account
- Maps API key
- Script to fetch coordinates

**Steps:**
1. Sign up for Naver Cloud Platform
2. Enable Maps API
3. Create automation script:

```javascript
// coordinate-fetcher.js (example)
const axios = require('axios');

async function getCoordinates(name, region, area) {
  const query = `${name} ${region} ${area}`;
  const response = await axios.get('https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode', {
    params: { query },
    headers: {
      'X-NCP-APIGW-API-KEY-ID': 'YOUR_CLIENT_ID',
      'X-NCP-APIGW-API-KEY': 'YOUR_CLIENT_SECRET'
    }
  });

  if (response.data.addresses.length > 0) {
    return {
      lat: response.data.addresses[0].y,
      lng: response.data.addresses[0].x
    };
  }
  return null;
}
```

4. Run for all restaurants
5. Update `data.js`

## Priority Order (Start with high-impact restaurants)

### Week 1: Michelin Restaurants (30 restaurants)
- Highest user demand
- Clear addresses from Michelin Guide
- Start with 2-3 star restaurants

### Week 2: Celebrity Restaurants (30 restaurants)
- High social proof
- Popular with users

### Week 3: Chef Restaurants (19 restaurants)
- Complete the dataset

## Data Format Update Needed

**Current `allRestaurantsRaw` format (9 fields):**
```
NAME | REGION | AREA | CATEGORY | BADGE | MENU | SOURCE | DATE | GROUP | URL
```

**New format needed (11 fields):**
```
NAME | REGION | AREA | CATEGORY | BADGE | MENU | SOURCE | DATE | GROUP | URL | LAT | LNG
```

**Parser update in data.js (lines 472-502):**
```javascript
const allRestaurants = allRestaurantsRaw.map((line, index) => {
  const [
    name,
    region,
    area,
    category,
    badgeType,
    mainMenu,
    sourceLabel,
    verifiedAt,
    group,
    sourceUrl,
    lat,  // NEW
    lng   // NEW
  ] = line.split(" | ").map((part) => part.trim());

  return {
    id: `rest-${String(index + 1).padStart(3, '0')}`,
    name,
    region,
    area,
    category,
    badgeType,
    mainMenu,
    sourceLabel,
    verifiedAt,
    group,
    sourceUrl: sourceUrl || "",
    lat: lat ? parseFloat(lat) : null,      // NEW
    lng: lng ? parseFloat(lng) : null,      // NEW
    mapQuery: `${name} ${region} ${area}`   // Fallback
  };
});
```

## Testing After Implementation

1. Pick 3-5 random restaurants
2. Click "바로 길찾기" button
3. Verify Naver Map opens with correct location
4. Check both mobile and desktop
5. Verify accuracy (<100m from actual location)

## Estimated Impact

**Before:**
- 6/85 restaurants (7%) have working navigation
- 79 restaurants show fallback search (inaccurate)

**After:**
- 85/85 restaurants (100%) have working navigation
- Accurate directions within 10 meters
- +90% improvement in navigation feature

## Next Steps

1. Decide on Option 1 (manual) or Option 2 (API automation)
2. If Option 2, set up Naver Cloud Platform account
3. Start with Michelin restaurants (highest priority)
4. Update `data.js` parser to handle lat/lng fields
5. Test thoroughly before full deployment

---

**Status:** Documented ✅
**Action Required:** Manual data entry or API integration
**Blocked:** Full production launch (85 restaurants)
**Estimated Effort:** 10 hours (manual) or 2 hours (API + scripting)
**Assignee:** Data Engineer
**Created:** 2026-01-24
