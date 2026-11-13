export interface ProductGuide {
  included: string[];
  specifications: { label: string; value: string }[];
  tools: string[];
  steps: { title: string; text: string }[];
  safetyNotes: string[];
  // Listing images (same set as the Amazon listing), served from /public.
  gallery?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    title: string;
    text: string;
  }[];
  // Photo for each "included" item (800x600), keyed by the item text.
  includedImages?: Record<string, string>;
}

export const productGuides: Record<string, ProductGuide> = {
  dv180: {
    gallery: [
      {
        src: "/images/dv180/push-connect-done.webp",
        title: "Push. Connect. Done.",
        text: "Mount the wall plate once. After that, push the dryer back and the duct connects to the wall on its own, so you never have to reach behind the dryer.",
        alt: "Dryer vent kit installed behind a front-load dryer, duct connected to the magnetic wall plate",
        width: 1024,
        height: 1024,
      },
      {
        src: "/images/dv180/magnetic-connection.webp",
        title: "Magnetic quick-connect",
        text: "The round adapter on the duct lines up with the wall plate and snaps into place, held by magnets.",
        alt: "Magnetic adapter on the foil duct lining up with the stainless wall plate",
        width: 1254,
        height: 1254,
      },
      {
        src: "/images/dv180/easy-cleaning.webp",
        title: "Easy to clean",
        text: "Pull the duct off the wall plate to reach the vent opening and clear lint. Reconnect in seconds, no tools needed.",
        alt: "Duct detached from the wall plate, leaving the vent opening accessible for lint cleaning",
        width: 1254,
        height: 1254,
      },
      {
        src: "/images/dv180/cover-larger-area.webp",
        title: "Flexible 2.6 ft duct",
        text: "The 31.5 in flexible aluminum duct bends to fit tight laundry spaces and different dryer positions.",
        alt: "2.6 ft flexible duct running from the laundry appliances to the wall plate",
        width: 1254,
        height: 1254,
      },
      {
        src: "/images/dv180/dimensions.webp",
        title: "Dimensions",
        text: "4 in diameter duct, 31.5 in long. Square 5.7 in wall plate with a 4.3 in opening.",
        alt: "Product dimensions: 31.5 in x 4 in duct, 5.7 in square wall plate with 4.3 in opening",
        width: 1400,
        height: 1400,
      },
    ],
    includedImages: {
      "Dryer vent adapter x1": "/images/dv180/parts/adapter.webp",
      "Wall assembly x1": "/images/dv180/parts/wall-plate.webp",
      "Vent hose x1": "/images/dv180/parts/hose.webp",
      "Hose clamps x2": "/images/dv180/parts/clamps.webp",
      "Wall anchors x4": "/images/dv180/parts/anchors.webp",
      "Screws x4": "/images/dv180/parts/screws.webp",
    },
    included: [
      "Dryer vent adapter x1",
      "Wall assembly x1",
      "Vent hose x1",
      "Hose clamps x2",
      "Wall anchors x4",
      "Screws x4",
    ],
    specifications: [
      { label: "Vent hose length", value: "31.5 in / 800 mm" },
      { label: "Vent hose diameter", value: "4 in / 102 mm" },
      { label: "Wall assembly face", value: "5.7 in / 146 mm" },
      { label: "Connector opening", value: "4.3 in / 110 mm" },
    ],
    tools: [
      "Tape measure",
      "Pencil",
      "Screwdriver or screw gun",
      "Tin snips",
      "Safety glasses",
      "Gloves",
      "AC voltage sensor",
    ],
    steps: [
      {
        title: "Check the installation path",
        text: "Confirm that the dryer vent path can continue straight behind the dryer or within 1–2 inches of alignment.",
      },
      {
        title: "Prepare the dryer area",
        text: "Unplug the dryer and remove any existing duct system if needed before beginning the installation.",
      },
      {
        title: "Prepare the duct end",
        text: "Cut the end of the duct system approximately flush with the wall surface. Notch and bend if needed for proper fit.",
      },
      {
        title: "Mark the wall assembly position",
        text: "Hold the wall assembly centered around the wall exit point and mark the screw hole locations on the wall.",
      },
      {
        title: "Install anchors if required",
        text: "If the wall assembly is mounted on drywall, install the supplied wall anchors at the marked locations.",
      },
      {
        title: "Secure the wall assembly",
        text: "Drive the supplied screws through the bracket holes and into the wall anchors. If mounting on wood, drive the screws directly into the surface.",
      },
      {
        title: "Attach the hose",
        text: "Use the supplied hose clamps to secure each end of the vent hose to the dryer exhaust port and the dryer vent adapter.",
      },
      {
        title: "Move the dryer into position",
        text: "Plug the dryer back in and carefully push it into position, allowing the magnetic connector to self-align and complete the duct connection.",
      },
      {
        title: "Complete a final inspection",
        text: "Perform a quick visual inspection to confirm proper alignment, sealing, and airflow path before use.",
      },
    ],
    safetyNotes: [
      "Check for live wires with an AC voltage sensor before driving screws into drywall. Wear safety glasses and gloves during installation.",
      "Strong magnets may interfere with electronic devices, magnetic storage media, and certain medical devices.",
      "If you are unsure whether this equipment is suitable for your installation, seek guidance from a qualified professional.",
    ],
  },
};