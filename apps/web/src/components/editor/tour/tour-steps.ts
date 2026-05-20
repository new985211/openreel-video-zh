export interface TourStep {
  id: string;
  target: string | null;
  titleKey: string;
  descKey: string;
  tipKeys?: string[];
  position: "center" | "top" | "bottom" | "left" | "right";
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: "welcome",
    target: null,
    titleKey: "tour.editorTour.welcome",
    descKey: "tour.editorTour.welcomeDesc",
    position: "center",
  },
  {
    id: "assets",
    target: "[data-tour='assets']",
    titleKey: "tour.editorTour.assets",
    descKey: "tour.editorTour.assetsDesc",
    tipKeys: [
      "tour.editorTour.assetsT1",
      "tour.editorTour.assetsT2",
      "tour.editorTour.assetsT3",
      "tour.editorTour.assetsT4",
    ],
    position: "right",
  },
  {
    id: "timeline",
    target: "[data-tour='timeline']",
    titleKey: "tour.editorTour.timeline",
    descKey: "tour.editorTour.timelineDesc",
    tipKeys: [
      "tour.editorTour.timelineT1",
      "tour.editorTour.timelineT2",
      "tour.editorTour.timelineT3",
    ],
    position: "top",
  },
  {
    id: "preview",
    target: "[data-tour='preview']",
    titleKey: "tour.editorTour.preview",
    descKey: "tour.editorTour.previewDesc",
    tipKeys: [
      "tour.editorTour.previewT1",
      "tour.editorTour.previewT2",
      "tour.editorTour.previewT3",
    ],
    position: "left",
  },
  {
    id: "inspector",
    target: "[data-tour='inspector']",
    titleKey: "tour.editorTour.inspector",
    descKey: "tour.editorTour.inspectorDesc",
    tipKeys: [
      "tour.editorTour.inspectorT1",
      "tour.editorTour.inspectorT2",
      "tour.editorTour.inspectorT3",
    ],
    position: "left",
  },
  {
    id: "complete",
    target: null,
    titleKey: "tour.editorTour.ready",
    descKey: "tour.editorTour.readyDesc",
    position: "center",
  },
];

export const ONBOARDING_KEY = "openreel-onboarding-complete";
