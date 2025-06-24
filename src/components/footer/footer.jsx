

import {
  EnvelopeIcon,
  GlobeAltIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { Typography } from "@/components/components";
import Image from "next/image";

function FooterComponent() {
  const contact = [
    {
      icon: <GlobeAltIcon className="h-5 w-5" />,
      content: "https://simaba.sthg.ac.id",
    },
    {
      icon: <PhoneIcon className="h-5 w-5" />,
      content: "+62821-2345-8169",
    },
    {
      icon: <EnvelopeIcon className="h-5 w-5" />,
      content: "Informasi@sthg.ac.id",
    },
  ];

  const navLinks = [
    {
      link: "/",
      name: "Beranda",
    },
    {
      link: "/jalur-pendaftaran",
      name: "Jalur Pendaftaran",
    },
    {
      link: "/informasi",
      name: "Informasi",
    },
  ];

  return (
    <div className="border-y-2 flex justify-center py-14">
      <div className="container px-8 lg:px-0 lg:grid lg:grid-cols-12 flex flex-col gap-5">
        <div className="col-span-4">
          <div className="flex items-center gap-5">
            <Image src={"/logo-sthg.png"} width={50} height={50} alt="logo" />
            <div>
              <Typography className="text-blue-gray-600 text-sm">
                Penerimaan Mahasiswa Baru
              </Typography>
              <Typography className="text-lg font-bold">
                Sekolah Tinggi Hukum Galunggung
              </Typography>
            </div>
          </div>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-4">
          <Typography variant="h5" className="mb-5">
            Kontak Kami
          </Typography>
          <ul className="flex flex-col gap-2">
            {contact.map((item) => (
              <li className="flex items-center gap-3" key={item.content}>
                {item.icon} {item.content}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-3">
          <Typography variant="h5" className="mb-5">
            Kontak Kami
          </Typography>
          <ul className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <li key={item.link}>
                <a href={item.link}>{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FooterComponent;
