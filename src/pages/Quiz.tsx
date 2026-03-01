import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { ArrowLeft, Trophy, RefreshCw, Globe, Star, MapPin, Zap, Skull, Ghost, AlertTriangle, Globe2 } from 'lucide-react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Flag } from '@/components/Flag';
import { generateQuiz, Question, QuizMode, QuizFilter } from '@/lib/game';
import { continents, Difficulty, Continent } from '@/data/countries';
import { cn } from '@/lib/utils';

export function Quiz() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'finished'>('menu');
  const [mode, setMode] = useState<QuizMode>('flag-to-country');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const startGame = (selectedMode: QuizMode, filter: QuizFilter) => {
    let count = 10;
    if (filter.difficulty === 'mega-insane') count = 30;
    if (filter.difficulty === 'legendary') count = 195; // All UN + Observers

    const newQuestions = generateQuiz(selectedMode, filter, count);
    setQuestions(newQuestions);
    setMode(selectedMode);
    setScore(0);
    setCurrentQuestionIndex(0);
    setGameState('playing');
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleAnswer = (code: string) => {
    if (selectedOption) return;

    const currentQuestion = questions[currentQuestionIndex];
    setSelectedOption(code);
    const correct = code === currentQuestion.correct.code;
    setIsCorrect(correct);

    if (correct) {
      setScore(s => s + 1);
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#22c55e', '#ffffff']
      });
    }

    setTimeout(() => {
      if (currentQuestionIndex + 1 >= questions.length) {
        setGameState('finished');
        if (score + (correct ? 1 : 0) >= questions.length * 0.8) {
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 }
          });
        }
      } else {
        setCurrentQuestionIndex(i => i + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      }
    }, 1500);
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-yellow-50 p-4 flex flex-col items-center justify-center relative">
        <Link to="/" className="absolute top-4 left-4">
          <Button variant="ghost">
            <ArrowLeft className="mr-2" /> Назад
          </Button>
        </Link>

        <Link to="/" className="absolute bottom-4 left-4">
          <Button variant="ghost">
            <ArrowLeft className="mr-2" /> Назад
          </Button>
        </Link>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-5xl w-full space-y-8"
        >
          <div className="text-center">
            <h1 className="text-4xl font-black text-slate-800 mb-2">Выбери Игру</h1>
            <p className="text-slate-500 text-lg">Во что будем играть?</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* 1. Легкий */}
            <Card
              variant="blue"
              className="cursor-pointer hover:shadow-2xl transition-shadow h-full"
              onClick={() => startGame('flag-to-country', { difficulty: 'easy' })}
            >
              <div className="flex flex-col items-center text-center gap-4 h-full justify-center">
                <div className="bg-green-100 p-4 rounded-full text-green-600">
                  <Star size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Легкий</h3>
                  <p className="text-sm text-slate-500">Самые известные страны</p>
                </div>
              </div>
            </Card>

            {/* 2. Средний */}
            <Card
              variant="yellow"
              className="cursor-pointer hover:shadow-2xl transition-shadow h-full"
              onClick={() => startGame('flag-to-country', { difficulty: 'medium' })}
            >
              <div className="flex flex-col items-center text-center gap-4 h-full justify-center">
                <div className="bg-yellow-100 p-4 rounded-full text-yellow-600">
                  <Zap size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Средний</h3>
                  <p className="text-sm text-slate-500">Для тех, кто знает больше</p>
                </div>
              </div>
            </Card>

            {/* 3. Сложный */}
            <Card
              variant="white"
              className="cursor-pointer hover:shadow-2xl transition-shadow h-full"
              onClick={() => startGame('flag-to-country', { difficulty: 'hard' })}
            >
              <div className="flex flex-col items-center text-center gap-4 h-full justify-center">
                <div className="bg-orange-100 p-4 rounded-full text-orange-600">
                  <Globe size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Сложный</h3>
                  <p className="text-sm text-slate-500">Африка, Азия, Океания</p>
                </div>
              </div>
            </Card>

            {/* 4. Безумный */}
            <Card
              variant="white"
              className="cursor-pointer hover:shadow-2xl transition-shadow border-red-200 bg-red-50 h-full"
              onClick={() => startGame('flag-to-country', { difficulty: 'insane' })}
            >
              <div className="flex flex-col items-center text-center gap-4 h-full justify-center">
                <div className="bg-red-100 p-4 rounded-full text-red-600">
                  <Trophy size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-600">Безумный</h3>
                  <p className="text-sm text-red-400">Только для экспертов</p>
                </div>
              </div>
            </Card>

            {/* 5. Безумный 30 */}
            <Card
              variant="white"
              className="cursor-pointer hover:shadow-2xl transition-shadow border-purple-200 bg-purple-50 h-full"
              onClick={() => startGame('flag-to-country', { difficulty: 'mega-insane' })}
            >
              <div className="flex flex-col items-center text-center gap-4 h-full justify-center">
                <div className="bg-purple-100 p-4 rounded-full text-purple-600">
                  <Skull size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-purple-600">Безумный 30</h3>
                  <p className="text-sm text-purple-400">30 флагов</p>
                </div>
              </div>
            </Card>

            {/* 6. Исчезнувшие */}
            <Card
              variant="white"
              className="cursor-pointer hover:shadow-2xl transition-shadow border-slate-200 bg-slate-100 h-full"
              onClick={() => startGame('flag-to-country', { difficulty: 'historical' })}
            >
              <div className="flex flex-col items-center text-center gap-4 h-full justify-center">
                <div className="bg-slate-200 p-4 rounded-full text-slate-600">
                  <Ghost size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-600">Исчезнувшие</h3>
                  <p className="text-sm text-slate-500">Страны, которых больше нет</p>
                </div>
              </div>
            </Card>

            {/* 7. Непризнанные */}
            <Card
              variant="white"
              className="cursor-pointer hover:shadow-2xl transition-shadow border-pink-200 bg-pink-50 h-full"
              onClick={() => startGame('flag-to-country', { difficulty: 'unrecognized' })}
            >
              <div className="flex flex-col items-center text-center gap-4 h-full justify-center">
                <div className="bg-pink-100 p-4 rounded-full text-pink-600">
                  <AlertTriangle size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-pink-600">Непризнанные</h3>
                  <p className="text-sm text-pink-400">Спорные территории</p>
                </div>
              </div>
            </Card>

            {/* 8. ВЕСЬ МИР */}
            <Card
              variant="white"
              className="cursor-pointer hover:shadow-2xl transition-shadow border-indigo-200 bg-indigo-50 h-full"
              onClick={() => startGame('flag-to-country', { difficulty: 'legendary' })}
            >
              <div className="flex flex-col items-center text-center gap-4 h-full justify-center">
                <div className="bg-indigo-100 p-4 rounded-full text-indigo-600">
                  <Globe2 size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-indigo-600">ВЕСЬ МИР</h3>
                  <p className="text-sm text-indigo-400">195 флагов (ООН + Наблюдатели)</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-700 text-center flex items-center justify-center gap-2">
              <MapPin className="text-blue-500" />
              По Континентам
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {continents.map(c => (
                <Button
                  key={c}
                  variant="outline"
                  size="lg"
                  onClick={() => startGame('flag-to-country', { continent: c })}
                  className="w-full text-lg"
                >
                  {c}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
      <div className="min-h-screen bg-sky-100 p-4 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full"
        >
          <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-slate-800 mb-2">Игра Окончена!</h2>
          <p className="text-xl text-slate-600 mb-8">
            Твой счет: <span className="font-bold text-blue-600 text-2xl">{score}</span> из {questions.length}
          </p>
          
          <div className="space-y-3">
            <Button onClick={() => setGameState('menu')} variant="primary" size="lg" className="w-full">
              <RefreshCw className="mr-2" /> Играть Снова
            </Button>
            <Link to="/" className="block">
              <Button variant="ghost" className="w-full">
                В Меню
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex justify-between items-center">
        <Button variant="ghost" size="sm" onClick={() => setGameState('menu')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Выход
        </Button>
        <div className="font-bold text-slate-700 text-lg">
          Вопрос {currentQuestionIndex + 1}/{questions.length}
        </div>
        <div className="font-bold text-blue-600 text-lg">
          Счет: {score}
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.correct.code}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="w-full flex flex-col items-center gap-8"
          >
            {mode === 'flag-to-country' ? (
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold text-slate-800">Чей это флаг?</h2>
                <Flag 
                  code={currentQuestion.correct.code} 
                  customUrl={currentQuestion.correct.customFlagUrl}
                  size="xl" 
                  className="mx-auto shadow-2xl scale-125"
                />
              </div>
            ) : (
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold text-slate-800">Найди флаг страны:</h2>
                <div className="text-4xl font-black text-blue-600 bg-blue-50 px-8 py-4 rounded-2xl inline-block">
                  {currentQuestion.correct.name}
                </div>
              </div>
            )}

            {/* Options */}
            <div className={cn(
              "grid gap-4 w-full mt-8",
              mode === 'flag-to-country' ? "grid-cols-1 md:grid-cols-2" : "grid-cols-2"
            )}>
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOption === option.code;
                const isCorrectOption = option.code === currentQuestion.correct.code;
                
                let variant: 'white' | 'blue' | 'yellow' = 'white';
                let className = '';

                if (selectedOption) {
                  if (isCorrectOption) {
                    className = 'bg-green-100 border-green-500 ring-4 ring-green-200';
                  } else if (isSelected) {
                    className = 'bg-red-100 border-red-500 ring-4 ring-red-200';
                  } else {
                    className = 'opacity-50';
                  }
                }

                return (
                  <motion.button
                    key={option.code}
                    whileHover={!selectedOption ? { scale: 1.02 } : {}}
                    whileTap={!selectedOption ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswer(option.code)}
                    disabled={!!selectedOption}
                    className={cn(
                      "p-4 rounded-xl border-2 border-slate-200 shadow-sm transition-all duration-200 bg-white flex items-center justify-center gap-4",
                      className
                    )}
                  >
                    {mode === 'flag-to-country' ? (
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-bold text-slate-700">{option.name}</span>
                        {selectedOption && isCorrectOption && option.years && (
                          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full mt-1 border border-amber-100">
                            {option.years}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Flag code={option.code} customUrl={option.customFlagUrl} size="md" />
                        {selectedOption && isCorrectOption && option.years && (
                           <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                             {option.years}
                           </span>
                        )}
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Historical Info Reveal */}
            {selectedOption && currentQuestion.correct.years && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center max-w-md mx-auto mt-4"
              >
                <h4 className="font-bold text-amber-800 mb-1">Историческая справка</h4>
                <p className="text-amber-700">
                  {currentQuestion.correct.name} существовала в годы: <span className="font-black">{currentQuestion.correct.years}</span>
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
