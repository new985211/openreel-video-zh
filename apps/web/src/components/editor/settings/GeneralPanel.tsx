import React from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "@openreel/ui";
import { Label } from "@openreel/ui";
import { useSettingsStore, SERVICE_REGISTRY, type TtsProvider, type LlmProvider, type AggregatorProvider } from "../../../stores/settings-store";

export const GeneralPanel: React.FC = () => {
  const { t } = useTranslation();
  const {
    autoSave,
    autoSaveInterval,
    language,
    defaultTtsProvider,
    defaultLlmProvider,
    defaultAggregator,
    configuredServices,
    setAutoSave,
    setAutoSaveInterval,
    setLanguage,
    setDefaultTtsProvider,
    setDefaultLlmProvider,
    setDefaultAggregator,
  } = useSettingsStore();

  const ttsProviders = [
    { id: "piper", label: t('settings.aiProviders.piper') },
    ...SERVICE_REGISTRY.filter(
      (s) => s.id === "elevenlabs" || configuredServices.includes(s.id),
    ),
  ];

  const llmProviders = SERVICE_REGISTRY.filter(
    (s) =>
      s.id === "openai" ||
      s.id === "anthropic" ||
      configuredServices.includes(s.id),
  );

  const aggregatorProviders = SERVICE_REGISTRY.filter(
    (s) =>
      s.id === "kie-ai" ||
      s.id === "freepik" ||
      configuredServices.includes(s.id),
  );

  return (
    <div className="space-y-6 pb-4">
      {/* Auto-save */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-text-primary">{t('settings.autoSave.title')}</h3>

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm text-text-secondary">{t('settings.autoSave.enable')}</Label>
            <p className="text-xs text-text-muted mt-0.5">
              {t('settings.autoSave.description')}
            </p>
          </div>
          <Switch checked={autoSave} onCheckedChange={setAutoSave} />
        </div>

        {autoSave && (
          <div className="flex items-center gap-3">
            <Label className="text-sm text-text-secondary whitespace-nowrap">
              {t('settings.autoSave.saveEvery')}
            </Label>
            <select
              value={autoSaveInterval}
              onChange={(e) => setAutoSaveInterval(Number(e.target.value))}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value={1}>{t('settings.autoSave.intervals.1min')}</option>
              <option value={2}>{t('settings.autoSave.intervals.2min')}</option>
              <option value={5}>{t('settings.autoSave.intervals.5min')}</option>
              <option value={10}>{t('settings.autoSave.intervals.10min')}</option>
              <option value={15}>{t('settings.autoSave.intervals.15min')}</option>
              <option value={30}>{t('settings.autoSave.intervals.30min')}</option>
            </select>
          </div>
        )}
      </div>

      <div className="h-px bg-border" />

      {/* Language */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-text-primary">{t('settings.language.label')}</h3>
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm text-text-secondary">{t('settings.language.label')}</Label>
            <p className="text-xs text-text-muted mt-0.5">
              {t('settings.language.description')}
            </p>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm min-w-[140px]"
          >
            <option value="en">English</option>
            <option value="zh">中文 (Chinese)</option>
          </select>
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Default providers */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-text-primary">
          {t('settings.aiProviders.title')}
        </h3>
        <p className="text-xs text-text-muted">
          {t('settings.aiProviders.description')}
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-text-secondary">
              {t('settings.aiProviders.tts')}
            </Label>
            <select
              value={defaultTtsProvider}
              onChange={(e) => setDefaultTtsProvider(e.target.value as TtsProvider)}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm min-w-[140px]"
            >
              {ttsProviders.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm text-text-secondary">
              {t('settings.aiProviders.llm')}
            </Label>
            <select
              value={defaultLlmProvider}
              onChange={(e) => setDefaultLlmProvider(e.target.value as LlmProvider)}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm min-w-[140px]"
            >
              {llmProviders.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm text-text-secondary">
                {t('settings.aiProviders.aggregator')}
              </Label>
              <p className="text-xs text-text-muted mt-0.5">
                {t('settings.aiProviders.aggregatorDesc')}
              </p>
            </div>
            <select
              value={defaultAggregator}
              onChange={(e) => setDefaultAggregator(e.target.value as AggregatorProvider)}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm min-w-[140px]"
            >
              {aggregatorProviders.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
