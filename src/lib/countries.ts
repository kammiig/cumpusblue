/**
 * Country dialling data for the international phone field.
 *
 * Generated list of ISO 3166-1 alpha-2 codes with their E.164 country calling
 * codes and English display names. Flags are derived from the ISO code as
 * Unicode regional-indicator pairs, so no flag images or icon fonts are needed.
 *
 * `minLen`/`maxLen` bound the national significant number (the digits after
 * the country code). They are present only where the numbering plan is
 * well-defined enough to check; elsewhere the generic E.164 bounds apply.
 */

export type Country = {
  /** ISO 3166-1 alpha-2 code, e.g. "US". */
  iso2: string;
  /** E.164 country calling code, digits only and without "+", e.g. "1". */
  dial: string;
  /** English display name. */
  name: string;
  /** Min digits in the national significant number, when known. */
  minLen?: number;
  /** Max digits in the national significant number, when known. */
  maxLen?: number;
};

/** Default country for the phone field. */
export const DEFAULT_COUNTRY = "US";

/** Generic E.164 limits: the whole number (country code + national) is <= 15. */
export const E164_MAX_DIGITS = 15;
const GENERIC_MIN_NATIONAL = 4;

type Row = [iso2: string, dial: string, name: string, minLen?: number, maxLen?: number];

