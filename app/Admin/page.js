import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Welcome to the Admin Portal&nbsp;
        </p>
      </div>
      <div
        className="fixed top-0 left-0 w-full h-full z-0 opacity-100"
        style={{ zIndex: -1 }}
      >
        <Image
          src="/clay.jpg"
          alt="Description of the image"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="mb-30 grid gap-8 justify-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:gap-8">
        <div className="lg:flex lg:flex-col lg:items-center lg:justify-center">
          <a className="group rounded-lg border border-gray-600 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <h2 className="mb-3 text-2xl font-bold" style={{ color: "black" }}>
              <Link href="/SignupPatient">Add Patient</Link>
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Click Here to add a new Patient
            </p>
          </a>
        </div>

        <div className="lg:flex lg:flex-col lg:items-center lg:justify-center">
          <a className="group rounded-lg border border-gray-600 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30">
            <h2
              className="mb-3 text-2xl font-semibold"
              style={{ color: "black" }}
            >
              <Link href="/ViewAppointment2">View Appointment</Link>
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Show Appointment
            </p>
          </a>
        </div>

        <div className="lg:flex lg:flex-col lg:items-center lg:justify-center">
          <a className="group rounded-lg border border-gray-600 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30">
            <h2
              className="mb-3 text-2xl font-semibold"
              style={{ color: "black" }}
            >
              <Link href="/SignupDoctor">Add Doctor</Link>
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">Add Doctor</p>
          </a>
        </div>

        <div className="lg:flex lg:flex-col lg:items-center lg:justify-center">
          <a className="group rounded-lg border border-gray-600 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30">
            <h2
              className="mb-3 text-2xl font-semibold"
              style={{ color: "black" }}
            >
              <Link href="/Appointment">Add Appointment</Link>

              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Add Appointment
            </p>
          </a>
        </div>
      </div>
    </main>
  );
}
