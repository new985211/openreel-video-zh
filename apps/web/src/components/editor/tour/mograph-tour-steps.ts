export interface MoGraphTourStep {
  id: string;
  target: string | null;
  titleKey: string;
  descKey: string;
  tipKeys?: string[];
  position: "center" | "top" | "bottom" | "left" | "right";
  action?: "highlight" | "demo";
}

export const MOGRAPH_TOUR_STEPS: MoGraphTourStep[] = [
  {
    id: "intro",
    target: null,
    titleKey: "tour.mographTour.intro",
    descKey: "tour.mographTour.introDesc",
    position: "center",
  },
  {
    id: "keyframes-inspector",
    target: "[data-tour='inspector']",
    titleKey: "tour.mographTour.keyframesInspector",
    descKey: "tour.mographTour.keyframesInspectorDesc",
    tipKeys: [
      "tour.mographTour.keyframesInspectorT1",
      "tour.mographTour.keyframesInspectorT2",
      "tour.mographTour.keyframesInspectorT3",
    ],
    position: "left",
  },
  {
    id: "keyframes-timeline",
    target: "[data-tour='timeline']",
    titleKey: "tour.mographTour.keyframesTimeline",
    descKey: "tour.mographTour.keyframesTimelineDesc",
    tipKeys: [
      "tour.mographTour.keyframesTimelineT1",
      "tour.mographTour.keyframesTimelineT2",
      "tour.mographTour.keyframesTimelineT3",
    ],
    position: "top",
  },
  {
    id: "keyframe-editor",
    target: "[data-tour='toolbar']",
    titleKey: "tour.mographTour.keyframeEditorPanel",
    descKey: "tour.mographTour.keyframeEditorPanelDesc",
    tipKeys: [
      "tour.mographTour.keyframeEditorPanelT1",
      "tour.mographTour.keyframeEditorPanelT2",
      "tour.mographTour.keyframeEditorPanelT3",
    ],
    position: "bottom",
  },
  {
    id: "motion-path",
    target: "[data-tour='preview']",
    titleKey: "tour.mographTour.motionPath",
    descKey: "tour.mographTour.motionPathDesc",
    tipKeys: [
      "tour.mographTour.motionPathT1",
      "tour.mographTour.motionPathT2",
      "tour.mographTour.motionPathT3",
      "tour.mographTour.motionPathT4",
    ],
    position: "left",
  },
  {
    id: "particle-effects",
    target: "[data-tour='inspector']",
    titleKey: "tour.mographTour.particleEffects",
    descKey: "tour.mographTour.particleEffectsDesc",
    tipKeys: [
      "tour.mographTour.particleEffectsT1",
      "tour.mographTour.particleEffectsT2",
      "tour.mographTour.particleEffectsT3",
      "tour.mographTour.particleEffectsT4",
    ],
    position: "left",
  },
  {
    id: "emphasis-animations",
    target: "[data-tour='inspector']",
    titleKey: "tour.mographTour.emphasisAnimations",
    descKey: "tour.mographTour.emphasisAnimationsDesc",
    tipKeys: [
      "tour.mographTour.emphasisAnimationsT1",
      "tour.mographTour.emphasisAnimationsT2",
      "tour.mographTour.emphasisAnimationsT3",
    ],
    position: "left",
  },
  {
    id: "text-animations",
    target: "[data-tour='inspector']",
    titleKey: "tour.mographTour.textAnimations",
    descKey: "tour.mographTour.textAnimationsDesc",
    tipKeys: [
      "tour.mographTour.textAnimationsT1",
      "tour.mographTour.textAnimationsT2",
      "tour.mographTour.textAnimationsT3",
    ],
    position: "left",
  },
  {
    id: "complete",
    target: null,
    titleKey: "tour.mographTour.complete",
    descKey: "tour.mographTour.completeDesc",
    tipKeys: [
      "tour.mographTour.completeT1",
      "tour.mographTour.completeT2",
      "tour.mographTour.completeT3",
    ],
    position: "center",
  },
];

export const MOGRAPH_TOUR_KEY = "openreel-mograph-tour-complete";
