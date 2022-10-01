//콤마찍기
export const comma = (str) => {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

//콤마풀기
export const uncomma = (str) => {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

// 가격단위로 만들기
export const parseCurrency = (value) => {  
    return comma(uncomma(value).replace(/[^0-9:\,]/gi, ""))
}

export const parseOnlyNumber = (value) => {
    return value.replace(/,/g, "");
}