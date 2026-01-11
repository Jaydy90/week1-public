const foodData = {
  seoul: {
    name: "서울특별시",
    foods: [
      { name: "명동교자", desc: "칼국수, 만두 전문점", img: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20220101_206%2F1640974835261tSVzK_JPEG%2Fupload_13d7193a027958564030768b5c68f70c.jpeg" },
      { name: "우래옥", desc: "평양냉면 전문점", img: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20210816_101%2F1629087595562a1W8r_JPEG%2Fupload_b12384a5a544136429538a7c6f015b6c.jpeg" },
      { name: "광장시장", desc: "빈대떡, 마약김밥 등 다양한 길거리 음식", img: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20220219_295%2F1645250493630fxL0K_JPEG%2Fupload_d843a0673322a3199847cf08d1797c67.jpeg" },
    ],
  },
  busan: {
    name: "부산광역시",
    foods: [
      { name: "쌍둥이돼지국밥", desc: "부산의 명물 돼지국밥", img: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20210715_24%2F1626353199739u6sNb_JPEG%2Fupload_0835c1f5436329ed454796324b105a75.jpeg" },
      { name: "해운대기와집대구탕", desc: "시원한 대구탕 전문점", img: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20220119_230%2F1642571765089vBhxL_JPEG%2Fupload_6102a3536831d3039d67b79c3a30386c.jpeg" },
      { name: "이가네떡볶이", desc: "깡통시장의 유명한 떡볶이", img: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20210604_258%2F16227929606117sNZx_JPEG%2Fupload_77b3b32f5d0233633e65925b41d24c88.jpeg" },
    ],
  },
  jeju: {
    name: "제주특별자치도",
    foods: [
      { name: "자매국수", desc: "고기국수 전문점", img: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20210522_277%2F1621665413158zS2lO_JPEG%2Fupload_d2a3f0d619945a05b38a6a68735dfde1.jpeg" },
      { name: "삼성혈해물탕", desc: "신선한 해물이 가득한 해물탕", img: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20211231_206%2F1640954939218d6A6j_JPEG%2Fupload_e446583d8e578c74078174483758b73b.jpeg" },
      { name: "우진해장국", desc: "고사리 육개장, 몸국 전문", img: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20220219_107%2F1645255395535VTPjP_JPEG%2Fupload_8484f90117a7834571d491f699026d39.jpeg" },
    ],
  },
  gyeonggi: {
    name: "경기도",
    foods: [
      { name: "수원갈비 맛집", desc: "정통 수원갈비를 즐길 수 있는 인기 맛집", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80" },
      { name: "파주 장단콩 요리", desc: "지역 특산물로 만든 건강한 한 상", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80" },
    ],
  },
  incheon: {
    name: "인천광역시",
    foods: [
      { name: "차이나타운 짜장면", desc: "인천 차이나타운 대표 메뉴", img: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=600&q=80" },
      { name: "연안부두 해산물", desc: "신선한 해산물을 즐길 수 있는 곳", img: "https://images.unsplash.com/photo-1516685018646-549198525c1b?auto=format&fit=crop&w=600&q=80" },
    ],
  },
  gangwon: {
    name: "강원도",
    foods: [
      { name: "춘천 닭갈비", desc: "철판에 볶아 먹는 강원도 대표 음식", img: "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=600&q=80" },
      { name: "강릉 초당순두부", desc: "담백한 순두부 정식", img: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=600&q=80" },
    ],
  },
  chungnam: {
    name: "충청남도",
    foods: [
      { name: "천안 호두과자", desc: "선물로 인기 높은 지역 간식", img: "https://images.unsplash.com/photo-1542826438-565f32f86d0a?auto=format&fit=crop&w=600&q=80" },
      { name: "서산 간장게장", desc: "짭짤하고 깊은 맛의 간장게장", img: "https://images.unsplash.com/photo-1617196035154-1a4c6bd3d91b?auto=format&fit=crop&w=600&q=80" },
    ],
  },
  chungbuk: {
    name: "충청북도",
    foods: [
      { name: "청주 올갱이국", desc: "깊은 국물 맛이 특징인 향토 음식", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80" },
      { name: "단양 마늘 요리", desc: "지역 특산물 마늘로 만든 요리", img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80" },
    ],
  },
  sejong: {
    name: "세종특별자치시",
    foods: [
      { name: "세종 한식 정식", desc: "깔끔한 구성의 한식 정식 맛집", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80" },
      { name: "세종 카페 거리", desc: "디저트와 커피를 즐기기 좋은 곳", img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=600&q=80" },
    ],
  },
  daejeon: {
    name: "대전광역시",
    foods: [
      { name: "성심당 빵집", desc: "대전 대표 베이커리", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80" },
      { name: "대전 칼국수", desc: "칼국수 거리에서 즐기는 한 그릇", img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80" },
    ],
  },
  gyeongbuk: {
    name: "경상북도",
    foods: [
      { name: "안동찜닭", desc: "짭짤한 양념의 대표 향토 음식", img: "https://images.unsplash.com/photo-1604908554025-e47742b1f17c?auto=format&fit=crop&w=600&q=80" },
      { name: "경주 황남빵", desc: "경주를 대표하는 전통 빵", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80" },
    ],
  },
  daegu: {
    name: "대구광역시",
    foods: [
      { name: "대구 막창", desc: "쫄깃한 식감의 막창구이", img: "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=600&q=80" },
      { name: "납작만두", desc: "대구의 대표 분식", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80" },
    ],
  },
  ulsan: {
    name: "울산광역시",
    foods: [
      { name: "울산 언양불고기", desc: "숯불 향 가득한 불고기", img: "https://images.unsplash.com/photo-1604908554025-e47742b1f17c?auto=format&fit=crop&w=600&q=80" },
      { name: "대왕암 해산물", desc: "바다 전망과 함께 즐기는 해산물", img: "https://images.unsplash.com/photo-1516685018646-549198525c1b?auto=format&fit=crop&w=600&q=80" },
    ],
  },
  gyeongnam: {
    name: "경상남도",
    foods: [
      { name: "통영 충무김밥", desc: "담백한 김밥과 매콤한 반찬", img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80" },
      { name: "진주 냉면", desc: "시원하고 담백한 진주 냉면", img: "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=600&q=80" },
    ],
  },
  jeonnam: {
    name: "전라남도",
    foods: [
      { name: "여수 게장", desc: "간장게장과 양념게장이 인기", img: "https://images.unsplash.com/photo-1617196035154-1a4c6bd3d91b?auto=format&fit=crop&w=600&q=80" },
      { name: "보성 녹차 요리", desc: "녹차를 활용한 건강한 메뉴", img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80" },
    ],
  },
  gwangju: {
    name: "광주광역시",
    foods: [
      { name: "광주 떡갈비", desc: "달콤짭짤한 떡갈비 정식", img: "https://images.unsplash.com/photo-1604908554025-e47742b1f17c?auto=format&fit=crop&w=600&q=80" },
      { name: "무등산 보리밥", desc: "산채와 함께 즐기는 보리밥", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80" },
    ],
  },
  jeonbuk: {
    name: "전라북도",
    foods: [
      { name: "전주 비빔밥", desc: "다채로운 고명과 고소한 맛", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80" },
      { name: "남원 추어탕", desc: "진하고 든든한 추어탕", img: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=600&q=80" },
    ],
  },
};
