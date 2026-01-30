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
    updatedAt: "2026-01-31",
    group: "michelin",
    lat: 37.524815,
    lng: 127.044955,
    mapQuery: "밍글스 서울 강남구"
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
    updatedAt: "2026-01-19",
    group: "michelin",
    lat: 37.555355,
    lng: 126.914614,
    mapQuery: "옥동식 서울 마포구"
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
    updatedAt: "2026-01-19",
    group: "celebrity",
    lat: 37.564412,
    lng: 126.992811,
    mapQuery: "을지로보석 서울 중구"
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
    updatedAt: "2026-01-19",
    group: "celebrity",
    lat: 37.557121,
    lng: 127.013033,
    mapQuery: "금돼지식당 서울 중구"
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
    updatedAt: "2026-01-19",
    group: "chef",
    lat: 37.538522,
    lng: 126.971811,
    mapQuery: "비아 톨레도 파스타바 서울 용산구"
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
    updatedAt: "2026-01-19",
    group: "chef",
    lat: 37.523421,
    lng: 127.041355,
    mapQuery: "트리드 서울 강남구"
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
    verifiedAt: "2026-01-19",
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
    verifiedAt: "2026-01-19",
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
    verifiedAt: "2026-01-19",
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
    verifiedAt: "2026-01-19",
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
    verifiedAt: "2026-01-31",
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
    verifiedAt: "2026-01-19",
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
    verifiedAt: "2026-01-19",
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
    verifiedAt: "2026-01-19",
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
    verifiedAt: "2026-01-19",
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
    verifiedAt: "2026-01-19",
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
    verifiedAt: "2026-01-19",
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
    verifiedAt: "2026-01-19",
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
    verifiedAt: "2026-01-19",
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
    verifiedAt: "2026-01-19",
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
    verifiedAt: "2026-01-19",
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
    verifiedAt: "2026-01-19",
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
    verifiedAt: "2026-01-19",
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
    verifiedAt: "2026-01-19",
    lat: 37.541611,
    lng: 126.945533,
    mapQuery: "리북방 서울 마포구"
  }
];

