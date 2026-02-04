#!/usr/bin/env node

/**
 * data.js의 placeholder를 실제 reservation 데이터로 교체
 */

const fs = require('fs');
const path = require('path');

const RESERVATION_DATA_PATH = path.join(__dirname, '../docs/reservation-data.js');
const DATA_JS_PATH = path.join(__dirname, '../data.js');

function main() {
  console.log('🔧 Fixing restaurantReservations placeholder...\n');

  // 1. Read reservation-data.js
  console.log('📂 Reading reservation-data.js...');
  const reservationContent = fs.readFileSync(RESERVATION_DATA_PATH, 'utf-8');

  // 2. Extract the object (everything between { and };)
  const objectMatch = reservationContent.match(/const restaurantReservations = (\{[\s\S]*?\});/);

  if (!objectMatch) {
    throw new Error('Could not extract restaurantReservations object');
  }

  const reservationObject = objectMatch[1];
  console.log(`✅ Extracted object (${reservationObject.length} characters)\n`);

  // 3. Read data.js
  console.log('📂 Reading data.js...');
  let dataJsContent = fs.readFileSync(DATA_JS_PATH, 'utf-8');

  // 4. Find and replace placeholder
  const placeholderPattern = /const restaurantReservations = \{ \.\.\. \};/;

  if (!placeholderPattern.test(dataJsContent)) {
    console.log('⚠️  Placeholder not found. Checking for existing object...');

    // Check if real object already exists
    if (dataJsContent.includes('const restaurantReservations = {')) {
      // Need to replace the entire existing object
      const existingPattern = /const restaurantReservations = \{[\s\S]*?\};/;
      if (existingPattern.test(dataJsContent)) {
        console.log('🔄 Found existing object, replacing...');
        dataJsContent = dataJsContent.replace(
          existingPattern,
          `const restaurantReservations = ${reservationObject};`
        );
      }
    } else {
      throw new Error('restaurantReservations not found in data.js');
    }
  } else {
    console.log('🔄 Replacing placeholder...');
    dataJsContent = dataJsContent.replace(
      placeholderPattern,
      `const restaurantReservations = ${reservationObject};`
    );
  }

  // 5. Write updated data.js
  fs.writeFileSync(DATA_JS_PATH, dataJsContent, 'utf-8');
  console.log('✅ data.js updated successfully\n');

  console.log('✨ Done!');
  console.log('📊 Reservation data now includes 82 restaurants');
}

main();
