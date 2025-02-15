import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "./LoadingSpinner";

const SSO_Login = () => {
  const [expire, setExpire] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token"); // Menarik token dari URL

    if (params.size != 1) {
      refreshToken();
    } else {
      tokenAPI(tokenFromUrl);
    }
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("/apisirs6v2/token");
      const decoded = jwt_decode(response.data.accessToken);
      setUser(decoded);
      setUser((prevState) => {
        // return prevState;
        navigate("/beranda");
      });
      setExpire(decoded.exp);
    } catch (error) {
      // navigate('/verif');
      //   window.location.replace(
      //     "https://akun-yankes.kemkes.go.id/?continued=http://localhost:3000/v2"
      //   );
      // window.location.replace(
      //   "https://akun-yankes.kemkes.go.id/?continued=" + window.location.href
      // );

      console.log(error);
      window.location.replace("https://akun-yankes.kemkes.go.id");
    }
  };

  const tokenAPI = async (token) => {
    document.querySelector(".loading-overlay").style.display = "flex";

    // Menyembunyikan overlay setelah 3 detik (simulasi proses loading)
    setTimeout(() => {
      document.querySelector(".loading-overlay").style.display = "none";
    }, 3000); // Ganti waktu sesuai dengan kebutuhan (dalam milidetik)
    try {
      const customConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const results = await axios.get(
        "/apisirs6v2/login?token=" + token,
        customConfig
      );
      // Hapus parameter 'token' dari URL tanpa reload
      const urlWithoutToken = window.location.href.split("?")[0]; // Ambil URL tanpa query string
      window.history.replaceState({}, "", urlWithoutToken); // Gantilah URL tanpa query string
      navigate("/beranda");
    } catch (error) {
      // reCaptchaReference.current.reset()
      setLoading(false);

      if ((error.response.status = 404)) {
        // console.log(error.response.status);
        toast("Akun anda Tidak Aktif Silahkan menghubungi Admin", {
          position: toast.POSITION.TOP_RIGHT,
        });

        setTimeout(() => {
          // Setelah delay, arahkan ke halaman lain
          window.location.replace("https://akun-yankes.kemkes.go.id/");
        }, 2000); // Delay selama 3 detik (3000ms)
      }
    }
  };

  return (
    <div
      className="container"
      style={{ marginTop: "70px", marginBottom: "70px" }}
    >
      <div>
        <LoadingSpinner />
      </div>
      <ToastContainer />
    </div>
  );
};

export default SSO_Login;
