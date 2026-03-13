const nearbySpots = [
  {
    id: "rest-001",
    name: "밍글스",
    location: "서울 강남구",
    category: "이노베이티브",
    mainMenu: "멸치 국수와 전복",
    travelMinutes: 12,
    travelTime: "도보 12분(예상)",
    distanceKm: 1.1,
    saves: 284,
    bestRoute: "가장 효율적: 도보",
    badges: ["미쉐린 3스타", "검증 완료"],
    context: "미쉐린 가이드 2025 3스타 승격 (국내 유일)",
    status: "검증 완료",
    updatedAt: "2026-02-01",
    group: "michelin",
    image: "assets/images/restaurants/mingles.jpg",
    lat: 37.524815,
    lng: 127.044955,
    mapQuery: "밍글스 서울 강남구",

    // 예약 정보
    reservation: {
      links: {
        primary: "catchtable",
        catchtable: "https://app.catchtable.co.kr/ct/shop/mingles",
        naverPlace: "https://map.naver.com/v5/entry/place/159330481",
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

    // 가격 정보 (구독자 전용)
    pricing: {
      range: "150,000-200,000원",
      category: "파인다이닝",
      lunchFrom: 70000,
      dinnerFrom: 150000,
      note: "1인 기준, 주류 별도"
    },

    // 추천 메뉴 (구독자 전용)
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
  {
    id: "rest-002",
    name: "옥동식",
    location: "서울 마포구",
    category: "돼지국밥",
    mainMenu: "돼지곰탕",
    travelMinutes: 15,
    travelTime: "대중교통 15분(예상)",
    distanceKm: 2.2,
    saves: 196,
    bestRoute: "가장 효율적: 대중교통",
    badges: ["빕 구르망", "검증 완료"],
    context: "미쉐린 빕 구르망 등재 식당",
    status: "검증 완료",
    updatedAt: "2026-02-01",
    group: "michelin",
    lat: 37.555355,
    lng: 126.914614,
    mapQuery: "옥동식 서울 마포구",

    // 예약 정보
    reservation: {
      links: {
        primary: "catchtable",
        catchtable: "https://app.catchtable.co.kr/ct/shop/okdongsik",
        naverPlace: "https://map.naver.com/v5/entry/place/1113715099",
        phone: "tel:02-337-8582"
      },
      difficulty: "medium",
      advice: "1주일 전 예약 권장, 웨이팅 가능",
      tips: [
        "점심 시간대 웨이팅 1-2시간",
        "평일 오후 2-3시 한가함",
        "주말은 오전 11시 오픈 직후 방문 추천"
      ],
      contact: {
        phone: "02-337-8582",
        phoneFormatted: "02-337-8582",
        hours: "매일 10:30-21:00",
        breakTime: null,
        closedDays: ["일요일"]
      }
    },

    pricing: {
      range: "10,000-15,000원",
      category: "빕 구르망",
      lunchFrom: 10000,
      dinnerFrom: 10000,
      note: "가성비 좋음"
    },

    recommendedDishes: [
      {
        name: "돼지곰탕",
        type: "시그니처",
        description: "옥동식의 대표 메뉴"
      },
      {
        name: "돼지국밥",
        type: "메인",
        description: "진한 육수가 특징"
      }
    ]
  },
  {
    id: "rest-003",
    name: "을지로보석",
    location: "서울 중구",
    category: "한식 주점",
    mainMenu: "들기름 낙지젓 카펠리니",
    travelMinutes: 18,
    travelTime: "도보 18분(예상)",
    distanceKm: 1.8,
    saves: 143,
    bestRoute: "가장 효율적: 도보",
    badges: ["유명인 추천", "검증 완료"],
    context: "공식 채널 공개 방문 기준",
    status: "검증 완료",
    updatedAt: "2026-02-01",
    group: "celebrity",
    lat: 37.564412,
    lng: 126.992811,
    mapQuery: "을지로보석 서울 중구",

    reservation: {
      links: {
        primary: "catchtable",
        catchtable: "https://app.catchtable.co.kr/ct/shop/euljiro-boseok",
        naverPlace: null,
        phone: "tel:02-2277-0584"
      },
      difficulty: "medium",
      advice: "저녁 시간대 예약 권장",
      tips: [
        "유명인 방문 이후 예약 어려움",
        "평일 점심이 저녁보다 여유",
        "전화 예약 가능"
      ],
      contact: {
        phone: "02-2277-0584",
        phoneFormatted: "02-2277-0584",
        hours: "매일 11:30-22:00",
        breakTime: "15:00-17:00",
        closedDays: ["일요일"]
      }
    },

    pricing: {
      range: "20,000-40,000원",
      category: "한식 주점",
      lunchFrom: 15000,
      dinnerFrom: 25000,
      note: "1인당 주류 포함"
    },

    recommendedDishes: [
      {
        name: "들기름 낙지젓 카펠리니",
        type: "시그니처",
        description: "정용진 회장 추천 메뉴"
      }
    ]
  },
  {
    id: "rest-004",
    name: "금돼지식당",
    location: "서울 중구",
    category: "돼지고기 구이",
    mainMenu: "본삼겹",
    travelMinutes: 22,
    travelTime: "차량 22분(예상)",
    distanceKm: 4.6,
    saves: 317,
    bestRoute: "가장 효율적: 차량",
    badges: ["유명인 방문", "검증 완료"],
    context: "공식 계정 출처 기반 검증",
    status: "검증 완료",
    updatedAt: "2026-02-01",
    group: "celebrity",
    lat: 37.557121,
    lng: 127.013033,
    mapQuery: "금돼지식당 서울 중구",

    reservation: {
      links: {
        primary: "catchtable",
        catchtable: "https://app.catchtable.co.kr/ct/shop/goldpig",
        naverPlace: null,
        phone: "tel:02-2277-5892"
      },
      difficulty: "high",
      advice: "2주 전 예약 필수",
      tips: [
        "BTS 정국 방문 이후 예약 폭증",
        "웨이팅 3시간 이상 가능",
        "평일 오픈 직후 웨이팅 등록 추천"
      ],
      contact: {
        phone: "02-2277-5892",
        phoneFormatted: "02-2277-5892",
        hours: "매일 11:00-22:00",
        breakTime: null,
        closedDays: []
      }
    },

    pricing: {
      range: "25,000-40,000원",
      category: "고기 구이",
      lunchFrom: 25000,
      dinnerFrom: 30000,
      note: "1인분 기준"
    },

    recommendedDishes: [
      {
        name: "본삼겹",
        type: "시그니처",
        description: "금돼지식당의 대표 메뉴"
      }
    ]
  },
  {
    id: "rest-005",
    name: "비아 톨레도 파스타바",
    location: "서울 용산구",
    category: "이탈리안",
    mainMenu: "할머니의 라자냐",
    travelMinutes: 25,
    travelTime: "대중교통 25분(예상)",
    distanceKm: 5.2,
    saves: 168,
    bestRoute: "가장 효율적: 대중교통",
    badges: ["흑백요리사", "검증 완료"],
    context: "출연 셰프 운영 매장 기준",
    status: "검증 완료",
    updatedAt: "2026-02-01",
    group: "chef",
    lat: 37.538522,
    lng: 126.971811,
    mapQuery: "비아 톨레도 파스타바 서울 용산구",

    reservation: {
      links: {
        primary: "catchtable",
        catchtable: "https://app.catchtable.co.kr/ct/shop/viatoledo",
        naverPlace: null,
        phone: "tel:02-796-0507"
      },
      difficulty: "medium",
      advice: "1주일 전 예약 권장",
      tips: [
        "흑백요리사 권성준 셰프 운영",
        "런치 타임 워크인 가능",
        "저녁은 예약 필수"
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
  {
    id: "rest-006",
    name: "트리드",
    location: "서울 강남구",
    category: "이노베이티브",
    mainMenu: "트러플 슈",
    travelMinutes: 30,
    travelTime: "차량 30분(예상)",
    distanceKm: 6.4,
    saves: 121,
    bestRoute: "가장 효율적: 차량",
    badges: ["흑백요리사", "검증 완료"],
    context: "출연 셰프 운영/협업 여부 확인 완료",
    status: "검증 완료",
    updatedAt: "2026-02-01",
    group: "chef",
    lat: 37.523421,
    lng: 127.041355,
    mapQuery: "트리드 서울 강남구",

    reservation: {
      links: {
        primary: "catchtable",
        catchtable: "https://app.catchtable.co.kr/ct/shop/trid",
        naverPlace: null,
        phone: "tel:02-517-4654"
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
];

const trustEvidence = [
  {
    title: "미쉐린 가이드 등재",
    caption: "가이드 등재 연도와 등급을 카드에 표기합니다.",
    badgeType: "미쉐린",
    level: 5,
    sourceLabel: "미쉐린 가이드",
    sourceUrl: "https://guide.michelin.com/kr/ko",
    verifiedAt: "2026-02-01",
    scope: "공식 가이드 링크 확인",
    icon: "michelin",
    iconLabel: "MIC"
  },
  {
    title: "유명인 방문",
    caption: "방송/공식 SNS/인터뷰에서 동일 장소가 확인된 경우만 반영합니다.",
    badgeType: "유명인",
    level: 4,
    sourceLabel: "공식 유튜브",
    sourceUrl: "https://youtube.com/@sungsikyung",
    verifiedAt: "2026-02-01",
    scope: "공식 채널 출처",
    icon: "youtube",
    iconLabel: "YT"
  },
  {
    title: "흑백요리사 출연진",
    caption: "출연 셰프의 운영/협업 매장을 구분해 표기합니다.",
    badgeType: "흑백요리사",
    level: 4,
    sourceLabel: "예약 플랫폼",
    sourceUrl: "https://catchtable.co.kr",
    verifiedAt: "2026-02-01",
    scope: "운영 여부 검증",
    icon: "catchtable",
    iconLabel: "CT"
  },
  {
    title: "정정/삭제 프로세스",
    caption: "오정보 신고 시 근거 재확인 후 즉시 갱신합니다.",
    badgeType: "운영 정책",
    level: 3,
    sourceLabel: "정책 공개",
    sourceUrl: "https://kpopeats.cc/privacy.html",
    verifiedAt: "2026-02-01",
    scope: "정책 공개",
    icon: "policy",
    iconLabel: "TR"
  }
];

const michelinSpots = [
  {
    name: "밍글스",
    location: "서울 강남구",
    category: "이노베이티브",
    mainMenu: "멸치 국수와 전복",
    badgeType: "미쉐린 3스타",
    sourceLabel: "미쉐린 가이드",
    sourceUrl: "https://guide.michelin.com/kr/ko/seoul-capital-area/kr-seoul/restaurant/mingles",
    verifiedAt: "2026-02-01",
    image: "assets/images/restaurants/mingles.jpg",
    lat: 37.524815,
    lng: 127.044955,
    mapQuery: "밍글스 서울 강남구"
  },
  {
    name: "옥동식",
    location: "서울 마포구",
    category: "돼지국밥",
    mainMenu: "돼지곰탕",
    badgeType: "빕 구르망",
    sourceLabel: "미쉐린 가이드",
    sourceUrl: "https://guide.michelin.com/kr/ko/seoul-capital-area/kr-seoul/restaurant/okdongsik",
    verifiedAt: "2026-02-01",
    lat: 37.555355,
    lng: 126.914614,
    mapQuery: "옥동식 서울 마포구"
  },
  {
    name: "정식당",
    location: "서울 강남구",
    category: "뉴 코리안",
    mainMenu: "맛있는 김밥",
    badgeType: "미쉐린 2스타",
    sourceLabel: "미쉐린 가이드",
    sourceUrl: "https://www.google.com/search?q=https://guide.michelin.com/kr/ko/seoul-capital-area/kr-seoul/restaurant/jungsik",
    verifiedAt: "2026-02-01",
    lat: 37.525546,
    lng: 127.040714,
    mapQuery: "정식당 서울 강남구"
  },
  {
    name: "고향칼국수",
    location: "서울 종로구",
    category: "칼국수",
    mainMenu: "손칼국수",
    badgeType: "빕 구르망",
    sourceLabel: "미쉐린 가이드",
    sourceUrl: "https://www.google.com/search?q=https://guide.michelin.com/kr/ko/seoul-capital-area/kr-seoul/restaurant/gohyang-kalguksu",
    verifiedAt: "2026-02-01",
    lat: 37.570138,
    lng: 127.000612,
    mapQuery: "고향칼국수 서울 종로구"
  }
];

const celebritySpots = [
  {
    name: "화양연화",
    location: "서울 종로구",
    category: "태국 음식",
    mainMenu: "팟타이",
    badgeType: "성시경 먹을텐데",
    sourceLabel: "공식 유튜브",
    sourceUrl: "https://youtube.com/@sungsikyung",
    verifiedAt: "2026-02-01",
    lat: 37.579712,
    lng: 126.985633,
    mapQuery: "화양연화 서울 종로구"
  },
  {
    name: "금돼지식당",
    location: "서울 중구",
    category: "돼지고기 구이",
    mainMenu: "본삼겹",
    badgeType: "BTS 정국 방문",
    sourceLabel: "공식 인스타그램",
    sourceUrl: "https://www.google.com/search?q=https://instagram.com/goldpig1982",
    verifiedAt: "2026-02-01",
    lat: 37.557121,
    lng: 127.013033,
    mapQuery: "금돼지식당 서울 중구"
  },
  {
    name: "을지로보석",
    location: "서울 중구",
    category: "한식 주점",
    mainMenu: "들기름 낙지젓 카펠리니",
    badgeType: "정용진 회장 추천",
    sourceLabel: "공식 인스타그램",
    sourceUrl: "https://instagram.com/euljiro_boseok",
    verifiedAt: "2026-02-01",
    lat: 37.564412,
    lng: 126.992811,
    mapQuery: "을지로보석 서울 중구"
  },
  {
    name: "사랑방칼국수",
    location: "서울 중구",
    category: "백숙",
    mainMenu: "백숙 백반",
    badgeType: "허영만 식객",
    sourceLabel: "네이버 검색",
    sourceUrl: "https://www.google.com/search?q=https://search.naver.com/search.naver%3Fquery%3D%EC%82%AC%EB%9E%91%EB%B0%A9%EC%B9%BC%EA%B5%AD%EC%88%98",
    verifiedAt: "2026-02-01",
    lat: 37.564532,
    lng: 126.993355,
    mapQuery: "사랑방칼국수 서울 중구"
  },
  {
    name: "잭슨피자",
    location: "서울 용산구",
    category: "피자",
    mainMenu: "슈퍼 잭슨",
    badgeType: "최자로드",
    sourceLabel: "공식 유튜브",
    sourceUrl: "https://www.google.com/search?q=https://youtube.com/%40the_m_show",
    verifiedAt: "2026-02-01",
    lat: 37.534911,
    lng: 127.008422,
    mapQuery: "잭슨피자 서울 용산구"
  }
];

const chefSpots = [
  {
    name: "디핀",
    location: "서울 중구",
    address: "서울 중구 퇴계로 411",
    category: "프렌치 에스닉",
    mainMenu: "머쉬룸 타르트",
    badgeType: "윤남노 셰프",
    sourceLabel: "캐치테이블",
    sourceUrl: "https://catchtable.co.kr/deepin",
    verifiedAt: "2026-02-01",
    lat: 37.565211,
    lng: 127.017122,
    mapQuery: "디핀 서울 중구"
  },
  {
    name: "트리드",
    location: "서울 강남구",
    address: "서울 강남구 선릉로162길 16",
    category: "이노베이티브",
    mainMenu: "트러플 슈",
    badgeType: "강승원 셰프",
    sourceLabel: "캐치테이블",
    sourceUrl: "https://catchtable.co.kr/trid",
    verifiedAt: "2026-02-01",
    lat: 37.523421,
    lng: 127.041355,
    mapQuery: "트리드 서울 강남구"
  },
  {
    name: "비아 톨레도 파스타바",
    location: "서울 용산구",
    address: "서울 용산구 원효로83길 7-2",
    category: "이탈리안",
    mainMenu: "할머니의 라자냐",
    badgeType: "권성준 셰프",
    sourceLabel: "캐치테이블",
    sourceUrl: "https://catchtable.co.kr/viatoledo",
    verifiedAt: "2026-02-01",
    lat: 37.538522,
    lng: 126.971811,
    mapQuery: "비아 톨레도 파스타바 서울 용산구"
  },
  {
    name: "레스토랑 네오",
    location: "서울 서초구",
    address: "서울 서초구 사임당로 185",
    category: "일식 다이닝",
    mainMenu: "닭 날개 만두",
    badgeType: "윤남노 셰프",
    sourceLabel: "캐치테이블",
    sourceUrl: "https://catchtable.co.kr/restaurantneo",
    verifiedAt: "2026-02-01",
    lat: 37.491633,
    lng: 127.011422,
    mapQuery: "레스토랑 네오 서울 서초구"
  },
  {
    name: "리북방",
    location: "서울 마포구",
    address: "서울 마포구 마포대로14길 16",
    category: "이북음식 오마카세",
    mainMenu: "순대 플래터",
    badgeType: "최강록 셰프",
    sourceLabel: "캐치테이블",
    sourceUrl: "https://catchtable.co.kr/leebukbang",
    verifiedAt: "2026-02-01",
    lat: 37.541611,
    lng: 126.945533,
    mapQuery: "리북방 서울 마포구"
  }
];

const allRestaurantsRaw = [
  "밍글스 | 서울 | 강남구 | 미쉐린 가이드 | 미쉐린 3스타 | 멸치 국수와 전복 | 미쉐린 가이드 | 2026-02-01 | michelin | https://guide.michelin.com/kr/ko/seoul-capital-area/kr-seoul/restaurant/mingles",
  "옥동식 | 서울 | 마포구 | 미쉐린 가이드 | 빕 구르망 | 돼지곰탕 | 미쉐린 가이드 | 2026-02-01 | michelin | https://guide.michelin.com/kr/ko/seoul-capital-area/kr-seoul/restaurant/okdongsik",
  "정식당 | 서울 | 강남구 | 미쉐린 가이드 | 미쉐린 2스타 | 맛있는 김밥 | 미쉐린 가이드 | 2026-02-01 | michelin | https://www.google.com/search?q=https://guide.michelin.com/kr/ko/seoul-capital-area/kr-seoul/restaurant/jungsik",
  "고향칼국수 | 서울 | 종로구 | 미쉐린 가이드 | 빕 구르망 | 손칼국수 | 미쉐린 가이드 | 2026-02-01 | michelin | https://www.google.com/search?q=https://guide.michelin.com/kr/ko/seoul-capital-area/kr-seoul/restaurant/gohyang-kalguksu",
  "라연 | 서울 | 중구 | 미쉐린 가이드 | 미쉐린 2스타 | 신선로 | 미쉐린 가이드 | 2026-02-01 | michelin | https://guide.michelin.com/kr/ko/seoul-capital-area/kr-seoul/restaurant/la-yeon",
  "코지마 | 서울 | 강남구 | 미쉐린 가이드 | 미쉐린 2스타 | 스시 오마카세 | 출처 확인 중 | 2026-01-19 | michelin",
  "우래옥 | 서울 | 중구 | 미쉐린 가이드 | 빕 구르망 | 전통 평양냉면 | 출처 확인 중 | 2026-01-19 | michelin",
  "필동면옥 | 서울 | 중구 | 미쉐린 가이드 | 빕 구르망 | 물냉면 | 출처 확인 중 | 2026-01-19 | michelin",
  "자하 손만두 | 서울 | 종로구 | 미쉐린 가이드 | 빕 구르망 | 만두전골 | 출처 확인 중 | 2026-01-19 | michelin",
  "진진 | 서울 | 마포구 | 미쉐린 가이드 | 빕 구르망 | 멘보샤 | 출처 확인 중 | 2026-01-19 | michelin",
  "소이연남마오 | 서울 | 강남구 | 미쉐린 가이드 | 빕 구르망 | 소고기 국수 | 출처 확인 중 | 2026-01-19 | michelin",
  "오레노라면 | 서울 | 마포구 | 미쉐린 가이드 | 빕 구르망 | 토리빠이탄 | 출처 확인 중 | 2026-01-19 | michelin",
  "팩피 | 서울 | 성동구 | 미쉐린 가이드 | 빕 구르망 | 고수 파스타 | 출처 확인 중 | 2026-01-19 | michelin",
  "에그앤플라워 | 서울 | 용산구 | 미쉐린 가이드 | 빕 구르망 | 홍새우 먹물 파스타 | 출처 확인 중 | 2026-01-19 | michelin",
  "미진 | 서울 | 종로구 | 미쉐린 가이드 | 빕 구르망 | 냉메밀 | 출처 확인 중 | 2026-01-19 | michelin",
  "만두집 | 서울 | 강남구 | 미쉐린 가이드 | 빕 구르망 | 만두전골 | 출처 확인 중 | 2026-01-19 | michelin",
  "개성만두 궁 | 서울 | 종로구 | 미쉐린 가이드 | 빕 구르망 | 조랭이 떡만둣국 | 출처 확인 중 | 2026-01-19 | michelin",
  "삼청동 수제비 | 서울 | 종로구 | 미쉐린 가이드 | 빕 구르망 | 수제비 | 출처 확인 중 | 2026-01-19 | michelin",
  "구복만두 | 서울 | 용산구 | 미쉐린 가이드 | 빕 구르망 | 구복전통만두 | 출처 확인 중 | 2026-01-19 | michelin",
  "황생가 칼국수 | 서울 | 종로구 | 미쉐린 가이드 | 빕 구르망 | 사골칼국수 | 출처 확인 중 | 2026-01-19 | michelin",
  "명동교자 | 서울 | 중구 | 미쉐린 가이드 | 빕 구르망 | 칼국수 | 출처 확인 중 | 2026-01-19 | michelin",
  "금돼지식당 | 서울 | 중구 | 미쉐린 가이드 | 빕 구르망 | 본삼겹 | 공식 인스타그램 | 2026-02-01 | michelin | https://instagram.com/goldpig1982",
  "툭툭소이타이 | 서울 | 마포구 | 미쉐린 가이드 | 빕 구르망 | 똠양꿍 | 출처 확인 중 | 2026-01-19 | michelin",
  "류니끄 | 서울 | 강남구 | 미쉐린 가이드 | 미쉐린 이노베이티브 | 하이브리드 퀴진 코스 | 출처 확인 중 | 2026-01-19 | michelin",
  "스와니예 | 서울 | 강남구 | 미쉐린 가이드 | 미쉐린 2스타 | 에피소드 코스 | 출처 확인 중 | 2026-01-19 | michelin",
  "권숙수 | 서울 | 강남구 | 미쉐린 가이드 | 미쉐린 2스타 | 숙수 주상 | 출처 확인 중 | 2026-01-19 | michelin",
  "알라 프리마 | 서울 | 강남구 | 미쉐린 가이드 | 미쉐린 2스타 | 이노베이티브 테이스팅 메뉴 | 출처 확인 중 | 2026-01-19 | michelin",
  "제로콤플렉스 | 서울 | 중구 | 미쉐린 가이드 | 미쉐린 1스타 | 내추럴 와인 페어링 코스 | 출처 확인 중 | 2026-01-19 | michelin",
  "화양연화 | 서울 | 종로구 | 태국 음식 | 성시경 먹을텐데 | 팟타이 | 공식 유튜브 | 2026-02-01 | celebrity | https://youtube.com/@sungsikyung",
  "을지로보석 | 서울 | 중구 | 한식 주점 | 정용진 회장 추천 | 들기름 낙지젓 카펠리니 | 공식 인스타그램 | 2026-02-01 | celebrity | https://instagram.com/euljiro_boseok",
  "사랑방칼국수 | 서울 | 중구 | 백숙 | 허영만 식객 | 백숙 백반 | 네이버 검색 | 2026-02-01 | celebrity | https://www.google.com/search?q=https://search.naver.com/search.naver%3Fquery%3D%EC%82%AC%EB%9E%91%EB%B0%A9%EC%B9%BC%EA%B5%AD%EC%88%98",
  "잭슨피자 | 서울 | 용산구 | 피자 | 최자로드 | 슈퍼 잭슨 | 공식 유튜브 | 2026-02-01 | celebrity | https://www.google.com/search?q=https://youtube.com/%40the_m_show",
  "산수갑산 | 서울 | 중구 | 순대 | 수요미식회 | 순대 모듬 | 출처 확인 중 | 2026-01-19 | celebrity",
  "대도식당 | 서울 | 성동구 | 소고기 구이 | 허영만 식객 | 한우 등심 | 출처 확인 중 | 2026-01-19 | celebrity",
  "남포면옥 | 서울 | 중구 | 평양냉면 | 수요미식회 | 어복쟁반 | 출처 확인 중 | 2026-01-19 | celebrity",
  "한강껍데기 | 서울 | 마포구 | 돼지 껍데기 | 성시경 먹을텐데 | 칼껍데기 | 출처 확인 중 | 2026-01-19 | celebrity",
  "호남식당 | 서울 | 중구 | 물갈비 | 백종원 3대천왕 | 돼지물갈비 | 출처 확인 중 | 2026-01-19 | celebrity",
  "진미평양냉면 | 서울 | 강남구 | 평양냉면 | 성시경 먹을텐데 | 제육 | 출처 확인 중 | 2026-01-19 | celebrity",
  "영천영화 | 서울 | 강남구 | 소고기 육회 | 전지적 참견 시점 | 한우 육회 비빔밥 | 출처 확인 중 | 2026-01-19 | celebrity",
  "고기리막국수 | 경기 | 용인시 | 막국수 | 허영만 식객 | 들기름 막국수 | 출처 확인 중 | 2026-01-19 | celebrity",
  "뜨락 | 서울 | 강남구 | 소고기 구이 | 수요미식회 | 안심 | 출처 확인 중 | 2026-01-19 | celebrity",
  "우진해장국 | 제주 | 제주시 | 해장국 | 수요미식회 | 고사리 육개장 | 출처 확인 중 | 2026-01-19 | celebrity",
  "이문설농탕 | 서울 | 종로구 | 설렁탕 | 맛있는 녀석들 | 설농탕 | 출처 확인 중 | 2026-01-19 | celebrity",
  "대성집 | 서울 | 종로구 | 해장국 | 성시경 먹을텐데 | 도가니탕 | 출처 확인 중 | 2026-01-19 | celebrity",
  "마포옥 | 서울 | 마포구 | 설렁탕 | 미쉐린 가이드 | 양지설렁탕 | 출처 확인 중 | 2026-01-19 | celebrity",
  "하동관 | 서울 | 중구 | 곰탕 | 식객 허영만 | 특곰탕 | 출처 확인 중 | 2026-01-19 | celebrity",
  "청담안 | 서울 | 강남구 | 요리주점 | 정용진 회장 추천 | 안주 모듬 | 출처 확인 중 | 2026-01-19 | celebrity",
  "새벽집 | 서울 | 강남구 | 육회비빔밥 | 수요미식회 | 꽃등심 | 출처 확인 중 | 2026-01-19 | celebrity",
  "약수순대 | 서울 | 중구 | 순대국 | 성시경 먹을텐데 | 순대국 | 출처 확인 중 | 2026-01-19 | celebrity",
  "오통영 | 서울 | 강남구 | 한식 | 수요미식회 | 전복 무쇠솥밥 | 출처 확인 중 | 2026-01-19 | celebrity",
  "바다식당 | 서울 | 용산구 | 부대찌개 | 백종원 3대천왕 | 존슨탕 | 출처 확인 중 | 2026-01-19 | celebrity",
  "갯벌의진주 | 서울 | 강남구 | 조개구이 | BTS 진 방문 | 조개구이 세트 | 출처 확인 중 | 2026-01-19 | celebrity",
  "우정 | 서울 | 강남구 | 해장국 | 최자로드 | 등골 | 출처 확인 중 | 2026-01-19 | celebrity",
  "서린낙지 | 서울 | 종로구 | 낙지볶음 | 백종원 3대천왕 | 낙지볶음 | 출처 확인 중 | 2026-01-19 | celebrity",
  "진주회관 | 서울 | 중구 | 콩국수 | 서울미래유산 | 냉콩국수 | 출처 확인 중 | 2026-01-19 | celebrity",
  "한옥집김치찜 | 서울 | 서대문구 | 김치요리 | 무한도전 출연 | 김치찜 | 출처 확인 중 | 2026-01-19 | celebrity",
  "평양면옥 | 서울 | 중구 | 평양냉면 | 수요미식회 | 접시만두 | 출처 확인 중 | 2026-01-19 | celebrity",
  "디핀 | 서울 | 중구 | 프렌치 에스닉 | 윤남노 셰프 | 머쉬룸 타르트 | 캐치테이블 | 2026-02-01 | chef | https://catchtable.co.kr/deepin",
  "트리드 | 서울 | 강남구 | 이노베이티브 | 강승원 셰프 | 트러플 슈 | 캐치테이블 | 2026-02-01 | chef | https://catchtable.co.kr/trid",
  "비아 톨레도 파스타바 | 서울 | 용산구 | 이탈리안 | 권성준 셰프 | 할머니의 라자냐 | 캐치테이블 | 2026-02-01 | chef | https://catchtable.co.kr/viatoledo",
  "레스토랑 네오 | 서울 | 서초구 | 일식 다이닝 | 최강록 셰프 | 닭 날개 만두 | 캐치테이블 | 2026-02-01 | chef | https://catchtable.co.kr/restaurantneo",
  "리북방 | 서울 | 마포구 | 이북음식 오마카세 | 최지형 셰프 | 순대 플래터 | 캐치테이블 | 2026-02-01 | chef | https://catchtable.co.kr/leebukbang",
  "도량 | 서울 | 종로구 | 중식 | 임태훈 셰프 | 훠궈 | 출처 확인 중 | 2026-01-19 | chef",
  "로컬릿 | 서울 | 성동구 | 이탈리안 | 남정석 셰프 | 채소 테린 | 출처 확인 중 | 2026-01-19 | chef",
  "에드워드 권 리츠칼튼 | 서울 | 강남구 | 파인 다이닝 | 에드워드 권 셰프 | 창작 코스 | 출처 확인 중 | 2026-01-19 | chef",
  "티엔미미 | 서울 | 서초구 | 중식 | 정지선 셰프 | 딤섬 | 출처 확인 중 | 2026-01-19 | chef",
  "파브리키친 | 서울 | 용산구 | 이탈리안 가스트로 | 파브리 셰프 | 파스타 | 출처 확인 중 | 2026-01-19 | chef",
  "만찢남 | 서울 | 강남구 | 중식 주점 | 조광효 셰프 | 동파육 | 출처 확인 중 | 2026-01-19 | chef",
  "구찌 오스테리아 | 서울 | 용산구 | 이탈리안 파인 다이닝 | 전형규 셰프 | 에밀리아 버거 | 출처 확인 중 | 2026-01-19 | chef",
  "쵸이닷 | 서울 | 강남구 | 이노베이티브 | 최현석 셰프 | 랍스터 파스타 | 출처 확인 중 | 2026-01-19 | chef",
  "보노보노 | 서울 | 강남구 | 해산물 뷔페 | 김승민 셰프 | 스시 | 출처 확인 중 | 2026-01-19 | chef",
  "안성재의 모수 | 서울 | 용산구 | 파인 다이닝 | 안성재 셰프 | 도토리 국수 | 출처 확인 중 | 2026-01-19 | chef",
  "띠또 | 서울 | 강남구 | 멕시칸 | 오준탁 셰프 | 타코 | 출처 확인 중 | 2026-01-19 | chef",
  "엘초코 데 테레노 | 서울 | 용산구 | 스페인 음식 | 신승환 셰프 | 생선 구이 | 출처 확인 중 | 2026-01-19 | chef",
  "네기 다이닝라운지 | 서울 | 강남구 | 일식 다이닝 | 장호준 셰프 | 네기 | 출처 확인 중 | 2026-01-19 | chef",
  "가보정 | 경기 | 수원시 | 소갈비 | 흑백요리사 출연 셰프 관련 | 양념갈비 | 출처 확인 중 | 2026-01-19 | chef",
  "야키토리 파지 | 서울 | 용산구 | 일식 구이 | 김병묵 셰프 | 야키토리 | 출처 확인 중 | 2026-01-19 | chef",
  "쵸이랩 | 서울 | 강남구 | 연구소형 다이닝 | 최현석 셰프 | 분자 요리 | 출처 확인 중 | 2026-01-19 | chef",
  "익스퀴진 | 서울 | 강남구 | 이노베이티브 | 장경원 셰프 | 스낵 | 출처 확인 중 | 2026-01-19 | chef",
  "묘미 | 서울 | 종로구 | 한식 다이닝 | 김정호 셰프 | 한식 코스 | 출처 확인 중 | 2026-01-19 | chef",
  "온지음 | 서울 | 종로구 | 한식 공방 | 조은희 셰프 | 제철 반상 | 출처 확인 중 | 2026-01-19 | chef",

  // ======== 베이커리 카페 ========
  "카페 어니언 성수 | 서울 | 성동구 | 베이커리 카페 | 인기 맛집 | 소금빵/크루아상 | 네이버 리뷰 | 2026-03-01 | bakery | https://map.naver.com/v5/entry/place/1071023551",
  "카페 어니언 안국 | 서울 | 종로구 | 베이커리 카페 | 인기 맛집 | 소금빵/크루아상 | 네이버 리뷰 | 2026-03-01 | bakery | https://map.naver.com/v5/entry/place/1232234566",
  "카페 어니언 미아 | 서울 | 강북구 | 베이커리 카페 | 인기 맛집 | 소금빵/크루아상 | 네이버 리뷰 | 2026-03-01 | bakery",
  "프릳츠 커피 컴퍼니 | 서울 | 마포구 | 베이커리 카페 | 인기 맛집 | 무화과깜빠뉴/크루아상 | 네이버 리뷰 | 2026-03-01 | bakery | https://map.naver.com/v5/entry/place/11836661",
  "밀도 성수 | 서울 | 성동구 | 베이커리 카페 | 인기 맛집 | 담백식빵 | 네이버 리뷰 | 2026-03-01 | bakery | https://map.naver.com/v5/entry/place/1194756038",
  "타르틴 베이커리 한남 | 서울 | 용산구 | 베이커리 카페 | 인기 맛집 | 사워도우 | 네이버 리뷰 | 2026-03-01 | bakery",
  "오월의종 | 서울 | 용산구 | 베이커리 카페 | 인기 맛집 | 호밀빵 | 네이버 리뷰 | 2026-03-01 | bakery",
  "브레드05 이촌 | 서울 | 용산구 | 베이커리 카페 | 인기 맛집 | 앙버터 | 네이버 리뷰 | 2026-03-01 | bakery",
  "런던베이글뮤지엄 | 서울 | 종로구 | 베이커리 카페 | 인기 맛집 | 무화과베이글 | 네이버 리뷰 | 2026-03-01 | bakery | https://map.naver.com/v5/entry/place/1264116328",
  "아우어베이커리 | 서울 | 강남구 | 베이커리 카페 | 인기 맛집 | 더티초코 | 네이버 리뷰 | 2026-03-01 | bakery | https://map.naver.com/v5/entry/place/1175564800",
  "누데이크 | 서울 | 강남구 | 베이커리 카페 | 인기 맛집 | 말차케이크 | 네이버 리뷰 | 2026-03-01 | bakery | https://map.naver.com/v5/entry/place/1212867060",
  "밀스 성수 | 서울 | 성동구 | 베이커리 카페 | 인기 맛집 | 사워도우 | 네이버 리뷰 | 2026-03-01 | bakery",
  "카페 레이어드 | 서울 | 마포구 | 베이커리 카페 | 인기 맛집 | 바질스콘 | 네이버 리뷰 | 2026-03-01 | bakery",
  "푸하하크림빵 | 서울 | 마포구 | 베이커리 카페 | 인기 맛집 | 소금크림빵 | 네이버 리뷰 | 2026-03-01 | bakery",
  "어글리베이커리 | 서울 | 마포구 | 베이커리 카페 | 인기 맛집 | 대파빵 | 네이버 리뷰 | 2026-03-01 | bakery",
  "쟝블랑제리 | 서울 | 관악구 | 베이커리 카페 | 인기 맛집 | 맘모스빵 | 네이버 리뷰 | 2026-03-01 | bakery",
  "우스블랑 | 서울 | 용산구 | 베이커리 카페 | 인기 맛집 | 몽블랑 | 네이버 리뷰 | 2026-03-01 | bakery",
  "김영모과자점 | 서울 | 서초구 | 베이커리 카페 | 인기 맛집 | 몽블랑 | 네이버 리뷰 | 2026-03-01 | bakery",
  "태극당 | 서울 | 중구 | 베이커리 카페 | 인기 맛집 | 모나카아이스크림 | 네이버 리뷰 | 2026-03-01 | bakery",
  "성심당 | 대전 | 중구 | 베이커리 카페 | 전국 인기 맛집 | 튀김소보로/부추빵 | 네이버 리뷰 | 2026-03-01 | bakery | https://map.naver.com/v5/entry/place/18541744",
  "이성당 | 전북 | 군산시 | 베이커리 카페 | 전국 인기 맛집 | 야채빵/단팥빵 | 네이버 리뷰 | 2026-03-01 | bakery",
  "삼송빵집 | 대구 | 중구 | 베이커리 카페 | 인기 맛집 | 통옥수수빵 | 네이버 리뷰 | 2026-03-01 | bakery",
  "황남빵 | 경북 | 경주시 | 베이커리 카페 | 전국 인기 맛집 | 황남빵 | 네이버 리뷰 | 2026-03-01 | bakery",
  "이흥용과자점 | 부산 | 남구 | 베이커리 카페 | 인기 맛집 | 명란바게트 | 네이버 리뷰 | 2026-03-01 | bakery",
  "비엔씨 베이커리 | 부산 | 해운대구 | 베이커리 카페 | 인기 맛집 | 파이만주 | 네이버 리뷰 | 2026-03-01 | bakery",
  "세느강 | 부산 | 중구 | 베이커리 카페 | 인기 맛집 | 마늘빵 | 네이버 리뷰 | 2026-03-01 | bakery",
  "제주당 | 제주 | 제주시 | 베이커리 카페 | 인기 맛집 | 오메기빵 | 네이버 리뷰 | 2026-03-01 | bakery",
  "궁전제과 | 광주 | 서구 | 베이커리 카페 | 인기 맛집 | 공룡알빵 | 네이버 리뷰 | 2026-03-01 | bakery",
  "타르틴 베이커리 RYSE | 서울 | 마포구 | 베이커리 카페 | 인기 맛집 | 사워도우 | 네이버 리뷰 | 2026-03-01 | bakery",
  "아티잔 베이커스 | 서울 | 용산구 | 베이커리 카페 | 인기 맛집 | 발효빵 | 네이버 리뷰 | 2026-03-01 | bakery"
];


// ========================================
// Restaurant Reservation Data (Auto-generated)
// ========================================
const restaurantReservations = {
  "밍글스": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/mingles",
      "naverPlace": "https://map.naver.com/v5/entry/place/159330481",
      "phone": "tel:02-515-7306"
    },
    "contact": {
      "phone": "02-515-7306",
      "phoneFormatted": "02-515-7306"
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": true,
      "phoneVerified": true
    }
  },
  "옥동식": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/okdongsik",
      "naverPlace": "https://map.naver.com/v5/entry/place/1113715099",
      "phone": "tel:02-337-8582"
    },
    "contact": {
      "phone": "02-337-8582",
      "phoneFormatted": "02-337-8582"
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": true,
      "phoneVerified": true
    }
  },
  "정식당": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/jungsik",
      "naverPlace": "https://map.naver.com/v5/entry/place/203294116",
      "phone": "tel:02-517-4654"
    },
    "contact": {
      "phone": "02-517-4654",
      "phoneFormatted": "02-517-4654"
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": true,
      "phoneVerified": true
    }
  },
  "고향칼국수": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/gohyang-kalguksu",
      "naverPlace": "https://map.naver.com/v5/entry/place/13118895",
      "phone": "tel:02-735-9247"
    },
    "contact": {
      "phone": "02-735-9247",
      "phoneFormatted": "02-735-9247"
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": true,
      "phoneVerified": true
    }
  },
  "라연": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/layeon.shilla",
      "naverPlace": "https://map.naver.com/v5/entry/place/11572065",
      "phone": "tel:02-2230-3367"
    },
    "contact": {
      "phone": "02-2230-3367",
      "phoneFormatted": "02-2230-3367"
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": true,
      "phoneVerified": true
    }
  },
  "코지마": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/kojima",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "우래옥": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/wooraeok",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "필동면옥": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/pildong-myeonok",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "자하 손만두": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/jaha-sonmandu",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "진진": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/jinjin",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "소이연남마오": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/soi-yeonnam-mao",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "오레노라면": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/orenoramen",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "팩피": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/fackpi",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "에그앤플라워": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/eggandflower",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "미진": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/mijin",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "만두집": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/mandujip",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "개성만두 궁": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/gaeseong-mandu-gung",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "삼청동 수제비": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/samcheongdong-sujebi",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "구복만두": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/gubok-mandu",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "황생가 칼국수": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/hwangsaengga-kalguksu",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "명동교자": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/myeongdong-gyoja",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "금돼지식당": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/goldpig",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "툭툭소이타이": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/tuktukthai",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "류니끄": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/l-unique",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "스와니예": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/swanieye",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "권숙수": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://catchtable.co.kr/kwonsooksoo?lang=ko",
      "naverPlace": null,
      "phone": "tel:02-542-6268"
    },
    "contact": {
      "phone": "02-542-6268",
      "phoneFormatted": "02-542-6268"
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": true
    }
  },
  "알라 프리마": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/allaprima",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "제로콤플렉스": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/zerocomplex",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "화양연화": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/hwayangflower",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "을지로보석": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/euljiro-boseok",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "사랑방칼국수": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/sarangbang-kalguksu",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "잭슨피자": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/jacksonpizza",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "산수갑산": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/sansugapsan",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "대도식당": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/daedo",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "남포면옥": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/nampomyeonok",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "한강껍데기": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/hangang-kkeopdeogi",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "호남식당": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/honam",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "진미평양냉면": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/jinmi",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "영천영화": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/youngchun",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "고기리막국수": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/gogiri",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "뜨락": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/teurak",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "우진해장국": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/woojin",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "이문설농탕": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/imun",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "대성집": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/daeseongjip",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "마포옥": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/mapooak",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "하동관": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/hadongkwan",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "청담안": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/cheongdam-an",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "새벽집": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/saebyeok",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "약수순대": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/yaksu-sundae",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "오통영": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/otongyoung",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "바다식당": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/bada",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "갯벌의진주": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/gaetbeol-jinju",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "우정": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/woojeong",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "서린낙지": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/seorin-nakji",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "진주회관": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/jinju-hoegwan",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "한옥집김치찜": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/hanokjip",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "평양면옥": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/pyeongyang-myeonok",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "디핀": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/deepin",
      "naverPlace": null,
      "phone": "tel:02-2260-2266"
    },
    "contact": {
      "phone": "02-2260-2266",
      "phoneFormatted": "02-2260-2266"
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": true
    }
  },
  "트리드": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/trid",
      "naverPlace": null,
      "phone": "tel:02-517-4654"
    },
    "contact": {
      "phone": "02-517-4654",
      "phoneFormatted": "02-517-4654"
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": true
    }
  },
  "비아 톨레도 파스타바": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/viatoledo",
      "naverPlace": null,
      "phone": "tel:02-796-0507"
    },
    "contact": {
      "phone": "02-796-0507",
      "phoneFormatted": "02-796-0507"
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": true
    }
  },
  "레스토랑 네오": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/restaurantneo",
      "naverPlace": null,
      "phone": "tel:02-3477-0371"
    },
    "contact": {
      "phone": "02-3477-0371",
      "phoneFormatted": "02-3477-0371"
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": true
    }
  },
  "리북방": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/leebukbang",
      "naverPlace": null,
      "phone": "tel:02-333-0039"
    },
    "contact": {
      "phone": "02-333-0039",
      "phoneFormatted": "02-333-0039"
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": true
    }
  },
  "도량": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/doryang",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "로컬릿": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/localeat",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "에드워드 권 리츠칼튼": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/edwardkwon",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "티엔미미": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/tienmimi",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "파브리키친": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/fabrikitchen",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "만찢남": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/manjjiknam",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "구찌 오스테리아": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/gucci-osteria",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "쵸이닷": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/choidot",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "보노보노": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/bonobono",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "안성재의 모수": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/mosu",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "띠또": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/tito",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "엘초코 데 테레노": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/elchoco",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "네기 다이닝라운지": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/negi",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "가보정": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/gabojeong",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "야키토리 파지": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/yakitoripaji",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "쵸이랩": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/choilab",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "익스퀴진": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/exquissine",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "묘미": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/myomi",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  },
  "온지음": {
    "links": {
      "primary": "catchtable",
      "catchtable": "https://app.catchtable.co.kr/ct/shop/onjium",
      "naverPlace": null,
      "phone": null
    },
    "contact": {
      "phone": null,
      "phoneFormatted": null
    },
    "status": {
      "catchtableVerified": false,
      "naverPlaceVerified": false,
      "phoneVerified": false
    }
  }
};

