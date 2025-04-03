interface IUserIdsObjectStandard {
  id: string;
  type: string;
}

interface IExtendedIDs {
  id: string;
  source: string;
}

interface IUserIdsObjectExtended {
  eids: IExtendedIDs[];
  type: 'extendedIDs';
}
