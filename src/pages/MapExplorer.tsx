import { useState, useMemo, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Loader2, MapPin } from 'lucide-react';
import { Button } from '@/components/Button';
import { Flag } from '@/components/Flag';
import { countries, Country } from '@/data/countries';
import { cn } from '@/lib/utils';

// Using a TopoJSON that uses ISO 3166-1 Alpha-3 codes (e.g. "USA", "RUS")
const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

const disputedTerritories = [
  { 
    name: "Крым", 
    coordinates: [34.1, 45.3] as [number, number], 
    description: "Территория фактически находится под контролем России. ООН признает её частью Украины." 
  },
  { 
    name: "Донецк (ДНР)", 
    coordinates: [37.8, 48.0] as [number, number], 
    description: "Территория фактически находится под контролем России. ООН признает её частью Украины." 
  },
  { 
    name: "Луганск (ЛНР)", 
    coordinates: [39.3, 48.6] as [number, number], 
    description: "Территория фактически находится под контролем России. ООН признает её частью Украины." 
  }
];

export function MapExplorer() {
  const [position, setPosition] = useState({ coordinates: [0, 20] as [number, number], zoom: 1 });
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    fetch(geoUrl)
      .then((res) => res.json())
      .then((data) => {
        setGeoData(data);
        setLoaded(true);
      })
      .catch((err) => console.error("Failed to load map data", err));
  }, []);

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleMoveEnd = (position: { coordinates: [number, number]; zoom: number }) => {
    setPosition(position);
  };

  const countryMap = useMemo(() => {
    const map = new Map<string, Country>();
    countries.forEach(c => {
      // Filter out historical and unrecognized countries
      if (c.difficulty === 'historical' || c.difficulty === 'unrecognized') return;
      map.set(c.alpha3, c);
    });
    return map;
  }, []);

  // Map of all countries (including unrecognized) for name lookup
  const allCountriesMap = useMemo(() => {
    const map = new Map<string, Country>();
    countries.forEach(c => {
      map.set(c.alpha3, c);
    });
    return map;
  }, []);

  const territoryTranslations: Record<string, { name: string, description?: string }> = {
    "Falkland Is.": { name: "Фолклендские острова", description: "Заморская территория Великобритании. Аргентина оспаривает права на острова и называет их Мальвинскими." },
    "Falkland Islands": { name: "Фолклендские острова", description: "Заморская территория Великобритании. Аргентина оспаривает права на острова и называет их Мальвинскими." },
    "Greenland": { name: "Гренландия", description: "Крупнейший остров в мире. Де-юре является автономной территорией в составе Дании." },
    "Fr. S. Antarctic Lands": { name: "Французские Южные и Антарктические территории", description: "Заморская территория Франции, включающая острова в Индийском океане и сектор в Антарктике." },
    "French Southern and Antarctic Lands": { name: "Французские Южные и Антарктические территории", description: "Заморская территория Франции, включающая острова в Индийском океане и сектор в Антарктике." },
    "Puerto Rico": { name: "Пуэрто-Рико", description: "Неинкорпорированная организованная территория США. Жители являются гражданами США, но не голосуют на выборах президента." },
    "French Guiana": { name: "Французская Гвиана", description: "Заморский департамент Франции в Южной Америке. Здесь находится космодром Куру." },
    "New Caledonia": { name: "Новая Каледония", description: "Особое административно-территориальное образование Франции в Тихом океане." },
    "W. Sahara": { name: "Западная Сахара", description: "Спорная территория. Большая часть контролируется Марокко, остальная — фронтом ПОЛИСАРИО." },
    "Western Sahara": { name: "Западная Сахара", description: "Спорная территория. Большая часть контролируется Марокко, остальная — фронтом ПОЛИСАРИО." },
    "Svalbard and Jan Mayen": { name: "Шпицберген и Ян-Майен", description: "Полярный архипелаг. Суверенитет принадлежит Норвегии, но хозяйственную деятельность могут вести и другие страны." },
    "Svalbard": { name: "Шпицберген", description: "Полярный архипелаг. Суверенитет принадлежит Норвегии, но хозяйственную деятельность могут вести и другие страны." },
    "N. Cyprus": { name: "Северный Кипр", description: "Частично признанное государство. Признано только Турцией, остальной мир считает его частью Кипра." },
    "Northern Cyprus": { name: "Северный Кипр", description: "Частично признанное государство. Признано только Турцией, остальной мир считает его частью Кипра." },
    "Kosovo": { name: "Косово", description: "Частично признанное государство на Балканах. Сербия считает его своим автономным краем." },
    "Somaliland": { name: "Сомалиленд", description: "Непризнанное государство. Де-юре часть Сомали, но фактически независимое с 1991 года." },
    "Taiwan": { name: "Тайвань", description: "Частично признанное государство. КНР считает его своей провинцией, но Тайвань управляется собственной администрацией." },
    "Palestine": { name: "Палестина", description: "Территория находится под контролем Израиля" },
    "Antarctica": { name: "Антарктида", description: "Нейтральная территория. Согласно Договору об Антарктике, не принадлежит ни одному государству." }
  };

  return (
    <div className="h-screen w-full bg-sky-200 overflow-hidden relative flex flex-col">
      {/* Header */}
      <div className="absolute top-4 left-4 z-10">
        <Link to="/">
          <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm shadow-sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад
          </Button>
        </Link>
      </div>

      <div className="absolute bottom-4 left-4 z-30">
        <Link to="/">
          <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm shadow-sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад
          </Button>
        </Link>
      </div>

      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button variant="outline" size="sm" onClick={handleZoomIn} className="bg-white/90 backdrop-blur-sm shadow-sm">
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleZoomOut} className="bg-white/90 backdrop-blur-sm shadow-sm">
          <Minus className="h-4 w-4" />
        </Button>
      </div>

      {/* Map */}
      <div className="flex-1 cursor-move relative">
        {!loaded && (
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="bg-white/80 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
               <Loader2 className="animate-spin text-blue-500" />
               <span className="text-slate-600 font-medium">Загрузка карты...</span>
             </div>
           </div>
        )}
        <ComposableMap
          projectionConfig={{
            scale: 200,
            rotate: [-10, 0, 0],
          }}
          width={980}
          height={551}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={handleMoveEnd}
            maxZoom={5}
            minZoom={1}
          >
            {geoData && (
              <Geographies geography={geoData}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    // geo.id should be the Alpha-3 code (e.g. "RUS")
                    const country = countryMap.get(geo.id);
                    const isSelected = selectedCountry?.alpha3 === geo.id;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => {
                          if (country) {
                            setSelectedCountry(country);
                            setStatusMessage(null);
                          } else {
                            setSelectedCountry(null);
                            const name = geo.properties.name;
                            const info = territoryTranslations[name];
                            const countryData = allCountriesMap.get(geo.id);
                            
                            const russianName = countryData?.name || info?.name || name;
                            const description = countryData?.description || info?.description || "Территория не входит в основной список стран ООН";
                            
                            setStatusMessage(`${russianName}: ${description}`);
                          }
                        }}
                        style={{
                          default: {
                            fill: country ? (isSelected ? "#F59E0B" : "#D1D5DB") : "#D1D5DB",
                            stroke: "#FFF",
                            strokeWidth: 0.5,
                            outline: "none",
                          },
                          hover: {
                            fill: country ? "#FCD34D" : "#E5E7EB",
                            stroke: "#FFF",
                            strokeWidth: 0.75,
                            outline: "none",
                            cursor: "pointer",
                          },
                          pressed: {
                            fill: country ? "#F59E0B" : "#D1D5DB",
                            stroke: "#FFF",
                            strokeWidth: 1,
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            )}
            {disputedTerritories.map((territory) => (
              <Marker 
                key={territory.name} 
                coordinates={territory.coordinates}
                onClick={() => {
                  setSelectedCountry(null);
                  setStatusMessage(`${territory.name}: ${territory.description}`);
                }}
              >
                <circle r={2 / position.zoom} fill="#F43F5E" stroke="#FFF" strokeWidth={0.5 / position.zoom} className="cursor-pointer hover:fill-rose-600 transition-colors" />
                <text
                  textAnchor="middle"
                  y={-5 / position.zoom}
                  style={{
                    fontFamily: "system-ui",
                    fill: "#5D5A6D",
                    fontSize: `${3 / position.zoom}px`,
                    fontWeight: "bold",
                    pointerEvents: "none"
                  }}
                >
                  {territory.name}
                </text>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* Info Panel */}
      <AnimatePresence>
        {selectedCountry && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white rounded-3xl shadow-2xl p-6 border-4 border-yellow-400 z-20"
          >
            <div className="absolute -top-3 -right-3">
               <Button 
                 size="sm" 
                 variant="ghost" 
                 className="bg-red-100 text-red-500 hover:bg-red-200 rounded-full w-8 h-8 p-0"
                 onClick={() => setSelectedCountry(null)}
               >
                 <Minus className="w-4 h-4" />
               </Button>
            </div>

            <div className="flex items-start gap-6">
              <div className="shrink-0 flex flex-col items-center">
                <Flag code={selectedCountry.code} customUrl={selectedCountry.customFlagUrl} size="lg" className="shadow-md mb-3" />
                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                  {selectedCountry.continent}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-black text-slate-800 mb-3 leading-tight break-words">
                  {selectedCountry.name}
                </h2>
                
                <div className="space-y-2 text-sm text-slate-600">
                  {selectedCountry.description && (
                    <div className="bg-yellow-50 p-2 rounded-lg text-xs text-yellow-800 border border-yellow-100 mb-2 leading-relaxed">
                      {selectedCountry.description}
                    </div>
                  )}
                  {selectedCountry.capital && (
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                      <span className="font-medium text-slate-400">Столица:</span>
                      <span className="font-bold text-slate-800 text-right ml-2">{selectedCountry.capital}</span>
                    </div>
                  )}
                  {selectedCountry.population && (
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                      <span className="font-medium text-slate-400">Население:</span>
                      <span className="font-bold text-slate-800 text-right ml-2">{selectedCountry.population}</span>
                    </div>
                  )}
                  {selectedCountry.area && (
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-medium text-slate-400">Площадь:</span>
                      <span className="font-bold text-slate-800 text-right ml-2">{selectedCountry.area}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!selectedCountry && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-6 py-3 rounded-2xl shadow-xl border border-slate-200 text-slate-700 font-medium pointer-events-none z-10 text-center max-w-lg w-[90%]">
          {statusMessage || "Нажми на страну, чтобы узнать её флаг!"}
        </div>
      )}
    </div>
  );
}
