/**
 * Promo panel shown on the right of each mega menu, per the design system.
 * Keyed by the top-level category slug in the live taxonomy.
 */
export interface NavPromo {
  title: string;
  gradient: string;
}

export const navPromos: Record<string, NavPromo> = {
  informatique: {
    title: "Postes de travail prêts à déployer",
    gradient: "linear-gradient(160deg,#1a8fe3,#0b5fa5)",
  },
  securite: {
    title: "Kits vidéosurveillance installés",
    gradient: "linear-gradient(160deg,#5cb85c,#227a3d)",
  },
  imageetsonorisation: {
    title: "Salles de réunion équipées",
    gradient: "linear-gradient(160deg,#2b3646,#0d1b2a)",
  },
  telephonieetauto: {
    title: "Smartphones pro & IP phones",
    gradient: "linear-gradient(160deg,#0f9d58,#0b6b3d)",
  },
  bureautiqueetfourniture: {
    title: "Équipez tout le bureau",
    gradient: "linear-gradient(160deg,#5b4bd6,#2f2394)",
  },
  solaire: {
    title: "Kits autonomes prêts à poser",
    gradient: "linear-gradient(160deg,#f5a623,#c4700a)",
  },
};

/** Fallback so a category without an entry still renders a sensible panel. */
export const defaultPromo: NavPromo = {
  title: "Découvrir toute la sélection",
  gradient: "linear-gradient(160deg,#1a8fe3,#0b5fa5)",
};
