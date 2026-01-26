# Trust Route - Geocoding Scripts

맛집 좌표를 자동으로 추가하는 스크립트입니다.

## 사전 준비

### 1. 네이버 클라우드 플랫폼 API 키 발급

1. [네이버 클라우드 플랫폼](https://www.ncloud.com/product/applicationService/maps) 접속
2. 회원가입 및 로그인
3. **Console > Services > AI·NAVER API > Application 등록**
4. Application 이름 입력 (예: "Trust Route Geocoding")
5. **Maps > Geocoding** 서비스 선택
6. 등록 완료 후 **Client ID**와 **Client Secret** 복사

### 2. Node.js 설치 확인

```bash
node --version  # v18 이상 권장
```

Node.js가 없다면 [nodejs.org](https://nodejs.org/)에서 다운로드

## 사용 방법

### Windows (PowerShell)

```powershell
cd "C:\Users\jdy2\Desktop\KEats (Trust Route)\scripts"

$env:NAVER_CLIENT_ID="your_client_id_here"
$env:NAVER_CLIENT_SECRET="your_client_secret_here"

node add-coordinates.js
```

### Windows (CMD)

```cmd
cd "C:\Users\jdy2\Desktop\KEats (Trust Route)\scripts"

set NAVER_CLIENT_ID=your_client_id_here
set NAVER_CLIENT_SECRET=your_client_secret_here

node add-coordinates.js
```

### Mac/Linux

```bash
cd "/Users/jdy2/Desktop/KEats (Trust Route)/scripts"

NAVER_CLIENT_ID=your_client_id_here \
NAVER_CLIENT_SECRET=your_client_secret_here \
node add-coordinates.js
```

## 작동 방식

1. `data.js`에서 `allRestaurantsRaw` 배열을 읽습니다
2. 각 맛집에 대해 "식당명 + 지역 + 구"로 네이버 Geocoding API 호출
3. 반환된 좌표(lat, lng)를 저장
4. `data.js` 파일을 자동으로 업데이트

## 결과 확인

스크립트 실행 후:

```javascript
// data.js의 allRestaurants에 좌표가 추가됨
{
  id: "rest-001",
  name: "밍글스",
  lat: 37.524815,  // ✅ 추가됨
  lng: 127.044955, // ✅ 추가됨
  mapQuery: "밍글스 서울 강남구"
}
```

## 주의사항

- **API 호출 제한**: 네이버 Maps API는 무료 티어에서 하루 100,000건까지 가능
- **속도 제한**: 초당 10건 요청 (스크립트에 이미 적용됨)
- **실패 처리**: 좌표를 찾지 못한 맛집은 `lat: null, lng: null`로 설정됨
- **백업**: 스크립트 실행 전 `data.js` 파일을 백업하세요

## 트러블슈팅

### API 키 오류
```
❌ Error: NAVER_CLIENT_ID and NAVER_CLIENT_SECRET must be set
```
→ 환경 변수가 제대로 설정되지 않았습니다. 위의 사용 방법 참고

### 401 Unauthorized
```
❌ Error fetching coordinates: API Error: 401
```
→ Client ID나 Secret이 잘못되었습니다. 네이버 클라우드 플랫폼에서 다시 확인

### 429 Too Many Requests
```
❌ Error fetching coordinates: API Error: 429
```
→ API 호출 한도를 초과했습니다. 시간을 두고 다시 시도

## 수동 좌표 추가

스크립트가 실패한 맛집은 수동으로 추가할 수 있습니다:

1. [네이버 지도](https://map.naver.com/)에서 맛집 검색
2. URL에서 좌표 확인: `.../@37.524815,127.044955,...`
3. `data.js`의 `coordinatesMap`에 추가:

```javascript
const coordinatesMap = {
  "밍글스": { lat: 37.524815, lng: 127.044955 },
  "새로운 맛집": { lat: 37.xxx, lng: 127.xxx } // 수동 추가
};
```

## 라이센스

MIT License
