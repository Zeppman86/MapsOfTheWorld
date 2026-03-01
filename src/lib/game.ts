import { countries, Country, Continent, Difficulty } from '@/data/countries';

export type QuizMode = 'flag-to-country' | 'country-to-flag';
export type QuizFilter = {
  difficulty?: Difficulty;
  continent?: Continent;
};

export interface Question {
  correct: Country;
  options: Country[];
}

export function generateQuiz(mode: QuizMode, filter: QuizFilter, count: number = 10): Question[] {
  let pool = countries;

  // Apply filters
  if (filter.continent) {
    pool = pool.filter(c => c.continent === filter.continent);
  }

  if (filter.difficulty) {
    if (filter.difficulty === 'legendary') {
      // Legendary: All official and observer countries (195 total)
      // Exclude historical and unrecognized
      pool = pool.filter(c => c.difficulty !== 'historical' && c.difficulty !== 'unrecognized');
    } else if (filter.difficulty === 'historical') {
      pool = pool.filter(c => c.difficulty === 'historical');
    } else if (filter.difficulty === 'unrecognized') {
      pool = pool.filter(c => c.difficulty === 'unrecognized');
    } else {
      // Standard difficulties: easy, medium, hard, insane, mega-insane
      // Try strict filter first
      const strictPool = pool.filter(c => c.difficulty === filter.difficulty);
      
      if (strictPool.length >= 4) {
        pool = strictPool;
      } else {
        // Fallback: include adjacent difficulties to ensure enough questions
        if (filter.difficulty === 'medium') {
            pool = pool.filter(c => c.difficulty === 'easy' || c.difficulty === 'medium');
        } else if (filter.difficulty === 'hard') {
             pool = pool.filter(c => c.difficulty === 'medium' || c.difficulty === 'hard');
        } else if (filter.difficulty === 'insane') {
             pool = pool.filter(c => c.difficulty === 'hard' || c.difficulty === 'insane');
        } else if (filter.difficulty === 'mega-insane') {
             pool = pool.filter(c => c.difficulty === 'insane' || c.difficulty === 'mega-insane');
        }
      }
    }
  }

  // Shuffle pool
  pool = [...pool].sort(() => Math.random() - 0.5);

  // Take first 'count' items as correct answers
  // If pool is smaller than count, we just use the whole pool
  const selectedCountries = pool.slice(0, count);

  return selectedCountries.map(correct => {
    // Generate options
    // Options should come from the SAME pool context (e.g. same continent) to make it tricky but fair
    // But we need to exclude the correct answer
    const otherOptions = countries.filter(c => c.code !== correct.code);
    
    // Prefer options from the same continent if possible
    let optionPool = otherOptions.filter(c => c.continent === correct.continent);
    if (optionPool.length < 3) {
        optionPool = otherOptions; // Fallback to global options
    }

    const options = [correct];
    const shuffledOptions = optionPool.sort(() => Math.random() - 0.5).slice(0, 3);
    options.push(...shuffledOptions);

    return {
      correct,
      options: options.sort(() => Math.random() - 0.5),
    };
  });
}
