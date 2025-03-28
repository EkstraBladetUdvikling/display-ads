export enum PLACEMENTGROUPNAMES {
  forside = 'eb_forside',
  krimi = 'eb_krimi',
  kup = 'eb_kup',
  noconsent = 'eb_noconsent',
  nyheder = 'eb_nyheder',
  penge = 'eb_penge',
  ros = 'eb_ros',
  sport = 'eb_sport',
  test = 'eb_test',
  underholdning = 'eb_underholdning',
}

export interface IGroupInfo {
  sectionName?: string;
  noConsent?: boolean;
}

export function getGroupName(groupInfo: IGroupInfo): PLACEMENTGROUPNAMES {
  try {
    const { noConsent = false, sectionName = '' } = groupInfo;
    if (noConsent === true) {
      return PLACEMENTGROUPNAMES.noconsent;
    } else {
      if (sectionName in PLACEMENTGROUPNAMES)
        return PLACEMENTGROUPNAMES[sectionName as keyof typeof PLACEMENTGROUPNAMES];
      switch (sectionName) {
        case 'krimi':
          return PLACEMENTGROUPNAMES.krimi;

        case 'biler':
        case 'ferie':
        case 'forbrug':
        case 'haandvaerkeren':
        case 'vin':
          return PLACEMENTGROUPNAMES.kup;

        case 'musik':
        case 'underholdning':
          return PLACEMENTGROUPNAMES.underholdning;

        case 'autogenereret':
        case 'kampreferat':
          return PLACEMENTGROUPNAMES.sport;

        default:
          return PLACEMENTGROUPNAMES.ros;
      }
    }
  } catch (error) {
    window.ebLog({
      component: 'js-admanager',
      label: 'getGroupName',
      level: 'ERROR',
      message: (error as Error).message,
    });
    return PLACEMENTGROUPNAMES.ros;
  }
}
