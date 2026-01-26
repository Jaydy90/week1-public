#!/usr/bin/env node
/**
 * 네이버 Geocoding API를 사용하여 맛집 좌표 추가
 *
 * 사용법:
 * 1. 네이버 클라우드 플랫폼에서 API 키 발급 (https://www.ncloud.com/product/applicationService/maps)
 * 2. 환경 변수 설정:
 *    - NAVER_CLIENT_ID=your_client_id
 *    - NAVER_CLIENT_SECRET=your_client_secret
 * 3. 실행: node scripts/add-coordinates.js
 */

const fs = require('fs');
const path = require('path');

// 네이버 API 설정
const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

if (!NAVER_CLIENT_ID || !NAVER_CLIENT_SECRET) {
  console.error('❌ Error: NAVER_CLIENT_ID and NAVER_CLIENT_SECRET must be set');
  console.log('\n📝 How to get API keys:');
  console.log('1. Visit: https://www.ncloud.com/product/applicationService/maps');
  console.log('2. Register Application');
  console.log('3. Enable "Geocoding" service');
  console.log('4. Copy Client ID and Client Secret');
  console.log('\n💡 Set environment variables:');
  console.log('   Windows: set NAVER_CLIENT_ID=your_id && set NAVER_CLIENT_SECRET=your_secret && node scripts/add-coordinates.js');
  console.log('   Mac/Linux: NAVER_CLIENT_ID=your_id NAVER_CLIENT_SECRET=your_secret node scripts/add-coordinates.js');
  process.exit(1);
}

// 네이버 Geocoding API 호출
async function getCoordinates(query) {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodedQuery}`;

  try {
    const response = await fetch(url, {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': NAVER_CLIENT_ID,
        'X-NCP-APIGW-API-KEY': NAVER_CLIENT_SECRET
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.addresses && data.addresses.length > 0) {
      const { x, y } = data.addresses[0];
      return {
        lat: parseFloat(y),
        lng: parseFloat(x)
      };
    }

    return null;
  } catch (error) {
    console.error(`  ❌ Error fetching coordinates for "${query}":`, error.message);
    return null;
  }
}

// data.js 파싱
function parseDataFile() {
  const dataPath = path.join(__dirname, '..', 'data.js');
  const content = fs.readFileSync(dataPath, 'utf-8');

  // allRestaurantsRaw 배열 추출
  const rawArrayMatch = content.match(/const allRestaurantsRaw = \[([\s\S]*?)\];/);
  if (!rawArrayMatch) {
    throw new Error('Could not find allRestaurantsRaw in data.js');
  }

  const rawLines = rawArrayMatch[1]
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('"'))
    .map(line => line.replace(/^"|",$|",$/g, ''));

  return rawLines.map(line => {
    const parts = line.split(' | ').map(p => p.trim());
    return {
      name: parts[0],
      region: parts[1],
      area: parts[2],
      category: parts[3],
      badgeType: parts[4],
      mainMenu: parts[5],
      sourceLabel: parts[6],
      verifiedAt: parts[7],
      group: parts[8],
      sourceUrl: parts[9] || ''
    };
  });
}

// 좌표 추가 및 data.js 업데이트
async function addCoordinates() {
  console.log('🗺️  Trust Route - Geocoding Script');
  console.log('=====================================\n');

  const restaurants = parseDataFile();
  console.log(`📊 Found ${restaurants.length} restaurants\n`);

  const results = [];
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < restaurants.length; i++) {
    const rest = restaurants[i];
    const query = `${rest.name} ${rest.region} ${rest.area}`;

    process.stdout.write(`[${i + 1}/${restaurants.length}] ${rest.name}... `);

    const coords = await getCoordinates(query);

    if (coords) {
      console.log(`✅ (${coords.lat}, ${coords.lng})`);
      results.push({ ...rest, lat: coords.lat, lng: coords.lng });
      successCount++;
    } else {
      console.log('❌ Not found');
      results.push({ ...rest, lat: null, lng: null });
      failCount++;
    }

    // Rate limiting: 10 requests per second
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n=====================================');
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📊 Total: ${restaurants.length}\n`);

  // data.js 파일 업데이트
  updateDataFile(results);
}

// data.js 파일 업데이트
function updateDataFile(restaurants) {
  const dataPath = path.join(__dirname, '..', 'data.js');
  let content = fs.readFileSync(dataPath, 'utf-8');

  // allRestaurantsRaw 재생성
  const newRawLines = restaurants.map(rest => {
    const parts = [
      rest.name,
      rest.region,
      rest.area,
      rest.category,
      rest.badgeType,
      rest.mainMenu,
      rest.sourceLabel,
      rest.verifiedAt,
      rest.group,
      rest.sourceUrl
    ];

    const line = parts.join(' | ');

    // 좌표가 있으면 주석으로 추가
    if (rest.lat && rest.lng) {
      return `  "${line}", // ${rest.lat},${rest.lng}`;
    }
    return `  "${line}"`;
  });

  const newRawArray = `const allRestaurantsRaw = [\n${newRawLines.join(',\n')}\n];`;

  // 기존 allRestaurantsRaw 교체
  content = content.replace(
    /const allRestaurantsRaw = \[[\s\S]*?\];/,
    newRawArray
  );

  // 좌표를 객체에 추가하는 로직 업데이트
  const parsingLogic = `
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
    sourceUrl
  ] = line.split(" | ").map((part) => part.trim());

  // ID 생성
  const id = \`rest-\${String(index + 1).padStart(3, '0')}\`;

  // 좌표 매핑 (수동으로 추가된 좌표)
  const coordinatesMap = {
${restaurants
  .filter(r => r.lat && r.lng)
  .map(r => `    "${r.name}": { lat: ${r.lat}, lng: ${r.lng} }`)
  .join(',\n')}
  };

  const coords = coordinatesMap[name] || {};

  return {
    id,
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
    lat: coords.lat,
    lng: coords.lng,
    mapQuery: \`\${name} \${region} \${area}\`
  };
});`;

  // 기존 파싱 로직 교체
  content = content.replace(
    /const allRestaurants = allRestaurantsRaw\.map\([\s\S]*?\}\);/,
    parsingLogic.trim()
  );

  // 파일 저장
  fs.writeFileSync(dataPath, content, 'utf-8');
  console.log('✅ data.js updated successfully\n');
  console.log(`📁 Location: ${dataPath}`);
}

// 실행
addCoordinates().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