const ROWS: Row[] = [
  ["AF", "93", "Afghanistan"],
  ["AX", "358", "Åland Islands"],
  ["AL", "355", "Albania"],
  ["DZ", "213", "Algeria"],
  ["AS", "1", "American Samoa", 10, 10],
  ["AD", "376", "Andorra"],
  ["AO", "244", "Angola"],
  ["AI", "1", "Anguilla", 10, 10],
  ["AG", "1", "Antigua & Barbuda", 10, 10],
  ["AR", "54", "Argentina", 10, 11],
  ["AM", "374", "Armenia"],
  ["AW", "297", "Aruba"],
  ["AU", "61", "Australia", 9, 9],
  ["AT", "43", "Austria", 6, 13],
  ["AZ", "994", "Azerbaijan"],
  ["BS", "1", "Bahamas", 10, 10],
  ["BH", "973", "Bahrain"],
  ["BD", "880", "Bangladesh", 10, 10],
  ["BB", "1", "Barbados", 10, 10],
  ["BY", "375", "Belarus"],
  ["BE", "32", "Belgium", 8, 9],
  ["BZ", "501", "Belize"],
  ["BJ", "229", "Benin"],
  ["BM", "1", "Bermuda", 10, 10],
  ["BT", "975", "Bhutan"],
  ["BO", "591", "Bolivia"],
  ["BA", "387", "Bosnia & Herzegovina"],
  ["BW", "267", "Botswana"],
  ["BR", "55", "Brazil", 10, 11],
  ["IO", "246", "British Indian Ocean Territory"],
  ["VG", "1", "British Virgin Islands", 10, 10],
  ["BN", "673", "Brunei"],
  ["BG", "359", "Bulgaria"],
  ["BF", "226", "Burkina Faso"],
  ["BI", "257", "Burundi"],
  ["KH", "855", "Cambodia"],
  ["CM", "237", "Cameroon"],
  ["CA", "1", "Canada", 10, 10],
  ["CV", "238", "Cape Verde"],
  ["BQ", "599", "Caribbean Netherlands"],
  ["KY", "1", "Cayman Islands", 10, 10],
  ["CF", "236", "Central African Republic"],
  ["TD", "235", "Chad"],
  ["CL", "56", "Chile", 8, 9],
  ["CN", "86", "China", 5, 12],
  ["CX", "61", "Christmas Island"],
  ["CO", "57", "Colombia", 8, 10],
  ["KM", "269", "Comoros"],
  ["CG", "242", "Congo - Brazzaville"],
  ["CD", "243", "Congo - Kinshasa"],
  ["CK", "682", "Cook Islands"],
  ["CR", "506", "Costa Rica"],
  ["CI", "225", "Côte d’Ivoire"],
  ["HR", "385", "Croatia"],
  ["CU", "53", "Cuba"],
  ["CW", "599", "Curaçao"],
  ["CY", "357", "Cyprus"],
  ["CZ", "420", "Czechia", 9, 9],
  ["DK", "45", "Denmark", 8, 8],
  ["DJ", "253", "Djibouti"],
  ["DM", "1", "Dominica", 10, 10],
  ["DO", "1", "Dominican Republic", 10, 10],
  ["EC", "593", "Ecuador"],
  ["EG", "20", "Egypt", 9, 10],
  ["SV", "503", "El Salvador"],
  ["GQ", "240", "Equatorial Guinea"],
  ["ER", "291", "Eritrea"],
  ["EE", "372", "Estonia"],
  ["SZ", "268", "Eswatini"],
  ["ET", "251", "Ethiopia"],
  ["FK", "500", "Falkland Islands"],
  ["FO", "298", "Faroe Islands"],
  ["FJ", "679", "Fiji"],
  ["FI", "358", "Finland", 5, 12],
  ["FR", "33", "France", 9, 9],
  ["GF", "594", "French Guiana"],
  ["PF", "689", "French Polynesia"],
  ["GA", "241", "Gabon"],
  ["GM", "220", "Gambia"],
  ["GE", "995", "Georgia"],
  ["DE", "49", "Germany", 6, 11],
  ["GH", "233", "Ghana"],
  ["GI", "350", "Gibraltar"],
  ["GR", "30", "Greece", 10, 10],
  ["GL", "299", "Greenland"],
  ["GD", "1", "Grenada", 10, 10],
  ["GP", "590", "Guadeloupe"],
  ["GU", "1", "Guam", 10, 10],
  ["GT", "502", "Guatemala"],
  ["GG", "44", "Guernsey"],
  ["GN", "224", "Guinea"],
  ["GW", "245", "Guinea-Bissau"],
  ["GY", "592", "Guyana"],
  ["HT", "509", "Haiti"],
  ["HN", "504", "Honduras"],
  ["HK", "852", "Hong Kong SAR China"],
  ["HU", "36", "Hungary", 8, 9],
  ["IS", "354", "Iceland"],
  ["IN", "91", "India", 10, 10],
  ["ID", "62", "Indonesia", 8, 12],
  ["IR", "98", "Iran"],
  ["IQ", "964", "Iraq"],
  ["IE", "353", "Ireland", 7, 9],
  ["IM", "44", "Isle of Man"],
  ["IL", "972", "Israel", 8, 9],
  ["IT", "39", "Italy", 6, 11],
  ["JM", "1", "Jamaica", 10, 10],
  ["JP", "81", "Japan", 9, 10],
  ["JE", "44", "Jersey"],
  ["JO", "962", "Jordan"],
  ["KZ", "7", "Kazakhstan"],
  ["KE", "254", "Kenya", 9, 9],
  ["KI", "686", "Kiribati"],
  ["KW", "965", "Kuwait"],
  ["KG", "996", "Kyrgyzstan"],
  ["LA", "856", "Laos"],
  ["LV", "371", "Latvia"],
  ["LB", "961", "Lebanon"],
  ["LS", "266", "Lesotho"],
  ["LR", "231", "Liberia"],
  ["LY", "218", "Libya"],
  ["LI", "423", "Liechtenstein"],
  ["LT", "370", "Lithuania"],
  ["LU", "352", "Luxembourg"],
  ["MO", "853", "Macao SAR China"],
  ["MG", "261", "Madagascar"],
  ["MW", "265", "Malawi"],
  ["MY", "60", "Malaysia", 7, 10],
  ["MV", "960", "Maldives"],
  ["ML", "223", "Mali"],
  ["MT", "356", "Malta"],
  ["MH", "692", "Marshall Islands"],
  ["MQ", "596", "Martinique"],
  ["MR", "222", "Mauritania"],
  ["MU", "230", "Mauritius"],
  ["YT", "262", "Mayotte"],
  ["MX", "52", "Mexico", 10, 10],
  ["FM", "691", "Micronesia"],
  ["MD", "373", "Moldova"],
  ["MC", "377", "Monaco"],
  ["MN", "976", "Mongolia"],
  ["ME", "382", "Montenegro"],
  ["MS", "1", "Montserrat", 10, 10],
  ["MA", "212", "Morocco"],
  ["MZ", "258", "Mozambique"],
  ["MM", "95", "Myanmar (Burma)"],
  ["NA", "264", "Namibia"],
  ["NR", "674", "Nauru"],
  ["NP", "977", "Nepal"],
  ["NL", "31", "Netherlands", 9, 9],
  ["NC", "687", "New Caledonia"],
  ["NZ", "64", "New Zealand", 8, 10],
  ["NI", "505", "Nicaragua"],
  ["NE", "227", "Niger"],
  ["NG", "234", "Nigeria", 8, 10],
  ["NU", "683", "Niue"],
  ["NF", "672", "Norfolk Island"],
  ["KP", "850", "North Korea"],
  ["MK", "389", "North Macedonia"],
  ["MP", "1", "Northern Mariana Islands", 10, 10],
  ["NO", "47", "Norway", 8, 8],
  ["OM", "968", "Oman"],
  ["PK", "92", "Pakistan", 10, 10],
  ["PW", "680", "Palau"],
  ["PS", "970", "Palestinian Territories"],
  ["PA", "507", "Panama"],
  ["PG", "675", "Papua New Guinea"],
  ["PY", "595", "Paraguay"],
  ["PE", "51", "Peru", 8, 9],
  ["PH", "63", "Philippines", 10, 10],
  ["PL", "48", "Poland", 9, 9],
  ["PT", "351", "Portugal", 9, 9],
  ["PR", "1", "Puerto Rico", 10, 10],
  ["QA", "974", "Qatar"],
  ["RE", "262", "Réunion"],
  ["RO", "40", "Romania", 9, 9],
  ["RU", "7", "Russia", 10, 10],
  ["RW", "250", "Rwanda"],
  ["WS", "685", "Samoa"],
  ["SM", "378", "San Marino"],
  ["ST", "239", "São Tomé & Príncipe"],
  ["SA", "966", "Saudi Arabia", 9, 9],
  ["SN", "221", "Senegal"],
  ["RS", "381", "Serbia"],
  ["SC", "248", "Seychelles"],
  ["SL", "232", "Sierra Leone"],
  ["SG", "65", "Singapore", 8, 8],
  ["SX", "1", "Sint Maarten", 10, 10],
  ["SK", "421", "Slovakia"],
  ["SI", "386", "Slovenia"],
  ["SB", "677", "Solomon Islands"],
  ["SO", "252", "Somalia"],
  ["ZA", "27", "South Africa", 9, 9],
  ["KR", "82", "South Korea", 8, 10],
  ["SS", "211", "South Sudan"],
  ["ES", "34", "Spain", 9, 9],
  ["LK", "94", "Sri Lanka"],
  ["BL", "590", "St. Barthélemy"],
  ["SH", "290", "St. Helena"],
  ["KN", "1", "St. Kitts & Nevis", 10, 10],
  ["LC", "1", "St. Lucia", 10, 10],
  ["MF", "590", "St. Martin"],
  ["PM", "508", "St. Pierre & Miquelon"],
  ["VC", "1", "St. Vincent & Grenadines", 10, 10],
  ["SD", "249", "Sudan"],
  ["SR", "597", "Suriname"],
  ["SJ", "47", "Svalbard & Jan Mayen"],
  ["SE", "46", "Sweden", 7, 9],
  ["CH", "41", "Switzerland", 9, 9],
  ["SY", "963", "Syria"],
  ["TW", "886", "Taiwan"],
  ["TJ", "992", "Tajikistan"],
  ["TZ", "255", "Tanzania"],
  ["TH", "66", "Thailand", 8, 9],
  ["TL", "670", "Timor-Leste"],
  ["TG", "228", "Togo"],
  ["TK", "690", "Tokelau"],
  ["TO", "676", "Tonga"],
  ["TT", "1", "Trinidad & Tobago", 10, 10],
  ["TN", "216", "Tunisia"],
  ["TR", "90", "Türkiye", 10, 10],
  ["TM", "993", "Turkmenistan"],
  ["TC", "1", "Turks & Caicos Islands", 10, 10],
  ["TV", "688", "Tuvalu"],
  ["VI", "1", "U.S. Virgin Islands", 10, 10],
  ["UG", "256", "Uganda"],
  ["UA", "380", "Ukraine", 9, 9],
  ["AE", "971", "United Arab Emirates", 8, 9],
  ["GB", "44", "United Kingdom", 9, 10],
  ["US", "1", "United States", 10, 10],
  ["UY", "598", "Uruguay"],
  ["UZ", "998", "Uzbekistan"],
  ["VU", "678", "Vanuatu"],
  ["VA", "39", "Vatican City"],
  ["VE", "58", "Venezuela"],
  ["VN", "84", "Vietnam", 9, 10],
  ["WF", "681", "Wallis & Futuna"],
  ["EH", "212", "Western Sahara"],
  ["YE", "967", "Yemen"],
  ["ZM", "260", "Zambia"],
  ["ZW", "263", "Zimbabwe"],
];

