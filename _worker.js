/**
 * Cloudflare Pages Worker - 동적 렌더링 for SEO
 *
 * 검색 엔진 크롤러에게는 pre-rendered HTML을 제공하고,
 * 일반 사용자에게는 정적 SPA를 제공합니다.
 */

// 검색 엔진 봇 감지
const SEARCH_ENGINE_BOTS = [
  'googlebot',
  'bingbot',
  'slurp', // Yahoo
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'sogou',
  'exabot',
  'facebot', // Facebook
  'ia_archiver', // Alexa
  'twitterbot',
  'linkedinbot',
  'kakaotalk-scrap',
  'naverbot'
];

// 맛집 데이터 (간소화된 버전 - 실제로는 KV에서 가져올 수 있음)
const RESTAURANTS_META = {
  'rest-001': {
    name: '밍글스',
    description: '미쉐린 2스타 이노베이티브 레스토랑. 대표 메뉴: 멸치 국수와 전복',
    location: '서울 강남구',
    category: '이노베이티브',
    image: 'https://kpopeats.cc/og-image.jpg'
  },
  'rest-002': {
    name: '옥동식',
    description: '미쉐린 빕 구르망 돼지국밥 맛집. 대표 메뉴: 돼지곰탕',
    location: '서울 마포구',
    category: '돼지국밥',
    image: 'https://kpopeats.cc/og-image.jpg'
  }
  // ... 나머지 맛집은 동적으로 추가 가능
};

// HTML 템플릿 생성
function generatePrerenderedHTML(url, userAgent) {
  const urlObj = new URL(url);
  const hash = urlObj.hash.replace('#', '');

  // 기본 메타 태그
  let title = 'Trust Route - 신뢰할 수 있는 맛집 정보';
  let description = '미쉐린, 유명인 추천, 흑백요리사 맛집을 한곳에서. 검증된 정보만 제공합니다.';
  let image = 'https://kpopeats.cc/og-image.jpg';
  let canonicalUrl = 'https://kpopeats.cc';

  // 상세 페이지인 경우
  if (hash.startsWith('detail-')) {
    const restaurantId = hash.replace('detail-', '');
    const restaurant = RESTAURANTS_META[restaurantId];

    if (restaurant) {
      title = `${restaurant.name} - Trust Route`;
      description = restaurant.description;
      image = restaurant.image;
      canonicalUrl = `https://kpopeats.cc/#detail-${restaurantId}`;
    }
  }
  // 리스트 페이지
  else if (hash === 'list') {
    title = '전체 맛집 리스트 - Trust Route';
    description = '미쉐린 가이드, 유명인 추천, 흑백요리사 출연 셰프의 맛집 85곳 이상. 모든 정보는 공식 출처 기반으로 검증되었습니다.';
  }
  // FAQ
  else if (hash === 'faq') {
    title = '자주 묻는 질문 - Trust Route';
    description = '신뢰 검증 기준, 정보 수집 방법, 업데이트 주기 등 Trust Route에 대한 모든 궁금증을 해결합니다.';
  }

  // Pre-rendered HTML
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary Meta Tags -->
  <title>${title}</title>
  <meta name="title" content="${title}">
  <meta name="description" content="${description}">
  <meta name="keywords" content="맛집, 미쉐린, 흑백요리사, 유명인 맛집, 서울 맛집, 검증된 맛집">

  <!-- Canonical URL -->
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${image}">
  <meta property="og:site_name" content="Trust Route">
  <meta property="og:locale" content="ko_KR">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${canonicalUrl}">
  <meta property="twitter:title" content="${title}">
  <meta property="twitter:description" content="${description}">
  <meta property="twitter:image" content="${image}">

  <!-- KakaoTalk -->
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">

  <!-- Naver -->
  <meta name="naver-site-verification" content="">

  <!-- Google -->
  <meta name="google-site-verification" content="">

  <!-- Robots -->
  <meta name="robots" content="index, follow">
  <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large">

  <!-- Structured Data (JSON-LD) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Trust Route",
    "url": "https://kpopeats.cc",
    "description": "${description}",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://kpopeats.cc/#list?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
  </script>

  <!-- Stylesheets -->
  <link rel="stylesheet" href="/style.css">

  <!-- Preconnect -->
  <link rel="preconnect" href="https://djmadubptsajvdvzpdvd.supabase.co">
  <link rel="preconnect" href="https://fonts.googleapis.com">

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/favicon.png">

  <!-- Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-NT8PV02XX4"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-NT8PV02XX4');
  </script>

  <!-- Microsoft Clarity -->
  <script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "v30gcak7fj");
  </script>
</head>
<body>
  <!-- This content is for search engines only -->
  <noscript>
    <h1>${title}</h1>
    <p>${description}</p>
    <p>이 사이트를 제대로 이용하려면 JavaScript를 활성화해주세요.</p>
  </noscript>

  <!-- SPA will be loaded here -->
  <div id="app"></div>

  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="/config.js"></script>
  <script src="/auth.js"></script>
  <script src="/comments.js"></script>
  <script src="/data.js"></script>
  <script src="/main.js"></script>

  <!-- SEO hint for crawlers -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "홈",
      "item": "https://kpopeats.cc"
    }]
  }
  </script>
</body>
</html>`;
}

// Worker 메인 함수
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const userAgent = (request.headers.get('User-Agent') || '').toLowerCase();

    // 봇 감지
    const isBot = SEARCH_ENGINE_BOTS.some(bot => userAgent.includes(bot));

    // 봇인 경우 pre-rendered HTML 반환
    if (isBot) {
      const html = generatePrerenderedHTML(url.toString(), userAgent);

      return new Response(html, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600', // 1시간 캐시
          'X-Robots-Tag': 'index, follow',
          'X-Rendered-By': 'Cloudflare-Worker'
        }
      });
    }

    // 일반 사용자는 정적 파일 제공 (Cloudflare Pages 기본 동작)
    return env.ASSETS.fetch(request);
  }
};
