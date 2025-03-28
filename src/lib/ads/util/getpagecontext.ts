import { PAGETYPES } from '../types/admanager';

export function getPageContext(isFrontpage: boolean, articleId: string): PAGETYPES {
  if (isFrontpage) return PAGETYPES.FRONTPAGE;

  if (articleId !== '') return PAGETYPES.ARTICLE;

  return PAGETYPES.SECTION;
}
