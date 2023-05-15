const newBtn = document.querySelector('.newBtn');
const buttonList = document.querySelector('.button-list');

newBtn.addEventListener('click', function () {
    const mainContents = document.querySelector('.mainContents');

    const memoContent = mainContents.value;

    const lines = memoContent.split('\n');
    const firstLine = lines[0];
    const secondLine = lines.length > 1 ? lines[1] : lines[0];

    const currentDate = new Date();

    const currentDateTime = currentDate.toLocaleDateString();

    const newLi = document.createElement('li');

    newLi.innerHTML = `
    <div class="btnTitle">${firstLine}</div>
    <div class="timePreview">
      <div class="btnTime">${currentDateTime}</div>
      <div class="btnPreview">${secondLine}</div>
    </div>
  `;

    buttonList.appendChild(newLi);

    mainContents.value = '';
});

// 내일 할 것
// 1. HTML 기존 데이터 삭제
// 2. 데이터 삭제 버튼 구현
// 3. 빈 데이터 있을 경우 데이터 추가 불가
// 4. 데이터들을 배열에 저장