import { Link } from 'react-router-dom';
import { ArrowLeft, Globe, Flag as FlagIcon, Award, Users } from 'lucide-react';
import { Button } from '@/components/Button';
import { Flag } from '@/components/Flag';
import { motion } from 'motion/react';

export function Info() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2" /> Назад
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
              Сколько стран и флагов в мире?
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Разбираемся в цифрах: от ООН до Олимпийских игр и ФИФА.
            </p>
          </header>

          {/* Section 1: UN */}
          <section className="bg-white rounded-3xl p-8 shadow-xl border-l-8 border-blue-500">
            <div className="flex items-start gap-6">
              <div className="bg-blue-100 p-4 rounded-2xl text-blue-600 shrink-0 hidden md:block">
                <Globe size={40} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                  <Globe className="md:hidden text-blue-600" />
                  1. Официально признанные государства (ООН)
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Большинство экспертов и международных организаций ориентируются на список ООН:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl">
                    <span className="font-black text-blue-600 text-xl w-12 text-center">193</span>
                    <span className="font-medium text-slate-700">государства-члена ООН (полноправные участники)</span>
                  </li>
                  <li className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl">
                    <span className="font-black text-blue-600 text-xl w-12 text-center">+2</span>
                    <span className="font-medium text-slate-700">государства-наблюдателя (Ватикан и Палестина)</span>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <p className="text-lg font-bold text-slate-800">
                    Итого: <span className="text-blue-600 text-2xl">195 стран</span>
                  </p>
                  <p className="text-sm text-slate-500 mt-1">Это «золотой стандарт» для большинства атласов.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Flags Count */}
          <section className="bg-white rounded-3xl p-8 shadow-xl border-l-8 border-yellow-500">
            <div className="flex items-start gap-6">
              <div className="bg-yellow-100 p-4 rounded-2xl text-yellow-600 shrink-0 hidden md:block">
                <FlagIcon size={40} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                  <FlagIcon className="md:hidden text-yellow-600" />
                  2. Сколько всего флагов?
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Если мы говорим о государственных флагах, то их количество соответствует числу стран (195). 
                  Однако в мире флагов гораздо больше:
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-2 text-purple-600 font-bold">
                      <Award size={20} /> Олимпийские игры
                    </div>
                    <div className="text-3xl font-black text-slate-800 mb-1">206</div>
                    <p className="text-xs text-slate-500">национальных комитетов (включая Пуэрто-Рико и др.)</p>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-2 text-green-600 font-bold">
                      <Users size={20} /> ФИФА (Футбол)
                    </div>
                    <div className="text-3xl font-black text-slate-800 mb-1">211</div>
                    <p className="text-xs text-slate-500">ассоциаций (Англия, Шотландия, Уэльс отдельно)</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-2 text-indigo-600 font-bold">
                      <Globe size={20} /> ISO Стандарт
                    </div>
                    <div className="text-3xl font-black text-slate-800 mb-1">249</div>
                    <p className="text-xs text-slate-500">кодов стран (включая зависимые территории)</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Why numbers vary */}
          <section className="bg-white rounded-3xl p-8 shadow-xl border-l-8 border-red-500">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Почему цифры меняются?</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              В мире существуют <strong>частично признанные страны</strong> (например, Тайвань, Косово, Абхазия, Северный Кипр). 
              У каждого из них есть свой флаг, правительство и границы, но из-за политических причин они не входят в основной список ООН.
            </p>
            <p className="text-slate-600 leading-relaxed bg-red-50 p-4 rounded-xl border border-red-100">
              Если считать абсолютно все образования, которые называют себя государствами, цифра может перевалить за <strong>200</strong>.
            </p>
          </section>

          {/* Section 4: Fun Facts */}
          <section className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 shadow-xl text-white">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              ✨ Интересные факты
            </h2>
            
            <div className="space-y-8">
              <div>
                <p className="text-indigo-100 leading-relaxed text-lg mb-4">
                  Почти все флаги стран мира — прямоугольные. Исключения всего три:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white/10 backdrop-blur p-4 rounded-xl text-center flex flex-col items-center gap-3">
                    <Flag code="NP" size="lg" className="shadow-lg" />
                    <div>
                      <div className="font-bold text-xl mb-1">Непал</div>
                      <p className="text-sm text-indigo-200">Единственный непрямоугольный (два треугольника)</p>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur p-4 rounded-xl text-center flex flex-col items-center gap-3">
                    <Flag code="CH" size="lg" className="shadow-lg" />
                    <div>
                      <div className="font-bold text-xl mb-1">Швейцария</div>
                      <p className="text-sm text-indigo-200">Квадратная форма</p>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur p-4 rounded-xl text-center flex flex-col items-center gap-3">
                    <Flag code="VA" size="lg" className="shadow-lg" />
                    <div>
                      <div className="font-bold text-xl mb-1">Ватикан</div>
                      <p className="text-sm text-indigo-200">Квадратная форма</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-white/20" />

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-yellow-300">Самые старые флаги</h3>
                  <ul className="space-y-4 text-indigo-100">
                    <li className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
                      <Flag code="DK" size="md" className="shrink-0 shadow-md" />
                      <div>
                        <span className="font-bold block">Дания (1219 г.)</span>
                        <span className="text-sm opacity-80">Старейший непрерывно используемый</span>
                      </div>
                    </li>
                    <li className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
                      <Flag code="AT" size="md" className="shrink-0 shadow-md" />
                      <div>
                        <span className="font-bold block">Австрия (1230 г.)</span>
                      </div>
                    </li>
                    <li className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
                      <Flag code="LV" size="md" className="shrink-0 shadow-md" />
                      <div>
                        <span className="font-bold block">Латвия (1280 г.)</span>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 text-yellow-300">Уникальные цвета</h3>
                  <ul className="space-y-4 text-indigo-100">
                    <li className="bg-white/10 p-3 rounded-xl">
                      <div className="flex gap-2 mb-2">
                        <Flag code="DM" size="sm" className="shadow-md" />
                        <Flag code="NI" size="sm" className="shadow-md" />
                      </div>
                      <div>
                        <span className="font-bold block text-purple-300">Фиолетовый цвет</span>
                        <span className="text-sm opacity-80">Встречается только на флагах Доминики и Никарагуа</span>
                      </div>
                    </li>
                    <li className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
                      <Flag code="JM" size="md" className="shrink-0 shadow-md" />
                      <div>
                        <span className="font-bold block text-yellow-300">Ямайка</span>
                        <span className="text-sm opacity-80">Единственный флаг без красного, белого или синего цветов</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="h-px bg-white/20" />

              <div>
                <h3 className="text-xl font-bold mb-4 text-yellow-300">Символы на флагах</h3>
                <div className="grid sm:grid-cols-2 gap-4 text-indigo-100">
                  <div className="bg-white/10 p-3 rounded-xl flex items-center gap-3">
                    <div className="flex flex-col gap-1 shrink-0">
                      <Flag code="MZ" size="sm" />
                      <Flag code="GT" size="sm" />
                    </div>
                    <div>
                      <strong className="block text-yellow-200">Оружие</strong>
                      <span className="text-sm">Мозамбик (АК-47), Гватемала (винтовки), Гаити (пушки)</span>
                    </div>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl flex items-center gap-3">
                    <div className="flex flex-col gap-1 shrink-0">
                      <Flag code="CY" size="sm" />
                      <Flag code="XK" size="sm" />
                    </div>
                    <div>
                      <strong className="block text-yellow-200">Карта страны</strong>
                      <span className="text-sm">Кипр и Косово</span>
                    </div>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl flex items-center gap-3">
                    <Flag code="BZ" size="md" className="shrink-0" />
                    <div>
                      <strong className="block text-yellow-200">Люди</strong>
                      <span className="text-sm">Белиз (два дровосека)</span>
                    </div>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl flex items-center gap-3">
                    <Flag code="BT" size="md" className="shrink-0" />
                    <div>
                      <strong className="block text-yellow-200">Дракон</strong>
                      <span className="text-sm">Бутан (Громовой Дракон)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-start mt-8">
            <Link to="/">
              <Button variant="ghost">
                <ArrowLeft className="mr-2" /> Назад
              </Button>
            </Link>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
