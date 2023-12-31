export function isEmpty(value: any): boolean {
    return (value == null) || (value == undefined) || (value === '') || (value.hasOwnProperty('length') && value.length === 0) || (value.constructor === Object && Object.keys(value).length === 0);
}