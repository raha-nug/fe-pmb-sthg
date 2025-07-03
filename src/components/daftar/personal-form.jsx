"use client";

import { CardBody, Input, Radio, Typography } from "@/components/components";
import React, { useEffect, useState } from "react";
import JalurInfo from "../fragments/jalur-info";
import TitleForm from "../fragments/title-form";
import SubForm from "../fragments/sub-form";
import SelectComponent from "../fragments/select-component";
import {
  agamaOptions,
  beasiswaOptions,
  daftarOptions,
  getDistricts,
  getProvincies,
  getRegency,
  getVillages,
  kewarganegaraanOptions,
  stayWithOptions,
} from "@/utils/data";

function PersonalForm({ prodi, kelas, formData }) {
  const [provincies, setProvincies] = useState();
  const [regencies, setRegencies] = useState();
  const [districts, setDistricts] = useState();
  const [villages, setVillages] = useState();
  const [isBeasiswa, setIsBeasiswa] = useState();
  const [beasiswa, setBeasiswa] = useState();

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedRegency, setSelectedRegency] = useState(null);
  const [selectedDistricts, setSelectedDistricts] = useState(null);
  const [selectedVillages, setSelectedVillages] = useState(null);

  useEffect(() => {
    beasiswaOptions().then((res) => {
      setBeasiswa(res);
    });
  }, []);

  useEffect(() => {
    getProvincies().then((res) => {
      setProvincies(res);
    });
  }, []);

  useEffect(() => {
    getRegency(selectedProvince).then((res) => {
      setRegencies(res);
    });
  }, [selectedProvince]);

  useEffect(() => {
    getDistricts(selectedProvince, selectedRegency).then((res) => {
      setDistricts(res);
    });
  }, [selectedProvince, selectedRegency]);

  useEffect(() => {
    getVillages(selectedProvince, selectedRegency, selectedDistricts).then(
      (res) => {
        setVillages(res);
      }
    );
  }, [selectedProvince, selectedRegency, selectedDistricts]);

  const handleProvinceChange = (selectedOption) => {
    setSelectedProvince(selectedOption);
    setSelectedRegency(null);
  };

  const handleRegencyChange = (selectedOption) => {
    setSelectedRegency(selectedOption);
    setSelectedDistricts(null);
  };

  const handleDistrictsChange = (selectedOption) => {
    setSelectedDistricts(selectedOption);
  };
  const handleVillagesChange = (selectedOption) => {
    setSelectedVillages(selectedOption);
  };

  return (
    <CardBody>
      <Typography variant="h3" color="blue-gray">
        Formulir Pendaftaran
      </Typography>
      <Typography color="blue-gray">
        Lengkapi data pendaftaran untuk melanjutkan ke tahap selanjutnya.
      </Typography>
      <JalurInfo />

      <TitleForm display={"Informasi Pribadi"} />
      <SubForm>
        <Input
          type="text"
          label="Nama Lengkap"
          name="nama_lengkap"
          color="blue"
          defaultValue={formData?.nama_lengkap || ""}
          required
        />
        <Input
          type="text"
          inputMode="numeric"
          label="NIK"
          name="nik"
          color="blue"
          defaultValue={formData?.nik || ""}
          required
        />
        <Input
          type="text"
          inputMode="numeric"
          label="NISN"
          name="nisn"
          color="blue"
          defaultValue={formData?.nisn || ""}
          required
        />
        <div className="sm:flex items-center">
          <Typography>Jenis Kelamin</Typography>
          <div className="flex items-center gap-3">
            <Radio
              name="jenis_kelamin"
              label="Laki Laki"
              defaultChecked={formData?.jenis_kelamin === "MALE"}
              value={"MALE"}
              required
            />
            <Radio
              name="jenis_kelamin"
              label="Perempuan"
              defaultChecked={formData?.jenis_kelamin === "FEMALE"}
              value={"FEMALE"}
              required
            />
          </div>
        </div>
        <SelectComponent
          options={agamaOptions}
          placeholder={"Agama"}
          name="agama"
          defaultValue={formData?.agama}
          required
        />
        <Input
          type="text"
          inputMode="numeric"
          label="No. Hp"
          color="blue"
          name="kontak_wa"
          defaultValue={formData?.kontak_wa}
          required
        />
        <Input
          type="email"
          label="Alamat Email"
          color="blue"
          name="email"
          defaultValue={formData?.email}
          required
        />
        <Input
          type="date"
          label="Tanggal Lahir"
          color="blue"
          name="tgl_lahir"
          defaultValue={formData?.tgl_lahir}
          required
        />
        <Input
          type="text"
          label="Tempat Lahir"
          color="blue"
          name="tempat_lahir"
          defaultValue={formData?.tempat_lahir}
          required
        />

        <SelectComponent
          options={stayWithOptions}
          placeholder={"Tinggal Bersama"}
          name="stay_with"
          defaultValue={formData?.stay_with}
          required
        />
        <SelectComponent
          options={kewarganegaraanOptions}
          placeholder={"Kewarganegaraan"}
          name="nationality"
          defaultValue={formData?.nationality}
          required
        />
      </SubForm>

      <TitleForm display={"Alamat"} />
      <SubForm>
        <SelectComponent
          options={provincies}
          handleChange={handleProvinceChange}
          placeholder={"Provinsi"}
          name="province"
          defaultValue={formData?.province}
          required
        />
        <SelectComponent
          options={regencies}
          handleChange={handleRegencyChange}
          placeholder={"Kabupaten / Kota"}
          isDisabled={selectedProvince == null}
          name="regency"
          defaultValue={formData?.regency}
          required
        />
        <SelectComponent
          options={districts}
          handleChange={handleDistrictsChange}
          placeholder={"Kecamatan"}
          isDisabled={selectedProvince == null || selectedRegency == null}
          name="district"
          defaultValue={formData?.district}
          required
        />
        <SelectComponent
          options={villages}
          handleChange={handleVillagesChange}
          placeholder={"Desa"}
          isDisabled={
            selectedProvince == null ||
            selectedRegency == null ||
            selectedDistricts == null
          }
          name="village"
          defaultValue={formData?.village}
          required
        />

        <Input
          type="text"
          label="Kampung / Jalan"
          color="blue"
          name="kampung"
          defaultValue={formData?.kampung}
          required
        />
        <Input
          type="text"
          inputMode="numeric"
          label="RT (format: 001)"
          color="blue"
          name="rt_number"
          defaultValue={formData?.rt_number}
          required
        />
        <Input
          type="text"
          inputMode="numeric"
          label="RW (format: 001)"
          color="blue"
          name="rw_number"
          defaultValue={formData?.rw_number}
          required
        />
        <Input
          type="text"
          inputMode="numeric"
          label="Kode Pos"
          color="blue"
          name="pos_code"
          defaultValue={formData?.pos_code}
          required
        />
      </SubForm>

      <TitleForm display={"Jalur Pendaftaran"} />

      <SubForm>
        <SelectComponent
          options={daftarOptions}
          placeholder={"Daftar Sebagai"}
          name="jenis_daftar"
          defaultValue={formData?.jenis_daftar}
          required
        />

        {prodi == "S1 Hukum" && kelas == "Reguler" && (
          <>
            <div className="sm:flex items-center">
              <Typography>Penerima KIP (Opsional)</Typography>
              <div className="flex items-center gap-3">
                <Radio
                  name="kip"
                  label="YA"
                  value={1}
                  defaultChecked={formData?.kip == "1"}
                />
                <Radio
                  name="kip"
                  label="TIDAK"
                  value={0}
                  defaultChecked={formData?.kip == "0"}
                />
              </div>
            </div>

            <div className="sm:flex items-center">
              <Typography>Penerima KPS atau PKH (Opsional)</Typography>
              <div className="flex items-center gap-3">
                <Radio
                  name="kps_pkh"
                  label="YA"
                  value={1}
                  defaultChecked={formData?.kps_pkh == "1"}
                />
                <Radio
                  name="kps_pkh"
                  label="TIDAK"
                  value={0}
                  defaultChecked={formData?.kps_pkh == "0"}
                />
              </div>
            </div>

            <Input
              type="text"
              inputMode="numeric"
              label="Nomor KPS atau PKH (Opsional)"
              color="blue"
              name="nomor_kps_pkh"
              defaultValue={formData?.nomor_kps_pkh}
            />
          </>
        )}
        <div className="sm:flex items-center">
          <Typography>Penerima Beasiswa (Opsional)</Typography>
          <div className="flex items-center gap-3">
            <Radio
              name="isBeasiswa"
              label="YA"
              checked={isBeasiswa === 1}
              onChange={() => setIsBeasiswa(1)}
              value={1}
            />
            <Radio
              name="isBeasiswa"
              label="TIDAK"
              checked={isBeasiswa === 0}
              onChange={() => setIsBeasiswa(0)}
              value={0}
            />
          </div>
        </div>
        {isBeasiswa === 1 && (
          <SelectComponent
            options={beasiswa}
            placeholder={"Jenis Beasiswa"}
            name="beasiswa"
            required
          />
        )}
      </SubForm>
    </CardBody>
  );
}

export default PersonalForm;
