export default function Index() {
  return (
    <div className="flex flex-col gap-20 md:gap-0 pt-20 md:pt-24 px-5">
      <h1 className="text-center font-bold m-0 p-0 leading-none text-[14vw] md:text-[15vw]">
        ATUL KODLA
      </h1>
      <div className="flex flex-col h-full md:w-[50%] gap-10 md:gap-20 ml-auto justify-around">
        <p className="text-xl">
          Hello!
          <br />
          I'm a penultimate year Software Engineering student at the&nbsp;
          <a
            href="https://www.auckland.ac.nz/en.html"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            University of Auckland
          </a>
        </p>
        <div>
          <p>External Links:</p>
          <div className="flex flex-row gap-6 flex-wrap">
            <a
              href="https://www.linkedin.com/in/atulkodla/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              LinkedIn
            </a>
            <a
              href="/AtulKodlaCV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Resumé
            </a>
            <a
              href="https://github.com/itsatulbox"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              GitHub
            </a>
            <a
              href="https://leetcode.com/u/atulbox/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              LeetCode
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