// 레스토랑별 대표 이미지 오버라이드
const restaurantImageOverrides = {
  "밍글스": "assets/images/restaurants/mingles.jpg",
  "옥동식": "assets/images/restaurants/okdongsik.jpg",
  "정식당": "assets/images/restaurants/jungsik.jpg",
  "고향칼국수": "assets/images/restaurants/gohyang.jpg",
  "라연": "assets/images/restaurants/layeon.jpg",
  "코지마": "assets/images/restaurants/kojima.jpg",
  "우래옥": "assets/images/restaurants/uraeok.jpg",
  "필동면옥": "assets/images/restaurants/pildong.jpg",
  "자하 손만두": "assets/images/restaurants/jaha.jpg",
  "진진": "assets/images/restaurants/jinjin.jpg",
  "소이연남마오": "assets/images/restaurants/soi.jpg",
  "오레노라면": "assets/images/restaurants/orenoramen.jpg",
  "팩피": "assets/images/restaurants/pakpak.jpg",
  "에그앤플라워": "assets/images/restaurants/eggandflower.jpg",
  "미진": "assets/images/restaurants/mijin.jpg",
  "만두집": "assets/images/restaurants/mandujip.jpg",
  "개성만두 궁": "assets/images/restaurants/gaesong.jpg",
  "삼청동 수제비": "assets/images/restaurants/samcheong.jpg",
  "구복만두": "assets/images/restaurants/gubok.jpg",
  "황생가 칼국수": "assets/images/restaurants/hwangsaeng.jpg",
  "명동교자": "assets/images/restaurants/myungdong.jpg",
  "금돼지식당": "assets/images/restaurants/goldpig.jpg",
  "툭툭소이타이": "assets/images/restaurants/tuktuk.jpg",
  "류니끄": "assets/images/restaurants/ryunique.jpg",
  "스와니예": "assets/images/restaurants/soigne.jpg",
  "권숙수": "assets/images/restaurants/kwonsooksu.jpg",
  "알라 프리마": "assets/images/restaurants/alaprima.jpg",
  "제로콤플렉스": "assets/images/restaurants/zerocomplex.jpg",
  // 유명인 맛집 (celebrity)
  "화양연화": "assets/images/restaurants/hwayanyeonhwa.jpg",
  "을지로보석": "assets/images/restaurants/euljiro_boseok.jpg",
  "사랑방칼국수": "assets/images/restaurants/sarangbang.jpg",
  "잭슨피자": "assets/images/restaurants/jacksonpizza.jpg",
  "산수갑산": "assets/images/restaurants/sansugapsan.jpg",
  "대도식당": "assets/images/restaurants/daedo.jpg",
  "남포면옥": "assets/images/restaurants/nampo.jpg",
  "한강껍데기": "assets/images/restaurants/hangang.jpg",
  "호남식당": "assets/images/restaurants/honam.jpg",
  "진미평양냉면": "assets/images/restaurants/jinmi.jpg",
  "영천영화": "assets/images/restaurants/yeongcheon.jpg",
  "고기리막국수": "assets/images/restaurants/gogiri.jpg",
  "뜨락": "assets/images/restaurants/tterak.jpg",
  "우진해장국": "assets/images/restaurants/woojin.jpg",
  "이문설농탕": "assets/images/restaurants/imun.jpg",
  "대성집": "assets/images/restaurants/daesung.jpg",
  "마포옥": "assets/images/restaurants/mapo_ok.jpg",
  "하동관": "assets/images/restaurants/hadongkwan.jpg",
  "새벽집": "assets/images/restaurants/saebyeok.jpg",
  "약수순대": "assets/images/restaurants/yaksu.jpg",
  "오통영": "assets/images/restaurants/otong.jpg",
  "바다식당": "assets/images/restaurants/bada.jpg",
  "갯벌의진주": "assets/images/restaurants/getbyeol.jpg",
  "우정": "assets/images/restaurants/woojung.jpg",
  "서린낙지": "assets/images/restaurants/seorin.jpg",
  "진주회관": "assets/images/restaurants/jinju.jpg",
  "한옥집김치찜": "assets/images/restaurants/hanok.jpg",
  "평양면옥": "assets/images/restaurants/pyongyang.jpg",
  // 흑백요리사 (chef)
  "디핀": "assets/images/restaurants/deepin.jpg",
  "트리드": "assets/images/restaurants/trid.jpg",
  "비아 톨레도 파스타바": "assets/images/restaurants/viatoledo.jpg",
  "리북방": "assets/images/restaurants/leebukbang.jpg",
  "도량": "assets/images/restaurants/doryang.jpg",
  "로컬릿": "assets/images/restaurants/localeat.jpg",
  "티엔미미": "assets/images/restaurants/tienmimi.jpg",
  "파브리키친": "assets/images/restaurants/fabrikitchen.jpg",
  "만찢남": "assets/images/restaurants/manchitnam.jpg",
  "구찌 오스테리아": "assets/images/restaurants/gucci.jpg",
  "쵸이닷": "assets/images/restaurants/choydot.jpg",
  "보노보노": "assets/images/restaurants/bonobono.jpg",
  "안성재의 모수": "assets/images/restaurants/mosu.jpg",
  "네기 다이닝라운지": "assets/images/restaurants/negi.jpg",
  "가보정": "assets/images/restaurants/gabojung.jpg",
  "쵸이랩": "assets/images/restaurants/choylab.jpg",
  "익스퀴진": "assets/images/restaurants/exquisine.jpg",
  "온지음": "assets/images/restaurants/onjium.jpg",
  // 베이커리 카페 (bakery)
  "카페 어니언 성수": "assets/images/restaurants/onion_seongsu.jpg",
  "카페 어니언 안국": "assets/images/restaurants/onion_anguk.jpg",
  "카페 어니언 미아": "assets/images/restaurants/onion_mia.jpg",
  "프릳츠 커피 컴퍼니": "assets/images/restaurants/fritz.jpg",
  "밀도 성수": "assets/images/restaurants/mildo.jpg",
  "타르틴 베이커리 한남": "assets/images/restaurants/tartine_hannam.jpg",
  "오월의종": "assets/images/restaurants/maybell.jpg",
  "브레드05 이촌": "assets/images/restaurants/bread05.jpg",
  "런던베이글뮤지엄": "assets/images/restaurants/londonbagel.jpg",
  "아우어베이커리": "assets/images/restaurants/ourhour.jpg",
  "누데이크": "assets/images/restaurants/nudake.jpg",
  "밀스 성수": "assets/images/restaurants/mills.jpg",
  "카페 레이어드": "assets/images/restaurants/layered.jpg",
  "푸하하크림빵": "assets/images/restaurants/puhaha.jpg",
  "어글리베이커리": "assets/images/restaurants/ugly.jpg",
  "쟝블랑제리": "assets/images/restaurants/jean.jpg",
  "우스블랑": "assets/images/restaurants/ousblanc.jpg",
  "김영모과자점": "assets/images/restaurants/kimym.jpg",
  "태극당": "assets/images/restaurants/taeguk.jpg",
  "성심당": "assets/images/restaurants/sungsim.jpg",
  "이성당": "assets/images/restaurants/yisung.jpg",
  "삼송빵집": "assets/images/restaurants/samsong.jpg",
  "황남빵": "assets/images/restaurants/hwangnam.jpg",
  "이흥용과자점": "assets/images/restaurants/yihung.jpg",
  "비엔씨 베이커리": "assets/images/restaurants/bnc.jpg",
  "세느강": "assets/images/restaurants/seine.jpg",
  "제주당": "assets/images/restaurants/jejudang.jpg",
  "궁전제과": "assets/images/restaurants/gungjeon.jpg",
  "타르틴 베이커리 RYSE": "assets/images/restaurants/tartine_ryse.jpg",
  "아티잔 베이커스": "assets/images/restaurants/artisan.jpg",
};

