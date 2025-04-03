import { type IKeywords, prebidKeywords } from './prebidkeywords';

const deepMerge = (target: IKeywords, source: IKeywords) => {
  for (const key in source) {
    if (source[key]) {
      if (target[key] && Array.isArray(target[key])) {
        target[key] = [...target[key], ...source[key]];
      } else if (target[key] && typeof target[key] === 'object') {
        target[key] = deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
};

export function updateORTBData(keywords: IKeywords) {
  prebidKeywordManager.updateKeywords(keywords);
}

class PrebidKeywordManager {
  private keywordCache: IKeywords = {};
  private queued = false;

  public updateKeywords(keywords: IKeywords) {
    const newKeywords = deepMerge(this.keywordCache, keywords);

    this.keywordCache = newKeywords;

    if (this.queued || !window.lwhb) return;
    this.queued = true;
    window.lwhb.cmd.push(() => {
      const { LWKEYWORDS, LWKEYWORDSOBJECT } = prebidKeywords(this.keywordCache);

      this.queued = false;

      const ortb2Data = {
        site: {
          ext: {
            data: {
              ...LWKEYWORDSOBJECT,
            },
          },
          keywords: LWKEYWORDS,
        },
      };

      const pbjs = window.pbjs;

      if (pbjs && pbjs.getConfig) {
        const ortb2DataFromPB = { ...pbjs.getConfig().ortb2 };

        if (ortb2DataFromPB && ortb2DataFromPB.site && ortb2DataFromPB.site.ext && ortb2DataFromPB.site.ext.data) {
          ortb2Data.site.ext.data = {
            ...ortb2DataFromPB.site.ext.data,
            ...LWKEYWORDSOBJECT,
          };
        }

        if (ortb2DataFromPB && ortb2DataFromPB.site && ortb2DataFromPB.site.keywords) {
          ortb2Data.site.keywords = `${LWKEYWORDS},${ortb2DataFromPB.site.keywords}`;
        }
      }

      window.lwhb.ortb2(ortb2Data);
    });
  }
}

export const prebidKeywordManager = new PrebidKeywordManager();
