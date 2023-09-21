
type IntlNameFormatList = "numeric" | "2-digit" | "long" | "short" | "narrow";

export default function monthNamesList(locale: string = navigator.language, format: IntlNameFormatList = 'long') {
    const applyFormat = new Intl.DateTimeFormat(locale, { month: format }).format;
    return [...Array(12).keys()].map((m) => applyFormat(new Date(2021, m)));
}