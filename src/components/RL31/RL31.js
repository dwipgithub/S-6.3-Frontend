import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import style from "./FormTambahRL31.module.css";
import { HiSaveAs } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { downloadExcel } from "react-export-table-to-excel";
import { useCSRFTokenContext } from "../Context/CSRFTokenContext";

const RL31 = () => {
  const [bulan, setBulan] = useState(1);
  const [tahun, setTahun] = useState("");
  const [filterLabel, setFilterLabel] = useState([]);
  const [daftarBulan, setDaftarBulan] = useState([]);
  const [rumahSakit, setRumahSakit] = useState("");
  const [daftarRumahSakit, setDaftarRumahSakit] = useState([]);
  const [daftarProvinsi, setDaftarProvinsi] = useState([]);
  const [daftarKabKota, setDaftarKabKota] = useState([]);
  const [dataRL, setDataRL] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [abor, setAveBor] = useState(0);
  const [alos, setAveLos] = useState(0);
  const [abto, setAveBto] = useState(0);
  const [atoi, setAveToi] = useState(0);
  const [andr, setAveNdr] = useState(0);
  const [agdr, setAveGdr] = useState(0);
  const { CSRFToken } = useCSRFTokenContext();

  useEffect(() => {
    refreshToken();
    getBulan();
    const getLastYear = async () => {
      const date = new Date();
      setTahun(date.getFullYear());
    };
    getLastYear().then((results) => {});
    Average();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRL]);

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

      showRumahSakit(decoded.satKerId);
      setExpire(decoded.exp);
      setUser(decoded);
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

  const getBulan = async () => {
    const results = [];
    results.push({
      key: "Januari",
      value: "1",
    });
    results.push({
      key: "Febuari",
      value: "2",
    });
    results.push({
      key: "Maret",
      value: "3",
    });
    results.push({
      key: "April",
      value: "4",
      JmlHari: "30",
    });
    results.push({
      key: "Mei",
      value: "5",
    });
    results.push({
      key: "Juni",
      value: "6",
    });
    results.push({
      key: "Juli",
      value: "7",
    });
    results.push({
      key: "Agustus",
      value: "8",
    });
    results.push({
      key: "September",
      value: "9",
    });
    results.push({
      key: "Oktober",
      value: "10",
    });
    results.push({
      key: "November",
      value: "11",
    });
    results.push({
      key: "Desember",
      value: "12",
    });

    setDaftarBulan([...results]);
  };

  const bulanChangeHandler = async (e) => {
    setBulan(e.target.value);
  };

  const tahunChangeHandler = (event) => {
    setTahun(event.target.value);
  };

  const provinsiChangeHandler = (e) => {
    const provinsiId = e.target.value;
    getKabKota(provinsiId);
  };

  const kabKotaChangeHandler = (e) => {
    const kabKotaId = e.target.value;
    getRumahSakit(kabKotaId);
  };

  const rumahSakitChangeHandler = (e) => {
    const rsId = e.target.value;
    showRumahSakit(rsId);
  };

  const getRumahSakit = async (kabKotaId) => {
    try {
      const response = await axiosJWT.get("/apisirs6v2/rumahsakit/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          kabKotaId: kabKotaId,
        },
      });
      setDaftarRumahSakit(response.data.data);
    } catch (error) {}
  };

  const showRumahSakit = async (id) => {
    try {
      const response = await axiosJWT.get("/apisirs6v2/rumahsakit/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRumahSakit(response.data.data);
    } catch (error) {}
  };

  const getRL = async (e) => {
    e.preventDefault();
    if (rumahSakit == null) {
      toast(`rumah sakit harus dipilih`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    const filter = [];
    filter.push("nama: ".concat(rumahSakit.nama));
    filter.push("periode: ".concat(String(tahun).concat("-").concat(bulan)));
    setFilterLabel(filter);
    try {
      const customConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          rsId: rumahSakit.id,
          periode: String(tahun).concat("-").concat(bulan),
        },
      };
      const results = await axiosJWT.get(
        "/apisirs6v2/rltigatitiksatu",
        customConfig
      );

      const rlTigaTitikSatuDetails = results.data.data.map((value) => {
        return value;
      });
      setDataRL(rlTigaTitikSatuDetails);
      setRumahSakit(null);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const Average = () => {
    let avgbor = 0;
    let avglos = 0;
    let avgbto = 0;
    let avgtoi = 0;
    let avgndr = 0;
    let avggdr = 0;

    dataRL.forEach((value) => {
      avgbor = avgbor + parseFloat(value.BOR);
      avglos = avglos + parseFloat(value.ALOS);
      avgbto = avgbto + parseFloat(value.BTO);
      avgtoi = avgtoi + parseFloat(value.TOI);
      avgndr = avgndr + parseFloat(value.NDR);
      avggdr = avggdr + parseFloat(value.GDR);
    });

    const avbor = avgbor / dataRL.length;
    const avlos = avglos / dataRL.length;
    const avbto = avgbto / dataRL.length;
    const avtoi = avgtoi / dataRL.length;
    const avndr = avgndr / dataRL.length;
    const avgdr = avggdr / dataRL.length;

    setAveBor(avbor);
    setAveLos(avlos);
    setAveBto(avbto);
    setAveToi(avtoi);
    setAveNdr(avndr);
    setAveGdr(avgdr);
  };

  const handleClose = () => setShow(false);

  const handleShow = () => {
    const jenisUserId = user.jenisUserId;
    const satKerId = user.satKerId;
    switch (jenisUserId) {
      case 1:
        getProvinsi();
        setBulan(1);
        setShow(true);
        break;
      case 2:
        getKabKota(satKerId);
        setBulan(1);
        setShow(true);
        break;
      case 3:
        getRumahSakit(satKerId);
        setBulan(1);
        setShow(true);
        break;
      case 4:
        showRumahSakit(satKerId);
        setBulan(1);
        setShow(true);
        break;
      default:
    }
  };

  const getProvinsi = async () => {
    try {
      const customConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const results = await axiosJWT.get("/apisirs6v2/provinsi", customConfig);

      const daftarProvinsi = results.data.data.map((value) => {
        return value;
      });

      setDaftarProvinsi(daftarProvinsi);
    } catch (error) {
      console.log(error);
    }
  };

  const getKabKota = async (provinsiId) => {
    try {
      const customConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          provinsiId: provinsiId,
        },
      };
      const results = await axiosJWT.get("/apisirs6v2/kabkota", customConfig);

      const daftarKabKota = results.data.data.map((value) => {
        return value;
      });

      setDaftarKabKota(daftarKabKota);
    } catch (error) {
      console.log(error);
    }
  };

  function handleDownloadExcel() {
    const header = [
      "No",
      "Jenis Pelayanan",
      "BOR",
      "ALOS",
      "BTO",
      "TOI",
      "NDR",
      "GDR",
    ];

    const body = dataRL.map((value, index) => {
      const data = [
        value.id,
        value.nama_kelompok_jenis_pelayanan,
        (Math.round(value.BOR * 100) / 100).toFixed(2),
        (Math.round(value.ALOS * 100) / 100).toFixed(2),
        (Math.round(value.BTO * 100) / 100).toFixed(2),
        (Math.round(value.TOI * 100) / 100).toFixed(2),
        (Math.round(value.NDR * 100) / 100).toFixed(2),
        (Math.round(value.GDR * 100) / 100).toFixed(2),
      ];

      return data;
    });

    body.push([
      "77",
      "Rata - Rata",
      (Math.round(abor * 100) / 100).toFixed(2),
      (Math.round(alos * 100) / 100).toFixed(2),
      (Math.round(abto * 100) / 100).toFixed(2),
      (Math.round(atoi * 100) / 100).toFixed(2),
      (Math.round(andr * 100) / 100).toFixed(2),
      (Math.round(agdr * 100) / 100).toFixed(2),
    ]);

    // console.log(dt)
    // data.push
    // (
    //     "77",
    //     "Rata - Rata"
    //     "(Math.round(abor * 100) / 100).toFixed(2)",
    //     "(Math.round(alos * 100) / 100).toFixed(2)",
    //     "(Math.round(abto * 100) / 100).toFixed(2)",
    //     "(Math.round(atoi * 100) / 100).toFixed(2)",
    //     "(Math.round(andr * 100) / 100).toFixed(2)",
    //     "(Math.round(agdr * 100) / 100).toFixed(2)"
    // );

    downloadExcel({
      fileName: "RL_3_1",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header,
        body: body,
      },
    });
  }

  return (
    <div className="container" style={{ marginTop: "70px" }}>
      <h2>RL 3.1 Indikator Pelayanan</h2>
      <Modal show={show} onHide={handleClose} style={{ position: "fixed" }}>
        <Modal.Header closeButton>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>

        <form onSubmit={getRL}>
          <Modal.Body>
            {user.jenisUserId === 1 ? (
              <>
                <div
                  className="form-floating"
                  style={{ width: "100%", paddingBottom: "5px" }}
                >
                  <select
                    name="provinsi"
                    id="provinsi"
                    typeof="select"
                    className="form-select"
                    onChange={(e) => provinsiChangeHandler(e)}
                  >
                    <option key={0} value={0}>
                      Pilih
                    </option>
                    {daftarProvinsi.map((nilai) => {
                      return (
                        <option key={nilai.id} value={nilai.id}>
                          {nilai.nama}
                        </option>
                      );
                    })}
                  </select>
                  <label htmlFor="provinsi">Provinsi</label>
                </div>

                <div
                  className="form-floating"
                  style={{ width: "100%", paddingBottom: "5px" }}
                >
                  <select
                    name="kabKota"
                    id="kabKota"
                    typeof="select"
                    className="form-select"
                    onChange={(e) => kabKotaChangeHandler(e)}
                  >
                    <option key={0} value={0}>
                      Pilih
                    </option>
                    {daftarKabKota.map((nilai) => {
                      return (
                        <option key={nilai.id} value={nilai.id}>
                          {nilai.nama}
                        </option>
                      );
                    })}
                  </select>
                  <label htmlFor="kabKota">Kab/Kota</label>
                </div>

                <div
                  className="form-floating"
                  style={{ width: "100%", paddingBottom: "5px" }}
                >
                  <select
                    name="rumahSakit"
                    id="rumahSakit"
                    typeof="select"
                    className="form-select"
                    onChange={(e) => rumahSakitChangeHandler(e)}
                  >
                    <option key={0} value={0}>
                      Pilih
                    </option>
                    {daftarRumahSakit.map((nilai) => {
                      return (
                        <option key={nilai.id} value={nilai.id}>
                          {nilai.nama}
                        </option>
                      );
                    })}
                  </select>
                  <label htmlFor="rumahSakit">Rumah Sakit</label>
                </div>
              </>
            ) : (
              <></>
            )}
            {user.jenisUserId === 2 ? (
              <>
                <div
                  className="form-floating"
                  style={{ width: "100%", paddingBottom: "5px" }}
                >
                  <select
                    name="kabKota"
                    id="kabKota"
                    typeof="select"
                    className="form-select"
                    onChange={(e) => kabKotaChangeHandler(e)}
                  >
                    <option key={0} value={0}>
                      Pilih
                    </option>
                    {daftarKabKota.map((nilai) => {
                      return (
                        <option key={nilai.id} value={nilai.id}>
                          {nilai.nama}
                        </option>
                      );
                    })}
                  </select>
                  <label htmlFor="kabKota">Kab/Kota</label>
                </div>

                <div
                  className="form-floating"
                  style={{ width: "100%", paddingBottom: "5px" }}
                >
                  <select
                    name="rumahSakit"
                    id="rumahSakit"
                    typeof="select"
                    className="form-select"
                    onChange={(e) => rumahSakitChangeHandler(e)}
                  >
                    <option key={0} value={0}>
                      Pilih
                    </option>
                    {daftarRumahSakit.map((nilai) => {
                      return (
                        <option key={nilai.id} value={nilai.id}>
                          {nilai.nama}
                        </option>
                      );
                    })}
                  </select>
                  <label htmlFor="rumahSakit">Rumah Sakit</label>
                </div>
              </>
            ) : (
              <></>
            )}
            {user.jenisUserId === 3 ? (
              <>
                <div
                  className="form-floating"
                  style={{ width: "100%", paddingBottom: "5px" }}
                >
                  <select
                    name="rumahSakit"
                    id="rumahSakit"
                    typeof="select"
                    className="form-select"
                    onChange={(e) => rumahSakitChangeHandler(e)}
                  >
                    <option key={0} value={0}>
                      Pilih
                    </option>
                    {daftarRumahSakit.map((nilai) => {
                      return (
                        <option key={nilai.id} value={nilai.id}>
                          {nilai.nama}
                        </option>
                      );
                    })}
                  </select>
                  <label htmlFor="rumahSakit">Rumah Sakit</label>
                </div>
              </>
            ) : (
              <></>
            )}
            <div
              className="form-floating"
              style={{ width: "70%", display: "inline-block" }}
            >
              <select
                typeof="select"
                className="form-control"
                onChange={bulanChangeHandler}
              >
                {daftarBulan.map((bulan) => {
                  return (
                    <option
                      key={bulan.value}
                      name={bulan.key}
                      value={bulan.value}
                      cek={bulan.JmlHari}
                    >
                      {bulan.key}
                    </option>
                  );
                })}
              </select>
              <label>Bulan</label>
            </div>
            <div
              className="form-floating"
              style={{ width: "30%", display: "inline-block" }}
            >
              <input
                name="tahun"
                type="number"
                className="form-control"
                id="tahun"
                placeholder="Tahun"
                value={tahun}
                onChange={(e) => tahunChangeHandler(e)}
                disabled={false}
              />
              <label htmlFor="tahun">Tahun</label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="mt-3 mb-3">
              <ToastContainer />
              <button type="submit" className="btn btn-outline-success">
                <HiSaveAs size={20} /> Terapkan
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
      <div className="row">
        <div className="col-md-12">
          <div style={{ marginBottom: "10px" }}>
            <button
              className="btn"
              style={{
                fontSize: "18px",
                backgroundColor: "#779D9E",
                color: "#FFFFFF",
              }}
              onClick={handleShow}
            >
              Filter
            </button>
            <button
              className="btn"
              style={{
                fontSize: "18px",
                marginLeft: "5px",
                backgroundColor: "#779D9E",
                color: "#FFFFFF",
              }}
              onClick={handleDownloadExcel}
            >
              Download
            </button>
          </div>

          <div>
            <h5 style={{ fontSize: "14px" }}>
              {filterLabel.length > 0 ? (
                <>
                  filtered by{" "}
                  {filterLabel
                    .map((value) => {
                      return value;
                    })
                    .join(", ")}
                </>
              ) : (
                <></>
              )}
            </h5>
          </div>
          <Table
            className={style.rlTable}
            striped
            responsive
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th rowSpan="1" style={{ width: "2%" }}>
                  No.
                </th>
                <th rowSpan="1" style={{ width: "10%" }}>
                  Jenis Pelayanan
                </th>
                <th rowSpan="1" style={{ width: "5%" }}>
                  BOR
                </th>
                <th rowSpan="1" style={{ width: "5%" }}>
                  ALOS
                </th>
                <th rowSpan="1" style={{ width: "5%" }}>
                  BTO
                </th>
                <th colSpan="1" style={{ width: "5%" }}>
                  TOI
                </th>
                <th rowSpan="1" style={{ width: "5%" }}>
                  NDR
                </th>
                <th rowSpan="1" style={{ width: "5%" }}>
                  GDR
                </th>
              </tr>
            </thead>
            <tbody>
              {dataRL.map((value, index) => {
                return (
                  <tr key={value.id}>
                    <td>{index + 1}</td>
                    <td>{value.nama_kelompok_jenis_pelayanan}</td>
                    <td style={{ textAlign: "right" }}>
                      {(Math.round(value.BOR * 100) / 100).toFixed(2)}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {(Math.round(value.ALOS * 100) / 100).toFixed(2)}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {(Math.round(value.BTO * 100) / 100).toFixed(2)}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {(Math.round(value.TOI * 100) / 100).toFixed(2)}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {(Math.round(value.NDR * 100) / 100).toFixed(2)}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {(Math.round(value.GDR * 100) / 100).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
              {dataRL.length > 0 ? (
                <tr>
                  <td>{77}</td>
                  <td>Rata - Rata</td>
                  <td style={{ textAlign: "right" }}>
                    {(Math.round(abor * 100) / 100).toFixed(2)}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {(Math.round(alos * 100) / 100).toFixed(2)}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {(Math.round(abto * 100) / 100).toFixed(2)}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {(Math.round(atoi * 100) / 100).toFixed(2)}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {(Math.round(andr * 100) / 100).toFixed(2)}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {(Math.round(agdr * 100) / 100).toFixed(2)}
                  </td>
                </tr>
              ) : (
                <></>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RL31;
