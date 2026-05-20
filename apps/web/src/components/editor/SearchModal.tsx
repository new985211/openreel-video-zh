import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";
import {
  Search,
  X,
  Video,
  Music2,
  Type,
  Palette,
  Wand2,
  Layers,
  Zap,
  Square,
  Move,
  Focus,
  Clock,
  Eye,
  Sliders,
} from "lucide-react";
import { Dialog, DialogContent, Input } from "@openreel/ui";
import { useUIStore } from "../../stores/ui-store";

interface SearchItem {
  id: string;
  nameKey: string;
  catKey: string;
  keywords: string[];
  icon: React.ElementType;
  descKey: string;
  sectionId: string;
  clipTypes: Array<"video" | "audio" | "text" | "shape" | "image">;
}

const SEARCHABLE_EFFECTS: SearchItem[] = [
  {
    id: "transform",
    nameKey: "search.effectItems.transform",
    catKey: "search.categories.positionSize",
    keywords: ["position", "scale", "rotate", "move", "resize", "transform"],
    icon: Move,
    descKey: "search.effectItems.transformDesc",
    sectionId: "transform",
    clipTypes: ["video", "image", "text", "shape"],
  },
  {
    id: "crop",
    nameKey: "search.effectItems.crop",
    catKey: "search.categories.positionSize",
    keywords: ["crop", "cut", "trim", "frame", "aspect"],
    icon: Focus,
    descKey: "search.effectItems.cropDesc",
    sectionId: "crop",
    clipTypes: ["video", "image"],
  },
  {
    id: "speed",
    nameKey: "search.effectItems.speedControl",
    catKey: "search.categories.time",
    keywords: ["speed", "slow", "fast", "time", "duration", "playback"],
    icon: Clock,
    descKey: "search.effectItems.speedControlDesc",
    sectionId: "speed",
    clipTypes: ["video", "audio"],
  },
  {
    id: "video-effects",
    nameKey: "search.effectItems.videoEffects",
    catKey: "search.categories.video",
    keywords: [
      "brightness",
      "contrast",
      "saturation",
      "blur",
      "sharpen",
      "vignette",
      "effects",
    ],
    icon: Sliders,
    descKey: "search.effectItems.videoEffectsDesc",
    sectionId: "video-effects",
    clipTypes: ["video", "image"],
  },
  {
    id: "color-grading",
    nameKey: "search.effectItems.colorGrading",
    catKey: "search.categories.color",
    keywords: [
      "color",
      "grade",
      "wheels",
      "curves",
      "lut",
      "hsl",
      "exposure",
      "temperature",
    ],
    icon: Palette,
    descKey: "search.effectItems.colorGradingDesc",
    sectionId: "color-grading",
    clipTypes: ["video", "image"],
  },
  {
    id: "green-screen",
    nameKey: "search.effectItems.greenScreen",
    catKey: "search.categories.video",
    keywords: ["green", "screen", "chroma", "key", "background", "remove"],
    icon: Eye,
    descKey: "search.effectItems.greenScreenDesc",
    sectionId: "green-screen",
    clipTypes: ["video", "image"],
  },
  {
    id: "background-removal",
    nameKey: "search.effectItems.backgroundRemoval",
    catKey: "search.categories.video",
    keywords: ["background", "remove", "ai", "mask", "cutout", "person"],
    icon: Wand2,
    descKey: "search.effectItems.backgroundRemovalDesc",
    sectionId: "background-removal",
    clipTypes: ["video", "image"],
  },
  {
    id: "masking",
    nameKey: "search.effectItems.masking",
    catKey: "search.categories.effects",
    keywords: ["mask", "shape", "feather", "reveal", "hide", "vignette"],
    icon: Layers,
    descKey: "search.effectItems.maskingDesc",
    sectionId: "masking",
    clipTypes: ["video", "image"],
  },
  {
    id: "motion-tracking",
    nameKey: "search.effectItems.motionTracking",
    catKey: "search.categories.video",
    keywords: ["motion", "track", "follow", "pin", "stabilize"],
    icon: Move,
    descKey: "search.effectItems.motionTrackingDesc",
    sectionId: "motion-tracking",
    clipTypes: ["video"],
  },
  {
    id: "pip",
    nameKey: "search.effectItems.pictureInPicture",
    catKey: "search.categories.video",
    keywords: ["pip", "picture", "overlay", "corner", "position"],
    icon: Square,
    descKey: "search.effectItems.pictureInPictureDesc",
    sectionId: "pip",
    clipTypes: ["video", "image"],
  },
  {
    id: "blending",
    nameKey: "search.effectItems.blendMode",
    catKey: "search.categories.video",
    keywords: ["blend", "mode", "multiply", "screen", "overlay", "opacity"],
    icon: Layers,
    descKey: "search.effectItems.blendModeDesc",
    sectionId: "blending",
    clipTypes: ["video", "image"],
  },
  {
    id: "transform-3d",
    nameKey: "search.effectItems.3dTransform",
    catKey: "search.categories.video",
    keywords: ["3d", "perspective", "rotate", "flip", "tilt"],
    icon: Move,
    descKey: "search.effectItems.3dTransformDesc",
    sectionId: "transform-3d",
    clipTypes: ["video", "image"],
  },
  {
    id: "keyframes",
    nameKey: "search.effectItems.keyframes",
    catKey: "search.categories.animation",
    keywords: ["keyframe", "animate", "animation", "ease", "interpolate"],
    icon: Zap,
    descKey: "search.effectItems.keyframesDesc",
    sectionId: "keyframes",
    clipTypes: ["video", "image", "text", "shape"],
  },
  {
    id: "transitions",
    nameKey: "search.effectItems.transitions",
    catKey: "search.categories.animation",
    keywords: ["transition", "fade", "dissolve", "wipe", "slide"],
    icon: Zap,
    descKey: "search.effectItems.transitionsDesc",
    sectionId: "transitions",
    clipTypes: ["video", "image"],
  },
  {
    id: "motion-presets",
    nameKey: "search.effectItems.motionPresets",
    catKey: "search.categories.animation",
    keywords: ["motion", "preset", "zoom", "pan", "shake", "bounce"],
    icon: Zap,
    descKey: "search.effectItems.motionPresetsDesc",
    sectionId: "motion-presets",
    clipTypes: ["video", "image"],
  },
  {
    id: "audio-effects",
    nameKey: "search.effectItems.audioEffects",
    catKey: "search.categories.audio",
    keywords: [
      "audio",
      "eq",
      "equalizer",
      "compressor",
      "reverb",
      "delay",
      "sound",
    ],
    icon: Music2,
    descKey: "search.effectItems.audioEffectsDesc",
    sectionId: "audio-effects",
    clipTypes: ["audio", "video"],
  },
  {
    id: "audio-ducking",
    nameKey: "search.effectItems.audioDucking",
    catKey: "search.categories.audio",
    keywords: ["duck", "ducking", "voice", "music", "fade", "auto"],
    icon: Music2,
    descKey: "search.effectItems.audioDuckingDesc",
    sectionId: "audio-ducking",
    clipTypes: ["audio", "video"],
  },
  {
    id: "text-properties",
    nameKey: "search.effectItems.textProperties",
    catKey: "search.categories.textGraphics",
    keywords: ["text", "font", "size", "color", "style", "typography"],
    icon: Type,
    descKey: "search.effectItems.textPropertiesDesc",
    sectionId: "text-properties",
    clipTypes: ["text"],
  },
  {
    id: "text-animation",
    nameKey: "search.effectItems.textAnimation",
    catKey: "search.categories.textGraphics",
    keywords: ["text", "animate", "typewriter", "fade", "slide", "bounce"],
    icon: Type,
    descKey: "search.effectItems.textAnimationDesc",
    sectionId: "text-animation",
    clipTypes: ["text"],
  },
  {
    id: "shape-properties",
    nameKey: "search.effectItems.shapeProperties",
    catKey: "search.categories.shapes",
    keywords: ["shape", "fill", "stroke", "corner", "radius", "shadow"],
    icon: Square,
    descKey: "search.effectItems.shapePropertiesDesc",
    sectionId: "shape-properties",
    clipTypes: ["shape"],
  },
];

