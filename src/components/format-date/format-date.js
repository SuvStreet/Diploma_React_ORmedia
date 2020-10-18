export const FormatData = (date) => {
    //console.log("###: date", date);
    let newDate = new Date(date);
    let month = new Array(12);
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "Aug";
    month[8] = "Sept";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    return `${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}
     ${month[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()} `;
}