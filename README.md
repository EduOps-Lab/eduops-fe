이 프로젝트는 [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)으로 생성된 [Next.js](https://nextjs.org) 프로젝트입니다.

## 시작하기

### 필수 요구사항

- Node.js 20.9.0
- pnpm

### 설치 방법

1. 저장소를 클론하고 의존성을 설치합니다:

```bash
pnpm install
```

2. 환경 변수를 설정합니다:

```bash
cp .env.example .env.local
# .env.local 파일을 열어 실제 값을 입력하세요
# ⚠️ .env.local은 Git에 커밋되지 않습니다 (보안)
```

3. Git hooks를 초기화합니다:

```bash
pnpm run prepare
```

4. 개발 서버를 실행합니다:

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

`app/page.tsx` 파일을 수정하여 페이지를 편집할 수 있습니다. 파일을 편집하면 페이지가 자동으로 업데이트됩니다.

## 기술 스택

- **Framework**: Next.js 16.1.1
- **Language**: TypeScript 5
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS 4
- **Code Quality**: ESLint, Prettier
- **Git Hooks**: Husky, lint-staged, Commitlint

## 사용 가능한 스크립트

- `pnpm run dev` - 개발 서버 실행
- `pnpm run build` - 프로덕션 빌드
- `pnpm run start` - 프로덕션 서버 실행
- `pnpm run lint` - ESLint 실행
- `pnpm run lint:fix` - ESLint 오류 자동 수정
- `pnpm run format` - Prettier로 코드 포맷팅
- `pnpm run format:check` - 코드 포맷 검사
- `pnpm run type-check` - TypeScript 타입 검사
- `pnpm test` - Jest 테스트 실행

## 코드 품질

이 프로젝트는 코드 품질과 포맷팅을 위해 ESLint와 Prettier를 사용합니다. Husky와 lint-staged 덕분에 각 커밋 전에 코드가 자동으로 포맷팅되고 린트됩니다.

### Husky (Git Hooks)

이 프로젝트는 Husky를 사용해 Git 커밋 훅을 관리합니다.
의존성 설치 후 `pnpm run prepare` 스크립트를 통해 Husky 훅이 설정됩니다.

- 커밋 시 커밋 메시지 규칙을 검사합니다 (commitlint)
- 훅 설정은 `.husky/` 디렉토리에 위치합니다

### VS Code (권장)

VS Code를 사용하는 경우, 프로젝트에는 다음을 제공하는 권장 확장 프로그램과 설정이 포함되어 있습니다:

- 저장 시 자동 포맷팅
- 실시간 ESLint 오류 표시
- TypeScript IntelliSense 제공

### 수동 포맷팅

```bash
pnpm run format        # 모든 파일 포맷팅
pnpm run lint:fix      # 린트 오류 수정
```

## Git 워크플로우

### 커밋 메시지 컨벤션

이 프로젝트는 [Conventional Commits](https://www.conventionalcommits.org/) 규격을 따릅니다:

```
<type>: <subject>
```

**타입:**

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 스타일 변경 (포맷팅 등)
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가 또는 변경
- `chore`: 빌드 작업, 패키지 매니저 설정

**예시:**

- `feat: 사용자 인증 기능 추가`
- `fix: 다크모드 토글 문제 해결`
- `docs: README 업데이트`

### Pre-commit Hooks

각 커밋 전에:

- Staged된 파일이 자동으로 린트 및 포맷팅됩니다
- 커밋 메시지가 conventional commits 형식에 맞는지 검증됩니다

커밋이 실패하면 오류를 수정하고 다시 커밋하세요.

## 환경 변수 관리

### 설정 방법

1. `.env.example` 파일을 `.env.local`로 복사합니다:

```bash
cp .env.example .env.local
```

2. `.env.local` 파일을 열어 실제 값을 입력합니다.

3. ⚠️ **중요**: `.env.local`은 Git에 커밋되지 않습니다 (보안).

### 환경 변수 규칙

- **공개 변수** (브라우저에서 접근 가능): `NEXT_PUBLIC_` 접두사 사용
- **비공개 변수** (서버에서만 접근 가능): 접두사 없음

### 프런트엔드 최소 환경 변수 예시

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

### 파일 우선순위 (Frontend 기준)

이 프런트엔드 레포에서는 로컬 개발 시 `.env.local`만 사용합니다.

- `.env.local` (로컬 개발용, Git에 커밋되지 않음)

배포 환경(AWS 등)에서는 플랫폼의 환경 변수 설정을 사용합니다.

## CI/CD

이 프로젝트는 지속적 통합을 위해 GitHub Actions를 사용합니다. `main` 또는 `dev` 브랜치에 푸시하거나 Pull Request를 열 때마다 다음 검사가 자동으로 실행됩니다:

- ESLint 검사
- Prettier 포맷 검증
- TypeScript 타입 검사
- 프로덕션 빌드 테스트

## 배포 개요 (AWS)

이 프로젝트는 Vercel이 아닌 AWS 환경에 배포합니다.
• Frontend (Next.js): AWS에 배포 (SSR/Node 런타임 필요)
• Backend (Express): 별도 저장소/서비스로 AWS에 배포
• 통신 방식: Front → Back API 호출 (도메인/환경변수로 분리)
