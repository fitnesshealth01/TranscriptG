import { BlogArticle } from "./articles/types";
import { article01_howTranscriptGWorks } from "./articles/article01_howTranscriptGWorks";
import { article02_transcriptionTips } from "./articles/article02_transcriptionTips";
import { article03_srtVsVtt } from "./articles/article03_srtVsVtt";
import { article04_meetingSummarizer } from "./articles/article04_meetingSummarizer";
import { article05_audioFormatsCodecs } from "./articles/article05_audioFormatsCodecs";
import { article06_videoSeoStrategy } from "./articles/article06_videoSeoStrategy";
import { article07_accessibilityAdaWcag } from "./articles/article07_accessibilityAdaWcag";
import { article08_multilingualAiGuide } from "./articles/article08_multilingualAiGuide";
import { article09_podcastShowNotes } from "./articles/article09_podcastShowNotes";
import { article10_legalDepositionStandards } from "./articles/article10_legalDepositionStandards";
import { article11_medicalClinicalHipaa } from "./articles/article11_medicalClinicalHipaa";
import { article12_academicQualitativeInterviews } from "./articles/article12_academicQualitativeInterviews";
import { article13_developerSubtitleParsing } from "./articles/article13_developerSubtitleParsing";
import { article14_zeroDataRetentionSecurity } from "./articles/article14_zeroDataRetentionSecurity";
import { article15_youtubeCaptioningWorkflow } from "./articles/article15_youtubeCaptioningWorkflow";
import { article16_multilingualSubtitlingLocalization } from "./articles/article16_multilingualSubtitlingLocalization";
import { article17_audioArchivesJsonTranscripts } from "./articles/article17_audioArchivesJsonTranscripts";
import { article18_asrEvolutionWhisperGemini } from "./articles/article18_asrEvolutionWhisperGemini";

export type { BlogArticle };

export const BLOG_ARTICLES: BlogArticle[] = [
  article01_howTranscriptGWorks,
  article02_transcriptionTips,
  article03_srtVsVtt,
  article04_meetingSummarizer,
  article05_audioFormatsCodecs,
  article06_videoSeoStrategy,
  article07_accessibilityAdaWcag,
  article08_multilingualAiGuide,
  article09_podcastShowNotes,
  article10_legalDepositionStandards,
  article11_medicalClinicalHipaa,
  article12_academicQualitativeInterviews,
  article13_developerSubtitleParsing,
  article14_zeroDataRetentionSecurity,
  article15_youtubeCaptioningWorkflow,
  article16_multilingualSubtitlingLocalization,
  article17_audioArchivesJsonTranscripts,
  article18_asrEvolutionWhisperGemini,
];

/**
 * Returns 3 related articles for a given article, honoring explicit `relatedSlugs`
 * or dynamically picking by category/keyword similarity.
 */
export function getRelatedArticles(currentArticle: BlogArticle, count = 3): BlogArticle[] {
  const result: BlogArticle[] = [];
  const addedSlugs = new Set<string>([currentArticle.slug]);

  // 1. Explicitly mapped related slugs
  if (currentArticle.relatedSlugs && currentArticle.relatedSlugs.length > 0) {
    for (const slug of currentArticle.relatedSlugs) {
      if (result.length >= count) break;
      const found = BLOG_ARTICLES.find((a) => a.slug === slug);
      if (found && !addedSlugs.has(found.slug)) {
        result.push(found);
        addedSlugs.add(found.slug);
      }
    }
  }

  // 2. Match by exact category
  if (result.length < count) {
    const sameCategory = BLOG_ARTICLES.filter(
      (a) => a.category === currentArticle.category && !addedSlugs.has(a.slug)
    );
    for (const a of sameCategory) {
      if (result.length >= count) break;
      result.push(a);
      addedSlugs.add(a.slug);
    }
  }

  // 3. Fallback: select other top articles
  if (result.length < count) {
    for (const a of BLOG_ARTICLES) {
      if (result.length >= count) break;
      if (!addedSlugs.has(a.slug)) {
        result.push(a);
        addedSlugs.add(a.slug);
      }
    }
  }

  return result.slice(0, count);
}

/**
 * Returns previous and next articles in chronological / index order for smooth linear navigation
 */
export function getAdjacentArticles(currentSlug: string): {
  previous: BlogArticle | null;
  next: BlogArticle | null;
} {
  const currentIndex = BLOG_ARTICLES.findIndex((a) => a.slug === currentSlug);
  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  const previous = currentIndex > 0 ? BLOG_ARTICLES[currentIndex - 1] : null;
  const next = currentIndex < BLOG_ARTICLES.length - 1 ? BLOG_ARTICLES[currentIndex + 1] : null;

  return { previous, next };
}

