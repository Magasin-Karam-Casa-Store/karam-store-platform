const U = "https://karamtech.ma/wp-content/uploads";

export const LOGO_URL = `${U}/2024/03/karamtech.png`;

/**
 * Hero slides exactly as composed on karamtech.ma: a 1440x602 photographic
 * background with a cut-out PNG (logos + product shots) layered on top.
 */
export const heroSlides = [
  {
    background: `${U}/revslider/slider-1/background-1.jpg`,
    overlay: `${U}/revslider/slider-1/111.png`,
  },
  {
    background: `${U}/revslider/slider-1/background2.jpg`,
    overlay: `${U}/revslider/slider-1/slider2.png`,
  },
];

export const heroImages = heroSlides.map((s) => s.background);

export const heroProductCutouts = [
  `${U}/revslider/slider-1/111.png`,
  `${U}/revslider/slider-1/slider2.png`,
];

/**
 * Hero subjects — product shots from the live catalogue.
 *
 * Every entry here was verified to carry a real alpha channel (PNG colour type
 * 4/6 or a tRNS chunk). Many catalogue PNGs are actually opaque RGB and render
 * as a white box over the gradient, so do NOT add a URL without checking it.
 */
export const heroSubjects = {
  cameraBullet: `${U}/2024/03/DAHUA-CAMERA-IP-5M-IPC-HDBW1530S-S6-BULLET_CAMERA-IP_24523_1.png`,
  cameraDome: `${U}/2024/03/DAHUA-CAMERA-IP-2M-DH-IPC-HDW1230T1-A-S5-2.8MM-AUDIO-DOME_CAMERA-IP_24508_1.png`,
  cameraBullet2: `${U}/2024/03/DAHUA-CAMERA-IP-2M-DH-IPC-HFW1230S1-A-S5-AUDIO-BULLET_CAMERA-IP_24510_1.png`,
  laptop: `${U}/2024/12/DELL-latitude-5440-i5-1335U-14FHD-8-Go-512-Go-SSD-Win-11-PRO-36M_PC-Portable-Laptop_39423_1.png`,
  networkSwitch: `${U}/2024/03/RUIJIE-RG-ES209GC-P-COMMUTATEUR-POE-GERE-PAR-LE-CLOUD-INTELLIGENT-GIGABIT-A-9-PORTS_SWITCH_29375_1.png`,
  printer: `${U}/2024/03/HP-IMPRIMANTE-JET-DENCRE-SYSTEME-SMART-TANK-519_IMPRIMANTE-A-RESERVOIRS-RECHARGEABLES_26335_1.png`,
  printerLaser: `${U}/2024/03/HP-IMPRIMANTE-LASERJET-MFP-M236D_IMPRIMANTE-A3_26395_1.png`,
};

/** Large lifestyle banners used by the "Catégories populaires" bento grid. */
export const categoryBanners = {
  informatique: `${U}/2024/03/Informatique.jpg`,
  objetsConnectes: `${U}/2024/03/ObjectsConnectes.jpg`,
  imageEtSon: `${U}/2024/04/ImageEtSon.jpg`,
  securite: `${U}/2024/04/SECURITE.jpg`,
};

/**
 * Editorial photography (Unsplash, free to use) for the category bento tiles.
 * `q=80&w=1200` keeps them sharp without bloating the payload.
 */
const UNSPLASH = "https://images.unsplash.com";
const unsplash = (id: string) => `${UNSPLASH}/${id}?auto=format&fit=crop&q=80&w=1200`;

export const editorialBanners = {
  /** Workstation / laptop on a desk. */
  informatique: unsplash("photo-1517336714731-489689fd1ca8"),
  /** Smart-home / connected device. */
  objetsConnectes: unsplash("photo-1558002038-1055907df827"),
  /** Security camera on a wall. */
  securite: unsplash("photo-1520697830682-bbb6e85e2b0b"),
  /** Studio headphones / audio gear. */
  imageEtSon: unsplash("photo-1505740420928-5e560c06d30e"),
  /** Solar panels. */
  solaire: unsplash("photo-1509391366360-2e959784a276"),
  /** Office / printing. */
  impression: unsplash("photo-1612815154858-60aa4c59eaa6"),
};

