const nearbySpots = [
  {
    name: "밍글스",
    location: "서울 강남구",
    travelMinutes: 12,
    travelTime: "도보 12분(예상)",
    bestRoute: "가장 효율적: 도보",
    badges: ["미쉐린 2스타", "검증 완료"],
    context: "미쉐린 가이드 등재 기준으로 선필터",
    status: "검증 완료",
    updatedAt: "2026-01-19"
  },
  {
    name: "옥동식",
    location: "서울 마포구",
    travelMinutes: 15,
    travelTime: "대중교통 15분(예상)",
    bestRoute: "가장 효율적: 대중교통",
    badges: ["빕 구르망", "검증 완료"],
    context: "미쉐린 빕 구르망 등재 식당",
    status: "검증 완료",
    updatedAt: "2026-01-19"
  },
  {
    name: "을지로보석",
    location: "서울 중구",
    travelMinutes: 18,
    travelTime: "도보 18분(예상)",
    bestRoute: "가장 효율적: 도보",
    badges: ["유명인 추천", "검증 완료"],
    context: "공식 채널 공개 방문 기준",
    status: "검증 완료",
    updatedAt: "2026-01-19"
  },
  {
    name: "금돼지식당",
    location: "서울 중구",
    travelMinutes: 22,
    travelTime: "차량 22분(예상)",
    bestRoute: "가장 효율적: 차량",
    badges: ["유명인 방문", "검증 완료"],
    context: "공식 계정 출처 기반 검증",
    status: "검증 완료",
    updatedAt: "2026-01-19"
  },
  {
    name: "비아 톨레도 파스타바",
    location: "서울 용산구",
    travelMinutes: 25,
    travelTime: "대중교통 25분(예상)",
    bestRoute: "가장 효율적: 대중교통",
    badges: ["흑백요리사", "검증 완료"],
    context: "출연 셰프 운영 매장 기준",
    status: "검증 완료",
    updatedAt: "2026-01-19"
  },
  {
    name: "트리드",
    location: "서울 강남구",
    travelMinutes: 30,
    travelTime: "차량 30분(예상)",
    bestRoute: "가장 효율적: 차량",
    badges: ["흑백요리사", "검증 완료"],
    context: "출연 셰프 운영/협업 여부 확인 완료",
    status: "검증 완료",
    updatedAt: "2026-01-19"
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
    scope: "공식 가이드 링크 확인"
  },
  {
    title: "유명인 방문",
    caption: "방송/공식 SNS/인터뷰에서 동일 장소가 확인된 경우만 반영합니다.",
    badgeType: "유명인",
    level: 4,
    sourceLabel: "공식 채널",
    sourceUrl: "https://youtube.com/@sungsikyung",
    verifiedAt: "2026-01-19",
    scope: "공식 채널 출처"
  },
  {
    title: "흑백요리사 출연진",
    caption: "출연 셰프의 운영/협업 매장을 구분해 표기합니다.",
    badgeType: "흑백요리사",
    level: 4,
    sourceLabel: "예약 플랫폼",
    sourceUrl: "https://catchtable.co.kr",
    verifiedAt: "2026-01-19",
    scope: "운영 여부 검증"
  },
  {
    title: "정정/삭제 프로세스",
    caption: "오정보 신고 시 근거 재확인 후 즉시 갱신합니다.",
    badgeType: "운영 정책",
    level: 3,
    sourceLabel: "내부 정책",
    sourceUrl: "https://kpopeats.cc/privacy.html",
    verifiedAt: "2026-01-19",
    scope: "정책 공개"
  }
];

