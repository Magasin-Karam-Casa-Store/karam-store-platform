/**
 * Brands carried by Karamtech (from the brand carousel on karamtech.ma).
 * Used to infer a product's brand from its title — see src/data/products.ts.
 * Ordered longest-first at match time so "TP-Link" wins over "TP".
 */
export const KNOWN_BRANDS = [
  "Hikvision", "Dahua", "TP-Link", "Mercusys", "Ruijie", "Ubiquiti", "Tenda", "IP-Com", "Cisco",
  "Aerocool", "Logitech", "Microsoft", "Samsung", "Kingston", "SanDisk", "Lexar", "Toshiba",
  "Seagate", "Western Digital", "Silicon Power", "Patriot", "Oscoo",
  "Canon", "Epson", "Brother", "Ricoh", "Sharp", "Konica", "Kyocera", "Lexmark", "Evolis", "Zebra",
  "Lenovo", "Asus", "Acer", "Dell", "Apple", "MSI", "Gigabyte", "Intel", "AMD", "Nvidia", "Zotac", "XFX",
  "Huawei", "Xiaomi", "Motorola", "Panasonic", "Sony", "Philips", "LG", "TCL", "AOC", "ZTE", "Nokia",
  "Razer", "Havit", "Gamdias", "Mars Gaming", "Redragon", "Corsair", "Cooler Master",
  "APC", "Eaton", "Salicru", "Schneider", "Legrand", "Datwyler", "Fellowes", "Rivacase",
  "Imou", "Ezviz", "ZKTeco", "NGTeco", "Teltonika", "Grandstream", "Yealink", "Fanvil",
  "DSPPA", "Promethean", "Ugreen", "Onten", "Awei", "Anker", "Baseus", "Aplus", "Azatech",
  "Fujitsu", "NCR", "Bosch", "Honeywell", "Tiandy", "Uniview", "Hilook", "Nova", "Microcell", "Tapo",
  // Additional vendors observed in the live catalogue.
  "Hiksemi", "Transcend", "Deepcool", "EVGA", "OCPC", "PNY", "Eizo", "Somic", "Afinia", "Aico",
  "Azatech", "Konica Minolta", "Konica", "Ezviz", "Aten", "Vention", "Orico", "Netgear", "D-Link",
  "Trendnet", "Linksys", "Synology", "QNAP", "Crucial", "ADATA", "Lexmark", "OKI", "Xerox",
  "Vertiv", "Socomec", "Emerson", "Legrand", "Nexans", "Belden", "Commscope", "Panduit",
  "Hyundai", "Iiyama", "ViewSonic", "BenQ", "Optoma", "NEC", "JBL", "Bose", "Shure", "Sennheiser",
  "HP",
] as const;

export interface Brand {
  name: string;
  slug: string;
  productCount: number;
}

export function toBrandSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
