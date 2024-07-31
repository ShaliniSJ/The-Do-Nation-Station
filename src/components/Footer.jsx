import Image from "next/image";
import IconLogo from "../assets/apple-touch-icon.png";
import BlueLogo from "../assets/blue-image-logo.png";

export default function Page() {
  return (
    <footer className="flex flex-col justify-between min-h-60 bg-primary-blue text-secondary-blue rounded-3xl m-4 md:m-6 md:mt-16 p-4 md:p-10">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-between gap-4">
          <div className="flex flex-row">
            <Image src={IconLogo} alt="The Do-Nation Station Icon" width={43} />
            <Image src={BlueLogo} alt="The Do-Nation Station" width={250} />
          </div>
        </div>
        <div className="flex flex-row justify-between items-start gap-8">
          <ul className="grid grid-cols-2 gap-x-32 gap-y-2">
            <li>
              <a className="hover:underline" href="/">
                Home
              </a>
            </li>
            <li>
              <a className="hover:underline" href="/aboutUs">
                About
              </a>
            </li>
            <li>
              <a className="hover:underline" href="/leaderboard">
                Leaderboard
              </a>
            </li>
            <li>
              <a className="hover:underline" href="/history">
                History
              </a>
            </li>
            <li>
              <a className="hover:underline" href="/signin">
                Signin
              </a>
            </li>
            <li>
              <a className="hover:underline" href="/login">
                Login
              </a>
            </li>
          </ul>
          <div className="w-1/2 opacity-50">
            <p>Thank you for your support!</p>
            <p>
              For feedback or to work with us, contact us at{" "}
              <a
                href="mailto:pranav9176@gmail.com"
                className="hover:underline opacity-100"
              >
                pranav9176@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
      <p className="text-center jost text-lg opacity-50">
        An Initiative By Team Enigmatic Optimizers
      </p>
    </footer>
  );
}
