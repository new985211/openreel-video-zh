import React from "react";
import { useTranslation } from "react-i18next";
import {
  Copy,
  Layers,
  Trash2,
  Scissors,
  Music,
  Sparkles,
  Volume2,
  Film,
  Image,
} from "lucide-react";
import type { Clip, Track } from "@openreel/core";
import { useProjectStore } from "../../../stores/project-store";
import { useTimelineStore } from "../../../stores/timeline-store";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuLabel,
} from "@openreel/ui";

interface ClipContextMenuProps {
  clip: Clip;
  track: Track;
  onClose?: () => void;
}

export const ClipContextMenu: React.FC<ClipContextMenuProps> = ({
  clip,
  track,
  onClose,
}) => {
  const { t } = useTranslation();
  const {
    copyClips,
    duplicateClip,
    removeClip,
    rippleDeleteClip,
    splitClip,
    separateAudio,
    getMediaItem,
    copyEffects,
    pasteEffects,
    copiedEffects,
  } = useProjectStore();
  const { playheadPosition } = useTimelineStore();

  const isPlayheadOnClip =
    playheadPosition >= clip.startTime &&
    playheadPosition <= clip.startTime + clip.duration;

  const mediaItem = getMediaItem(clip.mediaId);
  const isVideo = track.type === "video";
  const isAudio = track.type === "audio";
  const isImage = track.type === "image";
  const isVideoWithAudio =
    isVideo &&
    mediaItem?.type === "video" &&
    mediaItem?.metadata?.channels &&
    mediaItem.metadata.channels > 0;

  const hasEffects = clip.effects && clip.effects.length > 0;
  const hasCopiedEffects = copiedEffects && copiedEffects.length > 0;

  const handleCopy = () => {
    copyClips([clip.id]);
    onClose?.();
  };

  const handleDuplicate = async () => {
    await duplicateClip(clip.id);
    onClose?.();
  };

  const handleDelete = async () => {
    await removeClip(clip.id);
    onClose?.();
  };

  const handleRippleDelete = async () => {
    await rippleDeleteClip(clip.id);
    onClose?.();
  };

  const handleSplit = async () => {
    if (isPlayheadOnClip) {
      await splitClip(clip.id, playheadPosition);
    }
    onClose?.();
  };

  const handleSeparateAudio = async () => {
    await separateAudio(clip.id);
    onClose?.();
  };

  const handleCopyEffects = () => {
    copyEffects(clip.id);
    onClose?.();
  };

  const handlePasteEffects = async () => {
    await pasteEffects(clip.id);
    onClose?.();
  };

  const getClipTypeLabel = () => {
    if (isVideo) return t('clipContext.videoClip');
    if (isAudio) return t('clipContext.audioClip');
    if (isImage) return t('clipContext.imageClip');
    return "Clip";
  };

  const getClipTypeIcon = () => {
    if (isVideo) return <Film className="mr-2 h-3 w-3 text-primary" />;
    if (isAudio) return <Volume2 className="mr-2 h-3 w-3 text-blue-400" />;
    if (isImage) return <Image className="mr-2 h-3 w-3 text-purple-400" />;
    return null;
  };

  return (
    <ContextMenuContent className="min-w-[220px]">
      <ContextMenuLabel className="flex items-center text-[10px] text-text-muted">
        {getClipTypeIcon()}
        {getClipTypeLabel()}
      </ContextMenuLabel>
      <ContextMenuSeparator />

      <ContextMenuItem onClick={handleCopy}>
        <Copy className="mr-2 h-4 w-4" />
        {t('clipContext.copyClip')}
        <ContextMenuShortcut>⌘C</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem onClick={handleDuplicate}>
        <Layers className="mr-2 h-4 w-4" />
        {t('clipContext.duplicateToNewTrack')}
        <ContextMenuShortcut>⌘D</ContextMenuShortcut>
      </ContextMenuItem>

      <ContextMenuSeparator />

      <ContextMenuItem onClick={handleSplit} disabled={!isPlayheadOnClip}>
        <Scissors className="mr-2 h-4 w-4" />
        {t('clipContext.splitAtPlayhead')}
        <ContextMenuShortcut>S</ContextMenuShortcut>
      </ContextMenuItem>

      {(isVideo || isImage) && (
        <>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <Sparkles className="mr-2 h-4 w-4" />
              {t('clipContext.effects')}
            </ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem onClick={handleCopyEffects} disabled={!hasEffects}>
                {t('clipContext.copyEffects')}
              </ContextMenuItem>
              <ContextMenuItem onClick={handlePasteEffects} disabled={!hasCopiedEffects}>
                {t('clipContext.pasteEffects')}
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </>
      )}

      {isVideoWithAudio && (
        <>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={handleSeparateAudio}>
            <Music className="mr-2 h-4 w-4" />
            {t('clipContext.separateAudio')}
          </ContextMenuItem>
        </>
      )}

      {isAudio && (
        <>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <Volume2 className="mr-2 h-4 w-4" />
              {t('clipContext.audio')}
            </ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem onClick={handleCopyEffects} disabled={!hasEffects}>
                {t('clipContext.copyAudioEffects')}
              </ContextMenuItem>
              <ContextMenuItem onClick={handlePasteEffects} disabled={!hasCopiedEffects}>
                {t('clipContext.pasteAudioEffects')}
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </>
      )}

      <ContextMenuSeparator />
      <ContextMenuItem onClick={handleRippleDelete} className="text-red-400">
        <Trash2 className="mr-2 h-4 w-4" />
        {t('clipContext.rippleDelete')}
        <ContextMenuShortcut>⌫</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem onClick={handleDelete} className="text-red-400">
        <Trash2 className="mr-2 h-4 w-4" />
        {t('clipContext.delete')}
      </ContextMenuItem>
    </ContextMenuContent>
  );
};
