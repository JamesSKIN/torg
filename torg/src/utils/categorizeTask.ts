import { Category, categoryKeywords } from '../types/Category';
import { Task } from '../types/Task';
import { stemmer } from 'stemmer';

// Create a map of stemmed keywords for each category
const stemmedKeywords: { [key in Category]?: Set<string> } = {};
Object.entries(categoryKeywords).forEach(([category, keywords]) => {
  stemmedKeywords[category as Category] = new Set(
    keywords.map(keyword => stemmer(keyword.toLowerCase()))
  );
});

export const categorizeTask = (task: Task): Category => {
  const textToAnalyze = `${task.title.toLowerCase()} ${task.description?.toLowerCase() || ''}`;
  const words = textToAnalyze.split(/\s+/);
  const categoryScores: { [key in Category]?: number } = {};

  // Calculate scores for each category based on stemmed word matches
  Object.entries(stemmedKeywords).forEach(([category, keywords]) => {
    const score = words.reduce((total, word) => {
      const stemmedWord = stemmer(word);
      return total + (keywords?.has(stemmedWord) ? 1 : 0);
    }, 0);
    categoryScores[category as Category] = score;
  });

  // Find the category with the highest score
  const bestCategory = Object.entries(categoryScores).reduce(
    (best, [category, score]) => {
      if (score && score > (best.score || 0)) {
        return { category: category as Category, score };
      }
      return best;
    },
    { category: 'other' as Category, score: 0 }
  );

  // If no keywords matched, return 'other'
  return bestCategory.score > 0 ? bestCategory.category : 'other';
}; 