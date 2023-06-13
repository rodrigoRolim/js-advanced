import StringUtil from "@rodrigorolim/string-utils"

const availableFormats = {
  'dd-mm-yyyy': '$<day>-$<month>-$<year>',
  'yyyy-mm-dd': '$<year>-$<month>-$<day>',
  'dd/mm/yyyy': '$<day>/$<month>/$<year>',
  'yyyy/mm/dd': '$<year>-$<month>-$<day>',
}

const yyyymmdd = /(?<year>\d{4}).(?<month>\d{2}).(?<day>\d{2})/g
const ddmmyyyy = /(?<day>\d{2}).(?<month>\d{2}).(?<year>\d{4})/g

const stringToDateExps = {
  'dd-mm-yyyy': ddmmyyyy,
  'dd/mm/yyyy': ddmmyyyy,
  'yyyy-mm-dd': yyyymmdd,
  'yyyy/mm/dd': yyyymmdd,
}
export default class DateUtil {
  static formatDate(date, format) {
    if (!Object.keys(availableFormats).includes(format)) {
      return {
        error: `The format ${format} in not available yet :(`
      }
    }

    const exp = availableFormats[format]
    const [result] = date.toISOString().match(yyyymmdd)
    return result.replace(yyyymmdd, exp)
  }

  static formatString(dateStr, currentFormat, expectedFormat) {
    if (StringUtil.isEmpty(dateStr)) {
      return { error: 'Your text is empty'}
    }

    if (!Object.keys(availableFormats).includes(currentFormat)) {
      return { error: `the format ${currentFormat} is not available yet :(` }
    }

    if (!Object.keys(availableFormats).includes(expectedFormat)) {
      return { error: `the format ${expectedFormat} is not available yet :(` }
    }

    const toDateExp = stringToDateExps[currentFormat]
    const dateStrInISO = StringUtil
      .removeEmptySpaces(dateStr)
      .replace(toDateExp, '$<year>-$<month>-$<day>')
    const finalDate = new Date(dateStrInISO)
    
    return this.formatDate(finalDate, expectedFormat)
  }
}