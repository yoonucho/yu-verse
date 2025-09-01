import { test, expect } from "@playwright/test";

test.describe("yu-books 검색 기능", () => {
  test("사용자가 책을 검색하고 결과를 볼 수 있어야 함", async ({ page }) => {
    // 1. yu-books 홈페이지로 이동
    await page.goto("http://127.0.0.1:3000/");

    // 디버깅: 페이지 스크린샷
    await page.screenshot({ path: "debug-homepage.png" });

    // 2. 페이지 제목이 올바른지 확인
    await expect(page).toHaveTitle(/YU책찾기 페이지/);

    // 3. 검색 입력 필드를 찾아 '해리포터'를 입력
    const searchInput = page.getByPlaceholder("검색어를 입력하세요");
    await expect(searchInput).toBeVisible();
    await searchInput.fill("해리포터");
    await searchInput.press("Enter");

    // 디버깅: 검색 후 스크린샷
    await page.screenshot({ path: "debug-after-search.png" });

    // 4. URL이 검색 쿼리를 반영하는지 확인
    await expect(page).toHaveURL(/.*query=.*/);

    // 5. 결과 목록에 검색어가 포함되어 있는지 확인
    const bookListContainer = page.locator("main");
    await expect(bookListContainer).toContainText("해리포터");
  });

  test("검색 결과가 없는 경우를 처리해야 함", async ({ page }) => {
    await page.goto("http://127.0.0.1:3000/");
    const searchInput = page.getByPlaceholder("검색어를 입력하세요");
    await expect(searchInput).toBeVisible();
    await searchInput.fill("nonexistentbook123");
    await searchInput.press("Enter");
    await expect(page).toHaveURL(/.*query=.*/);
    const bookListContainer = page.locator("main");
    await expect(bookListContainer).toContainText("검색 결과가 없습니다");
  });

  test("부분 일치 검색을 허용해야 함", async ({ page }) => {
    await page.goto("http://127.0.0.1:3000/");
    const searchInput = page.getByPlaceholder("검색어를 입력하세요");
    await expect(searchInput).toBeVisible();
    await searchInput.fill("해리");
    await searchInput.press("Enter");
    await expect(page).toHaveURL(/.*query=.*/);
    const bookListContainer = page.locator("main");
    await expect(bookListContainer).toContainText("해리포터");
  });

  test("입력 필드가 지워지면 검색 결과를 초기화해야 함", async ({ page }) => {
    await page.goto("http://127.0.0.1:3000/");
    const searchInput = page.getByPlaceholder("검색어를 입력하세요");
    await expect(searchInput).toBeVisible();
    await searchInput.fill("해리포터");
    await searchInput.press("Enter");
    await expect(page).toHaveURL(/.*query=.*/);
    await searchInput.clear();
    await searchInput.press("Enter");
    await expect(page).toHaveURL(/^http:\/\/127\.0\.0\.1:3000\/$/);
    const bookListContainer = page.locator("main");
    await expect(bookListContainer).not.toContainText("해리포터");
  });

  test("특수 문자가 포함된 검색을 처리해야 함", async ({ page }) => {
    await page.goto("http://127.0.0.1:3000/");
    const searchInput = page.getByPlaceholder("검색어를 입력하세요");
    await expect(searchInput).toBeVisible();
    await searchInput.fill("해리포터 & 친구들");
    await searchInput.press("Enter");
    await expect(page).toHaveURL(/.*query=.*/);
    const bookListContainer = page.locator("main");
    await expect(bookListContainer).toContainText("해리포터");
  });

  test("일반적인 검색어로 여러 결과를 표시해야 함", async ({ page }) => {
    await page.goto("http://127.0.0.1:3000/");
    const searchInput = page.getByPlaceholder("검색어를 입력하세요");
    await expect(searchInput).toBeVisible();
    await searchInput.fill("소설");
    await searchInput.press("Enter");

    // 디버깅: 검색 후 스크린샷
    await page.screenshot({ path: "debug-common-search.png" });

    await expect(page).toHaveURL(/.*query=.*/);
    const bookListContainer = page.locator("main");
    const results = bookListContainer.locator("li");

    // 디버깅: 결과 개수 출력
    const count = await results.count();
    console.log(`결과 개수: ${count}`);

    await expect(count).toBeGreaterThan(1);
  });
});
