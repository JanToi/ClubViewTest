import { Routes, Route } from "react-router-dom";
import ClubView from '../components/ClubView';
import type { Club, Team } from './types';
import teamsData from "./Data/TeamInfo.json";
import TeamPage from "./pages/TeamPage";


const sampleClub: Club = {
  id: 1,
  name: "Downtown Sports Club",
  location: "Springfield",
  teams: teamsData as Team[],
  logoUrl: "https://clubviewblobtest.blob.core.windows.net/team-logos/LogoCrown.png"
};

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <ClubView club={sampleClub} />
          </div>
        }
      />
      <Route path="/teams/:slug" element={<TeamPage />} />
    </Routes>
  );
}

export default App;
