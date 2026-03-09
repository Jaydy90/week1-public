// ========================================
// Trust Route — My Life Picks
// 나의 픽: 내가 진정 좋아하는 식단 카드 20
// ========================================

const mylifeData = [

  // ──────────── 아침 ────────────

  {
    id: "mylife-001", num: 1,
    mealTime: "아침", emoji: "🌅", color: "#f97316",
    title: "그릭 요거트 볼",
    tagline: "혈당 잡고 공복 오래 — 완벽한 하루의 시작",
    prepTime: "5분", calories: "약 290 kcal",
    tags: ["혈당관리", "고단백", "저당", "5분완성"],
    ingredients: [
      { name: "서울우유 그릭 요거트 (무가당)", amount: "150g",
        tip: "무가당 필수 — 일반 요거트 대비 단백질 2배",
        buyUrl: "https://www.coupang.com/np/search?q=서울우유+그릭요거트+무가당" },
      { name: "그레놀라 오리지널 (과일포함)", amount: "30g",
        tip: "통귀리 베이스 → 복합 탄수화물로 지속 에너지",
        buyUrl: "https://www.coupang.com/np/search?q=그레놀라+오리지널+과일" },
      { name: "알룰로스", amount: "1 티스푼",
        tip: "혈당 영향 0 — 설탕 완벽 대체 감미료",
        buyUrl: "https://www.coupang.com/np/search?q=알룰로스+액상" },
      { name: "냉동 블루베리 or 딸기", amount: "한 줌",
        tip: "항산화 폴리페놀 + 비타민C 아침 충전",
        buyUrl: "https://www.coupang.com/np/search?q=냉동블루베리" }
    ],
    steps: [
      "차가운 그릭 요거트 150g을 넉넉한 볼에 담는다",
      "그레놀라를 한쪽에 볼록하게 올려 식감 대비를 만든다",
      "냉동 과일을 컬러풀하게 올린다 (전날 밤 냉장 해동 추천)",
      "알룰로스 한 스푼을 전체에 드리즐한다",
      "바로 먹거나 5분 냉장 후 — 요거트가 살짝 굳으면 더 맛있다"
    ],
    reason: "아침 혈당 스파이크 없이 포만감을 3~4시간 유지하는 나만의 루틴. 단백질(요거트) + 복합탄수화물(그레놀라) + 식이섬유(과일) 조합이 핵심. 알룰로스로 단맛을 살려도 혈당 걱정 없다.",
    myTip: "그레놀라를 먹기 직전에 올려야 바삭함이 유지된다. 전날 밤 준비해두면 아침 5분 컷."
  },

  {
    id: "mylife-002", num: 2,
    mealTime: "아침", emoji: "🌅", color: "#f97316",
    title: "오버나이트 오트밀",
    tagline: "자는 동안 완성되는 — 전날 10분으로 끝내는 아침",
    prepTime: "전날 10분 (당일 0분)", calories: "약 320 kcal",
    tags: ["제로노력", "혈당관리", "고섬유", "식사준비"],
    ingredients: [
      { name: "통귀리 (롤드 오트)", amount: "50g",
        tip: "퀵 오트 말고 롤드 오트 — 식감이 완전히 다름",
        buyUrl: "https://www.coupang.com/np/search?q=롤드오트+통귀리" },
      { name: "무가당 아몬드 우유 or 귀리우유", amount: "150ml",
        tip: "일반 우유보다 혈당 영향 낮음",
        buyUrl: "https://www.coupang.com/np/search?q=아몬드우유+무가당" },
      { name: "치아씨드", amount: "1 큰 스푼",
        tip: "오메가3 + 포만감 증폭",
        buyUrl: "https://www.coupang.com/np/search?q=치아씨드" },
      { name: "알룰로스", amount: "1 티스푼",
        buyUrl: "https://www.coupang.com/np/search?q=알룰로스+액상" },
      { name: "토핑: 견과류 + 바나나 슬라이스", amount: "취향껏",
        buyUrl: "https://www.coupang.com/np/search?q=믹스넛+무염" }
    ],
    steps: [
      "밀폐 유리 용기에 롤드 오트 50g을 넣는다",
      "아몬드 우유 150ml + 치아씨드 + 알룰로스를 넣고 잘 섞는다",
      "뚜껑 닫고 냉장고에 최소 8시간 (전날 밤에 만들면 완벽)",
      "아침에 꺼내 토핑(견과류, 과일)을 올리면 완성",
      "차갑게 먹거나 전자레인지 1분 30초 데워서 먹어도 좋다"
    ],
    reason: "아침에 요리할 시간이 없을 때의 완벽한 해결책. 한 번 만들어두면 3일 분량도 한 번에 가능. 귀리의 베타글루칸이 콜레스테롤 저하 + 혈당 안정화에 실제 효과가 있다.",
    myTip: "바나나를 미리 올리면 갈색으로 변하니 먹기 직전에 올릴 것. 카카오닙스를 추가하면 씁쓸하고 고급스러운 맛이 난다."
  },

  {
    id: "mylife-003", num: 3,
    mealTime: "아침", emoji: "🌅", color: "#f97316",
    title: "치아씨드 푸딩",
    tagline: "하룻밤이면 완성 — 가장 게으른 건강식",
    prepTime: "전날 5분 (당일 0분)", calories: "약 210 kcal",
    tags: ["오메가3", "저칼로리", "비건", "초간단"],
    ingredients: [
      { name: "치아씨드", amount: "3 큰 스푼 (40g)",
        tip: "부피가 4배로 불어남 — 포만감 최강",
        buyUrl: "https://www.coupang.com/np/search?q=치아씨드" },
      { name: "코코넛 밀크 (저지방)", amount: "200ml",
        tip: "코코넛향이 열대 분위기를 만든다",
        buyUrl: "https://www.coupang.com/np/search?q=코코넛밀크+저지방" },
      { name: "알룰로스", amount: "1.5 티스푼",
        buyUrl: "https://www.coupang.com/np/search?q=알룰로스+액상" },
      { name: "바닐라 에센스", amount: "2~3 방울",
        tip: "이게 없으면 그냥 푸딩, 있으면 카페 수준",
        buyUrl: "https://www.coupang.com/np/search?q=바닐라에센스+제과" },
      { name: "망고 or 키위 (토핑)", amount: "1/2개",
        buyUrl: "https://www.coupang.com/np/search?q=냉동망고" }
    ],
    steps: [
      "유리 컵에 치아씨드 3 스푼을 넣는다",
      "코코넛 밀크 200ml + 알룰로스 + 바닐라 에센스를 넣고 잘 젓는다",
      "5분 후 한 번 더 저어준다 (씨드가 뭉치지 않게)",
      "냉장고에 8시간 이상 보관",
      "아침에 과일 토핑을 올리면 즉시 완성"
    ],
    reason: "치아씨드 1 스푼에 오메가3가 연어 한 토막 수준. 코코넛 밀크와 조합하면 포만감이 의외로 강하고, 식감이 타피오카 버블티처럼 재미있다.",
    myTip: "3~4개 분량을 한꺼번에 만들어 냉장 보관(최대 5일). 위에 얹는 과일을 그날그날 바꾸면 매일 다른 맛이 난다."
  },

  // ──────────── 브런치 ────────────

  {
    id: "mylife-004", num: 4,
    mealTime: "브런치", emoji: "🍳", color: "#ec4899",
    title: "아보카도 수란 토스트",
    tagline: "주말 아침의 작은 사치 — 카페 퀄리티를 집에서",
    prepTime: "15분", calories: "약 420 kcal",
    tags: ["건강지방", "단백질", "주말브런치", "인스타감성"],
    ingredients: [
      { name: "사워도우 or 호밀 식빵", amount: "2장",
        tip: "GI지수가 낮아 혈당 영향 최소화",
        buyUrl: "https://www.coupang.com/np/search?q=사워도우+식빵" },
      { name: "잘 익은 아보카도", amount: "1개",
        tip: "꼭지 부분을 눌러봤을 때 살짝 들어가면 적당히 익은 것",
        buyUrl: "https://www.coupang.com/np/search?q=아보카도" },
      { name: "달걀 (수란용)", amount: "2개",
        buyUrl: "https://www.coupang.com/np/search?q=유정란+30구" },
      { name: "레몬즙", amount: "1/2 레몬",
        buyUrl: "https://www.coupang.com/np/search?q=레몬+국산" },
      { name: "올리브오일 엑스트라버진", amount: "약간",
        buyUrl: "https://www.coupang.com/np/search?q=올리브오일+엑스트라버진" },
      { name: "홍고추 플레이크 + 소금 + 후추", amount: "적당량",
        buyUrl: "https://www.coupang.com/np/search?q=말돈소금+홍고추플레이크" }
    ],
    steps: [
      "아보카도를 반으로 갈라 씨를 제거하고 숟가락으로 살을 파낸다",
      "아보카도를 포크로 으깨고 레몬즙 + 소금 + 후추로 간한다",
      "식빵을 토스터로 바삭하게 굽는다",
      "냄비에 물을 끓이고 식초 한 스푼 + 소금, 달걀을 조심스럽게 넣어 3분 수란을 만든다",
      "토스트 위에 아보카도 스프레드를 듬뿍 올리고 수란을 얹는다",
      "올리브오일 드리즐 + 홍고추 플레이크로 마무리"
    ],
    reason: "아보카도의 불포화지방산이 심혈관 건강에 탁월하고, 수란으로 완전 단백질을 더한다. 주말 아침에 시간을 들여 만드는 이 한 끼가 일주일의 퀄리티를 올려준다.",
    myTip: "수란이 어렵다면 반숙 프라이로 대체해도 충분히 맛있다. 아보카도에 레몬즙을 충분히 넣어야 갈변을 막을 수 있다."
  },

  // ──────────── 점심 ────────────

  {
    id: "mylife-005", num: 5,
    mealTime: "점심", emoji: "☕", color: "#0f6b66",
    title: "감성 빵 + 올리브오일 디핑 + 커피",
    tagline: "자극 없이 깊은 맛 — 유럽식 심플 런치",
    prepTime: "10분", calories: "약 480 kcal",
    tags: ["유럽감성", "담백", "커피페어링", "미니멀"],
    ingredients: [
      { name: "치아바타 or 바게트", amount: "150g (약 1/3 바게트)",
        tip: "겉은 바삭, 속은 쫀득한 종류 추천",
        buyUrl: "https://search.shopping.naver.com/search/all?query=치아바타+베이커리" },
      { name: "올리브오일 엑스트라버진", amount: "3 큰 스푼",
        tip: "품질 좋은 오일이 이 메뉴의 핵심 — 아끼지 말 것",
        buyUrl: "https://www.coupang.com/np/search?q=올리브오일+엑스트라버진+이탈리아" },
      { name: "발사믹 식초 (아체토 발사미코)", amount: "1 큰 스푼",
        tip: "숙성된 발사믹은 단맛이 있어 올리브오일과 완벽한 균형",
        buyUrl: "https://www.coupang.com/np/search?q=발사믹식초+숙성" },
      { name: "말돈 소금 (플레이크 소금)", amount: "한 꼬집",
        tip: "이 소금 하나가 전체 맛을 3배 올림",
        buyUrl: "https://www.coupang.com/np/search?q=말돈소금" },
      { name: "에스프레소 원두 (스페셜티 추천)", amount: "적당량",
        tip: "에티오피아 예가체프 or 콜롬비아 수프리모",
        buyUrl: "https://www.coupang.com/np/search?q=스페셜티+원두+에티오피아" }
    ],
    steps: [
      "빵을 먹기 좋은 크기로 손으로 뜯거나 슬라이스한다",
      "접시에 올리브오일 3스푼을 붓는다",
      "발사믹 식초를 오일 위에 1스푼 뿌린다 (섞지 않고 그대로)",
      "말돈 소금을 가볍게 올린다",
      "취향에 따라 로즈마리나 마늘을 소스에 더해도 좋다",
      "핸드드립이나 에스프레소 한 잔과 함께 낸다"
    ],
    reason: "과도한 탄수화물이나 자극적인 소스 없이 올리브오일의 건강한 지방으로 포만감을 채운다. 발사믹 발효의 폴리페놀이 항산화 효과까지. 무엇보다 이 조합은 단순한데 깊다.",
    myTip: "발사믹과 오일을 미리 섞지 말 것 — 적시는 순간에 섞이는 게 포인트. 빵은 반드시 오븐에서 살짝 워밍해야 버터처럼 흡수된다."
  },

  {
    id: "mylife-006", num: 6,
    mealTime: "점심", emoji: "☕", color: "#0f6b66",
    title: "훈제연어 아보카도 볼",
    tagline: "한 그릇에 오메가3 + 건강지방 — 두뇌 점심",
    prepTime: "10분", calories: "약 450 kcal",
    tags: ["오메가3", "두뇌식품", "글루텐프리", "단백질"],
    ingredients: [
      { name: "훈제연어 슬라이스", amount: "100g",
        tip: "냉훈제 슬라이스 — 그냥 먹어도 맛있는 품질로",
        buyUrl: "https://www.coupang.com/np/search?q=훈제연어+슬라이스" },
      { name: "아보카도", amount: "1/2개",
        buyUrl: "https://www.coupang.com/np/search?q=아보카도" },
      { name: "현미밥 or 퀴노아", amount: "1/2 공기",
        buyUrl: "https://www.coupang.com/np/search?q=즉석현미밥" },
      { name: "케이퍼 or 오이 피클", amount: "1 큰 스푼",
        tip: "훈제연어에 산미가 필수 — 이 재료가 맛을 정리함",
        buyUrl: "https://www.coupang.com/np/search?q=케이퍼" },
      { name: "크림치즈 (무가당)", amount: "1 큰 스푼",
        buyUrl: "https://www.coupang.com/np/search?q=크림치즈+무가당" },
      { name: "레몬 + 딜", amount: "약간",
        buyUrl: "https://www.coupang.com/np/search?q=건조딜" }
    ],
    steps: [
      "현미밥 or 퀴노아를 볼 바닥에 깐다",
      "아보카도를 슬라이스해서 한쪽에 펼쳐놓는다",
      "훈제연어를 돌돌 말아 장미 모양으로 올린다",
      "크림치즈를 작게 떠서 사이사이에 올린다",
      "케이퍼와 딜을 뿌리고 레몬즙을 드리즐",
      "올리브오일을 마지막에 살짝 두르면 완성"
    ],
    reason: "DHA/EPA가 풍부한 연어와 아보카도의 조합은 집중력과 기분을 높이는 점심 루틴으로 최적. 오후 집중력이 현저히 달라진다.",
    myTip: "훈제연어는 출처를 확인할 것. 노르웨이산 냉훈제가 맛 차이가 크다. 케이퍼가 없으면 작게 썬 피클로도 충분하다."
  },

  {
    id: "mylife-007", num: 7,
    mealTime: "점심", emoji: "☕", color: "#0f6b66",
    title: "퀴노아 샐러드 볼",
    tagline: "완전 단백질 곡물 — 고기 없이 근육 채우기",
    prepTime: "20분 (퀴노아 삶기 포함)", calories: "약 380 kcal",
    tags: ["완전단백질", "글루텐프리", "채식", "근육"],
    ingredients: [
      { name: "퀴노아 (삼색 추천)", amount: "70g (건량)",
        tip: "모든 필수 아미노산을 포함한 완전 단백질 곡물",
        buyUrl: "https://www.coupang.com/np/search?q=퀴노아+삼색" },
      { name: "방울토마토", amount: "10개",
        buyUrl: "https://www.coupang.com/np/search?q=방울토마토" },
      { name: "오이 + 파프리카", amount: "각 1/2개",
        buyUrl: "https://www.coupang.com/np/search?q=파프리카+3색" },
      { name: "페타치즈 or 리코타치즈", amount: "50g",
        tip: "단백질 추가 + 짭짤한 포인트",
        buyUrl: "https://www.coupang.com/np/search?q=페타치즈" },
      { name: "올리브오일 + 레몬즙 드레싱", amount: "3:1 비율",
        buyUrl: "https://www.coupang.com/np/search?q=올리브오일+엑스트라버진" },
      { name: "민트 잎 or 파슬리", amount: "약간",
        buyUrl: "https://www.coupang.com/np/search?q=건조파슬리" }
    ],
    steps: [
      "퀴노아를 찬물에 5분 불린 후 2배 물과 함께 15분 삶는다",
      "삶은 퀴노아를 식히는 동안 채소를 깍둑 썬다",
      "드레싱: 올리브오일 3T + 레몬즙 1T + 소금 + 후추 혼합",
      "퀴노아 + 채소를 볼에 담고 드레싱을 버무린다",
      "페타치즈를 손으로 부숴 위에 올린다",
      "민트 or 파슬리로 마무리"
    ],
    reason: "퀴노아는 9가지 필수 아미노산을 모두 포함한 유일한 곡물. 고기 없이도 완전한 단백질 섭취가 가능하고, 혈당 지수도 낮아 오후 컨디션이 안정적이다.",
    myTip: "퀴노아는 씻을 때 비린 쓴맛(사포닌)이 나오므로 반드시 찬물에 5분 이상 불리며 씻을 것. 냉장 보관 3일 가능 — 미리 만들어두면 편하다."
  },

  // ──────────── 음료 ────────────

  {
    id: "mylife-008", num: 8,
    mealTime: "음료", emoji: "🥤", color: "#06b6d4",
    title: "핸드드립 스페셜티 커피",
    tagline: "의식(儀式)이 되는 커피 — 하루의 리셋 버튼",
    prepTime: "7분", calories: "약 5 kcal (블랙)",
    tags: ["스페셜티", "카페인", "명상루틴", "핸드드립"],
    ingredients: [
      { name: "스페셜티 원두 (에티오피아 예가체프 추천)", amount: "15g",
        tip: "꽃향, 베리향의 싱글 오리진 — 취향 탐색의 즐거움",
        buyUrl: "https://www.coupang.com/np/search?q=스페셜티원두+에티오피아+예가체프" },
      { name: "정제수 or 생수 (미네랄 적은 것)", amount: "250ml",
        tip: "수돗물보다 생수가 향을 더 깨끗하게 살린다",
        buyUrl: "https://www.coupang.com/np/search?q=생수+저미네랄" },
      { name: "드립 필터 (오리가미 or 하리오 V60 추천)", amount: "1장",
        tip: "드리퍼 종류에 따라 맛이 달라짐 — 취향 실험해볼 것",
        buyUrl: "https://www.coupang.com/np/search?q=하리오+V60+드리퍼" }
    ],
    steps: [
      "원두 15g을 분쇄한다 (중간 굵기 — 설탕 알갱이 수준)",
      "물을 92~94°C로 끓인다 (끓인 물에서 30초 기다리면 됨)",
      "필터를 적셔 드리퍼를 예열한다",
      "뜸들이기: 원두 무게의 2배(30g)로 30초 기다린다",
      "나머지 물을 3~4회 나눠 천천히 원을 그리며 붓는다",
      "총 추출 시간 2분 30초 ~ 3분이 이상적"
    ],
    reason: "커피를 마시는 행위가 아니라 '내리는 과정'이 명상처럼 하루를 정리해준다. 스페셜티 원두는 산지마다 다른 향미 프로파일 — 이것 자체가 취미가 된다.",
    myTip: "뜸들이기가 가장 중요. 이 30초를 건너뛰면 맛이 확연히 달라진다. 같은 원두라도 물 온도 2°C 차이로 산미와 쓴맛이 달라지니 실험해볼 것."
  },

  {
    id: "mylife-009", num: 9,
    mealTime: "음료", emoji: "🥤", color: "#06b6d4",
    title: "아침 그린 스무디",
    tagline: "마시는 채소 — 5가지 영양소를 한 번에",
    prepTime: "5분", calories: "약 180 kcal",
    tags: ["디톡스", "비타민", "엽록소", "에너지충전"],
    ingredients: [
      { name: "냉동 시금치 (or 케일)", amount: "한 줌 (50g)",
        tip: "생 시금치보다 냉동이 영양소 보존율이 더 높다",
        buyUrl: "https://www.coupang.com/np/search?q=냉동시금치" },
      { name: "냉동 망고 or 바나나", amount: "100g",
        tip: "단맛을 내면서 초록맛을 가려주는 마법 재료",
        buyUrl: "https://www.coupang.com/np/search?q=냉동망고" },
      { name: "아몬드 우유", amount: "200ml",
        buyUrl: "https://www.coupang.com/np/search?q=아몬드우유+무가당" },
      { name: "치아씨드", amount: "1 큰 스푼",
        buyUrl: "https://www.coupang.com/np/search?q=치아씨드" },
      { name: "레몬즙", amount: "1/4 레몬",
        tip: "산미가 시금치 쓴맛을 중화시킴",
        buyUrl: "https://www.coupang.com/np/search?q=레몬+국산" }
    ],
    steps: [
      "블렌더에 아몬드 우유를 먼저 넣는다 (날이 잘 돌도록)",
      "시금치 → 냉동 과일 → 치아씨드 순으로 넣는다",
      "레몬즙을 짜서 넣는다",
      "40~60초 강하게 블렌딩",
      "즉시 마실 것 (시간이 지나면 분리됨)",
      "원하면 알룰로스로 단맛 조절"
    ],
    reason: "아침 공복 상태의 장이 영양소를 가장 잘 흡수한다. 채소를 씹어 먹기 부담스러운 아침에 마시는 형태로 녹색 영양소를 충전할 수 있다.",
    myTip: "초록색이 무섭다면 망고/바나나 비율을 높여 시작. 시금치 맛은 거의 안 난다. 블렌더는 사용 직후 물 + 주방세제로 30초 블렌딩하면 세척 끝."
  },

  // ──────────── 간식 ────────────

  {
    id: "mylife-010", num: 10,
    mealTime: "간식", emoji: "🍫", color: "#f59e0b",
    title: "다크초콜릿 + 아몬드 + 치즈",
    tagline: "완벽한 트리오 — 30분의 집중력을 되살리는 간식",
    prepTime: "즉시", calories: "약 220 kcal",
    tags: ["항산화", "집중력", "건강지방", "간단"],
    ingredients: [
      { name: "다크초콜릿 (카카오 70% 이상)", amount: "20~30g (4~5조각)",
        tip: "카카오 70%+ 에서 플라바노이드 효과 — 혈압 개선, 항산화",
        buyUrl: "https://www.coupang.com/np/search?q=다크초콜릿+카카오70+이상" },
      { name: "자연산 아몬드 (무염, 로스팅)", amount: "20~25알",
        tip: "비타민E + 마그네슘 + 불포화지방산의 조합",
        buyUrl: "https://www.coupang.com/np/search?q=아몬드+무염+자연산" },
      { name: "고다 치즈 or 체다 치즈", amount: "1~2장",
        tip: "단백질 + 칼슘 + 고소함으로 완성도 업",
        buyUrl: "https://www.coupang.com/np/search?q=고다치즈+슬라이스" }
    ],
    steps: [
      "작은 접시에 다크초콜릿, 아몬드, 치즈를 나란히 담는다",
      "먹는 순서: 아몬드 → 초콜릿 → 치즈 순으로 먹으면 맛이 층층이 쌓임",
      "커피나 녹차와 함께 마시면 더욱 좋다",
      "끝 — 진짜 이게 전부다"
    ],
    reason: "오후 3~4시 혈당이 떨어지는 타이밍에 맞춘 스낵. 정크푸드 대신 이 조합으로 집중력을 15~30분 내에 회복할 수 있다. 다크초콜릿의 테오브로민이 카페인보다 부드럽게 각성 효과를 낸다.",
    myTip: "처음엔 카카오 70%가 쓸 수 있다. 85% → 90% 순으로 올리면서 적응하면 나중엔 밀크초콜릿이 오히려 너무 달게 느껴진다."
  },

  {
    id: "mylife-011", num: 11,
    mealTime: "간식", emoji: "🍫", color: "#f59e0b",
    title: "후무스 + 야채스틱",
    tagline: "중동의 디핑 소스 — 채소가 과자보다 맛있어지는 마법",
    prepTime: "10분 (직접 만들기) / 즉시 (시판)", calories: "약 180 kcal",
    tags: ["식물성단백질", "저칼로리", "포만감", "디핑"],
    ingredients: [
      { name: "병아리콩 통조림 (or 삶은 것)", amount: "1캔 (240g)",
        tip: "식물성 단백질 + 식이섬유의 보고",
        buyUrl: "https://www.coupang.com/np/search?q=병아리콩+통조림" },
      { name: "타히니 (참깨 페이스트)", amount: "2 큰 스푼",
        tip: "후무스 맛의 핵심 — 없으면 참기름으로 대체 가능",
        buyUrl: "https://www.coupang.com/np/search?q=타히니+참깨페이스트" },
      { name: "마늘 (다진)", amount: "1쪽",
        buyUrl: "https://www.coupang.com/np/search?q=다진마늘" },
      { name: "레몬즙 + 올리브오일", amount: "각 2스푼",
        buyUrl: "https://www.coupang.com/np/search?q=올리브오일+엑스트라버진" },
      { name: "당근 + 오이 + 파프리카 스틱", amount: "각 1/2개",
        tip: "셀러리, 브로콜리 등 냉장고 채소 뭐든 OK",
        buyUrl: "https://www.coupang.com/np/search?q=파프리카+당근" }
    ],
    steps: [
      "병아리콩을 체에 걸러 물기를 제거한다 (통조림 물 버리기)",
      "푸드 프로세서 or 믹서에 병아리콩 + 타히니 + 마늘 + 레몬즙을 넣는다",
      "올리브오일을 조금씩 넣으며 부드럽게 갈아준다",
      "소금으로 간, 농도는 물 한 스푼씩 넣어 조절",
      "접시에 담고 올리브오일 + 파프리카 파우더로 마무리",
      "채소 스틱을 곁들인다"
    ],
    reason: "병아리콩은 저GI 식품으로 혈당을 천천히 올리며, 식이섬유가 풍부해 장 건강에도 좋다. 채소를 소스에 찍어 먹으면 채소 자체의 단맛을 새롭게 발견하게 된다.",
    myTip: "직접 만들기 귀찮다면 시판 후무스(서브웨이 등 유럽 브랜드)를 구매해도 OK. 냉장 보관 5일 가능 — 넉넉히 만들어두자."
  },

  {
    id: "mylife-012", num: 12,
    mealTime: "간식", emoji: "🍫", color: "#f59e0b",
    title: "그릭 요거트 + 꿀 + 견과류",
    tagline: "야식을 건강하게 — 10시 이후의 완벽한 해결책",
    prepTime: "2분", calories: "약 240 kcal",
    tags: ["야식대체", "저당", "수면전", "포만감"],
    ingredients: [
      { name: "그릭 요거트 (무가당)", amount: "150g",
        buyUrl: "https://www.coupang.com/np/search?q=그릭요거트+무가당" },
      { name: "생꿀 (아카시아 or 마누카)", amount: "1 티스푼",
        tip: "정제 설탕 대신 천연 꿀로 — 소량이지만 만족감 큼",
        buyUrl: "https://www.coupang.com/np/search?q=아카시아꿀+국산" },
      { name: "믹스 견과류 (무염)", amount: "1 작은 줌 (15g)",
        tip: "자기 전 불포화지방산이 수면의 질을 높인다는 연구 있음",
        buyUrl: "https://www.coupang.com/np/search?q=믹스넛+무염+소포장" },
      { name: "시나몬 파우더", amount: "아주 약간",
        tip: "혈당 조절 효능 + 향이 요거트와 완벽하게 어울림",
        buyUrl: "https://www.coupang.com/np/search?q=시나몬파우더" }
    ],
    steps: [
      "그릭 요거트를 그릇에 담는다",
      "꿀을 드리즐 → 견과류를 올린다",
      "시나몬을 살짝 뿌린다",
      "숟가락으로 조금씩 섞어 먹으면서 맛의 균형을 직접 찾는다"
    ],
    reason: "야식 욕구를 완전히 억누르면 실패한다. 이 조합은 단백질로 포만감을 주면서 혈당 급등 없이 야식 욕구를 채운다. 시나몬이 실제로 식후 혈당 스파이크를 낮추는 효과가 있다.",
    myTip: "꿀은 1 티스푼이 한계. 2 티스푼부터는 너무 달아진다. 마누카 꿀(UMF 10+)은 비싸지만 항균 효과까지 있어서 아플 때 특히 추천."
  },

  // ──────────── 저녁 ────────────

  {
    id: "mylife-013", num: 13,
    mealTime: "저녁", emoji: "🌙", color: "#6366f1",
    title: "닭가슴살 그린 샐러드",
    tagline: "저녁 단백질 충전 — 가장 지속 가능한 저녁 루틴",
    prepTime: "15분", calories: "약 350 kcal",
    tags: ["고단백", "저칼로리", "다이어트", "체력"],
    ingredients: [
      { name: "닭가슴살 (냉동 슬라이스 or 신선)", amount: "150g",
        tip: "통조림 닭가슴살도 품질 좋은 건 충분히 맛있다",
        buyUrl: "https://www.coupang.com/np/search?q=닭가슴살+슬라이스+냉동" },
      { name: "로메인 상추 or 어린잎 채소", amount: "150g",
        buyUrl: "https://www.coupang.com/np/search?q=어린잎채소+샐러드" },
      { name: "방울토마토 + 오이 + 파프리카", amount: "각 적당량",
        buyUrl: "https://www.coupang.com/np/search?q=방울토마토" },
      { name: "올리브오일 레몬 드레싱", amount: "올리브오일3T + 레몬즙1T + 디종머스타드 1ts",
        tip: "이 드레싱이 어떤 샐러드도 살린다",
        buyUrl: "https://www.coupang.com/np/search?q=디종머스타드" },
      { name: "파르메산 치즈 (분말 or 블록)", amount: "적당량",
        tip: "마무리로 갈아 뿌리면 감칠맛이 확 올라감",
        buyUrl: "https://www.coupang.com/np/search?q=파르메산치즈" }
    ],
    steps: [
      "닭가슴살을 소금 + 후추로 밑간 후 팬에서 중불로 7~8분 굽는다",
      "구운 닭을 5분 레스팅 후 먹기 좋게 슬라이스한다",
      "채소를 씻어 물기를 털어낸다",
      "드레싱 재료를 병에 넣고 흔들어 유화시킨다",
      "채소 + 채소 위에 닭가슴살 올리고 드레싱을 두른다",
      "파르메산 치즈를 듬뿍 갈아 마무리"
    ],
    reason: "저녁 과식을 방지하면서 하루 단백질 목표를 채우는 가장 효율적인 식사. 채소의 식이섬유가 자는 동안 장을 청소해준다.",
    myTip: "닭가슴살은 굽기 전 소금물(브라인)에 30분 담가두면 퍽퍽함이 없어진다. 드레싱은 냉장고에 2주 보관 가능 — 미리 만들어두면 매우 편하다."
  },

  {
    id: "mylife-014", num: 14,
    mealTime: "저녁", emoji: "🌙", color: "#6366f1",
    title: "알리오 올리오 파스타",
    tagline: "재료 4가지로 완성하는 이탈리아의 정수",
    prepTime: "20분", calories: "약 520 kcal",
    tags: ["이탈리안", "담백", "마늘향", "4재료"],
    ingredients: [
      { name: "스파게티 or 링귀네 (170g 기준 2인분)", amount: "85g (1인)",
        tip: "알 덴테로 삶을 것 — 2분 덜 삶아야 함",
        buyUrl: "https://www.coupang.com/np/search?q=스파게티+링귀네" },
      { name: "마늘 (슬라이스)", amount: "5~7쪽",
        tip: "이게 소스의 99% — 넉넉히 아끼지 말 것",
        buyUrl: "https://www.coupang.com/np/search?q=국산마늘" },
      { name: "올리브오일 엑스트라버진", amount: "4~5 큰 스푼",
        tip: "품질이 이 파스타의 전부를 결정함",
        buyUrl: "https://www.coupang.com/np/search?q=올리브오일+엑스트라버진+이탈리아" },
      { name: "페페론치노 (이탈리안 건고추)", amount: "2~3개",
        tip: "청양고추로 대체 가능 — 은은한 매운맛이 포인트",
        buyUrl: "https://www.coupang.com/np/search?q=페페론치노+건고추" },
      { name: "파스타 삶는 물 (소금 넉넉히)", amount: "1 국자",
        tip: "이 소금 파스타 물이 소스의 농도와 간을 잡는 핵심 재료",
        buyUrl: "" },
      { name: "파르메산 치즈 + 파슬리", amount: "마무리용",
        buyUrl: "https://www.coupang.com/np/search?q=파르메산치즈+블록" }
    ],
    steps: [
      "큰 냄비에 물을 끓이고 소금을 바닷물처럼 넉넉히 넣는다",
      "파스타를 표시 시간보다 2분 덜 삶는다 (삶는 물 1국자 보관)",
      "팬에 올리브오일 + 슬라이스 마늘을 넣고 약불로 천천히 볶는다",
      "마늘이 연한 황금색이 될 때 페페론치노 추가 — 절대 태우지 말 것",
      "파스타를 건져 팬에 넣고 파스타 물을 넣으며 팬을 흔들어 유화",
      "불을 끄고 파르메산 + 파슬리로 마무리"
    ],
    reason: "재료가 단순할수록 재료의 품질이 맛을 결정한다. 알리오 올리오는 올리브오일 마늘만으로 이탈리아 레스토랑 수준의 맛을 만들 수 있다는 걸 증명하는 레시피다.",
    myTip: "마늘을 태우면 전체가 쓰게 된다 — 약불에서 인내심 있게. 파스타 물의 소금이 소스의 간을 잡으므로 파스타 삶을 때 소금을 충분히 넣는 것이 절대적."
  },

  {
    id: "mylife-015", num: 15,
    mealTime: "저녁", emoji: "🌙", color: "#6366f1",
    title: "두부 스테이크 + 버섯 볶음",
    tagline: "고기 없이 스테이크 감성 — 식물성 저녁의 정점",
    prepTime: "15분", calories: "약 320 kcal",
    tags: ["식물성단백질", "저칼로리", "이소플라본", "채식"],
    ingredients: [
      { name: "단단한 두부 (부침용)", amount: "1모 (300g)",
        tip: "수분을 최대한 제거해야 바삭하게 구워짐",
        buyUrl: "https://www.coupang.com/np/search?q=두부+부침용" },
      { name: "다양한 버섯 (표고, 새송이, 느타리)", amount: "200g",
        tip: "버섯의 감칠맛(글루탐산)이 고기맛을 대체",
        buyUrl: "https://www.coupang.com/np/search?q=모둠버섯+표고+새송이" },
      { name: "간장 + 맛술 + 참기름 소스", amount: "2:1:0.5",
        buyUrl: "https://www.coupang.com/np/search?q=양조간장" },
      { name: "마늘 + 생강 (다진)", amount: "각 1 티스푼",
        buyUrl: "https://www.coupang.com/np/search?q=다진마늘" },
      { name: "올리브오일", amount: "2 큰 스푼",
        buyUrl: "https://www.coupang.com/np/search?q=올리브오일+엑스트라버진" }
    ],
    steps: [
      "두부를 키친타월로 감싸 무거운 것으로 20분 눌러 수분 제거",
      "두부를 2cm 두께로 슬라이스, 소금 + 후추로 밑간",
      "팬에 올리브오일 두르고 두부를 중강불로 앞뒤 각 4분씩 황금빛이 날 때까지 굽는다",
      "두부를 꺼내고 같은 팬에 버섯 + 마늘 + 생강 볶기",
      "소스(간장+맛술+참기름)를 넣고 윤기 나게 볶아 완성",
      "두부 위에 버섯 소스를 끼얹어 낸다"
    ],
    reason: "두부의 이소플라본은 여성 호르몬 균형, 남성 테스토스테론 건강에 모두 긍정적 연구 결과가 있다. 버섯의 베타글루칸은 면역력을 높이는 기능성 성분이다.",
    myTip: "두부 수분 제거가 이 레시피 성패를 결정한다. 20분 이상 눌러두는 게 핵심. 마른 두부가 팬에서 닿으면 스테이크처럼 바삭한 크러스트가 생긴다."
  },

  {
    id: "mylife-016", num: 16,
    mealTime: "저녁", emoji: "🌙", color: "#6366f1",
    title: "구운 연어 + 레몬 채소",
    tagline: "15분으로 완성하는 — 오메가3 풀코스",
    prepTime: "15분", calories: "약 480 kcal",
    tags: ["오메가3", "항염증", "고단백", "저탄수"],
    ingredients: [
      { name: "연어 필렛 (노르웨이산 추천)", amount: "180g",
        tip: "껍질이 있는 쪽으로 먼저 구우면 모양이 흐트러지지 않는다",
        buyUrl: "https://www.coupang.com/np/search?q=연어필렛+노르웨이" },
      { name: "아스파라거스 or 브로콜리", amount: "100g",
        buyUrl: "https://www.coupang.com/np/search?q=아스파라거스" },
      { name: "방울토마토", amount: "8개",
        buyUrl: "https://www.coupang.com/np/search?q=방울토마토" },
      { name: "레몬 1개 + 올리브오일 + 허브(딜, 타임)",
        amount: "적당량",
        buyUrl: "https://www.coupang.com/np/search?q=레몬+국산" },
      { name: "케이퍼 or 머스타드", amount: "1 큰 스푼",
        tip: "연어의 지방을 잡아주는 산미 필수",
        buyUrl: "https://www.coupang.com/np/search?q=케이퍼" }
    ],
    steps: [
      "오븐을 200°C로 예열한다 (오븐팬에 종이 호일 깔기)",
      "연어에 올리브오일 + 소금 + 후추 + 레몬즙 + 딜로 마리네이드",
      "채소도 올리브오일 + 소금으로 간한다",
      "오븐팬에 연어와 채소를 함께 배치",
      "200°C에서 12~15분 (연어 두께 2.5cm 기준)",
      "레몬 슬라이스를 올려 테이블에 낸다"
    ],
    reason: "연어의 EPA/DHA는 뇌 기능과 항염증 작용에 가장 직접적인 식이 오메가3 공급원. 아스파라거스의 아스파라긴산이 간 해독을 돕는다.",
    myTip: "연어는 오버쿠킹을 절대 피할 것. 겉이 불투명하고 속이 약간 반투명한 순간이 완벽한 타이밍. 오븐이 없으면 팬에 껍질면 5분, 뒤집어 2분으로도 충분."
  },

  {
    id: "mylife-017", num: 17,
    mealTime: "저녁", emoji: "🌙", color: "#6366f1",
    title: "현미밥 + 미역국",
    tagline: "가장 한국적인 치유식 — 위장을 쉬게 하는 저녁",
    prepTime: "20분", calories: "약 310 kcal",
    tags: ["한식", "장건강", "미네랄", "소화"],
    ingredients: [
      { name: "즉석 현미밥 (or 현미+잡곡 밥솥)", amount: "1팩 or 1공기",
        tip: "현미는 GI지수가 백미의 절반 — 저녁 탄수화물로 최적",
        buyUrl: "https://www.coupang.com/np/search?q=즉석현미밥" },
      { name: "건미역", amount: "20g (불리면 150g)",
        tip: "요오드 + 칼슘 + 후코이단 — 장 점막 건강에 탁월",
        buyUrl: "https://www.coupang.com/np/search?q=건미역+국산" },
      { name: "참기름", amount: "1 큰 스푼",
        tip: "미역국은 볶아서 시작하는 것이 깊은 맛의 비결",
        buyUrl: "https://www.coupang.com/np/search?q=참기름+100%" },
      { name: "국간장", amount: "1~2 큰 스푼",
        buyUrl: "https://www.coupang.com/np/search?q=국간장" },
      { name: "멸치 육수 or 다시마 육수", amount: "600ml",
        buyUrl: "https://www.coupang.com/np/search?q=멸치다시팩" }
    ],
    steps: [
      "건미역을 찬물에 20분 불린 후 먹기 좋게 자른다",
      "냄비에 참기름을 두르고 미역을 2~3분 볶는다 (이 볶음이 핵심)",
      "육수 600ml를 붓고 국간장으로 간한다",
      "중불에서 10분 끓인다",
      "현미밥을 곁들여 낸다",
      "참기름을 한 방울 더 넣으면 완성도가 올라간다"
    ],
    reason: "소화가 부담스럽거나 위장이 예민한 날의 완벽한 선택. 미역의 후코이단이 장 점막을 보호하고 면역 활성화 효과가 있다는 연구가 있다. 정말 한국인의 치유식.",
    myTip: "미역국은 다음날 더 맛있다. 넉넉히 끓여서 냉장 보관 3일. 국간장은 조금씩 넣으며 간을 맞추는 것 — 짜지면 돌아올 수 없다."
  },

  // ──────────── 야식 / 마무리 ────────────

  {
    id: "mylife-018", num: 18,
    mealTime: "야식", emoji: "🌙", color: "#8b5cf6",
    title: "캐모마일 티 + 다크초콜릿",
    tagline: "하루의 끝 — 수면을 위한 마지막 의식",
    prepTime: "5분", calories: "약 60 kcal",
    tags: ["수면유도", "항산화", "카페인0", "릴렉스"],
    ingredients: [
      { name: "캐모마일 티백 (or 건조 캐모마일)", amount: "1~2 티백",
        tip: "아피게닌 성분이 GABA 수용체에 결합 — 자연 수면제 효과",
        buyUrl: "https://www.coupang.com/np/search?q=캐모마일티+티백" },
      { name: "다크초콜릿 (카카오 85%+)", amount: "2~3조각 (15g)",
        tip: "트립토판 → 세로토닌 → 멜라토닌 전환을 돕는다",
        buyUrl: "https://www.coupang.com/np/search?q=다크초콜릿+카카오85" },
      { name: "꿀 (생꿀)", amount: "0.5 티스푼 (선택)",
        tip: "간 글리코겐을 채워 수면 중 저혈당을 방지",
        buyUrl: "https://www.coupang.com/np/search?q=아카시아꿀+국산" }
    ],
    steps: [
      "90°C 물에 캐모마일 티백을 5분 우린다 (끓는 물은 향이 날아감)",
      "꿀을 넣는다면 살짝 식은 후에 넣는다 (50°C 이하에서 효소 보존)",
      "다크초콜릿 2~3조각과 함께 천천히 마신다",
      "화면(폰/TV)을 끄고 이 시간만큼은 조용히"
    ],
    reason: "수면의 질이 다음 날 식욕, 집중력, 기분을 결정한다. 캐모마일의 아피게닌은 임상적으로 입증된 수면 촉진 성분. 다크초콜릿의 마그네슘은 근육 이완을 돕는다.",
    myTip: "이 루틴을 잠자리 드는 시간 1시간 전에 시작하면 효과가 배가된다. 빛 차단(암막 커튼)과 함께하면 수면의 질이 현저히 달라짐."
  },

  // ──────────── 디저트 ────────────

  {
    id: "mylife-019", num: 19,
    mealTime: "디저트", emoji: "🍮", color: "#a855f7",
    title: "코코넛 치아씨드 무스",
    tagline: "죄책감 없는 달콤함 — 건강한 디저트의 새로운 기준",
    prepTime: "전날 10분 (당일 0분)", calories: "약 190 kcal",
    tags: ["비건디저트", "저당", "오메가3", "전날준비"],
    ingredients: [
      { name: "치아씨드", amount: "4 큰 스푼 (50g)",
        buyUrl: "https://www.coupang.com/np/search?q=치아씨드" },
      { name: "코코넛 밀크 (풀 팻)", amount: "250ml",
        tip: "저지방보다 풀 팻이 크리미하고 디저트다운 식감을 만든다",
        buyUrl: "https://www.coupang.com/np/search?q=코코넛밀크+풀팻" },
      { name: "알룰로스 + 바닐라 에센스", amount: "2T + 3방울",
        buyUrl: "https://www.coupang.com/np/search?q=알룰로스+액상" },
      { name: "카카오 파우더 (무가당)", amount: "1 큰 스푼",
        tip: "초코 무스 버전을 원한다면 여기에",
        buyUrl: "https://www.coupang.com/np/search?q=카카오파우더+무가당" },
      { name: "코코넛 플레이크 + 과일 (토핑)", amount: "적당량",
        buyUrl: "https://www.coupang.com/np/search?q=코코넛플레이크" }
    ],
    steps: [
      "코코넛 밀크 + 알룰로스 + 바닐라 에센스를 잘 섞는다",
      "치아씨드를 넣고 잘 저어준다",
      "카카오 파우더 버전: 카카오를 추가하고 덩어리 없이 섞는다",
      "5분 후 한 번 더 저어준다 (뭉침 방지)",
      "냉장고에 8시간 이상 보관",
      "먹기 직전 토핑을 올린다"
    ],
    reason: "일반 초콜릿 무스는 설탕 + 크림의 덩어리지만, 이 버전은 같은 만족감을 얻으면서 오메가3와 식이섬유를 섭취한다. 디저트도 내 철학에서 예외일 수 없다.",
    myTip: "유리잔에 담으면 레이어가 보여 카페 수준으로 예쁘다. 딸기 + 민트 잎으로 토핑하면 진짜 카페 디저트처럼 보인다."
  },

  {
    id: "mylife-020", num: 20,
    mealTime: "브런치", emoji: "🍳", color: "#ec4899",
    title: "홈메이드 에그 베네딕트",
    tagline: "주말의 특별한 사치 — 집에서 만드는 5성급 브런치",
    prepTime: "25분", calories: "약 550 kcal",
    tags: ["주말특식", "단백질풍부", "도전레시피", "프리미엄"],
    ingredients: [
      { name: "잉글리시 머핀 (or 사워도우)", amount: "2개",
        buyUrl: "https://www.coupang.com/np/search?q=잉글리시머핀" },
      { name: "달걀 (수란용)", amount: "2개",
        buyUrl: "https://www.coupang.com/np/search?q=유정란+30구" },
      { name: "캐나다 베이컨 or 훈제 연어", amount: "4장",
        tip: "훈제 연어 버전이 더 가볍고 건강함",
        buyUrl: "https://www.coupang.com/np/search?q=훈제연어+슬라이스" },
      { name: "홀랜다이즈 소스: 달걀 노른자 2개 + 버터 100g + 레몬즙",
        amount: "1회 분량",
        tip: "홀랜다이즈가 이 요리의 꽃 — 정성이 맛이 된다",
        buyUrl: "https://www.coupang.com/np/search?q=무염버터+발효" },
      { name: "파프리카 파우더 + 차이브", amount: "마무리용",
        buyUrl: "https://www.coupang.com/np/search?q=파프리카파우더" }
    ],
    steps: [
      "[홀랜다이즈] 중탕: 노른자 2개 + 레몬즙 1T를 거품기로 섞은 뒤 약불 중탕하며 저어준다",
      "녹인 버터를 아주 천천히 부으며 계속 저어 소스를 유화시킨다",
      "[수란] 끓는 물에 식초 1T + 소금, 소용돌이 만든 후 달걀을 넣어 3분",
      "[어셈블리] 구운 머핀 → 베이컨/연어 → 수란 → 홀랜다이즈 소스 순으로",
      "파프리카 파우더 + 차이브로 마무리",
      "바로 낼 것 — 수란과 소스는 기다리지 않는다"
    ],
    reason: "이 요리에 25분을 투자하는 것은 나 자신에게 주는 선물이다. 주말 아침, 스마트폰 없이 이 요리에만 집중하는 시간 — 그것 자체가 이 레시피의 가치다.",
    myTip: "홀랜다이즈가 처음엔 어렵다. 분리되면 새 노른자를 거품기로 치면서 분리된 소스를 조금씩 넣으면 살릴 수 있다. 두 번 실패하면 세 번째엔 완벽해진다."
  }

];

window.mylifeData = mylifeData;
console.log('mylife.js 로드 완료:', mylifeData.length, '개 나의 픽 카드');
