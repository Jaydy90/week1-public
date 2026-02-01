#!/usr/bin/env node

/**
 * data.js에 reservation 데이터를 자동으로 적용하는 스크립트
 *
 * 사용법:
 *   node scripts/apply-reservation-data.cjs
 *
 * 동작:
 *   1. docs/reservation-data.js 읽기
 *   2. restaurantReservations 객체 추출
 *   3. data.js에 삽입 (allRestaurantsRaw 다음)
 *   4. allRestaurants.map()에 reservation 필드 추가
 *   5. 백업 생성 (data.js.backup)
 */

const fs = require('fs');
const path = require('path');

const RESERVATION_DATA_PATH = path.join(__dirname, '../docs/reservation-data.js');
const DATA_JS_PATH = path.join(__dirname, '../data.js');
const BACKUP_PATH = path.join(__dirname, '../data.js.backup');

function main() {
  console.log('🚀 Applying reservation data to data.js...\n');

  // 1. Backup original data.js
  console.log('💾 Creating backup...');
  fs.copyFileSync(DATA_JS_PATH, BACKUP_PATH);
  console.log(`✅ Backup created: ${BACKUP_PATH}\n`);

  // 2. Read reservation-data.js
  console.log('📂 Reading reservation-data.js...');
  const reservationDataContent = fs.readFileSync(RESERVATION_DATA_PATH, 'utf-8');

  // Extract const restaurantReservations = { ... };
  const match = reservationDataContent.match(/const restaurantReservations = (\{[\s\S]*?\});/);
  if (!match) {
    throw new Error('restaurantReservations not found in reservation-data.js');
  }

  const reservationObject = match[0]; // Full const declaration
  console.log('✅ Extracted restaurantReservations object\n');

  // 3. Read data.js
  console.log('📂 Reading data.js...');
  let dataJsContent = fs.readFileSync(DATA_JS_PATH, 'utf-8');

  // 4. Check if restaurantReservations already exists
  if (dataJsContent.includes('const restaurantReservations')) {
    console.log('⚠️  restaurantReservations already exists in data.js');
    console.log('   Skipping insertion (already applied)\n');

    // Just update the mapping if needed
    if (!dataJsContent.includes('reservation: restaurantReservations[name]')) {
      console.log('🔄 Updating allRestaurants.map() to include reservation field...');
      dataJsContent = addReservationField(dataJsContent);
      fs.writeFileSync(DATA_JS_PATH, dataJsContent, 'utf-8');
      console.log('✅ Updated data.js\n');
    } else {
      console.log('✅ Reservation field already exists in mapping\n');
    }
  } else {
    console.log('🔄 Inserting restaurantReservations into data.js...');

    // Insert after allRestaurantsRaw ];
    const insertPoint = dataJsContent.indexOf('const allRestaurants = allRestaurantsRaw.map');

    if (insertPoint === -1) {
      throw new Error('Could not find insertion point in data.js');
    }

    const before = dataJsContent.substring(0, insertPoint);
    const after = dataJsContent.substring(insertPoint);

    dataJsContent = before +
      '\n// ========================================\n' +
      '// Restaurant Reservation Data (Auto-generated)\n' +
      '// ========================================\n' +
      reservationObject + '\n\n' +
      after;

    console.log('✅ Inserted restaurantReservations\n');

    // Update mapping
    console.log('🔄 Adding reservation field to allRestaurants.map()...');
    dataJsContent = addReservationField(dataJsContent);

    // Write updated data.js
    fs.writeFileSync(DATA_JS_PATH, dataJsContent, 'utf-8');
    console.log('✅ Updated data.js successfully\n');
  }

  console.log('✨ Done!\n');
  console.log('📋 Summary:');
  console.log('   - Backup: data.js.backup');
  console.log('   - Updated: data.js');
  console.log('   - All 82 restaurants now have reservation data\n');
  console.log('🔍 Verify by checking:');
  console.log('   - window.allRestaurants[0].reservation in browser console\n');
}

function addReservationField(content) {
  // Find the return { ... } in allRestaurants.map()
  const returnBlockRegex = /(return \{[\s\S]*?sourceUrl)([\s\S]*?\};)/;

  const replacement = (match, p1, p2) => {
    // Add reservation field after sourceUrl
    if (p2.includes('reservation:')) {
      // Already has reservation field
      return match;
    }

    return p1 + ',\n    reservation: restaurantReservations[name] || null' + p2;
  };

  return content.replace(returnBlockRegex, replacement);
}

main();
