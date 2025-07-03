"use client";
import { BanknotesIcon, CalendarIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Typography,
} from "@/components/components";
import { useRouter } from "next/navigation";
import { formatTanggal } from "@/utils/data";

const ChipList = ({ prodi, jalur, kelas }) => {
  if (prodi == "S1 Hukum") {
    return (
      <>
        {jalur.map((item, index) => (
          <Chip
            variant="ghost"
            value={item}
            className="inline mr-3"
            key={index}
          />
        ))}
      </>
    );
  } else if (kelas == "Karyawan") {
    return <Chip variant="ghost" value="umum" className="inline mr-3" />;
  } else if (prodi == "S2 Hukum") {
    return <Chip variant="ghost" value="umum" className="inline mr-3" />;
  }
};

function JalurList({ gelombang }) {
  const router = useRouter();

  const setJalur = (jalur) => {
    localStorage.setItem("_jalur", jalur);
    router.push("/daftar/personal");
  };

  return (
    <div className="flex flex-col gap-5">
      {gelombang.map((gelombang, index) => (
        <Card className="shadow-none border-2" key={index}>
          <CardBody className="lg:grid grid-cols-12">
            <div className="col-span-9">
              <Typography variant="h5" color="blue-gray">
                {`${gelombang.name.toUpperCase()}`}
              </Typography>
              <Typography className="pt-5 pb-3">
                Untuk informasi lainnya bisa kontak hotline PMB kami di Call
                Center STHG: 0265-330092 atau email informasi@sthg.ac.id
              </Typography>
              <div>
                <ChipList
                  prodi={gelombang.prodi}
                  jalur={gelombang.jalur}
                  kelas={gelombang.kelas}
                />
              </div>
            </div>
            <div className="mt-5 lg:mt-0 col-span-3 lg:border-l-2 flex flex-col justify-center gap-5 lg:pl-5">
              <div>
                <div className="flex gap-3">
                  <CalendarIcon className="h-5 w-5" />
                  <Typography>
                    {formatTanggal(gelombang.start)} -{" "}
                    {formatTanggal(gelombang.end)}
                  </Typography>
                </div>
                <div className="flex gap-3">
                  <BanknotesIcon className="h-5 w-5" />
                  <Typography>
                    Harga :{" "}
                    <span className="font-bold text-blue-gray-900">
                      {gelombang.price}
                    </span>
                  </Typography>
                </div>
              </div>
              <Button
                className="block"
                onClick={() =>
                  setJalur(`${gelombang.prodi}-${gelombang.kelas}`)
                }>
                Daftar
              </Button>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

export default JalurList;