const michelinSpots = [
  {
    name: "밍글스",
    location: "서울 강남구",
    category: "이노베이티브",
    mainMenu: "멸치 국수와 전복",
    badgeType: "미쉐린 2스타",
    sourceLabel: "미쉐린 가이드",
    sourceUrl: "https://guide.michelin.com/kr/ko/seoul-capital-area/kr-seoul/restaurant/mingles",
    verifiedAt: "2026-01-19"
  },
  {
    name: "가온",
    location: "서울 강남구",
    category: "한식",
    mainMenu: "온날 코스",
    badgeType: "미쉐린 3스타",
    sourceLabel: "미쉐린 가이드",
    sourceUrl: "https://www.google.com/search?q=https://guide.michelin.com/kr/ko/seoul-capital-area/kr-seoul/restaurant/gaon",
    verifiedAt: "2026-01-19"
  },
  {
    name: "옥동식",
    location: "서울 마포구",
    category: "돼지국밥",
    mainMenu: "돼지곰탕",
    badgeType: "빕 구르망",
    sourceLabel: "미쉐린 가이드",
    sourceUrl: "https://guide.michelin.com/kr/ko/seoul-capital-area/kr-seoul/restaurant/okdongsik",
    verifiedAt: "2026-01-19"
  },
  {
    name: "정식당",
    location: "서울 강남구",
    category: "뉴 코리안",
    mainMenu: "맛있는 김밥",
    badgeType: "미쉐린 2스타",
    sourceLabel: "미쉐린 가이드",
    sourceUrl: "https://www.google.com/search?q=https://guide.michelin.com/kr/ko/seoul-capital-area/kr-seoul/restaurant/jungsik",
    verifiedAt: "2026-01-19"
  },
  {
    name: "고향칼국수",
    location: "서울 종로구",
    category: "칼국수",
    mainMenu: "손칼국수",
    badgeType: "빕 구르망",
    sourceLabel: "미쉐린 가이드",
    sourceUrl: "https://www.google.com/search?q=https://guide.michelin.com/kr/ko/seoul-capital-area/kr-seoul/restaurant/gohyang-kalguksu",
    verifiedAt: "2026-01-19"
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
    verifiedAt: "2026-01-19"
  },
  {
    name: "금돼지식당",
    location: "서울 중구",
    category: "돼지고기 구이",
    mainMenu: "본삼겹",
    badgeType: "BTS 정국 방문",
    sourceLabel: "공식 인스타그램",
    sourceUrl: "https://www.google.com/search?q=https://instagram.com/goldpig1982",
    verifiedAt: "2026-01-19"
  },
  {
    name: "을지로보석",
    location: "서울 중구",
    category: "한식 주점",
    mainMenu: "들기름 낙지젓 카펠리니",
    badgeType: "정용진 회장 추천",
    sourceLabel: "공식 인스타그램",
    sourceUrl: "https://instagram.com/euljiro_boseok",
    verifiedAt: "2026-01-19"
  },
  {
    name: "사랑방칼국수",
    location: "서울 중구",
    category: "백숙",
    mainMenu: "백숙 백반",
    badgeType: "허영만 식객",
    sourceLabel: "네이버 검색",
    sourceUrl: "https://www.google.com/search?q=https://search.naver.com/search.naver%3Fquery%3D%EC%82%AC%EB%9E%91%EB%B0%A9%EC%B9%BC%EA%B5%AD%EC%88%98",
    verifiedAt: "2026-01-19"
  },
  {
    name: "잭슨피자",
    location: "서울 용산구",
    category: "피자",
    mainMenu: "슈퍼 잭슨",
    badgeType: "최자로드",
    sourceLabel: "공식 유튜브",
    sourceUrl: "https://www.google.com/search?q=https://youtube.com/%40the_m_show",
    verifiedAt: "2026-01-19"
  }
];

const chefSpots = [
  {
    name: "디핀",
    location: "서울 중구",
    category: "프렌치 에스닉",
    mainMenu: "머쉬룸 타르트",
    badgeType: "윤남노 셰프",
    sourceLabel: "캐치테이블",
    sourceUrl: "https://catchtable.co.kr/deepin",
    verifiedAt: "2026-01-19"
  },
  {
    name: "트리드",
    location: "서울 강남구",
    category: "이노베이티브",
    mainMenu: "트러플 슈",
    badgeType: "강승원 셰프",
    sourceLabel: "캐치테이블",
    sourceUrl: "https://catchtable.co.kr/trid",
    verifiedAt: "2026-01-19"
  },
  {
    name: "비아 톨레도 파스타바",
    location: "서울 용산구",
    category: "이탈리안",
    mainMenu: "할머니의 라자냐",
    badgeType: "권성준 셰프",
    sourceLabel: "캐치테이블",
    sourceUrl: "https://catchtable.co.kr/viatoledo",
    verifiedAt: "2026-01-19"
  },
  {
    name: "레스토랑 네오",
    location: "서울 서초구",
    category: "일식 다이닝",
    mainMenu: "닭 날개 만두",
    badgeType: "윤남노 셰프",
    sourceLabel: "캐치테이블",
    sourceUrl: "https://catchtable.co.kr/restaurantneo",
    verifiedAt: "2026-01-19"
  },
  {
    name: "리북방",
    location: "서울 마포구",
    category: "이북음식 오마카세",
    mainMenu: "순대 플래터",
    badgeType: "최강록 셰프",
    sourceLabel: "캐치테이블",
    sourceUrl: "https://catchtable.co.kr/leebukbang",
    verifiedAt: "2026-01-19"
  }
];
