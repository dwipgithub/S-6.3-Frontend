import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import style from "./FormTambahRL317.module.css";
import { HiSaveAs } from "react-icons/hi";
import { Link } from "react-router-dom";
// import { IoArrowBack } from "react-icons/io5"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/esm/Spinner";
import { useCSRFTokenContext } from "../Context/CSRFTokenContext";

export const FormUbahRL317 = () => {
  const [namaRS, setNamaRS] = useState("");
  const [alamatRS, setAlamatRS] = useState("");
  const [namaPropinsi, setNamaPropinsi] = useState("");
  const [namaKabKota, setNamaKabKota] = useState("");
  const [jumlah_item_obat, setJumlahItemObat] = useState("");
  const [jumlah_item_obat_rs, setJumlahItemObatRs] = useState("");
  const [no, setNo] = useState("");
  const [nama, setNama] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { CSRFToken } = useCSRFTokenContext();

  useEffect(() => {
    refreshToken();
    // getRLTigaTitikTujuhBelasById();
    getRLTigaTitikTujuhBelasById(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshToken = async () => {
    try {
      const customConfig = {
        headers: {
          "XSRF-TOKEN": CSRFToken,
        },
      };
      const response = await axios.get("/apisirs6v2/token", customConfig);
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setExpire(decoded.exp);
      getRumahSakit(decoded.satKerId);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const customConfig = {
          headers: {
            "XSRF-TOKEN": CSRFToken,
          },
        };
        const response = await axios.get("/apisirs6v2/token", customConfig);
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getRumahSakit = async (id) => {
    try {
      const response = await axiosJWT.get("/apisirs6v2/rumahsakit/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNamaRS(response.data.data.nama);
      setAlamatRS(response.data.data.alamat);
      setNamaPropinsi(response.data.data.provinsi_nama);
      setNamaKabKota(response.data.data.kab_kota_nama);
    } catch (error) {}
  };

  const handleFocus = (event) => event.target.select();

  const changeHandler = (event, index) => {
    const targetName = event.target.name;
    switch (targetName) {
      case "jumlah_item_obat":
        if (event.target.value === "") {
          event.target.value = 0;
          event.target.select(event.target.value);
        }
        setJumlahItemObat(event.target.value);
        break;
      case "jumlah_item_obat_rs":
        if (event.target.value === "") {
          event.target.value = 0;
          event.target.select(event.target.value);
        }
        setJumlahItemObatRs(event.target.value);
        break;

      default:
        break;
    }
  };

  const Simpan = async (e) => {
    e.preventDefault();
    setSpinner(true);
    setButtonStatus(true);

    const data = {
      // "golonganObatId": golonganObatId,
      jumlahItemObat: jumlah_item_obat,
      jumlahItemObatRs: jumlah_item_obat_rs,
    };
    // console.log(jumlah_item_obat);
    if (jumlah_item_obat >= jumlah_item_obat_rs) {
      try {
        const customConfig = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "XSRF-TOKEN": CSRFToken,
          },
        };

        await axiosJWT.patch(
          "/apisirs6v2/rltigatitiktujuhbelas/" + id,
          data,
          customConfig
        );

        setSpinner(false);
        toast("Data Berhasil Diupdate", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          navigate("/rl317");
        }, 1000);
      } catch (error) {
        console.log(error);
        toast("Data Gagal Diupdate", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setButtonStatus(false);
        setSpinner(false);
      }
    } else {
      toast(
        `Data Gagal Disimpan, Jumlah Item Obat Di Rumah Sakit tidak boleh lebih besar dari Jumlah Item Obat`,
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      setButtonStatus(false);
      setSpinner(false);
    }
  };

  const getRLTigaTitikTujuhBelasById = async (id) => {
    setSpinner(true);
    const response = await axiosJWT.get(
      "/apisirs6v2/rltigatitiktujuhbelas/" + id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setNama(response.data.data.nama_golongan_obat);
    setNo(response.data.data.no_golongan_obat);
    setJumlahItemObat(response.data.data.jumlah_item_obat);
    setJumlahItemObatRs(response.data.data.jumlah_item_obat_rs);
    setSpinner(false);
    // console.log(response.data.data);
  };

  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = parseFloat(clipboardData.getData("text"));

    if (pastedData < 0) {
      e.preventDefault();
    }
  };

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };
  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  return (
    <div
      className="container"
      style={{ marginTop: "70px", marginBottom: "70px" }}
    >
      <form onSubmit={Simpan}>
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title h5">Profile Fasyankes</h5>
                <div
                  className="form-floating"
                  style={{ width: "100%", display: "inline-block" }}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    value={namaRS}
                    disabled={true}
                  />
                  <label htmlFor="floatingInput">Nama</label>
                </div>
                <div
                  className="form-floating"
                  style={{ width: "100%", display: "inline-block" }}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    value={alamatRS}
                    disabled={true}
                  />
                  <label htmlFor="floatingInput">Alamat</label>
                </div>
                <div
                  className="form-floating"
                  style={{ width: "50%", display: "inline-block" }}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    value={namaPropinsi}
                    disabled={true}
                  />
                  <label htmlFor="floatingInput">Provinsi </label>
                </div>
                <div
                  className="form-floating"
                  style={{ width: "50%", display: "inline-block" }}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    value={namaKabKota}
                    disabled={true}
                  />
                  <label htmlFor="floatingInput">Kab/Kota</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <Link
              to={`/rl317/`}
              className="btn btn-info"
              style={{
                fontSize: "18px",
                backgroundColor: "#779D9E",
                color: "#FFFFFF",
              }}
            >
              {/* <IoArrowBack size={30} style={{color:"gray",cursor: "pointer"}}/><span style={{color: "gray"}}></span> */}
              &lt;
            </Link>
            <span style={{ color: "gray" }}>
              RL 3.17 Farmasi Pengadaan Obat
            </span>

            <div className="container" style={{ textAlign: "center" }}>
              {spinner && (
                <Spinner animation="grow" variant="success"></Spinner>
              )}
              {spinner && (
                <Spinner animation="grow" variant="success"></Spinner>
              )}
              {spinner && (
                <Spinner animation="grow" variant="success"></Spinner>
              )}
              {spinner && (
                <Spinner animation="grow" variant="success"></Spinner>
              )}
              {spinner && (
                <Spinner animation="grow" variant="success"></Spinner>
              )}
              {spinner && (
                <Spinner animation="grow" variant="success"></Spinner>
              )}
            </div>
            <table className={style.rlTable}>
              <thead>
                <tr>
                  <th>No Golongan Obat</th>
                  <th>Golongan Obat</th>
                  <th>JUMLAH ITEM OBAT</th>
                  <th>JUMLAH ITEM OBAT YANG TERSEDIA DI RUMAH SAKIT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <center>{no}</center>
                  </td>
                  <td>{nama}</td>

                  <td>
                    {" "}
                    {nama === "Tidak Ada Data" && (
                      <div className="control">
                        <input
                          type="number"
                          min={0}
                          maxLength={7}
                          onInput={(e) => maxLengthCheck(e)}
                          className="form-control"
                          name="jumlah_item_obat"
                          value={jumlah_item_obat}
                          onFocus={handleFocus}
                          onChange={(event) => changeHandler(event)}
                          onPaste={preventPasteNegative}
                          onKeyPress={preventMinus}
                          disabled={true}
                        />
                      </div>
                    )}
                    {nama !== "Tidak Ada Data" && (
                      <div className="control">
                        <input
                          type="number"
                          min={0}
                          maxLength={7}
                          onInput={(e) => maxLengthCheck(e)}
                          className="form-control"
                          name="jumlah_item_obat"
                          value={jumlah_item_obat}
                          onFocus={handleFocus}
                          onChange={(event) => changeHandler(event)}
                          onPaste={preventPasteNegative}
                          onKeyPress={preventMinus}
                          disabled={false}
                        />
                      </div>
                    )}
                  </td>
                  <td>
                    {nama === "Tidak Ada Data" && (
                      <div className="control">
                        <input
                          type="number"
                          min={0}
                          maxLength={7}
                          onInput={(e) => maxLengthCheck(e)}
                          className="form-control"
                          name="jumlah_item_obat_rs"
                          value={jumlah_item_obat_rs}
                          onFocus={handleFocus}
                          onChange={(event) => changeHandler(event)}
                          onPaste={preventPasteNegative}
                          onKeyPress={preventMinus}
                          disabled={true}
                        />
                      </div>
                    )}
                    {nama !== "Tidak Ada Data" && (
                      <div className="control">
                        <input
                          type="number"
                          min={0}
                          maxLength={7}
                          onInput={(e) => maxLengthCheck(e)}
                          className="form-control"
                          name="jumlah_item_obat_rs"
                          value={jumlah_item_obat_rs}
                          onFocus={handleFocus}
                          onChange={(event) => changeHandler(event)}
                          onPaste={preventPasteNegative}
                          onKeyPress={preventMinus}
                          disabled={false}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-3 mb-3">
          <ToastContainer />
          <button
            type="submit"
            className="btn btn-outline-success"
            disabled={buttonStatus}
          >
            <HiSaveAs /> Update
          </button>
        </div>
      </form>
    </div>
  );
};
export default FormUbahRL317;
