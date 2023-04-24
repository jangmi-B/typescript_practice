// Todo 등록하고 검증
export class TodoItem {
  constructor(
    public category: string,
    public title: string,
    public dueDate: number,
    public isDone: string,
    public changeStatus: string
  ) {}

  //   valid(): boolean {
  //     const year = dueDate.value.slice(0, 4);
  //     const month = dueDate.value.slice(4, 6);
  //     const day = dueDate.value.slice(6, 8);
  //     const date = new Date(`${year}-${month}-${day}`);
  //     // 유효한 날짜인지 확인
  //     // NaN 값은 산술 연산이 정의되지 않은 결과 또는 표현할 수 없는 결과를 도출하면 생성
  //     const isValid =
  //       !isNaN(date.getTime()) &&
  //       date.getFullYear() == Number(year) &&
  //       date.getMonth() + 1 == Number(month) &&
  //       date.getDate() == Number(day);
  //     return isValid;
  //   }
}
