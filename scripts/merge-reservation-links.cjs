#!/usr/bin/env node

/**
 * 캐치테이블 링크를 data.js의 allRestaurants에 병합하는 스크립트
 *
 * 사용법:
 *   node scripts/merge-reservation-links.cjs
 *
 * 동작:
 *   1. docs/catchtable-links.json 읽기
 *   2. data.js의 allRestaurants 배열 파싱
 *   3. 이름 기반으로 매칭하여 reservation 정보 추가
 *   4. docs/merged-restaurants.json에 결과 저장 (검토용)
 *   5. 자동으로 data.js 업데이트 (수동 확인 후)
 */

const fs = require('fs');
const path = require('path');

// ===== 파일 경로 =====
const CATCHTABLE_LINKS_PATH = path.join(__dirname, '../docs/catchtable-links.json');
const DATA_JS_PATH = path.join(__dirname, '../data.js');
const OUTPUT_PATH = path.join(__dirname, '../docs/merged-restaurants.json');

// ===== 캐치테이블 링크 로드 =====
function loadCatchtableLinks() {
  console.log('📂 Loading catchtable-links.json...');
  const content = fs.readFileSync(CATCHTABLE_LINKS_PATH, 'utf-8');
  const links = JSON.parse(content);
  console.log(`✅ Loaded ${links.length} restaurants with reservation links\n`);
  return links;
}

// ===== data.js에서 allRestaurants 배열 추출 =====
function extractAllRestaurants() {
  console.log('📂 Reading data.js...');
  const content = fs.readFileSync(DATA_JS_PATH, 'utf-8');

  // allRestaurantsRaw 찾기 (const allRestaurantsRaw = [ ... ]; 형태)
  const match = content.match(/const allRestaurantsRaw = \[([\s\S]*?)\];/);

  if (!match) {
    throw new Error('allRestaurantsRaw not found in data.js');
  }

  const rawData = match[1];

  // 배열 요소 추출 (각 라인은 따옴표로 감싸져 있음)
  const lines = rawData
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('"'))
    .map(line => {
      // 따옴표 제거 (앞뒤 따옴표와 쉼표)
      return line.replace(/^"|"[,]?$/g, '').trim();
    });

  console.log(`✅ Found ${lines.length} restaurants in data.js\n`);

  // 파이프 구분 파싱
  const restaurants = lines.map(line => {
    const parts = line.split(' | ').map(p => p.trim());

    return {
      name: parts[0] || '',
      region: parts[1] || '',
      area: parts[2] || '',
      category: parts[3] || '',
      badgeType: parts[4] || '',
      mainMenu: parts[5] || '',
      sourceLabel: parts[6] || '',
      verifiedAt: parts[7] || '',
      group: parts[8] || '',
      sourceUrl: parts[9] || '',
      rawLine: line // 원본 라인 보존 (나중에 다시 파이프 형태로 변환)
    };
  });

  return restaurants;
}

// ===== 이름 기반 매칭 (정규화) =====
function normalizeName(name) {
  // 공백, 특수문자 제거, 소문자 변환
  return name
    .replace(/\s+/g, '')
    .replace(/[^\w가-힣]/g, '')
    .toLowerCase();
}

// ===== 병합 함수 =====
function mergeReservationLinks(restaurants, catchtableLinks) {
  console.log('🔄 Merging reservation links...\n');

  // 캐치테이블 링크를 맵으로 변환 (빠른 조회)
  const linksMap = new Map();
  catchtableLinks.forEach(link => {
    const normalizedName = normalizeName(link.name);
    linksMap.set(normalizedName, link.reservation);
  });

  let matchCount = 0;
  let noMatchCount = 0;

  const merged = restaurants.map(restaurant => {
    const normalizedName = normalizeName(restaurant.name);
    const reservation = linksMap.get(normalizedName);

    if (reservation) {
      matchCount++;
      console.log(`✅ Matched: ${restaurant.name}`);

      return {
        ...restaurant,
        reservation: reservation
      };
    } else {
      noMatchCount++;
      console.log(`⚠️  No match: ${restaurant.name}`);

      return {
        ...restaurant,
        reservation: null // 예약 정보 없음
      };
    }
  });

  console.log(`\n📊 Summary:`);
  console.log(`   - Matched: ${matchCount} restaurants`);
  console.log(`   - No match: ${noMatchCount} restaurants`);
  console.log(`   - Total: ${restaurants.length} restaurants\n`);

  return merged;
}

// ===== JSON 저장 (검토용) =====
function saveToJSON(merged) {
  console.log('💾 Saving merged data to JSON...');

  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(
    OUTPUT_PATH,
    JSON.stringify(merged, null, 2),
    'utf-8'
  );

  console.log(`✅ Saved to: ${OUTPUT_PATH}\n`);
}

// ===== data.js 업데이트 생성 (자동 적용은 안함, 수동 확인 필요) =====
function generateDataJsUpdate(merged) {
  console.log('📝 Generating data.js update guide...\n');

  console.log('⚠️  IMPORTANT: This script does NOT auto-update data.js');
  console.log('   Instead, review the merged data and manually update:\n');

  console.log('Option 1: Use merged-restaurants.json');
  console.log('   - Open docs/merged-restaurants.json');
  console.log('   - Find restaurants with reservation: {...}');
  console.log('   - Copy reservation blocks to nearbySpots or create new entries\n');

  console.log('Option 2: Export as JavaScript array');
  console.log('   - See docs/merged-restaurants.json');
  console.log('   - Convert to const allRestaurants = [...]\n');

  // 예약 정보가 있는 레스토랑만 추출
  const withReservation = merged.filter(r => r.reservation);

  console.log(`📋 Restaurants with reservation data: ${withReservation.length}`);
  console.log('   Sample:');

  withReservation.slice(0, 3).forEach(r => {
    console.log(`   - ${r.name}: ${r.reservation.links.primary}`);
  });

  console.log('\n✨ Done! Review docs/merged-restaurants.json and update data.js manually.\n');
}

// ===== 메인 함수 =====
async function main() {
  console.log('🚀 Starting reservation links merge...\n');

  try {
    // 1. 캐치테이블 링크 로드
    const catchtableLinks = loadCatchtableLinks();

    // 2. data.js에서 allRestaurants 추출
    const restaurants = extractAllRestaurants();

    // 3. 병합
    const merged = mergeReservationLinks(restaurants, catchtableLinks);

    // 4. JSON 저장 (검토용)
    saveToJSON(merged);

    // 5. 업데이트 가이드 출력
    generateDataJsUpdate(merged);

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// ===== 실행 =====
main();
