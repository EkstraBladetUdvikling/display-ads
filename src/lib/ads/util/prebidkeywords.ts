const ALLOWEDKEYS_LW = ['ekstra_bladet', 'pp_audiences', 'Relevance_Audiences', 'Relevance_Context', 'screen', 'vpa'];

let vpaValue = 'auto';

export interface IKeywords {
  [key: string]: any;
}

export function prebidKeywords(keywordObj: IKeywords) {
  const LWKEYWORDS: string[] = [];
  const LWKEYWORDSOBJECT: { [key: string]: any } = {};

  for (const key in keywordObj) {
    if (keywordObj[key] && ALLOWEDKEYS_LW.includes(key)) {
      if (key === 'vpa') {
        if (vpaValue === 'click') continue;

        vpaValue = keywordObj[key];
      }

      LWKEYWORDSOBJECT[key] = keywordObj[key];
      if (Array.isArray(keywordObj[key])) {
        keywordObj[key].forEach((keyValue: string) => {
          LWKEYWORDS.push(`${key}=${keyValue}`);
        });
      } else {
        LWKEYWORDS.push(`${key}=${keywordObj[key]}`);
      }
    }
  }

  return {
    LWKEYWORDS: LWKEYWORDS.join(','),
    LWKEYWORDSOBJECT,
  };
}
