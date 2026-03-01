import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Globe, Trophy, Map, Info } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-sky-200 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-6xl font-black text-white drop-shadow-lg mb-4">
          Флаги Мира
        </h1>
        <p className="text-2xl text-sky-900 font-bold">
          Изучай страны и играй!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <Link to="/map" className="group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="bg-white rounded-3xl p-8 shadow-xl border-b-8 border-slate-200 flex flex-col items-center gap-4 h-full"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
              <Map size={48} strokeWidth={3} />
            </div>
            <h2 className="text-3xl font-bold text-slate-800">Карта Мира</h2>
            <p className="text-slate-500 text-center font-medium">
              Путешествуй по карте и узнавай флаги стран!
            </p>
            <Button variant="secondary" size="lg" className="mt-auto w-full">
              Открыть Карту
            </Button>
          </motion.div>
        </Link>

        <Link to="/quiz" className="group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="bg-white rounded-3xl p-8 shadow-xl border-b-8 border-slate-200 flex flex-col items-center gap-4 h-full"
          >
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-4">
              <Trophy size={48} strokeWidth={3} />
            </div>
            <h2 className="text-3xl font-bold text-slate-800">Викторина</h2>
            <p className="text-slate-500 text-center font-medium">
              Проверь свои знания и выигрывай кубки!
            </p>
            <Button variant="primary" size="lg" className="mt-auto w-full">
              Начать Игру
            </Button>
          </motion.div>
        </Link>

        <Link to="/reference" className="group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: -1 }}
            className="bg-white rounded-3xl p-8 shadow-xl border-b-8 border-slate-200 flex flex-col items-center gap-4 h-full"
          >
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
              <Globe size={48} strokeWidth={3} />
            </div>
            <h2 className="text-3xl font-bold text-slate-800">Справочник</h2>
            <p className="text-slate-500 text-center font-medium">
              Полный список всех флагов и стран
            </p>
            <Button variant="ghost" size="lg" className="mt-auto w-full bg-purple-50 hover:bg-purple-100 text-purple-700">
              Открыть
            </Button>
          </motion.div>
        </Link>

        <Link to="/info" className="group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="bg-white rounded-3xl p-8 shadow-xl border-b-8 border-slate-200 flex flex-col items-center gap-4 h-full"
          >
            <div className="w-24 h-24 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 mb-4">
              <Info size={48} strokeWidth={3} />
            </div>
            <h2 className="text-3xl font-bold text-slate-800">Инфо</h2>
            <p className="text-slate-500 text-center font-medium">
              Интересные факты о флагах и странах
            </p>
            <Button variant="ghost" size="lg" className="mt-auto w-full bg-sky-50 hover:bg-sky-100 text-sky-700">
              Узнать
            </Button>
          </motion.div>
        </Link>
      </div>

      <footer className="mt-16 text-sky-800 font-medium opacity-70">
        Для детей и взрослых
      </footer>
    </div>
  );
}
