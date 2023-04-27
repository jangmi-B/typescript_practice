// Todo 등록하고 검증
export class TodoItem {
    constructor(category, title, dueDate, isDone, changeStatus) {
        this.category = category;
        this.title = title;
        this.dueDate = dueDate;
        this.isDone = isDone;
        this.changeStatus = changeStatus;
    }
    // 출력포멧
    format() {
        return `[${this.category}] ${this.title} (~${this.dueDate})`;
    }
    // 완료일 검증
    isFinished(targetDate) {
        let isFinished = true;
        let strTargetDate = String(targetDate);
        const year = strTargetDate.slice(0, 4);
        const month = strTargetDate.slice(4, 6);
        const day = strTargetDate.slice(6, 8);
        const date = new Date(`${year}-${month}-${day}`);
        const today = new Date();
        date.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        if (date < today) {
            isFinished = false;
        }
        return isFinished;
    }
    // 내용 비어있는지 검증
    isEmpty(content) {
        return content === "" ? true : false;
    }
    // 날짜 유효성검사
    isValid(dueDate) {
        const year = dueDate.value.slice(0, 4);
        const month = dueDate.value.slice(4, 6);
        const day = dueDate.value.slice(6, 8);
        const date = new Date(`${year}-${month}-${day}`);
        let isNum = /^\d{8}$/.test(dueDate.value);
        // yyyyMMdd형식의 8자리 입력인지 확인
        if (!isNum) {
            dueDate.focus();
            alert("yyyyMMdd 형식의 날짜를 입력해주세요.");
            return isNum;
        }
        // 유효한 날짜인지 확인
        let isValid = !isNaN(date.getTime()) &&
            date.getFullYear() == Number(year) &&
            date.getMonth() + 1 == Number(month) &&
            date.getDate() == Number(day);
        if (!isValid) {
            alert("유효하지 않은 날짜입니다. 다시 입력해주세요");
            return isValid;
        }
        // 마감일 검증
        if (!this.isFinished(dueDate.valueAsNumber)) {
            alert("마감일은 오늘날짜보다 빠를 수 없습니다.");
            isValid = false;
        }
        return isValid;
    }
}
