<script lang="ts">
	import { getContext } from "svelte";
	import { adsInit } from "./init";


  let {pageContext} = $props();

  const context = $derived(pageContext);
  const consentStatus = getContext('consent') as () => string | boolean;

  $effect(() => {
    console.log('AdInit consentStatus', consentStatus());
    if (consentStatus() !== 'unset') adsInit(consentStatus());
  });

</script>

<!--
<svelte:head>
  <script>
      /** <%--
       * EBCD-16511 . Adnami integration
       --%> */
       window.adsm = window.adsm || {};
      window.adsm.pageSettings = window.adsm.pageSettings || {};
      window.adsm.pageSettings.skinMaxScrollDepth = 2200;

      var adnmEventHandler = (() => {
        var MACRO_UNLOAD = 'ADSM_MACRO_UNLOAD';
        var onMacroUnload = function(){};
        function handler(event) {
          if (event.data && event.data.type && event.data.type === MACRO_UNLOAD){
            onMacroUnload(event.data.payload, event.source);
          }
        }

        window.addEventListener('message', handler, false);
        function connect(type, callback) {
          onMacroUnload = callback;
        }

        return {
          connect: connect
        };
      })();

      adnmEventHandler.connect('ADSM_MACRO_UNLOAD', () => {
        window.jppolWallpaper();
      });

      const isFrontpage = context;

      /** <%--
       * KEYWORD HANDLING
       --%> */
      const ebSegments = window.eb_segments || [];

      window.article_tags = [];
      const keywords = {
        // <%-- Insert keywords here --%>
        'ekstra_bladet_tags': window.article_tags,
        'Relevance_Audiences': ebSegments,
        'Relevance_Context': window.relevance_context,
      };

      /** <%--
       * Handling wallpapers from other sources
       --%> */
      window.jppolWallpaper = function (callFunx) {
        document.getElementById('wallpaperBackground').dataset.wallpaper = true;
        if (window.jppolApn.endStickyMegaboard) window.jppolApn.endStickyMegaboard();
        window.ebComponents.ebBanners.handleHalfPage(true, callFunx, '${ section.uniqueName eq "ece_frontpage" }');
      }
      window.jppolApn = {
        ebSkyskraper: {
          topscroll: function() {
            // only exists for external purposes
          },
          wallpaper: function() {
            window.jppolWallpaper()
          }
        }
      }

      window.addEventListener('high-impact-ad-rendered', () => {
        if (event.detail.template === 'skins') {
          window.jppolWallpaper('skins-ad-loaded');
        }
      });

      // <%-- INSERT SCRIPTS BASED ON CONSENT --%>
      window.ebJS.insertScripts = async function (consent) {
        const disallowedSection = '';

        if (!consent && disallowedSection) return;

        const firstScript = document.querySelector('script');


          const lwScript = document.createElement('script');
          lwScript.src = '//lwgadm.com/lw/pbjs?pid=${ livewrappedKey }';
          if (firstScript && firstScript.parentNode) {
            firstScript.parentNode.insertBefore(lwScript, firstScript);
          }


        const gptScript = document.createElement('script');
        gptScript.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
        if (firstScript && firstScript.parentNode) {
          firstScript.parentNode.insertBefore(gptScript, firstScript);
        }

        const isReady = await window.eb.ready('ebBanners');

        if (isReady) {
          /** <%--
           * Init banners
           --%> */
          const banners = adPlacements;

          window.ebComponents.ebBanners.init({
            articleId: '',
            banners: adPlacements,
            device: '',
            ebSegments,
            highImpactEnabled,
            isFrontpage,
            keywords,
            noConsent: true,
            prebidEidsAllowed: true,
            premium: false,
            relativePath: ,
            reloadOnBack: true,
            test: true,
            topscroll: true,
            topscrollWeekCount: '7',
          });
        }
      }
    })();
  </script>
</svelte:head> -->