export const COUNTRIES: Country[] = ROWS.map(([iso2, dial, name, minLen, maxLen]) => ({
  iso2,
  dial,
  name,
  minLen,
  maxLen,
}));

const BY_ISO = new Map(COUNTRIES.map((c) => [c.iso2, c]));

export function getCountry(iso2: string): Country | undefined {
  return BY_ISO.get(iso2.toUpperCase());
}

/** Unicode flag emoji for an ISO 3166-1 alpha-2 code, e.g. "US". */
export function flagEmoji(iso2: string): string {
  return iso2
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .split("")
    .map((ch) => String.fromCodePoint(0x1f1e6 + ch.charCodeAt(0) - 65))
    .join("");
}

/** Strip everything except digits. */
export function digitsOnly(value: string): string {
  return (value || "").replace(/\D/g, "");
}

/**
 * Validate a national significant number against the selected country.
 * Returns null when valid, or a human-readable reason when not.
 */
export function validateNationalNumber(iso2: string, national: string): string | null {
  const country = getCountry(iso2);
  if (!country) return "Please select a country.";
  const digits = digitsOnly(national);
  if (!digits) return "Please enter a phone number.";

  const min = country.minLen ?? GENERIC_MIN_NATIONAL;
  const max = country.maxLen ?? E164_MAX_DIGITS - country.dial.length;

  if (digits.length + country.dial.length > E164_MAX_DIGITS) {
    return "That number is too long.";
  }
  if (digits.length < min) {
    return min === max
      ? `A ${country.name} number needs ${min} digits.`
      : "That number is too short.";
  }
  if (digits.length > max) {
    return min === max
      ? `A ${country.name} number needs ${min} digits.`
      : "That number is too long.";
  }

  // North American Numbering Plan: area code and exchange both start 2-9.
  if (country.dial === "1" && !/^[2-9]\d{2}[2-9]\d{6}$/.test(digits)) {
    return "Please enter a valid phone number.";
  }
  return null;
}

/** Build the full E.164 number, e.g. ("US", "8186628800") -> "+18186628800". */
export function toE164(iso2: string, national: string): string {
  const country = getCountry(iso2);
  const digits = digitsOnly(national);
  if (!country || !digits) return "";
  return `+${country.dial}${digits}`;
}

/**
 * Display formatting while typing. NANP numbers get the familiar
 * "(555) 000-0000" grouping; every other country is left as plain digits,
 * because per-country grouping rules are not modelled here.
 */
export function formatNational(iso2: string, national: string): string {
  const country = getCountry(iso2);
  const digits = digitsOnly(national);
  if (!country || country.dial !== "1") return digits;
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

/**
 * Placeholder hint for the national part of the number. Only NANP numbers get
 * one -- example numbers for other countries are not modelled here, and a
 * made-up string of digits would misrepresent the expected length.
 */
export function nationalPlaceholder(iso2: string): string {
  return getCountry(iso2)?.dial === "1" ? "(555) 000-0000" : "";
}
