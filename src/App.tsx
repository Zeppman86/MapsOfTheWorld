/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { MapExplorer } from '@/pages/MapExplorer';
import { Quiz } from '@/pages/Quiz';
import { Reference } from '@/pages/Reference';
import { Info } from '@/pages/Info';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapExplorer />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/reference" element={<Reference />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </HashRouter>
  );
}
