export interface ProductGuide {
  included: string[];
  specifications: { label: string; value: string }[];
  tools: string[];
  steps: { title: string; text: string }[];
  safetyNotes: string[];
}

export const productGuides: Record<string, ProductGuide> = {
  dv180: {
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