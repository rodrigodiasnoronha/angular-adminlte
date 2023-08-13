export const urlEncode = (data: any): string => {
    const params = new URLSearchParams();
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            params.set(key, data[key]);
        }
    }
    return params.toString();
}