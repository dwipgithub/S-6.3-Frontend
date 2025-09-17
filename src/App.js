import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login/Login";
import { CSRFTokenProvider } from "./components/Context/CSRFTokenContext.js";

import SSO_Login from "./components/Login/Sso_Login";
import SSO_Verif from "./components/Login/SSO_Verif";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Footer from "./components/Footer/Footer";

// User
import FormUbahPassword from "./components/User/FormUbahPassword";
import FormTambahUser from "./components/User/FormTambahUser";

// RL 3.2
import RL31 from "./components/RL31/RL31.js";

// RL 3.2
import RL32 from "./components/RL32/RL32.js";
import FormTambahRL32 from "./components/RL32/FormTambahRL32";
import FormUbahRL32 from "./components/RL32/FormUbahRL32";

// RL 3.3
import RL33 from "./components/RL33/RL33.js";
import FormTambahRL33 from "./components/RL33/FormTambahRL33";
import FormUbahRL33 from "./components/RL33/FormUbahRL33";

// RL 3.4
import RL34 from "./components/RL34/RL34.js";
import FormTambahRL34 from "./components/RL34/FormTambahRL34";
import FormUbahRL34 from "./components/RL34/FormUbahRL34";

// RL 3.5
import RL35 from "./components/RL35/RL35.js";
import FormTambahRL35 from "./components/RL35/FormTambahRL35";
import FormUbahRL35 from "./components/RL35/FormUbahRL35";

// RL 3.6
import RL36 from "./components/RL36/RL36.js";
import FormTambahRL36 from "./components/RL36/FormTambahRL36";
import FormUbahRL36 from "./components/RL36/FormUbahRL36";

// RL 3.7
import RL37 from "./components/RL37/RL37.js";
import FormTambahRL37 from "./components/RL37/FormTambahRL37";
import FormUbahRL37 from "./components/RL37/FormUbahRL37";

// RL 3.8
import RL38 from "./components/RL38/RL38";
import FormTambahRL38 from "./components/RL38/FormTambahRL38";
import { FormEditRL38 } from "./components/RL38/FormUbahRL38";

// RL 3.9
import RL39 from "./components/RL39/RL39.js";
import FormTambahRL39 from "./components/RL39/FormTambahRL39.js";
import FormUbahRL39 from "./components/RL39/FormUbahRL39.js";

// RL 3.10
import RL310 from "./components/RL310/RL310.js";
import FormEditRL310 from "./components/RL310/FormEditRL310";
import FormTambahRL310 from "./components/RL310/FormTambahRL310";

// RL 3.11
import RL311 from "./components/RL311/RL311.js";
import FormTambahRL311 from "./components/RL311/FormTambahRL311";
import FormEditRL311 from "./components/RL311/FormUbahRL311";

// RL 3.12
import RL312 from "./components/RL312/RL312.js";
import FormTambahRL312 from "./components/RL312/FormTambahRL312";
import FormEditRL312 from "./components/RL312/FormUbahRL312";

// RL 3.13
import RL313 from "./components/RL313/RL313.js";
import FormTambahRL313 from "./components/RL313/FormTambahRL313";
import FormEditRL313 from "./components/RL313/FormUbahRL313";

// RL 3.14
import RL314 from "./components/RL314/RL314.js";
import FormTambahRL314 from "./components/RL314/FormTambahRL314";
import FormUbahRL314 from "./components/RL314/FormUbahRL314";

// RL 3.15
import RL315 from "./components/RL315/RL315.js";
import FormTambahRL315 from "./components/RL315/FormTambahRL315";
import FormUbahRL315 from "./components/RL315/FormUbahRL315";

// RL 3.16
import RL316 from "./components/RL316/RL316.js";
import FormTambahRL316 from "./components/RL316/FormTambahRL316";
import FormUbahRL316 from "./components/RL316/FormUbahRL316";

// RL 3.17
import RL317 from "./components/RL317/RL317";
import FormTambahRL317 from "./components/RL317/FormTambahRL317";
import FormUbahRL317 from "./components/RL317/FormUbahRL317";

// RL 3.18
import RL318 from "./components/RL318/RL318";
import FormTambahRL318 from "./components/RL318/FormTambahRL318";
import FormUbahRL318 from "./components/RL318/FormUbahRL318";

// RL 3.19
import RL319 from "./components/RL319/RL319.js";
import FormTambahRL319 from "./components/RL319/FormTambahRL319";
import FormUbahRL319 from "./components/RL319/FormUbahRL319";

// RL 4.1
import RL41 from "./components/RL41/RL41";
import FormTambahRL41 from "./components/RL41/FormTambahRL41";
import { FormUbahRL41 } from "./components/RL41/FormUbahRL41";

// RL 4.2
import RL42 from "./components/RL42/RL42.js";

// RL 4.3
import RL43 from "./components/RL43/RL43.js";

