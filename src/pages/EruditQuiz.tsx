import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, RefreshCw, HelpCircle, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/Button';
import { Flag } from '@/components/Flag';
import { eruditLevels, EruditLevel } from '@/data/eruditLevels';
import { countries, Country } from '@/data/countries';
import { cn } from '@/lib/utils';

interface EruditQuizProps {
  initialLevel?: EruditLevel;
  onExit?: () => void;
}

export function EruditQuiz({ initialLevel, onExit }: EruditQuizProps) {
  const [selectedLevel, setSelectedLevel] = useState<EruditLevel | null>(initialLevel || null);
  const [matches, setMatches] = useState<Record<string, string>>({}); // flagCode -> countryCode (if matched)
  const [wrongAttempts, setWrongAttempts] = useState<string[]>([]); // list of countryCodes that were dropped wrongly recently
  const [completed, setCompleted] = useState(false);

  // Filter countries for the current level
  const levelCountries = useMemo(() => {
    if (!selectedLevel) return [];
    return selectedLevel.countryCodes
      .map(code => countries.find(c => c.alpha3 === code))
      .filter((c): c is Country => !!c);
  }, [selectedLevel]);

  // Shuffle countries for the draggable list
  const shuffledCountries = useMemo(() => {
    return [...levelCountries].sort(() => Math.random() - 0.5);
  }, [levelCountries]);

  const handleLevelSelect = (level: EruditLevel) => {
    setSelectedLevel(level);
    setMatches({});
    setCompleted(false);
    setWrongAttempts([]);
  };

  const handleExit = () => {
    if (onExit) {
      onExit();
    } else {
      setSelectedLevel(null);
    }
  };

  const handleDrop = (country: Country, point: { x: number; y: number }) => {
    // Hide the dragged element momentarily to find what's underneath
    // Actually elementFromPoint might hit the dragged element if we don't be careful.
    // Framer motion usually handles this by not blocking pointer events on the drag ghost?
    // No, the dragged element is the element. 
    // We can use pointer-events-none on the dragging element, but then we can't drag it?
    // We can use the logic: hide, check, show.
    
    // Better approach: Get all drop zones and check if point is within their rects.
    const dropZones = document.querySelectorAll('[data-drop-zone]');
    let matchedZone: string | null = null;

    dropZones.forEach(zone => {
      const rect = zone.getBoundingClientRect();
      if (
        point.x >= rect.left &&
        point.x <= rect.right &&
        point.y >= rect.top &&
        point.y <= rect.bottom
      ) {
        matchedZone = zone.getAttribute('data-country-code');
      }
    });

    if (matchedZone) {
      if (matchedZone === country.alpha3) {
        // Correct match
        setMatches(prev => {
          const newMatches = { ...prev, [matchedZone!]: country.alpha3 };
          // Check win condition
          if (Object.keys(newMatches).length === levelCountries.length) {
            setCompleted(true);
            confetti({
              particleCount: 150,
              spread: 100,
              origin: { y: 0.6 }
            });
          }
          return newMatches;
        });
      } else {
        // Wrong match
        setWrongAttempts(prev => [...prev, country.alpha3]);
        setTimeout(() => {
          setWrongAttempts(prev => prev.filter(c => c !== country.alpha3));
        }, 500);
      }
    }
  };

  if (!selectedLevel) {
    return (
      <div className="min-h-screen bg-indigo-50 p-4 flex flex-col items-center justify-center relative">
        <Link to="/" className="absolute top-4 left-4">
          <Button variant="ghost">
            <ArrowLeft className="mr-2" /> Назад
          </Button>
        </Link>

        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-black text-indigo-900 mb-2">ЭРУДИТ</h1>
            <p className="text-indigo-600 text-lg">Выбери тему и проверь свои знания флагов!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eruditLevels.map((level) => (
              <motion.div
                key={level.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLevelSelect(level)}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-indigo-100 cursor-pointer hover:border-indigo-300 transition-colors"
              >
                <h3 className="text-xl font-bold text-indigo-800 mb-2">{level.title}</h3>
                <p className="text-indigo-500 text-sm mb-4">{level.description}</p>
                <div className="flex gap-2">
                  {level.countryCodes.slice(0, 3).map(code => (
                    <div key={code} className="w-8 h-6 rounded overflow-hidden shadow-sm opacity-70">
                      <img 
                        src={countries.find(c => c.alpha3 === code)?.customFlagUrl || `https://flagcdn.com/${countries.find(c => c.alpha3 === code)?.code.toLowerCase()}.svg`} 
                        alt="" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {level.countryCodes.length > 3 && (
                    <div className="w-8 h-6 rounded bg-indigo-50 flex items-center justify-center text-xs text-indigo-400 font-bold">
                      +{level.countryCodes.length - 3}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex justify-between items-center z-10">
        <Button variant="ghost" size="sm" onClick={handleExit}>
          <ArrowLeft className="mr-2 h-4 w-4" /> {onExit ? 'Назад' : 'Уровни'}
        </Button>
        <div className="font-bold text-slate-700 text-lg">
          {selectedLevel.title}
        </div>
        <div className="font-bold text-blue-600 text-lg">
          {Object.keys(matches).length} / {levelCountries.length}
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-8">
        
        {/* Flags Grid (Drop Zones) */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 content-start">
          {levelCountries.map((country) => {
            const isMatched = matches[country.alpha3];
            
            return (
              <div
                key={country.alpha3}
                data-drop-zone="true"
                data-country-code={country.alpha3}
                className={cn(
                  "relative bg-white rounded-xl p-4 shadow-sm border-2 transition-all flex flex-col items-center gap-3 min-h-[160px] justify-center",
                  isMatched ? "border-green-400 bg-green-50" : "border-slate-200"
                )}
              >
                <Flag 
                  code={country.code} 
                  customUrl={country.customFlagUrl} 
                  size="lg" 
                  className={cn("shadow-md transition-opacity", isMatched ? "opacity-100" : "opacity-90")}
                />
                
                {/* Placeholder for name */}
                <div className={cn(
                  "w-full h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-colors",
                  isMatched ? "bg-green-200 text-green-800" : "bg-slate-100 text-slate-400 border-2 border-dashed border-slate-300"
                )}>
                  {isMatched ? country.name : "?"}
                </div>

                {isMatched && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-green-500 text-white p-1 rounded-full shadow-lg"
                  >
                    <Check size={16} strokeWidth={3} />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Draggable Names List */}
        <div className="w-full md:w-64 lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-lg p-4 sticky top-4 border-2 border-indigo-100">
            <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
              <HelpCircle size={20} className="text-indigo-500" />
              Страны
            </h3>
            
            <div className="flex flex-col gap-2">
              {shuffledCountries.map((country) => {
                const isMatched = Object.values(matches).includes(country.alpha3);
                const isWrong = wrongAttempts.includes(country.alpha3);

                if (isMatched) return null;

                return (
                  <DraggableName
                    key={country.alpha3}
                    country={country}
                    isWrong={isWrong}
                    onDrop={handleDrop}
                  />
                );
              })}
              
              {Object.keys(matches).length === levelCountries.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center p-4 text-green-600 font-bold"
                >
                  Все страны найдены! 🎉
                </motion.div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Completion Modal */}
      <AnimatePresence>
        {completed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
            >
              <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-3xl font-black text-slate-800 mb-2">Победа!</h2>
              <p className="text-slate-600 mb-8">
                Ты отлично справился с уровнем "{selectedLevel.title}"!
              </p>
              
              <div className="space-y-3">
                <Button onClick={handleExit} variant="primary" size="lg" className="w-full">
                  {onExit ? 'К списку уровней' : 'Выбрать другой уровень'}
                </Button>
                <Link to="/" className="block">
                  <Button variant="ghost" className="w-full">
                    В Меню
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface DraggableNameProps {
  country: Country;
  isWrong: boolean;
  onDrop: (country: Country, point: { x: number; y: number }) => void;
}

function DraggableName({ country, isWrong, onDrop }: DraggableNameProps) {
  const controls = useDragControls();
  
  return (
    <motion.div
      drag
      dragControls={controls}
      dragSnapToOrigin={true}
      dragMomentum={false}
      dragElastic={0.1}
      whileDrag={{ scale: 1.1, zIndex: 100, cursor: 'grabbing' }}
      whileHover={{ scale: 1.02, cursor: 'grab' }}
      animate={isWrong ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0, y: 0 }}
      transition={isWrong ? { duration: 0.4 } : { type: "spring", stiffness: 300, damping: 30 }}
      onDragEnd={(event, info) => {
        onDrop(country, info.point);
      }}
      className={cn(
        "bg-white border-2 border-indigo-200 rounded-lg p-3 text-center font-bold text-slate-700 shadow-sm select-none touch-none",
        isWrong && "border-red-400 bg-red-50 text-red-600"
      )}
    >
      {country.name}
    </motion.div>
  );
}
