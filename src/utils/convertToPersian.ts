
  export function convertToPersian(number: number) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return number.toString().replace(/\d/g, (x: string) => persianDigits[parseInt(x)]);
}
