# Display Ads (sveltekit)

Giver mulighed for at håndtere annoncer i Ekstra Bladet familien

Dette er afhængig af @ekstra-bladet/eb-cmp

## Getting started

```
yarn add @ekstra-bladet/display-ads
```

### Indsæt AdInit.svelte

```
<script lang="ts">
  import AdInit from '$lib/AdInit.svelte';
</script>

<AdInit />
```

AdInit forudsætter at der på _page.data_ objektet findes et _displayAds_ objekt med følgende interface

```
{
  adNamiEnabled?: boolean;
  anonIds?: {
    base: string;
    adform: string;
    google: string;
  };
  articleId?: string;
  adPlacements: IAdmanagerBanners[];
  device: DEVICE;
  highImpactEnabled?: boolean;
  keywords?: IKeywords;
  livewrappedKey: string;
  lwReplaceValues?: string[];
  pageContext: PAGETYPES;
  prebidEidsAllowed?: boolean;
  premium?: boolean;
  reloadOnBack?: boolean;
  segments?: string[];
  test?: boolean;
  topscroll?: boolean;
  topscrollWeekCount?: number;
  userType?: string;
}
```

#### adNamiEnabled (optionel)

For at denne skal kunne starte og køre skal strukturen fra `static/adnami/adnm.html` kopieres til sveltekit projektet.
Det vil få adnami annoncer til at kunne køre på sitet.

#### anonIds

Annonymiserede ID'er til brug i annonce netværket. For at adform og google versionen af ID'erne skal have den rigtige værdi skal de igennem _createAnonIds_

```
import { createAnonIds } from '@ekstra-bladet/display-ads';

createAnonIds(eksisterendeId: string, receiver: 'adform' | 'google' | string);
```

#### articleId (optionel)

Artiklens id, såfremt man er på en artikel

#### adPlacements: IAdmanagerBanners[];

Annonce placeringer, struktureret som de er fra Admanager. Det anbefales at hente dem vha Admanager api'et

#### device: DEVICE;

desktop | tablet | smartphone

Bruges til at beslutte hvilke bannere der skal renderes

#### highImpactEnabled?: boolean;

Indsætter High Impacts script og muliggør mere eksklusive annonceformater gennem deres setup.

#### keywords?: [keywordKategori: string]: keyword(s);

Objekt der bruges til at sende kontekst til annoncenetværket, kunne eksempelvis være artikel tags.

#### livewrappedKey: string;

Konto ID hos livewrapped

#### lwReplaceValues?: [toBeReplaced, toBeReplacedWith];

Håndterer at replace dele af GAM navnet, så det kommer til at passe med hvad LiveWrapped forventer

#### pageContext: PAGETYPES;

ARTICLE | FRONTPAGE | SECTION

Bruges til at beslutte hvilke bannere der skal renderes

#### prebidEidsAllowed?: boolean;

Må der sendes bruger id'er til livewrapped/prebid annoncører - her sendes _anonIds.adform_

#### premium?: boolean;

Er den givne side betalt. Eksempelvis en plus artikel

#### reloadOnBack?: boolean;

Skulle man blive ramt af Back/Forward Cache, så refreshes annoncerne

#### segments?: string[];

Segmenter

#### test?: boolean;

Er vi på test miljø

#### topscroll?: boolean;

Er Topscroll annonceformatet tilladt.

#### topscrollWeekCount?: number;

Sættes som standard til 7 - hvilket betyder hver dag.

#### userType?: string;

anonymous | registered | customer

Sendes som key/value til annonce netværket