/** Service/trust icons shown in the reassurance strip. */
export const serviceIcons = [
  `${U}/2024/03/Icone-1.png`,
  `${U}/2024/03/Icone-2.png`,
  `${U}/2024/03/Icone-3.png`,
  `${U}/2024/03/Icone-4.png`,
];

// Category icon images (real Karamtech icon set), keyed by category path.
export const categoryImages: Record<string, string> = {
  // Top level
  informatique: `${U}/2024/08/ordinateur-150x150.png`,
  impression: `${U}/2024/08/imprimante-1-150x150.png`,
  "bureautique-et-fourniture": `${U}/2024/08/machine-a-compter-150x150.png`,
  securite: `${U}/2024/08/systeme-dalarme-150x150.png`,
  solaire: `${U}/2024/08/energie-150x150.png`,
  telephonie: `${U}/2024/08/telephone-150x150.png`,
  "image-et-sonorisation": `${U}/2024/08/smart-tv-150x150.png`,

  // Informatique > Ordinateurs
  "informatique/ordinateurs/ordinateur-de-bureau": `${U}/2024/08/ordinateur-de-bureau-150x150.png`,
  "informatique/ordinateurs/ordinateur-portable": `${U}/2024/08/ordinateur-portable-150x150.png`,
  "informatique/ordinateurs/workstation": `${U}/2024/08/tour-pc-1-150x150.png`,
  "informatique/ordinateurs/mac": `${U}/2024/08/macbook-pro-150x150.png`,

  // Composants PC
  "informatique/composants-pc/carte-mere": `${U}/2024/08/carte-mere-150x150.png`,
  "informatique/composants-pc/carte-graphique": `${U}/2024/08/carte-graphique-150x150.png`,
  "informatique/composants-pc/processeur": `${U}/2024/08/processeur-150x150.png`,
  "informatique/composants-pc/memoire-ram": `${U}/2024/08/memoire-ram-150x150.png`,
  "informatique/composants-pc/alimentation-pc": `${U}/2024/08/tension-150x150.png`,
  "informatique/composants-pc/boitier-pc": `${U}/2024/08/tour-pc-150x150.png`,
  "informatique/composants-pc/refroidissement": `${U}/2024/09/ventilateur-150x150.png`,

  // Peripheriques
  "informatique/peripheriques/clavier-et-souris": `${U}/2024/08/clavier-et-souris-1-150x150.png`,
  "informatique/peripheriques/clavier-et-souris/clavier-pc": `${U}/2024/08/clavier-150x150.png`,
  "informatique/peripheriques/clavier-et-souris/clavier-pc-portable": `${U}/2024/08/clavier-et-souris-2-150x150.png`,
  "informatique/peripheriques/clavier-et-souris/pack-clavier-souris": `${U}/2024/08/clavier-et-souris-1-150x150.png`,
  "informatique/peripheriques/clavier-et-souris/pave-numerique": `${U}/2024/08/pave-numerique-150x150.png`,
  "informatique/peripheriques/clavier-et-souris/souris-pc": `${U}/2024/08/souris-150x150.png`,
  "informatique/peripheriques/casque-et-micro": `${U}/2024/08/casque-de-musique-150x150.png`,
  "informatique/peripheriques/webcam": `${U}/2024/08/webcam-150x150.png`,
  "informatique/peripheriques/gaming": `${U}/2024/08/jeu-video-150x150.png`,
  "informatique/peripheriques/gaming/fauteuil-gamer": `${U}/2024/08/chaise-de-jeu-150x150.png`,
  "informatique/peripheriques/gaming/manette": `${U}/2024/08/controle-du-jeu-150x150.png`,
  "informatique/peripheriques/gaming/souris-gamer": `${U}/2024/08/souris-1-150x150.png`,
  "informatique/peripheriques/gaming/tapis-de-souris-gamer": `${U}/2024/08/tapis-150x150.png`,
  "informatique/peripheriques/enceinte-pc": `${U}/2024/08/boite-de-haut-parleur-150x150.png`,
  "informatique/peripheriques/chargeur-laptop": `${U}/2024/08/chargeur-usb-150x150.png`,
  "informatique/peripheriques/tablette-graphique": `${U}/2024/08/tablette-graphique-150x150.png`,

  // Reseau
  "informatique/reseau/switch": `${U}/2024/08/commutateur-de-reseau-1-150x150.png`,
  "informatique/reseau/routeur": `${U}/2024/09/routeur-150x150.png`,
  "informatique/reseau/point-acces": `${U}/2024/08/reseau-150x150.png`,
  "informatique/reseau/cablage-reseau": `${U}/2024/08/cable-reseau-150x150.png`,

  // Stockage
  "informatique/stockage/disque-dur": `${U}/2024/08/disque-dur-150x150.png`,
  "informatique/stockage/ssd": `${U}/2024/08/ssd-150x150.png`,
  "informatique/stockage/cle-usb": `${U}/2024/08/cle-usb-150x150.png`,
  "informatique/stockage/nas": `${U}/2024/08/stockage-serveur-150x150.png`,

  "informatique/onduleur-et-protection": `${U}/2024/08/tension-150x150.png`,
  "informatique/logiciels/logiciel-bureautique": `${U}/2024/08/application-150x150.png`,
  "informatique/logiciels/logiciels-de-securite": `${U}/2024/08/securite-150x150.png`,
  "informatique/second-vie": `${U}/2024/08/produit-reconditionne-150x150.png`,

  // Impression
  "impression/imprimante-jet-encre": `${U}/2024/08/jet-dencre-150x150.png`,
  "impression/imprimante-laser": `${U}/2024/08/laser-150x150.png`,
  "impression/imprimante-multifonction": `${U}/2024/08/imprimante-2-150x150.png`,
  "impression/imprimante-reservoir": `${U}/2024/08/imprimante-1-150x150.png`,
  "impression/scanner": `${U}/2024/08/scanner-150x150.png`,
  "impression/photocopieur": `${U}/2024/08/photocopieuse-150x150.png`,
  "impression/consommables/cartouche": `${U}/2024/08/cartouche-150x150.png`,
  "impression/consommables/toner": `${U}/2024/09/toner-150x150.png`,
  "impression/consommables/papier": `${U}/2024/08/papier-150x150.png`,
  "impression/imprimantes-etiquettes": `${U}/2024/08/distributeur-de-tickets-150x150.png`,

  // Bureautique
  "bureautique-et-fourniture/compteuses-de-billets": `${U}/2024/08/machine-a-compter-150x150.png`,

  // Securite
  "securite/videosurveillance": `${U}/2024/08/videosurveillance-150x150.png`,
  "securite/videosurveillance/camera-ip": `${U}/2024/09/camera-ip-150x150.png`,
  "securite/videosurveillance/camera-turbo-hd": `${U}/2024/09/cctv-camera-150x150.png`,
  "securite/videosurveillance/nvr": `${U}/2024/08/dvr-150x150.png`,
  "securite/videosurveillance/dvr": `${U}/2024/09/dvr-2-150x150.png`,
  "securite/videosurveillance/kit-videosurveillance": `${U}/2024/08/camera-de-videosurveillance-3-150x150.png`,
  "securite/controle-acces": `${U}/2024/08/acces-150x150.png`,
  "securite/controle-acces/pointeuse": `${U}/2024/08/empreinte-digitale-150x150.png`,
  "securite/controle-acces/tourniquet": `${U}/2024/08/tourniquet-150x150.png`,
  "securite/controle-acces/videophone": `${U}/2024/08/interphone-150x150.png`,
  "securite/detection-incendie": `${U}/2024/08/detecteur-dincendie-150x150.png`,
  "securite/serrures-intelligentes": `${U}/2024/08/serrure-intelligente-150x150.png`,
  "securite/anti-intrusion": `${U}/2024/08/systeme-dalarme-150x150.png`,

  // Telephonie
  "telephonie/smartphones": `${U}/2024/08/smartphones-150x150.png`,
  "telephonie/talkies-walkies": `${U}/2024/08/talkie-walkie-150x150.png`,
  "telephonie/telephonie-fixe-voip/telephone-ip": `${U}/2024/08/telephone-150x150.png`,
  "telephonie/accessoires-telephonie": `${U}/2024/08/chargeur-de-telephone-150x150.png`,

  // Image et sonorisation
  "image-et-sonorisation/videoprojecteurs": `${U}/2024/08/projecteur-150x150.png`,
  "image-et-sonorisation/ecrans-de-projection": `${U}/2024/08/projection-150x150.png`,
  "image-et-sonorisation/amplis-et-mixeurs": `${U}/2024/08/mixeur-dj-150x150.png`,
  "image-et-sonorisation/microphones": `${U}/2024/08/micro-150x150.png`,
  "image-et-sonorisation/televiseurs": `${U}/2024/08/smart-tv-150x150.png`,
  "image-et-sonorisation/box-android": `${U}/2024/08/android-150x150.png`,
  "image-et-sonorisation/supports-muraux-tv": `${U}/2024/08/telecommande-150x150.png`,
};

