/**
 * Curated Pexels imagery (free Pexels license, hotlink-friendly CDN).
 * Run `node scripts/fetch-images.mjs` to download optimized local copies
 * into /public/images and switch to self-hosted files.
 */
export const pexels = (id: number, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const IMAGES = {
  heroOffice: { src: pexels(12903168), alt: "CompuBlue engineers cooperating in a modern office" },
  aboutTeam: { src: pexels(3184359), alt: "Product team collaborating around laptops in a bright workspace" },
  devTeam: { src: pexels(6804068), alt: "Software developers working at desks with multiple monitors" },
  codeReview: { src: pexels(12899191), alt: "Two engineers discussing software architecture at a screen" },
  teamCode: { src: pexels(12899153), alt: "Development team pair-programming on a shared codebase" },
  programmer: { src: pexels(6805148), alt: "Programmer typing code on a keyboard in an office" },
  analyticsChart: { src: pexels(5833762), alt: "Analyst reviewing performance graphs on a monitor" },
  tabletAnalytics: { src: pexels(36950598), alt: "Business analysis with graphs and charts on a tablet" },
  tradingDesk: { src: pexels(31738798), alt: "Workstation with multiple screens of live data charts" },
  dataCenter: { src: pexels(37730212), alt: "Data center server racks with active network equipment" },
  serverRack: { src: pexels(37605910), alt: "Server rack in a modern cloud data center" },
  engineerLaptop: { src: pexels(1181341), alt: "Software engineer writing code on a laptop" },
  meeting: { src: pexels(7693692), alt: "Business people brainstorming in a strategy meeting" },
  fourPeople: { src: pexels(8204363), alt: "Consultants collaborating in a modern office" },
  womanLaptop: { src: pexels(6779536), alt: "Specialist working on a laptop at a desk" },
  marketing: { src: pexels(34069), alt: "Marketing dashboard on a smartphone beside a notebook" },
  aiRobot: { src: pexels(8386437), alt: "Human hand reaching toward a robotic hand" },
  presentation: { src: pexels(7988758), alt: "Team lead presenting a product roadmap to colleagues" },
} as const;

export type ImageKey = keyof typeof IMAGES;
