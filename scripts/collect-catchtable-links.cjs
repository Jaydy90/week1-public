#!/usr/bin/env node

/**
 * 캐치테이블 예약 링크 자동 수집 스크립트
 *
 * 사용법:
 *   node scripts/collect-catchtable-links.js
 *
 * 출력:
 *   - catchtable-links.json (생성된 링크 목록)
 *   - catchtable-verified.json (검증된 링크만)
 */

const fs = require('fs');
const path = require('path');

// ===== 한글 → 영문 슬러그 매핑 =====
const restaurantSlugs = {
  // 미쉐린 3스타
  "밍글스": "mingles",

  // 미쉐린 2스타
  "정식당": "jungsik",
  "라연": "layeon.shilla", // 호텔 레스토랑
  "코지마": "kojima",
  "스와니예": "swanieye",
  "권숙수": "kwonsooksoo",
  "알라 프리마": "allaprima",

  // 미쉐린 1스타
  "제로콤플렉스": "zerocomplex",
  "류니끄": "l-unique",

  // 빕 구르망
  "옥동식": "okdongsik",
  "고향칼국수": "gohyang-kalguksu",
  "우래옥": "wooraeok",
  "필동면옥": "pildong-myeonok",
  "자하 손만두": "jaha-sonmandu",
  "진진": "jinjin",
  "소이연남마오": "soi-yeonnam-mao",
  "오레노라면": "orenoramen",
  "팩피": "fackpi",
  "에그앤플라워": "eggandflower",
  "미진": "mijin",
  "만두집": "mandujip",
  "개성만두 궁": "gaeseong-mandu-gung",
  "삼청동 수제비": "samcheongdong-sujebi",
  "구복만두": "gubok-mandu",
  "황생가 칼국수": "hwangsaengga-kalguksu",
  "명동교자": "myeongdong-gyoja",
  "금돼지식당": "goldpig",
  "툭툭소이타이": "tuktukthai",

  // 흑백요리사 셰프
  "디핀": "deepin",
  "트리드": "trid",
  "비아 톨레도 파스타바": "viatoledo",
  "레스토랑 네오": "restaurantneo",
  "리북방": "leebukbang",
  "도량": "doryang",
  "로컬릿": "localeat",
  "에드워드 권 리츠칼튼": "edwardkwon",
  "초이닷": "choidot",
  "티엔미미": "tienmimi",
  "파브리키친": "fabrikitchen",
  "만찢남": "manjjiknam",
  "구찌 오스테리아": "gucci-osteria",
  "쵸이닷": "choidot",
  "보노보노": "bonobono",
  "안성재의 모수": "mosu",
  "띠또": "tito",
  "엘초코 데 테레노": "elchoco",
  "네기 다이닝라운지": "negi",
  "가보정": "gabojeong",
  "야키토리 파지": "yakitoripaji",
  "쵸이랩": "choilab",
  "익스퀴진": "exquissine",
  "묘미": "myomi",
  "온지음": "onjium",

  // 유명인 방문
  "화양연화": "hwayangflower",
  "을지로보석": "euljiro-boseok",
  "사랑방칼국수": "sarangbang-kalguksu",
  "잭슨피자": "jacksonpizza",
  "산수갑산": "sansugapsan",
  "대도식당": "daedo",
  "남포면옥": "nampomyeonok",
  "한강껍데기": "hangang-kkeopdeogi",
  "호남식당": "honam",
  "진미평양냉면": "jinmi",
  "영천영화": "youngchun",
  "고기리막국수": "gogiri",
  "뜨락": "teurak",
  "우진해장국": "woojin",
  "이문설농탕": "imun",
  "대성집": "daeseongjip",
  "마포옥": "mapooak",
  "하동관": "hadongkwan",
  "청담안": "cheongdam-an",
  "새벽집": "saebyeok",
  "약수순대": "yaksu-sundae",
  "오통영": "otongyoung",
  "바다식당": "bada",
  "갯벌의진주": "gaetbeol-jinju",
  "우정": "woojeong",
  "서린낙지": "seorin-nakji",
  "진주회관": "jinju-hoegwan",
  "한옥집김치찜": "hanokjip",
  "평양면옥": "pyeongyang-myeonok"
};

// ===== 추가로 조사 필요한 레스토랑 (수동 입력) =====
const manualSlugs = {
  // 조사 후 추가
};

