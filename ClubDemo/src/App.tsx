import ClubView from '../components/ClubView';
import type { Club } from './types';

const sampleClub: Club = {
  id: 1,
  name: "Downtown Sports Club",
  location: "Springfield",
  teams: [
    { id: 1, name: "Downtown Tigers", sport: "Soccer", membersCount: 18, logoUrl: "https://clubviewblobtest.blob.core.windows.net/team-logos/Logosmile.png" },
    { id: 2, name: "Downtown Hawks", sport: "Basketball", membersCount: 12, logoUrl: "https://clubviewblobtest.blob.core.windows.net/team-logos/LogoO.png" },
    { id: 3, name: "Downtown Swimmers", sport: "Swimming", membersCount: 25, logoUrl: "https://clubviewblobtest.blob.core.windows.net/team-logos/Logoangry.png" },
  ],
  logoUrl: "https://clubviewblobtest.blob.core.windows.net/team-logos/LogoCrown.png"
};

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <ClubView club={sampleClub} />
    </div>
  );
}

export default App;
