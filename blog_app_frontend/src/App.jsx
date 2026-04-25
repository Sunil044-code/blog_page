

import {appRoutes} from './Routes/approutes'
import GenerateRoutes from './Components/GenerateRoutes'
import Header from './Components/common/Header'
import Footer from './Components/common/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <Header />
      <main className="flex-grow">
        <GenerateRoutes routes={appRoutes} />
      </main>
      <Footer />
    </div>
  );
}



export default App
