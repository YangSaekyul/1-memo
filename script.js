const newBtn = document.querySelector('.newBtn');
const buttonList = document.querySelector('.button-list');
const mainContents = document.querySelector('.mainContents');
const note = document.querySelector('.note');

let isWriting = false;
let selectedMemo = null;

// 새 메모 버튼 클릭 이벤트 처리
newBtn.addEventListener('click', function () {
  if (isWriting) {
    // 작성 중인 메모가 있을 경우 확인 메시지 표시
    if (confirm('작성 중인 메모가 있습니다. 작성을 중단하시겠습니까?')) {
      isWriting = false;
      mainContents.value = '';
      addNewMemo();
    }
  } else {
    addNewMemo();
  }
});

// 메모 목록 클릭 이벤트 처리
buttonList.addEventListener('click', function (event) {
  const target = event.target.closest('li');
  if (target) {
    if (isWriting) {
      // 작성 중인 메모가 있을 경우 확인 메시지 표시
      if (!confirm('작성 중인 메모가 있습니다. 작성을 중단하시겠습니까?')) {
        return;
      }
    }

    // 클릭한 메모의 제목과 미리보기를 메모 입력창에 설정
    const memoTitle = target.querySelector('.btnTitle').textContent;
    const memoPreview = target.querySelector('.btnPreview').textContent;

    mainContents.value = `${memoTitle}\n${memoPreview}`;
    isWriting = true;

    // 이전에 선택된 메모가 있으면 강조 효과를 제거
    if (selectedMemo) {
      selectedMemo.classList.remove('selected');
    }
    // 현재 선택된 메모에 강조 효과를 추가
    target.classList.add('selected');
    selectedMemo = target;
  }
});

// 새 메모 추가 함수
function addNewMemo() {
  const memoContent = mainContents.value;

  // 메모 내용이 빈 상태일 경우 아무 작업도 수행하지 않음
  if (memoContent.trim() === '') {
    return;
  }

  // 메모의 제목과 미리보기 내용 추출
  const lines = memoContent.split('\n');
  const firstLine = lines[0];
  const secondLine = lines.length > 1 ? lines[1] : lines[0];

  // 현재 날짜와 시간을 문자열로 획득
  const currentDateTime = new Date().toLocaleString();

  // 메모 아이템 생성
  createMemoItem(firstLine, secondLine);

  // 메모 입력창 초기화
  mainContents.value = '';
  isWriting = false;
}

// 메모 아이템 생성 함수
function createMemoItem(title, preview) {
  // 현재 날짜와 시간을 문자열로 획득
  const currentDateTime = new Date().toLocaleString();

  // 새로운 메모 아이템 생성
  const newLi = document.createElement('li');
  newLi.innerHTML = `
    <div class="btnTitle">${title}</div>
    <div class="timePreview">
      <div class="btnTime">${currentDateTime}</div>
      <div class="btnPreview">${preview}</div>
      <button class="deleteMemoBtn">🗑️</button>
    </div>
  `;

  // 삭제 버튼 클릭 이벤트 처리
  const deleteBtn = newLi.querySelector('.deleteMemoBtn');
  deleteBtn.addEventListener('click', function () {
    newLi.remove();
  });

  // 메모 목록에 메모 아이템 추가
  buttonList.appendChild(newLi);
}