// Real brand logo images, keyed by brand name as used in src/data/brands.ts
export const brandLogos: Record<string, string> = {
  Canon: `${U}/2024/08/Canon_logo_vector-1.png`,
  Asus: `${U}/2024/08/AsusTek-black-logo.png`,
  "TP-Link": `${U}/2024/08/TP-LINK.png`,
  Lenovo: `${U}/2024/08/Lenovo-Logo-1.png`,
  Aerocool: `${U}/2024/08/AEROCOOL.svg`,
  HP: `${U}/2024/08/1024px-HP_logo_2012.svg-1.png`,
  Dell: `${U}/2024/08/DELL.png`,
  APC: `${U}/2024/08/APC.webp`,
  Hikvision: `${U}/2024/08/Hikvision-2.png`,
  Dahua: `${U}/2024/08/Dahua-1.png`,
  Epson: `${U}/2024/08/epson-logo-1.png`,
  Brother: `${U}/2024/08/Brother.png`,
  Cisco: `${U}/2024/08/CISCO.png`,
  Logitech: `${U}/2024/08/Logitech_logo.svg.png`,
  Microsoft: `${U}/2024/08/microsoft-1.webp`,
  Samsung: `${U}/2024/08/SAMSUNG.png`,
  Huawei: `${U}/2024/08/Huawei.png`,
  MSI: `${U}/2024/08/Msi.png`,
  Xiaomi: `${U}/2024/08/XIAOMI.png`,
  SanDisk: `${U}/2024/08/SANDISK.png`,
  Eaton: `${U}/2024/08/Eaton.png`,
  LG: `${U}/2024/08/Lg.png`,
  Razer: `${U}/2024/08/RAZER.png`,
  Sony: `${U}/2024/08/SONY.png`,
  Toshiba: `${U}/2024/08/TOSHIBA_Logo.png`,
  Tenda: `${U}/2024/08/TENDA.png`,
  Mercusys: `${U}/2024/08/MERCUSYS.png`,
  Havit: `${U}/2024/08/Havit.webp`,
};