const allRestaurantsRaw = [
  "밍글스 | 서울 | 강남구 | 미쉐린 가이드 | 미쉐린 3스타 | 멸치 국수와 전복 | 미쉐린 가이드 | 2026-01-31 | michelin | https://guide.michelin.com/kr/ko/seoul-capital-area/kr-seoul/restaurant/mingles",
  "옥동식 | 서울 | 마포구 | 미쉐린 가이드 | 빕 구르망 | 돼지곰탕 | 미쉐린 가이드 | 2026-01-19 | michelin | https://guide.michelin.com/kr/ko/seoul-capital-area/kr-seoul/restaurant/okdongsik",
  "정식당 | 서울 | 강남구 | 미쉐린 가이드 | 미쉐린 2스타 | 맛있는 김밥 | 미쉐린 가이드 | 2026-01-19 | michelin | https://www.google.com/search?q=https://guide.michelin.com/kr/ko/seoul-capital-area/kr-seoul/restaurant/jungsik",
  "고향칼국수 | 서울 | 종로구 | 미쉐린 가이드 | 빕 구르망 | 손칼국수 | 미쉐린 가이드 | 2026-01-19 | michelin | https://www.google.com/search?q=https://guide.michelin.com/kr/ko/seoul-capital-area/kr-seoul/restaurant/gohyang-kalguksu",
  "라연 | 서울 | 중구 | 미쉐린 가이드 | 미쉐린 2스타 | 신선로 | 미쉐린 가이드 | 2026-01-31 | michelin | https://guide.michelin.com/kr/ko/seoul-capital-area/kr-seoul/restaurant/la-yeon",
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
  "금돼지식당 | 서울 | 중구 | 미쉐린 가이드 | 빕 구르망 | 본삼겹 | 공식 인스타그램 | 2026-01-19 | michelin | https://instagram.com/goldpig1982",
  "툭툭소이타이 | 서울 | 마포구 | 미쉐린 가이드 | 빕 구르망 | 똠양꿍 | 출처 확인 중 | 2026-01-19 | michelin",
  "류니끄 | 서울 | 강남구 | 미쉐린 가이드 | 미쉐린 이노베이티브 | 하이브리드 퀴진 코스 | 출처 확인 중 | 2026-01-19 | michelin",
  "스와니예 | 서울 | 강남구 | 미쉐린 가이드 | 미쉐린 2스타 | 에피소드 코스 | 출처 확인 중 | 2026-01-19 | michelin",
  "권숙수 | 서울 | 강남구 | 미쉐린 가이드 | 미쉐린 2스타 | 숙수 주상 | 출처 확인 중 | 2026-01-19 | michelin",
  "알라 프리마 | 서울 | 강남구 | 미쉐린 가이드 | 미쉐린 2스타 | 이노베이티브 테이스팅 메뉴 | 출처 확인 중 | 2026-01-19 | michelin",
  "제로콤플렉스 | 서울 | 중구 | 미쉐린 가이드 | 미쉐린 1스타 | 내추럴 와인 페어링 코스 | 출처 확인 중 | 2026-01-19 | michelin",
  "화양연화 | 서울 | 종로구 | 태국 음식 | 성시경 먹을텐데 | 팟타이 | 공식 유튜브 | 2026-01-19 | celebrity | https://youtube.com/@sungsikyung",
  "을지로보석 | 서울 | 중구 | 한식 주점 | 정용진 회장 추천 | 들기름 낙지젓 카펠리니 | 공식 인스타그램 | 2026-01-19 | celebrity | https://instagram.com/euljiro_boseok",
  "사랑방칼국수 | 서울 | 중구 | 백숙 | 허영만 식객 | 백숙 백반 | 네이버 검색 | 2026-01-19 | celebrity | https://www.google.com/search?q=https://search.naver.com/search.naver%3Fquery%3D%EC%82%AC%EB%9E%91%EB%B0%A9%EC%B9%BC%EA%B5%AD%EC%88%98",
  "잭슨피자 | 서울 | 용산구 | 피자 | 최자로드 | 슈퍼 잭슨 | 공식 유튜브 | 2026-01-19 | celebrity | https://www.google.com/search?q=https://youtube.com/%40the_m_show",
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
  "디핀 | 서울 | 중구 | 프렌치 에스닉 | 윤남노 셰프 | 머쉬룸 타르트 | 캐치테이블 | 2026-01-19 | chef | https://catchtable.co.kr/deepin",
  "트리드 | 서울 | 강남구 | 이노베이티브 | 강승원 셰프 | 트러플 슈 | 캐치테이블 | 2026-01-19 | chef | https://catchtable.co.kr/trid",
  "비아 톨레도 파스타바 | 서울 | 용산구 | 이탈리안 | 권성준 셰프 | 할머니의 라자냐 | 캐치테이블 | 2026-01-19 | chef | https://catchtable.co.kr/viatoledo",
  "레스토랑 네오 | 서울 | 서초구 | 일식 다이닝 | 최강록 셰프 | 닭 날개 만두 | 캐치테이블 | 2026-01-19 | chef | https://catchtable.co.kr/restaurantneo",
  "리북방 | 서울 | 마포구 | 이북음식 오마카세 | 최지형 셰프 | 순대 플래터 | 캐치테이블 | 2026-01-19 | chef | https://catchtable.co.kr/leebukbang",
  "도량 | 서울 | 종로구 | 중식 | 임태훈 셰프 | 훠궈 | 출처 확인 중 | 2026-01-19 | chef",
  "로컬릿 | 서울 | 성동구 | 이탈리안 | 남정석 셰프 | 채소 테린 | 출처 확인 중 | 2026-01-19 | chef",
  "에드워드 권 리츠칼튼 | 서울 | 강남구 | 파인 다이닝 | 에드워드 권 셰프 | 창작 코스 | 출처 확인 중 | 2026-01-19 | chef",
  "초이닷 | 서울 | 강남구 | 이탈리안 다이닝 | 최현석 셰프 | 무 코스 | 출처 확인 중 | 2026-01-19 | chef",
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
  "온지음 | 서울 | 종로구 | 한식 공방 | 조은희 셰프 | 제철 반상 | 출처 확인 중 | 2026-01-19 | chef"
];

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
    sourceUrl
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
