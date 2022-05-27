
export class SearchParams {
    pageSize: number;
    pageIndex: number;
    filter: string;
    sort: string;
    expands: string;

    constructor() {
        this.pageSize = 10;
        this.pageIndex = 0;
        this.filter = '';
        this.sort = '';
        this.expands = '';
    }

    stringify(): string {
        let str = '?';
        const splitingChar = '&';
        Object.entries(this).forEach(([key, value]) => {
            str = value !== '' && value !== "{}" ? str + (`${key.toString()}=${value}${splitingChar}`) : str;
        });
        return str[str.length - 1] === splitingChar ? str.substr(0, str.length - 1) : str;
    }
}
