

/**
 * input 검증
 * @param {*} input 
 * @param {*} msg 
 * @returns 
 */
 function validInput(input, msg = "Some error 4 input") {
    if (input.value.length === 0) {
        alert(msg)
        return false;
    }
    return true;
}


/**
 * 날짜 
 */
 function getCurrentDate() {
    const date = new Date();
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month.toString() : month.toString();

    let day = date.getDate();
    day = day < 10 ? '0' + day.toString() : day.toString();

    let hour = date.getHours();
    hour = hour < 10 ? '0' + hour.toString() : hour.toString();

    let minites = date.getMinutes();
    minites = minites < 10 ? '0' + minites.toString() : minites.toString();

    let seconds = date.getSeconds();
    seconds = seconds < 10 ? '0' + seconds.toString() : seconds.toString();

    return `${date.getFullYear().toString()}_ ${month}_ ${day}_-${hour}:${minites}:${seconds}` 
}