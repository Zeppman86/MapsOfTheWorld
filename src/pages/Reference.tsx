import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Globe } from 'lucide-react';
import { Button } from '@/components/Button';
import { Flag } from '@/components/Flag';
import { countries, Continent, continents } from '@/data/countries';
import { cn } from '@/lib/utils';

export function Reference() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<Continent | 'All'>('All');

  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesContinent = selectedContinent === 'All' || country.continent === selectedContinent;
    return matchesSearch && matchesContinent;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="mr-2" /> Назад
            </Button>
          </Link>
          <h1 className="text-3xl font-black text-slate-800">Все Страны</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Поиск страны..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none w-full sm:w-64"
            />
          </div>
          
          <select
            value={selectedContinent}
            onChange={(e) => setSelectedContinent(e.target.value as Continent | 'All')}
            className="px-4 py-2 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none bg-white"
          >
            <option value="All">Все континенты</option>
            {continents.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCountries.map((country) => (
          <motion.div
            key={country.code}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col gap-4"
          >
            <div className="aspect-video w-full bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center p-2">
              <Flag 
                code={country.code} 
                customUrl={country.customFlagUrl} 
                className="w-full h-full"
                size="lg"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-slate-800 leading-tight mb-1">
                {country.name}
              </h3>
              <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-500">
                <span className="bg-slate-100 px-2 py-1 rounded-md">
                  {country.continent}
                </span>
                {country.capital && (
                  <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md">
                    {country.capital}
                  </span>
                )}
              </div>
            </div>

            {(country.population || country.area || country.years) && (
              <div className="mt-auto pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-500">
                {country.years && (
                  <div className="col-span-2 mb-2 bg-amber-50 text-amber-700 px-2 py-1 rounded-md font-bold text-center border border-amber-100">
                    {country.years}
                  </div>
                )}
                {country.population && (
                  <div>
                    <div className="font-semibold text-slate-400">Население</div>
                    {country.population}
                  </div>
                )}
                {country.area && (
                  <div>
                    <div className="font-semibold text-slate-400">Площадь</div>
                    {country.area}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto mt-8 mb-4">
        <Link to="/">
          <Button variant="ghost">
            <ArrowLeft className="mr-2" /> Назад
          </Button>
        </Link>
      </div>
    </div>
  );
}