const CATEGORIES = [
  { id: "all", labelKey: "common.all" },
  { id: "video", labelKey: "search.categories.video", icon: Video },
  { id: "audio", labelKey: "search.categories.audio", icon: Music2 },
  { id: "text", labelKey: "search.categories.textGraphics", icon: Type },
  { id: "animation", labelKey: "search.categories.animation", icon: Zap },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const { selectedItems, setPanelVisible } = useUIStore();

  const selectedClipType = useMemo(() => {
    const clipItem = selectedItems.find(
      (item) =>
        item.type === "clip" ||
        item.type === "text-clip" ||
        item.type === "shape-clip",
    );
    if (!clipItem) return null;
    if (clipItem.type === "text-clip") return "text";
    if (clipItem.type === "shape-clip") return "shape";
    return "video";
  }, [selectedItems]);

  const filteredEffects = useMemo(() => {
    let effects = SEARCHABLE_EFFECTS;

    if (selectedClipType) {
      effects = effects.filter((e) =>
        e.clipTypes.includes(
          selectedClipType as "video" | "audio" | "text" | "shape" | "image",
        ),
      );
    }

    if (selectedCategory !== "all") {
      effects = effects.filter((e) =>
        e.catKey.toLowerCase().includes(selectedCategory.toLowerCase()),
      );
    }

    if (query.trim()) {
      const searchTerms = query.toLowerCase().split(" ");
      effects = effects.filter((e) => {
        const searchText = e.keywords.join(" ").toLowerCase();
        return searchTerms.every((term) => searchText.includes(term));
      });
    }

    return effects;
  }, [query, selectedCategory, selectedClipType]);

  const handleSelect = useCallback(
    (effect: SearchItem) => {
      setPanelVisible("inspector", true);

      setTimeout(() => {
        const sectionElement = document.querySelector(
          `[data-section-id="${effect.sectionId}"]`,
        );
        if (sectionElement) {
          sectionElement.scrollIntoView({ behavior: "smooth", block: "start" });

          const button = sectionElement.querySelector("button");
          if (button) {
            button.click();
          }

          sectionElement.classList.add(
            "ring-2",
            "ring-primary",
            "ring-offset-2",
          );
          setTimeout(() => {
            sectionElement.classList.remove(
              "ring-2",
              "ring-primary",
              "ring-offset-2",
            );
          }, 2000);
        }
      }, 100);

      onClose();
    },
    [onClose, setPanelVisible],
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedCategory]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          Math.min(prev + 1, filteredEffects.length - 1),
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && filteredEffects[selectedIndex]) {
        e.preventDefault();
        handleSelect(filteredEffects[selectedIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, filteredEffects, selectedIndex, handleSelect]);

  useEffect(() => {
    if (listRef.current && filteredEffects[selectedIndex]) {
      const selectedEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (selectedEl) {
        selectedEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [selectedIndex, filteredEffects]);

  if (!isOpen) return null;

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl p-0 gap-0 top-[15vh] translate-y-0 bg-background-secondary border-border rounded-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search size={18} className="text-text-muted" />
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              selectedClipType
                ? t('search.searchForClip', { clipType: selectedClipType })
                : t('search.searchAll')
            }
            className="flex-1 bg-transparent border-0 text-text-primary focus-visible:ring-0"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded hover:bg-background-tertiary text-text-muted hover:text-text-primary transition-colors"
            >
              <X size={14} />
            </button>
          )}
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-background-tertiary border border-border">
            <span className="text-[10px] text-text-muted">ESC</span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-background-tertiary/50">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-primary text-white"
                  : "text-text-secondary hover:text-text-primary hover:bg-background-elevated"
              }`}
            >
              {t(cat.labelKey)}
            </button>
          ))}
        </div>

        <div ref={listRef} className="max-h-[50vh] overflow-y-auto">
          {filteredEffects.length === 0 ? (
            <div className="py-12 text-center">
              <Search
                size={32}
                className="mx-auto mb-3 text-text-muted opacity-50"
              />
              <p className="text-sm text-text-muted">{t('search.noEffectsFound')}</p>
              <p className="text-xs text-text-muted mt-1">
                {t('search.noResultsHint')}
              </p>
            </div>
          ) : (
            <div className="py-2">
              {filteredEffects.map((effect, index) => {
                const Icon = effect.icon;
                return (
                  <button
                    key={effect.id}
                    onClick={() => handleSelect(effect)}
                    className={`w-full flex items-center gap-4 px-4 py-3 text-left transition-all ${
                      index === selectedIndex
                        ? "bg-primary/10 border-l-2 border-primary"
                        : "hover:bg-background-tertiary border-l-2 border-transparent"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        index === selectedIndex
                          ? "bg-primary text-white"
                          : "bg-background-tertiary text-text-secondary"
                      }`}
                    >
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-medium ${
                            index === selectedIndex
                              ? "text-primary"
                              : "text-text-primary"
                          }`}
                        >
                          {t(effect.nameKey)}
                        </span>
                        <span className="text-[10px] text-text-muted px-1.5 py-0.5 rounded bg-background-tertiary">
                          {t(effect.catKey)}
                        </span>
                      </div>
                      <p className="text-xs text-text-muted mt-0.5 truncate">
                        {t(effect.descKey)}
                      </p>
                    </div>
                    <div className="text-[10px] text-text-muted">
                      {t('search.pressEnter')}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="px-4 py-2 border-t border-border bg-background-tertiary/50 flex items-center justify-between">
          <div className="text-[10px] text-text-muted">
            {t('search.effectsAvailable', { count: filteredEffects.length })}
          </div>
          <div className="flex items-center gap-3 text-[10px] text-text-muted">
            <span>{t('search.navigate')}</span>
            <span>{t('search.select')}</span>
            <span>{t('search.escClose')}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
