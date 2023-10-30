const generatePattern = (size, min, max, trendDirection, maxTrendAdd, maxTrendSteps) => {
    let start = Math.floor(Math.random() * max) + 1; //start at a random percentage of the max value no lower than the min
    start = start < min ? min : start;
    let trendCount = 0;
    const oppositeDirection = trendDirection * -1;
    let maxStepsInOpposite = Math.floor(maxTrendSteps / 2);
    maxStepsInOpposite = maxStepsInOpposite < 1 ? 1 : maxStepsInOpposite;
    //number of steps where it will trend in the specified direction 
    let trendSteps = Math.floor(Math.random() * maxTrendSteps) + 1
    let arr = [];
    arr.push(start);
    let i = 0;
    for (i = 0; i < size; i++) {
        //console.debug(`i=${i}`);
        //console.debug(trendCount);
        let last = arr[i];
        //console.debug(`last: ${last}`);
        if (trendCount <= trendSteps) {
            //generate a trendFactor no larger than the maxTrendFactor to apply to last value as the next
            let addValue = (Math.floor(Math.random() * maxTrendAdd) + 1) * trendDirection;
            let newVal = last + addValue;
            if (newVal >= max || newVal <= min) { //newVal is outside of range
                newVal = newVal > max ? max : min; //set to edge of range
                trendCount = trendSteps;//set steps to go in the opposite direction
            }
            arr.push(isNaN(newVal) ? max : newVal)
            trendCount++
        } else {
            //add a random amount of steps in the opposite direction no larger than maxStepsInOpposite
            let trendOppositeSteps = (Math.floor(Math.random() * maxStepsInOpposite) + 1);
            for (let j = i; j < i + trendOppositeSteps && ((i + j) < size); j++) {
                last = arr[j];
                //console.log(`i nest=${i}`);
                let addValue = (Math.floor(Math.random() * maxTrendAdd) + 1) * oppositeDirection;
                let newVal = last + addValue;
                if (newVal >= max || newVal <= min) { //newVal is outside of range
                    newVal = newVal >= max ? max : min; //set to edge of range it crossed
                    arr.push(newVal) //TODO Find out why its generating NaNs
                    break;
                } else {
                    arr.push(isNaN(newVal) ? min : newVal)
                }

            }
            //reset trendCount
            trendCount = 0;
            //get a new amount of steps
            trendSteps = Math.floor(Math.random() * maxTrendSteps) + 1;
        }
    }
    // const textArea = document.getElementById('txt-output');
    // textArea.value = arr.join('\n');
    return arr;
}


const average = numArray => numArray.reduce((a, b) => a + b) / numArray.length;
const max = numArray => numArray.reduce((a, b) => a > b ? a : b);
const min = numArray => numArray.reduce((a, b) => a < b ? a : b);

const movingAvg = (arr, maxStepsBack) => {
    //console.debug('Calculate moving avg for list: ', arr, maxStepsBack);
    maxStepsBack = maxStepsBack ?? 30;
    if (maxStepsBack < 1) return []; //steps back should be > 0

    let result = [];
    result.push(arr[0]); //first number is always the same
    //console.debug(`average 0 is ${arr[0]}`);
    for (let i = 1; i < arr.length; i++) {
        //sum of numbers preceding arr[i]
        let sum = 0;
        let j = i < maxStepsBack ? 0 : (i - (maxStepsBack - 1));
        let count = 0;
        for (j; j <= i; j++) {
            sum += arr[j];
            count++;
        }
        //get average
        //console.debug(`average[${i}] is ${sum}/${count}`);
        result.push(sum / count);

    }
    //console.debug('result: ', result);
    return result;
}

//parse with a set of common options
const parseCSVStr = async (csvStr) => Papa.parse(csvStr, { header: true, skipEmptyLines: true, dynamicTyping: true });

const parseCSVFromFileObj = async (file) => {
    try {
        const content = await file.text();
        return await parseCSVStr(content);
    } catch (err) {
        return null;
    }
}

const fetchParseCSV = async (url) => {
    try {
        const content = await (await fetch(url)).text();
        return parseCSVStr(content);
    } catch (err) {
        return null;
    }
}
const fetchParseJSON = async (url) => {
    try {
        const content = await (await fetch(url)).text();
        return JSON.parse(content);
    } catch (err) {
        return null;
    }

}
const downloadCSV = (list, fileName, addMilis) => {
    fileName = fileName ?? 'output';
    fileName = addMilis ? `${fileName}_${(new Date()).getTime()}.csv` : `${fileName}.csv`;
    downloadAsFile(fileName, Papa.unparse(list));
}

const downloadAsFile = (filename, text) => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}