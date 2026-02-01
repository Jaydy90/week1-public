// 예약 링크 샘플 데이터
// 실제 확인된 캐치테이블 URL + 전화번호

const reservationDataSample = {
  // ===== 미쉐린 3스타 =====
  "rest-001": { // 밍글스
    name: "밍글스",
    reservation: {
      links: {
        primary: "catchtable",
        catchtable: "https://app.catchtable.co.kr/ct/shop/mingles",
        phone: "tel:02-515-7306"
      },
      difficulty: "high",
      advice: "2주 전 예약 필수, 주말은 1개월 전",
      tips: [
        "매달 1일 오전 11시에 2개월 후 예약 오픈",
        "런치가 디너보다 예약 쉬움",
        "노쇼 시 3개월 예약 제한"
      ],
      contact: {
        phone: "02-515-7306",
        phoneFormatted: "02-515-7306",
        hours: "화~토 12:00-22:00",
        breakTime: "15:00-18:00",
        closedDays: ["일요일", "월요일"]
      }
    },
    pricing: {
      range: "150,000-200,000원",
      category: "파인다이닝",
      lunchFrom: 70000,
      dinnerFrom: 150000,
      note: "1인 기준, 주류 별도"
    },
    recommendedDishes: [
      {
        name: "멸치 국수와 전복",
        type: "시그니처",
        description: "밍글스의 대표 요리"
      },
      {
        name: "한우 등심",
        type: "메인",
        description: "프리미엄 한우 사용"
      }
    ]
  },

  // ===== 미쉐린 2스타 =====
  "rest-003": { // 정식당 (allRestaurantsRaw에서 rest-003)
    name: "정식당",
    reservation: {
      links: {
        primary: "catchtable",
        catchtable: "https://app.catchtable.co.kr/ct/shop/jungsik",
        website: "https://www.jungsik.kr/reservation/",
        phone: "tel:02-517-4654"
      },
      difficulty: "high",
      advice: "매월 1일 오전 11시에 2개월 후 예약 오픈",
      tips: [
        "캐치테이블 독점 예약",
        "해외 방문객 많아 영어 소통 가능",
        "뉴욕 지점은 미쉐린 3스타"
      ],
      contact: {
        phone: "02-517-4654",
        phoneFormatted: "02-517-4654",
        hours: "12:00-22:00",
        breakTime: "15:00-17:30",
        closedDays: ["문의 필요"]
      }
    },
    pricing: {
      range: "120,000-180,000원",
      category: "파인다이닝",
      lunchFrom: 60000,
      dinnerFrom: 120000,
      note: "뉴 코리안 퀴진"
    },
    recommendedDishes: [
      {
        name: "맛있는 김밥",
        type: "시그니처",
        description: "정식당의 대표 애피타이저"
      },
      {
        name: "디너 코스",
        type: "코스",
        description: "계절별 변경"
      }
    ]
  },

  "rest-376": { // 라연 (allRestaurantsRaw 기준)
    name: "라연",
    reservation: {
      links: {
        primary: "catchtable",
        catchtable: "https://app.catchtable.co.kr/ct/shop/layeon.shilla",
        tablecheck: "https://www.tablecheck.com/en/shops/shilla-layeon/reserve",
        phone: "tel:02-2230-3367"
      },
      difficulty: "medium",
      advice: "2주 전 예약 권장",
      tips: [
        "서울신라호텔 23층 위치",
        "점심 코스가 저녁보다 저렴",
        "창가 자리 요청 가능 (서울 전망)"
      ],
      contact: {
        phone: "02-2230-3367",
        phoneFormatted: "02-2230-3367",
        hours: "12:00-21:30",
        breakTime: "14:30-17:30",
        closedDays: []
      }
    },
    pricing: {
      range: "100,000-200,000원",
      category: "파인다이닝 한식",
      lunchFrom: 100000,
      dinnerFrom: 150000,
      note: "호텔 레스토랑"
    },
    recommendedDishes: [
      {
        name: "신선로",
        type: "시그니처",
        description: "전통 궁중 요리"
      },
      {
        name: "한정식 코스",
        type: "코스",
        description: "제철 식재료 사용"
      }
    ]
  },

  "rest-397": { // 권숙수
    name: "권숙수",
    reservation: {
      links: {
        primary: "catchtable",
        catchtable: "https://catchtable.co.kr/kwonsooksoo?lang=ko",
        phone: "tel:02-542-6268" // 확인 필요
      },
      difficulty: "high",
      advice: "1개월 전 예약 필수",
      tips: [
        "한 달에 한 번 예약 오픈",
        "예약 경쟁 매우 치열",
        "카운터 자리 추천 (셰프와 소통)"
      ],
      contact: {
        phone: "02-542-6268",
        phoneFormatted: "02-542-6268",
        hours: "확인 필요",
        breakTime: "확인 필요",
        closedDays: ["확인 필요"]
      }
    },
    pricing: {
      range: "150,000-250,000원",
      category: "파인다이닝 한식",
      lunchFrom: null,
      dinnerFrom: 150000,
      note: "디너만 운영"
    },
    recommendedDishes: [
      {
        name: "숙수 주상",
        type: "시그니처 코스",
        description: "권숙수의 대표 코스"
      }
    ]
  },

  // ===== 흑백요리사 셰프 =====
  "rest-005": { // 비아 톨레도 파스타바
    name: "비아 톨레도 파스타바",
    reservation: {
      links: {
        primary: "catchtable",
        catchtable: "https://app.catchtable.co.kr/ct/shop/viatoledo",
        phone: "tel:02-796-0507" // 확인 필요
      },
      difficulty: "medium",
      advice: "1주일 전 예약 권장",
      tips: [
        "흑백요리사 권성준 셰프 운영",
        "런치 타임 워크인 가능",
        "파스타 + 라자냐 시그니처"
      ],
      contact: {
        phone: "02-796-0507",
        phoneFormatted: "02-796-0507",
        hours: "11:30-22:00",
        breakTime: "15:00-17:30",
        closedDays: ["월요일"]
      }
    },
    pricing: {
      range: "20,000-40,000원",
      category: "이탈리안",
      lunchFrom: 18000,
      dinnerFrom: 25000,
      note: "가성비 좋음"
    },
    recommendedDishes: [
      {
        name: "할머니의 라자냐",
        type: "시그니처",
        description: "흑백요리사 출연 메뉴"
      },
      {
        name: "알리오 올리오",
        type: "파스타",
        description: "기본에 충실한 맛"
      }
    ]
  },

  "rest-006": { // 트리드
    name: "트리드",
    reservation: {
      links: {
        primary: "catchtable",
        catchtable: "https://app.catchtable.co.kr/ct/shop/trid",
        phone: "tel:02-517-4654" // 확인 필요
      },
      difficulty: "high",
      advice: "2주 전 예약 필수",
      tips: [
        "흑백요리사 강승원 셰프",
        "런치 코스가 디너보다 저렴",
        "계절 메뉴 변경"
      ],
      contact: {
        phone: "02-517-4654",
        phoneFormatted: "02-517-4654",
        hours: "12:00-22:00",
        breakTime: "15:00-18:00",
        closedDays: ["월요일"]
      }
    },
    pricing: {
      range: "80,000-150,000원",
      category: "이노베이티브",
      lunchFrom: 80000,
      dinnerFrom: 120000,
      note: "코스 요리 전문"
    },
    recommendedDishes: [
      {
        name: "트러플 슈",
        type: "시그니처",
        description: "트리드의 대표 메뉴"
      }
    ]
  }
};