// ===== URL 생성 함수 =====
function generateCatchtableUrl(slug) {
  // 구 도메인 형식 (일부 레스토랑)
  if (slug === 'kwonsooksoo') {
    return `https://catchtable.co.kr/${slug}?lang=ko`;
  }

  // 신 도메인 형식 (대부분)
  return `https://app.catchtable.co.kr/ct/shop/${slug}`;
}

// ===== 네이버 플레이스 ID 매핑 (수동 수집 필요) =====
const naverPlaceIds = {
  "밍글스": "159330481",
  "정식당": "203294116",
  "라연": "11572065",
  "옥동식": "1113715099",
  "고향칼국수": "13118895",
  // 나머지는 추후 수집
};

// ===== 전화번호 매핑 =====
const phoneNumbers = {
  "밍글스": "02-515-7306",
  "정식당": "02-517-4654",
  "라연": "02-2230-3367",
  "권숙수": "02-542-6268",
  "옥동식": "02-337-8582",
  "고향칼국수": "02-735-9247",
  "트리드": "02-517-4654",
  "비아 톨레도 파스타바": "02-796-0507",
  "디핀": "02-2260-2266",
  "레스토랑 네오": "02-3477-0371",
  "리북방": "02-333-0039",
  // 나머지는 추후 수집
};

// ===== 메인 함수 =====
async function main() {
  console.log('🚀 캐치테이블 링크 수집 시작...\n');

  const results = [];
  const allSlugs = { ...restaurantSlugs, ...manualSlugs };

  // 각 레스토랑별 링크 생성
  for (const [name, slug] of Object.entries(allSlugs)) {
    const catchtableUrl = generateCatchtableUrl(slug);
    const naverPlaceId = naverPlaceIds[name];
    const naverPlaceUrl = naverPlaceId
      ? `https://map.naver.com/v5/entry/place/${naverPlaceId}`
      : null;
    const phone = phoneNumbers[name];

    const result = {
      name,
      slug,
      reservation: {
        links: {
          primary: "catchtable",
          catchtable: catchtableUrl,
          naverPlace: naverPlaceUrl,
          phone: phone ? `tel:${phone}` : null
        },
        contact: {
          phone: phone || null,
          phoneFormatted: phone || null
        },
        status: {
          catchtableVerified: false, // 수동 검증 필요
          naverPlaceVerified: naverPlaceId ? true : false,
          phoneVerified: phone ? true : false
        }
      }
    };

    results.push(result);
    console.log(`✅ ${name} → ${catchtableUrl}`);
  }

  // 결과 저장
  const outputDir = path.join(__dirname, '../docs');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'catchtable-links.json');
  fs.writeFileSync(
    outputPath,
    JSON.stringify(results, null, 2),
    'utf-8'
  );

  console.log(`\n📁 결과 저장: ${outputPath}`);
  console.log(`\n📊 통계:`);
  console.log(`   - 총 레스토랑: ${results.length}개`);
  console.log(`   - 캐치테이블 링크: ${results.length}개`);
  console.log(`   - 네이버 플레이스: ${results.filter(r => r.reservation.links.naverPlace).length}개`);
  console.log(`   - 전화번호: ${results.filter(r => r.reservation.contact.phone).length}개`);

  // 미수집 항목 안내
  const missingNaver = results.filter(r => !r.reservation.links.naverPlace);
  const missingPhone = results.filter(r => !r.reservation.contact.phone);

  if (missingNaver.length > 0) {
    console.log(`\n⚠️  네이버 플레이스 ID 미수집: ${missingNaver.length}개`);
    console.log('   수동 수집 필요:', missingNaver.slice(0, 5).map(r => r.name).join(', '), '...');
  }

  if (missingPhone.length > 0) {
    console.log(`\n⚠️  전화번호 미수집: ${missingPhone.length}개`);
    console.log('   수동 수집 필요:', missingPhone.slice(0, 5).map(r => r.name).join(', '), '...');
  }

  console.log('\n✨ 완료!');
  console.log('\n다음 단계:');
  console.log('1. 캐치테이블 링크 수동 검증 (브라우저에서 404 체크)');
  console.log('2. 네이버 플레이스 ID 수집 (map.naver.com 검색)');
  console.log('3. 전화번호 수집 (네이버 플레이스에서 확인)');
  console.log('4. data.js 자동 업데이트 스크립트 실행');
}

// ===== 실행 =====
main().catch(console.error);
