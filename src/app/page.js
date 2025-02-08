import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center">
        <Image
          className=""
          src="/boost-mailer-logo.png"
          alt="Boost Mailer logo"
          width={180}
          height={38}
          priority
        />
        <ol className="font-mono list-inside text-sm/6 text-center sm:text-left max-w-100">
          <li className="mb-2 tracking-[-.01em] text-center ">
            Create emails, manage lists, send mail, and ask prompts with a local Llamafile LLM to get information about your audience.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/email"
            rel="noopener noreferrer"
          >
            {/* <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            /> */}
            Go to Email
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https:/github.com/ekiidx/boost-mailer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert mr-3"
              src="/github.svg"
              alt="Github logomark"
              width={20}
              height={20}
            />
            Github
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      
      </footer>
    </div>
  );
}