// ========================================
// 방문자 리뷰 요약 (네이버 스마트플레이스·캐치테이블 기반)
// ========================================
const restaurantReviewSummaries = {
  // ── 미쉐린 ──────────────────────────────
  "밍글스":          { keywords: ["창의적 한식 코스", "완벽한 서비스", "3시간 감동 식사"], summary: "미쉐린 3스타, 강민구 셰프의 창의적 모던 한식 파인다이닝" },
  "옥동식":          { keywords: ["깊고 은은한 육수", "버크셔K 돼지고기", "흑백요리사 화제"], summary: "돼지곰탕 외길 40년, 잡내 없는 진한 국물이 압권" },
  "정식당":          { keywords: ["전통 한식 현대적 재해석", "세련된 플레이팅", "뉴욕 미쉐린 2스타"], summary: "임정식 셰프의 글로벌 한식 파인다이닝, 격조 있는 미식 경험" },
  "고향칼국수":      { keywords: ["손으로 직접 썬 칼국수", "진한 멸치육수", "넷플릭스 소개"], summary: "광장시장 터줏대감, 새벽 반죽부터 시작하는 정성스러운 손칼국수" },
  "라연":            { keywords: ["신라호텔 23층 남산 뷰", "전통 한식 재해석", "서비스 만점"], summary: "신라호텔 최고층에서 즐기는 국가대표 한식, 뷰와 맛 모두 탁월" },
  "코지마":          { keywords: ["최상급 스시 오마카세", "히노키 편백 카운터", "서울 최정상 일식"], summary: "박경재 셰프의 정통 일식 오마카세, 서울 최고 수준의 스시 경험" },
  "우래옥":          { keywords: ["1946년 노포", "고기 육향 깊은 평양냉면", "불고기와 환상 조합"], summary: "서울 평양냉면의 전설, 묵직하고 고급스러운 육수가 압도적" },
  "필동면옥":        { keywords: ["묵직한 고기 육수", "깊은 냉면 국물", "미쉐린 빕 구르망"], summary: "충무로 골목 정통 평양냉면, 차별화된 깊고 특별한 육수 맛" },
  "자하 손만두":     { keywords: ["30년 부암동 노포", "조선간장 담백 국물", "쫄깃한 수제 만두피"], summary: "부암동 30년 터줏대감, 조미료 없이 직접 담근 간장으로 완성하는 만두" },
  "진진":            { keywords: ["바삭한 멘보샤", "가성비 미쉐린 빕 구르망", "인당 5만원 중식"], summary: "합정 골목 중식당, 인당 5만원 이하로 즐기는 미쉐린급 중국 요리" },
  "소이연남마오":    { keywords: ["정통 태국 맛", "내추럴 와인 페어링", "숯불 닭꼬치·뽀삐아"], summary: "수요미식회 소개 맛집, 내추럴 와인과 정통 태국 요리의 완벽한 조화" },
  "오레노라면":      { keywords: ["거품 닭뼈 파이탄 육수", "면·육수 무한리필", "7년 연속 미쉐린"], summary: "핸드믹서 거품 육수가 시그니처인 닭 라멘 전문점, 7년 연속 미쉐린 선정" },
  "팩피":            { keywords: ["고수·코코넛 창의적 생면 파스타", "미쉐린 등재", "성수동 핫플"], summary: "성수동 미쉐린 파스타 맛집, 독창적 조합의 생면 파스타" },
  "에그앤플라워":    { keywords: ["생면 파스타 풍미", "해방촌 테라스 야경", "와인 페어링"], summary: "해방촌 감성 파스타 레스토랑, 먹물 생면과 야경이 어우러진 특별한 공간" },
  "미진":            { keywords: ["70년 전통 메밀국수", "미쉐린 빕 구르망", "광화문 터줏대감"], summary: "광화문 70년 노포, 미쉐린 빕구르망 선정 냉메밀국수 전문점" },
  "만두집":          { keywords: ["평안도식 손만두", "맑은 사골 육수", "30년 전통"], summary: "30년 전통 미쉐린 빕구르망, 평안도식 담백한 만두국 전문점" },
  "개성만두 궁":     { keywords: ["9년 연속 미쉐린 빕 구르망", "개성식 담백한 만두", "한옥 분위기"], summary: "인사동 터줏대감, 9년 연속 미쉐린 선정 개성식 전통 만두집" },
  "삼청동 수제비":   { keywords: ["40년 노포", "바지락·멸치 국물", "대통령도 다녀간 맛집"], summary: "삼청동 40년 터줏대감, 미쉐린 빕구르망 수제비 전문점" },
  "구복만두":        { keywords: ["육즙 샤오롱바오", "미쉐린 빕 구르망", "바삭 군만두"], summary: "숙대입구 미쉐린 인증, 중국식 샤오롱바오와 군만두 전문점" },
  "황생가 칼국수":   { keywords: ["진한 사골 국물", "북촌한옥마을 위치", "미쉐린 빕 구르망"], summary: "북촌한옥마을 미쉐린 빕구르망, 깊은 사골 칼국수 전문점" },
  "명동교자":        { keywords: ["1966년 원조 칼국수", "7년 연속 미쉐린", "외국인 필수 코스"], summary: "명동 60년 전통 미쉐린 빕구르망, 칼국수와 만두의 원조 맛집" },
  "금돼지식당":      { keywords: ["국내산 본삼겹·갈빗대", "미쉐린 빕 구르망", "예약 필수"], summary: "약수역 미쉐린 빕구르망, 국내산 본삼겹 전문 돼지구이 식당" },
  "툭툭소이타이":    { keywords: ["정통 태국 가정식", "팟타이 맛집", "소박한 분위기"], summary: "연남동 정통 태국 음식, 현지 느낌 그대로의 가정식 맛집" },
  "류니끄":          { keywords: ["한국 식재료 파인다이닝", "미쉐린 1스타", "계절 테이스팅"], summary: "신사동 미쉐린 1스타, 한국 재료로 구현한 혁신적 퓨전 파인다이닝" },
  "스와니예":        { keywords: ["미쉐린 2스타", "현대 한식 철학", "전통·현대의 융합"], summary: "강남 미쉐린 2스타, 한국 정체성을 담은 현대적 파인다이닝" },
  "권숙수":          { keywords: ["45년 씨간장 발효 장류", "미쉐린 2스타", "트러플 콩국수"], summary: "청담 미쉐린 2스타, 전통 발효 장류로 완성하는 한식 파인다이닝" },
  "알라 프리마":     { keywords: ["재패니즈 이탈리안 퓨전", "미쉐린 2스타", "창의적 해산물 코스"], summary: "강남 미쉐린 2스타, 일본 기법과 이탈리안이 결합한 혁신적 파인다이닝" },
  "제로콤플렉스":    { keywords: ["미쉐린 1스타", "제철 식재료 이노베이티브", "내추럴 와인 페어링"], summary: "서래마을 미쉐린 1스타, 제철 식재료 중심 현대 프렌치 이노베이티브" },
  // ── 유명인 ──────────────────────────────
  "화양연화":        { keywords: ["직원이 구워주는 고기", "커플·소개팅 명소", "예약 필수"], summary: "용산 감성 고기집, 직원이 직접 구워주는 고퀄리티 고기와 분위기" },
  "을지로보석":      { keywords: ["나물 요리 탁월", "월 1회 예약 오픈", "내추럴 와인 페어링"], summary: "예약 극히 어려운 오마카세, 보리새우 전과 나물 요리가 압도적" },
  "사랑방칼국수":    { keywords: ["1968년 을지로 노포", "백숙백반 가성비", "고소한 칼국수 면"], summary: "을지로 60년 노포, 백숙백반과 칼국수가 유명한 서민 맛집" },
  "잭슨피자":        { keywords: ["쫄깃한 두꺼운 도우", "미국식 정통 피자", "한국 3대 피자"], summary: "쫄깃한 두꺼운 도우와 풍부한 토핑으로 사랑받는 미국식 피자집" },
  "산수갑산":        { keywords: ["아바이순대 정통", "순대국밥 푸짐함", "을지로 직장인 단골"], summary: "을지로 순대 전문 노포, 아바이순대와 순대국밥으로 유명한 맛집" },
  "대도식당":        { keywords: ["1964년 한우 노포", "서울미래유산 지정", "깍두기볶음밥 별미"], summary: "60년 전통 한우 등심 전문점, 수요미식회 1회 소개된 서울 명소" },
  "남포면옥":        { keywords: ["동치미 육수 평양냉면", "미쉐린 선정 노포", "은은한 메밀향"], summary: "1965년 창업, 동치미 육수 평양냉면으로 미쉐린 연속 선정" },
  "한강껍데기":      { keywords: ["직원이 굽고 잘라줌", "부드러운 목살", "망원동 연예인 맛집"], summary: "망원동 위치, 직원이 직접 굽고 잘라주는 목살·껍데기 구이 맛집" },
  "호남식당":        { keywords: ["과일간장 물갈비", "양념 꽃게장 곁들임", "백종원 3대천왕 소개"], summary: "충무로 30년 노포, 과일 간장으로 숙성한 돼지 물갈비 전문점" },
  "진미평양냉면":    { keywords: ["입문자도 좋아할 육향", "미쉐린 등재", "강남 위치 접근성"], summary: "평양면옥 출신 셰프 운영, 육향 진하고 접근하기 쉬운 평양냉면" },
  "영천영화":        { keywords: ["24시간 연중무휴", "한우 육회비빔밥", "청담 연예인 단골"], summary: "청담동 40년 한우 전문점, 수작업 육회와 육회비빔밥이 대표 메뉴" },
  "고기리막국수":    { keywords: ["들기름막국수 원조", "오픈런 필수", "고소한 들기름 향"], summary: "경기 용인 한옥 매장, 들기름 막국수 원조로 긴 웨이팅이 일상" },
  "뜨락":            { keywords: ["저온숙성 한우 안심", "프라이빗 룸", "수요미식회 소개"], summary: "청담동 참숯 그릴 저온숙성 한우, 한식 정식과 함께하는 고급 한우집" },
  "우진해장국":      { keywords: ["전주식 콩나물국밥", "이른 새벽 영업", "시원하고 깊은 국물"], summary: "전주 대표 콩나물 해장국집, 이른 아침부터 문전성시를 이루는 해장 명소" },
  "이문설농탕":      { keywords: ["1902년 한국 최고령 식당", "슴슴·구수한 설렁탕", "미쉐린 빕 구르망"], summary: "120년 넘은 종로 설렁탕 노포, 담백하고 구수한 국물로 미쉐린 선정" },
  "대성집":          { keywords: ["노포 감성 고기집", "두툼한 돼지고기", "웨이팅 필수"], summary: "오랜 전통 노포 분위기에서 즐기는 두툼한 돼지고기 맛집" },
  "마포옥":          { keywords: ["미쉐린 빕 구르망", "은은한 감칠맛 육수", "어복쟁반 인기"], summary: "미쉐린 빕구르망 선정, 은은하고 깊은 감칠맛의 냉면 전문점" },
  "하동관":          { keywords: ["80년 전통 노포", "맑고 깊은 곰탕 국물", "미쉐린 빕 구르망"], summary: "80년 전통 미쉐린 선정 명동 곰탕집, 맑고 깔끔한 국물이 특징" },
  "청담안":          { keywords: ["한국 전통 식재료", "세련된 공간", "예약 필수"], summary: "청담동 한식 다이닝, 전통 식재료로 완성하는 정갈한 코스 요리" },
  "새벽집":          { keywords: ["한우 육회비빔밥", "심야 영업", "청담 연예인 단골"], summary: "청담동 연예인 단골 심야식당, 신선한 한우 육회비빔밥이 시그니처" },
  "약수순대":        { keywords: ["1977년 노포", "맑고 잡내 없는 국물", "담백한 순대국"], summary: "1977년 개업 노포, 잡내 없이 맑고 담백한 국물의 순대국 전문점" },
  "오통영":          { keywords: ["통영 신선 해산물", "성게·멍게 비빔밥", "미쉐린 선정"], summary: "미쉐린 선정 청담동 통영 음식 전문점, 성게·전복 요리가 대표" },
  "바다식당":        { keywords: ["제주 신선 해산물", "현지인 추천", "자연산 회"], summary: "제주 현지인들이 사랑하는 신선한 해산물 식당" },
  "갯벌의진주":      { keywords: ["제주 갯벌 식재료", "신선한 해산물", "현지인 단골"], summary: "제주 갯벌의 신선한 식재료로 만드는 깔끔한 해산물 요리" },
  "우정":            { keywords: ["정통 한식", "정갈한 상차림", "특별한 날 추천"], summary: "정갈하고 깊은 맛의 한식 상차림, 소중한 자리에 어울리는 식당" },
  "서린낙지":        { keywords: ["쫄깃한 낙지", "소시지·베이컨 조합", "백종원 3대천왕 소개"], summary: "종로 대표 낙지볶음집, 쫄깃한 낙지와 소시지·베이컨 조합이 별미" },
  "진주회관":        { keywords: ["서울 3대 콩국수", "진한 토종 황태콩", "1962년 개업"], summary: "1962년 개업 서울 대표 콩국수 명가, 진하고 부드러운 콩국물이 특징" },
  "한옥집김치찜":    { keywords: ["김치찜 원조", "깔끔하고 시큼한 맛", "양 푸짐"], summary: "대한민국 최초 김치찜 원조집, 깔끔하고 시큼한 맛에 푸짐한 양" },
  "평양면옥":        { keywords: ["슴슴·담백한 육수", "메밀향 면발", "미쉐린 빕 구르망"], summary: "장충동 평양냉면 3대 명가 중 하나, 메밀향 나는 면발과 담백한 육수" },
  // ── 흑백요리사 ──────────────────────────
  "디핀":            { keywords: ["와인·음식·분위기 삼박자", "윤남노 셰프", "독창적인 플레이팅"], summary: "와인 다이닝의 정수, 윤남노 셰프의 감각적인 페어링 코스" },
  "트리드":          { keywords: ["트러플 향 가득", "미쉐린 선정", "예약 필수"], summary: "강승원 셰프의 섬세한 이노베이티브 요리, 고급 식재료가 빛나는 파인다이닝" },
  "비아 톨레도 파스타바": { keywords: ["지역 테마 생면 파스타", "이탈리아 본토 맛", "오픈 키친"], summary: "매달 이탈리아 특정 지역 테마로 구성되는 서울 최고의 정통 파스타 코스" },
  "레스토랑 네오":   { keywords: ["고추장 닭날개 시그니처", "창의적 일식 다이닝", "최강록 셰프"], summary: "최강록 셰프의 창의적 퓨전 다이닝, 독특하고 대담한 맛의 조합" },
  "리북방":          { keywords: ["순대 코스 오마카세", "이북 전통 레시피", "미쉐린 등재"], summary: "가족 대대로 이어온 순대 레시피를 코스로 재해석한 미쉐린 레스토랑" },
  "도량":            { keywords: ["동파육 시그니처", "임태훈 셰프", "웨이팅 필수"], summary: "철가방 요리사 임태훈 셰프의 중식, 야들야들한 동파육이 압권" },
  "로컬릿":          { keywords: ["제철 채소 중심", "자극적이지 않은 맛", "자연주의 이탈리안"], summary: "제철 채소 중심의 이탈리안 요리, 재료 본연의 내추럴한 맛이 강점" },
  "에드워드 권 리츠칼튼": { keywords: ["리츠칼튼 호텔 입점", "퓨전 다이닝", "럭셔리 분위기"], summary: "에드워드 권 셰프의 글로벌 퓨전 요리, 호텔급 서비스와 함께" },
  "티엔미미":        { keywords: ["딤섬 종류 다양", "정통 중식 코스", "데이트 명소"], summary: "딤섬의 여왕 정지선 셰프의 정통 중식, 다양한 딤섬과 고급스러운 분위기" },
  "파브리키친":      { keywords: ["이탈리아 가정식", "명성 대비 합리적 가격", "예약 오픈런"], summary: "파브리 셰프의 정통 이탈리아 가정식, 명성 대비 저렴한 가격으로 화제" },
  "만찢남":          { keywords: ["마라 중독성", "동파육 별미", "셰프 직접 서빙"], summary: "조광효 셰프의 쓰촨 베이스 중식, 마라 맛이 중독적인 만화 컨셉 레스토랑" },
  "구찌 오스테리아": { keywords: ["구찌 브랜드 공간", "에밀리아 버거 시그니처", "미쉐린 등재"], summary: "구찌·마시모 보투라 협업 이탈리안 파인다이닝, 공간과 요리 모두 명품급" },
  "쵸이닷":          { keywords: ["봉골레 파스타 시그니처", "캐주얼 파인다이닝", "최현석 셰프"], summary: "최현석 셰프의 이탈리안 레스토랑, 봉골레 파스타가 대표 메뉴" },
  "보노보노":        { keywords: ["산지 직송 신선 해산물", "프리미엄 씨푸드", "스시·활어 다양"], summary: "산지 직송 활어와 스시를 즐길 수 있는 프리미엄 씨푸드 레스토랑" },
  "안성재의 모수":   { keywords: ["미쉐린 3스타", "전복 타코·도토리 국수", "계절 한식 코스"], summary: "한국 유일 미쉐린 3스타, 안성재 셰프의 감동적인 계절 한식 파인다이닝" },
  "띠또":            { keywords: ["정통 이탈리안 코스", "파스타 전문", "감성적인 공간"], summary: "정통 이탈리안 파인다이닝, 섬세한 파스타와 감성적인 공간이 매력" },
  "엘초코 데 테레노": { keywords: ["바스크식 숯불 구이", "바스크 치즈케이크", "한남동 스페인 레스토랑"], summary: "신승환 셰프의 바스크식 숯불 그릴 전문 스페인 레스토랑" },
  "네기 다이닝라운지": { keywords: ["마구로 타르타르 명물", "모던 이자카야", "방영 전부터 입소문"], summary: "장호준 셰프의 가로수길 모던 이자카야, 방영 전부터 입소문 난 일식 다이닝" },
  "가보정":          { keywords: ["수원 3대 갈비", "한정식 수준 밑반찬", "1400석 대형 식당"], summary: "수원 3대 갈비 명소, 1,400석 규모에 한정식 수준의 밑반찬이 특징" },
  "야키토리 파지":   { keywords: ["숯불 야키토리 코스", "일본 정통 방식", "꼬치 오마카세"], summary: "김병묵 셰프의 정통 일본식 숯불 야키토리, 코스 형식으로 즐기는 꼬치 요리" },
  "쵸이랩":          { keywords: ["분자요리 실험", "최현석 셰프", "이노베이티브 코스"], summary: "최현석 셰프의 분자요리 실험 공간, 창의적인 테이스팅 코스" },
  "익스퀴진":        { keywords: ["미쉐린 1스타", "텃밭 허브 활용", "계절 창의적 코스"], summary: "장경원 셰프의 미쉐린 1스타, 텃밭 허브를 활용한 혁신적 파인다이닝" },
  "묘미":            { keywords: ["미쉐린 1스타", "창덕궁 뷰 한식", "개업 11개월 만에 별"], summary: "창덕궁 뷰가 있는 미쉐린 1스타, 퓨전 한식 다이닝의 신흥 강자" },
  "온지음":          { keywords: ["3년 연속 미쉐린 1스타", "전통 한식 연구소", "경복궁 인접"], summary: "경복궁 옆 전통 한식 연구소 기반 레스토랑, 3년 연속 미쉐린 1스타 수상" },
  // ── 베이커리 카페 ────────────────────────
  "카페 어니언 성수": { keywords: ["폐공장 개조 루프탑", "외국인 관광객 필수", "SNS 핫플 성지"], summary: "성수동 폐공장 개조 카페, 공간 재생의 아이콘이자 인기 베이커리" },
  "카페 어니언 안국": { keywords: ["한옥 속 현대 베이커리", "외국인도 줄 서는 곳", "대파베이글 인기"], summary: "전통 한옥 속 현대적 베이커리, 외국인도 줄 서는 안국 명소" },
  "카페 어니언 미아": { keywords: ["강북우체국 창고 개조", "2500원 스페셜티 커피", "창고 인테리어"], summary: "옛 강북우체국 창고를 개조한 이색 카페, 저렴한 스페셜티 커피 명소" },
  "프릳츠 커피 컴퍼니": { keywords: ["커피·빵 모두 수준급", "물개 로고 브랜딩", "한국 커피씬 선두"], summary: "2014년부터 한국 커피씬을 이끈 로스터리, 커피와 빵 모두 탁월" },
  "밀도 성수":        { keywords: ["담백식빵 하나로 승부", "유기농 밀가루", "7년째 줄 서는 빵집"], summary: "유기농 밀가루로 만든 담백식빵 하나로 7년간 성수동을 평정한 빵집" },
  "타르틴 베이커리 한남": { keywords: ["SF 명품 사워도우", "천연발효종 정통 빵", "NYT 극찬 베이커리"], summary: "뉴욕타임스 극찬 SF 유명 베이커리 한국 상륙, 정통 사워도우 전문" },
  "오월의종":         { keywords: ["13년 연속 블루리본", "무화과 호밀빵 인기", "버터·설탕 무첨가"], summary: "천연발효 담백한 식사빵 장인, 한남동에서 매일 1000개 빵이 팔리는 명소" },
  "브레드05 이촌":    { keywords: ["앙버터 트렌드 원조", "5일 저온발효 반죽", "블루리본 6개"], summary: "앙버터 트렌드를 시작한 원조 빵집, 저온발효로 소화 잘 되는 빵" },
  "런던베이글뮤지엄": { keywords: ["한국식 쫄깃 베이글", "SNS 전국구 인기", "오픈런 필수"], summary: "한국식 쫄깃 베이글로 전국적 인기, 항상 긴 줄이 이어지는 핫플" },
  "아우어베이커리":   { keywords: ["더티초코 크루아상", "얼그레이 크루아상", "감각적 디저트"], summary: "스타일리스트가 기획한 감각적 베이커리, 초콜릿 크루아상으로 유명" },
  "누데이크":         { keywords: ["말차 피크 케이크", "비주얼 인스타그래머블", "MZ세대 핫플"], summary: "패션 브랜드 EQL 운영, 말차 크림 흘러내리는 비주얼 케이크로 화제" },
  "밀스 성수":        { keywords: ["수제 소시지·사워도우", "성수 골목 브런치", "조용한 감성 공간"], summary: "성수동 골목 속 사워도우와 직접 만든 소시지번이 유명한 브런치 베이커리" },
  "카페 레이어드":    { keywords: ["영국식 스콘 맛집", "스프링어니언 크림치즈 스콘", "감각적 인테리어"], summary: "정통 영국식 스콘으로 유명한 베이커리 카페, 전국 여러 지점 운영 중" },
  "푸하하크림빵":     { keywords: ["특허받은 소금 크림", "짭달콤 중독성", "테이크아웃 전용"], summary: "특허받은 천일염 소금크림빵으로 유명, 짭달콤 중독적인 크림빵 맛집" },
  "어글리베이커리":   { keywords: ["대파·갈릭크림치즈빵", "이영자 방문 유명세", "1팀 1개 한정"], summary: "대파빵으로 전국적 유명세, 망원동에서 항상 줄 서는 인기 빵집" },
  "쟝블랑제리":       { keywords: ["1996년 관악 노포", "맘모스빵 번호표 대기", "블루리본 6개"], summary: "29년 전통 관악구 명물 빵집, 생크림·팥·밤 가득한 맘모스빵이 시그니처" },
  "우스블랑":         { keywords: ["우리밀 100% 사용", "몽블랑·갈레트 파이", "커피·빵 모두 만족"], summary: "국산 유기농 밀가루만 사용하는 효창동 베이커리, 몽블랑이 시그니처" },
  "김영모과자점":     { keywords: ["1982년 서울 3대 빵집", "50만 개 팔린 몽블랑", "마늘바게트 추천"], summary: "제과명장이 운영하는 1982년 노포, 유산균 발효법의 정통 과자·빵" },
  "태극당":           { keywords: ["1946년 서울 최고령 빵집", "수제 모나카 아이스크림", "뉴트로 성지"], summary: "1946년부터 장충동을 지킨 서울 최고령 빵집, 수제 모나카 아이스크림 명물" },
  "성심당":           { keywords: ["튀김소보로 원조", "대전 여행 필수 코스", "줄 서도 사가는 맛"], summary: "대전을 대표하는 전국구 베이커리, 튀김소보로 하나로 국민 빵집 반열" },
  "이성당":           { keywords: ["1945년 국내 최고령 빵집", "야채빵·단팥빵 양대 산맥", "주말 2~3시간 웨이팅"], summary: "1945년 개업한 한국에서 가장 오래된 빵집, 야채빵과 단팥빵이 명물" },
  "삼송빵집":         { keywords: ["1957년 대구 노포", "통옥수수빵 중독성", "달콤·짭조름 소보로"], summary: "1957년부터 이어온 대구 대표 빵집, 달콤 짭조름 통옥수수빵이 간판" },
  "황남빵":           { keywords: ["경주 필수 기념품", "얇은 피 팥앙금 전통빵", "1~3시간 웨이팅"], summary: "경주를 대표하는 전통 팥소 과자빵, 경북 지정 명품이자 여행객 필수 구매" },
  "이흥용과자점":     { keywords: ["명란바게트 특허", "제과 명장 운영", "와인 안주로도 최고"], summary: "대한민국 제과명장이 운영하는 부산 명물, 짭짤한 명란바게트가 시그니처" },
  "비엔씨 베이커리":  { keywords: ["파이만주 시그니처", "팥·밤·호두 가득", "부산역 접근성"], summary: "부산역 근처 전통 베이커리, 바삭한 파이 반죽에 팥앙금·견과류 넣은 파이만주" },
  "세느강":           { keywords: ["부산 마늘빵 명물", "바삭·촉촉 마늘빵", "현지인 단골 빵집"], summary: "부산의 유명 마늘빵 전문 베이커리, 현지인들이 사랑하는 명소" },
  "제주당":           { keywords: ["오메기빵·제주 특산 빵", "800평 대형 베이커리 카페", "오픈런 필수"], summary: "제주 애월 800평 대형 베이커리 카페, 오메기빵 등 제주 특산물 빵이 시그니처" },
  "궁전제과":         { keywords: ["1973년 광주 명물", "계란샐러드 공룡알빵", "나비파이 바삭"], summary: "50년 전통 광주 충장로 빵집, 계란샐러드 가득한 공룡알빵이 시그니처" },
  "타르틴 베이커리 RYSE": { keywords: ["RYSE 호텔 스타일리시 공간", "홍대 베이커리 명소", "사워도우·커피"], summary: "홍대 RYSE 호텔 1층 SF 유명 베이커리, 현대적 공간에서 즐기는 사워도우" },
  "아티잔 베이커스":  { keywords: ["천연발효종만 사용", "크루아상·바게트 인기", "서래마을·한남 운영"], summary: "상업 효모 없이 천연발효종만 사용하는 정통 아티잔 베이커리" },
};

