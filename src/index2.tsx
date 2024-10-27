import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { render } from 'react-dom';
import { Todofuken } from './pages/todofuken';
import { locationList } from './pages/tenki';

const Index2: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/todofuken/:enName" element={<TodofukenPage />} />
      </Routes>
    </Router>
  );
};

const TodofukenPage: React.FC = () => {
  const { enName } = useParams<{ enName: string }>();
  const location = locationList.find(loc => loc.enName === enName);
  return location ? <Todofuken prefecture={location} /> : <div>都道府県が見つかりません</div>;
};

render(<Index2 />, document.getElementById('app'));
