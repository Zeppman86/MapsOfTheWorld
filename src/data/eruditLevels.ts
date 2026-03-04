export interface EruditLevel {
  id: string;
  title: string;
  description: string;
  countryCodes: string[]; // Using alpha3 codes
}

export const eruditLevels: EruditLevel[] = [
  {
    id: 'crescent',
    title: 'Полумесяц',
    description: 'Найдите страны, на флагах которых изображен полумесяц.',
    countryCodes: ['TUR', 'PAK', 'TUN', 'DZA', 'MYS', 'MRT', 'LBY', 'AZE', 'UZB', 'TKM', 'SGP', 'MDV']
  },
  {
    id: 'weapons',
    title: 'К оружию!',
    description: 'Флаги, на которых изображено оружие (мечи, винтовки, копья).',
    countryCodes: ['SAU', 'OMN', 'KEN', 'SWZ', 'AGO', 'MOZ', 'GTM', 'HTI', 'LKA']
  },
  {
    id: 'oceania_union_jack',
    title: 'Британское наследие',
    description: 'Флаги стран Океании с Юнион Джеком и звездами.',
    countryCodes: ['AUS', 'NZL', 'FJI', 'TUV', 'COK', 'NIU']
  },
  {
    id: 'nordic_cross',
    title: 'Скандинавский крест',
    description: 'Флаги стран с характерным скандинавским крестом.',
    countryCodes: ['SWE', 'NOR', 'FIN', 'DNK', 'ISL']
  },
  {
    id: 'slavic',
    title: 'Славянские народы',
    description: 'Флаги славянских государств (панславянские цвета).',
    countryCodes: ['RUS', 'SRB', 'SVN', 'SVK', 'CZE', 'HRV', 'BGR', 'POL', 'BLR', 'UKR']
  }
];