// RL 5.1
import RL51 from "./components/RL51/RL51.js";
import FormTambahRL51 from "./components/RL51/FormTambahRL51";
import FormEditRL51 from "./components/RL51/FormUbahRL51";

// RL 5.2
import RL52 from "./components/RL52/RL52.js";

// RL 5.3
import RL53 from "./components/RL53/RL53.js";

// Absensi
import Absensi from "./components/Absensi/absensi.js";

// MAINTENANCE
import MaintenancePage from "./components/MaintenancePage/MaintenancePage.js";

function App() {
  return (
    <CSRFTokenProvider>
      <MemoryRouter initialEntries={["/beranda"]}>
        <Routes>
          <Route path="/" element={<SSO_Login />} />
          <Route path="/verif" element={<SSO_Verif />} />
          {/* <Route path="/" element={<Login />} /> */}
          <Route
            path="/beranda"
            element={
              <>
                <NavigationBar />
                <Footer />
              </>
            }
          />
          <Route
            path="/user/tambahuser"
            element={
              <>
                <NavigationBar />
                <FormTambahUser />
                <Footer />
              </>
            }
          />
          <Route
            path="/user/ubahpassword"
            element={
              <>
                <NavigationBar />
                <FormUbahPassword />
                <Footer />
              </>
            }
          />

          <Route
            path="/rl31"
            element={
              <>
                <NavigationBar />
                <RL31 />
                <Footer />
              </>
            }
          />

          <Route
            path="/rl32"
            element={
              <>
                <NavigationBar />
                <RL32 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl32/tambah"
            element={
              <>
                <NavigationBar />
                <FormTambahRL32 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl32/ubah/:id"
            element={
              <>
                <NavigationBar />
                <FormUbahRL32 />
                <Footer />
              </>
            }
          />

          <Route
            path="/rl33"
            element={
              <>
                <NavigationBar />
                {/* <MaintenancePage /> */}
                <RL33 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl33/tambah"
            element={
              <>
                <NavigationBar />
                <FormTambahRL33 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl33/ubah/:id"
            element={
              <>
                <NavigationBar />
                <FormUbahRL33 />
                <Footer />
              </>
            }
          />

          <Route
            path="/rl34"
            element={
              <>
                <NavigationBar />
                <RL34 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl34/tambah"
            element={
              <>
                <NavigationBar />
                <FormTambahRL34 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl34/ubah/:id"
            element={
              <>
                <NavigationBar />
                <FormUbahRL34 />
                <Footer />
              </>
            }
          />

          <Route
            path="/rl35"
            element={
              <>
                <NavigationBar />
                <RL35 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl35/tambah"
            element={
              <>
                <NavigationBar />
                <FormTambahRL35 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl35/ubah/:id"
            element={
              <>
                <NavigationBar />
                <FormUbahRL35 />
                <Footer />
              </>
            }
          />

          <Route
            path="/rl36"
            element={
              <>
                <NavigationBar />
                <RL36 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl36/tambah"
            element={
              <>
                <NavigationBar />
                <FormTambahRL36 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl36/ubah/:id"
            element={
              <>
                <NavigationBar />
                <FormUbahRL36 />
                <Footer />
              </>
            }
          />

          <Route
            path="/rl37"
            element={
              <>
                <NavigationBar />
                <RL37 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl37/tambah"
            element={
              <>
                <NavigationBar />
                <FormTambahRL37 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl37/ubah/:id"
            element={
              <>
                <NavigationBar />
                <FormUbahRL37 />
                <Footer />
              </>
            }
          />

          <Route
            path="/rl38"
            element={
              <>
                <NavigationBar />
                <RL38 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl38/tambah"
            element={
              <>
                <NavigationBar />
                <FormTambahRL38 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl38/ubah/:id"
            element={
              <>
                <NavigationBar />
                <FormEditRL38 />
                <Footer />
              </>
            }
          />

          <Route
            path="/rl39"
            element={
              <>
                <NavigationBar />
                <RL39 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl39/tambah"
            element={
              <>
                <NavigationBar />
                <FormTambahRL39 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl39/ubah/:id"
            element={
              <>
                <NavigationBar />
                <FormUbahRL39 />
                <Footer />
              </>
            }
          />

          <Route
            path="/rl310"
            element={
              <>
                <NavigationBar />
                {/* <MaintenancePage /> */}
                <RL310 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl310/tambah"
            element={
              <>
                <NavigationBar />
                <FormTambahRL310 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl310/ubah/:id"
            element={
              <>
                <NavigationBar />
                <FormEditRL310 />
                <Footer />
              </>
            }
          />

          <Route
            path="/RL311"
            element={
              <>
                <NavigationBar />
                <RL311 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl311/tambah"
            element={
              <>
                <NavigationBar />
                <FormTambahRL311 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl311/edit/:id"
            element={
              <>
                <NavigationBar />
                <FormEditRL311 />
                <Footer />
              </>
            }
          />

          <Route
            path="/RL312"
            element={
              <>
                <NavigationBar />
                <RL312 />
                <Footer />
              </>
            }
          />

          <Route
            path="/rl312/tambah"
            element={
              <>
                <NavigationBar />
                <FormTambahRL312 />
                <Footer />
              </>
            }
          />

          <Route
            path="/rl312/edit/:id"
            element={
              <>
                <NavigationBar />
                <FormEditRL312 />
                <Footer />
              </>
            }
          />

          <Route
            path="/RL313"
            element={
              <>
                <NavigationBar />
                <RL313 />
                <Footer />
              </>
            }
          />

          <Route
            path="/rl313/tambah"
            element={
              <>
                <NavigationBar />
                <FormTambahRL313 />
                <Footer />
              </>
            }
          />

          <Route
            path="/rl313/edit/:id"
            element={
              <>
                <NavigationBar />
                <FormEditRL313 />
                <Footer />
              </>
            }
          />

          <Route
            path="/RL314"
            element={
              <>
                <NavigationBar />
                <RL314 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl314/tambah"
            element={
              <>
                <NavigationBar />
                <FormTambahRL314 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl314/ubah/:id"
            element={
              <>
                <NavigationBar />
                <FormUbahRL314 />
                <Footer />
              </>
            }
          />

          <Route
            path="/rl315"
            element={
              <>
                <NavigationBar />
                <RL315 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl315/tambah"
            element={
              <>
                <NavigationBar />
                <FormTambahRL315 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl315/ubah/:id"
            element={
              <>
                <NavigationBar />
                <FormUbahRL315 />
                <Footer />
              </>
            }
          />

          <Route
            path="/RL316"
            element={
              <>
                <NavigationBar />
                <RL316 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl316/tambah"
            element={
              <>
                <NavigationBar />
                <FormTambahRL316 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl316/ubah/:id"
            element={
              <>
                <NavigationBar />
                <FormUbahRL316 />
                <Footer />
              </>
            }
          />

          <Route
            path="/rl317"
            element={
              <>
                <NavigationBar />
                <RL317 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl317/tambah"
            element={
              <>
                <NavigationBar />
                <FormTambahRL317 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl317/ubah/:id"
            element={
              <>
                <NavigationBar />
                <FormUbahRL317 />
                <Footer />
              </>
            }
          />

          <Route
            path="/rl318"
            element={
              <>
                <NavigationBar />
                <RL318 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl318/tambah"
            element={
              <>
                <NavigationBar />
                <FormTambahRL318 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl318/ubah/:id"
            element={
              <>
                <NavigationBar />
                <FormUbahRL318 />
                <Footer />
              </>
            }
          />

          <Route
            path="/rl319"
            element={
              <>
                <NavigationBar />
                <RL319 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl319/tambah"
            element={
              <>
                <NavigationBar />
                <FormTambahRL319 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl319/ubah/:id"
            element={
              <>
                <NavigationBar />
                <FormUbahRL319 />
                <Footer />
              </>
            }
          />

          <Route
            path="/rl41"
            element={
              <>
                <NavigationBar />
                <RL41 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl41/tambah"
            element={
              <>
                <NavigationBar />
                <FormTambahRL41 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl41/ubah/:id"
            element={
              <>
                <NavigationBar />
                <FormUbahRL41 />
                <Footer />
              </>
            }
          />

          <Route
            path="/rl42"
            element={
              <>
                <NavigationBar />
                <RL42 />
                <Footer />
              </>
            }
          />

          <Route
            path="/rl43"
            element={
              <>
                <NavigationBar />
                <RL43 />
                <Footer />
              </>
            }
          />

          <Route
            path="/RL51"
            element={
              <>
                <NavigationBar />
                <RL51 />
                <Footer />
              </>
            }
          />

          <Route
            path="/rl51/tambah"
            element={
              <>
                <NavigationBar />
                <FormTambahRL51 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl51/edit/:id"
            element={
              <>
                <NavigationBar />
                <FormEditRL51 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl52"
            element={
              <>
                <NavigationBar />
                <RL52 />
                <Footer />
              </>
            }
          />
          <Route
            path="/rl53"
            element={
              <>
                <NavigationBar />
                <RL53 />
                <Footer />
              </>
            }
          />
          <Route
            path="/absensi"
            element={
              <>
                <NavigationBar />
                <Absensi />
                <Footer />
              </>
            }
          />
          <Route path="*" element={<PageNotFound />} status={404} />
        </Routes>
      </MemoryRouter>
    </CSRFTokenProvider>
  );
}

function PageNotFound() {
  return (
    <div className="container mt-3">
      <h3>404 page not found</h3>
      <p>We are sorry but the page you are looking for does not exist.</p>
    </div>
  );
}

export default App;