// Real product photos, keyed by product slug (see src/data/products.ts), used to
// override the generated placeholder images for products that match the live catalog.
export const productImages: Record<string, string[]> = {
  "aerocool-mirage-l120-aio-cpu-liquid-cooler": [
    `${U}/2024/03/AEROCOOL-MIRAGE-L120-PROCESSEUR-REFROIDISSEUR-DE-LIQUIDE-TOUT-EN-UN-NOIR-1-PIECES_WATERCOOLING_23754_1-430x430.webp`,
  ],
  "evolis-primacy-2-imprimante-de-cartes-duplex": [
    `${U}/2024/03/EVOLIS-IMPRIMANTE-BADGE-PRIMACY-2-DUPLEX_IMPRIMANTES-DE-CARTES-OU-DE-BADGES_25471_1-430x430.webp`,
  ],
  "microsoft-office-2021-licence-boite": [
    `${U}/2024/03/MICROSOFT-OFFICE-2016-LICENCE-CODE_BUREAUTIQUE_28663_1-430x430.webp`,
  ],
  "havit-kb540cm-pack-clavier-souris-filaire": [
    `${U}/2024/03/HAVIT-CLAVIER-SOURIS-SF-KB540CM_PACK-CLAVIER-SOURIS_25758_1-430x430.webp`,
  ],
  "brother-dk-11204-etiquettes-rouleau": [
    `${U}/2024/03/BROTHER-DK-11204-ETIQUETTES-POLYVALENTES-COMPATIBLE-WITH-QL-SERIE-700800_ETIQUETTE-ADHESIVE_24896_1-430x430.webp`,
  ],
  "microsoft-windows-11-pro-licence-1-poste": [
    `${U}/2025/07/MICROSOFT-WINDOWS-11-PRO-1-LICENCES_Systeme-dExploitation_28678_1-1-430x430.webp`,
  ],
  "amd-ryzen-3-3200g-mpk-tray-cpu": [
    `${U}/2024/03/AMD-PROCESSEUR-RYZEN-3-3200G-MPK-TRAYFAN_PROCESSEUR_23806_1-430x430.webp`,
  ],
  "cisco-cbw140ac-point-dacces-poe": [
    `${U}/2024/03/CISCO-CBW140AC-867MBITS-BLANC-CONNEXION-ETHERNET-SUPPORTANT-LALIMENTATION-VIA-CE-PORT-POE_POINT-DACCES-PLAFONNIER-CEILING-MOUNT-AP_24310_1-430x430.webp`,
  ],
  "logitech-k120-wired-keyboard-usb-azerty-french-black": [
    `${U}/2024/03/Logitech-K120-Corded-Keyboard-clavier-USB-AZERTY-Francais-Noir_CLAVIER-ET-SOURIS_33003_1-430x430.webp`,
    `${U}/2024/03/Logitech-K120-Corded-Keyboard-clavier-USB-AZERTY-Francais-Noir_CLAVIER-ET-SOURIS_33003_1-1-430x430.webp`,
  ],
  "logitech-c270-webcam-hd-720p": [
    `${U}/2024/03/LOGITECH-C270-WEBCAM_WEBCAM_28458_1-430x430.webp`,
    `${U}/2024/03/LOGITECH-C270-WEBCAM_WEBCAM_28458_1-1-430x430.webp`,
  ],
  "kaspersky-total-security-3-postes-1-an": [
    `${U}/2024/03/KASPERSKY-SMALL-OFFICE-10-POSTES-10-MOBILE-2-SERVEUR_LOGICIELS-DE-SECURITE_28196_1-430x430.webp`,
  ],
  "logitech-mk120-pack-clavier-et-souris-usb": [
    `${U}/2024/03/LOGITECH-WIRELESS-COMBO-MK270-CLAVIER-SOURIS-INCLUSE-USB-AZERTY-FRANCAIS-NOIR_PACK-CLAVIER-SOURIS_28484_1-430x430.webp`,
  ],
  "hp-pro-290-g9-desktop-i5-13500-8gb-ddr4-512gb-ssd": [
    `${U}/2025/05/HP-Pro-TOWER-290-G9-I5-13500-8Go-DDR4-512Go-SSD-P22vG5-FreeDOS_PC-Bureau-Complet_40704_1-430x430.webp`,
  ],
};
