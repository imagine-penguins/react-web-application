






import moment from "moment";




Date.getFormattedDateDiff = function(date1, date2) {
    let intervals = ['years','months','weeks','days'];
    let subIntervals = ['y','m','w','d'];
    let out = [];
     
    for(let i=0; i<intervals.length; i++){
        let diff = date2.diff(date1, intervals[i]);
        date1.add(diff, intervals[i]);
        // console.log("fiff inside :", diff);
        if (diff){
            out.push(diff + subIntervals[i]);
        }
    }

    // console.log("out :", out);
    return out.join(' ');
};

const dateDiff = (rawDate) => {
    let given = moment(rawDate, "DD-MM-YYYY");
    let current = moment().startOf('day');

    let dateDiff = Date.getFormattedDateDiff(given, current);
    dateDiff = dateDiff ? dateDiff : `0d`;

    // console.log("dateDiff after:", dateDiff);
    return dateDiff;
}

export default dateDiff