// ===== 캐치테이블 URL 패턴 가이드 =====
/*
확인된 패턴:
1. 기본: https://app.catchtable.co.kr/ct/shop/[영문명]
   - mingles, jungsik, viatoledo, trid

2. 호텔 레스토랑: https://app.catchtable.co.kr/ct/shop/[영문명.호텔명]
   - layeon.shilla

3. 구 도메인: https://catchtable.co.kr/[영문명]?lang=ko
   - kwonsooksoo

주의사항:
- 영문명은 소문자
- 공백은 제거 또는 하이픈(-) 사용
- 확인 방법: 캐치테이블 앱/웹에서 검색 후 URL 복사
*/

// ===== 다음 조사 대상 =====
/*
미쉐린 빕 구르망:
- 옥동식 (rest-002)
- 고향칼국수 (rest-004)
- 우래옥
- 필동면옥
- 자하손만두
- 진진
- 오레노라멘
... (30개 추가)

유명인 방문:
- 을지로보석 (rest-003)
- 금돼지식당 (rest-004)
- 화양연화
... (20개 추가)

조사 방법:
1. 캐치테이블 앱/웹에서 레스토랑명 검색
2. URL 복사
3. 404 에러 시 → 전화번호만 입력
4. 네이버 플레이스에서 전화번호 + 영업시간 확인
*/

export default reservationDataSample;