// ========================================
// 베이커리 카페 서브타입 맵핑
// bread-only: 테이크아웃 전용 빵집
// cafe-outlet: 카페형 + 콘센트 있음 (노트북 작업 가능)
// cafe: 카페형 (기본값, 좌석 있음)
// ========================================
const bakerySubTypeMap = {
  // 빵집형 (테이크아웃 전용)
  '푸하하크림빵':   'bread-only',
  '어글리베이커리': 'bread-only',
  '황남빵':         'bread-only',
  '쟝블랑제리':     'bread-only',

  // 콘센트 있음 (카페형 + 노트북 가능)
  '카페 레이어드':  'cafe-outlet',
  '누데이크':       'cafe-outlet',
  '제주당':         'cafe-outlet',
};

const allRestaurants = allRestaurantsRaw.map((line, index) => {
  const parts = line.split(" | ").map((part) => part.trim());
  const name = parts[0];
  const region = parts[1];
  const area = parts[2];
  const category = parts[3];
  const badgeType = parts[4];
  const mainMenu = parts[5];
  const sourceLabel = parts[6];
  const verifiedAt = parts[7];
  const group = parts[8];
  const sourceUrl = parts[9] || "";

  // ID 생성: 고유한 식당 ID (rest-xxx 형식)
  const id = `rest-${String(index + 1).padStart(3, '0')}`;

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
    sourceUrl,
    bakerySubType: group === 'bakery' ? (bakerySubTypeMap[name] || 'cafe') : null,
    review: restaurantReviewSummaries[name] || null,
    reservation: restaurantReservations[name] || null,
    image: restaurantImageOverrides[name] || null
  };
});

// 전역으로 노출 (HomeScreen과 ListScreen에서 사용)
window.allRestaurants = allRestaurants;
window.nearbySpots = nearbySpots;

// ✅ 즉시 검증
console.log('===== DATA.JS 로드 완료 =====');
console.log('window.allRestaurants:', window.allRestaurants?.length, '개');
console.log('window.nearbySpots:', window.nearbySpots?.length, '개');
console.log('');
console.log('그룹별 개수:');
console.log('- michelin:', window.allRestaurants?.filter(r => r.group === 'michelin').length, '개');
console.log('- celebrity:', window.allRestaurants?.filter(r => r.group === 'celebrity').length, '개');
console.log('- chef:', window.allRestaurants?.filter(r => r.group === 'chef').length, '개');
console.log('');
console.log('샘플 데이터 (처음 3개):');
window.allRestaurants?.slice(0, 3).forEach(r => {
  console.log(`  - ${r.name} (${r.group})`);
});
console.log('============================');
